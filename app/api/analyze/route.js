import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { detectIndustry, generateGoals, INDUSTRY_LABELS } from '../../../lib/goalPacks'
import crypto from 'crypto'

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
        // Strip HTML tags, get plain text
        const text = html
          .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
          .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 5000)
        // Try to extract company name from title tag
        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
        const title = titleMatch ? titleMatch[1].replace(/[\|\-–].*/, '').trim() : domain
        return { text, title, success: true }
      }
    } catch (e) {
      continue
    }
  }
  return { text: '', title: domain, success: false }
}

async function fetchBrreg(domain) {
  // Only for .no domains
  if (!domain.endsWith('.no')) return null
  const company = domain.replace('.no', '').replace('www.', '')
  try {
    const res = await fetch(
      `https://data.brreg.no/enhetsregisteret/api/enheter?navn=${encodeURIComponent(company)}&size=1`,
      { signal: AbortSignal.timeout(4000) }
    )
    if (!res.ok) return null
    const data = await res.json()
    const hit = data._embedded?.enheter?.[0]
    if (!hit) return null
    return {
      name: hit.navn,
      naeringskode1: hit.naeringskode1,
      orgForm: hit.organisasjonsform?.kode,
      founded: hit.stiftelsesdato,
      employees: hit.antallAnsatte,
    }
  } catch (e) {
    return null
  }
}

export async function POST(request) {
  try {
    const { domain: rawDomain } = await request.json()
    const domain = rawDomain.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '').trim()

    if (!domain || domain.length < 3) {
      return NextResponse.json({ error: 'Invalid domain' }, { status: 400 })
    }

    const supabase = getSupabase()
    if (!supabase) {
      return NextResponse.json({ error: 'Service not configured. Please add Supabase credentials.' }, { status: 503 })
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown'
    const ipHash = hashIP(ip)
    const slug = slugify(domain)

    // Check cache — return existing if within 90 days
    const { data: cached } = await supabase
      .from('website_analyses')
      .select('*')
      .eq('slug', slug)
      .gte('cached_until', new Date().toISOString())
      .single()

    if (cached) {
      return NextResponse.json({ slug, cached: true, industry: cached.industry, companyName: cached.company_name })
    }

    // Parallel fetch: website + Brønnøysund
    const [siteData, brreg] = await Promise.all([
      fetchWebsite(domain),
      fetchBrreg(domain),
    ])

    const combinedText = [siteData.text, brreg?.naeringskode1?.beskrivelse || ''].join(' ')
    const tld = domain.split('.').pop()
    const industry = detectIndustry(combinedText, tld, brreg)
    const industryLabel = INDUSTRY_LABELS[industry]
    const companyName = brreg?.name || siteData.title || domain
    const countryCode = tld === 'no' ? 'NO' : tld === 'de' ? 'DE' : tld === 'se' ? 'SE' : 'INT'

    // Generate goals (template-based, no Claude yet)
    const hasRevenue = !!(brreg?.employees > 5)
    const isGrowing = false // conservative default
    const { goals, drivers, actions } = generateGoals(industry, hasRevenue, isGrowing)

    const cachedUntil = new Date()
    cachedUntil.setDate(cachedUntil.getDate() + 90)

    // Upsert to DB
    const { data: analysis, error } = await supabase
      .from('website_analyses')
      .upsert({
        slug,
        domain,
        company_name: companyName,
        country_code: countryCode,
        industry: industryLabel,
        sub_industry: brreg?.naeringskode1?.beskrivelse || null,
        business_model: null,
        size_segment: brreg?.employees > 50 ? 'Mid-market' : brreg?.employees > 10 ? 'Small business' : 'Startup',
        goals_json: goals,
        drivers_json: drivers,
        actions_json: actions,
        cached_until: cachedUntil.toISOString(),
        ip_hash: ipHash,
        conversion_status: 'viewed',
      }, { onConflict: 'slug' })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ slug, industry: industryLabel, companyName, success: true })
  } catch (err) {
    console.error('[analyze]', err)
    return NextResponse.json({ error: 'Analysis failed. Please try again.' }, { status: 500 })
  }
}
