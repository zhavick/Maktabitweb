import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { resolveMediaUrl } from '@/lib/cms'
import config from '@/payload.config'

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const res = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })

  const project = res.docs[0]
  if (!project) {
    return { title: 'Proyek Tidak Ditemukan' }
  }

  const ogImage = resolveMediaUrl(project.coverImage, project.coverImageUrl)

  return {
    title: `${project.title} (${project.projectCode}) — Studi Kasus Proyek`,
    description: project.shortDesc,
    alternates: {
      canonical: `/proyek/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} — Portofolio MaktabIT Technology`,
      description: project.shortDesc,
      url: `/proyek/${project.slug}`,
      images: [{ url: ogImage }],
    },
  }
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const [siteSettings, projectRes] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.find({
      collection: 'projects',
      where: { slug: { equals: slug } },
      depth: 1,
      limit: 1,
    }),
  ])

  const project = projectRes.docs[0]
  if (!project) {
    notFound()
  }

  const coverUrl = resolveMediaUrl(project.coverImage, project.coverImageUrl)
  const isEmerald = project.accentColor === 'emerald'
  const badgeClass = isEmerald
    ? 'bg-emerald-400/95 text-slate-950'
    : 'bg-sky-500/90 text-slate-950'

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar
        brandPrefix={siteSettings.brandPrefix || 'Maktab'}
        brandHighlight={siteSettings.brandHighlight || 'IT'}
      />

      {/* Header Studi Kasus Proyek */}
      <header className="tech-grid-bg relative overflow-hidden bg-slate-950 py-14 text-white sm:py-20">
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-sky-600/20 blur-[110px]" />
        <div className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full bg-emerald-500/15 blur-[110px]" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex flex-wrap items-center gap-2 font-mono text-xs text-slate-400">
            <Link href="/" className="hover:text-white">
              Beranda
            </Link>
            <span>/</span>
            <Link href="/proyek" className="hover:text-white">
              Portofolio Proyek
            </Link>
            <span>/</span>
            <span className="text-sky-400">{project.title}</span>
          </nav>

          <div className="mb-4 flex flex-wrap items-center gap-2.5">
            <span className={`rounded-lg px-3 py-1 font-mono text-xs font-bold ${badgeClass}`}>
              {project.modalBadge || project.projectCode}
            </span>
            <span className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-300">
              {project.categoryLabel}
            </span>
          </div>

          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
            {project.title}
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {project.shortDesc}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-sky-400"
            >
              <span>Buka Repositori GitHub</span>
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                <span>Kunjungi Demo Live</span>
              </a>
            )}
            <Link
              href="/#kontak"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              <span>Diskusikan Proyek Serupa</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Isi Detail Proyek */}
      <main className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl space-y-10 px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverUrl}
              alt={project.title}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Arsitektur & Kapabilitas */}
            <div className="space-y-8 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-10 lg:col-span-8">
              <div>
                <h2 className="font-display text-xl font-extrabold text-slate-900 sm:text-2xl">
                  Arsitektur &amp; Tujuan Pengembangan
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {project.architectureSummary}
                </p>
              </div>

              {project.capabilities && project.capabilities.length > 0 && (
                <div className="border-t border-slate-200 pt-6">
                  <h3 className="font-display text-lg font-bold text-slate-900">
                    Kapabilitas &amp; Fitur Utama
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm text-slate-700 sm:text-base">
                    {project.capabilities.map((cap, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700">
                          ✓
                        </span>
                        <span>{cap.item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar Spesifikasi Teknis */}
            <aside className="space-y-6 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm sm:p-8 lg:col-span-4">
              <div>
                <div className="font-mono text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  Kode Proyek
                </div>
                <div className="font-display mt-1 text-lg font-bold text-slate-900">
                  {project.projectCode}
                </div>
              </div>

              <div>
                <div className="font-mono text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  Kategori
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-700">
                  {project.categoryLabel}
                </div>
              </div>

              {project.techTags && project.techTags.length > 0 && (
                <div>
                  <div className="mb-2.5 font-mono text-xs font-semibold tracking-wider text-slate-400 uppercase">
                    Tumpukan Teknologi
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.techTags.map((t, idx) => (
                      <span
                        key={idx}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-xs text-slate-700"
                      >
                        {t.tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t border-slate-200 pt-5">
                <Link
                  href="/proyek"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-600 hover:text-sky-700"
                >
                  <span>&larr; Kembali ke Katalog Proyek</span>
                </Link>
              </div>
            </aside>
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
