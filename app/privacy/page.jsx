import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Privacy Policy — De-Risk Matrix',
  description: 'How De-Risk Matrix collects, uses, and protects your data. GDPR compliant.',
}

const COMPANY = '[SELSKAPSNAVN]'
const ORG_NR  = '[ORG.NR]'
const EMAIL   = 'hello@deriskmatrix.com'
const UPDATED = 'April 2026'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      <div className="bg-slate-50 pt-32 pb-12 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-black text-navy mb-2">Privacy Policy</h1>
          <p className="text-slate-500 text-sm">Last updated: {UPDATED}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16 space-y-10 text-slate-600 leading-relaxed">

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">1. Who we are</h2>
          <p>
            {COMPANY}, org.nr {ORG_NR} ("we", "us", "our") is the data controller responsible
            for personal data processed through the De-Risk Matrix application (app.deriskmatrix.com).
          </p>
          <p className="mt-2">
            Contact: <a href={`mailto:${EMAIL}`} className="text-teal underline">{EMAIL}</a>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">2. What data we collect</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left p-3 border border-slate-200 font-semibold text-navy">Category</th>
                  <th className="text-left p-3 border border-slate-200 font-semibold text-navy">Data</th>
                  <th className="text-left p-3 border border-slate-200 font-semibold text-navy">Source</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Account', 'Full name, email address', 'You provide at registration'],
                  ['Organisation', 'Company name, organisation number, website', 'You provide or fetched from public registries'],
                  ['Usage', 'Goals, targets, data points, risk drivers, actions, strategies', 'You enter in the application'],
                  ['AI analysis input', 'Company website content, uploaded annual reports (PDF), financial context', 'You initiate analysis'],
                  ['Technical', 'IP address, browser type, session data', 'Automatically — for security and operation'],
                ].map(([cat, data, src], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="p-3 border border-slate-200 font-medium">{cat}</td>
                    <td className="p-3 border border-slate-200">{data}</td>
                    <td className="p-3 border border-slate-200 text-slate-500">{src}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm">We do <strong>not</strong> collect payment card data directly — payments are handled by our payment processor.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">3. How we use your data</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left p-3 border border-slate-200 font-semibold text-navy">Purpose</th>
                  <th className="text-left p-3 border border-slate-200 font-semibold text-navy">Legal basis (GDPR)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Provide and operate the Service', 'Performance of contract (Art. 6(1)(b))'],
                  ['User authentication and account management', 'Performance of contract'],
                  ['AI-assisted goal and risk analysis', 'Performance of contract / Legitimate interest'],
                  ['Improve and develop the Service', 'Legitimate interest (Art. 6(1)(f))'],
                  ['Service-related communications (security, updates)', 'Performance of contract / Legal obligation'],
                  ['Marketing emails (only with explicit consent)', 'Consent (Art. 6(1)(a))'],
                  ['Comply with legal obligations', 'Legal obligation (Art. 6(1)(c))'],
                ].map(([purpose, basis], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="p-3 border border-slate-200">{purpose}</td>
                    <td className="p-3 border border-slate-200 text-slate-500">{basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm">We do not sell your data to third parties. We do not use your data for advertising.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">4. AI processing — important notice</h2>
          <p>
            When you use AI-powered features (Company Analyzer, AI Goal Generator), content you
            provide — such as website URLs, uploaded PDF documents, and company context — is
            transmitted to <strong>Anthropic, PBC</strong> (provider of Claude AI) for processing.
            Anthropic acts as a data processor on our behalf.
          </p>
          <p className="mt-3">
            Anthropic does not use data submitted via the API to train its models. A Data Processing
            Agreement (DPA) is in place with Anthropic. See{' '}
            <a href="https://www.anthropic.com/legal/privacy" target="_blank" rel="noreferrer"
              className="text-teal underline">anthropic.com/legal/privacy</a>.
          </p>
          <p className="mt-3">
            Do not upload documents containing sensitive personal data (identity numbers, health data,
            confidential employee information) unless you have a lawful basis to do so.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">5. Third-party processors</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left p-3 border border-slate-200 font-semibold text-navy">Processor</th>
                  <th className="text-left p-3 border border-slate-200 font-semibold text-navy">Purpose</th>
                  <th className="text-left p-3 border border-slate-200 font-semibold text-navy">Location</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Supabase Inc.', 'Database, authentication, file storage', 'EU (Frankfurt, Germany)'],
                  ['Anthropic, PBC', 'AI language model (Claude)', 'USA — Standard Contractual Clauses'],
                  ['Vercel Inc.', 'Application hosting, serverless functions', 'USA — Standard Contractual Clauses'],
                  ['Brønnøysundregistrene', 'Public company data (org.nr lookups)', 'Norway — public API, no personal data'],
                ].map(([proc, purpose, loc], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="p-3 border border-slate-200 font-medium">{proc}</td>
                    <td className="p-3 border border-slate-200">{purpose}</td>
                    <td className="p-3 border border-slate-200 text-slate-500">{loc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm">
            Where processors are located outside the EU/EEA, transfers take place under Standard
            Contractual Clauses (SCCs) approved by the European Commission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">6. Data retention</h2>
          <p>
            We retain your data for as long as your account is active. If you close your account,
            we will delete or anonymise your personal data within 90 days, unless we are required
            to retain it longer by applicable law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">7. Your rights (GDPR)</h2>
          <p className="mb-3">Under GDPR you have the right to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Access</strong> — request a copy of your personal data</li>
            <li><strong>Rectification</strong> — correct inaccurate or incomplete data</li>
            <li><strong>Erasure</strong> — request deletion of your data ("right to be forgotten")</li>
            <li><strong>Restriction</strong> — ask us to limit processing</li>
            <li><strong>Portability</strong> — receive your data in a machine-readable format</li>
            <li><strong>Object</strong> — object to processing based on legitimate interests</li>
            <li><strong>Withdraw consent</strong> — for any consent-based processing, at any time</li>
          </ul>
          <p className="mt-3">
            Email us at <a href={`mailto:${EMAIL}`} className="text-teal underline">{EMAIL}</a>.
            We will respond within 30 days. You may also lodge a complaint with the Norwegian
            data protection authority:{' '}
            <a href="https://www.datatilsynet.no" target="_blank" rel="noreferrer"
              className="text-teal underline">datatilsynet.no</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">8. Cookies and local storage</h2>
          <p>
            We use browser <strong>localStorage</strong> to store session preferences and draft
            data locally on your device. We use session cookies required for authentication
            (managed by Supabase Auth). We do not use third-party tracking or advertising cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">9. Changes to this policy</h2>
          <p>
            We may update this policy from time to time. We will notify you of material changes
            by email at least 30 days before they take effect.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">10. Contact</h2>
          <p>
            {COMPANY} · Org.nr {ORG_NR}<br />
            <a href={`mailto:${EMAIL}`} className="text-teal underline">{EMAIL}</a>
          </p>
        </section>

        <div className="border-t border-slate-200 pt-8">
          <a href="/terms" className="text-teal underline text-sm">Terms of Service →</a>
        </div>

      </div>

      <Footer />
    </div>
  )
}
