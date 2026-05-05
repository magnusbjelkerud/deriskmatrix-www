import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Risk Culture & Leadership — De-Risk Matrix',
  description: 'Risk culture is the primary variable that determines whether a Dire goal gets fixed or stays Dire. De-Risk Matrix prescribes specific leadership behaviors for each of the 6 risk states.',
}

const APP_URL = 'https://app.deriskmatrix.com'

const CULTURAL_RESPONSES = [
  {
    label: 'Defensive',
    action: 'Raise',
    position: 'Beyond target · Strong evidence',
    color: '#1d4e6b',
    bg: '#d6eaf8',
    border: '#1d4e6b40',
    behavior: "Don't coast on success. Raise the ambition. Celebrate the result — then immediately recalibrate targets upward. Challenge complacency before it takes root.",
    value: 'Ambition',
    valueDesc: 'The Defensive state is where organizations most often fail silently. Exceeding a target feels like success — and it is. But the right cultural response is not to rest. It is to ask: how high can we actually go?',
    quote: '"Good is not good enough if we can do better."',
    signals: ['Team celebrates results but doesn\'t raise the bar', 'Leaders accept current targets without questioning them', 'No conversation about whether ambition is calibrated correctly'],
    responses: ['Set new, higher targets in the next planning cycle', 'Ask: what would it take to reach 120% of this goal?', 'Use the strong evidence base to model an ambitious but grounded new target'],
  },
  {
    label: 'Potent',
    action: 'Explore',
    position: 'Beyond target · Weak evidence',
    color: '#148f77',
    bg: '#d1f2eb',
    border: '#148f7740',
    behavior: 'Investigate before celebrating. Demand measurement clarity. Is this real performance — or a gap in how we measure? Unexplained success is a risk that hasn\'t been named yet.',
    value: 'Intellectual honesty',
    valueDesc: 'Potent is the most seductive trap. The goal is exceeding its target — great news. But the evidence is weak. This could mean the measurement is wrong, the period is an outlier, or the conditions were unusually favorable. The right cultural response is curiosity, not celebration.',
    quote: '"Great results need great explanations."',
    signals: ['Results are celebrated without understanding why they\'re good', 'Measurement methodology is not questioned', 'No one asks: could this be a fluke?'],
    responses: ['Run an evidence audit: which of the 14 factors can we confirm?', 'Ask: what would need to be true for this performance to be repeatable?', 'Increase measurement frequency to build evidence base'],
  },
  {
    label: 'Harmonious',
    action: 'Ensure',
    position: 'On track · Strong evidence',
    color: '#1a9e8a',
    bg: '#d5f5e3',
    border: '#1a9e8a40',
    behavior: 'Protect the conditions that got you here. Avoid unnecessary disruption. Maintain momentum. Stability is not complacency — it is a deliberate strategic choice.',
    value: 'Discipline',
    valueDesc: 'Harmonious is the state most organizations want to be in — and the state where most unnecessary change happens. Leaders feel compelled to act, to innovate, to disrupt. But when a goal is on track with strong evidence, the highest-value leadership action is maintenance, not transformation.',
    quote: '"Don\'t fix what isn\'t broken. Protect what works."',
    signals: ['Leadership introduces structural changes mid-cycle without cause', 'New initiatives disrupt teams that are performing well', 'No explicit decision to protect the current approach'],
    responses: ['Document what conditions are producing this performance', 'Protect team structures and processes that are working', 'Ensure resources and focus are not diverted to lower-priority goals'],
  },
  {
    label: 'Optimistic',
    action: 'Prove',
    position: 'On track · Weak evidence',
    color: '#2ab09a',
    bg: '#d1f2eb',
    border: '#2ab09a40',
    behavior: 'Challenge assumptions. Create measurement discipline. Gut feel is not evidence. Demand the data that proves this trajectory is real — before the quarter ends and it\'s too late to act.',
    value: 'Epistemic rigour',
    valueDesc: 'Optimistic is where organizations confuse confidence with knowledge. The goal appears on track — but there isn\'t sufficient evidence to be sure. This is not a comfortable state. It is a state of managed uncertainty that requires active leadership to resolve.',
    quote: '"Optimism without evidence is a risk you haven\'t measured yet."',
    signals: ['Confidence in the result based on "how things feel"', 'No systematic data collection or measurement review', 'Leaders accept projections without asking for the underlying evidence'],
    responses: ['Increase data collection frequency immediately', 'Audit the 14 evidence factors: which can be confirmed this cycle?', 'Set a decision point: if evidence isn\'t stronger by mid-period, escalate'],
  },
  {
    label: 'Dire',
    action: 'Lower',
    position: 'Below threshold · Strong evidence',
    color: '#c0392b',
    bg: '#fadbd8',
    border: '#c0392b40',
    behavior: 'Escalate immediately. Create urgency without panic. Lower uncertainty through structured, concrete action. There is no "wait and see" in a Dire state. The evidence is clear. The response must be proportional.',
    value: 'Psychological safety',
    valueDesc: 'Dire is the state that tests organizational culture most acutely. The data is unambiguous: this goal is below threshold with strong evidence. The leadership failure mode is to soften the signal, delay escalation, or hope the situation resolves itself. Psychological safety — the ability to say "we are in Dire" without career consequences — is the cultural prerequisite for this state to be managed correctly.',
    quote: '"Acknowledging Dire is not failure — staying silent is."',
    signals: ['Results are reframed or contextualized to avoid the word "Dire"', 'Escalation is delayed because "we\'ll fix it next month"', 'Leaders are not creating safety for teams to surface bad news'],
    responses: ['Name the state clearly in leadership communications', 'Create an immediate action plan with owners and deadlines', 'Establish weekly check-ins until the goal moves to a different state'],
  },
  {
    label: 'Pessimistic',
    action: 'Intervene',
    position: 'Below threshold · Weak evidence',
    color: '#e07070',
    bg: '#fde8e8',
    border: '#e0707040',
    behavior: 'Intervene even with limited information. Do not wait for certainty before acting. Prioritize evidence gathering alongside stabilization — in parallel, not sequentially.',
    value: 'Courage under uncertainty',
    valueDesc: 'Pessimistic is the most uncomfortable state for data-driven leaders. The goal is below threshold — bad — but the evidence is weak — unclear. The temptation is to wait for more data before deciding. This is the wrong response. When you don\'t know enough, the right action is to gather evidence urgently while simultaneously taking stabilizing action.',
    quote: '"When data is scarce, gather it — don\'t wait for it."',
    signals: ['"We need more data before we can act" is used as a reason for inaction', 'Interventions are deferred until evidence is stronger', 'No parallel track of evidence gathering and stabilizing action'],
    responses: ['Launch an evidence sprint: intensive data gathering over 2–4 weeks', 'Take stabilizing actions based on current best knowledge', 'Revisit the state at the end of the evidence sprint with fresh data'],
  },
]

