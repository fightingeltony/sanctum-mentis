import type { Metadata, Viewport } from 'next'
import { Marcellus_SC, Inter } from 'next/font/google'
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

export const metadata: Metadata = {
  title: 'Sanctum Mentis',
  description: 'Lerne Philosophie auf deinem Tempo — ein Komplexitäts-Slider steuert die Tiefe.',
}

export const viewport: Viewport = {
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${marcellusSC.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
