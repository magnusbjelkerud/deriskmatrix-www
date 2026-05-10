import AnalyzeClient from './AnalyzeClient'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Analyse your risk picture — De-Risk Matrix',
  description: 'Enter your website. In 30 seconds, see a suggested risk picture for your business — goals, thresholds, and predicted risk states. No signup needed.',
  openGraph: {
    title: 'See your risk picture in 30 seconds',
    description: 'Enter your website. We suggest the goals, thresholds and risks that matter for your business.',
    url: 'https://www.deriskmatrix.com/analyze',
  },
}

export default function AnalyzePage() {
  return (
    <>
      <Nav />
      <AnalyzeClient />
      <Footer />
    </>
  )
}
