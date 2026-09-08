import Link from 'next/link'

/**
 * External review attribution.
 *
 * The reviewer accepted being named as Critical External Reviewer on condition that
 * the wording makes clear he has reviewed and challenged the methodology — including
 * its alignment with ISO 31000 principles — and that this is not endorsement,
 * certification, or empirical validation.
 *
 * Two rules are enforced by this file existing at all:
 *
 *   1. The name and the qualification are one component. There is no way to render
 *      the name without the caveat, because a name quoted away from its caveat is
 *      exactly the failure mode he was guarding against.
 *   2. Nothing renders until `REVIEWER` is filled in. He approved a role, not a
 *      sentence. Publishing an inferred name or affiliation would be a small version
 *      of the overclaiming two rounds of review have been spent removing.
 *
 * There is a third hazard specific to this reviewer. His organisation issues ISO 31000
 * certification, and this site's methodology page carries an "Aligned with ISO 31000"
 * badge. Naming him near that badge reads as certification however carefully the
 * sentence is worded, so `certifyingBody` renders an explicit denial next to the name,
 * and the section is mounted in the lower half of the page rather than beside the hero.
 *
 * To publish: fill in REVIEWER with what he has approved in writing, and only that.
 * If he asks for it to change or come down, change it here and it changes everywhere.
 */
export const REVIEWER = null
// export const REVIEWER = {
//   name: '',
//   affiliation: '',      // optional; only what he states himself
//   certifyingBody: '',   // set if his organisation issues ISO 31000 certification —
//                         // renders an explicit denial that this review is one
// }

export function hasReviewer() {
  return !!(REVIEWER && REVIEWER.name)
}

function reviewerLabel() {
  if (!hasReviewer()) return null
  return REVIEWER.affiliation ? `${REVIEWER.name}, ${REVIEWER.affiliation}` : REVIEWER.name
}

/** Full section — methodology page. */
export default function ExternalReview() {
  if (!hasReviewer()) return null

  return (
    <section>
      <h2 className="text-3xl font-black text-navy mb-3">External review</h2>
      <div className="bg-slate-50 rounded-2xl p-7">
        <p className="text-slate-600 leading-relaxed mb-4">
          The De-Risk Matrix methodology has been reviewed and challenged by{' '}
          <strong className="text-navy">{reviewerLabel()}</strong>, in the role of{' '}
          <strong className="text-navy">Critical External Reviewer</strong>, including its
          alignment with ISO 31000 principles.
        </p>
        <p className="text-slate-600 leading-relaxed mb-4">
          That review is critical in the literal sense: it identified weaknesses, and
          several of them changed the methodology. Assumption management, early-warning
          logic, the separation of decision response from decision quality, and the
          constraint that the software may never report <em>no fragility</em> rather than{' '}
          <em>no identified fragility</em> all originate in that challenge.
        </p>
        <div className="border-l-4 border-slate-300 pl-5">
          <p className="text-slate-500 text-sm leading-relaxed">
            <strong className="text-navy">What this does not mean.</strong> It is not an
            endorsement of De-Risk Matrix, not a certification, and not an empirical
            validation of the six-state model. The reviewer has tested our reasoning, not
            our results. Whether the six states discriminate between outcomes remains an
            open question, and the{' '}
            <Link href="/validation" className="text-teal font-semibold hover:underline">
              validation protocol
            </Link>{' '}
            is the instrument by which we intend to answer it.
          </p>
          {REVIEWER && REVIEWER.certifyingBody && (
            <p className="text-slate-500 text-sm leading-relaxed mt-3">
              {REVIEWER.certifyingBody} provides ISO 31000 training and certification. This
              review is neither, and De-Risk Matrix holds no ISO 31000 certification.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

/** Short form — for the about and validation pages. */
export function ExternalReviewNote({ className = '' }) {
  if (!hasReviewer()) return null

  return (
    <p className={`text-slate-500 text-sm leading-relaxed ${className}`}>
      Methodology reviewed and challenged by {reviewerLabel()}, Critical External Reviewer,
      including alignment with ISO 31000 principles. Not an endorsement, certification or
      empirical validation.{' '}
      <Link href="/validation" className="text-teal font-semibold hover:underline">
        What that means →
      </Link>
    </p>
  )
}
