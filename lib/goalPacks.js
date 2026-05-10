// Industry keyword detection — returns industry key
export function detectIndustry(text, tld, brreg) {
  const t = (text || '').toLowerCase()
  const sector = (brreg?.naeringskode1?.beskrivelse || '').toLowerCase()

  if (/saas|software|platform|api|subscription|cloud|app\b|tech|digital/.test(t) || /programvar|data/.test(sector)) return 'tech_saas'
  if (/renewable|wind|solar|hydro|kraft|energi|power|turbine/.test(t) || /energi|elektri/.test(sector)) return 'renewable_energy'
  if (/maritime|shipping|vessel|offshore|marine|ship|fleet/.test(t) || /sjøfart|maritim/.test(sector)) return 'maritime'
  if (/bank|finance|capital|investment|insurance|finans|fond/.test(t) || /finans|bank/.test(sector)) return 'finance'
  if (/retail|store|shop|ecommerce|e-commerce|butikk|handel/.test(t) || /detaljhandel/.test(sector)) return 'retail'
  if (/consult|advisory|rådgiv|management|strategy/.test(t) || /konsulent|rådgiv/.test(sector)) return 'consulting'
  if (/construc|bygg|anlegg|property|real estate|bolig/.test(t) || /bygg|konstruk/.test(sector)) return 'construction'
  if (/health|helse|pharma|medical|clinic|hospital/.test(t) || /helse|medisin/.test(sector)) return 'healthcare'
  if (/manufactur|produksjon|industri|factory|plant/.test(t) || /industri|produk/.test(sector)) return 'manufacturing'
  return 'default'
}

// Map industry to display label
export const INDUSTRY_LABELS = {
  tech_saas:        'SaaS / Technology',
  renewable_energy: 'Renewable Energy',
  maritime:         'Maritime / Shipping',
  finance:          'Finance / Investment',
  retail:           'Retail / E-commerce',
  consulting:       'Consulting / Advisory',
  construction:     'Construction / Real Estate',
  healthcare:       'Healthcare',
  manufacturing:    'Manufacturing',
  default:          'Business Services',
}

// State assignment logic — creates variety with a Dire lead when realistic
function assignState(rank, hasRevenue, isGrowing) {
  // rank 1 = most important goal, tends to be stressed
  // Vary based on company signals
  const states = ['dire', 'optimistic', 'harmonious', 'pessimistic', 'optimistic', 'harmonious', 'optimistic']
  if (hasRevenue && isGrowing) {
    return ['harmonious', 'optimistic', 'harmonious', 'optimistic', 'pessimistic', 'optimistic', 'harmonious'][rank - 1] || 'optimistic'
  }
  return states[rank - 1] || 'optimistic'
}

const STATE_META = {
  defensive:   { label: 'Defensive',   color: '#1d4e6b', bg: '#d6eaf8', action: 'Raise',     evidence: 'strong' },
  potent:      { label: 'Potent',      color: '#148f77', bg: '#d1f2eb', action: 'Explore',   evidence: 'weak'   },
  harmonious:  { label: 'Harmonious',  color: '#1a9e8a', bg: '#d5f5e3', action: 'Ensure',    evidence: 'strong' },
  optimistic:  { label: 'Optimistic',  color: '#2ab09a', bg: '#d1f2eb', action: 'Prove',     evidence: 'weak'   },
  dire:        { label: 'Dire',        color: '#c0392b', bg: '#fadbd8', action: 'Lower',     evidence: 'strong' },
  pessimistic: { label: 'Pessimistic', color: '#e07070', bg: '#fde8e8', action: 'Intervene', evidence: 'weak'   },
}

