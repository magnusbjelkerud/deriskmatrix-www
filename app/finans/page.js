import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'De-Risk Matrix for Finans & Forsikring',
  description: 'Strukturert risikostyring for finanssektoren. ISO 31000-tilpasset, DORA-relevant, og klar for styret.',
}

const APP_URL = 'https://app.deriskmatrix.com'

const RISK_STATES = [
  {
    label: 'Defensive',
    position: 'Beyond target · Strong evidence',
    color: '#1d4e6b',
    bg: '#d6eaf8',
    border: '#1d4e6b40',
    desc: 'Goal exceeds target with robust evidence. Raise ambition — recalibrate targets upward before complacency sets in.',
  },
  {
    label: 'Potent',
    position: 'Beyond target · Weak evidence',
    color: '#148f77',
    bg: '#d1f2eb',
    border: '#148f7740',
    desc: 'Goal exceeds target but evidence is insufficient. Investigate before celebrating — unexplained outperformance is a risk not yet named.',
  },
  {
    label: 'Harmonious',
    position: 'On track · Strong evidence',
    color: '#1a9e8a',
    bg: '#d5f5e3',
    border: '#1a9e8a40',
    desc: 'Goal is on track with strong evidence. Protect the conditions that produced this outcome — stability is a strategic choice.',
  },
  {
    label: 'Optimistic',
    position: 'On track · Weak evidence',
    color: '#2ab09a',
    bg: '#d1f2eb',
    border: '#2ab09a40',
    desc: 'Goal appears on track but evidence is thin. Build measurement discipline now — confidence without data is unquantified risk.',
  },
  {
    label: 'Dire',
    position: 'Below threshold · Strong evidence',
    color: '#c0392b',
    bg: '#fadbd8',
    border: '#c0392b40',
    desc: 'Goal is materially below threshold with clear evidence. Escalate immediately — structured intervention with defined owners and deadlines.',
  },
  {
    label: 'Pessimistic',
    position: 'Below threshold · Weak evidence',
    color: '#e07070',
    bg: '#fde8e8',
    border: '#e0707040',
    desc: 'Goal is below threshold with limited visibility. Act in parallel: gather evidence urgently while initiating stabilising measures.',
  },
]

const USE_CASES = [
  {
    icon: '◎',
    tag: 'DORA compliance',
    title: 'ICT risk management structured for audit',
    body: 'The Digital Operational Resilience Act (DORA), in force from January 2025, requires financial entities to maintain a structured ICT risk management framework with documented risk tolerances, treatment actions, and evidence of oversight. De-Risk Matrix operationalises this requirement: every ICT-related strategic goal carries a defined target, an explicit threshold (your risk tolerance), and a continuously updated risk state. The full history of state changes, evidence assessments, and leadership responses is preserved — ready for regulatory review.',
    ref: 'DORA Art. 6–10 — ICT risk management framework requirements',
  },
  {
    icon: '⬡',
    tag: 'Solvency II / Insurance',
    title: 'Documented risk appetite for claims and capital',
    body: 'Solvency II requires insurers to maintain a written risk appetite statement and demonstrate that risk management is integrated into decision-making. De-Risk Matrix translates risk appetite into operational terms: for each goal — combined ratio, capital adequacy, claims reserve — you define a target and a threshold. The gap between them is your explicit, documented risk tolerance. State changes create an automatic audit log of how risk appetite was monitored and responded to throughout the period.',
    ref: 'Solvency II Directive 2009/138/EC — Art. 44, ORSA requirements',
  },
  {
    icon: '◈',
    tag: 'Board reporting',
    title: 'Structured risk reporting, not narrative summaries',
    body: 'Board risk reporting in financial services is often narrative — qualitative summaries that obscure the actual risk position. De-Risk Matrix produces a structured risk picture: each goal has a defined state, an evidence rating, and a prescribed leadership response. The board sees not just whether goals are on track, but the quality of the organisation\'s knowledge about each goal and what management is doing about it. This is the structured oversight regulators and audit committees expect.',
    ref: 'ISO 31000:2018 — Clause 6: Governance and reporting obligations',
  },
  {
    icon: '✦',
    tag: 'Strategic goal tracking',
    title: 'Financial KPIs managed with defined risk spans',
    body: 'Return on equity, cost-to-income ratio, net interest margin, capital adequacy — financial services organisations track these metrics, but rarely with explicit risk spans. When the only definition of success is a single target number, there is no structured mechanism for detecting emerging risk before a threshold is breached. De-Risk Matrix requires a threshold alongside every target: the span between them defines the zone of acceptable performance. Goals entering that zone trigger structured risk management — before the breach, not after.',
    ref: 'ISO 31000:2018 — Risk criteria and risk evaluation',
  },
]

