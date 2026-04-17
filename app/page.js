import Link from 'next/link'
import Image from 'next/image'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import MatrixDemo from '../components/MatrixDemo'

const APP_URL = 'https://app.deriskmatrix.com'

const RISK_STATES = [
  { label: 'Defensive',   action: 'Raise',     desc: 'Exceeding target — with strong evidence', color: '#1d4e6b', bg: '#d6eaf8' },
  { label: 'Potent',      action: 'Explore',   desc: 'Exceeding target — with weak evidence',   color: '#148f77', bg: '#d1f2eb' },
  { label: 'Harmonious',  action: 'Ensure',    desc: 'On track — with strong evidence',         color: '#1a9e8a', bg: '#d5f5e3' },
  { label: 'Optimistic',  action: 'Prove',     desc: 'On track — with weak evidence',           color: '#2ab09a', bg: '#d1f2eb' },
  { label: 'Dire',        action: 'Lower',     desc: 'Below threshold — with strong evidence',  color: '#c0392b', bg: '#fadbd8' },
  { label: 'Pessimistic', action: 'Intervene', desc: 'Below threshold — with weak evidence',    color: '#e07070', bg: '#fde8e8' },
]

const MOCK_GOALS = [
  { name: 'Revenue growth',        state: 'Harmonious',  color: '#1a9e8a', bg: 'rgba(26,158,138,0.12)', pct: 72 },
  { name: 'Customer churn rate',   state: 'Pessimistic', color: '#e07070', bg: 'rgba(224,112,112,0.12)', pct: 22 },
  { name: 'EBITDA margin',         state: 'Optimistic',  color: '#2ab09a', bg: 'rgba(42,176,154,0.12)', pct: 55 },
  { name: 'Employee sick leave',   state: 'Dire',        color: '#c0392b', bg: 'rgba(192,57,43,0.12)',  pct: 15 },
  { name: 'NPS score',             state: 'Defensive',   color: '#1d4e6b', bg: 'rgba(29,78,107,0.12)', pct: 90 },
]

const FEATURES = [
  { icon: '🎯', title: 'Goals as spans, not points',     desc: 'Every goal has a target (ambition) and a threshold (floor). The gap defines your risk appetite — explicitly.' },
  { icon: '📡', title: '6 risk states, always visible',  desc: 'Each goal is always in one of 6 states. You always know where you stand — and exactly what to do next.' },
  { icon: '📈', title: 'Forecast-driven, not reactive',  desc: 'Risk state is driven by your forecast, not last month\'s actuals. You see problems before the quarter ends.' },
  { icon: '🏗️', title: 'Full goal hierarchy',            desc: 'Enterprise goals cascade into departments and projects. See how team-level work rolls up to company strategy.' },
  { icon: '🤖', title: 'AI goal assistant',              desc: 'Describe a goal in plain language — AI structures it with target, threshold, category and unit instantly.' },
  { icon: '📋', title: 'Actions tied to risk state',     desc: 'Actions live on goals. When a goal turns Dire, you know what to do — and whether you\'ve done it.' },
]

const FRAMEWORKS = ['ISO 31000', 'OKR', 'Balanced Scorecard', 'SMART Goals', 'SWOT', 'PESTEL', 'McKinsey 7S']


