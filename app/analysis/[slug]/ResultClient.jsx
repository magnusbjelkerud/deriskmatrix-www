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
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: goal.stateBg, color: goal.stateColor }}>
          {goal.stateLabel}
        </span>
        <span className="text-xs text-slate-400 font-medium">{goal.evidence === 'strong' ? 'Strong evidence' : 'Weak evidence'}</span>
      </div>
      <h3 className="text-base font-bold text-navy mb-1">{goal.name}</h3>
      <p className="text-sm text-slate-500 mb-4 leading-relaxed">{goal.context}</p>
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
      <div className="border-t border-slate-100 pt-4">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Suggested action: </span>
        <span className="text-sm font-semibold" style={{ color: goal.stateColor }}>{goal.stateAction}</span>
        <span className="text-sm text-slate-600"> — {goal.action_detail}</span>
      </div>
    </div>
  )
}

const STATE_COLOR = {
  defensive:   '#1d4e6b',
  potent:      '#148f77',
  harmonious:  '#1a9e8a',
  optimistic:  '#2ab09a',
  dire:        '#c0392b',
  pessimistic: '#e07070',
}

const CELL_POS = {
  defensive:   { row: 0, col: 0 },
  potent:      { row: 0, col: 1 },
  harmonious:  { row: 1, col: 0 },
  optimistic:  { row: 1, col: 1 },
  dire:        { row: 2, col: 0 },
  pessimistic: { row: 2, col: 1 },
}

const TILE_SRCS = [
  ['/images/risk-state-01.png', '/images/risk-state-02.png'],
  ['/images/risk-state-03.png', '/images/risk-state-04.png'],
  ['/images/risk-state-05.png', '/images/risk-state-06.png'],
]

const ICON_FILTER = 'brightness(0) saturate(100%) invert(93%) sepia(8%) saturate(300%) hue-rotate(340deg) brightness(103%)'