// Goal packs per industry — 7 goals each
const GOAL_PACKS = {
  tech_saas: [
    { rank: 1, name: 'Annual Recurring Revenue (ARR)', unit: 'NOK', target: '12M', threshold: '8M', context: 'Industry benchmark: top-quartile SaaS at this stage targets 3× growth YoY', action_detail: 'Review pricing tiers and reduce churn to protect ARR floor' },
    { rank: 2, name: 'Monthly Churn Rate', unit: '%', target: '1.5', threshold: '3.0', context: 'Below 2% monthly churn is the benchmark for healthy SaaS retention', action_detail: 'Run customer success check-ins with accounts silent for 30+ days', isLower: true },
    { rank: 3, name: 'Net Promoter Score (NPS)', unit: 'score', target: '50', threshold: '30', context: 'NPS above 50 indicates strong product-market fit in B2B SaaS', action_detail: 'Interview top detractors within 7 days of score collection' },
    { rank: 4, name: 'Customer Acquisition Cost (CAC) Payback', unit: 'months', target: '12', threshold: '18', context: 'Sub-12-month payback is the efficiency benchmark for growth-stage SaaS', action_detail: 'Audit paid channel ROI and shift budget to lowest CAC channels', isLower: true },
    { rank: 5, name: 'Monthly Active Users (MAU)', unit: 'users', target: '500', threshold: '300', context: 'Engagement depth predicts retention — below 300 MAU signals adoption risk', action_detail: 'Launch in-app activation sequence for users with < 3 sessions' },
    { rank: 6, name: 'Sales Cycle Length', unit: 'days', target: '21', threshold: '45', context: 'B2B SaaS at this price point benchmarks at 3–6 weeks average', action_detail: 'Add ROI calculator to proposal flow to accelerate decision', isLower: true },
    { rank: 7, name: 'Product-qualified Leads (PQL)', unit: 'per month', target: '80', threshold: '40', context: 'PQL volume predicts pipeline quality better than raw lead volume', action_detail: 'Define and instrument PQL triggers with your product team' },
  ],
  renewable_energy: [
    { rank: 1, name: 'Annual Energy Production (AEP)', unit: 'GWh', target: '450', threshold: '380', context: 'Norwegian hydro benchmarks suggest 90%+ capacity utilisation is achievable', action_detail: 'Review maintenance schedule impact on planned outage windows' },
    { rank: 2, name: 'Revenue per MWh', unit: 'NOK', target: '620', threshold: '480', context: 'Spot price exposure vs. contract mix determines revenue floor', action_detail: 'Review hedging ratio — consider 60% contract coverage for stability' },
    { rank: 3, name: 'Lost Time Injury Frequency (LTIF)', unit: 'per million hours', target: '0.5', threshold: '2.0', context: 'Industry safety standard: LTIF below 1.0 is considered best practice', action_detail: 'Conduct safety walk with field teams within 14 days', isLower: true },
    { rank: 4, name: 'Plant Availability Factor', unit: '%', target: '95', threshold: '88', context: 'Availability above 90% is the Norwegian grid code benchmark', action_detail: 'Escalate top 3 unplanned downtime causes to operations lead' },
    { rank: 5, name: 'CO₂ Intensity of Portfolio', unit: 'gCO₂/kWh', target: '5', threshold: '15', context: 'Renewable portfolio should target near-zero scope 2 intensity', action_detail: 'Commission lifecycle assessment for newest asset class', isLower: true },
    { rank: 6, name: 'Grid Connection Uptime', unit: '%', target: '99.5', threshold: '97', context: 'Grid SLA compliance affects both revenue and regulatory standing', action_detail: 'Review redundancy with grid operator and update contingency plan' },
    { rank: 7, name: 'Customer Satisfaction (B2B)', unit: 'score', target: '4.2', threshold: '3.5', context: 'B2B energy contracts increasingly require satisfaction ratings above 4.0', action_detail: 'Run quarterly business review with top 5 offtake customers' },
  ],
  maritime: [
    { rank: 1, name: 'Fleet Revenue', unit: 'NOK M', target: '280', threshold: '210', context: 'Norwegian maritime benchmark: revenue per vessel should exceed 40M NOK p.a.', action_detail: 'Renegotiate spot contracts with low-margin routes this quarter' },
    { rank: 2, name: 'Fleet Utilisation Rate', unit: '%', target: '88', threshold: '75', context: 'Below 75% utilisation signals overcapacity or weak order book', action_detail: 'Activate idle vessel commercial outreach in adjacent trade lanes' },
    { rank: 3, name: 'On-time Delivery Rate', unit: '%', target: '96', threshold: '90', context: 'Customer SLA compliance above 95% is the industry expectation', action_detail: 'Investigate top 3 delay root causes from last 90 days' },
    { rank: 4, name: 'Fuel Efficiency (EEOI)', unit: 'gCO₂/t·nm', target: '8', threshold: '12', context: 'IMO 2030 targets require measurable EEOI improvement each year', action_detail: 'Review route optimisation and speed profiles with operations', isLower: true },
    { rank: 5, name: 'Safety Incident Rate (LTIF)', unit: 'per million hours', target: '0.8', threshold: '3.0', context: 'IMO STCW benchmark: LTIF below 1.0 across fleet operations', action_detail: 'Enforce safety drill compliance on vessels with open findings', isLower: true },
    { rank: 6, name: 'Crew Retention Rate', unit: '%', target: '85', threshold: '70', context: 'Experienced crew is a key cost and safety driver — retention below 70% is critical', action_detail: 'Survey officers on contract renewal intentions before Q3 close' },
    { rank: 7, name: 'Drydock Budget Variance', unit: '%', target: '5', threshold: '15', context: 'Cost overruns above 15% indicate project management risk', action_detail: 'Review change order approval process with technical superintendent', isLower: true },
  ],
  finance: [
    { rank: 1, name: 'Assets Under Management (AUM)', unit: 'NOK M', target: '850', threshold: '650', context: 'Norwegian fund benchmark: AUM growth of 15%+ p.a. is competitive', action_detail: 'Accelerate institutional sales pipeline for Q3 close' },
    { rank: 2, name: 'Cost-to-Income Ratio (CIR)', unit: '%', target: '45', threshold: '60', context: 'CIR below 50% is the European banking efficiency benchmark', action_detail: 'Review operational cost structure with CFO this quarter', isLower: true },
    { rank: 3, name: 'Net Interest Margin (NIM)', unit: '%', target: '2.8', threshold: '2.0', context: 'Norwegian bank median NIM is 2.4% — below 2% signals compression risk', action_detail: 'Review loan pricing model vs. funding cost movement' },
    { rank: 4, name: 'Non-Performing Loan Ratio (NPL)', unit: '%', target: '1.5', threshold: '4.0', context: 'NPL above 3% triggers enhanced regulatory scrutiny in Norway', action_detail: 'Escalate top 10 NPL accounts to workout team immediately', isLower: true },
    { rank: 5, name: 'Client Satisfaction Score', unit: 'NPS', target: '55', threshold: '35', context: 'Nordic private banking benchmark NPS: 45–65 for top performers', action_detail: 'Implement relationship manager quarterly review calls' },
    { rank: 6, name: 'Capital Adequacy Ratio (CAR)', unit: '%', target: '18', threshold: '14.5', context: 'Finanstilsynet minimum Tier 1 is 13.5% — 14.5% is the prudent floor', action_detail: 'Review risk-weighted asset composition with risk committee' },
    { rank: 7, name: 'Digital Adoption Rate', unit: '%', target: '78', threshold: '60', context: 'Digital-first banking benchmark: 70%+ of transactions via digital channels', action_detail: 'Launch mobile app onboarding campaign for branch-heavy customers' },
  ],
  retail: [
    { rank: 1, name: 'Total Revenue', unit: 'NOK M', target: '180', threshold: '140', context: 'Norwegian retail growth benchmark: 8–12% YoY revenue growth', action_detail: 'Review category performance and reallocate shelf/ad budget' },
    { rank: 2, name: 'Gross Margin', unit: '%', target: '42', threshold: '35', context: 'Norwegian specialty retail margin benchmark: 38–45% gross margin', action_detail: 'Renegotiate top 10 supplier contracts before next buying cycle' },
    { rank: 3, name: 'Same-store Sales Growth', unit: '%', target: '5', threshold: '0', context: 'Flat same-store sales signals underlying weakness masked by expansion', action_detail: 'Investigate underperforming stores — staff, layout, or local competition?' },
    { rank: 4, name: 'Customer Retention Rate', unit: '%', target: '65', threshold: '48', context: 'Repeat purchase rate above 60% is the loyalty benchmark in Norwegian retail', action_detail: 'Launch win-back campaign for customers lapsed 90+ days' },
    { rank: 5, name: 'Inventory Turnover', unit: '×/year', target: '8', threshold: '5', context: 'Inventory turning below 5× indicates excess stock and margin pressure', action_detail: 'Mark down slow movers before next season and free up cash' },
    { rank: 6, name: 'Online Revenue Share', unit: '%', target: '35', threshold: '20', context: 'Norwegian retail: e-commerce share below 20% signals digital gap', action_detail: 'Review digital marketing spend and conversion optimisation' },
    { rank: 7, name: 'Net Promoter Score', unit: 'score', target: '52', threshold: '30', context: 'NPS below 30 in retail signals service quality risk', action_detail: 'Run mystery shopping across 5 stores and review staff training' },
  ],
  consulting: [
    { rank: 1, name: 'Revenue per Consultant', unit: 'NOK', target: '2.4M', threshold: '1.8M', context: 'Norwegian management consulting benchmark: 2.0–2.8M NOK per FTE', action_detail: 'Review proposal win rate and average deal size this quarter' },
    { rank: 2, name: 'Billable Utilisation Rate', unit: '%', target: '75', threshold: '62', context: 'Utilisation below 65% signals bench risk or sales pipeline weakness', action_detail: 'Assign bench consultants to business development or training' },
    { rank: 3, name: 'Client Satisfaction (CSAT)', unit: 'score', target: '4.5', threshold: '3.8', context: 'CSAT below 4.0 on 5-point scale predicts low renewal probability', action_detail: 'Conduct mid-project health check on all active engagements' },
    { rank: 4, name: 'Revenue Concentration Risk', unit: '% from top 3 clients', target: '35', threshold: '55', context: 'Revenue concentration above 50% in top 3 clients creates fragility', action_detail: 'Prioritise business development with 3 new target accounts', isLower: true },
    { rank: 5, name: 'Proposal Win Rate', unit: '%', target: '40', threshold: '25', context: 'Win rate below 30% signals positioning or pricing misalignment', action_detail: 'Run loss review on last 5 lost proposals with partner team' },
    { rank: 6, name: 'Staff Turnover Rate', unit: '%', target: '12', threshold: '22', context: 'Above 20% turnover in consulting signals retention crisis', action_detail: 'Conduct stay interviews with consultants in first 2 years', isLower: true },
    { rank: 7, name: 'Average Project Margin', unit: '%', target: '32', threshold: '22', context: 'Project margins below 25% indicate underpricing or scope creep', action_detail: 'Review budget-to-actual on all projects flagging >10% overrun' },
  ],
  construction: [
    { rank: 1, name: 'Revenue', unit: 'NOK M', target: '320', threshold: '240', context: 'Norwegian construction market growth benchmark: 5–8% YoY', action_detail: 'Review project pipeline and accelerate 3 proposals in late stage' },
    { rank: 2, name: 'Project Gross Margin', unit: '%', target: '14', threshold: '8', context: 'Norwegian construction benchmark: 10–16% gross margin per project', action_detail: 'Investigate top 3 low-margin projects for escalation' },
    { rank: 3, name: 'On-time Project Delivery', unit: '%', target: '88', threshold: '72', context: 'Delivery rate below 75% triggers penalty clauses and reputational risk', action_detail: 'Run root cause analysis on delayed projects with project managers' },
    { rank: 4, name: 'Safety (H1 Injury Rate)', unit: 'per million hours', target: '3', threshold: '8', context: 'Byggenæringens Landsforening benchmark: H1 below 5 is industry standard', action_detail: 'Enforce toolbox talks and PPE audits at all active sites', isLower: true },
    { rank: 5, name: 'Budget Variance', unit: '%', target: '3', threshold: '10', context: 'Cost overruns above 8% predict project margin below breakeven', action_detail: 'Review cost reporting cadence and escalation thresholds', isLower: true },
    { rank: 6, name: 'Subcontractor Quality Rate', unit: '%', target: '95', threshold: '82', context: 'High defect rates from subcontractors drive rework costs above 3% of revenue', action_detail: 'Implement incoming quality check for top 10 subcontractors' },
    { rank: 7, name: 'Tender Win Rate', unit: '%', target: '30', threshold: '18', context: 'Win rate below 20% signals pricing or capability misalignment', action_detail: 'Review bid/no-bid criteria with commercial director' },
  ],
  healthcare: [
    { rank: 1, name: 'Patient/Client Revenue', unit: 'NOK M', target: '95', threshold: '72', context: 'Norwegian private healthcare: revenue growth 5–10% p.a. is competitive', action_detail: 'Review referral patterns and marketing to GPs in catchment area' },
    { rank: 2, name: 'Patient Satisfaction Score', unit: 'score', target: '4.6', threshold: '4.0', context: 'Helse Norge benchmark: PREM score above 4.2 signals quality care', action_detail: 'Investigate lowest-rated departments and add patient liaison' },
    { rank: 3, name: 'Average Wait Time', unit: 'days', target: '7', threshold: '21', context: 'Norwegian health service standard: specialist wait below 4 weeks', action_detail: 'Review scheduling capacity and add extended hours where needed', isLower: true },
    { rank: 4, name: 'Staff-to-Patient Ratio', unit: 'FTE/patient', target: '0.8', threshold: '0.6', context: 'Below 0.65 FTE/patient signals care quality and burnout risk', action_detail: 'Review staffing model vs. patient load projections for next 90 days' },
    { rank: 5, name: 'Clinical Incident Rate', unit: 'per 1000 encounters', target: '1.5', threshold: '4.0', context: 'Meldeordningen benchmark: below 2.0 per 1000 is best practice', action_detail: 'Review top incident categories in last quarter root cause log', isLower: true },
    { rank: 6, name: 'Revenue per Consultation', unit: 'NOK', target: '1800', threshold: '1300', context: 'Private clinic benchmark: 1400–2200 NOK per billable consultation', action_detail: 'Review billing completeness and invoicing leakage' },
    { rank: 7, name: 'Staff Turnover Rate', unit: '%', target: '10', threshold: '18', context: 'Healthcare turnover above 15% signals structural retention issues', action_detail: 'Run confidential pulse survey with clinical staff', isLower: true },
  ],
  manufacturing: [
    { rank: 1, name: 'Revenue', unit: 'NOK M', target: '420', threshold: '340', context: 'Norwegian manufacturing: 5–10% annual growth in competitive segments', action_detail: 'Review key account pipeline and accelerate 3 large order negotiations' },
    { rank: 2, name: 'Overall Equipment Effectiveness (OEE)', unit: '%', target: '82', threshold: '68', context: 'World-class OEE benchmark: 85%. Below 70% signals maintenance or process issues', action_detail: 'Run OEE deep dive on lowest-performing production line' },
    { rank: 3, name: 'Gross Margin', unit: '%', target: '28', threshold: '20', context: 'Norwegian manufacturing benchmark: 22–32% gross margin in value-add segments', action_detail: 'Review material cost variance and pricing model with CFO' },
    { rank: 4, name: 'On-time Delivery to Customer', unit: '%', target: '96', threshold: '88', context: 'Customer SLA compliance below 90% triggers penalty risk', action_detail: 'Review production planning process and buffer stock levels' },
    { rank: 5, name: 'Defect Rate (PPM)', unit: 'PPM', target: '500', threshold: '2000', context: 'ISO 9001 benchmark: PPM below 1000 for certified manufacturers', action_detail: 'Investigate root cause of top 3 defect categories with QA', isLower: true },
    { rank: 6, name: 'Safety Incident Rate (H1)', unit: 'per million hours', target: '2', threshold: '7', context: 'Norsk Industri benchmark: H1 below 5 is the sector standard', action_detail: 'Conduct safety walk and near-miss review with shift supervisors', isLower: true },
    { rank: 7, name: 'Inventory Turns', unit: '×/year', target: '10', threshold: '6', context: 'Below 6 turns signals excess WIP and cash trapped in inventory', action_detail: 'Review raw material ordering cadence and safety stock levels' },
  ],
  default: [
    { rank: 1, name: 'Annual Revenue', unit: 'NOK M', target: '85', threshold: '65', context: 'Benchmark against sector peers suggests 8–12% YoY growth is achievable', action_detail: 'Review sales pipeline and identify top 3 opportunities to accelerate' },
    { rank: 2, name: 'Gross Margin', unit: '%', target: '38', threshold: '28', context: 'Margins below 30% limit reinvestment capacity and signal pricing pressure', action_detail: 'Conduct pricing review and renegotiate top supplier contracts' },
    { rank: 3, name: 'Customer Satisfaction (NPS)', unit: 'score', target: '48', threshold: '28', context: 'NPS below 30 predicts churn and limits word-of-mouth growth', action_detail: 'Run customer survey and interview top 5 detractors within 14 days' },
    { rank: 4, name: 'Staff Turnover Rate', unit: '%', target: '12', threshold: '22', context: 'Above 20% turnover creates hiring costs above 20% of payroll', action_detail: 'Conduct stay interviews and review compensation benchmarks', isLower: true },
    { rank: 5, name: 'Operating Cost Ratio', unit: '%', target: '58', threshold: '72', context: 'Cost ratio above 70% limits EBITDA and signals operational inefficiency', action_detail: 'Review top 5 cost categories for reduction opportunities', isLower: true },
    { rank: 6, name: 'Digital Revenue Share', unit: '%', target: '30', threshold: '15', context: 'Below 15% digital revenue suggests untapped growth channel', action_detail: 'Assess digital go-to-market readiness with commercial team' },
    { rank: 7, name: 'Cash Conversion Cycle', unit: 'days', target: '28', threshold: '55', context: 'CCC above 45 days signals receivables or inventory management risk', action_detail: 'Review debtor aging and tighten payment terms with slow payers', isLower: true },
  ],
}

