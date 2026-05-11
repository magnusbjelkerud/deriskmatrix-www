'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const STEPS_COMPANY = [
  'Reading website',
  'Identifying industry and business model',
  'Mapping typical goals for your sector',
  'Suggesting thresholds and risk states',
  'Generating recommended actions',
]

const STEPS_PROJECT = [
  'Reading project description',
  'Identifying project type and context',
  'Mapping typical project goals',
  'Suggesting thresholds and risk states',
  'Generating recommended actions',
]

const CONFIDENCE_BADGE = {
  high:     { label: 'Confirmed',        bg: 'rgba(26,158,138,0.18)', color: '#1a9e8a', border: 'rgba(26,158,138,0.35)' },
  medium:   { label: 'Best match',       bg: 'rgba(245,158,11,0.15)', color: '#d97706', border: 'rgba(245,158,11,0.35)' },
  low:      { label: 'Best guess',       bg: 'rgba(239,68,68,0.12)',  color: '#dc2626', border: 'rgba(239,68,68,0.3)' },
  inferred: { label: 'Best guess',       bg: 'rgba(239,68,68,0.12)',  color: '#dc2626', border: 'rgba(239,68,68,0.3)' },
}

export default function HeroAnalyzer() {
  const [mode, setMode]           = useState('company')
  const [input, setInput]         = useState('')           // company tab: domain or name
  const [description, setDescription] = useState('')      // project tab
  const [stage, setStage]         = useState('input')      // 'input'|'resolving'|'confirming'|'analyzing'
  const [resolved, setResolved]   = useState(null)         // { companyName, domain, orgNr, confidence, source }
  const [error, setError]         = useState('')
  const [currentStep, setCurrentStep]     = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])

  const router = useRouter()
  const STEPS = mode === 'project' ? STEPS_PROJECT : STEPS_COMPANY

  // ── Resolver step (company mode only) ───────────────────────────────────────
  async function handleCompanySubmit(e) {
    e.preventDefault()
    if (!input.trim()) return
    setError('')
    setStage('resolving')

    try {
      const res = await fetch('/api/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: input.trim() }),
      })
      const data = await res.json()

      if (!res.ok || data.error) {
        // Resolver failed — ask user to clarify
        setError(data.error === 'Could not identify company'
          ? 'We couldn\'t find that company. Try entering their website domain (e.g. apotek1.no).'
          : 'Could not look up company. Please try again.')
        setStage('input')
        return
      }

      setResolved(data)
      setStage('confirming')
    } catch {
      setError('Could not connect. Please try again.')
      setStage('input')
    }
  }

  // ── Full analysis (after confirmation, or project mode) ──────────────────────
  async function startAnalysis(resolvedData) {
    setError('')
    setStage('analyzing')
    setCurrentStep(0)
    setCompletedSteps([])

    let body
    if (mode === 'project') {
      body = { mode: 'project', description: description.trim() }
    } else {
      body = {
        domain: resolvedData.domain || '',
        confirmedCompanyName: resolvedData.companyName,
        confirmedOrgNr: resolvedData.orgNr || null,
        confirmedDomain: resolvedData.domain || '',
      }
    }

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Analysis failed. Please try again.')
        setStage('confirming')
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop()

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          let event
          try { event = JSON.parse(line.slice(6)) } catch { continue }

          if (event.type === 'step') {
            setCompletedSteps(prev => {
              const next = []
              for (let i = 0; i < event.step; i++) {
                if (!prev.includes(i)) next.push(i)
              }
              return [...prev, ...next]
            })
            setCurrentStep(event.step)
          }

          if (event.type === 'done') {
            setCompletedSteps([0, 1, 2, 3, 4])
            await new Promise(r => setTimeout(r, 300))
            router.push(`/analysis/${event.slug}?mode=${mode}`)
            return
          }

          if (event.type === 'error') {
            setError(event.message || 'Analysis failed. Please try again.')
            setStage(mode === 'project' ? 'input' : 'confirming')
            return
          }
        }
      }
    } catch {
      setError('Could not connect. Please try again.')
      setStage(mode === 'project' ? 'input' : 'confirming')
    }
  }

  // ── Resolving spinner ────────────────────────────────────────────────────────
  if (stage === 'resolving') {
    return (
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" />
          <div className="text-sm font-medium text-white/80">Looking up company…</div>
        </div>
      </div>
    )
  }

  // ── Confirmation screen ──────────────────────────────────────────────────────
  if (stage === 'confirming' && resolved) {
    const badge = CONFIDENCE_BADGE[resolved.confidence] || CONFIDENCE_BADGE.medium

    return (
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-left">
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
              background: 'rgba(26,158,138,0.25)', border: '1.5px solid rgba(26,158,138,0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a9e8a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              We found
            </span>
          </div>

          {/* Company card */}
          <div style={{
            background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '14px 16px',
            border: '1px solid rgba(255,255,255,0.12)', marginBottom: 16,
          }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', marginBottom: 4, lineHeight: 1.2 }}>
              {resolved.companyName}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {resolved.domain && (
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', fontFamily: 'monospace' }}>
                  {resolved.domain}
                </span>
              )}
              <span style={{
                fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 99,
                background: badge.bg, color: badge.color, border: `1px solid ${badge.border}`,
                letterSpacing: '0.06em', textTransform: 'uppercase',
              }}>
                {badge.label}
              </span>
            </div>
          </div>

          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>
            Is this the right company?
          </p>

          {error && (
            <div style={{ fontSize: 12, color: '#fca5a5', marginBottom: 12 }}>{error}</div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button
              onClick={() => startAnalysis(resolved)}
              style={{
                width: '100%', padding: '14px 0', borderRadius: 12,
                background: '#1a9e8a', color: '#fff', fontWeight: 700,
                fontSize: 14, border: 'none', cursor: 'pointer',
              }}
            >
              Yes, analyze →
            </button>
            <button
              onClick={() => { setStage('input'); setResolved(null); setError('') }}
              style={{
                width: '100%', padding: '11px 0', borderRadius: 12,
                background: 'transparent', color: 'rgba(255,255,255,0.5)',
                fontWeight: 600, fontSize: 13, border: '1.5px solid rgba(255,255,255,0.15)',
                cursor: 'pointer',
              }}
            >
              No, try again
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Analyzing progress ───────────────────────────────────────────────────────
  if (stage === 'analyzing') {
    const label = mode === 'project'
      ? (description.split(/[.!?\n]/)[0] || 'your project').trim().slice(0, 40)
      : resolved?.companyName || input

    return (
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-left">
          <div className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">
            Analysing {label}
          </div>
          <div className="space-y-3">
            {STEPS.map((step, i) => {
              const done = completedSteps.includes(i)
              const active = currentStep === i
              return (
                <div key={i} className={`flex items-center gap-3 transition-opacity duration-300 ${!done && !active ? 'opacity-30' : 'opacity-100'}`}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: done ? '#1a9e8a' : active ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)',
                      border: `1.5px solid ${done ? '#1a9e8a' : active ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)'}`,
                    }}>
                    {done
                      ? <span style={{ fontSize: 10, color: '#fff' }}>✓</span>
                      : active
                        ? <span className="inline-block w-2.5 h-2.5 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                        : null}
                  </div>
                  <span className={`text-sm font-medium ${done ? 'text-white/80' : active ? 'text-white' : 'text-white/40'}`}>
                    {step}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
        {error && <div className="mt-3 text-sm text-red-300 text-center">{error}</div>}
      </div>
    )
  }

  // ── Input form ───────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Tab switcher */}
      <div className="flex gap-1 bg-white/10 backdrop-blur rounded-xl p-1 mb-3">
        <button
          type="button"
          onClick={() => { setMode('company'); setError('') }}
          className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
          style={{
            background: mode === 'company' ? '#fff' : 'transparent',
            color: mode === 'company' ? '#0f172a' : 'rgba(255,255,255,0.6)',
          }}
        >
          Company
        </button>
        <button
          type="button"
          onClick={() => { setMode('project'); setError('') }}
          className="flex-1 py-2 rounded-lg text-sm font-semibold transition-all"
          style={{
            background: mode === 'project' ? '#fff' : 'transparent',
            color: mode === 'project' ? '#0f172a' : 'rgba(255,255,255,0.6)',
          }}
        >
          Project
        </button>
      </div>

      <form onSubmit={mode === 'company' ? handleCompanySubmit : e => { e.preventDefault(); startAnalysis(null) }}>
        <div className="flex flex-col gap-2 bg-white/10 backdrop-blur rounded-2xl p-2">
          {mode === 'company' ? (
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="apotek1.no or Apotek 1 Gruppen"
              className="flex-1 bg-white text-navy placeholder-slate-400 rounded-xl px-5 py-4 text-base font-medium outline-none shadow-sm"
            />
          ) : (
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder={'Describe your project in one sentence — e.g. "Launching a new logistics platform for Nordic SMBs"'}
              rows={3}
              className="flex-1 bg-white text-navy placeholder-slate-400 rounded-xl px-5 py-4 text-base font-medium outline-none shadow-sm resize-none"
            />
          )}
          <button
            type="submit"
            disabled={mode === 'company' ? !input.trim() : !description.trim()}
            className="bg-teal hover:bg-teal-dark text-white font-bold px-7 py-4 rounded-xl transition-colors whitespace-nowrap shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mode === 'company' ? 'Generate company risk picture →' : 'Generate project risk picture →'}
          </button>
        </div>
        {error && <div className="mt-2 text-sm text-red-300 text-center">{error}</div>}
      </form>
      <div className="flex items-center justify-center gap-5 mt-4 text-sm text-white/50">
        <span>&#9201; 30 seconds</span>
        <span>&middot;</span>
        <span>No signup needed</span>
        <span>&middot;</span>
        <span>Your data stays private</span>
      </div>
    </div>
  )
}
