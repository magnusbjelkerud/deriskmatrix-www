'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HeroAnalyzer() {
  const [domain, setDomain] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    const cleaned = domain.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '').trim()
    if (!cleaned || cleaned.length < 3) { setError('Please enter a valid domain'); return }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: cleaned }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Analysis failed. Please try again.')
        setLoading(false)
        return
      }

      // API returns SSE — read stream and wait for done event
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

          if (event.type === 'done') {
            router.push(`/analysis/${event.slug}`)
            return
          }
          if (event.type === 'error') {
            setError(event.message || 'Analysis failed. Please try again.')
            setLoading(false)
            return
          }
        }
      }
    } catch {
      setError('Could not connect. Please try again.')
      setLoading(false)
    }
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
            disabled={loading}
            className="flex-1 bg-white text-navy placeholder-slate-400 rounded-xl px-5 py-4 text-base font-medium outline-none shadow-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-teal hover:bg-teal-dark disabled:opacity-60 text-white font-bold px-7 py-4 rounded-xl transition-colors whitespace-nowrap shadow-sm"
          >
            {loading ? 'Analysing…' : 'See your risk picture →'}
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
