import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'Security & Trust — De-Risk Matrix',
  description:
    'How De-Risk Matrix protects your data: EU hosting, encryption, RLS, GDPR compliance, and Snyk scanning.',
};

const sections = [
  {
    id: 'data-residency',
    icon: (
      <svg className="w-7 h-7 text-teal-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5a17.92 17.92 0 0 1-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.1-1.533.284-2.253" />
      </svg>
    ),
    title: 'Data Residency',
    content: (
      <>
        <p className="text-slate-600 leading-relaxed">
          All customer data is stored exclusively in the <strong>European Union</strong>. We use Supabase hosted on
          Amazon Web Services in the <strong>eu-central-1 (Frankfurt)</strong> region. Data never leaves EU
          jurisdiction under normal operations.
        </p>
        <ul className="mt-4 space-y-2 text-slate-600 text-sm">
          <li className="flex gap-2"><span className="text-teal-500 font-bold mt-0.5">•</span>Database, storage, and authentication all run in Frankfurt</li>
          <li className="flex gap-2"><span className="text-teal-500 font-bold mt-0.5">•</span>No data is replicated to regions outside the EU</li>
          <li className="flex gap-2"><span className="text-teal-500 font-bold mt-0.5">•</span>Supabase operates under EU Standard Contractual Clauses (SCCs)</li>
        </ul>
      </>
    ),
  },
  {
    id: 'encryption',
    icon: (
      <svg className="w-7 h-7 text-teal-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
    title: 'Encryption',
    content: (
      <>
        <p className="text-slate-600 leading-relaxed">
          Your data is protected both in transit and at rest using industry-standard encryption.
        </p>
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="font-semibold text-navy text-sm mb-1">In Transit</p>
            <p className="text-slate-600 text-sm">TLS 1.2+ enforced on all connections. No unencrypted HTTP traffic is accepted.</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="font-semibold text-navy text-sm mb-1">At Rest</p>
            <p className="text-slate-600 text-sm">AES-256 encryption on all database volumes and file storage managed by Supabase.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'access-control',
    icon: (
      <svg className="w-7 h-7 text-teal-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    title: 'Access Control & Row-Level Security',
    content: (
      <>
        <p className="text-slate-600 leading-relaxed">
          Multi-tenancy is enforced at the database layer, not just the application layer. Every table in De-Risk Matrix
          has <strong>Row-Level Security (RLS)</strong> enabled in PostgreSQL.
        </p>
        <ul className="mt-4 space-y-2 text-slate-600 text-sm">
          <li className="flex gap-2"><span className="text-teal-500 font-bold mt-0.5">•</span>All rows are scoped to a <code className="bg-slate-100 px-1 rounded text-xs">company_id</code> — queries automatically filter to the authenticated company</li>
          <li className="flex gap-2"><span className="text-teal-500 font-bold mt-0.5">•</span>No application bug can expose another company's data — the database enforces isolation</li>
          <li className="flex gap-2"><span className="text-teal-500 font-bold mt-0.5">•</span>Service-role keys are never exposed to the browser or client code</li>
          <li className="flex gap-2"><span className="text-teal-500 font-bold mt-0.5">•</span>Privileged operations use <code className="bg-slate-100 px-1 rounded text-xs">SECURITY DEFINER</code> RPCs with strict input validation</li>
        </ul>
      </>
    ),
  },
  {
    id: 'authentication',
    icon: (
      <svg className="w-7 h-7 text-teal-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
    title: 'Authentication & Session Security',
    content: (
      <>
        <p className="text-slate-600 leading-relaxed">
          De-Risk Matrix uses <strong>Supabase Auth</strong> for all user authentication. Sessions are managed with
          short-lived JWTs and secure refresh token rotation.
        </p>
        <ul className="mt-4 space-y-2 text-slate-600 text-sm">
          <li className="flex gap-2"><span className="text-teal-500 font-bold mt-0.5">•</span>JWT tokens are validated server-side on every request</li>
          <li className="flex gap-2"><span className="text-teal-500 font-bold mt-0.5">•</span>Refresh tokens are rotated on use — compromised tokens are invalidated automatically</li>
          <li className="flex gap-2"><span className="text-teal-500 font-bold mt-0.5">•</span>Passwords are hashed with bcrypt — we never store plaintext credentials</li>
          <li className="flex gap-2"><span className="text-teal-500 font-bold mt-0.5">•</span>Email confirmation is required for all new accounts</li>
        </ul>
      </>
    ),
  },
  {
    id: 'gdpr',
    icon: (
      <svg className="w-7 h-7 text-teal-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    title: 'GDPR Compliance',
    content: (
      <>
        <p className="text-slate-600 leading-relaxed">
          De-Risk Matrix is designed for EU compliance from the ground up. We process personal data solely to deliver
          the service, with no advertising or profiling purposes.
        </p>
        <div className="mt-5 grid sm:grid-cols-2 gap-4">
          {[
            { label: 'Right to Erasure (Art. 17)', desc: 'Deleting your account anonymises all personal identifiers. Company data can be purged on request.' },
            { label: 'Data Portability (Art. 20)', desc: 'You can export your data at any time in machine-readable format from within the application.' },
            { label: 'Cookie Consent', desc: 'We use a consent banner for non-essential cookies. Essential session cookies require no consent under ePrivacy rules.' },
            { label: 'Lawful Basis', desc: 'Processing is based on contract performance (Art. 6(1)(b)) and, where applicable, legitimate interest.' },
          ].map((item) => (
            <div key={item.label} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <p className="font-semibold text-navy text-sm mb-1">{item.label}</p>
              <p className="text-slate-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-slate-600 text-sm">
          GDPR enquiries and data subject requests:{' '}
          <a href="mailto:privacy@deriskmatrix.com" className="text-teal-600 hover:underline font-medium">
            privacy@deriskmatrix.com
          </a>
        </p>
      </>
    ),
  },
  {
    id: 'dependency-scanning',
    icon: (
      <svg className="w-7 h-7 text-teal-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
    title: 'Dependency Scanning',
    content: (
      <>
        <p className="text-slate-600 leading-relaxed">
          Every push to our codebase triggers an automated security scan via <strong>Snyk</strong> integrated into
          GitHub Actions CI. Known CVEs in third-party dependencies are flagged before any code reaches production.
        </p>
        <ul className="mt-4 space-y-2 text-slate-600 text-sm">
          <li className="flex gap-2"><span className="text-teal-500 font-bold mt-0.5">•</span>Snyk scans run on every push and pull request</li>
          <li className="flex gap-2"><span className="text-teal-500 font-bold mt-0.5">•</span>Critical and high-severity CVEs block deployment automatically</li>
          <li className="flex gap-2"><span className="text-teal-500 font-bold mt-0.5">•</span>We maintain a minimal dependency footprint to reduce attack surface</li>
        </ul>
      </>
    ),
  },
  {
    id: 'no-advertising',
    icon: (
      <svg className="w-7 h-7 text-teal-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
    title: 'No Advertising. No Data Selling. Ever.',
    content: (
      <p className="text-slate-600 leading-relaxed">
        De-Risk Matrix does not sell, rent, or share your data with third-party advertisers. We do not build advertising
        profiles. We do not use your strategic goals, risks, or company data for any purpose other than operating the
        service you have contracted with us to provide. This is a firm policy — not just a legal clause.
      </p>
    ),
  },
  {
    id: 'iso31000',
    icon: (
      <svg className="w-7 h-7 text-teal-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
    title: 'ISO 31000 Alignment',
    content: (
      <p className="text-slate-600 leading-relaxed">
        The De-Risk Matrix methodology — how risks are identified, assessed, treated, and monitored — is structured
        around the <strong>ISO 31000:2018</strong> risk management framework. This is a methodological alignment, not a
        certification. It means the platform's workflows reflect internationally recognised risk management principles,
        giving your team a structured, auditable approach to strategic risk.
      </p>
    ),
  },
];

export default function SecurityPage() {
  return (
    <>
      <Nav />

      {/* Hero */}
      <section className="hero-gradient py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-teal-400 text-sm font-semibold uppercase tracking-widest mb-4">Security & Trust</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-6">
            Built for companies that handle sensitive information
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            De-Risk Matrix stores your strategic goals and risk data with the same care you apply to your business.
            Here is exactly how we protect it.
          </p>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-slate-50 border-b border-slate-200 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 text-sm text-center">
          {[
            'EU data residency (Frankfurt)',
            'TLS + AES-256 encryption',
            'Row-Level Security on every table',
            'GDPR compliant',
            'Snyk dependency scanning',
            'No data selling — ever',
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="text-teal-500 font-bold text-base">&#10003;</span>
              <span className="font-medium text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Main content */}
      <main className="py-20 px-6">
        <div className="max-w-3xl mx-auto space-y-16">
          {sections.map((section) => (
            <section key={section.id} id={section.id}>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-teal-50 rounded-xl border border-teal-100">
                  {section.icon}
                </div>
                <h2 className="text-xl font-bold text-navy">{section.title}</h2>
              </div>
              <div className="pl-0 sm:pl-16">{section.content}</div>
            </section>
          ))}

          <hr className="border-slate-200" />

          {/* Responsible disclosure */}
          <section id="contact">
            <div className="bg-navy rounded-2xl p-8 text-white">
              <h2 className="text-xl font-bold mb-3">Report a Security Issue</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                If you discover a potential security vulnerability in De-Risk Matrix, please report it responsibly. We
                take all reports seriously and aim to respond within 48 hours.
              </p>
              <p className="text-slate-300 text-sm mb-6">
                Please include a clear description of the issue, steps to reproduce, and any relevant environment
                details. Do not share vulnerability details publicly until we have had a chance to address them.
              </p>
              <a
                href="mailto:post@deriskmatrix.com"
                className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                post@deriskmatrix.com
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
