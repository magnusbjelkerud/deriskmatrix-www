import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'De-Risk Matrix for SaaS & Tech',
  description: 'Know when MRR, churn, or NPS is drifting — before it becomes a miss. De-Risk Matrix gives SaaS teams real-time goal risk visibility.',
}

const APP_URL = 'https://app.deriskmatrix.com'

const PAIN_POINTS = [
  {
    icon: '📉',
    title: 'MRR targets are single numbers',
    desc: 'You set €500k MRR. You track against €500k. There is no early warning zone. By the time you see a miss, you are already three months behind on corrective action.',
  },
  {
    icon: '🔄',
    title: 'Churn rises in silence',
    desc: 'Cohort churn drifts 0.3% per month. Nobody flags it. It doesn\'t show up as a crisis — until the quarterly review. Then it\'s a crisis that\'s been building for six months.',
  },
  {
    icon: '⭐',
    title: 'NPS moves without triggering anything',
    desc: 'Net Promoter Score drops from 42 to 31 over two quarters. The trend is clear in the data. But without a threshold, there is no state change — no alarm, no owner, no action.',
  },
  {
    icon: '⚖️',
    title: 'CAC/LTV ratio shifts go unnoticed',
    desc: 'CAC creeps up. LTV flattens. The ratio degrades from 1:4 to 1:2.5 over a year. Each individual data point looks manageable. The structural shift never triggers an escalation.',
  },
  {
    icon: '🚀',
    title: 'Velocity reported after the sprint',
    desc: 'Cycle time and feature adoption rates land in the retrospective — not as live signals during the sprint. By the time the report is written, the window to course-correct has closed.',
  },
]

const USE_CASES = [
  {
    metric: 'MRR / ARR',
    label: 'Revenue growth',
    target: 'Target: €600k MRR',
    threshold: 'Threshold: €540k MRR',
    state: 'Optimistic',
    stateColor: '#2ab09a',
    stateBg: '#d1f2eb',
    current: 'Current: €558k — on track, evidence weak',
    insight: 'The goal is inside the corridor, but the growth rate has decelerated two months in a row. Evidence strength is low. The platform flags Optimistic: you\'re on track but you can\'t prove it. Action required before the quarter closes — not after.',
    without: 'Dashboard shows €558k. Green. No signal.',
  },
  {
    metric: 'Churn rate',
    label: 'Retention',
    target: 'Target: 1.8% monthly churn',
    threshold: 'Threshold: 2.5% monthly churn',
    state: 'Dire',
    stateColor: '#c0392b',
    stateBg: '#fadbd8',
    current: 'Current: 2.7% — below threshold, strong evidence',
    insight: 'Three consecutive months above threshold. Evidence is strong. The platform flags Dire — not "slightly elevated" or "trending up." Dire. Leadership action is prescribed immediately: lower uncertainty, create an action plan, escalate to owners. No ambiguity.',
    without: 'Spreadsheet shows 2.7%. Highlighted in yellow. Discussed in the next monthly review.',
  },
  {
    metric: 'NPS',
    label: 'Customer satisfaction',
    target: 'Target: NPS 45',
    threshold: 'Threshold: NPS 30',
    state: 'Pessimistic',
    stateColor: '#e07070',
    stateBg: '#fde8e8',
    current: 'Current: NPS 28 — below threshold, evidence thin',
    insight: 'Score dropped below threshold after two quarters of slow decline. Evidence is weak — one survey cycle, low response rate. Platform flags Pessimistic: below threshold, but uncertainty is high. Prescribed response: launch an evidence sprint alongside stabilizing action. Gather data and act — in parallel, not sequentially.',
    without: 'NPS slide in the quarterly deck. No owner. No follow-up item.',
  },
  {
    metric: 'CAC / LTV ratio',
    label: 'Unit economics',
    target: 'Target: 1:4.5 ratio',
    threshold: 'Threshold: 1:3.0 ratio',
    state: 'Harmonious',
    stateColor: '#1a9e8a',
    stateBg: '#d5f5e3',
    current: 'Current: 1:4.1 — on track, evidence strong',
    insight: 'Ratio is within corridor, trend is stable, evidence strong across three quarters. Platform flags Harmonious. Prescribed response: protect the conditions that got you here. Don\'t introduce structural changes. Stability is a deliberate leadership choice — not a default.',
    without: 'LTV/CAC reported monthly. No one is responsible for maintaining it.',
  },
]

