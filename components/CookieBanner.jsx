'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookie-notice')) setVisible(true)
  }, [])

  function dismiss() {
    localStorage.setItem('cookie-notice', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-4xl mx-auto bg-navy border border-slate-700 rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xl">
        <p className="text-slate-300 text-sm leading-relaxed">
          We use only strictly necessary cookies for authentication and session management.
          No tracking or advertising cookies.{' '}
          <Link href="/privacy" className="text-teal underline hover:text-teal/80">Privacy policy</Link>
        </p>
        <button
          onClick={dismiss}
          className="flex-shrink-0 px-5 py-2 bg-teal hover:bg-teal/90 text-white font-bold text-sm rounded-xl transition-colors whitespace-nowrap"
        >
          Got it
        </button>
      </div>
    </div>
  )
}
