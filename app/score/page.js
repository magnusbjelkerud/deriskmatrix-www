'use client'
import { useState } from 'react'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

const APP_URL = 'https://app.deriskmatrix.com'

const QUESTIONS = [
  {
    id: 'goal_structure',
    label: 'How do you currently define strategic goals?',
    options: [
      { value: 0, text: 'Single target numbers — we aim for a specific number' },
      { value: 1, text: 'Targets with informal ranges — "around 50M, give or take"' },
      { value: 2, text: 'Formal target + a minimum acceptable threshold for each goal' },
      { value: 3, text: 'Structured spans with evidence tracking and regular updates' },
    ],
  },
  {
    id: 'risk_response',
    label: 'How do you handle underperforming goals?',
    options: [
      { value: 0, text: 'We notice when the results are published — usually too late' },
      { value: 1, text: 'We discuss in quarterly reviews and adjust plans' },
      { value: 2, text: 'Monthly tracking with defined response protocols per goal' },
      { value: 3, text: 'A structured risk state framework with defined actions per state' },
    ],
  },
  {
    id: 'data_quality',
    label: 'What drives your strategic decisions?',
    options: [
      { value: 0, text: 'Mostly gut feel and leadership experience' },
      { value: 1, text: 'Some reporting, but inconsistent across goals' },
      { value: 2, text: 'Regular data collection for most strategic goals' },
      { value: 3, text: 'Rich evidence base with forecasting models per goal' },
    ],
  },
  {
    id: 'culture',
    label: 'How does your organization talk about strategic risk?',
    options: [
      { value: 0, text: 'We avoid open discussions about failure or underperformance' },
      { value: 1, text: 'Risk is raised when problems become unavoidable' },
      { value: 2, text: 'Risk is a standing agenda item in leadership meetings' },
      { value: 3, text: 'Risk awareness is embedded in day-to-day decision culture' },
    ],
  },
  {
    id: 'forecast',
    label: 'How far ahead do you anticipate goal outcomes?',
    options: [
      { value: 0, text: 'We report on actuals — forecasting isn\'t part of our process' },
      { value: 1, text: 'End-of-year estimates when the board asks' },
      { value: 2, text: 'Regular updated forecasts for all major goals' },
      { value: 3, text: 'Predictive models with confidence levels and scenario planning' },
    ],
  },
]

const BANDS = [
  { min: 80, label: 'Fully de-risked',   color: '#1a9e8a', bg: '#d5f5e3', desc: 'Your organization has a mature, structured approach to goal-based risk management. You\'re operating close to best practice.' },
  { min: 60, label: 'Well managed',      color: '#2ab09a', bg: '#d1f2eb', desc: 'Strong foundations in place. There are gaps to close, but your leadership team has meaningful visibility into strategic risk.' },
  { min: 40, label: 'Building',          color: '#1d4ed8', bg: '#eff6ff', desc: 'You\'ve made progress but key elements are missing — especially structured thresholds and systematic forecasting.' },
  { min: 20, label: 'Significant gaps',  color: '#ea580c', bg: '#fff7ed', desc: 'Risk is largely reactive. Important strategic decisions are being made without sufficient visibility or structure.' },
  { min: 0,  label: 'Critical',          color: '#c0392b', bg: '#fadbd8', desc: 'Strategic risk is not being managed systematically. Your organization is exposed to preventable surprises.' },
]

function getBand(score) {
  return BANDS.find(b => score >= b.min) || BANDS[BANDS.length - 1]
}

