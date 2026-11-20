'use client'

import Link from 'next/link'
import React, { useEffect } from 'react'

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Terjadi kesalahan runtime pada halaman:', error)
  }, [error])

  return (
    <div className="tech-grid-bg relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 px-4 py-20 text-center text-white">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-600/15 blur-[120px]" />

      <div className="relative z-10 max-w-lg space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3.5 py-1.5 font-mono text-xs text-rose-400">
          <span className="h-2 w-2 rounded-full bg-rose-500" />
          <span>HTTP 500 // GANGGUAN SISTEM</span>
        </div>

        <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
          Terjadi Kendala Teknis
        </h1>

        <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
          Permintaan Anda tidak dapat diproses saat ini. Silakan coba muat ulang halaman atau
          kembali ke halaman utama MaktabIT Technology.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-sky-400"
          >
            <span>Coba Lagi</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            <span>Kembali ke Beranda</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
