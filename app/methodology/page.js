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
  { num: '06', title: 'Forecasts rest on assumptions — make them visible', desc: 'Behind every forecast is a set of beliefs about what must be true for a goal to succeed: market conditions, team capacity, competitor behavior. When those beliefs are invisible, managers react to symptoms rather than causes. Naming and monitoring the assumptions behind each forecast is what separates predictive risk management from reactive reporting.' },
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
          <h1 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
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
                &ldquo;A target number alone tells you nothing about risk. The threshold — the minimum acceptable level — is what defines exposure. The span between them is one operational expression of your tolerance for that particular objective.&rdquo;
              </blockquote>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section>
          <h2 className="text-3xl font-black text-navy mb-3">Six principles most risk frameworks ignore</h2>
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
            A 2×3 matrix. Y-axis: goal position (beyond target / on track / below threshold). X-axis: evidence strength (strong / weak). The two dimensions are independent and the cut-offs are defined, so every goal falls in exactly one state at any moment — a property of the construction, not a claim about how well the states predict outcomes.
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

        {/* Assumptions */}
        <section>
          <h2 className="text-3xl font-black text-navy mb-3">The missing layer: assumptions</h2>
          <p className="text-slate-600 mb-8 max-w-2xl">
            Every forecast is a set of assumptions projected forward. A revenue target of $100M is only realistic if certain conditions hold — market growth, product delivery, team capacity. When those assumptions are invisible, risk management is reactive by design. The question is never just <em>why are we off track</em> — it is <em>which assumption failed first.</em>
          </p>

          {/* Chain */}
          <div className="bg-slate-900 text-white rounded-2xl p-7 mb-10">
            <div className="text-xs font-bold text-teal-light uppercase tracking-widest mb-6">The chain most organizations miss</div>
            <div className="flex flex-wrap items-center justify-center gap-3 text-center">
              {['Forecast', 'Assumptions', 'Uncertainty', 'Decision'].map((item, i, arr) => (
                <span key={item} className="flex items-center gap-3">
                  <span className="bg-white/10 rounded-xl px-5 py-3 text-sm font-bold text-white">{item}</span>
                  {i < arr.length - 1 && <span className="text-teal font-black text-lg">→</span>}
                </span>
              ))}
            </div>
            <p className="text-slate-400 text-sm mt-6 text-center">
              Without visible assumptions, the chain breaks before the forecast is even made.
            </p>
          </div>

          {/* Status levels */}
          <h3 className="font-bold text-navy text-lg mb-2">Each assumption has a tracked status</h3>
          <p className="text-slate-500 text-sm mb-5 max-w-xl">
            Assumptions are not binary. They degrade over time — a belief that was valid in January may be uncertain by March and failed by May. De-Risk Matrix tracks each one continuously.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {[
              { status: 'Valid', color: '#16a34a', bg: '#f0fdf4', border: '#86efac', desc: 'The assumption still holds. The forecast basis is intact. No action required — continue monitoring.' },
              { status: 'Uncertain', color: '#d97706', bg: '#fffbeb', border: '#fcd34d', desc: 'The assumption is under pressure. The forecast may be optimistic. Investigate before the next review cycle.' },
              { status: 'Failed', color: '#dc2626', bg: '#fef2f2', border: '#fca5a5', desc: 'The assumption no longer holds. The forecast basis has changed. Reassess the goal\'s risk state immediately.' },
            ].map(item => (
              <div key={item.status} style={{ background: item.bg, borderColor: item.border }} className="rounded-2xl p-5 border">
                <span style={{ color: item.color, background: item.color + '18', borderColor: item.border }} className="text-xs font-bold px-2.5 py-1 rounded-full border inline-block mb-3">
                  {item.status}
                </span>
                <p style={{ color: item.color === '#16a34a' ? '#166534' : item.color === '#d97706' ? '#92400e' : '#991b1b' }} className="text-xs leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Impact */}
          <div className="bg-slate-50 rounded-2xl p-7 mb-10">
            <h3 className="font-bold text-navy text-lg mb-2">If this assumption fails — what happens to the goal?</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-5 max-w-2xl">
              When you add an assumption to a goal, you also define its impact: if this assumption fails, does it push the goal toward a worse risk state, a better one, or is the direction unclear? And how severely — on a scale of 1 to 5?
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { dir: '↓ Negative', color: '#dc2626', bg: '#fef2f2', border: '#fca5a5', desc: 'Failure undermines the forecast. The goal is likely to move toward a worse risk state — Optimistic becomes Pessimistic, Harmonious becomes Dire.' },
                { dir: '= Neutral', color: '#64748b', bg: '#f8fafc', border: '#e2e8f0', desc: 'Failure affects the context but not the direction of the goal\'s trajectory. Monitor, but no immediate re-forecast required.' },
                { dir: '↑ Positive', color: '#16a34a', bg: '#f0fdf4', border: '#86efac', desc: 'Failure is actually a positive signal. A conservative assumption proved unnecessary — the goal may outperform its original forecast.' },
              ].map(item => (
                <div key={item.dir} style={{ background: item.bg, borderColor: item.border }} className="rounded-xl p-4 border">
                  <span style={{ color: item.color }} className="text-sm font-black block mb-2">{item.dir}</span>
                  <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-slate-400 text-xs mt-5">
              Magnitude 1–5 quantifies severity. A failed assumption with Negative direction and magnitude 5 is an immediate escalation trigger — even before the data moves.
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { title: 'Assumption Register', desc: 'Each goal carries the explicit beliefs that justify its target and forecast. When conditions change, you know which goals are affected — before the numbers move.' },
              { title: 'Assumption Monitoring', desc: 'Assumptions are not set-and-forget. Status is tracked continuously — Valid, Uncertain, or Failed. A failed assumption is a leading indicator, not a lagging one.' },
              { title: 'Early Warning Logic', desc: 'Most indicators warn too late because they measure outcomes. Monitoring assumptions means you see risk before it appears in the forecast — not after.' },
            ].map(item => (
              <div key={item.title} className="bg-white border border-slate-200 rounded-2xl p-5">
                <h3 className="font-bold text-navy text-sm mb-2">{item.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* The limit of the whole architecture. Raised in external review,
              September 2026, and treated as a constraint rather than a caveat. */}
          <div className="mt-8 bg-slate-900 rounded-2xl p-7">
            <div className="text-xs font-bold text-teal uppercase tracking-widest mb-3">
              What this does not tell you
            </div>
            <p className="text-slate-200 text-lg font-semibold leading-relaxed mb-4">
              A register of valid assumptions does not mean the forecast is reliable.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              It means only that none of the assumptions you explicitly identified has yet been
              invalidated. There will always be uncertainty that was never written down as an
              assumption, a scenario, or a dependency in the first place — and that uncertainty is
              not measured here, because it cannot be.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              This is a constraint in the software, not a footnote in the documentation. The
              fragility indicator has a floor: it cannot return zero, and its best available reading
              is <span className="text-slate-200 font-semibold">no identified fragility</span> — never
              <span className="text-slate-200 font-semibold"> no fragility</span>. A system that makes
              uncertainty visible must not imply it has made uncertainty go away.
            </p>
          </div>
        </section>

        {/* What is established, and what is not.
            Raised in external review, September 2026: structural exclusivity and
            empirical validity are different claims and must not be blurred. */}
        <section>
          <h2 className="text-3xl font-black text-navy mb-3">What is established, and what is not</h2>
          <p className="text-slate-500 mb-8 max-w-2xl">
            The six-state model makes two very different claims. We keep them apart deliberately,
            because conflating them would overstate what we know.
          </p>

          <div className="space-y-4">
            <div className="flex gap-5 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl">
              <div className="text-2xl flex-shrink-0 leading-none">✓</div>
              <div>
                <h3 className="font-bold text-navy mb-1">Structurally mutually exclusive — established</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  The 2×3 grid is built from two independent dimensions with defined cut-offs, so every
                  goal falls in exactly one state at any moment. This follows from the construction.
                </p>
              </div>
            </div>

            <div className="flex gap-5 p-6 bg-amber-50 border border-amber-200 rounded-2xl">
              <div className="text-2xl flex-shrink-0 leading-none">?</div>
              <div>
                <h3 className="font-bold text-navy mb-1">Not yet empirically validated — open</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Whether the six states discriminate between later outcomes — whether goals in Dire
                  really do end below threshold more often than goals in Optimistic — has not been
                  demonstrated with data. The platform now records a persistent state history precisely
                  so this becomes testable. We would rather publish the open question than imply it
                  is closed.
                </p>
              </div>
            </div>

            <div className="flex gap-5 p-6 bg-sky-50 border border-sky-200 rounded-2xl">
              <div className="text-2xl flex-shrink-0 leading-none">◈</div>
              <div>
                <h3 className="font-bold text-navy mb-1">A decision-framing device with a testable structure</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  The states are intended to help a team decide what to do, not to predict outcomes.
                  A model can be predictively modest and still change decisions for the better. Both
                  propositions are worth testing, and they require different evidence.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 border-l-4 border-slate-200 pl-5">
            <p className="text-slate-500 text-sm italic leading-relaxed">
              An open question we have put to ourselves: does a six-state model perform materially
              better than a simpler three- or two-state model built on the same variables? Complexity
              should earn its place, and we have committed to reporting the answer either way.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 items-start">
            <Link href="/validation" className="px-6 py-3 bg-navy hover:bg-slate-800 text-white font-bold rounded-xl transition-colors text-sm">
              Read the pre-registered validation protocol →
            </Link>
            <p className="text-slate-500 text-xs leading-relaxed sm:pt-3 sm:max-w-sm">
              Written and published before any results were examined, including the conditions under
              which we would consider the model refuted.
            </p>
          </div>
        </section>

        {/* Provenance — three different kinds of authority, not one voice */}
        <section>
          <h2 className="text-3xl font-black text-navy mb-3">Where these claims come from</h2>
          <p className="text-slate-500 mb-8 max-w-2xl">
            De-Risk Matrix draws on three different kinds of authority. They are not equally
            established, so we label them separately rather than presenting them in one voice.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                tag: 'ISO 31000',
                cls: 'bg-blue-50 border-blue-200 text-blue-700',
                desc: 'Aligned with ISO 31000:2018, the international guideline for risk management. Where you see this, the concept follows the standard’s definitions — including risk as "the effect of uncertainty on objectives".',
              },
              {
                tag: 'Research',
                cls: 'bg-violet-50 border-violet-200 text-violet-700',
                desc: 'Grounded in published work by others — Edmondson on psychological safety, Cyert & March on aspiration levels, Kahneman & Tversky on framing. The cited research supports the underlying concept; it does not by itself validate how we apply it.',
              },
              {
                tag: 'De-Risk',
                cls: 'bg-amber-50 border-amber-200 text-amber-700',
                desc: 'Our own proposed practice — the six states, the state-to-leadership-behaviour mapping, the assumption impact scale. Offered because we believe it is useful and because it can be tested, not because it has been validated. Treat it as a hypothesis you are entitled to challenge.',
              },
            ].map(p => (
              <div key={p.tag} className={`rounded-2xl p-6 border ${p.cls.split(' ').slice(0,2).join(' ')}`}>
                <div className={`inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded border mb-4 ${p.cls}`}>
                  {p.tag}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mt-6 max-w-2xl">
            One distinction worth stating plainly: Amy Edmondson&apos;s research supports the importance
            of psychological safety. It does not validate our mapping from six risk states to six
            leadership responses. That mapping is ours, and it becomes a validation target itself
            once enough state history exists.
          </p>
        </section>

        {/* CTA */}
        <section className="bg-navy rounded-3xl p-10 text-center">
          <p className="text-xs font-bold text-teal uppercase tracking-widest mb-4">Ready to see it?</p>
          <h2 className="text-3xl font-black text-white mb-3">
            Find out what state your goals are in — right now.
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            The platform implements the full methodology — goal spans, risk states, cultural practices, actions, forecasting, and assumption monitoring — in a single workspace. Start in minutes.
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
