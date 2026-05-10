'use client'
import { useState } from 'react'
import Link from 'next/link'

const APP_URL = 'https://app.deriskmatrix.com'

const PLANS = [
  { name: 'Mini',    price: '€19',  users: 'Up to 3 users',  highlight: false },
  { name: 'Starter', price: '€39',  users: 'Up to 10 users', highlight: false },
  { name: 'Growth',  price: '€119', users: 'Up to 50 users', highlight: true, tag: 'Most popular' },
]

function GoalCard({ goal, blurred = false }) {
  return (
    <div
      className="bg-white rounded-2xl border border-slate-200 p-6 relative overflow-hidden"
      style={blurred ? { filter: 'blur(5px)', userSelect: 'none', pointerEvents: 'none' } : {}}
    >
      {/* State badge */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-xs font-bold px-3 py-1.5 rounded-full"
          style={{ background: goal.stateBg, color: goal.stateColor }}
        >
          {goal.stateLabel}
        </span>
        <span className="text-xs text-slate-400 font-medium">{goal.evidence === 'strong' ? 'Strong evidence' : 'Weak evidence'}</span>
      </div>

      {/* Goal name */}
      <h3 className="text-base font-bold text-navy mb-1">{goal.name}</h3>

      {/* Context */}
      <p className="text-sm text-slate-500 mb-4 leading-relaxed">{goal.context}</p>

      {/* Target / Threshold */}
      <div className="flex gap-6 text-sm mb-4">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-0.5">Target</span>
          <span className="font-bold text-navy">{goal.target} {goal.unit}</span>
        </div>
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-0.5">Threshold</span>
          <span className="font-bold text-slate-600">{goal.threshold} {goal.unit}</span>
        </div>
      </div>

      {/* Divider + Action */}
      <div className="border-t border-slate-100 pt-4">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Suggested action: </span>
        <span className="text-sm font-semibold" style={{ color: goal.stateColor }}>{goal.stateAction}</span>
        <span className="text-sm text-slate-600"> &#8212; {goal.action_detail}</span>
      </div>
    </div>
  )
}

function MiniCanvas({ goals }) {
  const STATE_POS = {
    defensive:   { x: 25, y: 12 },
    potent:      { x: 75, y: 12 },
    harmonious:  { x: 25, y: 50 },
    optimistic:  { x: 75, y: 50 },
    dire:        { x: 25, y: 88 },
    pessimistic: { x: 75, y: 88 },
  }
  const visibleGoals = goals.slice(0, 3)
  return (
    <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6">
      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-4">Canvas preview &#8212; where your goals sit</div>
      <div className="relative w-full" style={{ height: 160 }}>
        {/* Grid lines */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-3 gap-1">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-lg border border-slate-200 bg-white/60" />
          ))}
        </div>
        {/* Zone labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between py-2 -ml-1 text-xs text-slate-400 font-medium">
          <span>Beyond</span>
          <span>On track</span>
          <span>Below</span>
        </div>
        {/* Column labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-around text-xs text-slate-400 font-medium -mb-5">
          <span>Strong</span>
          <span>Weak</span>
        </div>
        {/* Goal dots */}
        {visibleGoals.map((g, i) => {
          const pos = STATE_POS[g.state] || { x: 50, y: 50 }
          return (
            <div
              key={i}
              className="absolute w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md border-2 border-white"
              style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)', background: g.stateColor }}
            >
              {i + 1}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function ResultClient({ analysis }) {
  const [email, setEmail] = useState('')
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  const goals = Array.isArray(analysis.goals_json) ? analysis.goals_json : []
  const drivers = Array.isArray(analysis.drivers_json) ? analysis.drivers_json : []
  const actions = Array.isArray(analysis.actions_json) ? analysis.actions_json : []
  const visibleGoals = goals.filter(g => g.visible)
  const hiddenGoals = goals.filter(g => !g.visible)
  const createdDate = new Date(analysis.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  const pageUrl = `https://www.deriskmatrix.com/analysis/${analysis.slug}`

  function copyLink() {
    navigator.clipboard.writeText(pageUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function submitEmail(e) {
    e.preventDefault()
    if (!email) return
    await fetch('/api/capture-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ analysisId: analysis.id, email, marketingConsent }),
    })
    setEmailSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Header strip */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Suggested risk picture for</div>
            <div className="text-xl font-extrabold text-navy">{analysis.company_name || analysis.domain}</div>
            <div className="text-sm text-slate-400 mt-0.5">
              Industry: <span className="font-medium text-slate-600">{analysis.industry}</span>
              {analysis.size_segment && <> &#183; <span className="font-medium text-slate-600">{analysis.size_segment}</span></>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={copyLink}
              className="text-sm font-medium text-slate-500 hover:text-navy border border-slate-200 px-4 py-2 rounded-lg transition-colors"
            >
              {copied ? 'Copied &#x2713;' : 'Share &#8594;'}
            </button>
            <Link href="/analyze" className="text-sm font-medium text-teal hover:text-teal-dark transition-colors">
              Try another &#8594;
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        {/* Visible goals */}
        <div>
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">Suggested goals &#8212; 3 of 7 shown</h2>
          <div className="space-y-4">
            {visibleGoals.map((goal, i) => <GoalCard key={i} goal={goal} />)}
          </div>
        </div>

        {/* Mini canvas */}
        <MiniCanvas goals={goals} />

        {/* Blurred section — risk drivers */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Risk drivers and recommended actions</h2>
            <span className="text-slate-300">&#x1F512;</span>
          </div>
          <div className="space-y-4 relative">
            {/* First blurred card - risk drivers */}
            <div className="relative rounded-2xl overflow-hidden">
              <GoalCard goal={{
                stateLabel: 'Top risk driver',
                stateColor: '#c0392b',
                stateBg: '#fadbd8',
                evidence: 'strong',
                name: drivers[0] || 'Primary risk driver across your goals',
                context: `${drivers[1] || 'Secondary risk factor'} — ${drivers[2] || 'contributing factor'}`,
                target: '—', threshold: '—', unit: '',
                stateAction: 'Review', action_detail: actions[0] || 'Prioritize immediate review'
              }} blurred={true} />
              <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm rounded-2xl">
                <div className="text-center">
                  <div className="text-2xl mb-2">&#x1F512;</div>
                  <div className="text-sm font-bold text-navy">Unlock in the app</div>
                </div>
              </div>
            </div>
            {/* Second blurred card - 30-day actions */}
            <div className="relative rounded-2xl overflow-hidden">
              <GoalCard goal={{
                stateLabel: '30-day plan',
                stateColor: '#1a9e8a',
                stateBg: '#d5f5e3',
                evidence: 'weak',
                name: 'Suggested 30-day action plan',
                context: actions.slice(0, 2).join('. '),
                target: '—', threshold: '—', unit: '',
                stateAction: 'Start', action_detail: actions[2] || 'Begin with the highest-priority driver'
              }} blurred={true} />
              <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm rounded-2xl">
                <div className="text-center">
                  <div className="text-2xl mb-2">&#x1F512;</div>
                  <div className="text-sm font-bold text-navy">Unlock in the app</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Locked goals teaser */}
        <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-7 text-center">
          <div className="text-3xl mb-3">&#x1F512;</div>
          <div className="text-base font-bold text-navy mb-2">{hiddenGoals.length} more goals identified &#8212; start your trial to see them all</div>
          <div className="text-sm text-slate-400">
            Including: <span className="font-medium text-slate-600">{hiddenGoals.map(g => g.name).join(', ')}</span>
          </div>
        </div>

        {/* CTA strip */}
        <div className="rounded-2xl p-8" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #18394b 100%)' }}>
          <div className="text-center mb-8">
            <div className="text-xl font-extrabold text-white mb-2">
              This took 30 seconds. Imagine what we find with your real data.
            </div>
            <div className="text-sm text-white/60 leading-relaxed">
              Sign up free. Refine these targets, add your numbers, see live risk states.<br />
              14-day trial &#8212; no credit card required.
            </div>
          </div>

          {/* Plans */}
          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            {PLANS.map(p => (
              <div
                key={p.name}
                className="rounded-xl p-4 text-center relative"
                style={{ background: p.highlight ? '#1a9e8a' : 'rgba(255,255,255,0.08)', border: p.highlight ? '2px solid #1a9e8a' : '1.5px solid rgba(255,255,255,0.12)' }}
              >
                {p.tag && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-teal text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    {p.tag}
                  </div>
                )}
                <div className="text-white font-bold mb-1">{p.name}</div>
                <div className="text-2xl font-extrabold text-white mb-1">{p.price}<span className="text-sm font-normal text-white/60">/mo</span></div>
                <div className="text-xs text-white/60">{p.users}</div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href={`${APP_URL}/register?from=analyzer&domain=${analysis.domain}`}
              className="inline-block bg-teal hover:bg-teal-dark text-white font-bold text-base px-10 py-4 rounded-xl transition-colors shadow-lg mb-4"
            >
              Start free trial &#8594;
            </a>
          </div>

          {/* Email capture secondary CTA */}
          {!emailSubmitted ? (
            <div className="border-t border-white/10 pt-6">
              <div className="text-sm text-white/60 text-center mb-3">
                Or &#8212; get the full 7-goal analysis emailed as PDF
              </div>
              <form onSubmit={submitEmail} className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 text-white placeholder-white/30 border border-white/20 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-teal"
                />
                <button type="submit" className="bg-white/15 hover:bg-white/25 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors border border-white/20">
                  Send PDF
                </button>
              </form>
              <label className="flex items-center justify-center gap-2 mt-2 text-xs text-white/40 cursor-pointer">
                <input type="checkbox" checked={marketingConsent} onChange={e => setMarketingConsent(e.target.checked)} className="rounded" />
                Also send me product tips and updates
              </label>
            </div>
          ) : (
            <div className="border-t border-white/10 pt-6 text-center text-sm text-white/60">
              &#x2713; PDF request received &#8212; we&apos;ll send it to {email}
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-slate-400 text-center leading-relaxed pb-4">
          Suggestions are based on public website analysis and industry benchmarks. They are starting points for discussion &#8212; not validated for your actual situation. Real data inside the app refines them. Confidence indicators help you understand which goals are well-grounded.
          <br />Generated on {createdDate}.
        </div>
      </div>
    </div>
  )
}
