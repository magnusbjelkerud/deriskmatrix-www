import Anthropic from '@anthropic-ai/sdk'

const STATE_META = {
  defensive:   { label: 'Defensive',   color: '#1d4e6b', bg: '#d6eaf8', action: 'Raise',     evidence: 'strong' },
  potent:      { label: 'Potent',      color: '#148f77', bg: '#d1f2eb', action: 'Explore',   evidence: 'weak'   },
  harmonious:  { label: 'Harmonious',  color: '#1a9e8a', bg: '#d5f5e3', action: 'Ensure',    evidence: 'strong' },
  optimistic:  { label: 'Optimistic',  color: '#2ab09a', bg: '#d1f2eb', action: 'Prove',     evidence: 'weak'   },
  dire:        { label: 'Dire',        color: '#c0392b', bg: '#fadbd8', action: 'Lower',     evidence: 'strong' },
  pessimistic: { label: 'Pessimistic', color: '#e07070', bg: '#fde8e8', action: 'Intervene', evidence: 'weak'   },
}

export async function generateGoalsWithClaude({ domain, companyName, industryLabel, countryCode, siteText, brreg, financials }) {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const brregSection = brreg
    ? `Public registry data (Brønnøysund):
- Legal name: ${brreg.name}
- Sector: ${brreg.naeringskode1?.beskrivelse || 'unknown'}
- Employees: ${brreg.employees ?? 'unknown'}
- Founded: ${brreg.founded || 'unknown'}
- Org form: ${brreg.orgForm || 'unknown'}${financials ? `
- Revenue (latest): ${financials.sumDriftsinntekter != null ? `${(financials.sumDriftsinntekter / 1000).toFixed(0)}k NOK` : 'unknown'}
- Operating profit: ${financials.driftsresultat != null ? `${(financials.driftsresultat / 1000).toFixed(0)}k NOK` : 'unknown'}` : ''}`
    : 'No public registry data available (non-Norwegian or not found).'

  const sizeHint = brreg?.employees
    ? brreg.employees > 200 ? 'large company (200+ employees)'
      : brreg.employees > 50 ? 'mid-size company (50-200 employees)'
      : brreg.employees > 10 ? 'small company (10-50 employees)'
      : 'micro/startup (<10 employees)'
    : 'unknown size'

  const prompt = `You are a strategic risk advisor generating a goal portfolio for the De-Risk Matrix platform.

Company: ${companyName} (${domain})
Industry: ${industryLabel}
Country: ${countryCode}
Size: ${sizeHint}

Website content (extract):
${siteText.slice(0, 3000)}

${brregSection}

Generate exactly 7 strategic goals using the De-Risk Matrix methodology.

Risk state definitions (position × evidence):
- defensive: above target + strong evidence → action: Raise
- potent: above target + weak evidence → action: Explore
- harmonious: on track + strong evidence → action: Ensure
- optimistic: on track + weak evidence → action: Prove
- dire: below threshold + strong evidence → action: Lower
- pessimistic: below threshold + weak evidence → action: Intervene

Rules:
1. Goal rank 1 must be DIRE or PESSIMISTIC if ANY stress signals exist (early stage, low employees, limited data, no revenue visible). If the company looks healthy and growing, rank 1 can be OPTIMISTIC.
2. Goals must be specific and measurable — "Annual Recurring Revenue" not "Improve revenue".
3. Targets and thresholds must be realistic for the company's apparent size (use ${sizeHint}).
4. isLower: true when a lower value is better (cost, churn, incident rate, wait time, etc.).
5. confidence: "high" = company-specific evidence available, "medium" = industry benchmark only, "low" = largely inferred.
6. evidence_bullets: 2-3 short strings (max 12 words each) explaining what supports this suggestion.
7. context: one sentence explaining WHY this specific target makes sense for this company.
8. action_detail: one specific sentence describing the most important action to take this week.

Return ONLY valid JSON — no prose, no markdown, no explanation:
{
  "goals": [
    {
      "rank": 1,
      "name": "string",
      "unit": "string",
      "target": "string",
      "threshold": "string",
      "state": "dire|pessimistic|harmonious|optimistic|defensive|potent",
      "context": "string",
      "action_detail": "string",
      "confidence": "high|medium|low",
      "evidence_bullets": ["string", "string"],
      "isLower": false
    }
  ],
  "drivers": ["string", "string", "string"],
  "actions": ["string", "string", "string"]
}`

  const message = await anthropic.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 2048,
    system: 'You are a precise strategic risk advisor. Return only valid JSON matching the exact schema given. No markdown, no explanation.',
    messages: [{ role: 'user', content: prompt }],
  })

  const raw = message.content[0].text.trim().replace(/^```json\n?/, '').replace(/\n?```$/, '').trim()
  const parsed = JSON.parse(raw)

  // Enrich with UI metadata and sort Dire/Pessimistic first
  const enriched = (parsed.goals || []).map(g => {
    const meta = STATE_META[g.state] || STATE_META.optimistic
    return {
      ...g,
      stateLabel: meta.label,
      stateColor: meta.color,
      stateBg:    meta.bg,
      stateAction: meta.action,
      evidence:   meta.evidence,
    }
  })

  enriched.sort((a, b) => {
    const pri = { dire: 0, pessimistic: 1 }
    const aP = pri[a.state] ?? 2
    const bP = pri[b.state] ?? 2
    if (aP !== bP) return aP - bP
    return (a.rank || 0) - (b.rank || 0)
  })

  // Re-assign rank and visible after sort
  enriched.forEach((g, i) => { g.rank = i + 1; g.visible = i < 3 })

  return {
    goals: enriched,
    drivers: parsed.drivers || [],
    actions: parsed.actions || [],
  }
}