export default function ScorePage() {
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = QUESTIONS.every(q => answers[q.id] !== undefined)
  const rawScore = Object.values(answers).reduce((s, v) => s + v, 0)
  const score = Math.round((rawScore / (QUESTIONS.length * 3)) * 100)
  const band = getBand(score)

  const IMPROVEMENTS = {
    goal_structure: { low: 'Define a threshold for every goal — not just a target. The gap between them is your risk appetite.', high: null },
    risk_response:  { low: 'Create a structured response protocol per risk state. When a goal turns Dire, everyone should know what to do.', high: null },
    data_quality:   { low: 'Start collecting data regularly for your top 5 goals. Evidence strength is what separates a good forecast from a guess.', high: null },
    culture:        { low: 'Make risk a standing agenda item. Leaders who avoid discussing failure create blind spots.', high: null },
    forecast:       { low: 'Move from reporting actuals to forecasting outcomes. Risk state should be determined by where you\'re heading, not where you\'ve been.', high: null },
  }

  const improvements = submitted
    ? QUESTIONS.filter(q => (answers[q.id] || 0) < 2).map(q => ({
        label: q.label,
        tip: IMPROVEMENTS[q.id].low,
      }))
    : []

  return (
    <div className="min-h-screen bg-slate-50">
      <Nav />

      <div className="pt-24 pb-20">
        {/* Header */}
        <div className="max-w-2xl mx-auto px-6 text-center mb-12">
          <div className="inline-block bg-teal-light text-teal text-xs font-semibold px-3 py-1 rounded-full mb-4 border border-teal/20">
            Free assessment
          </div>
          <h1 className="text-4xl font-black text-navy mb-4">Your De-Risk Score</h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Answer 5 questions to see how well your organization manages strategic risk — and where the biggest gaps are.
          </p>
        </div>

        {!submitted ? (
          <div className="max-w-2xl mx-auto px-6 space-y-8">
            {QUESTIONS.map((q, qi) => (
              <div key={q.id} className="bg-white rounded-2xl p-7 shadow-sm">
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-7 h-7 rounded-full bg-navy text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {qi + 1}
                  </div>
                  <h3 className="font-semibold text-navy text-base leading-snug">{q.label}</h3>
                </div>
                <div className="space-y-3">
                  {q.options.map(opt => (
                    <label
                      key={opt.value}
                      className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                        answers[q.id] === opt.value
                          ? 'border-teal bg-teal-light/40'
                          : 'border-slate-200 hover:border-teal/40 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 transition-colors ${
                        answers[q.id] === opt.value
                          ? 'border-teal bg-teal'
                          : 'border-slate-300'
                      }`} />
                      <span className="text-sm text-slate-700 leading-relaxed">{opt.text}</span>
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

            <div className="flex justify-center pb-8">
              <button
                disabled={!allAnswered}
                onClick={() => setSubmitted(true)}
                className={`px-10 py-4 rounded-xl font-bold text-white transition-all shadow-lg ${
                  allAnswered
                    ? 'bg-teal hover:bg-teal-dark cursor-pointer shadow-teal/20'
                    : 'bg-slate-300 cursor-not-allowed'
                }`}
              >
                Calculate my De-Risk Score →
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto px-6 space-y-8">
            {/* Score result */}
            <div style={{ background: band.bg, borderColor: band.color + '50' }} className="rounded-2xl p-8 border text-center">
              <div className="text-sm font-semibold text-slate-500 mb-2 uppercase tracking-wider">Your De-Risk Score</div>
              <div style={{ color: band.color }} className="text-8xl font-black mb-2">{score}</div>
              <div style={{ color: band.color, background: band.color + '15' }} className="inline-block text-lg font-bold px-5 py-2 rounded-full mb-4">
                {band.label}
              </div>
              <p className="text-slate-600 leading-relaxed max-w-lg mx-auto">{band.desc}</p>

              {/* Score bar */}
              <div className="mt-6 bg-white/60 rounded-full h-3 overflow-hidden max-w-sm mx-auto">
                <div
                  style={{ width: `${score}%`, background: band.color }}
                  className="h-full rounded-full transition-all duration-1000"
                />
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                <span>0</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100</span>
              </div>
            </div>

            {/* Score bands reference */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-navy mb-4">De-Risk Score bands</h3>
              <div className="space-y-2">
                {BANDS.map(b => (
                  <div
                    key={b.label}
                    style={score >= b.min && score < (BANDS[BANDS.indexOf(b) - 1]?.min ?? 101) ? { background: b.bg, borderColor: b.color } : {}}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border border-transparent text-sm ${
                      score >= b.min && score < (BANDS[BANDS.indexOf(b) - 1]?.min ?? 101) ? 'font-semibold' : 'text-slate-500'
                    }`}
                  >
                    <div style={{ background: b.color }} className="w-2 h-2 rounded-full flex-shrink-0" />
                    <span style={score >= b.min && score < (BANDS[BANDS.indexOf(b) - 1]?.min ?? 101) ? { color: b.color } : {}}>{b.label}</span>
                    <span className="ml-auto text-xs text-slate-400">
                      {b.min}–{BANDS[BANDS.indexOf(b) - 1]?.min - 1 ?? 100}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Improvements */}
            {improvements.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-navy mb-4">Where to focus next</h3>
                <div className="space-y-4">
                  {improvements.map((imp, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-amber-600 text-xs font-bold">!</span>
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-400 mb-0.5">{imp.label}</div>
                        <p className="text-sm text-slate-700 leading-relaxed">{imp.tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-navy rounded-2xl p-7 text-center">
              <h3 className="text-white font-bold text-xl mb-2">Start closing the gaps</h3>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                De-Risk Matrix gives you the structure, the risk states, and the tools to move your score upward — in real time.
              </p>
              <a
                href={`${APP_URL}/signup`}
                className="inline-block px-8 py-3.5 bg-teal hover:bg-teal-dark text-white font-bold rounded-xl transition-colors shadow-lg"
              >
                Get started free →
              </a>
            </div>

            <div className="text-center">
              <button
                onClick={() => { setAnswers({}); setSubmitted(false) }}
                className="text-sm text-slate-400 hover:text-slate-600 transition-colors"
              >
                ← Start over
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
