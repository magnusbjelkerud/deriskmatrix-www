import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'About Magnus Bjelkerud — De-Risk Matrix',
  description: 'The story behind De-Risk Matrix and its creator, Magnus Bjelkerud.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />

      <div className="hero-gradient pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">About</h1>
          <p className="text-xl text-slate-300">The story behind De-Risk Matrix.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-20 space-y-16">

        {/* Magnus */}
        <section className="grid md:grid-cols-3 gap-10 items-start">
          <div className="md:col-span-1 flex flex-col items-center text-center">
            <div className="w-40 h-40 rounded-2xl overflow-hidden mb-4 shadow-lg">
              <Image
                src="/images/magnus.jpg"
                alt="Magnus Bjelkerud"
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="font-bold text-navy">Magnus Bjelkerud</div>
            <div className="text-slate-500 text-sm mt-1">Creator, De-Risk Matrix</div>
            <div className="mt-3 space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="text-teal font-bold">✓</span> Master of Science
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="text-teal font-bold">✓</span> Master of Management
              </div>
            </div>
          </div>
          <div className="md:col-span-2 space-y-4 text-slate-600 leading-relaxed">
            <p>
              With a Master of Science and a Master of Management, Magnus developed the De-Risk Matrix methodology after identifying a persistent gap: existing frameworks failed to integrate strategic goal-setting with structured risk management and the organizational culture required to act on it.
            </p>
            <p>
              Most risk frameworks treat risk as a separate discipline from strategy. Most goal frameworks — OKR, Balanced Scorecard, SMART — treat targets as single points without explicit risk floors. De-Risk Matrix connects the two: goals define the risk appetite; risk states drive the cultural response.
            </p>
            <p>
              The methodology was refined through real-world pilots and specialist collaborations, and is deliberately aligned with ISO 31000 — the international standard for risk management — as well as ISO 45003 and Edmondson&apos;s psychological safety research.
            </p>
          </div>
        </section>

        {/* The quote */}
        <section className="bg-navy rounded-2xl p-8">
          <blockquote className="text-xl text-white leading-relaxed italic mb-4">
            &ldquo;Traditionally, risk has meant &lsquo;how big the hole in the floor is&rsquo; — probability multiplied by negative consequence. But the modern ISO 31000 definition looks upward: how high the building is, and how high it could grow. Risk is the effect of uncertainty on objectives — and that is exactly what the De-Risk Matrix is built upon.&rdquo;
          </blockquote>
          <div className="text-teal text-sm font-semibold">— Magnus Bjelkerud</div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-black text-navy mb-4">Get in touch</h2>
          <p className="text-slate-600 mb-6">
            Questions about the methodology, enterprise pricing, or partnership opportunities?
          </p>
          <a
            href="mailto:post@deriskmatrix.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors"
          >
            post@deriskmatrix.com →
          </a>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-teal to-blue-accent rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-black text-white mb-3">Try the platform</h2>
          <p className="text-white/80 mb-6">14-day trial. No lock-in. Cancel anytime.</p>
          <a
            href="https://app.deriskmatrix.com/register"
            className="inline-block px-7 py-3.5 bg-white text-teal font-bold rounded-xl hover:bg-slate-50 transition-colors"
          >
            Start your trial →
          </a>
        </section>

      </div>

      <Footer />
    </div>
  )
}
