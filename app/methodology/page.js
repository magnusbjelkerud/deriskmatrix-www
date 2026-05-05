import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Methodology — De-Risk Matrix',
  description: 'Learn the De-Risk Matrix methodology: goals as spans, 6 risk states, and culture-aligned leadership practices. Aligned with ISO 31000.',
}

const STATES = [
  { label: 'Defensive', action: 'Raise', color: '#1d4e6b', bg: '#d6eaf8', position: 'Beyond target', evidence: 'Strong', action_desc: 'Performing above ambition with solid evidence. Raise the target — staying here breeds complacency.' },
  { label: 'Potent', action: 'Explore', color: '#148f77', bg: '#d1f2eb', position: 'Beyond target', evidence: 'Weak', action_desc: 'Exceeding target but without strong data. Explore whether this is real performance or a measurement gap.' },
  { label: 'Harmonious', action: 'Ensure', color: '#1a9e8a', bg: '#d5f5e3', position: 'On track', evidence: 'Strong', action_desc: 'On track with strong evidence. Ensure the conditions that got you here continue to hold.' },
  { label: 'Optimistic', action: 'Prove', color: '#2ab09a', bg: '#d1f2eb', position: 'On track', evidence: 'Weak', action_desc: 'On track but without enough data. Prove this trajectory is real before treating it as certain.' },
  { label: 'Dire', action: 'Lower', color: '#c0392b', bg: '#fadbd8', position: 'Below threshold', evidence: 'Strong', action_desc: 'Confirmed underperformance. Lower uncertainty — escalate immediately and take structured action.' },
  { label: 'Pessimistic', action: 'Intervene', color: '#e07070', bg: '#fde8e8', position: 'Below threshold', evidence: 'Weak', action_desc: 'Below threshold with insufficient data. Intervene now — you cannot afford to wait for better evidence.' },
]

