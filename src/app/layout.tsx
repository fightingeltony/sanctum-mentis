import type { Metadata, Viewport } from 'next'
import { Marcellus_SC, Inter } from 'next/font/google'
import ShellCommandPaletteProvider from '@/components/ShellCommandPaletteProvider'
import './globals.css'

const marcellusSC = Marcellus_SC({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-display',
})

const inter = Inter({
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-ui',
})

const BASE_URL = 'https://sanctum-mentis.vercel.app'
const DESCRIPTION = 'Eine Bibliothek der großen Fragen — Kontext, der hilft, ein Thema zu Ende zu denken.'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default:  'Sanctum Mentis',
    template: '%s | Sanctum Mentis',
  },
  description: DESCRIPTION,
  openGraph: {
    title:       'Sanctum Mentis',
    description: DESCRIPTION,
    url:         BASE_URL,
    siteName:    'Sanctum Mentis',
    locale:      'de_DE',
    type:        'website',
    images: [
      {
        url:    '/og-image',
        width:  1200,
        height: 630,
        alt:    'Sanctum Mentis — Eine Bibliothek der großen Fragen',
      },
    ],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Sanctum Mentis',
    description: DESCRIPTION,
    images:      ['/og-image'],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${marcellusSC.variable} ${inter.variable}`}>
      <body>
        <ShellCommandPaletteProvider>
          {children}
        </ShellCommandPaletteProvider>
      </body>
    </html>
  )
}
