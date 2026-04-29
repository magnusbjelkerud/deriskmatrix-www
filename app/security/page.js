import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ObfuscatedEmail from '../../components/ObfuscatedEmail'

const ROWS = [
  {
    tech: 'Row Level Security (RLS) enforced at database level',
    plain: 'Only your team can see your data — not other customers, not us. Enforced inside the database itself, not just in the application.',
  },
  {
    tech: 'TLS 1.2+ encryption in transit, AES-256 encryption at rest',
    plain: 'Your data is encrypted on the way to our servers and while stored. Unreadable without the right keys — even with physical server access.',
  },
  {
    tech: 'EU data residency — Frankfurt, Germany (Supabase EU West)',
    plain: 'Your data never leaves the EU. Stored in Frankfurt, Germany. Compliant with GDPR and Norwegian personal data law.',
  },
  {
    tech: 'Stripe PCI DSS Level 1 — payment processing',
    plain: 'We never store your card details. Payments are handled by Stripe — the same infrastructure used by Amazon, Spotify and thousands of banks worldwide.',
  },
  {
    tech: 'Bcrypt password hashing with salt',
    plain: 'Your password is stored as a one-way hash. It cannot be reversed — not by attackers, and not by us.',
  },
  {
    tech: 'Short-lived JWT session tokens with automatic expiry',
    plain: 'Your login session expires automatically. No persistent tokens that can be quietly stolen and reused.',
  },
  {
    tech: 'Supabase infrastructure — SOC 2 Type II certified',
    plain: 'Our database provider is independently audited for security controls every year by a third-party auditor.',
  },
  {
    tech: 'Secrets managed via Supabase Vault — never in source code',
    plain: 'API keys and credentials are stored in a secure secret vault, not in the application code or version control.',
  },
  {
    tech: 'CORS policy — API functions restricted to authorized origins only',
    plain: 'Our server functions only accept requests from the De-Risk Matrix application. Requests from unknown domains are blocked at the API level before any logic runs.',
  },
  {
    tech: 'Admin operations enforced at database level (PostgreSQL SECURITY DEFINER)',
    plain: 'User management and company access changes require super-admin status verified inside the database — not just in the UI. An attacker who bypasses the interface still cannot execute admin operations.',
  },
  {
    tech: 'Automated dependency vulnerability scanning (Snyk)',
    plain: 'All software dependencies are continuously monitored for known vulnerabilities. Security patches are applied promptly when issues are discovered — not on a quarterly schedule.',
  },
]

const BADGES = [
  { label: 'Stripe', sub: 'PCI DSS Level 1', color: '#635BFF' },
  { label: 'Supabase', sub: 'SOC 2 Type II', color: '#3ECF8E' },
  { label: '🇪🇺 EU', sub: 'GDPR compliant', color: '#1D8A7A' },
  { label: 'HTTPS', sub: 'TLS 1.2+ everywhere', color: '#3A6B82' },
]

export const metadata = {
  title: 'Security & Privacy — De-Risk Matrix',
  description: 'How De-Risk Matrix protects your company data. EU data residency, AES-256 encryption, Stripe PCI DSS, SOC 2 Type II.',
}

export default function SecurityPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="hero-gradient pt-32 pb-20 text-center px-6">
        <p className="text-xs font-bold text-teal uppercase tracking-widest mb-4">Security & Privacy</p>
        <h1 className="text-5xl font-black text-white mb-4 leading-tight">
          Built to protect<br />
          <span className="gradient-text">your company's data.</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-6">
          De-Risk Matrix is built with security as a foundation — not an afterthought.
          We implement industry-standard safeguards at every layer.
        </p>
        <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4 text-sm text-slate-300 text-left">
          <strong className="text-white">Important:</strong> No system can guarantee complete protection
          against all hostile attacks. What we can guarantee is that we follow industry best practices,
          minimise risk at every layer, and respond swiftly if an incident occurs.
        </div>
      </section>

      {/* Trust badges */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-6">
            {BADGES.map(b => (
              <div key={b.label} className="flex flex-col items-center px-8 py-4 rounded-2xl bg-slate-50 border border-slate-200 min-w-[120px]">
                <span className="text-lg font-black" style={{ color: b.color }}>{b.label}</span>
                <span className="text-xs text-slate-500 mt-1 text-center">{b.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two-column table */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-navy mb-3">How we protect your data</h2>
            <p className="text-slate-500">Technical details — and what they mean to you.</p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            {/* Header */}
            <div className="grid grid-cols-2 bg-navy">
              <div className="px-6 py-4 text-xs font-bold text-white/80 uppercase tracking-widest">
                Security technicality
              </div>
              <div className="px-6 py-4 text-xs font-bold text-white/80 uppercase tracking-widest border-l border-white/10">
                What it means to you
              </div>
            </div>

            {/* Rows */}
            {ROWS.map((row, i) => (
              <div key={i} className={`grid grid-cols-2 border-t border-slate-200 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                <div className="px-6 py-5 text-sm text-slate-500 font-mono leading-relaxed border-r border-slate-200">
                  {row.tech}
                </div>
                <div className="px-6 py-5 flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="10" fill="#E0F3F1" />
                    <path d="M6 10l3 3 5-5" stroke="#1D8A7A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm text-slate-700 leading-relaxed">{row.plain}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-teal/5 border border-teal/20 rounded-2xl px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-black text-navy mb-2">Security questions or responsible disclosure</h3>
              <p className="text-slate-500 text-sm">
                Found a vulnerability? Need a Data Processing Agreement (DPA)?
                Get in touch and we will respond as soon as possible.
              </p>
            </div>
            <ObfuscatedEmail className="flex-shrink-0 px-6 py-3 bg-teal hover:bg-teal-dark text-white font-bold rounded-xl text-sm transition-colors" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
