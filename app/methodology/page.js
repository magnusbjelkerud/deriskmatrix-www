import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import Link from 'next/link'

export const metadata = {
  title: 'Methodology — De-Risk Matrix',
  description: 'Learn the De-Risk Matrix methodology: goals as spans, 6 risk states, and culture-aligned leadership practices. Aligned with ISO 31000.',
}

const STATES = [
  { label: 'Defensive', action: 'Raise', color: '#1d4e6b', bg: '#d6eaf8', position: 'Beyond target', evidence: 'Strong', action_desc: 'You\'re performing above ambition with solid evidence. Raise the target to capture more value.' },
  { label: 'Potent', action: 'Explore', color: '#148f77', bg: '#d1f2eb', position: 'Beyond target', evidence: 'Weak', action_desc: 'Exceeding target but without strong data backing. Explore whether this is real or a measurement gap.' },
  { label: 'Harmonious', action: 'Ensure', color: '#1a9e8a', bg: '#d5f5e3', position: 'On track', evidence: 'Strong', action_desc: 'On track with strong evidence. Ensure the conditions that got you here continue.' },
  { label: 'Optimistic', action: 'Prove', color: '#2ab09a', bg: '#d1f2eb', position: 'On track', evidence: 'Weak', action_desc: 'On track but without enough data. Prove this trajectory is real by increasing evidence quality.' },
  { label: 'Dire', action: 'Lower', color: '#c0392b', bg: '#fadbd8', position: 'Below threshold', evidence: 'Strong', action_desc: 'Confirmed underperformance. Lower uncertainty — take immediate, structured action.' },
  { label: 'Pessimistic', action: 'Intervene', color: '#e07070', bg: '#fde8e8', position: 'Below threshold', evidence: 'Weak', action_desc: 'Below threshold with insufficient data. Intervene to gather evidence and stabilize the goal.' },
]

const PREREQUISITES = [
  { num: '01', title: 'Goals as spans', desc: 'Every goal must have both a target value (ambition) and a threshold value (minimum acceptable). A single number is not a goal — it\'s a wish.' },
  { num: '02', title: 'ISO 31000 risk definition', desc: '"Risk is the effect of uncertainty on objectives." This forward-looking definition captures both upside and downside risk — not just what can go wrong.' },
  { num: '03', title: 'Analytical approach', desc: 'Decisions should combine forecast accuracy and evidence quality. Data-grounded decision-making is not optional — it\'s the foundation of risk state validity.' },
  { num: '04', title: 'Cultural acknowledgement', desc: 'Leadership shapes culture. Culture is the primary barrier to goal achievement. The methodology prescribes specific leadership behaviors per risk state.' },
  { num: '05', title: 'Risk state urgency', desc: 'Not all states are equal. Dire demands immediate escalation. Harmonious demands maintenance. Understanding urgency gradients is critical to effective prioritization.' },
]

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Header */}
      <div className="hero-gradient pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-block bg-white/10 text-teal-light text-xs font-semibold px-3 py-1 rounded-full mb-6 border border-white/10">
            Aligned with ISO 31000
          </div>
          <h1 className="text-5xl font-black text-white mb-4">The Methodology</h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            Goals. Risk States. Culture. Three concepts that work as a repeating cycle — making strategic risk visible, measurable, and actionable.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20 space-y-20">

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

        {/* The 5 prerequisites */}
        <section>
          <h2 className="text-3xl font-black text-navy mb-8">Five prerequisites</h2>
          <div className="space-y-4">
            {PREREQUISITES.map(p => (
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
          <h2 className="text-3xl font-black text-navy mb-4">The 6 risk states</h2>
          <p className="text-slate-600 mb-8">
            A 2×3 matrix. Y-axis: goal position (beyond target / on track / below threshold). X-axis: evidence strength (strong / weak). Every goal is always in exactly one state.
          </p>
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
          <h2 className="text-3xl font-black text-navy mb-4">The repeating process</h2>
          <p className="text-slate-600 mb-8">Four steps. Repeated each period. Each cycle builds better calibration.</p>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { n: '1', title: 'Set goal spans', desc: 'Define target + threshold for every strategic goal.' },
              { n: '2', title: 'Forecast outcomes', desc: 'Update forecasts based on current data and evidence quality.' },
              { n: '3', title: 'Read risk states', desc: 'Identify which goals are Dire, Harmonious, or Defensive.' },
              { n: '4', title: 'Act on culture', desc: 'Apply leadership behaviors and actions prescribed for each state.' },
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
          <h2 className="text-3xl font-black text-white mb-3">See it in practice</h2>
          <p className="text-slate-300 mb-7 max-w-xl mx-auto">
            The platform implements the full methodology — goal spans, risk states, cultural practices, actions, and forecasting — in a single workspace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://app.deriskmatrix.com/register" className="px-7 py-3.5 bg-teal hover:bg-teal-dark text-white font-bold rounded-xl transition-colors">
              Get started free →
            </a>
            <Link href="/score" className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors border border-white/20">
              Calculate your De-Risk Score
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