// Drivers and actions per industry
const INDUSTRY_DRIVERS = {
  tech_saas:        ['Churn rate creeping above 2% monthly', 'CAC rising faster than LTV', 'Product-market fit incomplete in secondary segments'],
  renewable_energy: ['Spot price volatility affecting revenue floor', 'Planned maintenance windows reducing AEP', 'Grid connection reliability under-monitored'],
  maritime:         ['Route profitability uneven across fleet', 'Fuel cost exposure unhedged', 'Crew experience level declining with turnover'],
  finance:          ['Funding cost vs. loan yield compression', 'Regulatory capital buffer thinning', 'Digital adoption lagging peers'],
  retail:           ['Online-offline pricing inconsistency', 'Inventory accumulation in slow categories', 'Customer lifetime value declining'],
  consulting:       ['Revenue concentration in fewer clients', 'Utilisation rate masking bench cost', 'Proposal quality inconsistent across teams'],
  construction:     ['Material cost inflation outpacing contract prices', 'Subcontractor quality variability', 'Safety compliance gaps on remote sites'],
  healthcare:       ['Wait time pressure from referral growth', 'Staff burnout risk in high-load departments', 'Billing leakage on complex cases'],
  manufacturing:    ['OEE dragged by unplanned downtime', 'Raw material cost volatility', 'Skilled labour shortage in production'],
  default:          ['Revenue concentration risk in top customers', 'Operating cost growth outpacing revenue', 'Digital capability lagging market expectations'],
}

