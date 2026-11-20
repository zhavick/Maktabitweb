'use client'

import Link from 'next/link'
import React, { useState } from 'react'

export interface NavbarProps {
  brandPrefix?: string
  brandHighlight?: string
  onReplaySplash?: () => void
}

export function Navbar({
  brandPrefix = 'Maktab',
  brandHighlight = 'IT',
  onReplaySplash,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 text-white backdrop-blur-lg">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand Logo Header */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 shadow-sm transition-colors group-hover:border-sky-500/70">
            <svg
              className="h-6 w-6"
              viewBox="0 0 72 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 8H48L64 24V48L48 64H24L8 48V24L24 8Z"
                stroke="#38BDF8"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M20 46V26L36 37L52 26V46"
                stroke="#FFFFFF"
                strokeWidth="4.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="36" cy="20" r="3.5" fill="#10B981" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg leading-none font-bold tracking-tight text-white">
              {brandPrefix}
              <span className="text-sky-400">{brandHighlight}</span>
            </span>
            <span className="mt-0.5 font-mono text-[10px] tracking-widest text-slate-400 uppercase">
              Technology
            </span>
          </div>
        </Link>

        {/* Navigasi Desktop */}
        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-300 lg:flex">
          <Link href="/#tentang" className="transition-colors hover:text-white">
            Prakata &amp; Profil
          </Link>
          <Link href="/#layanan" className="transition-colors hover:text-white">
            Layanan
          </Link>
          <Link href="/#proyek" className="transition-colors hover:text-white">
            Proyek Awal
          </Link>
          <Link href="/#teknologi" className="transition-colors hover:text-white">
            Teknologi
          </Link>
          <Link href="/blog" className="transition-colors hover:text-sky-400">
            Blog &amp; Publikasi
          </Link>
          <Link href="/#kontak" className="transition-colors hover:text-white">
            Kontak
          </Link>
        </nav>

        {/* Aksi Kanan Navbar */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Tombol Putar Ulang Splash */}
          {onReplaySplash && (
            <button
              type="button"
              onClick={onReplaySplash}
              title="Putar Ulang Animasi Splash Screen"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700/80 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-300 transition-all hover:bg-slate-800 hover:text-white"
            >
              <svg
                className="h-3.5 w-3.5 text-sky-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span className="hidden sm:inline">Splash</span>
            </button>
          )}

          {/* Tombol CTA Konsultasi */}
          <Link
            href="/#kontak"
            className="hidden items-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-emerald-400 px-4 py-2 text-xs font-semibold text-slate-950 shadow-md transition-all hover:from-sky-300 hover:to-emerald-300 sm:inline-flex sm:text-sm"
          >
            <span>Mulai Kolaborasi</span>
          </Link>

          {/* Tombol Menu Mobile */}
          <button
            id="mobile-menu-btn"
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="rounded-xl border border-slate-800 p-2 text-slate-300 hover:bg-slate-800 hover:text-white lg:hidden"
            aria-label="Buka Menu"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown Menu Mobile */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="space-y-2 border-b border-slate-800 bg-slate-900 px-4 pt-2 pb-5 lg:hidden"
        >
          <Link
            href="/#tentang"
            onClick={closeMobileMenu}
            className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            Prakata &amp; Profil
          </Link>
          <Link
            href="/#layanan"
            onClick={closeMobileMenu}
            className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            Layanan Kami
          </Link>
          <Link
            href="/#proyek"
            onClick={closeMobileMenu}
            className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            Proyek Pengembangan Awal
          </Link>
          <Link
            href="/#teknologi"
            onClick={closeMobileMenu}
            className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            Ekosistem Teknologi
          </Link>
          <Link
            href="/blog"
            onClick={closeMobileMenu}
            className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-800"
          >
            Blog &amp; Publikasi
          </Link>
          <Link
            href="/#kontak"
            onClick={closeMobileMenu}
            className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-sky-400 hover:bg-slate-800"
          >
            Hubungi &amp; Kolaborasi
          </Link>
        </div>
      )}
    </header>
  )
}
