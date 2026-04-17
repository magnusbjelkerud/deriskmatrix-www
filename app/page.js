import Link from 'next/link'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const APP_URL = 'https://app.deriskmatrix.com'

const RISK_STATES = [
  { label: 'Defensive', action: 'Raise', desc: 'Exceeding target — with strong evidence', color: '#1d4e6b', bg: '#d6eaf8', position: 'BEYOND', evidence: 'STRONG' },
  { label: 'Potent',    action: 'Explore', desc: 'Exceeding target — with weak evidence', color: '#148f77', bg: '#d1f2eb', position: 'BEYOND', evidence: 'WEAK' },
  { label: 'Harmonious', action: 'Ensure', desc: 'On track — with strong evidence', color: '#1a9e8a', bg: '#d5f5e3', position: 'ON TRACK', evidence: 'STRONG' },
  { label: 'Optimistic', action: 'Prove', desc: 'On track — with weak evidence', color: '#2ab09a', bg: '#d1f2eb', position: 'ON TRACK', evidence: 'WEAK' },
  { label: 'Dire',      action: 'Lower', desc: 'Below threshold — with strong evidence', color: '#c0392b', bg: '#fadbd8', position: 'BELOW', evidence: 'STRONG' },
  { label: 'Pessimistic', action: 'Intervene', desc: 'Below threshold — with weak evidence', color: '#e07070', bg: '#fde8e8', position: 'BELOW', evidence: 'WEAK' },
]

const FEATURES = [
  {
    icon: '🎯',
    title: 'Goals as spans, not points',
    desc: 'Every goal has a target (ambition) and a threshold (floor). The gap between them defines your risk appetite — explicitly.',
  },
  {
    icon: '📡',
    title: '6 risk states, always visible',
    desc: 'Each goal is always in one of 6 states. Dire. Pessimistic. Harmonious. You always know where you stand — and what to do next.',
  },
  {
    icon: '📈',
    title: 'Forecast-driven, not report-driven',
    desc: 'Risk state is driven by your forecast, not last month\'s actuals. You see problems before the quarter ends.',
  },
  {
    icon: '🏗️',
    title: 'Full goal hierarchy',
    desc: 'Enterprise goals cascade into department and project goals. See how your teams\' work rolls up to company strategy.',
  },
  {
    icon: '🤖',
    title: 'AI-assisted goal setting',
    desc: 'Describe a goal in plain language — the AI structures it with target, threshold, category, and measurement unit.',
  },
  {
    icon: '📋',
    title: 'Actions tied to risk state',
    desc: 'Actions live directly on goals. When a goal turns Dire, you know what to do — and whether you\'ve done it.',
  },
]

const FRAMEWORKS = ['ISO 31000', 'OKR', 'Balanced Scorecard', 'SMART Goals', 'VRIO', 'SWOT', 'PESTEL', 'McKinsey 7S']

