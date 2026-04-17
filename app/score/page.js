'use client'
import { useState, useEffect, useRef } from 'react'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

const APP_URL = 'https://app.deriskmatrix.com'

const QUESTIONS = [
  {
    id: 'goal_structure',
    icon: '🎯',
    label: 'How do you define strategic goals?',
    sublabel: 'Think about how your most important goals are documented.',
    options: [
      { value: 0, text: 'Single target numbers — we aim for a specific number' },
      { value: 1, text: 'Informal ranges — "around 50M, give or take"' },
      { value: 2, text: 'Formal target + a minimum acceptable threshold per goal' },
      { value: 3, text: 'Structured spans with evidence tracking and regular forecast updates' },
    ],
  },
  {
    id: 'risk_response',
    icon: '⚡',
    label: 'How fast do you catch underperforming goals?',
    sublabel: 'Be honest — when do leaders actually know something is off track?',
    options: [
      { value: 0, text: 'When results are published — usually too late to act' },
      { value: 1, text: 'In quarterly reviews, after the fact' },
      { value: 2, text: 'Monthly tracking with defined response per goal' },
      { value: 3, text: 'Continuously — we have a structured risk state per goal with defined actions' },
    ],
  },
  {
    id: 'data_quality',
    icon: '📊',
    label: 'What actually drives your strategic decisions?',
    sublabel: 'Think about the last time a major strategic decision was made.',
    options: [
      { value: 0, text: 'Gut feel and leadership experience' },
      { value: 1, text: 'Some reporting, but inconsistent across goals' },
      { value: 2, text: 'Regular data for most goals, with some gaps' },
      { value: 3, text: 'Rich evidence base with forecasting models per goal' },
    ],
  },
  {
    id: 'culture',
    icon: '🏛️',
    label: 'How openly does your leadership talk about strategic risk?',
    sublabel: 'Culture is the primary barrier to goal achievement.',
    options: [
      { value: 0, text: 'We avoid it — failure isn\'t openly discussed' },
      { value: 1, text: 'Risk is raised when problems become unavoidable' },
      { value: 2, text: 'Risk is a standing agenda item in leadership meetings' },
      { value: 3, text: 'Risk awareness is embedded in everyday decision-making' },
    ],
  },
  {
    id: 'forecast',
    icon: '🔭',
    label: 'How far ahead can you see goal outcomes?',
    sublabel: 'Risk is the effect of uncertainty — forecasting reduces it.',
    options: [
      { value: 0, text: 'We don\'t forecast — we report actuals after the fact' },
      { value: 1, text: 'End-of-year estimates when the board asks' },
      { value: 2, text: 'Regular updated forecasts for major goals' },
      { value: 3, text: 'Predictive models with confidence levels and scenario planning' },
    ],
  },
]

const BANDS = [
  { min: 80, label: 'Fully de-risked',  color: '#1a9e8a', bg: '#d5f5e3', emoji: '🟢', desc: 'Your organization has a mature, structured approach to goal-based risk management. You\'re operating close to best practice — the question now is whether you\'re raising the bar.' },
  { min: 60, label: 'Well managed',     color: '#2ab09a', bg: '#d1f2eb', emoji: '🟢', desc: 'Strong foundations in place. There are gaps to close, but your leadership team has meaningful visibility into strategic risk. You\'re ahead of most organizations.' },
  { min: 40, label: 'Building',         color: '#1d4ed8', bg: '#eff6ff', emoji: '🔵', desc: 'You\'ve made progress, but key elements are missing — especially structured thresholds and systematic forecasting. Strategic surprises are still common.' },
  { min: 20, label: 'Significant gaps', color: '#ea580c', bg: '#fff7ed', emoji: '🟠', desc: 'Risk is largely reactive. Important strategic decisions are being made without sufficient visibility or structure. Preventable misses are happening regularly.' },
  { min: 0,  label: 'Critical',         color: '#c0392b', bg: '#fadbd8', emoji: '🔴', desc: 'Strategic risk is not being managed systematically. Your organization is exposed to preventable surprises — and the next one may be costly.' },
]

const IMPROVEMENTS = {
  goal_structure: 'Define a threshold for every goal — not just a target. The span between them is your explicit risk appetite.',
  risk_response:  'Build a response protocol per risk state. When a goal turns Dire, everyone should know exactly what to do.',
  data_quality:   'Start collecting data regularly for your top 5 goals. Evidence strength is what separates a real forecast from a guess.',
  culture:        'Make risk a standing agenda item. Leaders who avoid discussing failure are flying blind.',
  forecast:       'Move from reporting actuals to forecasting outcomes. Risk state should reflect where you\'re heading, not where you\'ve been.',
}

