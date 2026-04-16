import type { Metadata } from 'next'
import { Geist, Geist_Mono, Amiri, IBM_Plex_Sans_Arabic } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });
const _ibmPlexArabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: 'Al-Quran - The Holy Quran',
  description: 'Read the Holy Quran with Arabic text, translations, and powerful search. Beautiful interface for Quranic studies.',
  generator: 'v0.app',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${_geist.className} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
