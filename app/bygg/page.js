import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'De-Risk Matrix for Bygg & Anlegg',
  description: 'Strategisk mål- og risikostyring for bygg- og anleggsbransjen. Fang opp kostnadsoverskridelser og forsinkelser før de skjer.',
}

const APP_URL = 'https://app.deriskmatrix.com'

const PAIN_POINTS = [
  {
    icon: '◉',
    title: 'Cost overruns surface too late',
    no: 'Budsjettoverskridelser',
    desc: 'By the time the numbers are undeniable, the project is already months past the point where corrective action would have mattered. Construction projects bleed budget slowly — and most organizations only see it when it becomes a crisis.',
  },
  {
    icon: '⬡',
    title: 'Delays compound silently',
    no: 'Forsinkelser',
    desc: 'A two-week slip in week four becomes an eight-week slip at handover. Sequential dependencies mean early drift multiplies. Leaders rarely see the trajectory — they see the result.',
  },
  {
    icon: '⚠',
    title: 'HSE incidents catch you off guard',
    no: 'HMS-avvik og hendelser',
    desc: 'Incident rates, near-misses, and unsafe working conditions are trackable — but most projects treat them reactively. A rising incident rate is a signal weeks before it becomes a reportable event.',
  },
  {
    icon: '◈',
    title: 'Subcontractor risk is invisible',
    no: 'Underleverandørrisiko',
    desc: 'You depend on sub-deliveries you cannot fully see. By the time a subcontractor falls behind, your own schedule is already at risk. Most projects have no structured early-warning on subcontractor performance.',
  },
  {
    icon: '◆',
    title: 'Quality defects arrive late',
    no: 'Reklamasjoner og kvalitetsfeil',
    desc: 'Defects found at handover are expensive. Defects found by the client are catastrophic. Quality tracking in most projects is retrospective — punch lists instead of leading indicators.',
  },
  {
    icon: '◎',
    title: 'Long projects mask drift',
    no: 'Lange prosjekter — problemer oppdages for sent',
    desc: 'Eighteen-month projects give leadership the illusion of time. Early drift is tolerated because "there is plenty of time to recover." There is not. De-Risk Matrix shows you the trajectory — not the illusion.',
  },
]

const USE_CASES = [
  {
    title: 'Prosjektkostnad — budget vs. actual',
    subtitle: 'Cost control with a risk corridor',
    desc: 'Define a project cost goal with a target (budget) and a threshold (maximum acceptable overrun). As actuals are updated, De-Risk Matrix calculates the risk state automatically. If cost is tracking above threshold with strong evidence — it is Dire, and leadership knows before the next monthly report.',
    goals: ['Target: NOK 85M delivered within budget', 'Threshold: NOK 90M — above this, the project economics break', 'Risk state updates as invoices and commitments come in'],
    state: 'Dire',
    stateColor: '#c0392b',
    stateBg: '#fadbd8',
    action: 'Lower — lower uncertainty through immediate, structured action',
  },
  {
    title: 'Leveringstid — schedule tracking',
    subtitle: 'Progress against the milestone plan',
    desc: 'Track schedule completion as a percentage or against a critical path. Set the target (on-time delivery) and a threshold (maximum acceptable delay). The system flags Pessimistic as soon as progress deviates — weeks before the handover date is at risk.',
    goals: ['Target: handover by week 48', 'Threshold: no later than week 52', 'Progress tracked per milestone, per subcontractor'],
    state: 'Pessimistic',
    stateColor: '#e07070',
    stateBg: '#fde8e8',
    action: 'Intervene — act even with limited information. Do not wait for certainty.',
  },
  {
    title: 'HMS-avvik — HSE incident rate',
    subtitle: 'Safety as a quantified goal',
    desc: 'Set an HSE incident goal — near-misses, reportable incidents, unsafe conditions observed per work-week. Target: zero reportable. Threshold: where the rate signals a systemic problem. The system tracks the trend, not just the count, and flags when the trajectory is moving the wrong direction.',
    goals: ['Target: 0 reportable incidents per month', 'Threshold: incident rate above 2 per 1000 work-hours', 'Leading indicator: near-miss rate tracked weekly'],
    state: 'Optimistic',
    stateColor: '#2ab09a',
    stateBg: '#d1f2eb',
    action: 'Prove — demand data that confirms the trajectory before celebrating safety.',
  },
  {
    title: 'Reklamasjonsrate — quality defects',
    subtitle: 'Defect tracking before handover',
    desc: 'Track defect and snag rates during execution — not just at punch list. A rising defect rate in week 30 tells you something about your quality management process. Catch the systemic issue before the client does.',
    goals: ['Target: defect rate below 0.5% of completed work items', 'Threshold: above 2% signals a quality management failure', 'Subcontractor defect rates tracked individually'],
    state: 'Harmonious',
    stateColor: '#1a9e8a',
    stateBg: '#d5f5e3',
    action: 'Ensure — protect the conditions producing this quality result.',
  },
]

