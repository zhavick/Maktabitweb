'use client'

import React, { useState } from 'react'

export interface ShareButtonsProps {
  title: string
  slug: string
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const getFullUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/blog/${slug}`
    }
    return `/blog/${slug}`
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getFullUrl())
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // ignore clipboard failures
    }
  }

  const encodedTitle = encodeURIComponent(title)

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="mr-1 font-mono text-xs font-semibold tracking-wider text-slate-500 uppercase">
        Bagikan:
      </span>

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
      >
        <span>{copied ? 'Tautan Tersalin!' : 'Salin Tautan'}</span>
      </button>

      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20-%20${encodeURIComponent(getFullUrl())}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
      >
        <span>WhatsApp</span>
      </a>

      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodeURIComponent(getFullUrl())}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-100"
      >
        <span>X / Twitter</span>
      </a>
    </div>
  )
}