const INDUSTRY_ACTIONS = {
  tech_saas:        ['Map and instrument every step of the activation funnel this week', 'Run a pricing sensitivity analysis with 10 current customers', 'Build a churn prediction model from login frequency data'],
  renewable_energy: ['Complete maintenance schedule review with operations lead', 'Review spot vs. contract revenue ratio with CFO', 'Conduct field safety walk at lowest-scoring site'],
  maritime:         ['Renegotiate bottom-quartile voyage contracts this month', 'Complete fleet fuel optimisation review', 'Run crew retention survey on vessels with highest turnover'],
  finance:          ['Review loan book concentration with risk committee', 'Launch digital onboarding campaign for branch-heavy clients', 'Update stress testing model with current rate assumptions'],
  retail:           ['Mark down slow-moving inventory before next season', 'Launch win-back campaign for lapsed customers', 'Review top 5 supplier contracts for margin improvement'],
  consulting:       ['Assign bench consultants to active business development projects', 'Run proposal loss review with top 3 partners', 'Conduct client satisfaction review on all active engagements'],
  construction:     ['Review project budget-to-actual on all flagged projects', 'Conduct safety walk on lowest-scoring sites', 'Tighten change order approval process this week'],
  healthcare:       ['Add resource to highest wait-time departments immediately', 'Run patient satisfaction deep dive in lowest-scoring units', 'Review billing completeness on top 20 complex cases'],
  manufacturing:    ['Run OEE deep dive on lowest-performing line', 'Audit top 3 defect categories with QA team', 'Review raw material safety stock vs. lead times'],
  default:          ['Map your top 3 revenue risks and assign an owner to each', 'Review customer retention metrics from last 90 days', 'Benchmark your costs against 3 comparable companies'],
}

export function generateGoals(industry, hasRevenue = false, isGrowing = false) {
  const pack = GOAL_PACKS[industry] || GOAL_PACKS.default
  const drivers = INDUSTRY_DRIVERS[industry] || INDUSTRY_DRIVERS.default
  const actions = INDUSTRY_ACTIONS[industry] || INDUSTRY_ACTIONS.default

  const goals = pack.map(g => {
    const state = assignState(g.rank, hasRevenue, isGrowing)
    const meta = STATE_META[state]
    return {
      ...g,
      state,
      stateLabel: meta.label,
      stateColor: meta.color,
      stateBg: meta.bg,
      stateAction: meta.action,
      evidence: meta.evidence,
      visible: g.rank <= 3,
    }
  })

  return { goals, drivers, actions }
}
