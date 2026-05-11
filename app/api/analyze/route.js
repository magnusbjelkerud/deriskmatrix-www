import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { detectIndustry, generateGoals, INDUSTRY_LABELS } from '../../../lib/goalPacks'
import { generateGoalsWithClaude, generateProjectGoalsWithClaude } from '../../../lib/claudeAnalyzer'
import crypto from 'crypto'

export const maxDuration = 300

const ANALYZER_OPEN = process.env.ANALYZER_OPEN === 'true'
const RATE_LIMIT = parseInt(process.env.ANALYZER_RATE_LIMIT_PER_IP || '5')
const CACHE_DAYS = parseInt(process.env.ANALYZER_CACHE_DAYS || '90')

const ALLOWED_ORIGINS = [
  'https://app.deriskmatrix.com',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
]

function corsHeaders(request) {
  const origin = request.headers.get('origin') || ''
  if (!ALLOWED_ORIGINS.includes(origin)) return {}
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  }
}

export async function OPTIONS(request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) })
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key || url === 'your_supabase_url_here') return null
  return createClient(url, key)
}

function slugify(domain) {
  return domain.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

function hashIP(ip) {
  return crypto.createHash('sha256').update(ip + 'drm-salt-2026').digest('hex').slice(0, 16)
}

async function fetchWebsite(domain) {
  const urls = [`https://${domain}`, `https://www.${domain}`, `http://${domain}`]
  for (const url of urls) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; DeRiskMatrix/1.0; +https://deriskmatrix.com)' },
        signal: AbortSignal.timeout(8000),
        redirect: 'follow',
      })
      if (res.ok) {
        const html = await res.text()
        const text = html
          .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
          .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 5000)
        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
        const title = titleMatch ? titleMatch[1].replace(/\s*[|–—].*$|\s+-\s+.*$/, '').trim() : domain
        return { text, title, success: true }
      }
    } catch { continue }
  }
  return { text: '', title: domain, success: false }
}

// Agent 1 — Resolver: tries hjemmeside search first, falls back to name search
async function fetchBrreg(domain) {
  if (!domain.endsWith('.no')) return null
  const cleanDomain = domain.replace(/^www\./, '')

  // Try exact hjemmeside match first (most reliable)
  try {
    const res = await fetch(
      `https://data.brreg.no/enhetsregisteret/api/enheter?hjemmeside=${encodeURIComponent(cleanDomain)}&size=3`,
      { signal: AbortSignal.timeout(5000) }
    )
    if (res.ok) {
      const data = await res.json()
      const hit = data._embedded?.enheter?.[0]
      if (hit) return extractBrregEntity(hit)
    }
  } catch { /* fall through */ }

  // Fallback: search by company name inferred from domain
  const company = cleanDomain.replace(/\.no$/, '')
  try {
    const res = await fetch(
      `https://data.brreg.no/enhetsregisteret/api/enheter?navn=${encodeURIComponent(company)}&size=1`,
      { signal: AbortSignal.timeout(5000) }
    )
    if (res.ok) {
      const data = await res.json()
      const hit = data._embedded?.enheter?.[0]
      if (hit) return extractBrregEntity(hit)
    }
  } catch { /* give up */ }

  return null
}

function extractBrregEntity(hit) {
  return {
    orgNr: hit.organisasjonsnummer,
    name: hit.navn,
    naeringskode1: hit.naeringskode1,
    orgForm: hit.organisasjonsform?.kode,
    founded: hit.stiftelsesdato,
    employees: hit.antallAnsatte,
  }
}

// Fetch financial filings from Regnskapsregisteret
async function fetchBrregFinancials(orgNr) {
  if (!orgNr) return null
  try {
    const res = await fetch(
      `https://data.brreg.no/regnskapsregisteret/regnskap/${orgNr}?fratrukketRenter=true&regnskapstype=SELSKAP`,
      { signal: AbortSignal.timeout(5000) }
    )
    if (!res.ok) return null
    const data = await res.json()
    const records = Array.isArray(data) ? data : (data._embedded?.regnskap || [])
    // Sort by year desc and take latest
    const latest = records.sort((a, b) => {
      const aY = a.regnskapsperiode?.fraDato || ''
      const bY = b.regnskapsperiode?.fraDato || ''
      return bY.localeCompare(aY)
    })[0]
    if (!latest) return null
    const dr = latest.resultatregnskapResultat?.driftsresultat
    return {
      year: latest.regnskapsperiode?.fraDato?.slice(0, 4),
      sumDriftsinntekter: dr?.driftsinntekter?.sumDriftsinntekter,
      driftsresultat: dr?.driftsresultat,
    }
  } catch {
    return null
  }
}

