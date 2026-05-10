// ============================================================
// SYNC: This file has an identical twin
// Twin location: deriskmatrix-app/src/lib/riskStateEnrichment.js
// Last synced: 2026-05-10
// Tracked: TECHNICAL_DEBT.md TD-004
// ----
// Changes to state colors, labels, or enrichment logic MUST be
// applied to both files in the same commit cycle.
// Migration target: @deriskmatrix/shared when build pipelines stabilize.
// ============================================================

const STATE_META = {
  defensive:   { label: 'Defensive',   color: '#1d4e6b', bg: '#d6eaf8', action: 'Raise',     evidence: 'strong' },
  potent:      { label: 'Potent',      color: '#148f77', bg: '#d1f2eb', action: 'Explore',   evidence: 'weak'   },
  harmonious:  { label: 'Harmonious',  color: '#1a9e8a', bg: '#d5f5e3', action: 'Ensure',    evidence: 'strong' },
  optimistic:  { label: 'Optimistic',  color: '#2ab09a', bg: '#d1f2eb', action: 'Prove',     evidence: 'weak'   },
  dire:        { label: 'Dire',        color: '#c0392b', bg: '#fadbd8', action: 'Lower',     evidence: 'strong' },
  pessimistic: { label: 'Pessimistic', color: '#e07070', bg: '#fde8e8', action: 'Intervene', evidence: 'weak'   },
}

// Accepts goals with either v2 field names (predicted_state) or Phase A field names (state).
// Adds UI enrichment fields and normalizes both name variants so all consumers work.
export function enrichGoals(goals) {
  return goals.map(g => {
    const state = g.predicted_state || g.state || 'optimistic'
    const meta = STATE_META[state] || STATE_META.optimistic
    return {
      ...g,
      state,
      predicted_state: state,
      stateLabel:      meta.label,
      stateColor:      meta.color,
      stateBg:         meta.bg,
      stateAction:     meta.action,
      evidence:        meta.evidence,
    }
  })
}
