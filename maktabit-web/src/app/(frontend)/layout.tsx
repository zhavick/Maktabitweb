import type { Metadata } from 'next'
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google'
import React from 'react'

import { SiteAnalytics } from '@/components/analytics/SiteAnalytics'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3390'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'MaktabIT Technology — Solusi Rekayasa Perangkat Lunak & Inovasi Digital',
    template: '%s — MaktabIT Technology',
  },
  description:
    'PT. MaktabIT Technology — Software Engineering & Digital Product Studio. Merancang fondasi perangkat lunak yang presisi, skalabel, dan berdampak nyata.',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: siteUrl,
    siteName: 'MaktabIT Technology',
    title: 'MaktabIT Technology — Solusi Rekayasa Perangkat Lunak & Inovasi Digital',
    description:
      'Merancang fondasi perangkat lunak yang presisi, skalabel, dan berdampak nyata bagi transformasi digital masa depan.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MaktabIT Technology — Solusi Rekayasa Perangkat Lunak & Inovasi Digital',
    description:
      'Merancang fondasi perangkat lunak yang presisi, skalabel, dan berdampak nyata bagi transformasi digital masa depan.',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html
      lang="id"
      className={`scroll-smooth ${inter.variable} ${plusJakartaSans.variable} ${jetBrainsMono.variable}`}
    >
      <body className="bg-slate-950 font-sans text-slate-800 antialiased selection:bg-sky-500 selection:text-white">
        {children}
        <SiteAnalytics />
      </body>
    </html>
  )
}