export async function POST(request) {
  const encoder = new TextEncoder()
  const cors = corsHeaders(request)

  let domain, mode, description, confirmedCompanyName, confirmedOrgNr
  try {
    const body = await request.json()
    mode = body.mode === 'project' ? 'project' : 'company'
    description = (body.description || '').trim().slice(0, 500)
    confirmedCompanyName = (body.confirmedCompanyName || '').trim() || null
    confirmedOrgNr = body.confirmedOrgNr || null
    domain = (body.confirmedDomain || body.domain || '')
      .toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/$/, '')
      .trim()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400, headers: cors })
  }

  if (mode === 'company' && !confirmedCompanyName && (!domain || domain.length < 3)) {
    return NextResponse.json({ error: 'Invalid domain' }, { status: 400, headers: cors })
  }
  if (mode === 'project' && (!description || description.length < 5)) {
    return NextResponse.json({ error: 'Please describe your project' }, { status: 400, headers: cors })
  }

  if (!ANALYZER_OPEN) {
    return NextResponse.json({ error: 'Analyzer is in private beta. Request access at magnus@deriskmatrix.com.' }, { status: 403, headers: cors })
  }

  const supabase = getSupabase()
  if (!supabase) {
    return NextResponse.json({ error: 'Service not configured.' }, { status: 503, headers: cors })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
  const ipHash = hashIP(ip)

  // For project mode: derive a deterministic slug from the description
  const slug = mode === 'project'
    ? `project-${crypto.createHash('sha256').update(description.slice(0, 200)).digest('hex').slice(0, 12)}`
    : slugify(domain)

  // Check cache — skip rows generated by template fallbacks (no Claude key); they should be re-analyzed
  const { data: cached } = await supabase
    .from('website_analyses')
    .select('*')
    .eq('slug', slug)
    .gte('cached_until', new Date().toISOString())
    .single()

  if (cached && !cached.pipeline_version?.startsWith('v1_')) {
    const stream = new ReadableStream({
      start(controller) {
        const send = d => controller.enqueue(encoder.encode(`data: ${JSON.stringify(d)}\n\n`))
        for (let i = 0; i < 5; i++) send({ type: 'step', step: i })
        send({ type: 'done', slug, companyName: cached.company_name, industry: cached.industry, analysisId: cached.id })
        controller.close()
      }
    })
    return new Response(stream, { headers: { ...sseHeaders(), ...cors } })
  }

  // Rate limit check
  const oneHourAgo = new Date(Date.now() - 3600000).toISOString()
  const { count } = await supabase
    .from('website_analyses')
    .select('id', { count: 'exact', head: true })
    .eq('ip_hash', ipHash)
    .gte('created_at', oneHourAgo)

  if (count >= RATE_LIMIT) {
    return NextResponse.json({ error: 'Rate limit reached. Please try again in an hour.' }, { status: 429, headers: cors })
  }

  // ── Project mode SSE pipeline ────────────────────────────────────────────────
  if (mode === 'project') {
    const projectName = description.split(/[.!?\n]/)[0].trim().slice(0, 80) || 'Project'

    const stream = new ReadableStream({
      async start(controller) {
        const send = d => controller.enqueue(encoder.encode(`data: ${JSON.stringify(d)}\n\n`))
        try {
          send({ type: 'step', step: 0 })  // Reading description
          send({ type: 'step', step: 1 })  // Identifying project type
          send({ type: 'step', step: 2 })  // Claude starts

          let goals, drivers, actions
          let usedClaude = false

          if (process.env.ANTHROPIC_API_KEY) {
            try {
              const result = await generateProjectGoalsWithClaude({ description, projectName })
              goals = result.goals
              drivers = result.drivers
              actions = result.actions
              usedClaude = true
            } catch (claudeErr) {
              console.warn('[analyze:project] Claude failed, falling back to templates:', claudeErr.message)
            }
          }

          if (!usedClaude) {
            const fallback = generateGoals('technology', false, false)
            goals = fallback.goals; drivers = fallback.drivers; actions = fallback.actions
          }

          send({ type: 'step', step: 3 })
          send({ type: 'step', step: 4 })

          const cachedUntil = new Date()
          cachedUntil.setDate(cachedUntil.getDate() + CACHE_DAYS)

          const { data: analysis, error } = await supabase
            .from('website_analyses')
            .upsert({
              slug,
              domain: slug,
              company_name: projectName,
              country_code: 'INT',
              industry: 'Project',
              sub_industry: description.slice(0, 120),
              size_segment: 'Project',
              goals_json: goals,
              drivers_json: drivers,
              actions_json: actions,
              cached_until: cachedUntil.toISOString(),
              ip_hash: ipHash,
              conversion_status: 'viewed',
              pipeline_version: usedClaude ? 'v2_project' : 'v1_templates',
            }, { onConflict: 'slug' })
            .select('id')
            .single()

          if (error) { console.error('[analyze:project:upsert]', error); throw error }

          send({ type: 'done', slug, companyName: projectName, industry: 'Project', analysisId: analysis.id })
          controller.close()
        } catch (err) {
          console.error('[analyze:project]', err)
          send({ type: 'error', message: 'Analysis failed. Please try again.' })
          controller.close()
        }
      }
    })
    return new Response(stream, { headers: { ...sseHeaders(), ...cors } })
  }

  // ── Company mode SSE pipeline ────────────────────────────────────────────────
  const stream = new ReadableStream({
    async start(controller) {
      const send = d => controller.enqueue(encoder.encode(`data: ${JSON.stringify(d)}\n\n`))

      try {
        // ── Step 0: Reading website ──────────────────────────────────────────
        send({ type: 'step', step: 0 })

        // When confirmed values arrive from the resolver, skip Brreg name lookup
        const [siteData, brregFull] = await Promise.all([
          domain ? fetchWebsite(domain) : Promise.resolve({ text: '', title: '', success: false }),
          confirmedCompanyName ? Promise.resolve(confirmedOrgNr ? { orgNr: confirmedOrgNr } : null) : fetchBrreg(domain),
        ])
        const brreg = brregFull

        const orgNr = brreg?.orgNr || confirmedOrgNr || null
        const financials = orgNr ? await fetchBrregFinancials(orgNr) : null

        // ── Step 1: Industry identified ──────────────────────────────────────
        const combinedText = [siteData.text, brreg?.naeringskode1?.beskrivelse || ''].join(' ')
        const tld = (domain || '').split('.').pop()
        const industry = detectIndustry(combinedText, tld, brreg)
        const industryLabel = INDUSTRY_LABELS[industry]
        const companyName = confirmedCompanyName || brreg?.name || siteData.title || domain
        const countryCode = tld === 'no' ? 'NO' : tld === 'de' ? 'DE' : tld === 'se' ? 'SE' : 'INT'

        send({ type: 'step', step: 1, industry: industryLabel, companyName })

        // ── Step 2: Mapping goals (Claude starts here) ───────────────────────
        send({ type: 'step', step: 2 })

        let goals, drivers, actions
        let usedClaude = false

        if (process.env.ANTHROPIC_API_KEY) {
          try {
            const result = await generateGoalsWithClaude({
              domain, companyName, industryLabel, countryCode,
              siteText: siteData.text,
              brreg, financials,
            })
            goals = result.goals
            drivers = result.drivers
            actions = result.actions
            usedClaude = true
          } catch (claudeErr) {
            console.warn('[analyze] Claude failed, falling back to templates:', claudeErr.message)
          }
        }

        if (!usedClaude) {
          const hasRevenue = !!(brreg?.employees > 5)
          const fallback = generateGoals(industry, hasRevenue, false)
          goals = fallback.goals; drivers = fallback.drivers; actions = fallback.actions
        }

        // ── Step 3: Thresholds and states done ──────────────────────────────
        send({ type: 'step', step: 3 })

        // ── Step 4: Save to DB ───────────────────────────────────────────────
        send({ type: 'step', step: 4 })

        const cachedUntil = new Date()
        cachedUntil.setDate(cachedUntil.getDate() + CACHE_DAYS)

        const { data: analysis, error } = await supabase
          .from('website_analyses')
          .upsert({
            slug,
            domain,
            company_name: companyName,
            country_code: countryCode,
            industry: industryLabel,
            sub_industry: brreg?.naeringskode1?.beskrivelse || null,
            size_segment: brreg?.employees > 200 ? 'Large' : brreg?.employees > 50 ? 'Mid-market' : brreg?.employees > 10 ? 'Small business' : 'Startup / unknown',
            goals_json: goals,
            drivers_json: drivers,
            actions_json: actions,
            cached_until: cachedUntil.toISOString(),
            ip_hash: ipHash,
            conversion_status: 'viewed',
            pipeline_version: usedClaude ? 'v2_phase_a' : 'v1_templates',
          }, { onConflict: 'slug' })
          .select('id')
          .single()

        if (error) {
          console.error('[analyze:upsert]', error.code, error.message, error.details, { slug, domain })
          throw error
        }

        if (brreg) {
          await supabase.from('analysis_evidence').upsert({
            id: crypto.randomUUID(),
            analysis_id: analysis.id,
            evidence_id: 'resolver_001',
            agent_name: 'resolver',
            source: 'Brønnøysund',
            evidence_strength: 'high',
            raw_data: { ...brreg, financials },
          }, { onConflict: 'analysis_id,evidence_id' }).catch(() => { /* non-critical */ })
        }

        send({ type: 'done', slug, companyName, industry: industryLabel, analysisId: analysis.id })
        controller.close()

      } catch (err) {
        console.error('[analyze]', err)
        send({ type: 'error', message: 'Analysis failed. Please try again.' })
        controller.close()
      }
    }
  })

  return new Response(stream, { headers: { ...sseHeaders(), ...cors } })
}

function sseHeaders() {
  return {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    'X-Accel-Buffering': 'no',
    'Connection': 'keep-alive',
  }
}
