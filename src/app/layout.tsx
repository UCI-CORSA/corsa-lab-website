import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'

import { NavBar } from '@/components/NavBar'
import { Footer } from '@/components/Footer'
import GlobalStyles from '@/app/GlobalStyles'
import EmotionRegistry from '@/app/EmotionRegistry'

const notoSans = Noto_Sans({ subsets: ['latin'], weight: ['400', '700'] })

const description =
  'CORSA Lab (Compiler Optimizations, Reconfigurable and Scalable Architectures) is a research group in the Department of EECS, School of Engineering at UC Irvine, working on hardware acceleration systems, compiler and programming language design, computer architecture, and machine learning model compression.'

export const metadata: Metadata = {
  title: 'CORSA Lab',
  description,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'CORSA Lab',
    description,
    url: 'https://corsa.eng.uci.edu',
    // TODO: add a real CORSA Lab preview image once one is available
    type: 'website',
  },
}

// TODO: add a CORSA Lab Google Analytics ID via <GoogleAnalytics gaId="..." /> from '@next/third-parties/google' once available
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={notoSans.className}>
        <EmotionRegistry>
          <GlobalStyles />
          <NavBar />
          {children}
          <Footer />
        </EmotionRegistry>
      </body>
    </html>
  )
}
