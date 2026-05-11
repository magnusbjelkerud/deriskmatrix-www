'use client'
import { useState } from 'react'

const APP_URL = 'https://app.deriskmatrix.com'

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

const TILE_IMAGES = [
  ['/images/risk-state-01.png', '/images/risk-state-02.png'],
  ['/images/risk-state-03.png', '/images/risk-state-04.png'],
  ['/images/risk-state-05.png', '/images/risk-state-06.png'],
]

const CELL_POS = {
  defensive:   { row: 0, col: 0 },
  potent:      { row: 0, col: 1 },
  harmonious:  { row: 1, col: 0 },
  optimistic:  { row: 1, col: 1 },
  dire:        { row: 2, col: 0 },
  pessimistic: { row: 2, col: 1 },
}

const STATE_COLOR = {
  defensive:   '#1d4e6b',
  potent:      '#148f77',
  harmonious:  '#1a9e8a',
  optimistic:  '#2ab09a',
  dire:        '#c0392b',
  pessimistic: '#e07070',
}

function CanvasPreview({ goals, lockedCount }) {
  const cellW = 160
  const cellH = 152
  const gap   = 5
  const dotR  = 18
  const leftW = 116
  const circleSize = 58

  const gridTotalH = 3 * cellH + 2 * gap
  const targetY    = cellH + gap / 2
  const threshY    = 2 * cellH + 1.5 * gap

  // Group goals by cell so overlapping dots can be spread
  const cellGroups = {}
  goals.forEach((g, i) => {
    const pos = CELL_POS[g.predicted_state || g.state]
    if (!pos) return
    const key = `${pos.row}-${pos.col}`
    if (!cellGroups[key]) cellGroups[key] = []
    cellGroups[key].push(i)
  })
  function getCellOffset(i, pos) {
    const key = `${pos.row}-${pos.col}`
    const group = cellGroups[key] || []
    const n = group.length
    if (n <= 1) return { dx: 0, dy: 0 }
    const idx = group.indexOf(i)
    const r = Math.min(cellH / 2 - dotR - 6, 18 + 8 * (n - 2))
    const angle = (2 * Math.PI * idx / n) - Math.PI / 2
    return { dx: Math.round(Math.cos(angle) * r), dy: Math.round(Math.sin(angle) * r) }
  }

  return (
    <div style={{ background: '#0f2337', borderRadius: 16, padding: '20px 24px 24px', overflowX: 'auto' }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#475569', marginBottom: 12 }}>
        Canvas preview — where your goals sit in the matrix
      </div>

      <div style={{ display: 'inline-block', minWidth: leftW + 2 * cellW + gap }}>
        {/* Column headers */}
        <div style={{ display: 'flex', marginLeft: leftW, marginBottom: 8 }}>
          {['Strong Evidence', 'Weak Evidence'].map((l, i) => (
            <div key={l} style={{ width: cellW, marginLeft: i === 1 ? gap : 0, textAlign: 'center', color: '#e8dfd0', fontWeight: 800, fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase' }}>
              {l}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          {/* Left labels: Target + Threshold circles */}
          <div style={{ width: leftW, position: 'relative', flexShrink: 0, height: gridTotalH }}>
            <div style={{
              position: 'absolute', top: targetY - circleSize / 2, right: -circleSize / 2,
              width: circleSize, height: circleSize, borderRadius: '50%',
              background: '#162d42', border: '2px solid #1e3d58',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 10, boxShadow: '0 0 0 4px #0f2337',
            }}>
              <img src="/images/Icon_Target.png" alt="Target" style={{ width: 30, height: 30, objectFit: 'contain', filter: 'brightness(0) saturate(100%) invert(93%) sepia(8%) saturate(300%) hue-rotate(340deg) brightness(103%)' }} />
            </div>
            <div style={{ position: 'absolute', top: targetY - 14, right: circleSize / 2 + 6, textAlign: 'right', lineHeight: 1.2 }}>
              <span style={{ color: '#e8dfd0', fontWeight: 700, fontSize: 10, letterSpacing: '.04em', textTransform: 'uppercase' }}>Target<br />Value</span>
            </div>

            <div style={{
              position: 'absolute', top: threshY - circleSize / 2, right: -circleSize / 2,
              width: circleSize, height: circleSize, borderRadius: '50%',
              background: '#162d42', border: '2px solid #1e3d58',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 10, boxShadow: '0 0 0 4px #0f2337',
            }}>
              <img src="/images/Icon_Threshold.png" alt="Threshold" style={{ width: 30, height: 30, objectFit: 'contain', filter: 'brightness(0) saturate(100%) invert(93%) sepia(8%) saturate(300%) hue-rotate(340deg) brightness(103%)' }} />
            </div>
            <div style={{ position: 'absolute', top: threshY - 14, right: circleSize / 2 + 6, textAlign: 'right', lineHeight: 1.2 }}>
              <span style={{ color: '#e8dfd0', fontWeight: 700, fontSize: 10, letterSpacing: '.04em', textTransform: 'uppercase' }}>Threshold<br />Value</span>
            </div>
          </div>

          {/* Tile grid + goal dots */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            {TILE_IMAGES.map((row, rowIdx) => (
              <div key={rowIdx} style={{ display: 'flex', marginBottom: rowIdx < 2 ? gap : 0 }}>
                {row.map((src, colIdx) => (
                  <img
                    key={colIdx}
                    src={src}
                    alt=""
                    draggable={false}
                    style={{ width: cellW, height: cellH, objectFit: 'fill', display: 'block', marginRight: colIdx === 0 ? gap : 0, userSelect: 'none' }}
                  />
                ))}
              </div>
            ))}

            {goals.map((g, i) => {
              const state = g.predicted_state || g.state
              const pos   = CELL_POS[state]
              if (!pos) return null
              const { dx, dy } = getCellOffset(i, pos)
              const cx    = pos.col * (cellW + gap) + cellW / 2 + dx
              const cy    = pos.row * (cellH + gap) + cellH / 2 + dy
              const color = STATE_COLOR[state] || '#94a3b8'
              return (
                <div
                  key={i}
                  title={g.name}
                  style={{
                    position: 'absolute', left: cx - dotR, top: cy - dotR,
                    width: dotR * 2, height: dotR * 2, borderRadius: '50%',
                    background: '#fff', border: `3px solid ${color}`,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 900, fontSize: 12, color, zIndex: 20,
                    fontFamily: 'system-ui, sans-serif',
                  }}
                >
                  {i + 1}
                </div>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div style={{ marginTop: 14, marginLeft: leftW, display: 'flex', flexWrap: 'wrap', gap: '6px 16px', alignItems: 'center' }}>
          {goals.map((g, i) => {
            const state = g.predicted_state || g.state
            const color = STATE_COLOR[state] || '#94a3b8'
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', border: `2px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 9, color, flexShrink: 0 }}>{i + 1}</span>
                <span style={{ color: '#e8dfd0', fontSize: 11 }}>{g.name}</span>
              </div>
            )
          })}
          {lockedCount > 0 && (
            <span style={{ fontSize: 11, color: '#475569' }}>🔒 +{lockedCount} goals visible in trial</span>
          )}
        </div>
      </div>
    </div>
  )
}

const COPY = {
  company: {
    headerLabel: 'YOUR COMPANY RISK PICTURE',
    headlinesuffix: ' is ready',
    assumptionNote: 'Based on public filings, industry benchmarks and your website.',
    fomoLabel: 'For leadership teams',
    fomoHeader: 'What a CFO actually needs\nbefore the board meeting.',
    fomoIntro: 'Inside, the same three goals become a working risk picture you can lead from — not just a snapshot of last quarter.',
    fomoItems: [
      {
        title: 'Know which goals are slipping before the board does',
        body: 'Continuous risk states across every strategic goal. The quarterly surprise stops being a quarterly thing.',
      },
      {
        title: "See what's actually driving the risk",
        body: 'Each Dire goal comes with root causes, recommended actions, and what to escalate this week. Decisions, not dashboards.',
      },
      {
        title: 'Build the risk culture your strategy needs',
        body: "Patterns across your goals reveal where your leadership team decides too late, where evidence is thin, where ownership is unclear. The cultural work that actually moves results.",
      },
      {
        title: 'Defend your numbers with evidence',
        body: "When the board asks \"can we hit this?\", you have an answer backed by current data, not last quarter's spreadsheet.",
      },
    ],
    closing: 'Stop finding out too late.',
    closingBody: "Every goal on your canvas updates the moment its evidence does. So you act when there's still time to act.",
    ctaLabel: name => `Continue as ${name} →`,
  },
  project: {
    headerLabel: 'YOUR PROJECT RISK PICTURE',
    headlinePrefix: '',
    headlineSuffix: ' — risk picture ready',
    assumptionNote: 'Based on your project description and benchmarks from similar initiatives.',
    fomoLabel: 'For project leads',
    fomoHeader: 'What a project lead actually needs.',
    fomoIntro: 'Inside, the same three goals become a working risk picture you can steer from — not just a status update.',
    fomoItems: [
      {
        title: 'Know which milestones are slipping — before the steering committee does',
        body: 'Continuous risk states across budget, timeline, scope, and quality. The status meeting surprise stops being a thing.',
      },
      {
        title: "See what's actually driving project risk",
        body: 'Each Dire goal comes with root causes, recommended actions, and what to escalate this week.',
      },
      {
        title: 'Build the project discipline your delivery needs',
        body: 'Patterns across your goals reveal where decisions slip, where evidence is thin, where dependencies are unclear.',
      },
      {
        title: 'Defend your timeline — with evidence, not optimism',
        body: 'When the sponsor asks "are we on track?", you have an answer backed by current data, not last week\'s status report.',
      },
    ],
    closing: 'Stop finding out at the next milestone review.',
    closingBody: "Every goal on your canvas updates the moment its evidence does. So you act when there's still time to act.",
    ctaLabel: () => 'Continue with my project →',
  },
}

export default function ResultClient({ analysis, mode = 'company' }) {
  const copy = COPY[mode] || COPY.company
  const isProject = mode === 'project'

  const rawGoals = Array.isArray(analysis.goals_json) ? analysis.goals_json : []
  const drivers = Array.isArray(analysis.drivers_json) ? analysis.drivers_json : []
  const actions = Array.isArray(analysis.actions_json) ? analysis.actions_json : []

  const STATE_SORT = { dire: 0, pessimistic: 1 }
  const goals = [...rawGoals].sort((a, b) => {
    const aP = STATE_SORT[a.state] ?? 2
    const bP = STATE_SORT[b.state] ?? 2
    if (aP !== bP) return aP - bP
    return (a.rank || 0) - (b.rank || 0)
  })

  const visibleGoals = goals.filter(g => g.visible_in_teaser ?? g.visible)
  const hiddenGoals  = goals.filter(g => !(g.visible_in_teaser ?? g.visible))
  const createdDate  = new Date(analysis.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  const companyName  = analysis.company_name || analysis.domain

  // Subline for company: Industry · Country · Size. For project: description snippet.
  const subline = isProject
    ? analysis.sub_industry || 'Project'
    : [analysis.industry, analysis.country_code !== 'INT' ? analysis.country_code : null, analysis.size_segment]
        .filter(Boolean).join(' · ')

  const registerUrl = `${APP_URL}/register?from=analyzer&domain=${analysis.domain}&analysisId=${analysis.id}&mode=${mode}`

  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Header strip */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-6 py-5">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
            {copy.headerLabel}
          </div>
          <div className="text-xl font-extrabold text-navy">
            {companyName}{isProject ? ' — risk picture ready' : ' is ready'}
          </div>
          {subline && (
            <div className="text-sm text-slate-400 mt-0.5 leading-snug">{subline}</div>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        {/* Visible goals */}
        <div>
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-1">
            Suggested goals — 3 of 7 shown
          </h2>
          <p className="text-xs text-slate-400 mb-4">{copy.assumptionNote}</p>
          <div className="space-y-4">
            {visibleGoals.map((goal, i) => <GoalCard key={i} goal={goal} />)}
          </div>
        </div>

        {/* Canvas preview */}
        <CanvasPreview goals={visibleGoals} lockedCount={hiddenGoals.length} />

        {/* Blurred drivers / actions */}
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
            {hiddenGoals.length} more goals identified — including
          </div>
          <div className="text-sm text-slate-500">
            <span className="font-medium text-slate-600">{hiddenGoals.map(g => g.name).join(', ')}</span>
          </div>
        </div>

        {/* FOMO block */}
        <div className="rounded-2xl overflow-hidden" style={{ background: '#0f172a' }}>
          <div className="px-8 pt-8 pb-6 border-b border-white/8">
            <div className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: '#1a9e8a' }}>
              {copy.fomoLabel}
            </div>
            <h2 className="text-2xl font-extrabold text-white mb-2 leading-snug" style={{ whiteSpace: 'pre-line' }}>
              {copy.fomoHeader}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {copy.fomoIntro}
            </p>
          </div>
          <div className="divide-y divide-white/6">
            {copy.fomoItems.map((item, i) => (
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
            <div className="text-sm font-bold text-white mb-1">{copy.closing}</div>
            <div className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
              {copy.closingBody}
            </div>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="rounded-2xl p-8 text-center" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #18394b 100%)' }}>
          <div className="text-xl font-extrabold text-white mb-2">
            {isProject
              ? 'This took 30 seconds. Imagine managing it with live data.'
              : 'This took 30 seconds. Imagine what we find with your real data.'}
          </div>
          <div className="text-sm text-white/60 leading-relaxed mb-8">
            {isProject
              ? 'Refine these targets, add your actuals, track risk states live.\n14-day trial — no credit card required.'
              : 'Refine these targets, add your numbers, see live risk states.\n14-day trial — no credit card required.'}
          </div>
          <a
            href={registerUrl}
            className="inline-block bg-teal hover:bg-teal-dark text-white font-bold text-base px-10 py-4 rounded-xl transition-colors shadow-lg"
          >
            {copy.ctaLabel(companyName)}
          </a>
        </div>

        <div className="text-xs text-slate-400 text-center leading-relaxed pb-4">
          {isProject
            ? 'Suggestions are based on your project description and benchmarks from similar initiatives. They are starting points for discussion — not validated for your actual situation.'
            : 'Suggestions are based on public website analysis and industry benchmarks. They are starting points for discussion — not validated for your actual situation. Real data inside the app refines them.'}
          <br />Generated on {createdDate}.
        </div>
      </div>
    </div>
  )
}
