import Link from 'next/link'
import Image from 'next/image'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const APP_URL = 'https://app.deriskmatrix.com'

const RISK_STATES = [
  { label: 'Defensive',   action: 'Raise',     position: 'Beyond target',    evidence: 'Strong', desc: 'Exceeding target with strong evidence. Raise the target to capture more value and avoid complacency.', color: '#1d4e6b', bg: '#d6eaf8' },
  { label: 'Potent',      action: 'Explore',   position: 'Beyond target',    evidence: 'Weak',   desc: 'Exceeding target but without strong data. Explore whether this is real or a measurement gap.', color: '#148f77', bg: '#d1f2eb' },
  { label: 'Harmonious',  action: 'Ensure',    position: 'On track',         evidence: 'Strong', desc: 'On track with strong evidence. Ensure the conditions that got you here continue to hold.', color: '#1a9e8a', bg: '#d5f5e3' },
  { label: 'Optimistic',  action: 'Prove',     position: 'On track',         evidence: 'Weak',   desc: 'On track but without sufficient data. Prove this trajectory is real by increasing evidence quality.', color: '#2ab09a', bg: '#d1f2eb' },
  { label: 'Dire',        action: 'Lower',     position: 'Below threshold',  evidence: 'Strong', desc: 'Confirmed underperformance. Lower uncertainty — escalate and take structured, immediate action.', color: '#c0392b', bg: '#fadbd8' },
  { label: 'Pessimistic', action: 'Intervene', position: 'Below threshold',  evidence: 'Weak',   desc: 'Below threshold with insufficient data. Intervene to gather evidence and stabilize the goal.', color: '#e07070', bg: '#fde8e8' },
]

const LANG_GOALS = [
  { flag: '🇳🇴', lang: 'Norwegian',   goal: 'Omsetningsvekst',               state: 'Harmonious',  color: '#1a9e8a' },
  { flag: '🇬🇧', lang: 'English',     goal: 'Revenue growth',                state: 'Harmonious',  color: '#1a9e8a' },
  { flag: '🇩🇪', lang: 'German',      goal: 'Umsatzwachstum',                state: 'Harmonious',  color: '#1a9e8a' },
  { flag: '🇪🇸', lang: 'Spanish',     goal: 'Crecimiento de ingresos',       state: 'Armonioso',   color: '#1a9e8a' },
  { flag: '🇫🇷', lang: 'French',      goal: 'Croissance du chiffre d\'aff.', state: 'Harmonieux',  color: '#1a9e8a' },
  { flag: '🇯🇵', lang: 'Japanese',    goal: '収益成長',                       state: 'Harmonious',  color: '#1a9e8a' },
  { flag: '🇧🇷', lang: 'Portuguese',  goal: 'Crescimento da receita',        state: 'Harmonious',  color: '#1a9e8a' },
  { flag: '🇵🇱', lang: 'Polish',      goal: 'Wzrost przychodów',             state: 'Harmonious',  color: '#1a9e8a' },
]

const AI_TOOLS = [
  {
    icon: '✦',
    title: 'AI Goal Assistant',
    desc: 'Describe any goal in plain language. AI structures it instantly with target, threshold, unit, and category — in any language.',
  },
  {
    icon: '◑',
    title: 'AI Evidence Wizard',
    desc: 'Auto-suggests which of 14 evidence factors apply to your specific goal. You confirm, adjust, or override. Strength determined in minutes, not meetings.',
  },
  {
    icon: '📈',
    title: 'AI Forecast Wizard',
    desc: 'Recommends growth rate and type with full reasoning — backed by Monte Carlo probability analysis across hundreds of simulations.',
  },
  {
    icon: '⚡',
    title: 'AI Risk Driver Coach',
    desc: 'Chat-based analysis of what\'s driving risk across any scope — a single goal, a department, or the entire company. Ask it anything.',
  },
  {
    icon: '🎯',
    title: 'AI Action Wizard',
    desc: 'Generates prioritized, concrete actions matched to your current risk state and identified risk drivers. Not generic advice — state-specific.',
  },
]

