'use client'

import Link from 'next/link'
import React from 'react'

export interface ProjectModalData {
  title: string
  slug?: string
  modalBadge: string
  accentColor?: 'sky' | 'emerald' | 'indigo' | 'amber' | null
  shortDesc: string
  architectureSummary: string
  githubUrl: string
}

export interface ProjectModalProps {
  project: ProjectModalData | null
  onClose: () => void
}

function getModalBadgeClass(accent?: ProjectModalData['accentColor']) {
  switch (accent) {
    case 'emerald':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200'
    case 'indigo':
      return 'bg-indigo-50 text-indigo-700 border border-indigo-200'
    case 'amber':
      return 'bg-amber-50 text-amber-700 border border-amber-200'
    case 'sky':
    default:
      return 'bg-sky-50 text-sky-700 border border-sky-200'
  }
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null

  return (
    <div
      id="project-modal"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200"
          aria-label="Tutup Modal"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div
          id="modal-badge"
          className={`mb-3 inline-block rounded-full px-3 py-1 font-mono text-xs font-semibold ${getModalBadgeClass(project.accentColor)}`}
        >
          {project.modalBadge}
        </div>
        <h3 id="modal-title" className="font-display mb-2 text-2xl font-extrabold text-slate-900">
          {project.title}
        </h3>
        <p id="modal-desc" className="mb-5 text-sm leading-relaxed text-slate-600">
          {project.shortDesc}
        </p>

        <div className="mb-6 space-y-2 rounded-2xl border border-slate-200/80 bg-slate-50 p-4">
          <div className="text-xs font-bold tracking-wider text-slate-500 uppercase">
            Arsitektur &amp; Tujuan Pengembangan
          </div>
          <p id="modal-arch" className="text-xs leading-relaxed text-slate-700 sm:text-sm">
            {project.architectureSummary}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          {project.slug && (
            <Link
              href={`/proyek/${project.slug}`}
              onClick={onClose}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-700"
            >
              <span>Studi Kasus Lengkap</span>
            </Link>
          )}
          <a
            id="modal-repo-link"
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            <span>Kunjungi GitHub</span>
          </a>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  )
}
