'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

const APP_URL = 'https://app.deriskmatrix.com'

const PRICE_MONTHLY = 299
const PRICE_ANNUAL  = 249

const FEATURES = [
  { icon: '🎯', label: 'Goals as spans (target + threshold)' },
  { icon: '📡', label: '6 live risk states per goal' },
  { icon: '📈', label: 'Forecast-driven risk visibility' },
  { icon: '🏗️', label: 'Full goal hierarchy — company, dept, project, portfolio' },
  { icon: '🤖', label: 'AI goal assistant' },
  { icon: '📋', label: 'Actions tied to risk state' },
  { icon: '📊', label: 'Canvas & Executive Summary' },
  { icon: '🧭', label: 'Risk Drivers & Pattern Analysis' },
  { icon: '👥', label: 'Team management & invite links' },
  { icon: '🏢', label: 'Multi-company support' },
  { icon: '📅', label: '14-day trial, no credit card required' },
]

const FAQS = [
  {
    q: 'What counts as a user?',
    a: 'Anyone with a login to your De-Risk Matrix workspace. You can invite unlimited team members within your seat count, and scale up or down at any time.',
  },
  {
    q: 'Can I try it before paying?',
    a: 'Yes. Every account starts with a 14-day trial — full access, all features. No credit card required.',
  },
  {
    q: 'Is there a free plan?',
    a: 'No. After the trial, a subscription is required. We believe software that improves strategic decision-making should be paid for — it means we can keep building it properly.',
  },
  {
    q: 'What if I need more than 50 users?',
    a: 'Reach out at post@deriskmatrix.com and we\'ll put together a custom package — including volume pricing, dedicated onboarding, and SLA options.',
  },
  {
    q: 'Can I switch between monthly and annual?',
    a: 'Yes. You can switch to annual at any time and start saving immediately.',
  },
  {
    q: 'Do all users get access to all features?',
    a: 'Yes. There are no feature tiers. Every user on your account has access to the full platform.',
  },
]

