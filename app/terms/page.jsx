import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Terms of Service — De-Risk Matrix',
  description: 'Terms of Service for the De-Risk Matrix application.',
}

const COMPANY = '[SELSKAPSNAVN]'
const ORG_NR  = '[ORG.NR]'
const EMAIL   = 'hello@deriskmatrix.com'
const UPDATED = 'April 2026'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      <div className="bg-slate-50 pt-32 pb-12 border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl font-black text-navy mb-2">Terms of Service</h1>
          <p className="text-slate-500 text-sm">Last updated: {UPDATED}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16 space-y-10 text-slate-600 leading-relaxed">

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">1. Agreement</h2>
          <p>
            These Terms of Service ("Terms") govern your access to and use of the De-Risk Matrix
            platform ("Service") operated by {COMPANY}, org.nr {ORG_NR} ("we", "us", "our").
          </p>
          <p className="mt-2">
            By creating an account or using the Service, you confirm that you have read,
            understood, and agree to be bound by these Terms and our{' '}
            <a href="/privacy" className="text-teal underline">Privacy Policy</a>.
            If you do not agree, do not use the Service.
          </p>
          <p className="mt-2">
            If you accept these Terms on behalf of an organisation, you represent that you have
            authority to bind that organisation to these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">2. Description of service</h2>
          <p>
            De-Risk Matrix is a SaaS application that helps organisations define strategic goals,
            assess risk states, and track performance over time — based on the De-Risk Matrix
            methodology. The Service includes AI-assisted goal generation and company analysis
            powered by third-party AI providers.
          </p>
          <p className="mt-2">
            We reserve the right to modify, suspend, or discontinue any part of the Service at
            any time, with reasonable notice where practicable.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">3. Accounts and access</h2>
          <p className="mb-3">You are responsible for:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Keeping your login credentials confidential</li>
            <li>All activity that occurs under your account</li>
            <li>
              Notifying us immediately at{' '}
              <a href={`mailto:${EMAIL}`} className="text-teal underline">{EMAIL}</a>{' '}
              if you suspect unauthorised access
            </li>
          </ul>
          <p className="mt-3">
            Accounts are for named individuals or organisations. You may not share your
            account or credentials with third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">4. Acceptable use</h2>
          <p className="mb-3">You agree not to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Use the Service for any unlawful purpose or in violation of these Terms</li>
            <li>Upload content that is false, misleading, defamatory, or infringes third-party rights</li>
            <li>Attempt to reverse-engineer, decompile, or extract the source code of the Service</li>
            <li>Interfere with the integrity or performance of the Service or its underlying systems</li>
            <li>Use automated tools to scrape or extract data from the Service without our written consent</li>
            <li>Resell or sublicense access to the Service without our written consent</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">5. AI-powered features</h2>
          <p className="mb-3">
            The Service uses AI models (including Anthropic Claude) to generate goal suggestions,
            analyse company data, and provide strategic insights. You acknowledge that:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              AI-generated content is for informational purposes only and does not constitute
              professional financial, legal, or strategic advice
            </li>
            <li>
              AI outputs may occasionally be inaccurate or incomplete — you are responsible for
              verifying and acting on any AI suggestions
            </li>
            <li>
              Content you submit for analysis (websites, annual reports, etc.) may be processed
              by our AI provider. See our{' '}
              <a href="/privacy" className="text-teal underline">Privacy Policy</a> for details
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">6. Your data and content</h2>
          <p>
            You retain ownership of all data, goals, and content you enter into the Service
            ("Your Content"). By using the Service you grant us a limited licence to store,
            process, and display Your Content solely to operate and improve the Service.
          </p>
          <p className="mt-2">
            We do not sell Your Content to third parties. See our{' '}
            <a href="/privacy" className="text-teal underline">Privacy Policy</a> for full details
            on how we handle your data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">7. Intellectual property</h2>
          <p>
            The Service, including its design, software, methodology, and all content we produce,
            is owned by or licensed to {COMPANY} and is protected by applicable intellectual
            property laws. The De-Risk Matrix methodology is the intellectual property of its
            creator and may not be reproduced commercially without written permission.
          </p>
          <p className="mt-2">
            Nothing in these Terms transfers any intellectual property rights to you beyond the
            limited right to use the Service as described herein.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">8. Subscription and payment</h2>
          <p>
            Access to certain features may require a paid subscription. Subscription terms,
            pricing, and payment details are presented at the time of purchase or upgrade.
            All fees are exclusive of applicable taxes unless stated otherwise.
          </p>
          <p className="mt-2">
            Subscriptions renew automatically unless cancelled before the renewal date.
            We will notify you in advance of any price changes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">9. Disclaimer of warranties</h2>
          <p>
            The Service is provided "as is" and "as available" without warranties of any kind,
            express or implied, including but not limited to warranties of merchantability,
            fitness for a particular purpose, or non-infringement.
          </p>
          <p className="mt-2">
            We do not warrant that the Service will be uninterrupted, error-free, or that any
            defects will be corrected.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">10. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by applicable law, {COMPANY} shall not be liable
            for any indirect, incidental, special, consequential, or punitive damages, or loss
            of profits, revenue, data, or business opportunities, arising out of or related to
            your use of or inability to use the Service.
          </p>
          <p className="mt-2">
            Our total aggregate liability for any claim arising under these Terms shall not
            exceed the amount you have paid us in the twelve (12) months preceding the claim.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">11. Termination</h2>
          <p>
            You may cancel your account at any time by contacting us at{' '}
            <a href={`mailto:${EMAIL}`} className="text-teal underline">{EMAIL}</a>.
          </p>
          <p className="mt-2">
            We may suspend or terminate your account immediately if you materially breach these
            Terms, without notice if necessary to protect the Service or other users.
          </p>
          <p className="mt-2">
            Upon termination, your right to use the Service ceases. You may request an export
            of your data within 30 days of termination, after which we may delete it in
            accordance with our Privacy Policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">12. Governing law</h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of Norway.
            Any disputes shall be subject to the exclusive jurisdiction of the Norwegian courts,
            with Oslo tingrett as the venue of first instance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">13. Changes to these Terms</h2>
          <p>
            We may update these Terms from time to time. We will notify you of material changes
            by email or a prominent notice in the Service at least 30 days before the changes
            take effect. Continued use of the Service after the effective date constitutes
            acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-navy mb-3">14. Contact</h2>
          <p>
            Questions about these Terms? Contact us at:<br />
            {COMPANY} · Org.nr {ORG_NR}<br />
            <a href={`mailto:${EMAIL}`} className="text-teal underline">{EMAIL}</a>
          </p>
        </section>

        <div className="border-t border-slate-200 pt-8">
          <a href="/privacy" className="text-teal underline text-sm">Privacy Policy →</a>
        </div>

      </div>

      <Footer />
    </div>
  )
}
