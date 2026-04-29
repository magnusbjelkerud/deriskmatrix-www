'use client'
import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

const APP_URL = 'https://app.deriskmatrix.com'

const PLANS = [
  {
    name: 'Starter',
    users: 'Up to 5 users',
    monthly: 49,
    annual: 39,
    desc: 'For a leadership team getting structured on risk. All features included.',
    highlight: false,
    cta: 'Start 14-day trial',
    href: `${APP_URL}/register`,
  },
  {
    name: 'Growth',
    users: 'Unlimited users',
    monthly: 149,
    annual: 119,
    desc: 'For organizations with departments, portfolios, and a broader leadership group. All features included.',
    highlight: true,
    cta: 'Start 14-day trial',
    href: `${APP_URL}/register`,
  },
  {
    name: 'Enterprise',
    users: 'Custom',
    monthly: null,
    annual: null,
    desc: 'Custom setup for larger organizations with compliance, SSO, or integration needs.',
    highlight: false,
    cta: 'Book a demo',
    href: null,
  },
]

const FEATURES = [
  { icon: '🎯', label: 'Goals as spans (target + threshold)' },
  { icon: '📡', label: '6 live risk states per goal' },
  { icon: '📈', label: 'Forecast-driven risk visibility' },
  { icon: '🏗️', label: 'Full hierarchy — company, dept, project, portfolio' },
  { icon: '🤖', label: 'AI goal assistant' },
  { icon: '📋', label: 'Actions tied to risk state' },
  { icon: '📊', label: 'Canvas & Executive Summary' },
  { icon: '🧭', label: 'Risk Drivers & Pattern Analysis' },
  { icon: '👥', label: 'Team management & invite links' },
  { icon: '🏢', label: 'Multi-company support' },
]

const FAQS = [
  {
    q: 'Do all users get access to all features?',
    a: 'Yes. There are no feature tiers. Every user on your account has access to the full platform.',
  },
  {
    q: 'Can I try it before paying?',
    a: 'Yes. Every account starts with a 14-day trial — full access, all features. No credit card required.',
  },
  {
    q: 'Is there a free plan?',
    a: 'No. After the trial, a subscription is required. This means we can keep building and supporting the platform properly.',
  },
  {
    q: 'What happens if I go above the user limit?',
    a: 'You\'ll need to upgrade to the next plan. You can do this at any time from your account settings.',
  },
  {
    q: 'Can I switch between monthly and annual?',
    a: 'Yes. You can switch to annual at any time and start saving immediately.',
  },
  {
    q: 'What does Enterprise include?',
    a: 'Everything in Business, plus: Tripletex/Fiken integration, SSO/BankID, GDPR data processing agreement, dedicated onboarding, and SLA. Get in touch to discuss.',
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* Hero */}
      <section className="hero-gradient pt-32 pb-20 text-center px-6">
        <p className="text-xs font-bold text-teal uppercase tracking-widest mb-4">Pricing</p>
        <h1 className="text-5xl font-black text-white mb-4 leading-tight">
          Simple pricing.<br />
          <span className="gradient-text">All features. Always.</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-xl mx-auto">
          Three plans. No feature tiers. Start your 14-day trial today.
        </p>
      </section>

      {/* Plans */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {PLANS.map(plan => (
              <div key={plan.name}
                className={`rounded-2xl p-8 flex flex-col ${
                  plan.highlight
                    ? 'bg-navy shadow-2xl shadow-navy/20 md:-mt-4 md:mb-4'
                    : 'bg-slate-50 border border-slate-200'
                }`}>
                {plan.highlight && (
                  <div className="inline-block bg-teal text-white text-xs font-bold px-3 py-1 rounded-full mb-4 self-start">
                    Most popular
                  </div>
                )}
                <h3 className={`text-xl font-black mb-1 ${plan.highlight ? 'text-white' : 'text-navy'}`}>
                  {plan.name}
                </h3>
                <div className={`text-xs font-semibold mb-4 ${plan.highlight ? 'text-teal' : 'text-teal'}`}>
                  {plan.users}
                </div>

                {plan.monthly ? (
                  <>
                    <div className="flex items-baseline gap-1 mb-1">
                      <span className={`text-4xl font-black ${plan.highlight ? 'text-white' : 'text-navy'}`}>
                        €{plan.annual}
                      </span>
                      <span className="text-slate-400 text-sm">/month</span>
                    </div>
                    <div className={`text-xs mb-2 ${plan.highlight ? 'text-slate-400' : 'text-slate-400'}`}>
                      €{plan.monthly}/month billed monthly
                    </div>
                    <div className="text-xs text-teal font-semibold mb-5">
                      Annual billing — save {Math.round((1 - plan.annual / plan.monthly) * 100)}%
                    </div>
                  </>
                ) : (
                  <div className={`text-4xl font-black mb-6 ${plan.highlight ? 'text-white' : 'text-navy'}`}>
                    Custom
                  </div>
                )}

                <p className={`text-sm mb-8 flex-1 ${plan.highlight ? 'text-slate-300' : 'text-slate-500'}`}>
                  {plan.desc}
                </p>

                {plan.href ? (
                  <a href={plan.href}
                    className={`w-full py-3.5 rounded-xl font-bold text-center text-sm transition-colors ${
                      plan.highlight
                        ? 'bg-teal hover:bg-teal-dark text-white'
                        : 'bg-navy hover:bg-slate-800 text-white'
                    }`}>
                    {plan.cta}
                  </a>
                ) : (
                  <button
                    onClick={() => { window.location.href = 'mailto:' + ['post', 'deriskmatrix.com'].join('@') }}
                    className={`w-full py-3.5 rounded-xl font-bold text-center text-sm transition-colors ${
                      plan.highlight
                        ? 'bg-teal hover:bg-teal-dark text-white'
                        : 'bg-navy hover:bg-slate-800 text-white'
                    }`}>
                    {plan.cta}
                  </button>
                )}
                {plan.monthly && (
                  <p className={`text-center text-xs mt-3 ${plan.highlight ? 'text-slate-500' : 'text-slate-400'}`}>
                    14-day trial · No credit card required
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All features included */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-navy mb-3">Everything included. No exceptions.</h2>
            <p className="text-slate-500">Every user on every plan gets the full platform from day one.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {FEATURES.map(f => (
              <div key={f.label} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-slate-200">
                <span className="text-xl flex-shrink-0">{f.icon}</span>
                <span className="text-sm font-medium text-slate-700">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-black text-navy text-center mb-12">Common questions</h2>
          <div className="space-y-4">
            {FAQS.map(faq => (
              <div key={faq.q} className="border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-navy mb-2">{faq.q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-teal">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-white mb-3">Ready to start?</h2>
          <p className="text-white/80 mb-8">14-day trial. All features. No credit card required.</p>
          <a href={`${APP_URL}/register`}
            className="inline-block px-10 py-4 bg-white text-teal font-black rounded-xl hover:bg-slate-50 transition-colors text-lg shadow-lg">
            Start your trial →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
