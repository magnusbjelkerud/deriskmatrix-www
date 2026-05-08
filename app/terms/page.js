import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Terms of Service — De-Risk Matrix',
  description: 'Terms of Service for De-Risk Matrix. Governing law: Norway.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      <div className="bg-slate-50 pt-32 pb-12 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-black text-navy mb-2">Terms of Service</h1>
          <p className="text-slate-500 text-sm">Last updated: May 2026</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16 space-y-10 text-slate-600 leading-relaxed">

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">1. Acceptance</h2>
          <p>By registering for or using De-Risk Matrix, you agree to these Terms of Service. If you do not agree, do not use the service. These terms apply to all users, including trial users.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">2. The service</h2>
          <p>De-Risk Matrix is a SaaS platform for strategic goal and risk management, operated by <strong>De-Risk Matrix Company AS</strong>, Norway (<a href="mailto:post@deriskmatrix.com" className="text-teal underline">post@deriskmatrix.com</a>). The platform provides tools for defining goals, assessing risk states, forecasting, and AI-assisted analysis aligned with ISO 31000.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">3. Account terms</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>You must provide accurate and complete information when registering.</li>
            <li>You are responsible for maintaining the security of your account and password.</li>
            <li>One person or legal entity may not maintain more than one free trial account.</li>
            <li>You must be 18 years or older to use this service.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">4. Trial period</h2>
          <p>New accounts receive a 14-day free trial with full access to all features. No credit card is required during the trial. At the end of the trial, a paid subscription is required to continue using the service. We reserve the right to modify trial terms at any time.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">5. Subscriptions and payment</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Subscriptions are billed in advance on a monthly or annual basis.</li>
            <li>All prices are in EUR and exclusive of applicable taxes (VAT/MVA).</li>
            <li>Payments are processed by Stripe, Inc. Card data is never stored by De-Risk Matrix.</li>
            <li>You may upgrade, downgrade, or cancel your subscription at any time from the billing settings.</li>
            <li>Cancellations take effect at the end of the current billing period. No refunds are issued for partial periods.</li>
            <li>If a payment fails, we will notify you by email. Access may be suspended if payment is not resolved within 7 days.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">6. Acceptable use</h2>
          <p className="mb-3">You agree not to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Use the service for any unlawful purpose or in violation of any applicable regulations.</li>
            <li>Attempt to gain unauthorised access to any part of the service or its infrastructure.</li>
            <li>Resell, sublicense, or otherwise commercialise the service without written permission.</li>
            <li>Upload or transmit malicious code, viruses, or other harmful content.</li>
            <li>Use automated means to scrape, crawl, or extract data from the service.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">7. Your data</h2>
          <p className="mb-3">You retain full ownership of all data you enter into De-Risk Matrix. We do not claim any rights to your content.</p>
          <p className="mb-3">By using De-Risk Matrix, you grant us a limited licence to process your data solely for the purpose of providing the service.</p>
          <p>Upon account deletion or cancellation, your data will be deleted within 30 days. You may export your data at any time from within the platform. Our <a href="/privacy" className="text-teal underline">Privacy Policy</a> and <a href="/dpa" className="text-teal underline">Data Processing Agreement</a> are incorporated into these terms.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">8. Intellectual property</h2>
          <p>The De-Risk Matrix platform, methodology, branding, and all associated software are the intellectual property of De-Risk Matrix Company AS. Nothing in these terms grants you any rights to our intellectual property except the limited right to use the service as described herein.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">9. Availability and modifications</h2>
          <p className="mb-3">We aim for high availability but do not guarantee uninterrupted access. We may perform maintenance, updates, or modifications to the service at any time.</p>
          <p>We reserve the right to modify, suspend, or discontinue any part of the service with reasonable notice. We will not be liable for any modification, suspension, or discontinuation.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">10. Limitation of liability</h2>
          <p className="mb-3">To the maximum extent permitted by applicable law, De-Risk Matrix Company AS shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service.</p>
          <p>Our total liability to you for any claim arising under these terms shall not exceed the amount you paid us in the 12 months preceding the claim.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">11. Termination</h2>
          <p>We may suspend or terminate your account immediately if you violate these terms or if we reasonably believe your use of the service poses a security risk. You may cancel your account at any time. Upon termination, your right to use the service ceases immediately.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">12. Governing law</h2>
          <p>These terms are governed by Norwegian law. Any disputes shall be resolved in the courts of Norway, with Oslo District Court (<em>Oslo tingrett</em>) as the agreed venue.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">13. Changes to these terms</h2>
          <p>We may update these terms from time to time. We will notify you by email at least 14 days before material changes take effect. Continued use of the service after that date constitutes acceptance of the updated terms.</p>
        </section>

        <div className="border-t border-slate-200 pt-8 flex gap-6 text-sm">
          <a href="/privacy" className="text-teal underline">Privacy Policy →</a>
          <a href="/dpa" className="text-teal underline">Data Processing Agreement →</a>
        </div>

      </div>

      <Footer />
    </div>
  )
}
