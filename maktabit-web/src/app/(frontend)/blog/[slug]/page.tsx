import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import { RichText } from '@/components/blog/RichText'
import { ShareButtons } from '@/components/blog/ShareButtons'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import {
  formatIndonesianDate,
  getCategoryName,
} from '@/components/sections/LatestPostsSection'
import { resolveMediaUrl } from '@/lib/cms'
import config from '@/payload.config'
import type { Category, Tag, User } from '@/payload-types'

interface BlogDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

function getAuthorName(author: number | User | null | undefined): string {
  if (author && typeof author === 'object' && 'name' in author && author.name) {
    return author.name
  }
  return 'Tim Redaksi MaktabIT'
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const postRes = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { slug: { equals: slug } },
        { status: { equals: 'published' } },
      ],
    },
    depth: 1,
    limit: 1,
  })

  const post = postRes.docs[0]
  if (!post) {
    return {
      title: 'Artikel Tidak Ditemukan',
    }
  }

  const metaTitle = post.seo?.metaTitle || post.title
  const metaDescription = post.seo?.metaDescription || post.excerpt
  const ogImage = resolveMediaUrl(
    post.seo?.ogImage || post.coverImage,
    post.coverImageUrl,
  )
  const authorName = getAuthorName(post.author)

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: 'article',
      title: metaTitle,
      description: metaDescription,
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt || post.createdAt,
      modifiedTime: post.updatedAt,
      authors: [authorName],
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [ogImage],
    },
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const [siteSettings, postRes] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.find({
      collection: 'posts',
      where: {
        and: [
          {
            slug: {
              equals: slug,
            },
          },
          {
            status: {
              equals: 'published',
            },
          },
        ],
      },
      depth: 2,
      limit: 1,
    }),
  ])

  const post = postRes.docs[0]
  if (!post) {
    notFound()
  }

  const categoryObj =
    post.category && typeof post.category === 'object' ? (post.category as Category) : null
  const categoryName = getCategoryName(post.category)
  const authorName = getAuthorName(post.author)
  const coverUrl = resolveMediaUrl(post.coverImage, post.coverImageUrl)
  const postTags =
    post.tags?.filter((t): t is Tag => Boolean(t && typeof t === 'object' && 'name' in t)) ?? []

  // Ambil artikel terkait
  const relatedRes = await payload.find({
    collection: 'posts',
    where: {
      and: [
        {
          id: {
            not_equals: post.id,
          },
        },
        {
          status: {
            equals: 'published',
          },
        },
      ],
    },
    sort: '-publishedAt',
    depth: 1,
    limit: 3,
  })

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3390').replace(/\/$/, '')
  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [coverUrl],
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteSettings.companyName || 'PT. MaktabIT Technology',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <Navbar
        brandPrefix={siteSettings.brandPrefix || 'Maktab'}
        brandHighlight={siteSettings.brandHighlight || 'IT'}
      />

      {/* Header Artikel */}
      <header className="tech-grid-bg relative overflow-hidden bg-slate-950 py-14 text-white sm:py-20">
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-sky-600/20 blur-[110px]" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full bg-emerald-500/15 blur-[110px]" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex flex-wrap items-center gap-2 font-mono text-xs text-slate-400">
            <Link href="/" className="hover:text-white">
              Beranda
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-white">
              Blog &amp; Publikasi
            </Link>
            {categoryObj && (
              <>
                <span>/</span>
                <Link
                  href={`/blog?category=${categoryObj.slug}`}
                  className="text-sky-400 hover:underline"
                >
                  {categoryObj.name}
                </Link>
              </>
            )}
          </nav>

          <div className="mb-4 inline-flex items-center gap-2 rounded-lg bg-sky-500/95 px-3 py-1 font-mono text-xs font-bold text-slate-950">
            {categoryName}
          </div>

          <h1 className="font-display text-2xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-lg">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-slate-800 pt-6 font-mono text-xs text-slate-400">
            <span>Oleh {authorName}</span>
            <span>•</span>
            <span>{formatIndonesianDate(post.publishedAt || post.createdAt)}</span>
            <span>•</span>
            <span>{post.readingTimeMinutes || 4} menit baca</span>
          </div>
        </div>
      </header>

      {/* Konten Utama Artikel */}
      <main className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Gambar Sampul */}
          <div className="mb-10 overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverUrl}
              alt={post.title}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>

          {/* Isi Artikel (RichText) */}
          <article className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-10 lg:p-12">
            <RichText content={post.content} />

            {/* Daftar Tag & Tombol Bagikan */}
            <div className="mt-10 flex flex-col justify-between gap-6 border-t border-slate-200 pt-8 sm:flex-row sm:items-center">
              <div className="flex flex-wrap items-center gap-2">
                {postTags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/blog?tag=${tag.slug}`}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-xs text-slate-600 transition-colors hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>

              <ShareButtons title={post.title} slug={post.slug} />
            </div>
          </article>

          {/* Artikel Terkait */}
          {relatedRes.docs.length > 0 && (
            <section className="mt-16">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="font-display text-xl font-extrabold text-slate-900 sm:text-2xl">
                  Artikel &amp; Publikasi Lainnya
                </h2>
                <Link
                  href="/blog"
                  className="text-sm font-semibold text-sky-600 hover:text-sky-700"
                >
                  Lihat Semua &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {relatedRes.docs.map((item) => {
                  const itemCover = resolveMediaUrl(item.coverImage, item.coverImageUrl)
                  return (
                    <Link
                      key={item.id}
                      href={`/blog/${item.slug}`}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-slate-900">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={itemCover}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between p-5">
                        <div>
                          <div className="mb-2 font-mono text-[11px] text-slate-400">
                            {formatIndonesianDate(item.publishedAt || item.createdAt)}
                          </div>
                          <h3 className="font-display line-clamp-2 text-base font-bold text-slate-900 group-hover:text-sky-600">
                            {item.title}
                          </h3>
                        </div>
                        <span className="mt-4 inline-block text-xs font-semibold text-sky-600">
                          Baca Artikel &rarr;
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer
        brandPrefix={siteSettings.brandPrefix || 'Maktab'}
        brandHighlight={siteSettings.brandHighlight || 'IT'}
        copyrightText={siteSettings.copyrightText || undefined}
      />
    </div>
  )
}