function CanvasPreview({ goals }) {
  const cellW = 200
  const cellH = 140
  const gap = 5
  const leftW = 88
  const dotR = 18
  const iconSize = 52
  const targetY  = cellH + gap / 2
  const threshY  = 2 * cellH + 1.5 * gap
  const gridH    = 3 * cellH + 2 * gap

  // Build 3×2 buckets of goals per cell
  const buckets = Array.from({ length: 3 }, () => [[], []])
  goals.forEach((g, i) => {
    const pos = CELL_POS[g.state]
    if (pos) buckets[pos.row][pos.col].push({ ...g, num: i + 1 })
  })

  return (
    <div style={{ background: '#0f2337', borderRadius: 16, padding: '22px 26px 26px', overflowX: 'auto' }}>
      <div style={{ color: '#8aafc4', fontSize: 10, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 10, marginLeft: leftW }}>
        Canvas preview — where your goals sit in the matrix
      </div>

      {/* Column headers */}
      <div style={{ display: 'flex', marginLeft: leftW, marginBottom: 8 }}>
        {['Strong Evidence', 'Weak Evidence'].map((label, i) => (
          <div key={i} style={{ width: cellW + (i === 0 ? gap : 0), textAlign: 'center', color: '#e8dfd0', fontWeight: 800, fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', paddingRight: i === 0 ? gap : 0 }}>
            {label}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        {/* Left label column */}
        <div style={{ width: leftW, position: 'relative', height: gridH, flexShrink: 0 }}>
          {[
            { y: targetY, src: '/images/Icon_Target.png', alt: 'Target', label: 'Target\nValue' },
            { y: threshY, src: '/images/Icon_Threshold.png', alt: 'Threshold', label: 'Threshold\nValue' },
          ].map(({ y, src, alt, label }) => (
            <div key={alt}>
              <div style={{ position: 'absolute', top: y - iconSize / 2, right: -iconSize / 2, width: iconSize, height: iconSize, borderRadius: '50%', background: '#162d42', border: '2px solid #1e3d58', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, boxShadow: '0 0 0 3px #0f2337' }}>
                <img src={src} alt={alt} style={{ width: 34, height: 34, objectFit: 'contain', filter: ICON_FILTER }} />
              </div>
              <div style={{ position: 'absolute', top: y - 14, right: iconSize / 2 + 6, textAlign: 'right', lineHeight: 1.2 }}>
                <span style={{ color: '#e8dfd0', fontWeight: 700, fontSize: 10, letterSpacing: '.04em', textTransform: 'uppercase', whiteSpace: 'pre-line' }}>{label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tile grid + goal dots */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          {TILE_SRCS.map((row, rowIdx) => (
            <div key={rowIdx} style={{ display: 'flex', marginBottom: rowIdx < 2 ? gap : 0 }}>
              {row.map((src, colIdx) => (
                <img key={colIdx} src={src} alt="" draggable={false}
                  style={{ width: cellW, height: cellH, objectFit: 'fill', display: 'block', marginRight: colIdx === 0 ? gap : 0, userSelect: 'none' }} />
              ))}
            </div>
          ))}

          {/* Goal dots */}
          {buckets.map((row, rowIdx) =>
            row.map((cellGoals, colIdx) =>
              cellGoals.map((g, dotIdx) => {
                const spread = (dotIdx - (cellGoals.length - 1) / 2) * (dotR * 2 + 5)
                const cx = colIdx * (cellW + gap) + cellW / 2 + spread
                const cy = rowIdx * (cellH + gap) + cellH / 2
                const color = STATE_COLOR[g.state] || '#94a3b8'
                return (
                  <div key={`${rowIdx}-${colIdx}-${dotIdx}`} title={g.name} style={{ position: 'absolute', left: cx - dotR, top: cy - dotR, width: dotR * 2, height: dotR * 2, borderRadius: '50%', background: '#fff', border: `3px solid ${color}`, boxShadow: '0 2px 10px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 12, color, zIndex: 20, fontFamily: 'system-ui, sans-serif' }}>
                    {g.num}
                  </div>
                )
              })
            )
          )}
        </div>
      </div>

      {/* Legend */}
      {goals.length > 0 && (
        <div style={{ marginTop: 14, marginLeft: leftW, display: 'flex', flexWrap: 'wrap', gap: '8px 14px' }}>
          {goals.map((g, i) => {
            const color = STATE_COLOR[g.state] || '#94a3b8'
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#fff', border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 10, color, flexShrink: 0 }}>{i + 1}</span>
                <span style={{ color: '#e8dfd0', fontSize: 12 }}>{g.name}</span>
              </div>
            )
          })}
        </div>
      )}
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
              {analysis.size_segment && <> · <span className="font-medium text-slate-600">{analysis.size_segment}</span></>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={copyLink}
              className="text-sm font-medium text-slate-500 hover:text-navy border border-slate-200 px-4 py-2 rounded-lg transition-colors"
            >
              {copied ? 'Copied ✓' : 'Copy link'}
            </button>
            <Link href="/analyze" className="text-sm font-medium text-teal hover:text-teal-dark transition-colors">
              Try another →
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        {/* Visible goals */}
        <div>
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-4">Suggested goals — 3 of 7 shown</h2>
          <div className="space-y-4">
            {visibleGoals.map((goal, i) => <GoalCard key={i} goal={goal} />)}
          </div>
        </div>

        {/* Canvas preview */}
        <CanvasPreview goals={goals} />

        {/* Blurred section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide">Risk drivers and recommended actions</h2>
            <span className="text-slate-300">🔒</span>
          </div>
          <div className="space-y-4">
            {[
              {
                stateLabel: 'Top risk driver', stateColor: '#c0392b', stateBg: '#fee2e2', evidence: 'strong',
                name: drivers[0] || 'Primary risk driver across your goals',
                context: [drivers[1], drivers[2]].filter(Boolean).join(' — ') || 'Multiple contributing factors identified',
                target: '—', threshold: '—', unit: '', stateAction: 'Review',
                action_detail: actions[0] || 'Prioritize immediate review',
              },
              {
                stateLabel: '30-day plan', stateColor: '#1a9e8a', stateBg: '#d1fae5', evidence: 'weak',
                name: 'Suggested 30-day action plan',
                context: actions.slice(0, 2).join('. ') || 'Structured actions across your risk drivers',
                target: '—', threshold: '—', unit: '', stateAction: 'Start',
                action_detail: actions[2] || 'Begin with the highest-priority driver',
              },
            ].map((fakeGoal, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden">
                <GoalCard goal={fakeGoal} blurred={true} />
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-2xl">
                  <div className="text-center">
                    <div className="text-2xl mb-1">🔒</div>
                    <div className="text-sm font-bold text-navy">Unlock in the app</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Locked goals teaser */}
        <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-7 text-center">
          <div className="text-3xl mb-3">🔒</div>
          <div className="text-base font-bold text-navy mb-2">
            {hiddenGoals.length} more goals identified — start your trial to see them all
          </div>
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
              14-day trial — no credit card required.
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            {PLANS.map(p => (
              <div
                key={p.name}
                className="rounded-xl p-4 text-center relative"
                style={{
                  background: p.highlight ? '#1a9e8a' : 'rgba(255,255,255,0.08)',
                  border: p.highlight ? '2px solid #1a9e8a' : '1.5px solid rgba(255,255,255,0.12)',
                }}
              >
                {p.tag && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-teal text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    {p.tag}
                  </div>
                )}
                <div className="text-white font-bold mb-1">{p.name}</div>
                <div className="text-2xl font-extrabold text-white mb-1">
                  {p.price}<span className="text-sm font-normal text-white/60">/mo</span>
                </div>
                <div className="text-xs text-white/60">{p.users}</div>
              </div>
            ))}
          </div>

          <div className="text-center mb-6">
            <a
              href={`${APP_URL}/register?from=analyzer&domain=${analysis.domain}`}
              className="inline-block bg-teal hover:bg-teal-dark text-white font-bold text-base px-10 py-4 rounded-xl transition-colors shadow-lg"
            >
              Start free trial →
            </a>
          </div>

          {!emailSubmitted ? (
            <div className="border-t border-white/10 pt-6">
              <div className="text-sm text-white/60 text-center mb-3">
                Or — get the full 7-goal analysis emailed as PDF
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
              <label className="flex items-center justify-center gap-2 mt-3 text-xs text-white/40 cursor-pointer">
                <input type="checkbox" checked={marketingConsent} onChange={e => setMarketingConsent(e.target.checked)} className="rounded" />
                Also send me product tips and updates
              </label>
            </div>
          ) : (
            <div className="border-t border-white/10 pt-6 text-center text-sm text-white/60">
              ✓ PDF request received — we'll send it to {email}
            </div>
          )}
        </div>

        <div className="text-xs text-slate-400 text-center leading-relaxed pb-4">
          Suggestions are based on public website analysis and industry benchmarks. They are starting points for discussion — not validated for your actual situation. Real data inside the app refines them.
          <br />Generated on {createdDate}.
        </div>
      </div>
    </div>
  )
}