function PriceCalculator() {
  const [users, setUsers]   = useState(5)
  const [annual, setAnnual] = useState(true)

  const price     = annual ? PRICE_ANNUAL : PRICE_MONTHLY
  const monthly   = users * price
  const yearTotal = annual ? users * PRICE_ANNUAL * 12 : null
  const saving    = annual ? users * (PRICE_MONTHLY - PRICE_ANNUAL) * 12 : null

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
      {/* Monthly / Annual toggle */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <span className={`text-sm font-semibold ${!annual ? 'text-navy' : 'text-slate-400'}`}>Monthly</span>
        <button
          onClick={() => setAnnual(a => !a)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${annual ? 'bg-teal' : 'bg-slate-300'}`}
        >
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${annual ? 'translate-x-6' : 'translate-x-1'}`} />
        </button>
        <span className={`text-sm font-semibold ${annual ? 'text-navy' : 'text-slate-400'}`}>
          Annual
          <span className="ml-1.5 bg-teal text-white text-xs font-bold px-2 py-0.5 rounded-full">Save 17%</span>
        </span>
      </div>

      {/* Slider */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-slate-700">Number of users</label>
          <span className="text-2xl font-black text-navy">{users}</span>
        </div>
        <input
          type="range"
          min={2}
          max={50}
          value={users}
          onChange={e => setUsers(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-teal"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>2</span>
          <span>50+</span>
        </div>
      </div>

      {/* Price display */}
      <div className="text-center mb-6">
        <div className="flex items-baseline justify-center gap-1 mb-1">
          <span className="text-5xl font-black text-navy">{monthly.toLocaleString('nb-NO')}</span>
          <span className="text-slate-500 text-lg">NOK/month</span>
        </div>
        {annual && (
          <p className="text-slate-500 text-sm">
            {yearTotal.toLocaleString('nb-NO')} NOK billed annually
            <span className="text-teal font-semibold ml-2">— you save {saving.toLocaleString('nb-NO')} NOK/year</span>
          </p>
        )}
        <p className="text-slate-400 text-xs mt-1">{price} NOK/user/month · all features included</p>
      </div>

      <a
        href={`${APP_URL}/register`}
        className="block w-full py-4 bg-teal hover:bg-teal-dark text-white font-bold text-center rounded-xl transition-colors text-lg shadow-lg shadow-teal/20"
      >
        Start your 14-day trial →
      </a>
      <p className="text-center text-xs text-slate-400 mt-3">No credit card required. Cancel anytime.</p>
    </div>
  )
}

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* ── Hero ── */}
      <section className="hero-gradient pt-32 pb-20 text-center px-6">
        <p className="text-xs font-bold text-teal uppercase tracking-widest mb-4">Pricing</p>
        <h1 className="text-5xl font-black text-white mb-4 leading-tight">
          Simple pricing.<br />
          <span className="gradient-text">All features. Always.</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-xl mx-auto">
          One plan. Per user. No feature tiers. No lock-in. Start your 14-day trial today.
        </p>
      </section>

      {/* ── Calculator ── */}
      <section className="py-20 bg-white">
        <div className="max-w-lg mx-auto px-6">
          <PriceCalculator />
        </div>
      </section>

      {/* ── Scenarios ── */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-black text-navy text-center mb-10">What does it cost for my team?</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { label: 'Leadership team',       users: 3,  desc: 'CEO, CFO, and one department head getting structured on risk.' },
              { label: 'Growing company',       users: 10, desc: 'Full leadership group with department heads across the organization.' },
              { label: 'Larger organization',   users: 25, desc: 'Leadership, all department managers, and key project owners.' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{s.label}</div>
                <div className="text-3xl font-black text-navy mb-0.5">
                  {(s.users * PRICE_ANNUAL).toLocaleString('nb-NO')}
                  <span className="text-base font-semibold text-slate-400"> NOK/mnd</span>
                </div>
                <div className="text-xs text-teal font-semibold mb-3">{s.users} users · annual billing</div>
                <p className="text-slate-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-400 mt-6">
            Need 50+ users?{' '}
            <a href="mailto:post@deriskmatrix.com" className="text-teal font-semibold hover:underline">
              Contact us for enterprise pricing →
            </a>
          </p>
        </div>
      </section>

      {/* ── What's included ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-navy mb-3">Everything included. No exceptions.</h2>
            <p className="text-slate-500">Every user on your account gets access to the full platform from day one.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {FEATURES.map(f => (
              <div key={f.label} className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">
                <span className="text-xl flex-shrink-0">{f.icon}</span>
                <span className="text-sm font-medium text-slate-700">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Enterprise ── */}
      <section className="py-20 bg-navy">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="text-4xl mb-5">🏢</div>
          <h2 className="text-3xl font-black text-white mb-3">50+ users or special requirements?</h2>
          <p className="text-slate-300 max-w-xl mx-auto mb-8">
            We work with larger organizations on custom pricing, dedicated onboarding, SSO/BankID integration, Tripletex/Fiken integration, GDPR data processing agreements, and SLA commitments.
          </p>
          <a
            href="mailto:post@deriskmatrix.com"
            className="inline-block px-8 py-4 bg-teal hover:bg-teal-dark text-white font-bold rounded-xl transition-colors text-lg"
          >
            Book a demo →
          </a>
          <p className="text-slate-500 text-xs mt-3">post@deriskmatrix.com</p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-black text-navy text-center mb-12">Frequently asked questions</h2>
          <div className="space-y-5">
            {FAQS.map(faq => (
              <div key={faq.q} className="border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-navy mb-2">{faq.q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 bg-teal">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-white mb-3">Ready to start?</h2>
          <p className="text-white/80 mb-8">14-day trial. All features. No credit card required.</p>
          <a
            href={`${APP_URL}/register`}
            className="inline-block px-10 py-4 bg-white text-teal font-black rounded-xl hover:bg-slate-50 transition-colors text-lg shadow-lg"
          >
            Start your trial →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