const PRICING = [
  {
    name: 'Free',
    price: '0',
    period: 'forever',
    desc: 'Get started with De-Risk Matrix for a single team.',
    features: ['Up to 20 goals', 'Canvas & Dashboard', 'Risk states + forecasting', 'Actions & comments', 'AI goal assistant'],
    cta: 'Start for free',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '490',
    period: 'per month',
    desc: 'For growing organizations with multiple departments.',
    features: ['Unlimited goals', 'Department & portfolio hierarchy', 'Executive Risk Summary', 'Learning Velocity insights', 'Risk Register', 'Priority support'],
    cta: 'Start Pro trial',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For large organizations with compliance requirements.',
    features: ['Everything in Pro', 'Custom integrations', 'GDPR DPA & data processing agreement', 'SSO / BankID', 'Dedicated onboarding', 'SLA'],
    cta: 'Contact us',
    highlight: false,
  },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="hero-gradient min-h-screen flex items-center pt-16">
        <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 text-teal-light text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-teal inline-block" />
              Aligned with ISO 31000
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6">
              Your choice of goals is your{' '}
              <span className="gradient-text">choice of risk.</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-8">
              De-Risk Matrix turns strategic goals into measurable risk states — so your leadership team acts before it&apos;s too late.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`${APP_URL}/signup`}
                className="px-7 py-4 bg-teal hover:bg-teal-dark text-white font-semibold rounded-xl text-center transition-colors shadow-lg shadow-teal/20"
              >
                Get started free →
              </a>
              <Link
                href="/score"
                className="px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-center transition-colors border border-white/20"
              >
                Calculate your De-Risk Score
              </Link>
            </div>
          </div>

          {/* Mini canvas preview */}
          <div className="hidden md:block">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="text-xs text-slate-400 font-medium mb-4 uppercase tracking-wider">Live risk state overview</div>
              <div className="grid grid-cols-2 gap-3">
                {RISK_STATES.map(rs => (
                  <div
                    key={rs.label}
                    style={{ background: rs.bg + '22', borderColor: rs.bg }}
                    className="rounded-xl p-3 border"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span style={{ color: rs.color }} className="text-xs font-bold">{rs.label}</span>
                      <span style={{ background: rs.bg, color: rs.color }} className="text-xs px-2 py-0.5 rounded-full font-medium">
                        {rs.action}
                      </span>
                    </div>
                    <div className="text-slate-400 text-xs">{rs.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ─────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-5 border-y border-slate-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 text-sm">
            {FRAMEWORKS.map(f => (
              <span key={f} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-teal" />
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem ───────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block bg-red-50 text-red-700 text-xs font-semibold px-3 py-1 rounded-full mb-6 border border-red-200">
            The problem with single-point targets
          </div>
          <h2 className="text-4xl font-black text-navy mb-6">
            A target number alone tells you nothing about risk.
          </h2>
          <p className="text-xl text-slate-500 leading-relaxed mb-12">
            Most organizations set targets like "revenue of 50M NOK." But is 42M a success or a failure? What&apos;s the floor before leadership must act? Without a <strong>threshold</strong>, every miss feels like a crisis — and every near-miss feels fine.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { icon: '❌', title: 'Single-point target', desc: 'Pass or fail. No early warning. No urgency signal until it\'s too late.' },
              { icon: '↔️', title: 'Goal as a span', desc: 'Target (ambition) + Threshold (floor). The gap defines your risk appetite.' },
              { icon: '🔴', title: 'Live risk state', desc: 'Always know: are you Harmonious, Dire, or Optimistic? And what to do about it.' },
            ].map(item => (
              <div key={item.title} className="bg-slate-50 rounded-2xl p-6">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-teal-light text-teal text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-teal/20">
              How it works
            </div>
            <h2 className="text-4xl font-black text-navy">Goals. Risk States. Culture.</h2>
            <p className="text-lg text-slate-500 mt-4 max-w-2xl mx-auto">Three concepts that work together as a repeating cycle — refined each period with real data.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                color: '#1d4ed8',
                bg: '#eff6ff',
                title: 'Define goals as spans',
                desc: 'Every goal gets a target value (ambition) and a threshold value (minimum acceptable). This creates a meaningful corridor — not a single point of pass/fail.',
                detail: 'Revenue 50M–40M NOK. EBITDA 12%–8%. Sick leave 3.5%–5.5%.',
              },
              {
                step: '02',
                color: '#1a9e8a',
                bg: '#d5f5e3',
                title: 'Read the risk state',
                desc: 'Each goal is always in one of 6 states based on its forecast position and evidence strength. No ambiguity. No subjective RAG ratings.',
                detail: 'Harmonious. Optimistic. Dire. Pessimistic. Defensive. Potent.',
              },
              {
                step: '03',
                color: '#7c3aed',
                bg: '#ede9fe',
                title: 'Act on culture + actions',
                desc: 'Each risk state has recommended leadership behaviors and cultural practices — aligned with ISO 31000, ISO 45003, and Edmondson\'s psychological safety research.',
                detail: 'Dire → Lower uncertainty, create actions, escalate.',
              },
            ].map(item => (
              <div key={item.step} className="bg-white rounded-2xl p-7 shadow-sm card-hover">
                <div style={{ background: item.bg, color: item.color }} className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold text-navy text-lg mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-3">{item.desc}</p>
                <p style={{ color: item.color }} className="text-xs font-medium italic">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6 Risk states ─────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-navy mb-4">The 6 risk states</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Every goal is always in exactly one state — determined by its position relative to target/threshold, and the strength of your evidence.
            </p>
          </div>

          {/* Matrix */}
          <div className="overflow-x-auto">
            <div className="min-w-[520px]">
              {/* X-axis label */}
              <div className="flex ml-24 mb-2">
                <div className="flex-1 text-center text-xs font-bold text-slate-400 uppercase tracking-wider py-1 border-b-2 border-slate-200">
                  Strong evidence
                </div>
                <div className="flex-1 text-center text-xs font-bold text-slate-400 uppercase tracking-wider py-1 border-b-2 border-slate-200">
                  Weak evidence
                </div>
              </div>
              <div className="text-center text-xs font-bold text-slate-300 uppercase tracking-widest mb-4 ml-24">
                ← Evidence / knowledge →
              </div>

              {/* Rows */}
              {[
                { rowLabel: 'Beyond target', states: [RISK_STATES[0], RISK_STATES[1]], border: 'border-l-4 border-blue-200' },
                { rowLabel: 'On track',      states: [RISK_STATES[2], RISK_STATES[3]], border: 'border-l-4 border-teal-200' },
                { rowLabel: 'Below threshold', states: [RISK_STATES[4], RISK_STATES[5]], border: 'border-l-4 border-red-200' },
              ].map(row => (
                <div key={row.rowLabel} className="flex gap-3 mb-3 items-stretch">
                  {/* Y-axis label */}
                  <div className="w-20 flex-shrink-0 flex items-center justify-end">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide text-right leading-tight">
                      {row.rowLabel}
                    </span>
                  </div>
                  {row.states.map(rs => (
                    <div
                      key={rs.label}
                      style={{ background: rs.bg, borderColor: rs.color + '50' }}
                      className={`flex-1 rounded-2xl p-5 border-2 card-hover`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span style={{ color: rs.color }} className="text-lg font-black">{rs.label}</span>
                        <span style={{ background: rs.color + '25', color: rs.color }} className="text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                          → {rs.action}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">{rs.desc}</p>
                    </div>
                  ))}
                </div>
              ))}

              {/* Y-axis arrow label */}
              <div className="text-right mr-0 mt-2 ml-24">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">↑ Goal position ↓</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-blue-200">
              The platform
            </div>
            <h2 className="text-4xl font-black text-navy">Everything your strategy needs</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm card-hover">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-navy mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Magnus quote ──────────────────────────────────────────── */}
      <section className="py-20 bg-navy">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <blockquote className="text-2xl md:text-3xl font-light text-white leading-relaxed mb-8">
            &ldquo;Traditionally, risk meant <em>how big the hole in the floor is</em> — probability multiplied by negative consequence. But ISO 31000 looks upward: how high the building is, and how high it could grow. Risk is the effect of uncertainty on objectives — and that is exactly what De-Risk Matrix is built upon.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal/20 border border-teal/40 flex items-center justify-center text-teal font-bold">
              M
            </div>
            <div className="text-left">
              <div className="text-white font-semibold text-sm">Magnus Bjelkerud</div>
              <div className="text-slate-400 text-xs">Creator, De-Risk Matrix</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-navy mb-4">Simple, transparent pricing</h2>
            <p className="text-lg text-slate-500">Start for free. Scale when you need to.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PRICING.map(plan => (
              <div
                key={plan.name}
                className={`rounded-2xl p-7 flex flex-col ${
                  plan.highlight
                    ? 'bg-navy text-white shadow-2xl shadow-navy/30 scale-105'
                    : 'bg-slate-50 border border-slate-200'
                }`}
              >
                {plan.highlight && (
                  <div className="inline-block bg-teal text-white text-xs font-bold px-3 py-1 rounded-full mb-4 self-start">
                    Most popular
                  </div>
                )}
                <h3 className={`text-xl font-black mb-1 ${plan.highlight ? 'text-white' : 'text-navy'}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  {plan.price === 'Custom' ? (
                    <span className={`text-3xl font-black ${plan.highlight ? 'text-white' : 'text-navy'}`}>Custom</span>
                  ) : (
                    <>
                      <span className={`text-3xl font-black ${plan.highlight ? 'text-white' : 'text-navy'}`}>
                        {plan.price === '0' ? 'Free' : `${plan.price} NOK`}
                      </span>
                      {plan.period && <span className={`text-sm ${plan.highlight ? 'text-slate-300' : 'text-slate-400'}`}>/{plan.period}</span>}
                    </>
                  )}
                </div>
                <p className={`text-sm mb-6 ${plan.highlight ? 'text-slate-300' : 'text-slate-500'}`}>{plan.desc}</p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <span className="text-teal mt-0.5">✓</span>
                      <span className={plan.highlight ? 'text-slate-200' : 'text-slate-600'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.name === 'Enterprise' ? 'mailto:magnus@bjelkerud.no' : `${APP_URL}/signup`}
                  className={`w-full py-3 rounded-xl font-semibold text-center text-sm transition-colors ${
                    plan.highlight
                      ? 'bg-teal hover:bg-teal-dark text-white'
                      : 'bg-navy hover:bg-slate-800 text-white'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-teal to-blue-accent">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Ready to de-risk your strategy?</h2>
          <p className="text-xl text-white/80 mb-10">
            Start for free. No credit card required. Your first risk state overview in under 10 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`${APP_URL}/signup`}
              className="px-8 py-4 bg-white text-teal font-bold rounded-xl text-center hover:bg-slate-50 transition-colors shadow-lg"
            >
              Get started free →
            </a>
            <Link
              href="/score"
              className="px-8 py-4 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-xl text-center transition-colors border border-white/30"
            >
              Calculate your De-Risk Score
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
