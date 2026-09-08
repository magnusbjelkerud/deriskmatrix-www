import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import Link from 'next/link'
import { ExternalReviewNote } from '../../components/ExternalReview'

export const metadata = {
  title: 'Validation protocol — De-Risk Matrix',
  description: 'The pre-registered protocol for testing whether the six risk states discriminate between outcomes. Published before results were examined.',
}

const UPDATED = '8 September 2026'
const VERSION = '1.0'

const PROPOSITIONS = [
  {
    key: 'A',
    title: 'Structural validity',
    q: 'Are the six states logically coherent, mutually exclusive, and capable of classifying the situations the methodology intends to classify?',
    evidence: 'Follows from the construction. Established.',
    tone: 'emerald',
  },
  {
    key: 'B',
    title: 'Empirical validity',
    q: 'Do the states meaningfully discriminate between subsequent outcomes or transitions?',
    evidence: 'Requires outcome data over time. Not yet demonstrated.',
    tone: 'amber',
  },
  {
    key: 'C',
    title: 'Decision usefulness',
    q: 'Does distinguishing Optimistic from Dire lead decision-makers to materially better decisions than a simpler classification would?',
    evidence: 'Requires decision and intervention data. Not yet demonstrated.',
    tone: 'sky',
  },
]

const TESTS = [
  {
    n: '1',
    title: 'Calibration and outcome discrimination',
    q: 'Of goals classified Dire at time T, what proportion ended below threshold at the end of their period? Of goals classified Optimistic?',
    method: 'For each goal-period with at least one observation, take the state at a fixed fraction of the period elapsed and the realised outcome at period end. Report the outcome distribution per state with confidence intervals.',
    falsify: 'If the states do not separate outcomes, the model is wrong on proposition B. That result gets published.',
  },
  {
    n: '2',
    title: 'Transition structure',
    q: 'Which states flow into which, and at what rates?',
    method: 'Build the transition matrix from recorded history, excluding transitions caused by definition changes — moving a target moves the state without anything happening in the world.',
    falsify: 'If two states have statistically indistinguishable transition profiles and indistinguishable outcome distributions, they are not two states.',
  },
  {
    n: '3',
    title: 'Classification reliability',
    q: 'How consistently do different people classify evidence?',
    method: 'Evidence is the one genuinely subjective axis — it can be set manually, derived from a 14-factor checklist, or left to the automatic rule. Compare manual overrides against what the checklist and the automatic rule would have produced on the same data.',
    falsify: 'Separates variance in the model from variance in the observer. A team that consistently overrides upward is telling you about its own optimism, not its data.',
  },
  {
    n: '4',
    title: 'Decision impact',
    q: 'Did the classification actually change a decision, escalation, resource allocation or intervention — and compared with what would otherwise have happened?',
    method: 'Link state changes to decisions and actions created within a defined window afterwards. Report the rate of response per state, and whether responses match the state’s prescribed action.',
    falsify: 'Observational. It can show association between classification and response; it cannot by itself establish causation, nor that the response improved the outcome.',
  },
  {
    n: '5',
    title: 'Incremental explanatory value',
    q: 'Does the six-state structure carry information beyond the variables it was derived from — and does it beat a simpler three- or two-state model built on those same variables?',
    method: 'Compare predictive performance of the six-state label, a three-state position-only model, a two-state model, and the raw underlying variables. Report the increment, not just the absolute performance of the six-state model.',
    falsify: 'Complexity should earn its place. If two states predict as well as six, the extra four must justify themselves on decision usefulness alone — and be described that way.',
  },
]

const TONE = {
  emerald: 'bg-emerald-50 border-emerald-200',
  amber: 'bg-amber-50 border-amber-200',
  sky: 'bg-sky-50 border-sky-200',
}