const RISK_STATES = [
  {
    label: 'Defensive',
    action: 'Raise',
    pos: 'Beyond target · Strong evidence',
    color: '#1d4e6b',
    bg: '#d6eaf8',
    saas: 'MRR 18% above plan. Evidence solid. Raise the target — don\'t coast.',
  },
  {
    label: 'Potent',
    action: 'Explore',
    pos: 'Beyond target · Weak evidence',
    color: '#148f77',
    bg: '#d1f2eb',
    saas: 'Churn dropped unexpectedly. Great — but why? Investigate before celebrating.',
  },
  {
    label: 'Harmonious',
    action: 'Ensure',
    pos: 'On track · Strong evidence',
    color: '#1a9e8a',
    bg: '#d5f5e3',
    saas: 'CAC/LTV ratio stable and confirmed. Protect it. Don\'t disrupt what\'s working.',
  },
  {
    label: 'Optimistic',
    action: 'Prove',
    pos: 'On track · Weak evidence',
    color: '#2ab09a',
    bg: '#d1f2eb',
    saas: 'NPS looks fine — but only one survey cycle. Prove it before the quarter closes.',
  },
  {
    label: 'Dire',
    action: 'Lower',
    pos: 'Below threshold · Strong evidence',
    color: '#c0392b',
    bg: '#fadbd8',
    saas: 'Churn at 2.7% for three months. Confirmed. Escalate now — not next sprint.',
  },
  {
    label: 'Pessimistic',
    action: 'Intervene',
    pos: 'Below threshold · Weak evidence',
    color: '#e07070',
    bg: '#fde8e8',
    saas: 'Feature adoption below threshold after launch. Data thin. Act and gather evidence simultaneously.',
  },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Define each metric as a span',
    desc: 'Every SaaS goal gets a target and a threshold — not a single number. MRR target: €600k. Threshold: €540k. The corridor between them is your early warning zone.',
  },
  {
    step: '02',
    title: 'Assess evidence strength',
    desc: 'Log actual data and rate evidence quality across 14 factors: data recency, measurement confidence, trend consistency, external conditions. This produces the risk state.',
  },
  {
    step: '03',
    title: 'Read the live risk state',
    desc: 'Every goal is always in one of six states. Harmonious means you\'re on track with strong data. Dire means you\'re below threshold with confirmation. Each state has a prescribed leadership response.',
  },
  {
    step: '04',
    title: 'Act on the prescribed response',
    desc: 'Each state tells you exactly what to do: Raise, Explore, Ensure, Prove, Lower, or Intervene. Actions are created, assigned owners, and tracked — tied to the state that triggered them.',
  },
]

