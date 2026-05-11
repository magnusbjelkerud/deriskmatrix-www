'use client'
import { useState } from 'react'
import Link from 'next/link'

const APP_URL = 'https://app.deriskmatrix.com'

const PLANS = [
  { name: 'Mini',    price: '€19',  users: 'Up to 3 users',  highlight: false },
  { name: 'Starter', price: '€39',  users: 'Up to 10 users', highlight: false },
  { name: 'Growth',  price: '€119', users: 'Up to 50 users', highlight: true, tag: 'Most popular' },
]

const CONFIDENCE_META = {
  high:   { label: 'High confidence',   color: '#16a34a', bg: '#dcfce7' },
  medium: { label: 'Medium confidence', color: '#d97706', bg: '#fef3c7' },
  low:    { label: 'Limited data',      color: '#6b7280', bg: '#f3f4f6' },
}

function GoalCard({ goal, blurred = false }) {
  const [showEvidence, setShowEvidence] = useState(false)
  const conf = CONFIDENCE_META[goal.confidence] || CONFIDENCE_META.medium

  return (
    <div
      className="bg-white rounded-2xl border border-slate-200 p-6 relative overflow-hidden"
      style={blurred ? { filter: 'blur(5px)', userSelect: 'none', pointerEvents: 'none' } : {}}
    >
      <div className="flex items-start justify-between mb-4 gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background: goal.stateBg, color: goal.stateColor }}>
            {goal.stateLabel}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: conf.bg, color: conf.color }}>
            {conf.label}
          </span>
        </div>
        <span className="text-xs text-slate-400 font-medium">{goal.evidence === 'strong' ? 'Strong evidence' : 'Weak evidence'}</span>
      </div>

      <h3 className="text-base font-bold text-navy mb-1">{goal.name}</h3>
      <p className="text-sm text-slate-500 mb-4 leading-relaxed">{goal.context_line || goal.context}</p>

      <div className="flex gap-6 text-sm mb-4">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-0.5">Target</span>
          <span className="font-bold text-navy">{goal.target_display || goal.target} {!goal.target_display && goal.unit}</span>
        </div>
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-0.5">Threshold</span>
          <span className="font-bold text-slate-600">{goal.threshold_display || goal.threshold} {!goal.threshold_display && goal.unit}</span>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-4">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Suggested action: </span>
        <span className="text-sm font-semibold" style={{ color: goal.stateColor }}>{goal.stateAction}</span>
        <span className="text-sm text-slate-600"> — {goal.suggested_action || goal.action_detail}</span>
      </div>

      {goal.evidence_bullets?.length > 0 && (
        <div className="mt-3">
          <button
            onClick={() => setShowEvidence(v => !v)}
            className="text-xs font-semibold text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors"
          >
            Why we suggest this {showEvidence ? '↑' : '→'}
          </button>
          {showEvidence && (
            <ul className="mt-2 space-y-1.5">
              {goal.evidence_bullets.map((b, i) => (
                <li key={i} className="text-xs text-slate-500 flex items-start gap-2">
                  <span style={{ color: '#1a9e8a' }} className="mt-0.5 flex-shrink-0">–</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
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

const CELL_GRID = [
  ['defensive', 'potent'],
  ['harmonious', 'optimistic'],
  ['dire', 'pessimistic'],
]

const CELL_BG = {
  defensive:   'rgba(29,78,107,0.28)',    potent:      'rgba(20,143,119,0.22)',
  harmonious:  'rgba(26,158,138,0.22)',   optimistic:  'rgba(42,176,154,0.16)',
  dire:        'rgba(192,57,43,0.28)',    pessimistic: 'rgba(224,112,112,0.16)',
}

const CELL_BORDER = {
  defensive:   'rgba(29,78,107,0.45)',    potent:      'rgba(20,143,119,0.38)',
  harmonious:  'rgba(26,158,138,0.38)',   optimistic:  'rgba(42,176,154,0.3)',
  dire:        'rgba(192,57,43,0.45)',    pessimistic: 'rgba(224,112,112,0.3)',
}

const ROW_LABELS = ['Beyond\ntarget', 'On\ntrack', 'Below\nthreshold']

function CanvasPreview({ goals, lockedCount }) {
  // Build 3×2 buckets — only visible goals
  const buckets = Array.from({ length: 3 }, () => [[], []])
  goals.forEach((g, i) => {
    const state = g.predicted_state || g.state
    const pos = CELL_POS[state]
    if (pos) buckets[pos.row][pos.col].push({ ...g, displayNum: i + 1 })
  })

  return (
    <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #18394b 100%)', borderRadius: 16, padding: '20px 20px 22px' }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#475569', marginBottom: 14 }}>
        Canvas preview — where your goals sit in the matrix
      </div>

      {/* Column headers */}
      <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr', gap: 6, marginBottom: 5 }}>
        <div />
        {['Strong evidence', 'Weak evidence'].map(l => (
          <div key={l} style={{ textAlign: 'center', fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: '.06em', textTransform: 'uppercase' }}>{l}</div>
        ))}
      </div>

      {/* 3 rows */}
      {CELL_GRID.map((rowStates, rowIdx) => (
        <div key={rowIdx} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr', gap: 6, marginBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 8 }}>
            <span style={{ fontSize: 9, fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '.04em', textAlign: 'right', lineHeight: 1.4, whiteSpace: 'pre-line' }}>
              {ROW_LABELS[rowIdx]}
            </span>
          </div>
          {rowStates.map((stateKey, colIdx) => {
            const cellGoals = buckets[rowIdx][colIdx]
            const active = cellGoals.length > 0
            return (
              <div key={colIdx} style={{
                borderRadius: 9,
                background: active ? CELL_BG[stateKey] : 'rgba(255,255,255,0.03)',
                border: `1px solid ${active ? CELL_BORDER[stateKey] : 'rgba(255,255,255,0.07)'}`,
                minHeight: 58,
                padding: '8px 10px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 6,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {active ? cellGoals.map(g => (
                  <div key={g.displayNum} title={g.name} style={{
                    width: 30, height: 30, borderRadius: '50%',
                    background: '#fff',
                    border: `2.5px solid ${STATE_COLOR[stateKey]}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 900, fontSize: 12, color: STATE_COLOR[stateKey], flexShrink: 0,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                  }}>
                    {g.displayNum}
                  </div>
                )) : (
                  <span style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.08)', letterSpacing: '.04em', textTransform: 'uppercase' }}>
                    {stateKey}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      ))}

      {/* Legend */}
      <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: '6px 18px', alignItems: 'center' }}>
        {goals.map((g, i) => {
          const state = g.predicted_state || g.state
          const color = STATE_COLOR[state] || '#94a3b8'
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 9, color, flexShrink: 0 }}>{i + 1}</span>
              <span style={{ color: '#94a3b8', fontSize: 11 }}>{g.name}</span>
            </div>
          )
        })}
        {lockedCount > 0 && (
          <span style={{ fontSize: 11, color: '#334155' }}>🔒 +{lockedCount} goals visible in trial</span>
        )}
      </div>
    </div>
  )
}

export default function ResultClient({ analysis, mode = 'company' }) {
  const [email, setEmail] = useState('')
  const [marketingConsent, setMarketingConsent] = useState(false)
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  const rawGoals = Array.isArray(analysis.goals_json) ? analysis.goals_json : []
  const drivers = Array.isArray(analysis.drivers_json) ? analysis.drivers_json : []
  const actions = Array.isArray(analysis.actions_json) ? analysis.actions_json : []

  // Dire-first sort: dire → pessimistic → rest (preserves rank ordering within each group)
  const STATE_SORT = { dire: 0, pessimistic: 1 }
  const goals = [...rawGoals].sort((a, b) => {
    const aP = STATE_SORT[a.state] ?? 2
    const bP = STATE_SORT[b.state] ?? 2
    if (aP !== bP) return aP - bP
    return (a.rank || 0) - (b.rank || 0)
  })

  const visibleGoals = goals.filter(g => g.visible_in_teaser ?? g.visible)
  const hiddenGoals = goals.filter(g => !(g.visible_in_teaser ?? g.visible))
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
        <CanvasPreview goals={visibleGoals} lockedCount={hiddenGoals.length} />

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

        {/* FOR LEADERSHIP TEAMS */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#0f172a' }}>
          <div className="px-8 pt-8 pb-6 border-b border-white/8">
            <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#1a9e8a' }}>
              For leadership teams
            </div>
            <h2 className="text-2xl font-extrabold text-white mb-2 leading-snug">
              What a CFO actually needs<br />before the board meeting.
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Inside, the same three goals become a working risk picture you can lead from — not just a snapshot of last quarter.
            </p>
          </div>
          <div className="divide-y divide-white/6">
            {[
              {
                title: 'Know which goals are slipping — before the board does',
                body: 'Continuous risk states across every strategic goal. The quarterly surprise stops being a quarterly thing.',
              },
              {
                title: 'See what\'s actually driving the risk',
                body: 'Each Dire goal comes with root causes, recommended actions, and what to escalate this week. Decisions, not dashboards.',
              },
              {
                title: 'Build the risk culture your strategy needs',
                body: 'Patterns across your goals reveal where your leadership team decides too late, where evidence is thin, where ownership is unclear. The cultural work that actually moves results.',
              },
              {
                title: 'Defend your numbers — with evidence, not opinion',
                body: 'When the board asks "can we hit this?", you have an answer backed by current data, not last quarter\'s spreadsheet.',
              },
            ].map((item, i) => (
              <div key={i} className="px-8 py-5 flex gap-4 items-start">
                <span className="flex-shrink-0 mt-1 text-sm" style={{ color: '#1a9e8a' }}>✓</span>
                <div>
                  <div className="text-sm font-bold text-white mb-1">{item.title}</div>
                  <div className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{item.body}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-8 py-6 border-t border-white/8" style={{ background: 'rgba(26,158,138,0.07)' }}>
            <div className="text-sm font-bold text-white mb-1">Stop finding out too late.</div>
            <div className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Every goal on your canvas updates the moment its evidence does. So you act when there&apos;s still time to act.
            </div>
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
              href={`${APP_URL}/register?from=analyzer&domain=${analysis.domain}&analysisId=${analysis.id}&mode=${mode}`}
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
