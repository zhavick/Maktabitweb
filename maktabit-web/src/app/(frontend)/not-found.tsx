import Link from 'next/link'
import React from 'react'

import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <Navbar />

      <main className="tech-grid-bg relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-20 text-center">
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-600/15 blur-[120px]" />

        <div className="relative z-10 max-w-lg space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3.5 py-1.5 font-mono text-xs text-sky-400">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span>HTTP 404 // HALAMAN TIDAK DITEMUKAN</span>
          </div>

          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
            404{' '}
            <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
              Not Found
            </span>
          </h1>

          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            Maaf, halaman atau artikel yang Anda cari tidak tersedia, telah dipindahkan, atau belum
            diterbitkan.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-sky-400"
            >
              <span>Kembali ke Beranda</span>
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
            >
              <span>Jelajahi Blog &amp; Publikasi</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
