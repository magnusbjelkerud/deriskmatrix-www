import './globals.css'
import CookieBanner from '../components/CookieBanner'

export const metadata = {
  title: 'De-Risk Matrix — Know which goals are at risk before it\'s too late',
  description: 'De-Risk Matrix gives every strategic goal a live risk state — so your leadership team acts before the quarterly review surprise. AI-powered. ISO 31000 aligned.',
  keywords: 'goal risk management, strategic goal tracking, live risk states, ISO 31000, goal health monitoring, at-risk goals, early warning goals, OKR risk',
  openGraph: {
    title: 'De-Risk Matrix — Know which goals are at risk',
    description: 'Every goal gets a live risk state. See which goals need attention — before the quarterly surprise.',
    url: 'https://www.deriskmatrix.com',
    siteName: 'De-Risk Matrix',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </head>
      <body>{children}<CookieBanner /></body>
    </html>
  )
}