export default function ValidationPage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      <div className="bg-slate-50 pt-32 pb-12 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <div className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full mb-5 border border-amber-200">
            Pre-registered · Version {VERSION} · {UPDATED}
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-navy mb-5 leading-tight">
            How the six risk states can be shown to be wrong
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            This protocol was written and published before any results were examined, so that
            what counts as satisfactory evidence was not decided afterwards by looking at what
            the data happened to support.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* Why */}
        <section>
          <h2 className="text-2xl font-black text-navy mb-4">Why this document exists</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            The six-state model makes two claims that are easy to blur and must not be. The first
            is structural: the 2×3 grid is built from two independent dimensions with defined
            cut-offs, so every goal falls in exactly one state at any moment. That follows from the
            construction, and it is established.
          </p>
          <p className="text-slate-600 leading-relaxed mb-4">
            The second is empirical: that the states meaningfully discriminate between later
            outcomes. That has <strong className="text-navy">not</strong> been demonstrated, and it
            cannot be settled by argument. It needs data that did not exist, because risk state was
            computed on read and never stored.
          </p>
          <p className="text-slate-600 leading-relaxed">
            The distinction was raised in an external review of the methodology in June 2026 and
            remained the largest open point in September 2026. Rather than argue the question, we
            built the instrument that can answer it — and published the conditions first.
          </p>
        </section>

        {/* What is being claimed */}
        <section>
          <h2 className="text-2xl font-black text-navy mb-3">What is being claimed</h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            De-Risk Matrix positions the six states as a <strong className="text-navy">decision-framing
            device with an empirically testable structure</strong>, not as a predictive classifier.
            A model can be predictively modest and still decision-relevant. These are three different
            propositions requiring three different kinds of evidence, and we report them separately —
            neither is used to argue the other.
          </p>
          <div className="space-y-4">
            {PROPOSITIONS.map(p => (
              <div key={p.key} className={`rounded-2xl p-6 border ${TONE[p.tone]}`}>
                <div className="flex gap-4">
                  <div className="text-2xl font-black text-slate-300 flex-shrink-0 leading-none">{p.key}</div>
                  <div>
                    <h3 className="font-bold text-navy mb-1">{p.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-2">{p.q}</p>
                    <p className="text-slate-500 text-xs font-semibold">{p.evidence}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Data */}
        <section>
          <h2 className="text-2xl font-black text-navy mb-4">The data</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Every observation records the state <em>and the inputs it was derived from</em>: the
            forecast and its band, the target and threshold in force at the time, the evidence
            strength and how it resolved, the data point count, the assumption counts, priority and
            period end.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Storing the inputs rather than only the conclusion is what makes test 5 possible at all.
            A stored label can never be compared against a simpler model built on the same variables.
            Observations are written by every action that can change a state, and by a nightly job —
            history cannot depend on someone happening to log a value.
          </p>
        </section>

        {/* The five tests */}
        <section>
          <h2 className="text-2xl font-black text-navy mb-3">The five tests</h2>
          <p className="text-slate-500 mb-8">
            A protocol that cannot fail is not a protocol. Each test states its own falsification
            condition.
          </p>
          <div className="space-y-5">
            {TESTS.map(t => (
              <div key={t.n} className="bg-slate-50 rounded-2xl p-6">
                <div className="flex gap-5">
                  <div className="text-3xl font-black text-slate-200 flex-shrink-0 leading-none">{t.n}</div>
                  <div>
                    <h3 className="font-bold text-navy mb-2">{t.title}</h3>
                    <p className="text-slate-700 text-sm leading-relaxed mb-3 font-medium">{t.q}</p>
                    <p className="text-slate-600 text-sm leading-relaxed mb-3">{t.method}</p>
                    <p className="text-slate-500 text-xs leading-relaxed border-l-2 border-slate-300 pl-3">
                      {t.falsify}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Horizon and sample size */}
        <section>
          <h2 className="text-2xl font-black text-navy mb-4">Horizon, sample size, and pooling</h2>

          <h3 className="font-bold text-navy mb-2">Horizon</h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            No single evaluation period is imposed. Three months may be meaningful for an operational
            objective and close to meaningless for a three-year strategic one. The horizon is defined
            relative to each objective&apos;s own cycle, and results are reported per frequency band
            before any pooling.
          </p>

          <h3 className="font-bold text-navy mb-2">Sample size</h3>
          <p className="text-slate-600 leading-relaxed mb-3">
            Deliberately not fixed in advance as a single number. The required n depends on
            observation frequency, the distribution across states, the number of organisations, the
            independence of observations, and which outcome is being tested — none of which are known
            yet. The stopping rule is structural instead:
          </p>
          <ul className="space-y-2 mb-6">
            {[
              'Each test reports its own achieved precision — confidence intervals, not point estimates.',
              'No test is reported as supporting or refuting the model while any state cell holds fewer than 30 goal-periods. Below that, the cell reads insufficient data.',
              'Analysis runs at pre-declared intervals, not whenever results look interesting.',
            ].map((li, i) => (
              <li key={i} className="flex gap-3 text-slate-600 text-sm leading-relaxed">
                <span className="text-teal flex-shrink-0">—</span>{li}
              </li>
            ))}
          </ul>

          <h3 className="font-bold text-navy mb-2">Organisation-level versus pooled</h3>
          <p className="text-slate-600 leading-relaxed">
            Kept separate and reported separately. A model that works well for one type of objective
            or organisation could otherwise conceal weak performance elsewhere behind a healthy
            pooled average. Pooled analysis also requires a lawful basis under GDPR, disclosure in the
            privacy policy, and coverage in the DPA including sub-processors — it is not run before
            that is in place.
          </p>
        </section>

        {/* What this does not test */}
        <section>
          <div className="bg-slate-900 rounded-3xl p-8">
            <h2 className="text-2xl font-black text-white mb-4">What this protocol does not test</h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              Stated explicitly, because the omission matters more than the inclusions.
            </p>
            <p className="text-slate-400 leading-relaxed mb-5">
              The architecture records assumptions, dependencies, scenarios and reconsideration
              triggers — that is, it represents what management knows it does not know. There will
              always be uncertainty that was never represented as an assumption, scenario or
              dependency in the first place.
            </p>
            <div className="border-l-4 border-red-400 pl-5 mb-5">
              <p className="text-slate-500 text-sm mb-1">No result here can support the claim:</p>
              <p className="text-slate-200 text-lg font-semibold leading-relaxed">
                If all assumptions remain valid, the forecast is reliable.
              </p>
            </div>
            <div className="border-l-4 border-teal pl-5 mb-5">
              <p className="text-slate-500 text-sm mb-1">The most any of it can support is:</p>
              <p className="text-slate-200 text-lg font-semibold leading-relaxed">
                None of the assumptions we explicitly identified has yet been invalidated.
              </p>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              This is why the fragility indicator in the product has a floor above zero and reports
              <em> no identified fragility</em> rather than <em>no fragility</em>. It is a constraint
              on the architecture, not a caveat on the wording.
            </p>
          </div>
        </section>

        {/* Provenance */}
        <section>
          <h2 className="text-2xl font-black text-navy mb-4">Provenance</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Claims in the methodology are labelled as one of three kinds, and this protocol tests
            only the third: alignment with <strong className="text-navy">ISO 31000</strong>;
            <strong className="text-navy"> external research</strong> by others, which supports
            underlying concepts but does not validate our application of them; and
            <strong className="text-navy"> De-Risk&apos;s own proposed practice</strong> — the six
            states, the state-to-leadership-behaviour mapping, the assumption impact scale and the
            fragility indicator, all of which are validation targets rather than established findings.
          </p>
          <ExternalReviewNote className="mb-4" />
          <Link href="/methodology" className="text-teal font-semibold text-sm hover:underline">
            See the full methodology →
          </Link>
        </section>

        {/* Changelog */}
        <section>
          <h2 className="text-2xl font-black text-navy mb-4">Changelog</h2>
          <p className="text-slate-500 text-sm leading-relaxed mb-4">
            Any change to this protocol after data collection began is recorded here, with a date and
            a reason.
          </p>
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left font-bold text-navy px-5 py-3">Date</th>
                  <th className="text-left font-bold text-navy px-5 py-3">Change</th>
                  <th className="text-left font-bold text-navy px-5 py-3">Reason</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-200">
                  <td className="px-5 py-3 text-slate-600">2026-09-08</td>
                  <td className="px-5 py-3 text-slate-600">Protocol v1.0 pre-registered</td>
                  <td className="px-5 py-3 text-slate-500">Before any state-history data was examined</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  )
}