const RISK_STATES = [
  {
    label: 'Defensive',
    position: 'Ahead of plan · Strong evidence',
    color: '#1d4e6b',
    bg: '#d6eaf8',
    action: 'Raise — recalibrate ambition upward',
    construction: 'Budget underspent with strong cost controls in place. Raise the bar — is the target right?',
  },
  {
    label: 'Potent',
    position: 'Ahead of plan · Weak evidence',
    color: '#148f77',
    bg: '#d1f2eb',
    action: 'Explore — understand why before celebrating',
    construction: 'Schedule ahead — but why? Was it favorable ground conditions, or is your baseline wrong?',
  },
  {
    label: 'Harmonious',
    position: 'On track · Strong evidence',
    color: '#1a9e8a',
    bg: '#d5f5e3',
    action: 'Ensure — protect what is working',
    construction: 'Cost tracking to plan, evidence solid. Protect the team and process producing this result.',
  },
  {
    label: 'Optimistic',
    position: 'On track · Weak evidence',
    color: '#2ab09a',
    bg: '#d1f2eb',
    action: 'Prove — demand the evidence',
    construction: 'Schedule looks fine, but measurement is monthly. Increase data frequency before the deadline.',
  },
  {
    label: 'Dire',
    position: 'Below threshold · Strong evidence',
    color: '#c0392b',
    bg: '#fadbd8',
    action: 'Lower — act immediately, with structure',
    construction: 'Cost is above threshold. The evidence is clear. Escalate now. No "wait and see."',
  },
  {
    label: 'Pessimistic',
    position: 'Below threshold · Weak evidence',
    color: '#e07070',
    bg: '#fde8e8',
    action: 'Intervene — gather evidence and stabilize in parallel',
    construction: 'Schedule slipping, but data is thin. Run an evidence sprint while taking stabilizing action.',
  },
]

