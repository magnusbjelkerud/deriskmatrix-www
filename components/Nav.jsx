'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const APP_URL = 'https://app.deriskmatrix.com'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={scrolled ? '/images/logo-pos.svg' : '/images/logo-neg.svg'}
            alt="De-Risk Matrix"
            width={160}
            height={36}
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/methodology" className={`text-sm font-medium hover:text-teal transition-colors ${scrolled ? 'text-slate-600' : 'text-white/80'}`}>
            Methodology
          </Link>
          <Link href="/score" className={`text-sm font-medium hover:text-teal transition-colors ${scrolled ? 'text-slate-600' : 'text-white/80'}`}>
            De-Risk Score
          </Link>
          <Link href="/about" className={`text-sm font-medium hover:text-teal transition-colors ${scrolled ? 'text-slate-600' : 'text-white/80'}`}>
            About
          </Link>
        </div>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={`${APP_URL}/login`}
            className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
              scrolled ? 'text-navy hover:text-teal' : 'text-white/90 hover:text-white'
            }`}
          >
            Log in
          </a>
          <a
            href={`${APP_URL}/register`}
            className="text-sm font-semibold px-5 py-2 bg-teal hover:bg-teal-dark text-white rounded-lg transition-colors shadow-sm"
          >
            Start your trial
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className={`md:hidden p-2 ${scrolled ? 'text-navy' : 'text-white'}`}
          onClick={() => setOpen(!open)}
        >
          <div className="w-5 h-0.5 bg-current mb-1" />
          <div className="w-5 h-0.5 bg-current mb-1" />
          <div className="w-5 h-0.5 bg-current" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-4">
          <Link href="/methodology" className="text-sm font-medium text-slate-700" onClick={() => setOpen(false)}>Methodology</Link>
          <Link href="/score" className="text-sm font-medium text-slate-700" onClick={() => setOpen(false)}>De-Risk Score</Link>
          <Link href="/about" className="text-sm font-medium text-slate-700" onClick={() => setOpen(false)}>About</Link>
          <hr className="border-slate-100" />
          <a href={`${APP_URL}/login`} className="text-sm font-medium text-slate-700">Log in</a>
          <a href={`${APP_URL}/register`} className="text-sm font-semibold text-white bg-teal px-4 py-2.5 rounded-lg text-center">
            Start your trial
          </a>
        </div>
      )}
    </nav>
  )
}
