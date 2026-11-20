import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { resolveMediaUrl } from '@/lib/cms'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Portofolio & Inisiatif Proyek',
  description:
    'Katalog proyek perangkat lunak, sistem otomasi background worker, dan platform literasi digital yang dikembangkan oleh PT. MaktabIT Technology.',
  alternates: {
    canonical: '/proyek',
  },
}

export default async function ProjectsCatalogPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const [siteSettings, projectsRes] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.find({
      collection: 'projects',
      sort: 'sortOrder',
      depth: 1,
      limit: 50,
    }),
  ])

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar
        brandPrefix={siteSettings.brandPrefix || 'Maktab'}
        brandHighlight={siteSettings.brandHighlight || 'IT'}
      />

      {/* Hero Header Katalog Proyek */}
      <section className="tech-grid-bg relative overflow-hidden bg-slate-950 py-16 text-white sm:py-22">
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-sky-600/20 blur-[110px]" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full bg-emerald-500/15 blur-[110px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3.5 py-1.5 font-mono text-xs text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>MAKTABIT // PORTOFOLIO &amp; INISIATIF</span>
            </div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
              Katalog Proyek &amp;{' '}
              <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
                Rekayasa Produk
              </span>
            </h1>
            <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
              Eksplorasi mendalam atas produk internal, sistem otomasi, dan platform digital yang
              dirancang serta dibangun oleh tim PT. MaktabIT Technology.
            </p>
          </div>
        </div>
      </section>

      {/* Daftar Seluruh Proyek */}
      <main className="flex-1 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
            {projectsRes.docs.map((project) => {
              const coverUrl = resolveMediaUrl(project.coverImage, project.coverImageUrl)
              const isEmerald = project.accentColor === 'emerald'
              const badgeBg = isEmerald
                ? 'bg-emerald-400/95 text-slate-950'
                : 'bg-sky-500/90 text-slate-950'
              const checkColor = isEmerald ? 'text-emerald-600' : 'text-sky-600'

              return (
                <article
                  key={project.id}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:shadow-xl"
                >
                  <Link
                    href={`/proyek/${project.slug}`}
                    className="relative aspect-[16/9] overflow-hidden bg-slate-900"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={coverUrl}
                      alt={project.title}
                      className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span
                        className={`rounded-lg px-3 py-1 font-mono text-xs font-bold backdrop-blur-md ${badgeBg}`}
                      >
                        {project.projectCode}
                      </span>
                      <span className="rounded-lg border border-slate-700 bg-slate-900/85 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur-md">
                        {project.categoryLabel}
                      </span>
                    </div>
                    <div className="absolute right-5 bottom-4 left-5">
                      <h2 className="font-display text-2xl font-extrabold text-white">
                        {project.title}
                      </h2>
                      <p className="font-mono text-xs text-sky-300">{project.githubDisplay}</p>
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col justify-between space-y-6 p-6 sm:p-8">
                    <div className="space-y-4">
                      <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                        {project.shortDesc}
                      </p>

                      {project.capabilities && project.capabilities.length > 0 && (
                        <ul className="space-y-2 text-sm text-slate-700">
                          {project.capabilities.map((cap, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <svg
                                className={`mt-0.5 h-4 w-4 shrink-0 ${checkColor}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span>{cap.item}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {project.techTags && project.techTags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {project.techTags.map((t, idx) => (
                            <span
                              key={idx}
                              className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-600"
                            >
                              {t.tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-3 border-t border-slate-200/80 pt-4 sm:flex-row">
                      <Link
                        href={`/proyek/${project.slug}`}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
                      >
                        <span>Lihat Studi Kasus &amp; Arsitektur</span>
                      </Link>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                      >
                        <span>GitHub</span>
                      </a>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
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