export default function ByggPage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="hero-gradient pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-teal/20 text-teal text-xs font-bold px-3 py-1.5 rounded-full mb-6 border border-teal/30">
            Bygg &amp; Anlegg
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
            Stop managing cost overruns.<br className="hidden md:block" />
            <span className="gradient-text">Start preventing them.</span>
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8">
            De-Risk Matrix gives construction project leaders a live risk state for every
            critical goal — cost, schedule, HSE, quality, subcontractors — with prescribed
            leadership actions for each state. Not a dashboard. A management system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`${APP_URL}/register`}
              className="px-8 py-4 bg-teal hover:bg-teal-dark text-white font-black rounded-xl transition-colors shadow-lg text-lg"
            >
              Start 14-day trial →
            </a>
            <Link
              href="/methodology"
              className="px-7 py-4 bg-white/8 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/15 transition-colors"
            >
              How the methodology works
            </Link>
          </div>
          <p className="text-slate-500 text-sm mt-5">No credit card required · Full access · All features</p>
        </div>
      </section>

      {/* ── Pain points ───────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">The problem</p>
            <h2 className="text-3xl font-black text-navy mb-3">
              Construction risk is predictable.<br />Most tools just tell you after the fact.
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Budget overruns, schedule slippage, HSE incidents — they all have leading indicators.
              The problem is not the data. It is the system for reading it in time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {PAIN_POINTS.map(p => (
              <div key={p.title} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="text-teal text-2xl flex-shrink-0 mt-0.5">{p.icon}</span>
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">{p.no}</div>
                    <h3 className="font-black text-navy mb-2">{p.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works — core mechanism ─────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-bold text-teal uppercase tracking-widest mb-3">How it works</p>
              <h2 className="text-3xl font-black text-navy mb-4">
                Goals as spans. Risk as a state. Actions as prescriptions.
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Every project goal — cost, schedule, HSE rate, quality — is defined with two
                numbers: a <strong className="text-navy">target</strong> (what you are aiming for)
                and a <strong className="text-navy">threshold</strong> (the minimum acceptable outcome).
                The space between them is the risk corridor.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                As actuals come in, the system calculates a <strong className="text-navy">risk state</strong> automatically —
                based on where the goal sits relative to the corridor, and how strong the
                evidence is. Six states. Each with a named leadership response.
              </p>
              <p className="text-slate-600 leading-relaxed">
                A project cost goal in Dire state is not just a red number. It is a directive:
                escalate immediately, lower uncertainty through structured action, create an
                owner and a deadline. The platform makes the required response explicit.
              </p>
            </div>
            <div className="bg-navy rounded-2xl p-7">
              <div className="text-xs font-bold text-teal uppercase tracking-wider mb-6">
                Example: Prosjektkostnad
              </div>
              <div className="space-y-5">
                {[
                  {
                    step: '01',
                    label: 'Define the goal span',
                    desc: 'Target: NOK 85M. Threshold: NOK 90M. The corridor between them is your risk tolerance.',
                  },
                  {
                    step: '02',
                    label: 'Track actuals against the corridor',
                    desc: 'Cost data comes in — via CSV, webhook, or manual entry. The system reads the trajectory.',
                  },
                  {
                    step: '03',
                    label: 'Risk state is calculated automatically',
                    desc: 'Costs at NOK 88M and rising: Pessimistic. Above NOK 90M with firm evidence: Dire.',
                  },
                  {
                    step: '04',
                    label: 'Leadership response is prescribed',
                    desc: 'Dire → Lower. Escalate now. Owner assigned. Actions tracked. No ambiguity.',
                  },
                ].map(item => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-7 h-7 rounded-full bg-teal/20 text-teal flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">
                      {item.step}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm mb-0.5">{item.label}</div>
                      <div className="text-slate-400 text-sm leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Use cases ─────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Specific use cases</p>
            <h2 className="text-3xl font-black text-navy mb-3">
              What it looks like on a real construction project
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Four of the most common goal types in bygg og anlegg — with how De-Risk Matrix
              structures, tracks, and escalates each one.
            </p>
          </div>

          <div className="space-y-8">
            {USE_CASES.map(uc => (
              <div key={uc.title} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-7 border-b border-slate-100">
                  <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">{uc.subtitle}</div>
                      <h3 className="text-xl font-black text-navy">{uc.title}</h3>
                    </div>
                    <div
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border"
                      style={{ background: uc.stateBg, color: uc.stateColor, borderColor: uc.stateColor + '40' }}
                    >
                      <span>{uc.state}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{uc.desc}</p>
                </div>
                <div className="p-7 grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">How the goal is structured</div>
                    <div className="space-y-2">
                      {uc.goals.map((g, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                          <span className="text-teal flex-shrink-0 mt-0.5">→</span>
                          {g}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div
                    className="rounded-xl p-4 border"
                    style={{ background: uc.stateBg, borderColor: uc.stateColor + '30' }}
                  >
                    <div
                      className="text-xs font-bold uppercase tracking-wider mb-2"
                      style={{ color: uc.stateColor }}
                    >
                      Prescribed leadership response
                    </div>
                    <p className="text-sm font-semibold" style={{ color: uc.stateColor }}>
                      {uc.action}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6 Risk states ─────────────────────────────────────────── */}
      <section className="py-20 bg-navy">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-teal uppercase tracking-widest mb-3">The risk states</p>
            <h2 className="text-3xl font-black text-white mb-3">
              Six states. Six responses. No ambiguity.
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Every goal in De-Risk Matrix is always in one of six states — determined by where
              the goal sits relative to its corridor, and how strong the evidence is. Each state
              prescribes a specific leadership action.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {RISK_STATES.map(s => (
              <div
                key={s.label}
                className="rounded-2xl p-5 border"
                style={{ background: s.bg + '18', borderColor: s.color + '35' }}
              >
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <span className="font-black text-lg" style={{ color: s.color }}>{s.label}</span>
                  <span className="text-xs font-semibold" style={{ color: s.color + 'aa' }}>{s.position}</span>
                </div>
                <p className="text-xs font-bold text-slate-400 mb-2">{s.action}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{s.construction}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/methodology"
              className="inline-block px-6 py-3 bg-white/8 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/15 transition-colors text-sm"
            >
              Full methodology — ISO 31000 aligned →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Early warning ─────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-5">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-4">Without De-Risk Matrix</div>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex gap-2"><span className="text-red-300 flex-shrink-0">✕</span>Cost overrun discovered at month-end reporting</div>
                  <div className="flex gap-2"><span className="text-red-300 flex-shrink-0">✕</span>Schedule slip visible only at milestone review</div>
                  <div className="flex gap-2"><span className="text-red-300 flex-shrink-0">✕</span>HSE trend identified after the incident</div>
                  <div className="flex gap-2"><span className="text-red-300 flex-shrink-0">✕</span>Subcontractor delay caught at handover check</div>
                  <div className="flex gap-2"><span className="text-red-300 flex-shrink-0">✕</span>Leadership acts on last month's data</div>
                </div>
              </div>
              <div className="bg-teal/8 border border-teal/25 rounded-2xl p-6">
                <div className="text-xs font-bold text-teal uppercase tracking-wider mb-4">With De-Risk Matrix</div>
                <div className="space-y-3 text-sm text-slate-700">
                  <div className="flex gap-2"><span className="text-teal flex-shrink-0">✓</span>Cost risk state visible in real time as actuals come in</div>
                  <div className="flex gap-2"><span className="text-teal flex-shrink-0">✓</span>Schedule trajectory flagged weeks before milestone</div>
                  <div className="flex gap-2"><span className="text-teal flex-shrink-0">✓</span>HSE rate tracked against target — trend is the signal</div>
                  <div className="flex gap-2"><span className="text-teal flex-shrink-0">✓</span>Subcontractor goals tracked per deliverable</div>
                  <div className="flex gap-2"><span className="text-teal flex-shrink-0">✓</span>Early warning up to 60 days ahead of threshold breach</div>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-teal uppercase tracking-widest mb-3">Early warning system</p>
              <h2 className="text-3xl font-black text-navy mb-4">
                See the breach before it happens.
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                De-Risk Matrix includes a forecast engine that detects when a goal's trajectory
                is heading toward a threshold breach — up to 60 days in advance. Linear
                extrapolation, Holt-Winters trend analysis, and Monte Carlo simulation
                are built in.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                For construction projects, this means seeing a cost overrun coming in week 20
                — not finding out at week 32. The difference is whether you have time to act.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Slack integration delivers state-change notifications directly to the channel
                where your project team works. No one needs to remember to check the dashboard.
                The system tells you when something changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Who uses it / hierarchy ───────────────────────────────── */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Scope</p>
            <h2 className="text-3xl font-black text-navy mb-3">
              One project. A portfolio. The entire company.
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              De-Risk Matrix works at any level — a single construction project, a portfolio
              of projects across regions, or enterprise-wide strategic goals that cascade into
              project delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: '◈',
                level: 'Project',
                title: 'Single project team',
                items: [
                  'Prosjektkostnad vs. budsjett',
                  'Leveringstid og fremdrift',
                  'HMS-avvik per uke',
                  'Underleverandørrisiko',
                  'Reklamasjonsrate',
                ],
                who: '2–5 people. Project manager, site manager, HSE lead.',
              },
              {
                icon: '⬡',
                level: 'Department',
                title: 'Regional or department view',
                items: [
                  'Portfolio cost performance',
                  'Aggregate schedule risk',
                  'Cross-project HSE trends',
                  'Resource utilization vs. plan',
                  'Subcontractor performance portfolio',
                ],
                who: 'Department manager, project directors, regional leads.',
              },
              {
                icon: '◎',
                level: 'Enterprise',
                title: 'Company-wide strategic goals',
                items: [
                  'Revenue and order book goals',
                  'EBIT margin vs. target',
                  'Company-wide HMS targets',
                  'Client satisfaction and NPS',
                  'Repeat business and framework agreements',
                ],
                who: 'CEO, CFO, board. Live canvas — no deck preparation needed.',
              },
            ].map(level => (
              <div key={level.level} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-teal text-xl">{level.icon}</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{level.level}</span>
                </div>
                <h3 className="font-black text-navy mb-3">{level.title}</h3>
                <div className="space-y-1.5 mb-4">
                  {level.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="text-teal flex-shrink-0 mt-0.5">→</span>
                      {item}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 border-t border-slate-100 pt-4">{level.who}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Methodology callout ───────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-navy rounded-2xl p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-xs font-bold text-teal uppercase tracking-widest mb-3">ISO 31000 aligned</div>
                <h2 className="text-2xl font-black text-white mb-3">
                  Not a spreadsheet. A risk management system.
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  De-Risk Matrix is aligned with ISO 31000 — the international standard for
                  risk management. The methodology treats risk as the effect of uncertainty
                  on objectives. Goals as spans, 6 risk states, evidence assessment, and
                  prescribed leadership responses — all built on the same foundation that
                  serious project management demands.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  ['Goal spans', 'Target + threshold for every goal. The corridor defines your risk tolerance.'],
                  ['6 risk states', 'Defensive, Potent, Harmonious, Optimistic, Dire, Pessimistic. Calculated automatically.'],
                  ['Evidence assessment', '14 factors that determine how confident you are in the current state.'],
                  ['Prescribed responses', 'Each state prescribes a specific leadership action. No ambiguity.'],
                ].map(([term, def]) => (
                  <div key={term} className="flex gap-3">
                    <span className="text-teal flex-shrink-0 mt-1">◆</span>
                    <div>
                      <span className="text-white font-semibold text-sm">{term} — </span>
                      <span className="text-slate-400 text-sm">{def}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-teal">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-white mb-3">
            Start managing project risk the way it should be managed.
          </h2>
          <p className="text-white/80 mb-2 text-lg">
            Define your goals. Set your corridors. Get the risk state — and know what to do about it.
          </p>
          <p className="text-white/60 text-sm mb-8">
            14-day trial · All features · No credit card required
          </p>
          <a
            href={`${APP_URL}/register`}
            className="inline-block px-10 py-4 bg-white text-teal font-black rounded-xl hover:bg-slate-50 transition-colors text-lg shadow-lg"
          >
            Start your trial →
          </a>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-white/60 text-sm">
            <span>Prosjektkostnad</span>
            <span>·</span>
            <span>Leveringstid</span>
            <span>·</span>
            <span>HMS-avvik</span>
            <span>·</span>
            <span>Underleverandørrisiko</span>
            <span>·</span>
            <span>Reklamasjonsrate</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
