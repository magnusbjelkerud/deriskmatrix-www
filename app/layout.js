import './globals.css'

export const metadata = {
  title: 'De-Risk Matrix — Strategic Goal & Risk Management',
  description: 'Your choice of goals is your choice of risk. De-Risk Matrix turns strategic goals into measurable risk states — so you can act before it\'s too late.',
  keywords: 'risk management, strategic goals, OKR, ISO 31000, risk matrix, goal tracking',
  openGraph: {
    title: 'De-Risk Matrix',
    description: 'Your choice of goals is your choice of risk.',
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
      <body>{children}</body>
    </html>
  )
}