export default function SaaSPage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="hero-gradient pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-teal/20 text-teal text-xs font-bold px-3 py-1.5 rounded-full mb-6 border border-teal/30">
            For SaaS &amp; tech teams
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Your MRR dashboard shows<br className="hidden md:block" />
            <span className="gradient-text">green. Is it really?</span>
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-6">
            Single-number targets have no early warning zone. De-Risk Matrix adds a threshold
            to every metric — MRR, churn, NPS, CAC/LTV, adoption rate — and shows its live risk
            state before the miss is already written.
          </p>
          <p className="text-slate-400 max-w-xl mx-auto mb-10">
            Real-time. Signal, not noise. Proactive, not reactive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`${APP_URL}/register`}
              className="px-8 py-4 bg-teal hover:bg-teal-dark text-white font-black rounded-xl transition-colors shadow-lg text-lg"
            >
              Start free trial →
            </a>
            <Link
              href="/methodology"
              className="px-7 py-4 bg-white/8 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/15 transition-colors"
            >
              See the methodology
            </Link>
          </div>
          <p className="text-slate-600 text-xs mt-5">14-day trial · No credit card required · All features included</p>
        </div>
      </section>

      {/* ── Pain points ───────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">The problem</p>
            <h2 className="text-3xl font-black text-navy mb-3">
              SaaS metrics are reactive by design.
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Every metric you track has a target. None of them have a threshold.
              Without a threshold, there is no early warning — only a miss, confirmed too late.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {PAIN_POINTS.map((p, i) => (
              <div
                key={i}
                className={`bg-slate-50 border border-slate-200 rounded-2xl p-6 ${i === 4 ? 'md:col-span-2 md:max-w-lg md:mx-auto' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{p.icon}</span>
                  <div>
                    <h3 className="font-bold text-navy mb-2">{p.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">How it works</p>
            <h2 className="text-3xl font-black text-navy mb-3">
              From single number to live risk state
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              De-Risk Matrix converts any SaaS metric into a goal with a risk corridor.
              The result is a live state — not just a data point.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-12">
            {HOW_IT_WORKS.map(item => (
              <div key={item.step} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-teal/15 text-teal flex items-center justify-center font-black text-xs flex-shrink-0">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-navy text-sm">{item.title}</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* The span concept — illustrated */}
          <div className="bg-navy rounded-2xl p-8">
            <p className="text-xs font-bold text-teal uppercase tracking-wider mb-6">The goal span — illustrated with MRR</p>
            <div className="grid md:grid-cols-3 gap-6 text-center mb-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wide mb-2">Threshold</p>
                <p className="text-3xl font-black text-white mb-1">€540k</p>
                <p className="text-xs text-slate-500">Floor — below this triggers a risk state</p>
              </div>
              <div className="bg-teal/12 border border-teal/25 rounded-xl p-5">
                <p className="text-xs text-teal uppercase font-bold tracking-wide mb-2">Risk corridor</p>
                <p className="text-3xl font-black text-white mb-1">€60k</p>
                <p className="text-xs text-slate-400">Early warning zone. On track — but watch it.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wide mb-2">Target</p>
                <p className="text-3xl font-black text-white mb-1">€600k</p>
                <p className="text-xs text-slate-500">Ceiling — above this triggers Defensive or Potent</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm text-center">
              Current MRR at €558k lands inside the corridor → <span className="text-teal font-semibold">Optimistic</span> or <span className="text-teal font-semibold">Harmonious</span> depending on evidence strength.
              At €530k it becomes <span className="text-red-400 font-semibold">Pessimistic</span> or <span className="text-red-400 font-semibold">Dire</span>.
              Automatically. In real time.
            </p>
          </div>
        </div>
      </section>

      {/* ── SaaS use cases ────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Use cases</p>
            <h2 className="text-3xl font-black text-navy mb-3">
              Four SaaS metrics. Four real scenarios.
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Here is what risk state management looks like for the metrics your team
              tracks every week — and what your current tools miss.
            </p>
          </div>

          <div className="space-y-6">
            {USE_CASES.map((uc, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                {/* Header */}
                <div className="bg-slate-50 border-b border-slate-200 px-7 py-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">{uc.label}</span>
                    <span className="text-navy font-black text-sm">{uc.metric}</span>
                  </div>
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full"
                    style={{ background: uc.stateBg, color: uc.stateColor }}
                  >
                    {uc.state}
                  </span>
                </div>

                {/* Body */}
                <div className="px-7 py-6">
                  <div className="flex flex-wrap gap-4 mb-5 text-xs">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg font-semibold">{uc.target}</span>
                    <span className="bg-red-50 text-red-500 border border-red-100 px-3 py-1.5 rounded-lg font-semibold">{uc.threshold}</span>
                    <span
                      className="px-3 py-1.5 rounded-lg font-semibold"
                      style={{ background: uc.stateBg, color: uc.stateColor }}
                    >
                      {uc.current}
                    </span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-bold text-teal uppercase tracking-wide mb-2">With De-Risk Matrix</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{uc.insight}</p>
                    </div>
                    <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                      <p className="text-xs font-bold text-red-400 uppercase tracking-wide mb-2">Without it</p>
                      <p className="text-slate-500 text-sm leading-relaxed">{uc.without}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The 6 risk states — SaaS framing ─────────────────────── */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">The framework</p>
            <h2 className="text-3xl font-black text-navy mb-3">
              Six risk states. Every metric. Always live.
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Every goal is always in exactly one of six states — determined by where the
              actual sits relative to the corridor, and how strong the evidence is.
              Each state prescribes a specific leadership response.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {RISK_STATES.map(s => (
              <div
                key={s.label}
                className="rounded-2xl p-6"
                style={{ background: s.bg, border: `1.5px solid ${s.color}30` }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-black text-lg" style={{ color: s.color }}>{s.label}</span>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: s.color + '18', color: s.color }}
                  >
                    → {s.action}
                  </span>
                </div>
                <p className="text-xs mb-3" style={{ color: s.color + 'aa', fontWeight: 600 }}>{s.pos}</p>
                <p className="text-slate-600 text-sm leading-relaxed">{s.saas}</p>
              </div>
            ))}
          </div>

          <div className="bg-navy rounded-2xl px-7 py-6 text-center">
            <p className="text-white font-semibold mb-1">
              Each state is determined automatically — from the data you log and the evidence you assess.
            </p>
            <p className="text-slate-400 text-sm">
              No interpretation required. No meeting needed. The state is always live.
            </p>
          </div>
        </div>
      </section>

      {/* ── Signal vs noise ───────────────────────────────────────── */}
      <section className="py-20 bg-navy">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-bold text-teal uppercase tracking-widest mb-4">Signal vs noise</p>
              <h2 className="text-3xl font-black text-white mb-5">
                Dashboards report.<br />De-Risk Matrix signals.
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Every SaaS team has a dashboard. It shows MRR trending up.
                Churn at 2.1%. NPS at 38. The numbers exist. The interpretation doesn\'t.
              </p>
              <p className="text-slate-300 leading-relaxed mb-4">
                De-Risk Matrix converts each metric into a risk state — a structured
                interpretation of whether the goal is safe, warning, or critical.
                Not based on a gut feel. Based on position + evidence.
              </p>
              <p className="text-slate-300 leading-relaxed">
                That is the difference between a metric and a signal. Signals tell you
                what to do. Metrics tell you what happened.
              </p>
            </div>
            <div className="space-y-4">
              {[
                {
                  label: 'Dashboard — what you have',
                  items: [
                    'MRR: €558k ↑ 3% MoM',
                    'Churn: 2.1%',
                    'NPS: 38',
                    'CAC/LTV: 1:3.8',
                    'Feature adoption: 41%',
                  ],
                  color: 'red',
                  bg: 'bg-red-950/40',
                  border: 'border-red-900/50',
                  labelColor: 'text-red-400',
                  icon: '✕',
                  iconColor: 'text-red-500',
                },
                {
                  label: 'De-Risk Matrix — what you need',
                  items: [
                    'MRR → Optimistic · prove the trajectory before Q-close',
                    'Churn → Harmonious · evidence strong, protect current process',
                    'NPS → Pessimistic · below threshold, gather evidence + act now',
                    'CAC/LTV → Harmonious · stable corridor, no disruption needed',
                    'Adoption → Dire · confirmed miss, escalate immediately',
                  ],
                  color: 'teal',
                  bg: 'bg-teal/8',
                  border: 'border-teal/25',
                  labelColor: 'text-teal',
                  icon: '→',
                  iconColor: 'text-teal',
                },
              ].map(col => (
                <div key={col.label} className={`${col.bg} border ${col.border} rounded-2xl p-6`}>
                  <p className={`text-xs font-bold ${col.labelColor} uppercase tracking-wide mb-4`}>{col.label}</p>
                  <div className="space-y-2">
                    {col.items.map((item, i) => (
                      <div key={i} className="flex gap-2.5 text-sm text-slate-300">
                        <span className={`${col.iconColor} flex-shrink-0 font-bold`}>{col.icon}</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Built for SaaS operators ──────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Built for operators</p>
            <h2 className="text-3xl font-black text-navy mb-3">
              What your team gets from day one
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {[
              {
                icon: '⚡',
                title: 'Early warning — 60 days ahead',
                desc: 'The forecast engine detects breach risk up to 60 days before a metric crosses its threshold. Act on a signal, not a confirmed miss.',
              },
              {
                icon: '◎',
                title: 'Structured leadership response',
                desc: 'Every risk state prescribes a specific action: Raise, Explore, Ensure, Prove, Lower, or Intervene. No ambiguity about what to do next.',
              },
              {
                icon: '📡',
                title: 'Real-time shared canvas',
                desc: 'CEO, Head of Growth, Head of Product — everyone sees the same live risk picture. No deck preparation. No sync needed.',
              },
              {
                icon: '◈',
                title: 'Evidence assessment',
                desc: '14-factor evidence scoring per goal. Separate the metrics you actually understand from the ones you\'re hoping are fine.',
              },
              {
                icon: '✦',
                title: 'AI-assisted goal setup',
                desc: 'Describe any SaaS metric in plain language. The AI Goal Assistant structures it into a goal span with target, threshold, and evidence factors.',
              },
              {
                icon: '🔗',
                title: 'Push data via webhooks',
                desc: 'Connect your data pipeline, CRM, or analytics stack. Push MRR, churn, and adoption data via API — goals update automatically.',
              },
            ].map((f, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="text-2xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-navy mb-2 text-sm">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proactive vs reactive ─────────────────────────────────── */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-xs font-bold text-red-400 uppercase tracking-wide mb-4">Reactive — the default</p>
                <div className="space-y-3 text-sm text-slate-500">
                  {[
                    'Churn rises 0.4% over three months — first discussed at QBR',
                    'NPS drops to 29 — no owner, no action item assigned',
                    'MRR misses by €40k — root cause analysis starts the week after',
                    'CAC increases 22% — noticed during annual planning',
                    'Feature adoption at 18% after launch — flagged in next sprint retro',
                  ].map((item, i) => (
                    <div key={i} className="flex gap-2.5">
                      <span className="text-red-400 flex-shrink-0">✕</span>{item}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-teal uppercase tracking-wide mb-4">Proactive — with De-Risk Matrix</p>
                <div className="space-y-3 text-sm text-slate-600">
                  {[
                    'Churn enters Optimistic at month one — investigate evidence before it worsens',
                    'NPS crosses threshold — Pessimistic flagged, owner assigned, sprint launched',
                    'MRR deceleration detected — Optimistic state prompts proof-seeking 8 weeks early',
                    'CAC trend triggers corridor breach warning — action created before quarterly review',
                    'Adoption below threshold on day 14 post-launch — Dire state, immediate escalation',
                  ].map((item, i) => (
                    <div key={i} className="flex gap-2.5">
                      <span className="text-teal flex-shrink-0">✓</span>{item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-teal">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-white mb-3">
            Add a threshold to every metric you track.
          </h2>
          <p className="text-white/80 mb-2 text-lg">
            Start with MRR and churn. Add NPS and CAC/LTV. See the live risk state for each.
          </p>
          <p className="text-white/60 text-sm mb-10">
            14-day trial · Full platform · No credit card required
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a
              href={`${APP_URL}/register`}
              className="px-10 py-4 bg-white text-teal font-black rounded-xl hover:bg-slate-50 transition-colors text-lg shadow-lg"
            >
              Start free trial →
            </a>
            <Link
              href="/pricing"
              className="px-8 py-4 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-xl border border-white/25 transition-colors"
            >
              See pricing
            </Link>
          </div>
          <p className="text-white/50 text-xs">
            Questions? Email us at{' '}
            <a href="mailto:post@deriskmatrix.com" className="underline hover:text-white/80 transition-colors">
              post@deriskmatrix.com
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
