import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ObfuscatedEmail from '../../components/ObfuscatedEmail'

export const metadata = {
  title: 'Data Processing Agreement — De-Risk Matrix',
  description: 'GDPR Article 28 Data Processing Agreement between De-Risk Matrix and its customers.',
}

const PROCESSOR  = 'Magnus Bjelkerud (De-Risk Matrix)'
const UPDATED    = 'April 2026'

const SUB_PROCESSORS = [
  { name: 'Supabase Inc.', purpose: 'Database and authentication infrastructure', location: 'EU (Frankfurt, Germany)', cert: 'SOC 2 Type II' },
  { name: 'Anthropic, PBC', purpose: 'AI-powered features (goal generation, company analysis)', location: 'USA', cert: 'Enterprise DPA available' },
  { name: 'Stripe, Inc.', purpose: 'Payment processing', location: 'USA / EU', cert: 'PCI DSS Level 1' },
  { name: 'Cloudflare, Inc.', purpose: 'Bot protection (Turnstile) and CDN', location: 'EU / USA', cert: 'ISO 27001, SOC 2' },
]

export default function DPAPage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      <div className="bg-slate-50 pt-32 pb-12 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs font-bold text-teal uppercase tracking-widest mb-2">Legal</p>
          <h1 className="text-4xl font-black text-navy mb-2">Data Processing Agreement</h1>
          <p className="text-slate-500 text-sm">Last updated: {UPDATED} · GDPR Article 28</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16 space-y-10 text-slate-600 leading-relaxed">

        <section>
          <p>
            This Data Processing Agreement ("DPA") forms part of the Terms of Service between{' '}
            <strong>{PROCESSOR}</strong>, Norway ("Processor") and the organisation using the
            De-Risk Matrix platform ("Controller"). It governs the processing of personal data
            carried out by the Processor on behalf of the Controller, in accordance with
            Article 28 of the General Data Protection Regulation (GDPR) (EU) 2016/679.
          </p>
          <p className="mt-3">
            By accepting the Terms of Service, the Controller also accepts this DPA.
            If you require a countersigned copy, contact{' '}
            <a href="mailto:post@deriskmatrix.com" className="text-teal underline">post@deriskmatrix.com</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">1. Definitions</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>"Personal Data"</strong> — any information relating to an identified or identifiable natural person entered into the Service by the Controller.</li>
            <li><strong>"Processing"</strong> — any operation performed on Personal Data, including storage, retrieval, use, and deletion.</li>
            <li><strong>"Data Subject"</strong> — the natural person to whom Personal Data relates (e.g. employees whose HR metrics are tracked).</li>
            <li><strong>"Sub-processor"</strong> — a third party engaged by the Processor to process Personal Data.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">2. Subject matter and nature of processing</h2>
          <p>The Processor provides a SaaS platform for strategic goal and risk management. Processing involves:</p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li><strong>Nature:</strong> Storage, display, retrieval, and deletion of data entered by the Controller and its authorised users.</li>
            <li><strong>Purpose:</strong> Solely to operate and deliver the De-Risk Matrix platform to the Controller.</li>
            <li><strong>Duration:</strong> For the duration of the Controller's subscription, plus any retention period specified in the Privacy Policy.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">3. Types of personal data and data subjects</h2>
          <p>The Personal Data processed may include the following, as determined by the Controller:</p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li><strong>User account data:</strong> names and email addresses of the Controller's authorised users.</li>
            <li><strong>Business performance data:</strong> goals, targets, thresholds, and metric values entered by the Controller.</li>
            <li><strong>HR and people metrics:</strong> aggregated employee metrics (e.g. sick leave %, engagement scores, turnover rate) entered as goal data points. The Controller is responsible for ensuring such data is appropriately anonymised or aggregated where required.</li>
            <li><strong>Data subjects:</strong> employees, contractors, or other individuals whose data the Controller enters into the platform.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">4. Controller's obligations</h2>
          <p>The Controller confirms that:</p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li>It has a valid legal basis under GDPR for processing any Personal Data it enters into the Service.</li>
            <li>It has informed its data subjects (e.g. employees) about the processing, as required under GDPR Articles 13–14.</li>
            <li>The instructions it gives the Processor comply with applicable data protection law.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">5. Processor's obligations</h2>
          <p>The Processor shall:</p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li>Process Personal Data only on documented instructions from the Controller (i.e. to operate and deliver the Service), unless required to do otherwise by applicable law.</li>
            <li>Ensure that persons authorised to process Personal Data are bound by appropriate confidentiality obligations.</li>
            <li>Implement appropriate technical and organisational security measures in accordance with GDPR Article 32 (see Section 6 below).</li>
            <li>Not engage new sub-processors without prior notification to the Controller (see Section 7).</li>
            <li>Assist the Controller, to the extent reasonably possible, in responding to data subject rights requests under GDPR Articles 15–22.</li>
            <li>Assist the Controller in meeting its obligations under GDPR Articles 32–36 (security, breach notification, impact assessments).</li>
            <li>At the Controller's choice, delete or return all Personal Data upon termination of the Service, and delete existing copies unless retention is required by law.</li>
            <li>Make available to the Controller all information necessary to demonstrate compliance with this DPA, and allow for and contribute to audits and inspections.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">6. Security measures</h2>
          <p>The Processor maintains the following technical and organisational measures:</p>
          <div className="mt-3 rounded-xl overflow-hidden border border-slate-200">
            {[
              ['Encryption in transit', 'TLS 1.2+ on all connections'],
              ['Encryption at rest', 'AES-256 encryption via Supabase'],
              ['Access control', 'Row Level Security (RLS) enforced at database level — each customer sees only their own data'],
              ['Authentication', 'Bcrypt password hashing; short-lived JWT session tokens'],
              ['Infrastructure security', 'Supabase SOC 2 Type II certified'],
              ['EU data residency', 'All data stored in Frankfurt, Germany (EU West)'],
              ['Vulnerability management', 'Automated dependency scanning; security patches applied promptly'],
              ['Admin controls', 'Administrative database operations require super-admin verification at database level (SECURITY DEFINER)'],
            ].map(([measure, detail], i) => (
              <div key={i} className={`grid grid-cols-2 ${i > 0 ? 'border-t border-slate-200' : ''} ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                <div className="px-4 py-3 text-sm font-semibold text-slate-700">{measure}</div>
                <div className="px-4 py-3 text-sm text-slate-500 border-l border-slate-200">{detail}</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">7. Sub-processors</h2>
          <p className="mb-4">
            The Controller provides general authorisation for the Processor to engage the following
            sub-processors. The Processor will notify the Controller of any intended changes to this
            list, giving the Controller the opportunity to object.
          </p>
          <div className="rounded-xl overflow-hidden border border-slate-200">
            <div className="grid grid-cols-4 bg-navy">
              {['Sub-processor', 'Purpose', 'Location', 'Certification'].map(h => (
                <div key={h} className="px-4 py-3 text-xs font-bold text-white/80 uppercase tracking-widest border-r border-white/10 last:border-0">{h}</div>
              ))}
            </div>
            {SUB_PROCESSORS.map((sp, i) => (
              <div key={i} className={`grid grid-cols-4 border-t border-slate-200 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                <div className="px-4 py-3 text-sm font-semibold text-slate-700 border-r border-slate-200">{sp.name}</div>
                <div className="px-4 py-3 text-sm text-slate-500 border-r border-slate-200">{sp.purpose}</div>
                <div className="px-4 py-3 text-sm text-slate-500 border-r border-slate-200">{sp.location}</div>
                <div className="px-4 py-3 text-sm text-slate-500">{sp.cert}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm">
            Sub-processors are bound by data processing agreements that impose data protection
            obligations equivalent to those in this DPA.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">8. International data transfers</h2>
          <p>
            Personal data is primarily stored within the EU (Frankfurt, Germany). Where sub-processors
            are located outside the EU (Anthropic, Stripe, Cloudflare), transfers are conducted on the
            basis of Standard Contractual Clauses (SCCs) adopted by the European Commission, or other
            approved transfer mechanisms under GDPR Chapter V.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">9. Data breach notification</h2>
          <p>
            In the event of a personal data breach affecting the Controller's data, the Processor will
            notify the Controller without undue delay — and in any event within 72 hours of becoming
            aware — to enable the Controller to fulfil its own notification obligations under
            GDPR Articles 33 and 34. Notification will be sent to the email address associated with
            the Controller's account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">10. Governing law and contact</h2>
          <p>
            This DPA is governed by Norwegian law and the GDPR. For questions, to request a
            countersigned copy, or to exercise rights under this DPA, contact:
          </p>
          <div className="mt-4 bg-teal/5 border border-teal/20 rounded-xl px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-navy">{PROCESSOR}</p>
              <p className="text-sm text-slate-500">Norway</p>
            </div>
            <ObfuscatedEmail className="px-5 py-2.5 bg-teal hover:bg-teal-dark text-white font-bold rounded-xl text-sm transition-colors" />
          </div>
        </section>

        <div className="border-t border-slate-200 pt-8 flex gap-6 text-sm">
          <a href="/privacy" className="text-teal underline">Privacy Policy →</a>
          <a href="/terms" className="text-teal underline">Terms of Service →</a>
        </div>

      </div>

      <Footer />
    </div>
  )
}
