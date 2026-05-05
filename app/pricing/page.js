import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Pricing — De-Risk Matrix',
  description: 'Two plans. All features included. The only difference is how many people you invite. 14-day trial, no credit card required.',
}

const APP_URL = 'https://app.deriskmatrix.com'

const ALL_FEATURES = [
  {
    category: 'Core methodology',
    items: [
      { icon: '🎯', label: 'Goals as spans — target + threshold for every goal' },
      { icon: '📡', label: '6 live risk states — always visible, always current' },
      { icon: '◑', label: '14-factor evidence assessment per goal' },
      { icon: '🏗️', label: 'Full hierarchy — enterprise, department, project' },
      { icon: '◆', label: 'Risk strategies per goal and per state' },
      { icon: '📋', label: 'Actions tied to risk state — owned and tracked' },
    ],
  },
  {
    category: 'AI tools — all five included',
    items: [
      { icon: '✦', label: 'AI Goal Assistant — structure any goal from plain language' },
      { icon: '◑', label: 'AI Evidence Wizard — auto-suggest evidence factors' },
      { icon: '📈', label: 'AI Forecast Wizard — growth recommendation + Monte Carlo' },
      { icon: '⚡', label: 'AI Risk Driver Coach — chat-based risk analysis, any scope' },
      { icon: '🎯', label: 'AI Action Wizard — state-specific action generation' },
    ],
  },
  {
    category: 'Collaboration & access',
    items: [
      { icon: '👥', label: 'Invite team members, executives, and board members' },
      { icon: '🌐', label: 'Multi-language — any team, any language, same data' },
      { icon: '◎', label: 'Role-based access — Admin and Member roles' },
      { icon: '◈', label: 'Real-time shared canvas — one source of truth' },
      { icon: '⬡', label: 'Workshop mode — workshop feeds directly into the system' },
    ],
  },
  {
    category: 'Analysis & forecasting',
    items: [
      { icon: '📊', label: 'Forecast engine — linear, Holt-Winters, AI, Monte Carlo' },
      { icon: '⚠', label: 'Early warning system — breach detection up to 60 days ahead' },
      { icon: '◉', label: 'Goal Risk Score — geometric composite per goal' },
      { icon: '📉', label: 'Leading indicators — rate-of-change acceleration detection' },
      { icon: '🗓️', label: 'Forecast schedule import — CSV budget/plan import' },
    ],
  },
  {
    category: 'Data & integrations',
    items: [
      { icon: '📁', label: 'CSV data import — historical data points' },
      { icon: '🔗', label: 'API webhooks — push data from any external system' },
      { icon: '🔑', label: 'API key management' },
      { icon: '📤', label: 'Slack integration — state change notifications' },
    ],
  },
]

