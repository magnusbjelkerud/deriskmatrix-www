import Anthropic from '@anthropic-ai/sdk'
import { enrichGoals } from './riskStateEnrichment.js'

const GOAL_PORTFOLIO_TOOL = {
  name: 'generate_goal_portfolio',
  description: 'Generate a strategic goal portfolio for the De-Risk Matrix platform based on company analysis.',
  input_schema: {
    type: 'object',
    required: ['goals', 'drivers', 'actions'],
    properties: {
      goals: {
        type: 'array',
        description: 'Exactly 7 strategic goals ranked by urgency (most urgent first)',
        minItems: 7,
        maxItems: 7,
        items: {
          type: 'object',
          required: [
            'rank', 'name', 'unit',
            'target_value', 'target_display', 'target_unit', 'target_magnitude',
            'threshold_value', 'threshold_display', 'threshold_unit', 'threshold_magnitude',
            'predicted_state', 'context_line', 'suggested_action',
            'confidence', 'evidence_bullets', 'isLower',
          ],
          properties: {
            rank:                { type: 'integer', minimum: 1, maximum: 7 },
            name:                { type: 'string',  description: 'Specific measurable name (e.g., "Annual Recurring Revenue" not "Improve revenue")' },
            unit:                { type: 'string',  description: 'Primary measurement unit (e.g., "NOK", "%", "customers")' },
            target_value:        { type: 'number',  description: 'Actual numeric target in base units — for "120M NOK" use 120000000, for "85%" use 85' },
            target_display:      { type: 'string',  description: 'Human-readable target with magnitude and unit (e.g., "120M NOK", "85%", "500 customers")' },
            target_unit:         { type: 'string',  description: 'Unit for display — matches the unit field' },
            target_magnitude:    { type: 'string',  enum: ['K', 'M', 'B', ''], description: 'Magnitude used in target_display: K=thousands, M=millions, B=billions, ""=raw' },
            threshold_value:     { type: 'number',  description: 'Actual numeric threshold in base units (same convention as target_value)' },
            threshold_display:   { type: 'string',  description: 'Human-readable threshold with magnitude and unit' },
            threshold_unit:      { type: 'string',  description: 'Unit for display — matches the unit field' },
            threshold_magnitude: { type: 'string',  enum: ['K', 'M', 'B', ''], description: 'Magnitude used in threshold_display' },
            predicted_state:     { type: 'string',  enum: ['dire', 'pessimistic', 'harmonious', 'optimistic', 'defensive', 'potent'] },
            context_line:        { type: 'string',  description: 'One sentence: why this specific target makes sense for this company' },
            suggested_action:    { type: 'string',  description: 'One specific sentence: the most important action to take this week' },
            confidence:          { type: 'string',  enum: ['high', 'medium', 'low'], description: 'high=company-specific evidence, medium=industry benchmark, low=inferred' },
            evidence_bullets:    { type: 'array',   items: { type: 'string' }, minItems: 2, maxItems: 3, description: '2-3 short strings (max 12 words each) explaining what supports this suggestion' },
            isLower:             { type: 'boolean', description: 'true when a lower value is better (cost, churn, incident rate, wait time)' },
          },
        },
      },
      drivers: {
        type: 'array',
        description: 'Top 3 risk drivers for this company',
        minItems: 3,
        maxItems: 3,
        items: { type: 'string' },
      },
      actions: {
        type: 'array',
        description: 'Top 3 recommended 30-day actions',
        minItems: 3,
        maxItems: 3,
        items: { type: 'string' },
      },
    },
  },
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
- dire: below threshold + strong evidence → action: Lower
- pessimistic: below threshold + weak evidence → action: Intervene
- harmonious: on track + strong evidence → action: Ensure
- optimistic: on track + weak evidence → action: Prove
- defensive: above target + strong evidence → action: Raise
- potent: above target + weak evidence → action: Explore

Rules:
1. Rank 1 must be DIRE or PESSIMISTIC if ANY stress signals exist (early stage, low employees, limited data, no revenue visible). If the company looks healthy and growing, rank 1 can be OPTIMISTIC.
2. Goals must be specific and measurable — "Annual Recurring Revenue" not "Improve revenue".
3. Targets and thresholds must be realistic for ${sizeHint}.
4. isLower: true when a lower value is better (cost, churn, incident rate, wait time).
5. confidence: "high" = company-specific evidence, "medium" = industry benchmark only, "low" = largely inferred.
6. evidence_bullets: 2-3 short strings (max 12 words each) explaining what supports this suggestion.
7. context_line: one sentence explaining WHY this specific target makes sense for this company.
8. suggested_action: one specific sentence describing the most important action to take this week.
9. target_value / threshold_value: actual base-unit numbers (e.g., 120000000 for "120M NOK", 85 for "85%").`

  const message = await anthropic.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 4096,
    system: 'You are a precise strategic risk advisor. Call generate_goal_portfolio with exactly 7 goals specific to this company and industry.',
    messages: [{ role: 'user', content: prompt }],
    tools: [GOAL_PORTFOLIO_TOOL],
    tool_choice: { type: 'tool', name: 'generate_goal_portfolio' },
  }, { signal: AbortSignal.timeout(50000) })

  const toolResult = message.content.find(c => c.type === 'tool_use')
  if (!toolResult) throw new Error('[claudeAnalyzer] generate_goal_portfolio tool call not found in response')

  const parsed = toolResult.input
  const rawGoals = parsed.goals || []

  // Add UI enrichment (state colors, labels, backward-compat state normalization)
  const enriched = enrichGoals(rawGoals)

  // Sort: Dire → Pessimistic → rest, then by original rank within each group
  enriched.sort((a, b) => {
    const pri = { dire: 0, pessimistic: 1 }
    const aP = pri[a.predicted_state] ?? 2
    const bP = pri[b.predicted_state] ?? 2
    if (aP !== bP) return aP - bP
    return (a.rank || 0) - (b.rank || 0)
  })

  // Re-assign rank and teaser visibility after sort
  enriched.forEach((g, i) => {
    g.rank = i + 1
    g.visible_in_teaser = i < 3
    g.visible = i < 3
  })

  return {
    goals: enriched,
    drivers: parsed.drivers || [],
    actions: parsed.actions || [],
  }
}
