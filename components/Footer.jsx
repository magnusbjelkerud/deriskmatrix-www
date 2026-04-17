import Link from 'next/link'
import Image from 'next/image'

const APP_URL = 'https://app.deriskmatrix.com'

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <Image src="/images/logo-neg.svg" alt="De-Risk Matrix" width={160} height={36} />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              A methodology and platform for strategic goal & risk management. Aligned with ISO 31000.
            </p>
            <p className="text-slate-500 text-xs mt-4 italic">
              "Your choice of goals is your choice of risk."
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Product</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href={`${APP_URL}/register`} className="hover:text-white transition-colors">Start your trial</a></li>
              <li><a href={`${APP_URL}/login`} className="hover:text-white transition-colors">Log in</a></li>
              <li><Link href="/score" className="hover:text-white transition-colors">De-Risk Score</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link href="/methodology" className="hover:text-white transition-colors">Methodology</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Magnus</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} Magnus Bjelkerud. All rights reserved. Methodology free for use; commercial use requires agreement.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-teal inline-block" />
            Aligned with ISO 31000
          </div>
        </div>
      </div>
    </footer>
  )
}