const FEATURES = [
  { icon: '🏗️', title: 'Full goal hierarchy',       desc: 'Enterprise goals cascade into departments and projects. See how team-level work rolls up to company strategy.' },
  { icon: '📡', title: 'Live risk canvas',           desc: 'Every goal, every state, at a glance. One shared view that replaces the quarterly surprise — updated in real time.' },
  { icon: '📊', title: 'Forecast engine',            desc: 'Linear trend, Holt-Winters, AI recommendation, and Monte Carlo — four forecast models, one click.' },
  { icon: '📋', title: 'Actions tied to risk state', desc: 'Actions live on goals. When a goal turns Dire, you know what to do — and whether it\'s been done.' },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* ── [1] HERO ──────────────────────────────────────────────────── */}
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
                Every strategic goal gets a live risk state — so you see which goals need attention
                <em> now</em>, not when the quarterly review reveals a crisis.
              </p>
              <p className="text-sm text-slate-400 mb-10">
                Progress without confidence is noise. De-Risk Matrix shows you both — where each goal
                stands, and how much you should trust that reading.
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
                <span className="flex items-center gap-1.5"><span className="text-teal">✓</span> First risk state in &lt;10 min</span>
                <span className="flex items-center gap-1.5"><span className="text-teal">✓</span> 14-day trial</span>
                <span className="flex items-center gap-1.5"><span className="text-teal">✓</span> No lock-in</span>
              </div>
            </div>

            {/* Right — De-Risk Matrix image */}
            <div className="hidden md:flex items-center justify-center">
              <Image
                src="/images/derisk-matrix.png"
                alt="The De-Risk Matrix — 6 risk states"
                width={580}
                height={560}
                className="w-full h-auto drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── [2] TRUST BAR ─────────────────────────────────────────────── */}
      <section className="bg-slate-900 border-y border-slate-800 py-5">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs">
            {[
              { icon: '◎', val: 'ISO 31000',        label: 'aligned' },
              { icon: '◈', val: '6 risk states',    label: 'always live, per goal' },
              { icon: '⚡', val: '5 AI tools',       label: 'goal-aware, not generic' },
              { icon: '🌐', val: 'Any language',     label: 'one risk picture, any team' },
              { icon: '◉', val: 'Early warning',    label: 'before the quarterly surprise' },
              { icon: '⬡', val: 'Live canvas',      label: 'shared, real-time, always current' },
            ].map(s => (
              <div key={s.val} className="flex items-center gap-1.5">
                <span className="text-teal">{s.icon}</span>
                <span className="font-bold text-white">{s.val}</span>
                <span className="text-slate-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── [2b] WHO THIS IS FOR ──────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Who it&apos;s for</p>
            <h2 className="text-3xl md:text-4xl font-black text-navy mb-4">
              Wherever goals exist, risk exists.
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              De-Risk Matrix works for any organization of any size, sector, or structure —
              because every organization sets goals, and every goal carries uncertainty.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: '🏢', title: 'Companies & corporations', desc: 'Strategic goals, revenue targets, market position, operational KPIs.' },
              { icon: '🏗️', title: 'Project organizations', desc: 'Cost, time, quality, scope — four goals every project lives or dies by.' },
              { icon: '🏛️', title: 'Public sector & municipalities', desc: 'Service delivery targets, budget adherence, citizen outcomes.' },
              { icon: '🌍', title: 'NGOs & nonprofits', desc: 'Impact goals, funding targets, program outcomes — risk is just as real.' },
              { icon: '🏥', title: 'Healthcare & social services', desc: 'Patient outcomes, capacity goals, quality metrics, compliance targets.' },
              { icon: '⚖️', title: 'Regulated industries', desc: 'Finance, insurance, energy — where structured risk documentation is mandatory.' },
              { icon: '🎓', title: 'Education & research', desc: 'Enrollment targets, grant goals, research milestones, accreditation.' },
              { icon: '🤝', title: 'Consultancies & agencies', desc: 'Manage and report on goal risk across multiple client engagements.' },
            ].map(item => (
              <div key={item.title} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 hover:border-teal/30 hover:bg-teal/5 transition-colors">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-navy text-sm mb-1.5 leading-snug">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-navy rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white font-bold text-lg mb-1">Know which goals are at risk — before it&apos;s too late.</p>
              <p className="text-slate-400 text-sm">Live risk states on every goal. Used to require specialist consultants and quarterly workshops. Now any team sees their full risk picture — continuously, in any language, with AI assistance.</p>
            </div>
            <a href={`${APP_URL}/register`}
              className="flex-shrink-0 px-7 py-3.5 bg-teal hover:bg-teal-dark text-white font-bold rounded-xl transition-colors whitespace-nowrap shadow-lg">
              Start free trial →
            </a>
          </div>
        </div>
      </section>

      {/* ── [3] PARADIGM SHIFT ────────────────────────────────────────── */}
      <section className="py-28 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal rounded-full blur-[140px] opacity-5 -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-accent rounded-full blur-[120px] opacity-5 translate-y-1/2 -translate-x-1/3" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6">
          {/* ISO badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/8 border border-white/10 text-teal text-xs font-bold px-4 py-2 rounded-full">
              ISO 31000 · International Standard for Risk Management
            </div>
          </div>

          {/* Core insight */}
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-5">The insight that changes everything</p>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6 max-w-3xl mx-auto">
              Risk is the{' '}
              <span className="gradient-text">effect of uncertainty</span>
              <br />on your objectives.
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Not a list of things that could go wrong.<br />
              Not probability &times; impact.<br />
              <strong className="text-white">The effect of uncertainty on your specific goals.</strong>
            </p>
          </div>

          {/* Two columns: traditional vs ISO 31000 */}
          <div className="grid md:grid-cols-2 gap-5 mb-16">
            <div className="bg-white/4 border border-white/8 rounded-2xl p-7">
              <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-6">Traditional risk thinking</div>
              <div className="space-y-4">
                {[
                  ['What could go wrong?', 'Threat-only — misses upside uncertainty entirely'],
                  ['Probability × negative impact', 'Measures severity, not effect on your goals'],
                  ['Risk is separate from strategy', 'A parallel exercise, disconnected from objectives'],
                  ['Annual workshop → static register', 'Already outdated by the time it\'s published'],
                  ['5×5 matrix as primary tool', 'Designed for projects, not strategic portfolios'],
                ].map(([title, sub], i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-red-400 text-sm flex-shrink-0 mt-0.5">✕</span>
                    <div>
                      <div className="text-slate-300 text-sm font-medium">{title}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-teal/8 border border-teal/20 rounded-2xl p-7">
              <div className="text-xs font-bold text-teal uppercase tracking-wider mb-6">ISO 31000 · De-Risk Matrix</div>
              <div className="space-y-4">
                {[
                  ['What is uncertainty doing to our goals?', 'Captures both upside and downside — all 6 risk states'],
                  ['Goal position × evidence strength', 'Risk is visible at the goal level, always'],
                  ['Risk IS strategy — goals are your risk picture', 'One system for goals, risk, culture, and actions'],
                  ['Continuous — every data point updates the picture', 'Live states, not a document filed away'],
                  ['6 risk states with prescribed leadership response', 'Know what to do next — not just how bad it is'],
                ].map(([title, sub], i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-teal text-sm flex-shrink-0 mt-0.5">✓</span>
                    <div>
                      <div className="text-white text-sm font-medium">{title}</div>
                      <div className="text-teal/60 text-xs mt-0.5">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Magnus quote */}
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-4xl text-teal/25 mb-4 font-serif leading-none">&ldquo;</div>
            <blockquote className="text-lg md:text-xl text-slate-300 italic leading-relaxed mb-8">
              Traditionally, risk meant <em className="text-teal not-italic font-semibold">how big the hole in the floor is</em> —
              probability multiplied by negative consequence. But ISO 31000 looks upward:
              how high the building is, and how high it could grow. Risk is the effect
              of uncertainty on objectives — and that is exactly what De-Risk Matrix is built upon.
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 border-2 border-teal/40">
                <Image src="/images/magnus.jpg" alt="Magnus Bjelkerud" width={44} height={44} className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <div className="text-white font-semibold text-sm">Magnus Bjelkerud</div>
                <div className="text-slate-500 text-xs">Creator, De-Risk Matrix</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── [4] THE CONTRAST ──────────────────────────────────────────── */}
      <section className="py-24 bg-white" id="why">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Why De-Risk Matrix</p>
            <h2 className="text-4xl font-black text-navy mb-4">
              Your goals already have a risk state.<br className="hidden md:block" />
              Now you can see it.
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Most tools track whether you&apos;re on track. De-Risk Matrix adds the second question:
              how confident should you be in that reading?
            </p>
          </div>

          {/* Comparison table — desktop */}
          <div className="hidden md:block rounded-2xl border border-slate-200 overflow-hidden mb-12 shadow-sm">
            <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200">
              <div className="px-5 py-4 text-xs font-bold text-slate-300 uppercase tracking-wider" />
              <div className="px-5 py-4 text-xs font-bold text-red-400 uppercase tracking-wider border-l border-slate-200">5&times;5 Risk Matrix</div>
              <div className="px-5 py-4 text-xs font-bold text-teal uppercase tracking-wider border-l border-slate-200">De-Risk Matrix</div>
            </div>
            {[
              { dim: 'Direction',  bad: 'Downside only — threats and harms',         good: 'Upside + downside — all forms of uncertainty' },
              { dim: 'Goal link',  bad: 'Disconnected from strategic goals',          good: 'Risk IS goal achievement — inseparable' },
              { dim: 'Frequency',  bad: 'Annual workshop → static risk register',    good: 'Continuous — every data point updates states' },
              { dim: 'Output',     bad: 'A list ranked by probability × impact',      good: 'A live state with prescribed leadership action' },
              { dim: 'Targets',    bad: 'Single-point targets — binary pass/fail',    good: 'Spans: target + threshold — explicit risk appetite' },
              { dim: 'Culture',    bad: 'Not addressed',                             good: 'Each state prescribes specific leader behaviors' },
              { dim: 'Evidence',   bad: 'Subjective scoring in a workshop',          good: '14 evidence factors — AI-assisted, auditable' },
            ].map((row, i) => (
              <div key={row.dim} className={`grid grid-cols-3 ${i < 6 ? 'border-b border-slate-100' : ''}`}>
                <div className="px-5 py-4 text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center">{row.dim}</div>
                <div className="px-5 py-4 text-sm text-slate-500 border-l border-slate-100 flex items-start gap-2">
                  <span className="text-red-300 flex-shrink-0 mt-0.5">✕</span><span>{row.bad}</span>
                </div>
                <div className="px-5 py-4 text-sm text-navy font-medium border-l border-slate-100 flex items-start gap-2">
                  <span className="text-teal flex-shrink-0 mt-0.5">✓</span><span>{row.good}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison table — mobile cards */}
          <div className="md:hidden space-y-3 mb-12">
            {[
              { dim: 'Direction',  bad: 'Downside only — threats and harms',         good: 'Upside + downside — all forms of uncertainty' },
              { dim: 'Goal link',  bad: 'Disconnected from strategic goals',          good: 'Risk IS goal achievement — inseparable' },
              { dim: 'Frequency',  bad: 'Annual workshop → static risk register',    good: 'Continuous — every data point updates states' },
              { dim: 'Output',     bad: 'A list ranked by probability × impact',      good: 'A live state with prescribed leadership action' },
              { dim: 'Targets',    bad: 'Single-point targets — binary pass/fail',    good: 'Spans: target + threshold — explicit risk appetite' },
              { dim: 'Culture',    bad: 'Not addressed',                             good: 'Each state prescribes specific leader behaviors' },
              { dim: 'Evidence',   bad: 'Subjective scoring in a workshop',          good: '14 evidence factors — AI-assisted, auditable' },
            ].map(row => (
              <div key={row.dim} className="rounded-xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">{row.dim}</div>
                <div className="grid grid-cols-2 divide-x divide-slate-100">
                  <div className="p-3 flex items-start gap-1.5 bg-red-50/50">
                    <span className="text-red-300 flex-shrink-0 text-xs mt-0.5">✕</span>
                    <span className="text-xs text-slate-500 leading-relaxed">{row.bad}</span>
                  </div>
                  <div className="p-3 flex items-start gap-1.5">
                    <span className="text-teal flex-shrink-0 text-xs mt-0.5">✓</span>
                    <span className="text-xs text-navy font-medium leading-relaxed">{row.good}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Concrete 42M example */}
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-4">Without De-Risk Matrix</div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-2 flex-1 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-400 rounded-full" style={{ width: '84%' }} />
                </div>
                <span className="text-sm font-bold text-slate-600">42M / 50M</span>
              </div>
              <p className="text-red-700 text-sm font-semibold mb-1">❌ Miss? Or acceptable? Nobody knows.</p>
              <p className="text-slate-400 text-xs">No threshold defined. No urgency signal. React after the fact.</p>
            </div>
            <div className="bg-teal-light border border-teal/30 rounded-2xl p-6">
              <div className="text-xs font-bold text-teal uppercase tracking-wider mb-4">With De-Risk Matrix</div>
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
              <p className="text-teal font-semibold text-sm mb-1">✓ State: <strong>Harmonious</strong> — on track, act to ensure.</p>
              <p className="text-slate-500 text-xs">42M is above the 40M threshold. Risk is visible. Response is clear.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── [5] HOW IT WORKS ──────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50" id="how-it-works">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">How it works</p>
            <h2 className="text-4xl font-black text-navy">Set goals. Read the risk. Act early. Learn.</h2>
            <p className="text-lg text-slate-500 mt-4 max-w-xl mx-auto">
              Four steps. Repeated each period. Each cycle, your risk picture gets sharper.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {[
              {
                step: '01', color: '#1d4ed8', bg: '#eff6ff',
                title: 'Define goal spans',
                desc: 'Every goal gets a target (ambition) and a threshold (floor). The gap between them is your explicit risk appetite.',
                eg: 'Revenue: 50M target · 40M threshold',
              },
              {
                step: '02', color: '#1a9e8a', bg: '#d5f5e3',
                title: 'Read the risk state',
                desc: 'Goal position + evidence strength → one of 6 states, automatically. No subjectivity. No RAG committee debates.',
                eg: 'Harmonious · Dire · Potent · Pessimistic',
              },
              {
                step: '03', color: '#7c3aed', bg: '#ede9fe',
                title: 'Act with purpose',
                desc: 'Each state prescribes specific leadership behavior. Dire → escalate. Defensive → raise the target. Culture is not optional.',
                eg: 'Dire → Lower · Defensive → Raise',
              },
              {
                step: '04', color: '#d97706', bg: '#fef3c7',
                title: 'Learn each cycle',
                desc: 'Every data point improves calibration. Next period your forecasts are more precise. Your risk appetite is better defined.',
                eg: 'Better targets → sharper risk picture',
              },
            ].map(item => (
              <div key={item.step} className="bg-white rounded-2xl p-6 shadow-sm card-hover">
                <div style={{ background: item.bg, color: item.color }} className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm mb-5">
                  {item.step}
                </div>
                <h3 className="font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{item.desc}</p>
                <div style={{ background: item.bg, color: item.color }} className="text-xs font-semibold px-3 py-2 rounded-xl">
                  {item.eg}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── [6] THE 6 RISK STATES ─────────────────────────────────────── */}
      <section className="py-24 bg-white" id="risk-states">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">The De-Risk Matrix</p>
            <h2 className="text-4xl font-black text-navy mb-4">Six risk states. Always visible.</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Every goal is always in exactly one state — determined by where it sits relative to target and threshold, and the strength of your evidence. Each state tells you what to do next.
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[520px]">
              {/* Column headers */}
              <div className="flex ml-24 mb-2 gap-3">
                <div className="flex-1 text-center text-xs font-bold text-slate-500 uppercase tracking-wider py-2 bg-slate-50 rounded-t-xl">
                  Strong evidence
                </div>
                <div className="flex-1 text-center text-xs font-bold text-slate-500 uppercase tracking-wider py-2 bg-slate-50 rounded-t-xl">
                  Weak evidence
                </div>
              </div>

              {[
                { rowLabel: 'Beyond target',   states: [RISK_STATES[0], RISK_STATES[1]] },
                { rowLabel: 'On track',        states: [RISK_STATES[2], RISK_STATES[3]] },
                { rowLabel: 'Below threshold', states: [RISK_STATES[4], RISK_STATES[5]] },
              ].map(row => (
                <div key={row.rowLabel} className="flex gap-3 mb-3 items-stretch">
                  <div className="w-20 flex-shrink-0 flex items-center justify-end pr-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wide text-right leading-tight">
                      {row.rowLabel}
                    </span>
                  </div>
                  {row.states.map(rs => (
                    <div key={rs.label}
                      style={{ background: rs.bg, borderColor: rs.color + '50' }}
                      className="flex-1 rounded-2xl p-5 border-2 card-hover">
                      <div className="flex items-start justify-between mb-2">
                        <span style={{ color: rs.color }} className="text-lg font-black">{rs.label}</span>
                        <span style={{ background: rs.color + '20', color: rs.color }} className="text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ml-2">
                          → {rs.action}
                        </span>
                      </div>
                      <div className="flex gap-1.5 mb-3">
                        <span className="text-xs bg-white/70 text-slate-500 px-2 py-0.5 rounded">{rs.position}</span>
                        <span className="text-xs bg-white/70 text-slate-500 px-2 py-0.5 rounded">{rs.evidence} evidence</span>
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

      {/* ── [6b] RISK CULTURE ─────────────────────────────────────────── */}
      <section className="py-24 bg-slate-900" id="culture">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-teal uppercase tracking-widest mb-3">Risk culture</p>
            <h2 className="text-4xl font-black text-white mb-5 leading-tight">
              The risk state tells you where you are.<br className="hidden md:block" />
              Culture determines where you go.
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Most risk tools report the state. De-Risk Matrix changes it — by prescribing specific
              leadership behaviors for each state. A Dire goal only improves when leaders act differently.
            </p>
          </div>

          {/* 2×3 cultural response grid */}
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {[
              {
                label: 'Defensive', action: 'Raise',
                color: '#1d4e6b', bg: 'rgba(29,78,107,0.15)', border: 'rgba(29,78,107,0.35)',
                behavior: "Don't coast on success. Raise the ambition. Celebrate — then immediately recalibrate targets upward. Challenge complacency before it takes root.",
                value: 'Ambition', quote: '"Good is not good enough if we can do better."',
              },
              {
                label: 'Potent', action: 'Explore',
                color: '#148f77', bg: 'rgba(20,143,119,0.15)', border: 'rgba(20,143,119,0.35)',
                behavior: 'Investigate before celebrating. Demand measurement clarity. Is this real performance — or a gap in how we measure? Great results need great explanations.',
                value: 'Intellectual honesty', quote: '"Unexplained success is a risk we haven\'t named yet."',
              },
              {
                label: 'Harmonious', action: 'Ensure',
                color: '#1a9e8a', bg: 'rgba(26,158,138,0.15)', border: 'rgba(26,158,138,0.35)',
                behavior: 'Protect the conditions that got you here. Avoid unnecessary disruption. Maintain momentum. Stability is not complacency — it is a strategic choice.',
                value: 'Discipline', quote: '"Don\'t fix what isn\'t broken. Protect what works."',
              },
              {
                label: 'Optimistic', action: 'Prove',
                color: '#2ab09a', bg: 'rgba(42,176,154,0.15)', border: 'rgba(42,176,154,0.35)',
                behavior: 'Challenge assumptions. Create measurement discipline. Gut feel is not evidence. Demand the data that proves this trajectory is real — before the quarter ends.',
                value: 'Epistemic rigour', quote: '"Optimism without evidence is a risk you haven\'t measured."',
              },
              {
                label: 'Dire', action: 'Lower',
                color: '#c0392b', bg: 'rgba(192,57,43,0.15)', border: 'rgba(192,57,43,0.35)',
                behavior: 'Escalate immediately. Create urgency without panic. Lower uncertainty through structured action. There is no "wait and see" in a Dire state.',
                value: 'Psychological safety', quote: '"Acknowledging Dire is not failure — staying silent is."',
              },
              {
                label: 'Pessimistic', action: 'Intervene',
                color: '#e07070', bg: 'rgba(224,112,112,0.15)', border: 'rgba(224,112,112,0.35)',
                behavior: 'Intervene even with limited information. Do not wait for certainty before acting. Prioritize evidence gathering alongside stabilization — in parallel.',
                value: 'Courage under uncertainty', quote: '"When data is scarce, gather it — don\'t wait for it."',
              },
            ].map(s => (
              <div key={s.label} style={{ background: s.bg, border: `1.5px solid ${s.border}`, borderRadius: 16, padding: '22px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 17, fontWeight: 900, color: s.color }}>{s.label}</span>
                  <span style={{ fontSize: 10, fontWeight: 800, padding: '3px 10px', borderRadius: 20, background: s.color + '28', color: s.color, letterSpacing: '.04em' }}>→ {s.action}</span>
                </div>
                <p style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.65, marginBottom: 12 }}>{s.behavior}</p>
                <div style={{ borderTop: `1px solid ${s.border}`, paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: s.color, textTransform: 'uppercase', letterSpacing: '.06em' }}>{s.value}</span>
                  <span style={{ fontSize: 11, color: s.color + 'bb', fontStyle: 'italic' }}>{s.quote}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Core message + link */}
          <div style={{ background: 'rgba(26,158,138,0.08)', border: '1px solid rgba(26,158,138,0.22)', borderRadius: 16, padding: '28px 36px', textAlign: 'center' }}>
            <p className="text-white text-lg font-semibold mb-3">
              De-Risk Matrix is the only risk framework that connects goal achievement,<br className="hidden md:block" />
              evidence strength, and prescribed leadership culture — in one live system.
            </p>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto mb-6">
              Culture is not a soft topic. It is the primary variable that determines whether a Dire goal gets fixed
              or stays Dire. Every risk state in De-Risk Matrix comes with a specific leadership response — grounded
              in ISO 31000, ISO 45003, and psychological safety research.
            </p>
            <Link href="/culture" className="inline-flex items-center gap-2 text-teal font-bold text-sm hover:underline">
              Deep dive: risk culture and leadership →
            </Link>
          </div>
        </div>
      </section>

      {/* ── [7] MULTI-LANGUAGE & COLLABORATION ────────────────────────── */}
      <section className="py-24 bg-navy relative overflow-hidden" id="collaboration">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-accent rounded-full blur-[120px] opacity-6 -translate-y-1/3 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal rounded-full blur-[100px] opacity-6 translate-y-1/3 -translate-x-1/3" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-14 items-center">

            {/* Left — copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/8 border border-white/10 text-teal text-xs font-bold px-3 py-1.5 rounded-full mb-6">
                🌐 Multi-language · Real-time collaboration
              </div>
              <h2 className="text-4xl font-black text-white leading-tight mb-5">
                Your team speaks<br />many languages.<br />
                <span className="gradient-text">Your risk picture is one.</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                Teams across Oslo, London, Berlin, and Tokyo work on the same strategic goals —
                each in their own language. The risk state is universal: everyone knows what
                Dire means, regardless of what language they speak.
              </p>

              <div className="space-y-5">
                {[
                  {
                    icon: '◎',
                    title: 'Same data, any language',
                    desc: 'Enter goals, data points, actions, and comments in any language. The underlying risk picture is shared — and identical — across the entire organization.',
                  },
                  {
                    icon: '⬡',
                    title: 'Real-time shared canvas',
                    desc: 'When a team member logs a data point in Warsaw, the risk state updates instantly for the leadership team in New York. One canvas. One source of truth.',
                  },
                  {
                    icon: '◈',
                    title: 'Role-based contribution',
                    desc: 'Leaders define targets and thresholds. Managers log actuals and run workshops. Everyone sees the same risk canvas, with the access level that fits their role.',
                  },
                ].map(p => (
                  <div key={p.title} className="flex gap-3">
                    <span className="text-teal text-lg flex-shrink-0 mt-0.5">{p.icon}</span>
                    <div>
                      <div className="text-white font-semibold text-sm mb-1">{p.title}</div>
                      <div className="text-slate-400 text-sm leading-relaxed">{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — language visual */}
            <div>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '22px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 14, paddingLeft: 2 }}>
                  Revenue growth — one goal, any language
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {LANG_GOALS.map(item => (
                    <div key={item.lang} style={{ background: item.color + '15', border: `1px solid ${item.color}35`, borderRadius: 10, padding: '10px 12px' }}>
                      <div style={{ fontSize: 10, color: '#64748b', marginBottom: 3 }}>{item.flag} {item.lang}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: item.color, marginBottom: 5 }}>{item.goal}</div>
                      <div style={{ fontSize: 9, fontWeight: 800, padding: '2px 7px', borderRadius: 20, background: item.color + '25', color: item.color, display: 'inline-block', letterSpacing: '.04em' }}>
                        {item.state}
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 14, paddingLeft: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1a9e8a', flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: '#475569' }}>Same risk state · same threshold · same canvas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── [8] WORKSHOP → LIVE SYSTEM ────────────────────────────────── */}
      <section className="py-24 bg-slate-50" id="workshop">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Workshop-ready</p>
            <h2 className="text-4xl font-black text-navy mb-4">
              A risk workshop that doesn&apos;t feed<br className="hidden md:block" />
              a live system is an expensive conversation.
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              With De-Risk Matrix, the workshop <em>is</em> the system setup.
              You walk out with a live risk canvas — not a PowerPoint deck that gets filed away.
            </p>
          </div>

          {/* Before / After */}
          <div className="grid md:grid-cols-2 gap-5 mb-10">
            <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
              <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-6">Traditional risk workshop</div>
              <div className="space-y-3.5">
                {[
                  ['Sticky notes on a wall',                'No structure, no system'],
                  ['Excel spreadsheet of risks',            'Disconnected from goals'],
                  ['PowerPoint presented to the board',     'A snapshot, already stale'],
                  ['Emailed as PDF — and forgotten',        'No follow-up mechanism'],
                  ['Next year: start from scratch',         'Zero learning between cycles'],
                ].map(([item, sub], i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-red-300 flex-shrink-0 mt-0.5">✕</span>
                    <div>
                      <div className="text-sm text-slate-600 font-medium">{item}</div>
                      <div className="text-xs text-slate-400">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-navy rounded-2xl p-7 shadow-sm">
              <div className="text-xs font-bold text-teal uppercase tracking-wider mb-6">De-Risk Matrix workshop</div>
              <div className="space-y-3.5">
                {[
                  ['Goals defined directly in the canvas',       'Structured, shared, live from minute one'],
                  ['AI assesses evidence in real time',          'Pre-checks factors as the team works'],
                  ['Risk states visible immediately to everyone','No interpretation needed — the state is clear'],
                  ['Actions tracked on the same platform',       'Ownership and follow-up built in'],
                  ['Next quarter: compare to last cycle',        'Learning accumulates with every period'],
                ].map(([item, sub], i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-teal flex-shrink-0 mt-0.5">✓</span>
                    <div>
                      <div className="text-sm text-white font-medium">{item}</div>
                      <div className="text-xs text-teal/60">{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5-step workshop flow */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-7 py-5 border-b border-slate-100 bg-slate-50">
              <h3 className="font-bold text-navy text-base">A De-Risk Matrix workshop — how it runs</h3>
              <p className="text-slate-500 text-sm mt-1">Five steps. Works in person or remote. Any language.</p>
            </div>
            <div className="divide-y divide-slate-100">
              {[
                {
                  n: '1',
                  title: 'Define goal spans — together, in real time',
                  desc: 'Set targets and thresholds as a team, directly in the platform. Everyone sees the canvas. No translation to another system ever needed.',
                },
                {
                  n: '2',
                  title: 'Assess evidence — AI pre-checks, team confirms',
                  desc: 'The AI Evidence Wizard suggests which of 14 evidence factors apply to each goal. Your team reviews, adjusts, and confirms in minutes.',
                },
                {
                  n: '3',
                  title: 'Identify risk drivers — the AI coach asks the right questions',
                  desc: 'Chat-based risk driver analysis. What is causing this goal to be in a Pessimistic state? The AI helps surface drivers the team might miss.',
                },
                {
                  n: '4',
                  title: 'Commit to cultural responses — logged, visible, owned',
                  desc: 'What does leadership commit to doing if Revenue turns Dire? Agreed on in the workshop, stored on the goal, visible to everyone on the canvas.',
                },
                {
                  n: '5',
                  title: 'Walk out with a live system — not a presentation',
                  desc: 'The canvas is live from the moment the workshop ends. Every data point updates it. Risk states update automatically. Nothing gets filed away.',
                },
              ].map(step => (
                <div key={step.n} className="flex gap-5 px-7 py-5 hover:bg-slate-50 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-teal text-white flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">
                    {step.n}
                  </div>
                  <div>
                    <div className="font-semibold text-navy text-sm mb-1">{step.title}</div>
                    <div className="text-slate-500 text-sm leading-relaxed">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── [9] AI ASSISTANCE ─────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-navy via-slate-900 to-navy">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-teal uppercase tracking-widest mb-3">AI assistance</p>
            <h2 className="text-4xl font-black text-white mb-4">
              Five AI tools. Purpose-built for<br className="hidden md:block" /> risk-aware strategy.
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Not generic AI. These tools understand risk states, evidence strength, thresholds — and what <strong className="text-white">Dire</strong> actually means.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {AI_TOOLS.slice(0, 4).map(t => (
              <div key={t.title} className="bg-white/5 border border-white/8 rounded-2xl p-6 hover:bg-white/8 transition-colors">
                <div className="text-2xl mb-4">{t.icon}</div>
                <h3 className="font-bold text-white mb-2">{t.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
          <div className="max-w-2xl mx-auto">
            {AI_TOOLS.slice(4).map(t => (
              <div key={t.title} className="bg-white/5 border border-white/8 rounded-2xl p-6 hover:bg-white/8 transition-colors">
                <div className="text-2xl mb-4">{t.icon}</div>
                <h3 className="font-bold text-white mb-2">{t.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-500 text-sm italic mt-10">
            &ldquo;Ask the AI what&apos;s driving your Dire goals. It will tell you — and it will suggest what to do next.&rdquo;
          </p>
        </div>
      </section>

      {/* ── [10] SCORE INTERRUPT ──────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-navy via-slate-900 to-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-accent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6">
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

          <div className="grid md:grid-cols-2 gap-3 mb-8 max-w-3xl mx-auto">
            {[
              { n: '01', q: 'How do you define strategic goals?',              hint: 'Target numbers alone aren\'t enough.' },
              { n: '02', q: 'How fast do you catch underperforming goals?',    hint: 'Most teams find out too late.' },
              { n: '03', q: 'What actually drives your strategic decisions?',  hint: 'Data, gut feel, or both?' },
              { n: '04', q: 'How openly does leadership discuss risk?',        hint: 'Culture is the biggest gap.' },
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

          <div className="text-center">
            <p className="text-slate-500 text-sm mb-6">+1 more question · instant score · your personal gap analysis</p>
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

      {/* ── Sign-up interrupt ─────────────────────────────────────────── */}
      <section className="py-14 bg-teal">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-black text-white mb-1">Know which goals are at risk — before it&apos;s too late.</h3>
            <p className="text-white/70 text-sm">14-day trial. All features. Your first risk state overview in under 10 minutes. Any language.</p>
          </div>
          <a
            href={`${APP_URL}/register`}
            className="flex-shrink-0 px-8 py-4 bg-white text-teal font-black rounded-xl hover:bg-slate-50 transition-colors shadow-lg text-lg whitespace-nowrap"
          >
            Start your trial →
          </a>
        </div>
      </section>

      {/* ── [11] FEATURES ─────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50" id="features">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">The platform</p>
            <h2 className="text-3xl font-black text-navy mb-3">Everything strategy needs — one canvas</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">Goals, risk states, forecasts, workshops, AI, actions, and culture — in one shared workspace.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
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

      {/* ── [12] PRICING ──────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="text-4xl font-black text-navy mb-3">All features. Always.</h2>
            <p className="text-lg text-slate-500">From €19/month. The only difference is how many people you invite.</p>
          </div>

          <div className="text-center mb-8">
            <span className="inline-block bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold px-4 py-2 rounded-full">
              All features identical across all plans · Choose by team size
            </span>
          </div>

          {/* Alternative cost context */}
          <div className="bg-slate-800 rounded-2xl px-6 py-4 mb-8 grid md:grid-cols-3 gap-4">
            {[
              { bad: true,  label: 'Risk consultant workshop', cost: '€2,000–5,000', note: 'Once. Then filed away.' },
              { bad: true,  label: 'Quarterly review cycle ×4', cost: '€8,000–20,000/yr', note: 'Backward-looking. Already too late.' },
              { bad: false, label: 'De-Risk Matrix Growth', cost: 'From €19/month', note: 'Continuous. Live. Every data point.' },
            ].map(item => (
              <div key={item.label} className={`rounded-xl px-4 py-3 ${item.bad ? 'bg-white/5' : 'bg-teal/15 border border-teal/30'}`}>
                <div className={`text-xs font-semibold mb-1 ${item.bad ? 'text-slate-400' : 'text-teal'}`}>{item.bad ? '✕' : '✓'} {item.label}</div>
                <div className={`text-lg font-black ${item.bad ? 'text-slate-300' : 'text-white'}`}>{item.cost}</div>
                <div className={`text-xs mt-0.5 ${item.bad ? 'text-slate-500' : 'text-teal/70'}`}>{item.note}</div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {[
              {
                name: 'Mini',
                invite: 'Up to 3 people',
                inviteNote: 'Founder · Solo operator · Small team',
                annual: '€19',
                monthly: '€24',
                highlight: false,
                tag: null,
              },
              {
                name: 'Starter',
                invite: 'Up to 5 people',
                inviteNote: 'Team members · Executives · Board observers',
                annual: '€39',
                monthly: '€49',
                highlight: false,
                tag: null,
              },
              {
                name: 'Growth',
                invite: '10+ people — unlimited',
                inviteNote: 'Team · Managers · Executives · Board · Stakeholders',
                annual: '€119',
                monthly: '€149',
                highlight: true,
                tag: 'Most popular',
              },
            ].map(plan => (
              <div key={plan.name} className={`rounded-2xl p-7 ${plan.highlight ? 'bg-navy' : 'bg-slate-50 border border-slate-200'}`}>
                {plan.tag && (
                  <div className="inline-block bg-teal text-white text-xs font-bold px-3 py-1 rounded-full mb-3">{plan.tag}</div>
                )}
                <h3 className={`text-xl font-black mb-3 ${plan.highlight ? 'text-white' : 'text-navy'}`}>{plan.name}</h3>

                <div className={`rounded-xl px-4 py-3 mb-4 ${plan.highlight ? 'bg-white/10' : 'bg-teal/10 border border-teal/20'}`}>
                  <div className="text-teal text-sm font-bold mb-0.5">{plan.invite}</div>
                  <div className={`text-xs ${plan.highlight ? 'text-slate-400' : 'text-slate-500'}`}>{plan.inviteNote}</div>
                </div>

                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-3xl font-black ${plan.highlight ? 'text-white' : 'text-navy'}`}>{plan.annual}</span>
                  <span className="text-slate-400 text-sm">/month</span>
                </div>
                <p className="text-xs mb-5 text-slate-400">{plan.monthly}/month billed monthly · 14-day trial</p>
                <a href={`${APP_URL}/register`}
                  className={`block w-full py-3 rounded-xl font-bold text-center text-sm transition-colors ${plan.highlight ? 'bg-teal hover:bg-teal-dark text-white' : 'bg-navy hover:bg-slate-800 text-white'}`}>
                  Start free trial →
                </a>
                <p className={`text-center text-xs mt-2 ${plan.highlight ? 'text-slate-500' : 'text-slate-400'}`}>No credit card required</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-slate-500 mb-2">Full feature breakdown and enterprise options →</p>
            <Link href="/pricing" className="text-sm text-teal font-semibold hover:underline">
              See full pricing details and FAQ →
            </Link>
          </div>
        </div>
      </section>

      {/* ── [13] FINAL CTA ────────────────────────────────────────────── */}
      <section className="py-28 bg-gradient-to-br from-navy to-slate-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-bold text-teal uppercase tracking-widest mb-5">Right now</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Some of your goals are heading<br className="hidden md:block" /> toward breach.
          </h2>
          <p className="text-2xl text-slate-400 font-light mb-4">Do you know which ones?</p>
          <p className="text-slate-500 mb-10 max-w-xl mx-auto text-sm leading-relaxed">
            Your risk picture exists whether you read it or not.
            De-Risk Matrix makes it visible — from day one, in any language, for every team across your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-5">
            <a
              href={`${APP_URL}/register`}
              className="px-10 py-4 bg-teal hover:bg-teal-dark text-white font-black rounded-xl text-lg shadow-2xl shadow-teal/30 transition-colors"
            >
              See your risk states in under 10 minutes →
            </a>
            <Link
              href="/score"
              className="px-8 py-4 bg-white/8 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/15 transition-colors"
            >
              Take the De-Risk Score quiz
            </Link>
          </div>
          <p className="text-slate-600 text-xs">14-day trial · No lock-in · All features included · Any language</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
