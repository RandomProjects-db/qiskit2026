import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter, Intel_One_Mono, Newsreader } from 'next/font/google'
import { ParticleBackground } from '@/components/particle-background'
import { BackToTop } from '@/components/back-to-top'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

// Monospace for small labels, times, and tags (technical feel).
const intelOneMono = Intel_One_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono-label',
  display: 'swap',
})

// Refined editorial serif for speaker and team member names.
const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-name',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Qiskit Fall Fest 2026 | NC A&T State University',
  description:
    'Join NC A&T State University for Qiskit Fall Fest 2026 — a hybrid quantum computing event featuring workshops, networking, and competitions. Open to all skill levels.',
  generator: 'v0.app',
  keywords: [
    'Qiskit',
    'Fall Fest',
    'quantum computing',
    'NC A&T',
    'North Carolina A&T',
    'IBM Quantum',
    'hackathon',
    'workshop',
  ],
  openGraph: {
    title: 'Qiskit Fall Fest 2026 | NC A&T State University',
    description:
      'A hybrid quantum computing event featuring workshops, networking, and competitions. Open to all skill levels.',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#1B365D',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${intelOneMono.variable} ${newsreader.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased bg-[#060914]">
        {/* Persistent particle background, fixed behind all content (z-0). */}
        <ParticleBackground />
        {/* All page content sits above the canvas. */}
        <div className="relative z-10">{children}</div>
        <BackToTop />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
