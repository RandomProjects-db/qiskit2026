import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
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
      className={`${spaceGrotesk.variable} ${inter.variable} bg-background scroll-smooth`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