function getBand(score) {
  return BANDS.find(b => score >= b.min) || BANDS[BANDS.length - 1]
}

export default function ScorePage() {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const topRef = useRef(null)

  const allAnswered = QUESTIONS.every(q => answers[q.id] !== undefined)
  const answeredCount = Object.keys(answers).length
  const rawScore = Object.values(answers).reduce((s, v) => s + v, 0)
  const score = Math.round((rawScore / (QUESTIONS.length * 3)) * 100)
  const band = getBand(score)

  // Scroll to top when results appear
  useEffect(() => {
    if (submitted && topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [submitted])

  const improvements = submitted
    ? QUESTIONS.filter(q => (answers[q.id] || 0) < 2).map(q => ({
        label: q.label,
        tip: IMPROVEMENTS[q.id],
      }))
    : []

  return (
    <div className="min-h-screen bg-slate-50">
      <Nav />

      <div ref={topRef} className="pt-24 pb-20">

        {/* ── Hero header ─────────────────────────────────────────── */}
        {!submitted && (
          <div className="hero-gradient py-16 mb-10">
            <div className="max-w-2xl mx-auto px-6 text-center">
              <div className="inline-block bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-white/20">
                Free · 2 minutes · No sign-up required
              </div>
              <h1 className="text-5xl font-black text-white mb-4 leading-tight">
                How close to{' '}
                <span className="gradient-text">100</span>
                {' '}are you?
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed mb-4">
                Most organizations score below 40. Find out where you stand — and exactly what to fix first.
              </p>
              <div className="flex items-center justify-center gap-6 text-sm text-slate-400 mt-6">
                <span>5 questions</span>
                <span className="w-1 h-1 rounded-full bg-slate-600" />
                <span>Instant score</span>
                <span className="w-1 h-1 rounded-full bg-slate-600" />
                <span>Personalized gaps</span>
              </div>
            </div>
          </div>
        )}

        {/* ── Result hero ─────────────────────────────────────────── */}
        {submitted && (
          <div className="hero-gradient py-16 mb-10">
            <div className="max-w-2xl mx-auto px-6 text-center">
              <div className="text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">Your De-Risk Score</div>
              <div style={{ color: band.color }} className="text-9xl font-black mb-1 leading-none"
                   style={{ WebkitTextStroke: '2px ' + band.color, color: band.color }}>
                {score}
              </div>
              <div className="text-white text-3xl font-black mb-1">/ 100</div>
              <div style={{ background: band.color }} className="inline-block text-white text-sm font-bold px-5 py-2 rounded-full mt-3 mb-5">
                {band.emoji} {band.label}
              </div>

              {/* Score bar */}
              <div className="max-w-sm mx-auto">
                <div className="bg-white/10 rounded-full h-3 overflow-hidden">
                  <div
                    style={{ width: `${score}%`, background: band.color }}
                    className="h-full rounded-full"
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1.5">
                  <span>0</span>
                  <span className="text-slate-400">Critical</span>
                  <span className="text-slate-400">Building</span>
                  <span className="text-slate-400">Fully de-risked</span>
                  <span>100</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {!submitted ? (
          <div className="max-w-2xl mx-auto px-6">

            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-500 font-medium">{answeredCount} of {QUESTIONS.length} answered</span>
                <span className="text-teal font-semibold">{Math.round(answeredCount / QUESTIONS.length * 100)}%</span>
              </div>
              <div className="bg-slate-200 rounded-full h-1.5">
                <div
                  style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }}
                  className="h-full bg-teal rounded-full transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-6">
              {QUESTIONS.map((q, qi) => (
                <div
                  key={q.id}
                  className={`bg-white rounded-2xl overflow-hidden shadow-sm transition-all ${
                    answers[q.id] !== undefined ? 'ring-2 ring-teal/30' : ''
                  }`}
                >
                  {/* Question header */}
                  <div className="px-7 pt-6 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-2xl">{q.icon}</span>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Question {qi + 1}</span>
                      {answers[q.id] !== undefined && (
                        <span className="ml-auto text-teal text-xs font-semibold">✓ Answered</span>
                      )}
                    </div>
                    <h3 className="font-bold text-navy text-lg leading-snug">{q.label}</h3>
                    <p className="text-slate-400 text-sm mt-1">{q.sublabel}</p>
                  </div>

                  {/* Options */}
                  <div className="p-4 space-y-2">
                    {q.options.map((opt, oi) => (
                      <label
                        key={opt.value}
                        className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                          answers[q.id] === opt.value
                            ? 'bg-teal text-white shadow-md shadow-teal/20'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                          answers[q.id] === opt.value
                            ? 'border-white bg-white'
                            : 'border-slate-300'
                        }`}>
                          {answers[q.id] === opt.value && (
                            <div className="w-2 h-2 rounded-full bg-teal" />
                          )}
                        </div>
                        <div className="flex-1">
                          <span className={`text-xs font-bold uppercase tracking-wider mr-2 ${answers[q.id] === opt.value ? 'text-white/60' : 'text-slate-300'}`}>
                            {['A', 'B', 'C', 'D'][oi]}
                          </span>
                          <span className={`text-sm leading-relaxed ${answers[q.id] === opt.value ? 'text-white' : ''}`}>{opt.text}</span>
                        </div>
                        <input
                          type="radio"
                          name={q.id}
                          value={opt.value}
                          className="sr-only"
                          onChange={() => setAnswers(a => ({ ...a, [q.id]: opt.value }))}
                        />
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pb-8">
              <button
                disabled={!allAnswered}
                onClick={() => setSubmitted(true)}
                className={`w-full py-5 rounded-2xl font-black text-lg transition-all ${
                  allAnswered
                    ? 'bg-teal hover:bg-teal-dark text-white cursor-pointer shadow-xl shadow-teal/25'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {allAnswered ? 'Reveal my De-Risk Score →' : `Answer all ${QUESTIONS.length - answeredCount} remaining questions`}
              </button>
              {!allAnswered && (
                <p className="text-center text-slate-400 text-sm mt-3">
                  {answeredCount} of {QUESTIONS.length} answered
                </p>
              )}
            </div>
          </div>

        ) : (
          <div className="max-w-2xl mx-auto px-6 space-y-6">

            {/* Description */}
            <div style={{ background: band.bg, borderColor: band.color + '40' }} className="rounded-2xl p-6 border">
              <p className="text-slate-700 leading-relaxed">{band.desc}</p>
            </div>

            {/* Improvements */}
            {improvements.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-black text-navy text-lg mb-1">Your biggest gaps</h3>
                <p className="text-slate-400 text-sm mb-5">Fix these to push your score above {Math.min(score + 30, 100)}.</p>
                <div className="space-y-4">
                  {improvements.map((imp, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                      <div className="w-7 h-7 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-amber-600 text-xs">
                        {i + 1}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wide">{imp.label}</div>
                        <p className="text-sm text-slate-700 leading-relaxed">{imp.tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Score bands */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-navy mb-4">De-Risk Score scale</h3>
              <div className="space-y-2">
                {BANDS.map((b, i) => {
                  const isActive = score >= b.min && score < (BANDS[i - 1]?.min ?? 101)
                  return (
                    <div
                      key={b.label}
                      style={isActive ? { background: b.bg, borderColor: b.color } : {}}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border border-transparent text-sm transition-all ${isActive ? 'font-semibold' : 'text-slate-400'}`}
                    >
                      <div style={{ background: b.color }} className="w-2 h-2 rounded-full flex-shrink-0" />
                      <span style={isActive ? { color: b.color } : {}}>{b.label}</span>
                      <span className="ml-auto text-xs text-slate-300">
                        {b.min}–{(BANDS[i - 1]?.min ?? 101) - 1}
                      </span>
                      {isActive && <span style={{ color: b.color }} className="text-xs font-bold">← you</span>}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-navy rounded-2xl p-8 text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-white font-black text-2xl mb-2">
                Ready to push toward 100?
              </h3>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed max-w-md mx-auto">
                De-Risk Matrix gives you the structure, the risk states, and the tools to close every gap — in a single workspace. Free to start.
              </p>
              <a
                href={`${APP_URL}/register`}
                className="inline-block px-8 py-4 bg-teal hover:bg-teal-dark text-white font-bold rounded-xl transition-colors shadow-lg text-lg"
              >
                Get started free →
              </a>
              <p className="text-slate-500 text-xs mt-3">No credit card required</p>
            </div>

            <div className="text-center pb-4">
              <button
                onClick={() => { setAnswers({}); setSubmitted(false) }}
                className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
              >
                ← Retake the assessment
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