const GOALS = [
  {
    metric: 'Return on equity (ROE)',
    target: '14%',
    threshold: '10%',
    state: 'Optimistic',
    stateColor: '#2ab09a',
    stateBg: '#d1f2eb',
    current: '11.8%',
    note: 'On track but evidence thin — measurement frequency insufficient for Q3 forecast confidence.',
  },
  {
    metric: 'Cost-to-income ratio',
    target: '48%',
    threshold: '55%',
    state: 'Harmonious',
    stateColor: '#1a9e8a',
    stateBg: '#d5f5e3',
    current: '50.2%',
    note: 'Within target range with strong quarterly evidence. Current cost controls effective.',
  },
  {
    metric: 'Combined ratio (insurance)',
    target: '94%',
    threshold: '100%',
    state: 'Dire',
    stateColor: '#c0392b',
    stateBg: '#fadbd8',
    current: '102.4%',
    note: 'Above threshold. Claims frequency elevated in motor segment. Escalation initiated.',
  },
  {
    metric: 'Capital adequacy ratio',
    target: '18%',
    threshold: '14%',
    state: 'Defensive',
    stateColor: '#1d4e6b',
    stateBg: '#d6eaf8',
    current: '21.3%',
    note: 'Exceeding target with strong evidence. Review whether capital deployment ambition should be raised.',
  },
]

const REGULATORY_ITEMS = [
  {
    reg: 'DORA',
    fullName: 'Digital Operational Resilience Act',
    scope: 'Banks, insurers, investment firms, payment institutions, CCPs',
    inForce: 'January 2025',
    requirement: 'Structured ICT risk management with documented tolerances, treatment plans, and evidence of senior management oversight.',
    how: 'Goal spans define ICT risk tolerances. Risk states provide continuous monitoring. State history creates the evidence trail required by Articles 6–10.',
  },
  {
    reg: 'Solvency II',
    fullName: 'EU Directive 2009/138/EC',
    scope: 'Insurance and reinsurance undertakings',
    inForce: 'Ongoing — ORSA annual',
    requirement: 'Written risk appetite statement. Own Risk and Solvency Assessment (ORSA) demonstrating risk management integration. Evidence of board oversight.',
    how: 'Goal thresholds operationalise the risk appetite statement. State history supports ORSA documentation. Board reporting module provides structured audit evidence.',
  },
  {
    reg: 'ISO 31000',
    fullName: 'International Standard for Risk Management',
    scope: 'All organisations — used as benchmark by regulators and auditors',
    inForce: 'ISO 31000:2018',
    requirement: 'Risk management integrated with organisational objectives. Structured criteria for risk evaluation. Evidence of systematic process.',
    how: 'De-Risk Matrix is built on ISO 31000 principles. Goal spans, evidence ratings, and the six risk states implement the standard operationally.',
  },
]

