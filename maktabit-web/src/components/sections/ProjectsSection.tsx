'use client'

import React, { useState } from 'react'

import { ProjectModal, type ProjectModalData } from '../ui/ProjectModal'

export interface ProjectItemData {
  id?: string | number
  projectCode: string
  title: string
  slug: string
  categoryLabel: string
  modalBadge: string
  accentColor?: 'sky' | 'emerald' | 'indigo' | 'amber' | null
  shortDesc: string
  architectureSummary: string
  capabilities: string[]
  techTags: string[]
  coverImageUrl: string
  githubUrl: string
  githubDisplay: string
  liveUrl?: string | null
}

export interface ProjectsSectionProps {
  projects?: ProjectItemData[]
  githubProfileUrl?: string
}

const DEFAULT_PROJECTS: ProjectItemData[] = [
  {
    projectCode: 'PROJECT #01',
    title: 'TaskWorkerPro',
    slug: 'taskworker',
    categoryLabel: 'Workflow & Automation',
    modalBadge: 'PROJECT #01 • WORKFLOW ENGINE',
    accentColor: 'sky',
    shortDesc:
      'TaskWorkerPro adalah sistem manajemen tugas, penjadwalan proses latar belakang (background worker), dan pemantauan alur kerja operasional yang dirancang untuk meningkatkan keandalan eksekusi tugas dan efisiensi produktivitas tim.',
    architectureSummary:
      'Dibangun dengan pendekatan modular untuk memisahkan antarmuka kontrol dari worker eksekutor, memastikan proses berat berjalan stabil tanpa menghambat responsivitas aplikasi utama.',
    capabilities: [
      'Manajemen antrean tugas (task queue) & eksekusi pekerja terstruktur.',
      'Pemantauan status progres secara real-time dan pencatatan log aktivitas.',
      'Arsitektur modular yang mudah diintegrasikan ke berbagai layanan.',
    ],
    techTags: ['Task Scheduling', 'Worker Engine', 'REST API', 'Dashboard UI'],
    coverImageUrl:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    githubUrl: 'https://github.com/zhavick/TaskWorkerPro',
    githubDisplay: 'github.com/zhavick/TaskWorkerPro',
  },
  {
    projectCode: 'PROJECT #02',
    title: 'QuranWeb',
    slug: 'quranweb',
    categoryLabel: 'Digital Islamic & Literacy',
    modalBadge: 'PROJECT #02 • DIGITAL LITERACY',
    accentColor: 'emerald',
    shortDesc:
      "QuranWeb adalah platform Al-Qur'an digital berbasis web modern yang menghadirkan antarmuka bersih, bebas gangguan, serta navigasi surah dan ayat yang cepat untuk kenyamanan tilawah dan tadabbur di berbagai perangkat.",
    architectureSummary:
      'Menggunakan arsitektur web ringan dengan pemuatan data surah yang cepat dan tata letak responsif agar nyaman diakses dari perangkat seluler maupun layar komputer.',
    capabilities: [
      'Indeks 114 surah lengkap dengan pencarian instan & navigasi ayat cepat.',
      'Tipografi teks Arab yang jernih dilengkapi terjemahan yang mudah dipahami.',
      'Performa ringan & desain responsif optimal untuk ponsel maupun desktop.',
    ],
    techTags: ['Modern Web UI', 'Arabic Typography', 'Quran API', 'Responsive'],
    coverImageUrl:
      'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1000&q=80',
    githubUrl: 'https://github.com/zhavick/QuranWeb',
    githubDisplay: 'github.com/zhavick/QuranWeb',
  },
]

export function ProjectsSection({
  projects = DEFAULT_PROJECTS,
  githubProfileUrl = 'https://github.com/zhavick',
}: ProjectsSectionProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectModalData | null>(null)
  const activeProjects = projects.length > 0 ? projects : DEFAULT_PROJECTS

  return (
    <section id="proyek" className="border-t border-slate-200/80 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Bagian Proyek */}
        <div className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              Inisiatif &amp; Portofolio Awal
            </div>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Proyek Pengembangan Awal Kami
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
              Dua fondasi proyek perdana yang dikembangkan oleh tim MaktabIT Technology,
              mencerminkan fokus kami pada produktivitas sistem dan kebermanfaatan publik.
            </p>
          </div>

          <a
            href={githubProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800 sm:text-sm md:self-auto"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span>Profil GitHub Resmi</span>
          </a>
        </div>

        {/* Grid Kartu Proyek */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {activeProjects.map((project, idx) => {
            const isEmerald = project.accentColor === 'emerald'
            const badgeBg = isEmerald
              ? 'bg-emerald-400/95 text-slate-950'
              : 'bg-sky-500/90 text-slate-950'
            const urlTextColor = isEmerald ? 'text-emerald-300' : 'text-sky-300'
            const checkIconColor = isEmerald ? 'text-emerald-600' : 'text-sky-600'
            const btnHoverColor = isEmerald ? 'hover:bg-emerald-600' : 'hover:bg-sky-600'

            return (
              <article
                key={project.id ?? idx}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-slate-50 shadow-sm transition-all duration-300 hover:shadow-xl"
              >
                {/* Gambar Preview + Badge */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.coverImageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                  {/* Label Kategori */}
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

                  {/* Judul di Atas Gambar */}
                  <div className="absolute right-5 bottom-4 left-5 flex items-end justify-between">
                    <div>
                      <h3 className="font-display text-2xl font-extrabold text-white">
                        {project.title}
                      </h3>
                      <p className={`font-mono text-xs ${urlTextColor}`}>
                        {project.githubDisplay}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Konten Detail Proyek */}
                <div className="flex flex-1 flex-col justify-between space-y-6 p-6 sm:p-8">
                  <div className="space-y-4">
                    <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                      {project.shortDesc}
                    </p>

                    {/* Daftar Fitur Utama */}
                    {project.capabilities.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <div className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                          Kapabilitas Utama:
                        </div>
                        <ul className="space-y-2 text-sm text-slate-700">
                          {project.capabilities.map((cap, cIdx) => (
                            <li key={cIdx} className="flex items-start gap-2.5">
                              <svg
                                className={`mt-0.5 h-4 w-4 shrink-0 ${checkIconColor}`}
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
                              <span>{cap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tag Teknologi */}
                    {project.techTags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.techTags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="rounded-md border border-slate-200 bg-white px-2.5 py-1 font-mono text-xs text-slate-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tombol Aksi Repositori & Detail */}
                  <div className="flex flex-col gap-3 border-t border-slate-200/80 pt-4 sm:flex-row">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors ${btnHoverColor}`}
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        />
                      </svg>
                      <span>Buka Repositori GitHub</span>
                    </a>
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedProject({
                          title: project.title,
                          slug: project.slug,
                          modalBadge: project.modalBadge,
                          accentColor: project.accentColor,
                          shortDesc: project.shortDesc,
                          architectureSummary: project.architectureSummary,
                          githubUrl: project.githubUrl,
                        })
                      }
                      className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
                    >
                      Ringkasan Teknis
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {/* Modal Ringkasan Teknis Proyek */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}
