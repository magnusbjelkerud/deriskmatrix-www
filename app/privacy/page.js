import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Privacy Policy — De-Risk Matrix',
  description: 'Privacy policy for De-Risk Matrix. GDPR compliant.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      <div className="bg-slate-50 pt-32 pb-12 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-black text-navy mb-2">Privacy Policy</h1>
          <p className="text-slate-500 text-sm">Last updated: April 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16 space-y-10 text-slate-600 leading-relaxed">

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">1. Who we are</h2>
          <p>De-Risk Matrix is a SaaS platform for strategic goal and risk management, developed and operated by Magnus Bjelkerud (org.nr. TBD), Norway. Contact: <a href="mailto:magnus@bjelkerud.no" className="text-teal underline">magnus@bjelkerud.no</a>.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">2. What data we collect</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Account data:</strong> Email address, full name, company name — collected at sign-up.</li>
            <li><strong>Usage data:</strong> Goals, risk data, actions, comments, and forecasts you create in the platform.</li>
            <li><strong>Technical data:</strong> IP address, browser type, session data — collected automatically for security and performance.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">3. How we use your data</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>To provide and operate the De-Risk Matrix platform.</li>
            <li>To send product-related emails (onboarding, important updates). You can opt out at any time.</li>
            <li>To improve the product based on aggregated, anonymized usage patterns.</li>
          </ul>
          <p className="mt-3">We do not sell your data to third parties. We do not use your data for advertising.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">4. Data storage and processors</h2>
          <p>Your data is stored on <strong>Supabase</strong> (EU region — Frankfurt, Germany), which is our infrastructure provider. Supabase is GDPR compliant. We maintain a Data Processing Agreement (DPA) with Supabase.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">5. Your rights (GDPR)</h2>
          <p className="mb-3">Under the General Data Protection Regulation (GDPR), you have the right to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Access</strong> — request a copy of your personal data</li>
            <li><strong>Portability</strong> — export your data in machine-readable format (Art. 20)</li>
            <li><strong>Correction</strong> — request corrections to inaccurate data</li>
            <li><strong>Deletion</strong> — request deletion of your account and all associated data</li>
            <li><strong>Objection</strong> — object to processing based on legitimate interests</li>
          </ul>
          <p className="mt-3">To exercise any of these rights, email <a href="mailto:magnus@bjelkerud.no" className="text-teal underline">magnus@bjelkerud.no</a>. We will respond within 30 days.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">6. Cookies</h2>
          <p>This website uses only strictly necessary cookies for authentication and session management. No advertising or tracking cookies are used.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">7. Data retention</h2>
          <p>We retain your data for as long as your account is active. You may delete your account at any time from within the platform. Inactive accounts may be deleted after 24 months of inactivity with prior notification.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">8. Changes to this policy</h2>
          <p>We may update this policy from time to time. Significant changes will be communicated by email. The &ldquo;last updated&rdquo; date at the top of this page reflects the most recent revision.</p>
        </section>

      </div>

      <Footer />
    </div>
  )
}
