import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CartDrawer } from '@/components/layout/CartDrawer'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://himalayantrader.com',
  ),
  title: {
    default: 'HimalayanTrader — Specialty Green Coffee from Nepal',
    template: '%s | HimalayanTrader',
  },
  description:
    'Direct-trade unroasted green coffee beans sourced from small-lot farmers in Nepal. Full lot traceability, farmer profiles, and B2B wholesale. Ship-ready specialty coffee from 1,400–2,200m altitude.',
  keywords: [
    'Nepal green coffee',
    'specialty green coffee beans',
    'unroasted coffee Nepal',
    'direct trade coffee',
    'Himalayan coffee',
    'Nepal single origin',
    'green coffee wholesale',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://himalayantrader.com',
    siteName: 'HimalayanTrader',
    title: 'HimalayanTrader — Specialty Green Coffee from Nepal',
    description:
      "Direct-trade unroasted green coffee from Nepal's finest small-lot farmers. Full lot traceability.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HimalayanTrader — Nepal green coffee',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HimalayanTrader — Specialty Green Coffee from Nepal',
    description: "Direct-trade green coffee from Nepal's finest small-lot farms.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <CartDrawer />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
