import Link from 'next/link'
import React from 'react'

import { resolveMediaUrl } from '@/lib/cms'
import type { Category, Post } from '@/payload-types'

export interface LatestPostsSectionProps {
  posts: Post[]
}

export function formatIndonesianDate(dateStr?: string | null): string {
  if (!dateStr) return 'Baru saja'
  try {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(dateStr))
  } catch {
    return dateStr
  }
}

export function getCategoryName(category: number | Category | null | undefined): string {
  if (category && typeof category === 'object' && 'name' in category && category.name) {
    return category.name
  }
  return 'Publikasi'
}

export function LatestPostsSection({ posts }: LatestPostsSectionProps) {
  if (!posts || posts.length === 0) return null

  return (
    <section id="blog" className="border-t border-slate-200/80 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section Blog */}
        <div className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
              Wawasan &amp; Publikasi Resmi
            </div>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Artikel &amp; Informasi Terbaru
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
              Tulisan teknis, pembaruan pengembangan produk, serta kajian arsitektur perangkat lunak
              dari tim rekayasa MaktabIT Technology.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 self-start rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-sky-600 sm:text-sm md:self-auto"
          >
            <span>Lihat Semua Publikasi</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        {/* Grid 3 Kartu Artikel */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const coverUrl = resolveMediaUrl(post.coverImage, post.coverImageUrl)
            const categoryName = getCategoryName(post.category)

            return (
              <article
                key={post.id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-slate-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
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
                      <h3 className="font-display line-clamp-2 text-lg leading-snug font-bold text-slate-900 transition-colors group-hover:text-sky-600 sm:text-xl">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="border-t border-slate-200/80 pt-4">
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
      </div>
    </section>
  )
}
