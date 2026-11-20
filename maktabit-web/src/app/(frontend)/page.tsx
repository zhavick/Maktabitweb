import type { Metadata } from 'next'
import React from 'react'

import { LandingPageClient } from '@/components/LandingPageClient'
import { LatestPostsSection } from '@/components/sections/LatestPostsSection'
import { getLandingCMSData, resolveMediaUrl } from '@/lib/cms'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const { siteSettings } = await getLandingCMSData()
  if (!siteSettings) return {}

  const title = `${siteSettings.companyName || 'MaktabIT Technology'} — ${
    siteSettings.tagline || 'Solusi Rekayasa Perangkat Lunak & Inovasi Digital'
  }`
  const description =
    siteSettings.heroDescription ||
    'Merancang fondasi perangkat lunak yang presisi, skalabel, dan berdampak nyata bagi transformasi digital masa depan.'
  const ogImage = resolveMediaUrl(siteSettings.heroImage, siteSettings.heroImageUrl)

  return {
    title: {
      absolute: title,
    },
    description,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title,
      description,
      url: '/',
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function HomePage() {
  const { landingProps, latestPosts, siteSettings } = await getLandingCMSData()
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3390').replace(/\/$/, '')

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteSettings?.companyName || 'PT. MaktabIT Technology',
    url: siteUrl,
    email: siteSettings?.email || 'hello@maktabit.tech',
    description:
      siteSettings?.heroDescription ||
      'Software Engineering & Digital Product Studio — PT. MaktabIT Technology',
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteSettings?.location || 'Jakarta, Indonesia',
      addressCountry: 'ID',
    },
    sameAs: siteSettings?.githubUrl ? [siteSettings.githubUrl] : ['https://github.com/zhavick'],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <LandingPageClient
        {...landingProps}
        extraSection={<LatestPostsSection posts={latestPosts} />}
      />
    </>
  )
}
