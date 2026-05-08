import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Pricing — De-Risk Matrix',
  description: 'Three plans. All features included. The only difference is how many people you invite. From €19/month. 14-day trial, no credit card required.',
}

const APP_URL = 'https://app.deriskmatrix.com'

const PLANS = [
  {
    name: 'Mini',
    users: 'Up to 3 users',
    usersNote: 'Founder · Solo operator · Small team',
    annual: '€19',
    monthly: '€24',
    monthlyNote: '€24/month billed monthly',
    highlight: false,
    tag: null,
    desc: 'For founders, solo operators, and very small teams who want a live risk picture from day one.',
    recommended: 'For projects',
    recommendedColor: 'bg-blue-50 border-blue-100 text-blue-600',
  },
  {
    name: 'Starter',
    users: 'Up to 5 users',
    usersNote: 'Team members · Executives · Board observers',
    annual: '€39',
    monthly: '€49',
    monthlyNote: '€49/month billed monthly',
    highlight: false,
    tag: null,
    desc: 'A project team, a small leadership group, or a founding team getting structured on risk.',
    recommended: 'For small teams',
    recommendedColor: 'bg-blue-50 border-blue-100 text-blue-600',
  },
  {
    name: 'Growth',
    users: 'Up to 10 users',
    usersNote: 'Team · Managers · Executives · Board · Stakeholders',
    annual: '€119',
    monthly: '€149',
    monthlyNote: '€149/month billed monthly',
    highlight: true,
    tag: 'Most popular',
    desc: 'Full leadership team, departments, and board members — all on one live risk canvas.',
    recommended: 'For leadership teams',
    recommendedColor: 'bg-teal/10 border-teal/20 text-teal',
  },
]

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
    q: 'What is the difference between Mini, Starter, and Growth?',
    a: 'The number of people you can invite. Mini supports up to 3 users, Starter up to 5, Growth up to 10. Every feature — including all AI tools, multi-language, workshop mode, and the full forecast engine — is identical across all three plans.',
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
    q: 'What happens when I need more than 10 users?',
    a: 'Contact us at post@deriskmatrix.com. We offer custom plans for larger organizations and enterprise deployments.',
  },
  {
    q: 'Can I switch between plans?',
    a: 'Yes — upgrade or downgrade at any time from your account settings. Changes take effect immediately.',
  },
  {
    q: 'Can I switch between monthly and annual billing?',
    a: 'Yes. Switch to annual billing at any time and start saving 20% immediately.',
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
          <span className="gradient-text">From €19 per month.</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-xl mx-auto">
          Three plans. One difference: how many people you invite.
          Every feature is included from day one.
        </p>
      </section>

      {/* ── Alternative cost framing ──────────────────────────────── */}
      <section className="bg-slate-900 border-b border-slate-800 py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center mb-6">What&apos;s your alternative?</p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                label: 'Risk consultant — half-day workshop',
                cost: '€2,000–5,000',
                note: 'Once. Then it goes in a drawer.',
                bad: true,
              },
              {
                label: 'Quarterly review cycle (×4/year)',
                cost: '€8,000–20,000/year',
                note: 'Backward-looking. Already a crisis by then.',
                bad: true,
              },
              {
                label: 'De-Risk Matrix Growth',
                cost: 'From €19/month',
                note: 'Continuous. Live. Updated with every data point.',
                bad: false,
              },
            ].map(item => (
              <div key={item.label}
                className={`rounded-xl px-5 py-4 border ${item.bad ? 'bg-white/3 border-white/8' : 'bg-teal/10 border-teal/25'}`}>
                <div className={`text-xs font-semibold mb-2 ${item.bad ? 'text-slate-400' : 'text-teal'}`}>
                  {item.bad ? '✕' : '✓'} {item.label}
                </div>
                <div className={`text-xl font-black mb-1 ${item.bad ? 'text-slate-300' : 'text-white'}`}>
                  {item.cost}
                </div>
                <div className={`text-xs ${item.bad ? 'text-slate-500' : 'text-teal/80'}`}>{item.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Plans ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">

          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-teal/8 border border-teal/20 text-teal text-sm font-semibold px-5 py-2.5 rounded-full">
              ✓ All features identical · The only difference is how many people you invite
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5 items-start mb-8">
            {PLANS.map(plan => (
              <div key={plan.name}
                className={`rounded-2xl p-7 ${plan.highlight ? 'bg-navy shadow-2xl shadow-navy/20' : 'bg-slate-50 border border-slate-200'}`}>
                {plan.tag && (
                  <div className="inline-block bg-teal text-white text-xs font-bold px-3 py-1 rounded-full mb-4">{plan.tag}</div>
                )}
                <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${plan.highlight ? 'text-teal' : 'text-slate-400'}`}>
                  {plan.users}
                </div>
                <h3 className={`text-2xl font-black mb-2 ${plan.highlight ? 'text-white' : 'text-navy'}`}>{plan.name}</h3>
                <p className={`text-sm mb-5 leading-relaxed ${plan.highlight ? 'text-slate-300' : 'text-slate-500'}`}>
                  {plan.desc}
                </p>

                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-4xl font-black ${plan.highlight ? 'text-white' : 'text-navy'}`}>{plan.annual}</span>
                  <span className="text-slate-400 text-sm">/month</span>
                </div>
                <p className={`text-xs mb-1 ${plan.highlight ? 'text-slate-400' : 'text-slate-400'}`}>{plan.monthlyNote}</p>
                <p className="text-teal text-xs font-semibold mb-5">Annual billing — save 20%</p>

                <div className={`rounded-xl px-4 py-3 mb-6 ${plan.highlight ? 'bg-teal/12 border border-teal/25' : 'bg-blue-50 border border-blue-100'}`}>
                  <p className={`text-xs font-bold uppercase tracking-wide mb-1 ${plan.highlight ? 'text-teal' : 'text-blue-500'}`}>
                    Invite up to
                  </p>
                  <p className={`text-xl font-black ${plan.highlight ? 'text-white' : 'text-navy'}`}>{plan.users.replace('Up to ', '')}</p>
                  <p className={`text-xs mt-0.5 ${plan.highlight ? 'text-slate-400' : 'text-slate-500'}`}>{plan.usersNote}</p>
                </div>

                <a href={`${APP_URL}/register`}
                  className={`block w-full py-3 rounded-xl font-bold text-center text-sm transition-colors mb-2 ${
                    plan.highlight
                      ? 'bg-teal hover:bg-teal-dark text-white'
                      : 'bg-navy hover:bg-slate-800 text-white'
                  }`}>
                  Start 14-day trial →
                </a>
                <p className={`text-center text-xs ${plan.highlight ? 'text-slate-500' : 'text-slate-400'}`}>
                  No credit card required
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-slate-400 mb-1">Need more than 10 users, dedicated onboarding, or compliance documentation?</p>
            <a href="mailto:post@deriskmatrix.com" className="text-sm text-teal font-semibold hover:underline">
              Contact us for custom plans →
            </a>
          </div>
        </div>
      </section>

      {/* ── Use cases ─────────────────────────────────────────────── */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Who uses it</p>
            <h2 className="text-3xl font-black text-navy mb-3">For projects. For the entire leadership team.</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              De-Risk Matrix scales from a solo founder to a full leadership team.
              The methodology is the same. The canvas grows with you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1.5 rounded-full mb-5 border border-blue-100">
                ◈ Mini or Starter
              </div>
              <h3 className="text-xl font-black text-navy mb-3">Solo operators and small project teams</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">
                Define goals with targets and thresholds. Track actuals. Catch drift before it becomes a crisis.
                Works for a single founder or a project team of 3–5.
              </p>
              <div className="space-y-2.5 mb-6">
                {[
                  'Founder, solo operator, or project manager',
                  'Goals: revenue, cost, quality, timeline, NPS',
                  'Risk state visible — always current',
                  'Actions tied to risk state — owned and tracked',
                  'Invite an advisor or board observer',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <span className="text-teal flex-shrink-0">✓</span>{item}
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <p className="text-xs font-bold text-blue-500 uppercase tracking-wide mb-1">Recommended plan</p>
                <p className="text-navy font-black">Mini — Up to 3 users · €19/month</p>
              </div>
            </div>

            <div className="bg-navy rounded-2xl p-7 shadow-sm">
              <div className="inline-flex items-center gap-2 bg-teal/15 text-teal text-xs font-bold px-3 py-1.5 rounded-full mb-5 border border-teal/25">
                ◎ Growth
              </div>
              <h3 className="text-xl font-black text-white mb-3">Full leadership team and company strategy</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-5">
                Enterprise goals cascade into departments and projects. Every goal, every team,
                every level — on one canvas. Leadership sees the full picture. Departments own their goals.
              </p>
              <div className="space-y-2.5 mb-6">
                {[
                  'CEO + leadership team + department managers',
                  'Goals: enterprise, department, and project hierarchy',
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
                <p className="text-white font-black">Growth — Up to 10 users · €119/month</p>
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
                    title: 'Invite without seat anxiety',
                    desc: 'Up to 10 people on Growth. Board members, CFO, CEO, advisors — all on one canvas.',
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
              Mini, Starter, and Growth differ only in how many people you can invite.
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
            <p className="text-slate-400 text-sm">Mini: 3 users · Starter: 5 users · Growth: 10 users</p>
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