export default function FinansPage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div className="hero-gradient pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block bg-teal/20 text-teal text-xs font-bold px-3 py-1.5 rounded-full mb-6 border border-teal/30">
            Finance &amp; Insurance
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
            Strategic risk management<br className="hidden md:block" />
            built for regulatory scrutiny.
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-6">
            DORA requires structured ICT risk management. Solvency II requires documented risk appetite.
            ISO 31000 is the international benchmark. De-Risk Matrix implements all three — in a single
            operational workspace.
          </p>
          <p className="text-slate-400 max-w-xl mx-auto text-base mb-10">
            Built for CFOs, risk managers, and compliance officers who need evidence of structured
            risk management — not just narrative reports.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`${APP_URL}/register`}
              className="px-8 py-4 bg-teal hover:bg-teal-dark text-white font-black rounded-xl transition-colors shadow-lg text-lg"
            >
              Start your trial →
            </a>
            <Link
              href="/methodology"
              className="px-7 py-4 bg-white/8 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/15 transition-colors"
            >
              Read the methodology
            </Link>
          </div>
        </div>
      </div>

      {/* ── Regulatory context ────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Regulatory landscape</p>
            <h2 className="text-3xl font-black text-navy mb-3">
              Three frameworks. One structured response.
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Financial services organisations face overlapping regulatory obligations around risk management.
              De-Risk Matrix addresses all three — not as compliance theatre, but as operational infrastructure.
            </p>
          </div>

          <div className="space-y-5">
            {REGULATORY_ITEMS.map(item => (
              <div key={item.reg} className="border border-slate-200 rounded-2xl overflow-hidden">
                <div className="bg-slate-50 px-7 py-5 border-b border-slate-200 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-lg font-black text-navy">{item.reg}</span>
                      <span className="text-xs bg-navy/8 text-navy/70 font-semibold px-2.5 py-1 rounded-full">{item.inForce}</span>
                    </div>
                    <div className="text-sm text-slate-500 font-medium">{item.fullName}</div>
                    <div className="text-xs text-slate-400 mt-1">Scope: {item.scope}</div>
                  </div>
                </div>
                <div className="px-7 py-6 grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Regulatory requirement</div>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.requirement}</p>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-teal uppercase tracking-wider mb-2">How De-Risk Matrix responds</div>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.how}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Goal example table ────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Live goal view</p>
            <h2 className="text-3xl font-black text-navy mb-3">
              Financial KPIs with explicit risk spans
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Every metric has a target, a threshold, and a current risk state. This is what structured
              risk documentation looks like in practice — and what auditors and regulators can inspect.
            </p>
          </div>

          <div className="space-y-4">
            {GOALS.map(goal => (
              <div
                key={goal.metric}
                style={{ background: goal.stateBg, borderColor: goal.stateColor + '40' }}
                className="rounded-2xl border p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-black text-navy text-lg">{goal.metric}</h3>
                    <div className="flex items-center gap-4 mt-1.5 text-sm">
                      <span className="text-slate-500">
                        Target: <span className="font-bold text-navy">{goal.target}</span>
                      </span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500">
                        Threshold: <span className="font-bold text-navy">{goal.threshold}</span>
                      </span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500">
                        Current: <span className="font-bold text-navy">{goal.current}</span>
                      </span>
                    </div>
                  </div>
                  <span
                    style={{ background: goal.stateColor, color: '#fff' }}
                    className="text-xs font-bold px-3 py-1.5 rounded-full"
                  >
                    {goal.state}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{goal.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-navy rounded-2xl p-6 text-center">
            <p className="text-white font-semibold mb-1">
              Every state change is timestamped and preserved.
            </p>
            <p className="text-slate-400 text-sm">
              Your complete risk history is available for regulatory review, internal audit, and board reporting — automatically.
            </p>
          </div>
        </div>
      </section>

      {/* ── Use cases ─────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">How it works in practice</p>
            <h2 className="text-3xl font-black text-navy mb-3">
              From compliance obligation to operational advantage
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              De-Risk Matrix does not produce compliance documentation as a side product.
              It makes structured risk management the way your organisation operates day-to-day.
            </p>
          </div>

          <div className="space-y-8">
            {USE_CASES.map(uc => (
              <div key={uc.tag} className="border border-slate-200 rounded-2xl p-8">
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center text-teal text-xl flex-shrink-0 mt-0.5">
                    {uc.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-teal uppercase tracking-wider mb-1">{uc.tag}</div>
                    <h3 className="text-xl font-black text-navy mb-3">{uc.title}</h3>
                    <p className="text-slate-600 leading-relaxed mb-4">{uc.body}</p>
                    <div className="text-xs text-slate-400 italic border-l-2 border-slate-200 pl-3">{uc.ref}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The 6 risk states ─────────────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Core methodology</p>
            <h2 className="text-3xl font-black text-navy mb-3">
              Six risk states. No ambiguity.
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Each goal is always in one of six states, determined by two dimensions: its position
              relative to target and threshold, and the quality of the evidence supporting that position.
              The state drives the required management response.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {RISK_STATES.map(s => (
              <div
                key={s.label}
                style={{ background: s.bg, borderColor: s.border }}
                className="rounded-2xl border p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <span style={{ color: s.color }} className="font-black text-lg">{s.label}</span>
                  <span style={{ color: s.color + 'aa' }} className="text-xs font-semibold">{s.position}</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-7">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Based on</div>
                <div className="font-black text-navy">ISO 31000:2018</div>
                <div className="text-xs text-slate-500 mt-1">International risk management standard</div>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Dimensions</div>
                <div className="font-black text-navy">Position + Evidence</div>
                <div className="text-xs text-slate-500 mt-1">Where you are and how certain you are</div>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Output</div>
                <div className="font-black text-navy">Prescribed response</div>
                <div className="text-xs text-slate-500 mt-1">Named leadership action per state</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Board reporting angle ─────────────────────────────────── */}
      <section className="py-20 bg-navy">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-bold text-teal uppercase tracking-widest mb-4">Board &amp; audit committee</p>
              <h2 className="text-3xl font-black text-white mb-5">
                Replace narrative risk reports with structured evidence.
              </h2>
              <p className="text-slate-300 leading-relaxed mb-5">
                Boards of financial institutions are under increasing regulatory pressure to demonstrate
                active risk oversight — not passive receipt of management summaries. Audit committees
                need structured evidence that risk management processes are operating as designed.
              </p>
              <p className="text-slate-300 leading-relaxed mb-5">
                De-Risk Matrix produces a risk picture the board can interrogate: which goals are in
                which states, what the evidence quality is, what management has committed to do, and
                whether those commitments are being fulfilled. Every session leaves a timestamped record.
              </p>
              <p className="text-slate-400 text-sm italic">
                &ldquo;Risk reporting should enable the board to form a view — not just receive one.&rdquo;
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Without De-Risk Matrix</div>
                <div className="space-y-2.5 text-sm text-slate-400">
                  <div className="flex gap-2.5"><span className="text-red-400 flex-shrink-0">✕</span>Board receives narrative summary — no structured data</div>
                  <div className="flex gap-2.5"><span className="text-red-400 flex-shrink-0">✕</span>Risk tolerance defined in policy but not operationalised</div>
                  <div className="flex gap-2.5"><span className="text-red-400 flex-shrink-0">✕</span>No documented management response to adverse risk states</div>
                  <div className="flex gap-2.5"><span className="text-red-400 flex-shrink-0">✕</span>Audit trail reconstructed retrospectively under pressure</div>
                  <div className="flex gap-2.5"><span className="text-red-400 flex-shrink-0">✕</span>DORA and Solvency II evidence gaps at review time</div>
                </div>
              </div>
              <div className="bg-teal/10 border border-teal/25 rounded-2xl p-5">
                <div className="text-xs font-bold text-teal uppercase tracking-wider mb-3">With De-Risk Matrix</div>
                <div className="space-y-2.5 text-sm text-slate-300">
                  <div className="flex gap-2.5"><span className="text-teal flex-shrink-0">✓</span>Board sees each goal's state, evidence rating, and response</div>
                  <div className="flex gap-2.5"><span className="text-teal flex-shrink-0">✓</span>Risk tolerance embedded in every goal as an explicit threshold</div>
                  <div className="flex gap-2.5"><span className="text-teal flex-shrink-0">✓</span>Management responses documented and tracked in-platform</div>
                  <div className="flex gap-2.5"><span className="text-teal flex-shrink-0">✓</span>Automatic, timestamped audit trail — always audit-ready</div>
                  <div className="flex gap-2.5"><span className="text-teal flex-shrink-0">✓</span>DORA and Solvency II evidence available on demand</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ISO 31000 alignment callout ───────────────────────────── */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-slate-50 border-l-4 border-teal rounded-r-2xl p-8">
            <div className="text-xs font-bold text-teal uppercase tracking-wider mb-4">ISO 31000:2018 alignment</div>
            <p className="text-navy text-xl font-semibold leading-relaxed mb-4">
              De-Risk Matrix implements ISO 31000 as operational infrastructure — not as a documentation exercise.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              {[
                {
                  principle: 'Integrated',
                  desc: 'Risk management is embedded in goal-setting and performance monitoring — not a separate process.',
                },
                {
                  principle: 'Structured',
                  desc: 'Six defined risk states with prescribed management responses. No ambiguity about required action.',
                },
                {
                  principle: 'Best available information',
                  desc: 'Evidence strength is an explicit dimension of every risk state — distinguishing what is known from what is assumed.',
                },
              ].map(p => (
                <div key={p.principle}>
                  <div className="text-xs font-bold text-teal uppercase tracking-wider mb-1.5">{p.principle}</div>
                  <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-slate-200">
              <p className="text-xs text-slate-400 italic">
                ISO 31000:2018 — Principles and guidelines for risk management. Used as the methodological foundation
                of De-Risk Matrix and referenced by DORA, Solvency II ORSA requirements, and financial regulator guidance across the EU.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Get started</p>
          <h2 className="text-3xl font-black text-navy mb-3">
            Structured risk management your regulator can inspect.
          </h2>
          <p className="text-slate-500 mb-8 max-w-xl mx-auto leading-relaxed">
            Set up your financial KPIs with targets and thresholds, assign risk states, and produce
            structured board-ready reporting — within your first session. No implementation project required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a
              href={`${APP_URL}/register`}
              className="px-8 py-4 bg-teal hover:bg-teal-dark text-white font-black rounded-xl transition-colors shadow-lg text-lg"
            >
              Start your trial →
            </a>
            <Link
              href="/methodology"
              className="px-7 py-4 bg-white hover:bg-slate-50 text-navy font-semibold rounded-xl border border-slate-200 transition-colors"
            >
              Read the full methodology
            </Link>
          </div>
          <p className="text-slate-400 text-xs">14-day trial · No credit card required · All features included</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