const PRINCIPLES = [
  { num: '01', title: 'Goals must be spans, not points', desc: 'Every goal needs both a target (ambition) and a threshold (minimum acceptable). A single number is not a goal — it\'s a wish. Without the threshold, you cannot define exposure, and you cannot detect drift until it\'s too late.' },
  { num: '02', title: 'Risk is forward-looking, not historical', desc: '"Risk is the effect of uncertainty on objectives." (ISO 31000) This definition captures upside and downside — not just what went wrong, but what uncertainty is doing to your goals right now. Reporting actuals is not risk management.' },
  { num: '03', title: 'Evidence quality changes the diagnosis', desc: 'The same goal position means different things with strong vs weak evidence. Exceeding target with no data is not success — it\'s an unverified assumption. Evidence strength is what separates a real forecast from optimism.' },
  { num: '04', title: 'Culture is a strategic variable', desc: 'Leadership behavior determines whether risk is surfaced or suppressed. Every risk state prescribes specific leadership actions — because the cultural response is as important as the analytical one. Ignore this and the system breaks.' },
  { num: '05', title: 'Urgency gradients must be explicit', desc: 'Not all risk states demand the same response speed. Dire demands immediate escalation. Harmonious demands maintenance. Without explicit urgency gradients, everything becomes equally urgent — which means nothing is.' },
]

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Hero */}
      <div className="hero-gradient pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-block bg-white/10 text-teal-light text-xs font-semibold px-3 py-1 rounded-full mb-6 border border-white/10">
            Aligned with ISO 31000
          </div>
          <h1 className="text-5xl font-black text-white mb-5 leading-tight">
            Most strategic failures aren&apos;t sudden.
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed mb-4">
            They&apos;re visible weeks in advance — to anyone who knows where to look. De-Risk Matrix gives your leadership team exactly that visibility, built into how you manage goals every day.
          </p>
          <p className="text-base text-slate-400">
            Goals. Risk States. Culture. A repeating cycle that turns uncertainty into structured, actionable intelligence.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20 space-y-20">

        {/* Contrast */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-navy mb-3">What most organizations do — and why it fails</h2>
            <p className="text-slate-500 max-w-xl mx-auto">The problem isn&apos;t that leaders don&apos;t care about risk. It&apos;s that the tools they use were never designed to catch it early.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">Typical approach</div>
              <ul className="space-y-4">
                {[
                  ['Single-number targets', 'No floor means no early warning — drift is invisible until it\'s a miss.'],
                  ['Quarterly reviews', 'By the time risk appears in a report, the window to act has already closed.'],
                  ['Separate risk registers', 'Risk lives in a spreadsheet, disconnected from the goals it threatens.'],
                  ['Gut-feel escalation', 'Problems surface when someone is brave enough to raise them — not systematically.'],
                  ['Culture as afterthought', 'Leadership behavior is never linked to risk state. Silence is the default.'],
                ].map(([title, desc]) => (
                  <li key={title} className="flex items-start gap-3">
                    <span className="text-red-400 font-bold flex-shrink-0 mt-0.5">✗</span>
                    <div>
                      <div className="text-sm font-semibold text-slate-700">{title}</div>
                      <div className="text-xs text-slate-400 leading-relaxed mt-0.5">{desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-navy rounded-2xl p-7">
              <div className="text-xs font-bold text-teal uppercase tracking-widest mb-5">De-Risk Matrix</div>
              <ul className="space-y-4">
                {[
                  ['Goal spans with explicit floors', 'Threshold makes the risk appetite visible — drift is detected the moment it starts.'],
                  ['Continuous risk state per goal', 'Every goal always has a state. Leadership always knows what needs attention.'],
                  ['Risk embedded in goal management', 'No separate register. Risk is part of how every goal is tracked, every period.'],
                  ['Structured escalation by state', 'Dire triggers an escalation protocol automatically — not when someone is willing to speak up.'],
                  ['Prescribed cultural responses', 'Each risk state specifies the leadership behaviors required. Culture becomes manageable.'],
                ].map(([title, desc]) => (
                  <li key={title} className="flex items-start gap-3">
                    <span className="text-teal font-bold flex-shrink-0 mt-0.5">✓</span>
                    <div>
                      <div className="text-sm font-semibold text-white">{title}</div>
                      <div className="text-xs text-slate-400 leading-relaxed mt-0.5">{desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Core philosophy */}
        <section>
          <h2 className="text-3xl font-black text-navy mb-6">Core philosophy</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Most risk frameworks ask: <em>what could go wrong?</em> De-Risk Matrix asks: <em>what effect is uncertainty having on your specific objectives, right now?</em>
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                By anchoring risk to goals — not abstract threat lists — organizations gain immediate, context-specific visibility. Every goal always has a risk state. Every state has a recommended leadership response.
              </p>
              <p className="text-slate-600 leading-relaxed">
                This is ISO 31000 applied practically: risk as &ldquo;the effect of uncertainty on objectives,&rdquo; captured at the level where it actually matters.
              </p>
            </div>
            <div className="bg-navy rounded-2xl p-6 text-white">
              <div className="text-sm font-semibold text-teal mb-3 uppercase tracking-wider">The core insight</div>
              <blockquote className="text-lg leading-relaxed text-slate-200 italic">
                &ldquo;A target number alone tells you nothing about risk. The threshold — the minimum acceptable level — is what defines exposure. The span between them is your risk appetite, made explicit.&rdquo;
              </blockquote>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section>
          <h2 className="text-3xl font-black text-navy mb-3">Five principles most risk frameworks ignore</h2>
          <p className="text-slate-500 mb-8">These are not optional enhancements. Each one is a prerequisite for the system to work.</p>
          <div className="space-y-4">
            {PRINCIPLES.map(p => (
              <div key={p.num} className="flex gap-6 p-6 bg-slate-50 rounded-2xl">
                <div className="text-4xl font-black text-slate-200 flex-shrink-0 leading-none">{p.num}</div>
                <div>
                  <h3 className="font-bold text-navy mb-1">{p.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The 6 states */}
        <section>
          <h2 className="text-3xl font-black text-navy mb-3">The 6 risk states</h2>
          <p className="text-slate-600 mb-4">
            A 2×3 matrix. Y-axis: goal position (beyond target / on track / below threshold). X-axis: evidence strength (strong / weak). Every goal is always in exactly one state.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-8">
            <p className="text-amber-800 text-sm font-medium leading-relaxed">
              <span className="font-bold">Right now,</span> every goal in your organization is in exactly one of these states. The question is whether your leadership team knows which — and whether they know what to do about it.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {STATES.map(s => (
              <div key={s.label} style={{ background: s.bg, borderColor: s.color + '40' }} className="rounded-2xl p-5 border">
                <div className="flex items-center justify-between mb-2">
                  <span style={{ color: s.color }} className="font-black text-lg">{s.label}</span>
                  <span style={{ background: s.color + '20', color: s.color }} className="text-xs font-semibold px-2 py-1 rounded-full">→ {s.action}</span>
                </div>
                <div className="flex gap-2 mb-3">
                  <span className="text-xs bg-white/70 text-slate-500 px-2 py-0.5 rounded">{s.position}</span>
                  <span className="text-xs bg-white/70 text-slate-500 px-2 py-0.5 rounded">{s.evidence} evidence</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{s.action_desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section>
          <h2 className="text-3xl font-black text-navy mb-3">The repeating process</h2>
          <p className="text-slate-600 mb-8">Four steps. Repeated each period. Each cycle builds better calibration — and each cycle makes the next one faster and more accurate.</p>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { n: '1', title: 'Set goal spans', desc: 'Define target + threshold for every strategic goal. This makes risk appetite explicit and drift detectable.' },
              { n: '2', title: 'Forecast outcomes', desc: 'Update forecasts based on current data and evidence quality. Know where you\'re heading, not just where you\'ve been.' },
              { n: '3', title: 'Read risk states', desc: 'Every goal surfaces its state automatically. Leadership sees what\'s Dire, Harmonious, or Defensive — instantly.' },
              { n: '4', title: 'Act on culture', desc: 'Apply the leadership behaviors prescribed for each state. Culture stops being passive — it becomes a structured response.' },
            ].map(step => (
              <div key={step.n} className="bg-slate-50 rounded-2xl p-5">
                <div className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center font-bold text-sm mb-3">{step.n}</div>
                <h3 className="font-bold text-navy text-sm mb-1">{step.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-navy rounded-3xl p-10 text-center">
          <p className="text-xs font-bold text-teal uppercase tracking-widest mb-4">Ready to see it?</p>
          <h2 className="text-3xl font-black text-white mb-3">
            Find out what state your goals are in — right now.
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            The platform implements the full methodology — goal spans, risk states, cultural practices, actions, and forecasting — in a single workspace. Start in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://app.deriskmatrix.com/register" className="px-7 py-3.5 bg-teal hover:bg-teal-dark text-white font-bold rounded-xl transition-colors">
              Start your 14-day trial →
            </a>
            <Link href="/score" className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors border border-white/20">
              Calculate your De-Risk Score first
            </Link>
          </div>
          <p className="text-slate-500 text-xs mt-5">No credit card required · All features included · Cancel anytime</p>
        </section>

      </div>

      <Footer />
    </div>
  )
}