export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="hero-gradient min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-20 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Left — copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-white/15">
                <span className="w-1.5 h-1.5 rounded-full bg-teal inline-block animate-pulse" />
                Aligned with ISO 31000
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white leading-[1.08] mb-6 tracking-tight">
                Your choice of goals<br />
                is your{' '}
                <span className="gradient-text">choice of risk.</span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed mb-4">
                De-Risk Matrix gives every strategic goal a live risk state — so your leadership team acts <em>before</em> it&apos;s too late, not after.
              </p>
              <p className="text-sm text-slate-400 mb-10">
                Most organizations discover goal risk in the quarterly review. By then it&apos;s already a crisis.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href={`${APP_URL}/register`}
                  className="px-8 py-4 bg-teal hover:bg-teal-dark text-white font-bold rounded-xl text-center transition-all shadow-xl shadow-teal/30 text-lg"
                >
                  Start your trial →
                </a>
                <Link
                  href="/score"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-center transition-colors border border-white/20"
                >
                  What&apos;s your De-Risk Score?
                </Link>
              </div>

              <div className="flex items-center gap-6 text-xs text-slate-500">
                <span className="flex items-center gap-1.5"><span className="text-teal">✓</span> 14-day trial</span>
                <span className="flex items-center gap-1.5"><span className="text-teal">✓</span> No lock-in</span>
                <span className="flex items-center gap-1.5"><span className="text-teal">✓</span> All features included</span>
              </div>
            </div>

            {/* Right — De-Risk Matrix */}
            <div className="hidden md:flex items-center justify-center">
              <MatrixDemo />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats / trust bar ─────────────────────────────────────── */}
      <section className="bg-slate-900 border-y border-slate-800 py-6" id="overview">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm">
            {[
              { val: '6', label: 'risk states' },
              { val: '2×3', label: 'matrix structure' },
              { val: 'ISO 31000', label: 'aligned' },
              { val: '14-day', label: 'trial' },
              { val: 'AI', label: 'goal assistant' },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="font-black text-white text-base">{s.val}</span>
                <span className="text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem ───────────────────────────────────────────────── */}
      <section className="py-24 bg-white" id="why">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Why De-Risk Matrix</p>
            <h2 className="text-4xl font-black text-navy">The problem with how goals are set today</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-red-50 text-red-600 text-xs font-bold px-3 py-1 rounded-full mb-5 border border-red-200">
                The problem
              </div>
              <h2 className="text-4xl font-black text-navy leading-tight mb-5">
                A target number tells you nothing about risk.
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed mb-5">
                When revenue hits 42M against a target of 50M — is that a crisis or acceptable? Without a <strong className="text-navy">threshold</strong>, there&apos;s no floor. No urgency signal. No defined moment to act.
              </p>
              <p className="text-slate-500 leading-relaxed">
                Most organizations discover this problem in the quarterly review — after the window for intervention has closed.
              </p>
            </div>
            <div className="space-y-4">
              {/* Before */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
                <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-3">Without De-Risk Matrix</div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-2 flex-1 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-400 rounded-full" style={{ width: '84%' }} />
                  </div>
                  <span className="text-sm font-bold text-slate-600">42M / 50M</span>
                </div>
                <p className="text-red-700 text-sm font-semibold">❌ Miss? Or acceptable? Nobody knows.</p>
                <p className="text-slate-400 text-xs mt-1">No threshold defined. No urgency signal. React after the fact.</p>
              </div>
              {/* After */}
              <div className="bg-teal-light border border-teal/30 rounded-2xl p-5">
                <div className="text-xs font-bold text-teal uppercase tracking-wider mb-3">With De-Risk Matrix</div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="h-2 flex-1 bg-white/60 rounded-full overflow-hidden relative">
                    <div className="h-full bg-teal rounded-full" style={{ width: '84%' }} />
                    <div className="absolute top-0 h-full border-l-2 border-navy/30 border-dashed" style={{ left: '80%' }} />
                  </div>
                  <span className="text-sm font-bold text-navy">42M</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-0.5 mb-3">
                  <span>0</span>
                  <span className="text-slate-400">Threshold: 40M ↑</span>
                  <span>Target: 50M</span>
                </div>
                <p className="text-teal font-semibold text-sm">✓ State: <strong>Harmonious</strong> — on track, act to ensure.</p>
                <p className="text-slate-500 text-xs mt-1">42M is above the 40M threshold. Risk is visible. Response is clear.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Score interrupt CTA ───────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-navy via-slate-900 to-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-accent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-block bg-teal/20 text-teal text-xs font-bold px-3 py-1 rounded-full mb-5 border border-teal/30">
              5 questions · 2 minutes · Free · No sign-up
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Where does your strategy<br className="hidden md:block" /> have blind spots?
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Most leadership teams can&apos;t answer these five questions well. Can yours?
            </p>
          </div>

          {/* Question teasers */}
          <div className="grid md:grid-cols-2 gap-3 mb-8 max-w-3xl mx-auto">
            {[
              { n: '01', q: 'How do you define strategic goals?',            hint: 'Target numbers aren\'t enough.' },
              { n: '02', q: 'How fast do you catch underperforming goals?',  hint: 'Most find out too late.' },
              { n: '03', q: 'What actually drives your strategic decisions?', hint: 'Data, gut feel, or both?' },
              { n: '04', q: 'How openly does leadership discuss risk?',       hint: 'Culture is the biggest gap.' },
            ].map(item => (
              <div key={item.n} className="flex items-start gap-3 bg-white/5 border border-white/8 rounded-xl px-4 py-3.5">
                <span className="text-xs font-black text-teal/60 mt-0.5 flex-shrink-0 w-5">{item.n}</span>
                <div>
                  <p className="text-sm font-semibold text-white/80 leading-snug">{item.q}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{item.hint}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Teaser tail + CTA */}
          <div className="text-center">
            <p className="text-slate-500 text-sm mb-6">
              +1 more question · instant score · your personal gap analysis
            </p>
            <Link
              href="/score"
              className="inline-flex items-center gap-2 px-10 py-4 bg-teal hover:bg-teal-dark text-white font-black rounded-xl transition-all shadow-2xl shadow-teal/25 text-lg"
            >
              Find out your score →
            </Link>
            <p className="text-slate-600 text-xs mt-3">No email required. Instant result.</p>
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50" id="how-it-works">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">How it works</p>
            <h2 className="text-4xl font-black text-navy">Goals. Risk States. Culture.</h2>
            <p className="text-lg text-slate-500 mt-4 max-w-xl mx-auto">Three concepts. One repeating cycle. Every period more precise than the last.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: '01', color: '#1d4ed8', bg: '#eff6ff', title: 'Define goals as spans', desc: 'Every goal gets a target (ambition) and a threshold (minimum acceptable). This creates a meaningful corridor — not binary pass/fail.', eg: 'Revenue: 50M target · 40M threshold' },
              { step: '02', color: '#1a9e8a', bg: '#d5f5e3', title: 'Read the risk state', desc: 'Each goal is always in one of 6 states based on forecast position and evidence strength. No subjectivity. No RAG debate.', eg: 'Harmonious · Dire · Potent · Pessimistic' },
              { step: '03', color: '#7c3aed', bg: '#ede9fe', title: 'Act on it', desc: 'Each state prescribes recommended leadership behaviors and actions — grounded in ISO 31000, ISO 45003, and Edmondson\'s psychological safety research.', eg: 'Dire → Escalate, lower uncertainty, act now' },
            ].map(item => (
              <div key={item.step} className="bg-white rounded-2xl p-7 shadow-sm card-hover">
                <div style={{ background: item.bg, color: item.color }} className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-base mb-5">
                  {item.step}
                </div>
                <h3 className="font-bold text-navy text-lg mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{item.desc}</p>
                <div style={{ background: item.bg, color: item.color }} className="text-xs font-semibold px-3 py-2 rounded-xl">
                  {item.eg}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6 Risk states matrix ──────────────────────────────────── */}
      <section className="py-24 bg-white" id="risk-states">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">The De-Risk Matrix</p>
            <h2 className="text-4xl font-black text-navy mb-4">The 6 risk states</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Every goal is always in exactly one state — determined by where it sits relative to target/threshold, and the strength of your evidence.
            </p>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[520px]">
              <div className="flex ml-24 mb-1 gap-3">
                <div className="flex-1 text-center text-xs font-bold text-slate-400 uppercase tracking-wider py-2 bg-slate-50 rounded-t-xl">
                  Strong evidence
                </div>
                <div className="flex-1 text-center text-xs font-bold text-slate-400 uppercase tracking-wider py-2 bg-slate-50 rounded-t-xl">
                  Weak evidence
                </div>
              </div>
              {[
                { rowLabel: 'Beyond target',    states: [RISK_STATES[0], RISK_STATES[1]] },
                { rowLabel: 'On track',         states: [RISK_STATES[2], RISK_STATES[3]] },
                { rowLabel: 'Below threshold',  states: [RISK_STATES[4], RISK_STATES[5]] },
              ].map(row => (
                <div key={row.rowLabel} className="flex gap-3 mb-3 items-stretch">
                  <div className="w-20 flex-shrink-0 flex items-center justify-end pr-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide text-right leading-tight">
                      {row.rowLabel}
                    </span>
                  </div>
                  {row.states.map(rs => (
                    <div key={rs.label} style={{ background: rs.bg, borderColor: rs.color + '50' }}
                      className="flex-1 rounded-2xl p-5 border-2 card-hover">
                      <div className="flex items-start justify-between mb-2">
                        <span style={{ color: rs.color }} className="text-lg font-black">{rs.label}</span>
                        <span style={{ background: rs.color + '20', color: rs.color }} className="text-xs font-bold px-2.5 py-1 rounded-full">
                          → {rs.action}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed">{rs.desc}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50" id="features">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">The platform</p>
            <h2 className="text-4xl font-black text-navy mb-3">Everything your strategy needs</h2>
            <p className="text-slate-500 max-w-xl mx-auto">One workspace for goals, risk states, forecasts, actions, hierarchy, and culture.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm card-hover border border-transparent hover:border-teal/20">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-bold text-navy mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sign-up interrupt ─────────────────────────────────────── */}
      <section className="py-16 bg-teal">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-black text-white mb-1">Ready to see your goals in a new light?</h3>
            <p className="text-teal-light/80 text-sm">14-day trial. No lock-in. Your first risk state overview in under 10 minutes.</p>
          </div>
          <a
            href={`${APP_URL}/register`}
            className="flex-shrink-0 px-8 py-4 bg-white text-teal font-black rounded-xl hover:bg-slate-50 transition-colors shadow-lg text-lg whitespace-nowrap"
          >
            Start your trial →
          </a>
        </div>
      </section>

      {/* ── Magnus quote ──────────────────────────────────────────── */}
      <section className="py-20 bg-navy">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="text-4xl mb-6 opacity-30">&ldquo;</div>
          <blockquote className="text-xl md:text-2xl font-light text-white leading-relaxed mb-8">
            Traditionally, risk meant <em className="text-teal not-italic font-semibold">how big the hole in the floor is</em> — probability multiplied by negative consequence. But ISO 31000 looks upward: how high the building is, and how high it could grow. Risk is the effect of uncertainty on objectives — and that is exactly what De-Risk Matrix is built upon.
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-teal/40">
              <Image src="/images/magnus.jpg" alt="Magnus Bjelkerud" width={48} height={48} className="w-full h-full object-cover" />
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
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="text-4xl font-black text-navy mb-3">Simple, transparent pricing</h2>
            <p className="text-lg text-slate-500">Two plans. All features included. 14-day trial on every account.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {[
              { name: 'Lite',     users: 'Up to 10 users', price: '1 190', note: '1 490 NOK/month billed monthly', highlight: false },
              { name: 'Business', users: 'Up to 50 users', price: '2 790', note: '3 490 NOK/month billed monthly', highlight: true  },
            ].map(plan => (
              <div key={plan.name} className={`rounded-2xl p-8 ${plan.highlight ? 'bg-navy' : 'bg-slate-50 border border-slate-200'}`}>
                <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${plan.highlight ? 'text-teal' : 'text-teal'}`}>{plan.users}</div>
                <h3 className={`text-xl font-black mb-3 ${plan.highlight ? 'text-white' : 'text-navy'}`}>{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-4xl font-black ${plan.highlight ? 'text-white' : 'text-navy'}`}>{plan.price}</span>
                  <span className="text-slate-400 text-sm">NOK/month</span>
                </div>
                <p className={`text-xs mb-6 ${plan.highlight ? 'text-slate-400' : 'text-slate-400'}`}>{plan.note}</p>
                <a href={`${APP_URL}/register`}
                  className={`block w-full py-3 rounded-xl font-bold text-center text-sm transition-colors ${plan.highlight ? 'bg-teal hover:bg-teal-dark text-white' : 'bg-navy hover:bg-slate-800 text-white'}`}>
                  Start 14-day trial →
                </a>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/pricing" className="text-sm text-teal font-semibold hover:underline">
              See full pricing, features and FAQ →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Compatible with ───────────────────────────────────────── */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5">Works alongside your existing frameworks</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {FRAMEWORKS.map(f => (
              <span key={f} className="bg-white border border-slate-200 text-slate-500 text-sm font-medium px-4 py-2 rounded-lg">
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final double CTA ──────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-navy to-slate-900">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* CTA 1 — Score */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/8 transition-colors">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-white font-black text-2xl mb-2">Not sure where to start?</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Take the 2-minute De-Risk Score assessment. Find out exactly where your organization stands and what to fix first.
              </p>
              <Link href="/score"
                className="inline-block px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors border border-white/20 w-full">
                Calculate your De-Risk Score →
              </Link>
              <p className="text-slate-500 text-xs mt-2">Instant result · No sign-up needed</p>
            </div>

            {/* CTA 2 — Signup */}
            <div className="bg-teal rounded-2xl p-8 text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-white font-black text-2xl mb-2">Ready to get started?</h3>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">
                14-day trial. All features included. Set up your first goals, see your risk states live, and start managing strategy the right way.
              </p>
              <a href={`${APP_URL}/register`}
                className="inline-block px-7 py-3.5 bg-white text-teal font-black rounded-xl hover:bg-slate-50 transition-colors w-full text-lg">
                Start your trial →
              </a>
              <p className="text-white/50 text-xs mt-2">No lock-in · Up and running in minutes</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