const FAQS = [
  {
    q: 'What is the only difference between Starter and Growth?',
    a: 'The number of people you can invite. Starter supports up to 5 users. Growth is unlimited. Every feature — including all AI tools, multi-language, workshop mode, and the full forecast engine — is identical across both plans.',
  },
  {
    q: 'Can I invite board members and executives?',
    a: 'Yes. You can invite anyone into the platform as an Admin or Member. Board members, executives, external stakeholders — they all see the live canvas and risk states directly. No deck preparation needed.',
  },
  {
    q: 'Can I try it before paying?',
    a: 'Yes. Every account starts with a 14-day trial — full access, all features. No credit card required. You can invite your full team immediately.',
  },
  {
    q: 'Is there a free plan?',
    a: 'No. After the trial, a subscription is required. This keeps the platform focused and properly maintained.',
  },
  {
    q: 'What happens when I need more than 5 users on Starter?',
    a: 'You can upgrade to Growth at any time from your account settings. The upgrade takes effect immediately.',
  },
  {
    q: 'Can I switch between monthly and annual billing?',
    a: 'Yes. Switch to annual billing at any time and start saving 20% immediately.',
  },
  {
    q: 'Is there an Enterprise or custom plan?',
    a: 'The Growth plan covers unlimited users and the full feature set. For questions about volume, custom onboarding, dedicated support, or compliance requirements, contact us at post@deriskmatrix.com.',
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="hero-gradient pt-32 pb-20 text-center px-6">
        <p className="text-xs font-bold text-teal uppercase tracking-widest mb-4">Pricing</p>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
          All features. Always.<br />
          <span className="gradient-text">Pay only for how many you invite.</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-xl mx-auto">
          Two plans. One difference: the number of people on your account.
          Every feature is included from day one.
        </p>
      </section>

      {/* ── Plans ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">

          {/* The one difference — callout above cards */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-teal/8 border border-teal/20 text-teal text-sm font-semibold px-5 py-2.5 rounded-full">
              ✓ All features identical · The only difference is how many people you invite
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-start mb-8">

            {/* Starter */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
              <div className="text-xs font-bold text-teal uppercase tracking-wider mb-1">Up to 5 users</div>
              <h3 className="text-2xl font-black text-navy mb-1">Starter</h3>
              <p className="text-slate-500 text-sm mb-5">
                A project team, a small leadership group, or a founding team getting structured on risk.
              </p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-5xl font-black text-navy">€39</span>
                <span className="text-slate-400 text-sm">/month</span>
              </div>
              <p className="text-slate-400 text-xs mb-1">€49/month billed monthly</p>
              <p className="text-teal text-xs font-semibold mb-6">Annual billing — save 20%</p>

              <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 mb-6">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-1">Invite up to</p>
                <p className="text-2xl font-black text-navy">5 people</p>
                <p className="text-xs text-slate-500 mt-0.5">Team members · Executives · Board observers</p>
              </div>

              <a href={`${APP_URL}/register`}
                className="block w-full py-3.5 rounded-xl font-bold text-center text-sm bg-navy hover:bg-slate-800 text-white transition-colors mb-3">
                Start 14-day trial →
              </a>
              <p className="text-center text-xs text-slate-400">No credit card required</p>
            </div>

            {/* Growth */}
            <div className="bg-navy rounded-2xl p-8 shadow-2xl shadow-navy/20">
              <div className="inline-block bg-teal text-white text-xs font-bold px-3 py-1 rounded-full mb-4">Most popular</div>
              <div className="text-xs font-bold text-teal uppercase tracking-wider mb-1">Unlimited users</div>
              <h3 className="text-2xl font-black text-white mb-1">Growth</h3>
              <p className="text-slate-300 text-sm mb-5">
                A full leadership team, departments, project teams, executives, and board members — all on one canvas.
              </p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-5xl font-black text-white">€119</span>
                <span className="text-slate-400 text-sm">/month</span>
              </div>
              <p className="text-slate-400 text-xs mb-1">€149/month billed monthly</p>
              <p className="text-teal text-xs font-semibold mb-6">Annual billing — save 20%</p>

              <div className="bg-teal/12 border border-teal/25 rounded-xl px-4 py-3 mb-6">
                <p className="text-xs font-bold text-teal uppercase tracking-wide mb-1">Invite as many as you need</p>
                <p className="text-2xl font-black text-white">Unlimited people</p>
                <p className="text-xs text-slate-400 mt-0.5">Team · Managers · Executives · Board · Stakeholders</p>
              </div>

              <a href={`${APP_URL}/register`}
                className="block w-full py-3.5 rounded-xl font-bold text-center text-sm bg-teal hover:bg-teal-dark text-white transition-colors mb-3">
                Start 14-day trial →
              </a>
              <p className="text-center text-xs text-slate-500">No credit card required</p>
            </div>
          </div>

          <p className="text-center text-sm text-slate-400">
            Need dedicated onboarding, compliance documentation, or volume pricing?{' '}
            <a href="mailto:post@deriskmatrix.com" className="text-teal font-semibold hover:underline">
              Contact us →
            </a>
          </p>
        </div>
      </section>

      {/* ── Use cases ─────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Who uses it</p>
            <h2 className="text-3xl font-black text-navy mb-3">For projects. For the entire enterprise.</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              De-Risk Matrix scales from a single project team to company-wide strategic risk management.
              The methodology is the same. The canvas grows with you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* For projects */}
            <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1.5 rounded-full mb-5 border border-blue-100">
                ◈ For projects
              </div>
              <h3 className="text-xl font-black text-navy mb-3">Project teams managing delivery risk</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">
                Define project goals with targets and thresholds — timeline, cost, quality, scope.
                Track actuals against the risk corridor. Catch drift before the deadline.
              </p>
              <div className="space-y-2.5 mb-6">
                {[
                  'Project manager + team (2–5 people)',
                  'Goals: time, cost, quality, NPS, defect rate',
                  'Risk state visible to all stakeholders',
                  'Actions tied to risk state — owned, tracked',
                  'Invite the client or board as observer',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <span className="text-teal flex-shrink-0">✓</span>{item}
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-xs font-bold text-blue-500 uppercase tracking-wide mb-1">Recommended plan</p>
                <p className="text-navy font-black">Starter — Up to 5 users · €39/month</p>
              </div>
            </div>

            {/* For enterprise */}
            <div className="bg-navy rounded-2xl p-7 shadow-sm">
              <div className="inline-flex items-center gap-2 bg-teal/15 text-teal text-xs font-bold px-3 py-1.5 rounded-full mb-5 border border-teal/25">
                ◎ For enterprise
              </div>
              <h3 className="text-xl font-black text-white mb-3">Company-wide strategic risk management</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-5">
                Enterprise goals cascade into departments and projects. Every goal, every team,
                every level — on one canvas. Leadership sees the full picture. Departments own their goals.
              </p>
              <div className="space-y-2.5 mb-6">
                {[
                  'Executive team + department managers (unlimited)',
                  'Goals: enterprise, department, project hierarchy',
                  'Board members invited — live view, no deck needed',
                  'Multi-language — global teams, one risk picture',
                  'Workshops feed directly into the live system',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <span className="text-teal flex-shrink-0">✓</span>{item}
                  </div>
                ))}
              </div>
              <div className="bg-teal/12 border border-teal/25 rounded-xl p-4">
                <p className="text-xs font-bold text-teal uppercase tracking-wide mb-1">Recommended plan</p>
                <p className="text-white font-black">Growth — Unlimited users · €119/month</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Board & Executive ─────────────────────────────────────── */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-bold text-teal uppercase tracking-widest mb-3">Board & executive</p>
              <h2 className="text-3xl font-black text-navy mb-4">
                The board package —<br />already built in.
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Invite board members, executives, and external stakeholders directly into
                De-Risk Matrix. The live canvas is the board package. No deck preparation.
                No translation to another format. Just the risk picture — live.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Every strategic goal, its current risk state, the evidence behind it, and the actions
                in progress — all visible in one view. Board members see exactly what leadership sees.
              </p>
              <div className="space-y-4">
                {[
                  {
                    icon: '◎',
                    title: 'Invite without limits',
                    desc: 'Add board members, CFO, CEO, external advisors. Growth plan has no user cap.',
                  },
                  {
                    icon: '◈',
                    title: 'Live, not retrospective',
                    desc: 'The canvas updates in real time. Board members see today\'s risk picture — not last quarter\'s.',
                  },
                  {
                    icon: '⬡',
                    title: 'No preparation needed',
                    desc: 'The platform is the executive summary. Risk states, trends, actions — in one view.',
                  },
                ].map(p => (
                  <div key={p.title} className="flex gap-3">
                    <span className="text-teal text-lg flex-shrink-0 mt-0.5">{p.icon}</span>
                    <div>
                      <div className="font-semibold text-navy text-sm mb-0.5">{p.title}</div>
                      <div className="text-slate-500 text-sm">{p.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-navy rounded-2xl p-6">
                <p className="text-xs font-bold text-teal uppercase tracking-wider mb-4">Board meeting — with De-Risk Matrix</p>
                <div className="space-y-3">
                  {[
                    ['Open the canvas', 'Every strategic goal is visible with its live risk state'],
                    ['Read the states', 'Dire goals are red. Harmonious are green. No interpretation needed.'],
                    ['Check the actions', 'What is being done about each Dire goal? Owned. Tracked. Visible.'],
                    ['Review the evidence', 'Is our confidence in these states strong or weak? Instantly readable.'],
                    ['Make decisions', 'Based on live data — not a deck someone prepared last week.'],
                  ].map(([step, desc], i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-teal/20 text-teal flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <div>
                        <div className="text-white text-sm font-semibold">{step}</div>
                        <div className="text-slate-400 text-xs mt-0.5">{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-teal/8 border border-teal/20 rounded-xl px-5 py-4 text-center">
                <p className="text-teal font-semibold text-sm">
                  &ldquo;The canvas is the board package. No deck needed.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── All features ──────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-navy mb-3">Everything included. No exceptions.</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Every user on every plan gets the full platform from day one.
              Starter and Growth differ only in how many people you can invite.
            </p>
          </div>

          <div className="space-y-8">
            {ALL_FEATURES.map(group => (
              <div key={group.category}>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">{group.category}</div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {group.items.map(f => (
                    <div key={f.label} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-slate-200">
                      <span className="text-lg flex-shrink-0">{f.icon}</span>
                      <span className="text-sm font-medium text-slate-700">{f.label}</span>
                      <span className="ml-auto text-teal text-sm flex-shrink-0">✓</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-navy rounded-2xl p-6 text-center">
            <p className="text-white font-semibold mb-1">All of the above — on every plan, for every user.</p>
            <p className="text-slate-400 text-sm">Starter: up to 5 users · Growth: unlimited users</p>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-black text-navy text-center mb-12">Common questions</h2>
          <div className="space-y-4">
            {FAQS.map(faq => (
              <div key={faq.q} className="border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-navy mb-2">{faq.q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-teal">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-white mb-3">Start your 14-day trial</h2>
          <p className="text-white/80 mb-2">All features. Invite your full team immediately. No credit card required.</p>
          <p className="text-white/60 text-sm mb-8">Upgrade, downgrade, or cancel at any time.</p>
          <a href={`${APP_URL}/register`}
            className="inline-block px-10 py-4 bg-white text-teal font-black rounded-xl hover:bg-slate-50 transition-colors text-lg shadow-lg">
            Start your trial →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
