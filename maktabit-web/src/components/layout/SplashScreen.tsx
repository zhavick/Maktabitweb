'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

export interface SplashStageItem {
  minProgress: number
  label: string
}

export interface SplashScreenProps {
  enabled?: boolean
  brandPrefix?: string
  brandHighlight?: string
  tagline?: string
  stages?: SplashStageItem[]
  replayTrigger?: number
  onFinish: () => void
}

const DEFAULT_STAGES: SplashStageItem[] = [
  { minProgress: 0, label: 'Menyiapkan lingkungan kerja MaktabIT...' },
  { minProgress: 30, label: 'Memuat modul profil & layanan...' },
  { minProgress: 65, label: 'Menghubungkan portofolio proyek awal...' },
  { minProgress: 95, label: 'Siap digunakan!' },
]

export function SplashScreen({
  enabled = true,
  brandPrefix = 'Maktab',
  brandHighlight = 'IT',
  tagline = 'Merancang fondasi perangkat lunak yang presisi, skalabel, dan berdampak nyata bagi transformasi digital masa depan.',
  stages = DEFAULT_STAGES,
  replayTrigger = 0,
  onFinish,
}: SplashScreenProps) {
  const [progress, setProgress] = useState(0)
  const [isHidden, setIsHidden] = useState(!enabled)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const enteredRef = useRef(false)

  const activeStages = stages.length > 0 ? stages : DEFAULT_STAGES

  const enterMainSite = useCallback(() => {
    if (enteredRef.current) return
    enteredRef.current = true

    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    try {
      sessionStorage.setItem('maktabit_splash_seen', '1')
    } catch {
      // ignore storage errors
    }

    setIsHidden(true)
    onFinish()
  }, [onFinish])

  useEffect(() => {
    if (!enabled) {
      const skipTimer = setTimeout(() => enterMainSite(), 0)
      return () => clearTimeout(skipTimer)
    }

    // Jika sudah pernah melihat splash di sesi ini dan bukan replay manual, langsung masuk
    if (replayTrigger === 0) {
      try {
        if (sessionStorage.getItem('maktabit_splash_seen') === '1') {
          const seenTimer = setTimeout(() => enterMainSite(), 0)
          return () => clearTimeout(seenTimer)
        }
      } catch {
        // ignore
      }
    }

    enteredRef.current = false
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    let current = 0
    let initialized = false

    timerRef.current = setInterval(() => {
      if (!initialized) {
        initialized = true
        setIsHidden(false)
        setProgress(0)
        return
      }

      const step = Math.floor(Math.random() * 5) + 2
      current = Math.min(current + step, 100)
      setProgress(current)

      if (current >= 100) {
        if (timerRef.current) {
          clearInterval(timerRef.current)
          timerRef.current = null
        }
        setTimeout(() => {
          enterMainSite()
        }, 550)
      }
    }, 40)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [enabled, replayTrigger, enterMainSite])

  let currentLabel = activeStages[0]?.label || 'Menyiapkan lingkungan kerja...'
  for (let i = activeStages.length - 1; i >= 0; i--) {
    if (progress >= activeStages[i].minProgress) {
      currentLabel = activeStages[i].label
      break
    }
  }

  return (
    <div
      id="splash-screen"
      className={`tech-grid-bg fixed inset-0 z-50 flex flex-col items-center justify-between overflow-hidden bg-slate-950 px-6 py-8 text-white sm:py-10 ${
        isHidden ? 'splash-hidden' : ''
      }`}
    >
      {/* Ambient Glow Latar Belakang */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-600/15 blur-[110px] sm:h-[560px] sm:w-[560px] animate-pulse-slow" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[280px] w-[280px] rounded-full bg-emerald-500/10 blur-[95px]" />

      {/* Header Splash: Indikator Sistem */}
      <div className="relative z-10 flex items-center gap-2.5 rounded-full border border-slate-800 bg-slate-900/90 px-3.5 py-1.5 font-mono text-xs text-slate-400">
        <span className="h-2 w-2 animate-ping rounded-full bg-emerald-400" />
        <span>MAKTABIT ENGINE // INITIALIZING</span>
      </div>

      {/* Konten Tengah Splash: Logo Kustom, Prakata Singkat & Progress Bar */}
      <div className="relative z-10 my-auto flex w-full max-w-lg flex-col items-center text-center">
        {/* Wadah Logo Brand MaktabIT Technology */}
        <div className="relative mb-7 animate-float">
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-sky-500 via-cyan-400 to-emerald-400 opacity-25 blur-xl" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-slate-700/80 bg-slate-900 shadow-2xl backdrop-blur-xl sm:h-28 sm:w-28">
            <svg
              key={replayTrigger}
              className="h-16 w-16 sm:h-18 sm:w-18"
              viewBox="0 0 72 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="maktabSplashGrad"
                  x1="10"
                  y1="10"
                  x2="62"
                  y2="62"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="55%" stopColor="#0EA5E9" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
              <path
                className="logo-stroke"
                d="M24 8H48L64 24V48L48 64H24L8 48V24L24 8Z"
                stroke="url(#maktabSplashGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className="logo-stroke"
                d="M20 46V26L36 37L52 26V46"
                stroke="#FFFFFF"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="36" cy="21" r="3" fill="#10B981" />
              <path
                className="logo-stroke"
                d="M26 51H46"
                stroke="#38BDF8"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Identitas Brand */}
        <div className="mb-8 space-y-2">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {brandPrefix}
            <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
              {brandHighlight}
            </span>{' '}
            Technology
          </h1>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-slate-300 sm:text-base">
            {tagline}
          </p>
        </div>

        {/* Bilah Progres (0 - 100%) */}
        <div className="w-full max-w-xs space-y-2.5 sm:max-w-sm">
          <div className="flex items-center justify-between text-xs font-medium">
            <span id="splash-status" className="text-slate-400">
              {currentLabel}
            </span>
            <span
              id="splash-percent"
              className="font-mono font-semibold text-sky-400 tabular-nums"
            >
              {progress}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full border border-slate-700/60 bg-slate-800/90 p-0.5">
            <div
              id="splash-progress"
              style={{ width: `${progress}%` }}
              className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400 transition-all duration-200 ease-out"
            >
              <div className="progress-shimmer absolute inset-0" />
            </div>
          </div>
        </div>

        {/* Tombol Lewati / Masuk Langsung */}
        <div className="mt-8">
          <button
            id="skip-splash-btn"
            type="button"
            onClick={enterMainSite}
            className="group inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:border-sky-500 hover:bg-sky-600 active:scale-95"
          >
            <span id="skip-btn-label">
              {progress >= 100 ? 'Masuk ke Website' : 'Lewati Intro'}
            </span>
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
          </button>
        </div>
      </div>

      {/* Footer Splash */}
      <div className="relative z-10 font-mono text-xs text-slate-500">
        &copy; 2026 {brandPrefix}
        {brandHighlight} Technology • Software Engineering Studio
      </div>
    </div>
  )
}
