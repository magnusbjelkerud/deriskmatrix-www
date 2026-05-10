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

export default function AnalyzeClient() {
  const router = useRouter()
  const [stage, setStage] = useState('input') // 'input' | 'analyzing'
  const [domain, setDomain] = useState('')
  const [error, setError] = useState('')
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])
  const [failedStep, setFailedStep] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    const cleaned = domain.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '').trim()
    if (!cleaned || cleaned.length < 3) { setError('Please enter a valid domain'); return }
    setError('')
    setStage('analyzing')
    setCurrentStep(0)
    setCompletedSteps([])
    setFailedStep(null)

    // Animate steps while API call happens
    let step = 0
    const stepInterval = setInterval(() => {
      if (step < STEPS.length - 1) {
        setCompletedSteps(prev => [...prev, step])
        step++
        setCurrentStep(step)
      }
    }, 1200)

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: cleaned }),
      })
      const data = await res.json()
      clearInterval(stepInterval)

      if (!res.ok || data.error) {
        setFailedStep(step)
        setError(data.error || 'Analysis failed. Please try again.')
        setStage('input')
        return
      }

      // Complete remaining steps quickly
      for (let i = step; i < STEPS.length; i++) {
        await new Promise(r => setTimeout(r, 300))
        setCompletedSteps(prev => [...prev, i])
        setCurrentStep(i + 1)
      }
      await new Promise(r => setTimeout(r, 400))
      router.push(`/analysis/${data.slug}`)
    } catch (err) {
      clearInterval(stepInterval)
      setFailedStep(step)
      setError('Could not connect. Please try again.')
      setStage('input')
    }
  }

  if (stage === 'analyzing') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="text-sm font-medium text-slate-400 mb-3">Analysing</div>
            <div className="text-2xl font-bold text-navy">{domain.replace(/^https?:\/\//, '').replace(/^www\./, '')}</div>
          </div>
          <div className="space-y-4">
            {STEPS.map((step, i) => {
              const done = completedSteps.includes(i)
              const active = currentStep === i
              const failed = failedStep === i
              return (
                <div key={i} className={`flex items-center gap-4 transition-all duration-500 ${!done && !active && !failed ? 'opacity-30' : 'opacity-100'}`}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{
                    background: failed ? '#fee2e2' : done ? '#d5f5e3' : active ? '#f0f9ff' : '#f1f5f9',
                    border: `2px solid ${failed ? '#c0392b' : done ? '#1a9e8a' : active ? '#3b82f6' : '#e2e8f0'}`
                  }}>
                    {failed ? <span className="text-xs text-red-600">&#x2715;</span>
                      : done ? <span className="text-xs text-teal">&#x2713;</span>
                      : active ? <span className="inline-block w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      : <span className="w-2 h-2 rounded-full bg-slate-300 block" />}
                  </div>
                  <span className={`text-sm font-medium ${done ? 'text-slate-700' : active ? 'text-navy' : 'text-slate-400'}`}>{step}</span>
                </div>
              )
            })}
          </div>
          {error && <div className="mt-8 text-sm text-red-600 text-center">{error}</div>}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero section */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #18394b 60%, #1a9e8a 100%)', paddingTop: '7rem', paddingBottom: '5rem' }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="inline-block text-xs font-semibold tracking-widest uppercase text-teal/80 mb-5 px-3 py-1 rounded-full border border-teal/30">
            Try it in 30 seconds &#8212; no signup
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
            See your first<br />risk picture
          </h1>
          <p className="text-lg text-white/70 mb-10 leading-relaxed">
            Enter your website. We suggest the goals, thresholds and risks that matter for your business.
          </p>

          {/* Input form */}
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur rounded-2xl p-2">
              <input
                type="text"
                value={domain}
                onChange={e => setDomain(e.target.value)}
                placeholder="yourcompany.com"
                className="flex-1 bg-white text-navy placeholder-slate-400 rounded-xl px-5 py-4 text-base font-medium outline-none shadow-sm"
                autoFocus
              />
              <button
                type="submit"
                className="bg-teal hover:bg-teal-dark text-white font-bold px-8 py-4 rounded-xl transition-colors whitespace-nowrap shadow-sm"
              >
                Analyse &#8594;
              </button>
            </div>
            {error && <div className="mt-3 text-sm text-red-300">{error}</div>}
          </form>

          {/* Trust signals */}
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-white/50">
            <span>&#9200; 30 seconds</span>
            <span>&#183;</span>
            <span>No signup needed</span>
            <span>&#183;</span>
            <span>Your data stays private</span>
          </div>
        </div>
      </div>

      {/* How it works section */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold text-center text-navy mb-12">How it works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: '1', title: 'Enter your website', desc: 'We read your homepage and identify your industry, business model, and size.' },
            { n: '2', title: 'AI maps your goals', desc: 'We suggest 7 goals with targets, thresholds, and predicted risk states based on industry benchmarks.' },
            { n: '3', title: 'See your risk picture', desc: 'Three goals fully revealed. Start your trial to see all 7 — pre-filled into the app.' },
          ].map(s => (
            <div key={s.n} className="text-center">
              <div className="w-10 h-10 rounded-full text-white font-bold text-lg flex items-center justify-center mx-auto mb-4" style={{ background: '#1a9e8a' }}>{s.n}</div>
              <h3 className="font-bold text-navy mb-2">{s.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