const VALUES = [
  {
    icon: '◎',
    title: 'Psychological safety',
    desc: 'Amy Edmondson\'s research shows that teams in psychologically safe environments surface bad news earlier, escalate problems faster, and recover more effectively from setbacks. In De-Risk Matrix terms: Dire goals can only be fixed in organizations where saying "we\'re in Dire" is safe.',
    ref: 'Edmondson, A. (1999). Psychological Safety and Learning Behavior in Work Teams.',
  },
  {
    icon: '◈',
    title: 'Intellectual honesty',
    desc: 'Evidence strength is a core dimension of the De-Risk Matrix. The distinction between Harmonious and Optimistic — or Dire and Pessimistic — is entirely about the quality of knowledge. Leaders who accept weak evidence as sufficient create systematic blind spots in their risk picture.',
    ref: 'ISO 31000:2018 — Principles: Inclusive, dynamic, best available information.',
  },
  {
    icon: '⬡',
    title: 'Ambition calibration',
    desc: 'Defensive goals — exceeding target with strong evidence — are where ambition goes to die. The cultural pressure to accept success rather than raise the bar is one of the most common leadership failures in high-performing organizations.',
    ref: 'De-Risk Matrix methodology: Raise response in Defensive state.',
  },
  {
    icon: '⚡',
    title: 'Urgency without panic',
    desc: 'Dire states demand immediate action — but not chaotic action. The cultural skill is to create urgency that is proportional, structured, and directed. Leaders who confuse urgency with panic make Dire states worse, not better.',
    ref: 'ISO 31000:2018 — Risk treatment: Proportionate response to risk level.',
  },
  {
    icon: '✦',
    title: 'Epistemic discipline',
    desc: 'Optimistic goals require leaders to say: "We believe we\'re on track — but belief is not enough. We need proof." This is epistemic discipline: the organizational habit of distinguishing between what we know and what we assume.',
    ref: 'De-Risk Matrix methodology: Prove response in Optimistic state.',
  },
  {
    icon: '◉',
    title: 'Courage under uncertainty',
    desc: 'Pessimistic states demand action before certainty. Leaders in organizations with strong cultures do not wait for perfect information. They act on the best available information while simultaneously working to improve that information.',
    ref: 'ISO 31000:2018 — Risk management principles: Uncertainty is inherent.',
  },
]

