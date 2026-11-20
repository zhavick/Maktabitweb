import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload, type Where } from 'payload'
import React from 'react'

import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import {
  formatIndonesianDate,
  getCategoryName,
} from '@/components/sections/LatestPostsSection'
import { resolveMediaUrl } from '@/lib/cms'
import config from '@/payload.config'
import type { Category, Tag } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Blog & Publikasi Informasi',
  description:
    'Pusat informasi, kajian teknis rekayasa perangkat lunak, arsitektur sistem, dan publikasi resmi dari PT. MaktabIT Technology.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog & Publikasi Informasi — MaktabIT Technology',
    description:
      'Pusat informasi, kajian teknis rekayasa perangkat lunak, arsitektur sistem, dan publikasi resmi dari PT. MaktabIT Technology.',
    url: '/blog',
  },
}

interface BlogPageProps {
  searchParams: Promise<{
    q?: string
    category?: string
    tag?: string
    page?: string
  }>
}

const POSTS_PER_PAGE = 6

export default async function BlogIndexPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const query = params.q?.trim() || ''
  const categorySlug = params.category?.trim() || ''
  const tagSlug = params.tag?.trim() || ''
  const currentPage = Math.max(1, Number(params.page) || 1)

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const [siteSettings, categoriesRes, tagsRes] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.find({ collection: 'categories', sort: 'name', limit: 50 }),
    payload.find({ collection: 'tags', sort: 'name', limit: 50 }),
  ])

  const categories: Category[] = categoriesRes.docs
  const tags: Tag[] = tagsRes.docs

  const selectedCategory = categories.find((c) => c.slug === categorySlug)
  const selectedTag = tags.find((t) => t.slug === tagSlug)

  const whereConditions: Where[] = [
    {
      status: {
        equals: 'published',
      },
    },
  ]

  if (query) {
    whereConditions.push({
      or: [
        {
          title: {
            like: query,
          },
        },
        {
          excerpt: {
            like: query,
          },
        },
      ],
    })
  }

  if (selectedCategory) {
    whereConditions.push({
      category: {
        equals: selectedCategory.id,
      },
    })
  }

  if (selectedTag) {
    whereConditions.push({
      tags: {
        contains: selectedTag.id,
      },
    })
  }

  const postsRes = await payload.find({
    collection: 'posts',
    where: {
      and: whereConditions,
    },
    sort: '-publishedAt',
    depth: 1,
    page: currentPage,
    limit: POSTS_PER_PAGE,
  })

  const buildFilterHref = (overrides: {
    q?: string
    category?: string
    tag?: string
    page?: number
  }) => {
    const sp = new URLSearchParams()
    const nextQ = overrides.q !== undefined ? overrides.q : query
    const nextCat = overrides.category !== undefined ? overrides.category : categorySlug
    const nextTag = overrides.tag !== undefined ? overrides.tag : tagSlug
    const nextPage = overrides.page !== undefined ? overrides.page : 1

    if (nextQ) sp.set('q', nextQ)
    if (nextCat) sp.set('category', nextCat)
    if (nextTag) sp.set('tag', nextTag)
    if (nextPage > 1) sp.set('page', String(nextPage))

    const qs = sp.toString()
    return qs ? `/blog?${qs}` : '/blog'
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar
        brandPrefix={siteSettings.brandPrefix || 'Maktab'}
        brandHighlight={siteSettings.brandHighlight || 'IT'}
      />

      {/* Hero Header Blog */}
      <section className="tech-grid-bg relative overflow-hidden bg-slate-950 py-16 text-white sm:py-22">
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-sky-600/20 blur-[110px]" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full bg-emerald-500/15 blur-[110px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3.5 py-1.5 font-mono text-xs text-sky-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>MAKTABIT // BLOG &amp; PUBLIKASI</span>
            </div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
              Pusat Informasi, Kajian Teknis &amp;{' '}
              <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
                Inovasi Digital
              </span>
            </h1>
            <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
              Temukan artikel terbaru seputar rekayasa perangkat lunak, arsitektur sistem, otomasi
              pekerjaan, serta perkembangan produk di PT. MaktabIT Technology.
            </p>
          </div>

          {/* Form Pencarian */}
          <form action="/blog" method="get" className="mt-8 max-w-xl">
            {categorySlug && <input type="hidden" name="category" value={categorySlug} />}
            {tagSlug && <input type="hidden" name="tag" value={tagSlug} />}
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Cari judul atau topik artikel..."
                className="flex-1 rounded-xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-sm text-white placeholder-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-500/40 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-sky-400"
              >
                <span>Cari Artikel</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Filter Kategori & Daftar Artikel */}
      <section className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filter Kategori */}
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <Link
              href={buildFilterHref({ category: '', page: 1 })}
              className={`rounded-xl px-4 py-2 text-xs font-semibold transition-colors ${
                !categorySlug
                  ? 'bg-slate-900 text-white'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              Semua Kategori
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={buildFilterHref({ category: cat.slug, page: 1 })}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-colors ${
                  categorySlug === cat.slug
                    ? 'bg-sky-600 text-white'
                    : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {/* Filter Tag */}
          {tags.length > 0 && (
            <div className="mb-10 flex flex-wrap items-center gap-2">
              <span className="mr-1 font-mono text-xs text-slate-400">Tag:</span>
              {tags.map((tag) => {
                const isActive = tagSlug === tag.slug
                return (
                  <Link
                    key={tag.id}
                    href={buildFilterHref({ tag: isActive ? '' : tag.slug, page: 1 })}
                    className={`rounded-lg px-2.5 py-1 font-mono text-xs transition-colors ${
                      isActive
                        ? 'bg-emerald-600 text-white'
                        : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    #{tag.name}
                  </Link>
                )
              })}
            </div>
          )}

          {/* Indikator Filter Aktif */}
          {(query || selectedCategory || selectedTag) && (
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 text-sm text-slate-600">
              <div>
                Menampilkan <strong>{postsRes.totalDocs}</strong> artikel
                {query ? ` untuk pencarian "${query}"` : ''}
                {selectedCategory ? ` pada kategori "${selectedCategory.name}"` : ''}
                {selectedTag ? ` dengan tag #${selectedTag.name}` : ''}.
              </div>
              <Link
                href="/blog"
                className="font-semibold text-sky-600 underline underline-offset-4 hover:text-sky-700"
              >
                Reset Filter
              </Link>
            </div>
          )}

          {/* Grid Artikel atau Empty State */}
          {postsRes.docs.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
              <h3 className="font-display text-xl font-bold text-slate-900">
                Belum Ada Artikel yang Sesuai
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
                Coba gunakan kata kunci pencarian lain atau tampilkan seluruh kategori publikasi.
              </p>
              <Link
                href="/blog"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-600"
              >
                Tampilkan Semua Artikel
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {postsRes.docs.map((post) => {
                const coverUrl = resolveMediaUrl(post.coverImage, post.coverImageUrl)
                const categoryName = getCategoryName(post.category)

                return (
                  <article
                    key={post.id}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="relative aspect-[16/10] overflow-hidden bg-slate-900"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={coverUrl}
                        alt={post.title}
                        className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="rounded-lg bg-sky-500/95 px-3 py-1 font-mono text-xs font-bold text-slate-950 backdrop-blur-md">
                          {categoryName}
                        </span>
                      </div>
                    </Link>

                    <div className="flex flex-1 flex-col justify-between space-y-5 p-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 font-mono text-xs text-slate-500">
                          <span>{formatIndonesianDate(post.publishedAt || post.createdAt)}</span>
                          <span>•</span>
                          <span>{post.readingTimeMinutes || 4} menit baca</span>
                        </div>

                        <Link href={`/blog/${post.slug}`} className="block">
                          <h2 className="font-display line-clamp-2 text-lg leading-snug font-bold text-slate-900 transition-colors group-hover:text-sky-600 sm:text-xl">
                            {post.title}
                          </h2>
                        </Link>

                        <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="border-t border-slate-100 pt-4">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 transition-colors hover:text-sky-700"
                        >
                          <span>Baca Selengkapnya</span>
                          <svg
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}

          {/* Pagination */}
          {postsRes.totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-3">
              {postsRes.hasPrevPage && (
                <Link
                  href={buildFilterHref({ page: currentPage - 1 })}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  &larr; Sebelumnya
                </Link>
              )}
              <span className="font-mono text-xs text-slate-500">
                Halaman {postsRes.page} dari {postsRes.totalPages}
              </span>
              {postsRes.hasNextPage && (
                <Link
                  href={buildFilterHref({ page: currentPage + 1 })}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Selanjutnya &rarr;
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer
        brandPrefix={siteSettings.brandPrefix || 'Maktab'}
        brandHighlight={siteSettings.brandHighlight || 'IT'}
        copyrightText={siteSettings.copyrightText || undefined}
      />
    </div>
  )
}
