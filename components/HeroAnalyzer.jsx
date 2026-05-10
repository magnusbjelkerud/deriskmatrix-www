'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const STEPS = [
  'Reading website',
  'Identifying industry and business model',
  'Mapping typical goals for your sector',
  'Suggesting thresholds and risk states',
  'Generating recommended actions',
]

export default function HeroAnalyzer() {
  const [domain, setDomain] = useState('')
  const [stage, setStage] = useState('input') // 'input' | 'analyzing'
  const [error, setError] = useState('')
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])

  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    const cleaned = domain.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '').trim()
    if (!cleaned || cleaned.length < 3) { setError('Please enter a valid domain'); return }
    setError('')
    setStage('analyzing')
    setCurrentStep(0)
    setCompletedSteps([])

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: cleaned }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Analysis failed. Please try again.')
        setStage('input')
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
            router.push(`/analysis/${event.slug}`)
            return
          }

          if (event.type === 'error') {
            setError(event.message || 'Analysis failed. Please try again.')
            setStage('input')
            return
          }
        }
      }
    } catch {
      setError('Could not connect. Please try again.')
      setStage('input')
    }
  }

  if (stage === 'analyzing') {
    return (
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white/10 backdrop-blur rounded-2xl p-6 text-left">
          <div className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-4">
            Analysing {domain.replace(/^https?:\/\//, '').replace(/^www\./, '')}
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

  return (
    <div className="w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-2 bg-white/10 backdrop-blur rounded-2xl p-2">
          <input
            type="text"
            value={domain}
            onChange={e => setDomain(e.target.value)}
            placeholder="yourcompany.com"
            className="flex-1 bg-white text-navy placeholder-slate-400 rounded-xl px-5 py-4 text-base font-medium outline-none shadow-sm"
          />
          <button
            type="submit"
            className="bg-teal hover:bg-teal-dark text-white font-bold px-7 py-4 rounded-xl transition-colors whitespace-nowrap shadow-sm"
          >
            See your risk picture →
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
