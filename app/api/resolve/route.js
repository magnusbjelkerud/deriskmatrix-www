import Anthropic from '@anthropic-ai/sdk'

function normalizeDomain(raw) {
  if (!raw) return null
  return raw.toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '')
    .split('/')[0]
    .trim() || null
}

function isDomainLike(s) {
  const clean = s.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0]
  return /^[a-z0-9][a-z0-9-]*(\.[a-z]{2,})+$/.test(clean) && !s.includes(' ')
}

async function brregByDomain(domain) {
  const clean = domain.replace(/^www\./, '')
  // Primary: exact hjemmeside match
  try {
    const r = await fetch(
      `https://data.brreg.no/enhetsregisteret/api/enheter?hjemmeside=${encodeURIComponent(clean)}&size=3`,
      { signal: AbortSignal.timeout(5000) }
    )
    if (r.ok) {
      const d = await r.json()
      const hit = d._embedded?.enheter?.[0]
      if (hit) return { name: hit.navn, orgNr: hit.organisasjonsnummer, domain: normalizeDomain(hit.hjemmeside) || domain }
    }
  } catch { /* fall through */ }
  // Fallback: infer company name from domain stem
  const stem = clean.replace(/\.no$/, '').replace(/-/g, ' ')
  try {
    const r = await fetch(
      `https://data.brreg.no/enhetsregisteret/api/enheter?navn=${encodeURIComponent(stem)}&size=1`,
      { signal: AbortSignal.timeout(5000) }
    )
    if (r.ok) {
      const d = await r.json()
      const hit = d._embedded?.enheter?.[0]
      if (hit) return { name: hit.navn, orgNr: hit.organisasjonsnummer, domain }
    }
  } catch { /* give up */ }
  return null
}

async function brregByName(name) {
  try {
    const r = await fetch(
      `https://data.brreg.no/enhetsregisteret/api/enheter?navn=${encodeURIComponent(name)}&size=5&sort=antallAnsatte,desc`,
      { signal: AbortSignal.timeout(5000) }
    )
    if (!r.ok) return null
    const d = await r.json()
    const hits = d._embedded?.enheter
    if (!hits?.length) return null
    const exact = hits.find(h => h.navn.toLowerCase() === name.toLowerCase()) || hits[0]
    return {
      name: exact.navn,
      orgNr: exact.organisasjonsnummer,
      domain: normalizeDomain(exact.hjemmeside) || null,
    }
  } catch {
    return null
  }
}

async function resolveViaClaud(input, inputType) {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  const prompt = inputType === 'domain'
    ? `The website domain "${input}" belongs to a company. Return the canonical company name (legal or well-known trade name) and confirm the primary domain. Respond ONLY with JSON: {"companyName":"...","domain":"..."}`
    : `"${input}" is a company name. Return the canonical legal or well-known trade name and primary website domain. Respond ONLY with JSON: {"companyName":"...","domain":"..."}`
  try {
    const msg = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 150,
      messages: [{ role: 'user', content: prompt }],
    })
    const text = msg.content[0]?.text?.trim() || ''
    const match = text.match(/\{[\s\S]*?\}/)
    if (!match) return null
    const parsed = JSON.parse(match[0])
    if (!parsed.companyName) return null
    return { companyName: parsed.companyName, domain: normalizeDomain(parsed.domain) }
  } catch {
    return null
  }
}

export async function POST(req) {
  try {
    const { input } = await req.json()
    if (!input?.trim()) return Response.json({ error: 'No input provided' }, { status: 400 })

    const trimmed = input.trim()
    const inputIsDomain = isDomainLike(trimmed)
    const domain = inputIsDomain ? normalizeDomain(trimmed) : null

    // Strategy 1: .no domain → Brreg by hjemmeside + name fallback
    if (inputIsDomain && domain?.endsWith('.no')) {
      const hit = await brregByDomain(domain)
      if (hit?.name) {
        return Response.json({ companyName: hit.name, domain: hit.domain || domain, orgNr: hit.orgNr, confidence: 'high', source: 'brreg' })
      }
    }

    // Strategy 2: company name with Norwegian signals → Brreg by name
    if (!inputIsDomain) {
      const hasNorwegianSignal =
        /\b(AS|ASA|ANS|DA|NUF|SA|BA|KF|Norge|Gruppen|Group|norsk|norwegian)\b/i.test(trimmed) ||
        /[æøåÆØÅ]/.test(trimmed)
      if (hasNorwegianSignal) {
        const hit = await brregByName(trimmed)
        if (hit?.name) {
          return Response.json({ companyName: hit.name, domain: hit.domain, orgNr: hit.orgNr, confidence: 'high', source: 'brreg' })
        }
      }
    }

    // Strategy 3: Claude global knowledge
    if (process.env.ANTHROPIC_API_KEY) {
      const hit = await resolveViaClaud(trimmed, inputIsDomain ? 'domain' : 'name')
      if (hit?.companyName) {
        // If Claude returned a .no domain, enrich with Brreg orgNr
        const resolvedDomain = hit.domain || domain
        let orgNr = null
        if (resolvedDomain?.endsWith('.no')) {
          const brregHit = await brregByDomain(resolvedDomain)
          if (brregHit?.orgNr) orgNr = brregHit.orgNr
        }
        return Response.json({ companyName: hit.companyName, domain: resolvedDomain, orgNr, confidence: 'medium', source: 'claude' })
      }
    }

    // Strategy 4: infer company name from domain stem (domain-only last resort)
    if (inputIsDomain) {
      const stem = domain.split('.')[0].replace(/-/g, ' ')
      const inferred = stem.charAt(0).toUpperCase() + stem.slice(1)
      return Response.json({ companyName: inferred, domain, confidence: 'low', source: 'inferred' })
    }

    return Response.json({ error: 'Could not identify company' }, { status: 404 })
  } catch (err) {
    console.error('[resolve]', err)
    return Response.json({ error: 'Resolver error' }, { status: 500 })
  }
}