export default function CulturePage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div className="hero-gradient pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block bg-teal/20 text-teal text-xs font-bold px-3 py-1.5 rounded-full mb-6 border border-teal/30">
            Risk culture &amp; leadership
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
            Culture is the risk variable<br className="hidden md:block" />
            nobody manages.
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8">
            Every risk tool tells you what the risk is. De-Risk Matrix tells you what leaders must
            do about it — specifically, per state, grounded in research.
          </p>
          <p className="text-slate-400 max-w-xl mx-auto text-base">
            A Dire goal only improves when leadership behavior changes.
            The state is the signal. Culture is the response mechanism.
          </p>
        </div>
      </div>

      {/* ── Core mechanism ────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <div>
              <h2 className="text-3xl font-black text-navy mb-4">
                The mechanism most risk frameworks ignore
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Risk dashboards show you the state. Spreadsheets track the numbers. Quarterly
                reviews discuss what happened. But none of them tell you <em>what leaders
                must do differently</em> based on where a goal sits.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                De-Risk Matrix is built on a simple but radical premise: <strong className="text-navy">every
                risk state prescribes a specific cultural response</strong>. Not a generic "improve
                performance" directive. A specific, named leadership behavior — grounded in
                ISO 31000, ISO 45003, and Edmondson's psychological safety research.
              </p>
              <p className="text-slate-600 leading-relaxed">
                The framework makes culture measurable by making it specific. Leaders
                don't need to "build a better culture." They need to respond correctly
                to the state their goals are in — today.
              </p>
            </div>
            <div className="bg-navy rounded-2xl p-7">
              <div className="text-xs font-bold text-teal uppercase tracking-wider mb-6">The causal chain</div>
              <div className="space-y-5">
                {[
                  { step: '01', label: 'Risk state', desc: 'Determined by goal position and evidence strength. Objective. Automatic. Live.' },
                  { step: '02', label: 'Leadership behavior', desc: 'Each state prescribes a specific response. Raise. Explore. Ensure. Prove. Lower. Intervene.' },
                  { step: '03', label: 'Cultural change', desc: 'Repeated correct responses build organizational habits — the culture that resilient strategy needs.' },
                  { step: '04', label: 'State improvement', desc: 'Goals move to better states. Evidence strengthens. Targets become more accurate. The cycle improves.' },
                ].map(item => (
                  <div key={item.step} className="flex gap-4">
                    <div className="w-7 h-7 rounded-full bg-teal/20 text-teal flex items-center justify-center font-black text-xs flex-shrink-0 mt-0.5">
                      {item.step}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm mb-0.5">{item.label}</div>
                      <div className="text-slate-400 text-sm leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* The insight callout */}
          <div className="bg-slate-50 border-l-4 border-teal rounded-r-2xl p-7">
            <div className="text-xs font-bold text-teal uppercase tracking-wider mb-3">The core insight</div>
            <p className="text-navy text-xl font-semibold leading-relaxed mb-2">
              &ldquo;Most organizations manage risk by describing it. De-Risk Matrix manages risk by prescribing the leadership response to it.&rdquo;
            </p>
            <p className="text-slate-500 text-sm">
              The six risk states are not just labels. They are action directives — for leaders, grounded in evidence-based practice.
            </p>
          </div>
        </div>
      </section>

      {/* ── The 6 cultural responses ──────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">State-specific leadership</p>
            <h2 className="text-3xl font-black text-navy mb-3">The six cultural responses</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Each risk state comes with a prescribed leadership behavior, an underlying cultural value,
              and the warning signals that tell you the culture is not responding correctly.
            </p>
          </div>

          <div className="space-y-6">
            {CULTURAL_RESPONSES.map(s => (
              <div key={s.label} style={{ background: s.bg, border: `1.5px solid ${s.border}`, borderRadius: 20, overflow: 'hidden' }}>
                {/* Header */}
                <div style={{ padding: '22px 28px', borderBottom: `1px solid ${s.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.label}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 20, background: s.color + '20', color: s.color }}>→ {s.action}</span>
                  </div>
                  <span style={{ fontSize: 11, color: s.color + 'aa', fontWeight: 600 }}>{s.position}</span>
                </div>

                {/* Body */}
                <div style={{ padding: '22px 28px' }}>
                  {/* Behavior */}
                  <p style={{ fontSize: 15, fontWeight: 600, color: '#1e293b', lineHeight: 1.65, marginBottom: 14 }}>
                    {s.behavior}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Value + context */}
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 800, color: s.color, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 6 }}>
                        Cultural value: {s.value}
                      </div>
                      <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.65, marginBottom: 10 }}>{s.valueDesc}</p>
                      <p style={{ fontSize: 12, color: s.color, fontStyle: 'italic' }}>{s.quote}</p>
                    </div>

                    {/* Warning signals + responses */}
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8 }}>
                        Cultural failure signals
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 14px', display: 'flex', flexDirection: 'column', gap: 5 }}>
                        {s.signals.map((sig, i) => (
                          <li key={i} style={{ fontSize: 12, color: '#64748b', display: 'flex', gap: 8 }}>
                            <span style={{ color: '#fca5a5', flexShrink: 0 }}>⚠</span>{sig}
                          </li>
                        ))}
                      </ul>
                      <div style={{ fontSize: 10, fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 8 }}>
                        Concrete leader actions
                      </div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 5 }}>
                        {s.responses.map((r, i) => (
                          <li key={i} style={{ fontSize: 12, color: '#1e293b', display: 'flex', gap: 8 }}>
                            <span style={{ color: s.color, flexShrink: 0 }}>→</span>{r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The 6 cultural values ─────────────────────────────────── */}
      <section className="py-20 bg-navy">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-teal uppercase tracking-widest mb-3">Underlying values</p>
            <h2 className="text-3xl font-black text-white mb-3">
              Six values that risk-resilient organizations share
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              The six cultural responses are grounded in six organizational values.
              De-Risk Matrix makes these values operational — not aspirational.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {VALUES.map(v => (
              <div key={v.title} className="bg-white/5 border border-white/8 rounded-2xl p-6 hover:bg-white/8 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-teal text-xl">{v.icon}</span>
                  <h3 className="text-white font-bold">{v.title}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{v.desc}</p>
                <p className="text-slate-600 text-xs italic">{v.ref}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why culture is the primary barrier ───────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-black text-navy mb-5">
                Culture is the primary barrier to goal achievement
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Strategy consultants often frame execution failure as a process problem. De-Risk
                Matrix frames it as a culture problem — specifically, a misalignment between
                what the risk state demands and how leaders actually behave.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                A goal is in Dire state. The data is unambiguous. But the leadership team softens
                the language, delays the escalation, or frames the situation as "temporary." The
                goal stays Dire — not because of external conditions, but because of internal culture.
              </p>
              <p className="text-slate-600 leading-relaxed">
                De-Risk Matrix breaks this cycle by making the required response explicit,
                named, and visible. When the state is Dire, the prescription is
                <strong className="text-navy"> Lower</strong> — lower uncertainty through
                immediate, structured action. There is no ambiguity about what is expected.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="text-xs font-bold text-red-400 uppercase tracking-wider mb-4">Without cultural alignment</div>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex gap-2"><span className="text-red-300 flex-shrink-0">✕</span>Risk state is reported — not acted on</div>
                  <div className="flex gap-2"><span className="text-red-300 flex-shrink-0">✕</span>Leaders respond to all states the same way</div>
                  <div className="flex gap-2"><span className="text-red-300 flex-shrink-0">✕</span>Dire goals stay Dire for multiple periods</div>
                  <div className="flex gap-2"><span className="text-red-300 flex-shrink-0">✕</span>Psychological safety is insufficient to escalate</div>
                  <div className="flex gap-2"><span className="text-red-300 flex-shrink-0">✕</span>Culture discussion happens at offsites, not in operations</div>
                </div>
              </div>
              <div className="bg-teal-light border border-teal/30 rounded-2xl p-6">
                <div className="text-xs font-bold text-teal uppercase tracking-wider mb-4">With De-Risk Matrix</div>
                <div className="space-y-3 text-sm text-slate-700">
                  <div className="flex gap-2"><span className="text-teal flex-shrink-0">✓</span>Each state triggers a specific leadership response</div>
                  <div className="flex gap-2"><span className="text-teal flex-shrink-0">✓</span>Dire is named clearly — and responded to proportionally</div>
                  <div className="flex gap-2"><span className="text-teal flex-shrink-0">✓</span>Cultural responses are tracked alongside risk states</div>
                  <div className="flex gap-2"><span className="text-teal flex-shrink-0">✓</span>Psychological safety is built into the framework design</div>
                  <div className="flex gap-2"><span className="text-teal flex-shrink-0">✓</span>Culture becomes operational — not aspirational</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Research grounding ────────────────────────────────────── */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Research grounding</p>
            <h2 className="text-2xl font-black text-navy mb-3">Built on evidence, not intuition</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">
              The cultural framework within De-Risk Matrix is grounded in established research and international standards.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: '◎',
                title: 'ISO 31000:2018',
                desc: 'International standard for risk management. Defines risk as "the effect of uncertainty on objectives" — the philosophical foundation of De-Risk Matrix. Principles include: value creation, integration, structured, inclusive, dynamic, best available information.',
              },
              {
                icon: '⬡',
                title: 'ISO 45003:2021',
                desc: 'International standard for psychological health and safety at work. Provides the basis for the cultural practices prescribed in high-stress risk states (Dire, Pessimistic) — structured intervention, transparent communication, leadership responsibility.',
              },
              {
                icon: '◈',
                title: 'Edmondson (1999)',
                desc: 'Amy Edmondson\'s foundational research on psychological safety in work teams. Teams in psychologically safe environments surface bad news earlier, escalate problems faster, and recover more effectively — directly applicable to Dire and Pessimistic states.',
              },
            ].map(r => (
              <div key={r.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <div className="text-teal text-xl mb-3">{r.icon}</div>
                <h3 className="font-bold text-navy mb-2 text-sm">{r.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-navy">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-white mb-3">
            See risk culture in action
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto leading-relaxed">
            De-Risk Matrix implements the full cultural framework — goal states, prescribed leadership
            responses, evidence assessment, and action tracking — in a single live workspace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <a href={`${APP_URL}/register`}
              className="px-8 py-4 bg-teal hover:bg-teal-dark text-white font-black rounded-xl transition-colors shadow-lg text-lg">
              Start your trial →
            </a>
            <Link href="/methodology"
              className="px-7 py-4 bg-white/8 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/15 transition-colors">
              Read the full methodology
            </Link>
          </div>
          <p className="text-slate-600 text-xs">14-day trial · No lock-in · All features included</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
