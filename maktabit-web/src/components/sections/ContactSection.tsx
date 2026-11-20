'use client'

import Script from 'next/script'
import React, { useEffect, useRef, useState } from 'react'

import { Toast } from '../ui/Toast'

export interface ContactSectionProps {
  badge?: string
  headline?: string
  description?: string
  email?: string
  location?: string
  githubUrl?: string
  githubLabel?: string
  slaText?: string
  topics?: string[]
}

const DEFAULT_TOPICS = [
  'Pengembangan Aplikasi Web Custom',
  'Kolaborasi / Implementasi TaskWorkerPro',
  'Kolaborasi / Pengembangan QuranWeb',
  'Konsultasi Arsitektur Sistem & API',
]

declare global {
  interface Window {
    onMaktabTurnstileSuccess?: (token: string) => void
  }
}

export function ContactSection({
  badge = 'HUBUNGI KAMI',
  headline = 'Mari Diskusikan Proyek Digital Anda Bersama MaktabIT',
  description = 'Tertarik berkolaborasi pada pengembangan TaskWorkerPro, QuranWeb, atau membutuhkan tim rekayasa perangkat lunak untuk sistem baru Anda? Kirimkan pesan kepada kami.',
  email = 'hello@maktabit.tech',
  location = 'Jakarta, Indonesia',
  githubUrl = 'https://github.com/zhavick',
  githubLabel = 'github.com/zhavick',
  slaText = 'Respons cepat dalam 1x24 jam hari kerja.',
  topics = DEFAULT_TOPICS,
}: ContactSectionProps) {
  const activeTopics = topics.length > 0 ? topics : DEFAULT_TOPICS
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

  const [senderName, setSenderName] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [projectTopic, setProjectTopic] = useState(activeTopics[0])
  const [senderMessage, setSenderMessage] = useState('')
  const [honeypotWebsite, setHoneypotWebsite] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toastState, setToastState] = useState<{
    message: string | null
    variant: 'success' | 'error'
  }>({
    message: null,
    variant: 'success',
  })

  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    window.onMaktabTurnstileSuccess = (token: string) => {
      setTurnstileToken(token)
    }
    return () => {
      delete window.onMaktabTurnstileSuccess
    }
  }, [])

  const showToast = (message: string, variant: 'success' | 'error' = 'success') => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current)
    }
    setToastState({ message, variant })
    toastTimerRef.current = setTimeout(() => {
      setToastState((prev) => ({ ...prev, message: null }))
    }, 4500)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (isSubmitting) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: senderName,
          email: senderEmail,
          topic: projectTopic,
          message: senderMessage,
          website: honeypotWebsite,
          turnstileToken,
        }),
      })

      const result = (await response.json()) as {
        success?: boolean
        message?: string
        error?: string
      }

      if (!response.ok || result.error) {
        showToast(
          result.error || 'Gagal mengirim pesan. Silakan periksa kembali isian Anda.',
          'error',
        )
        return
      }

      showToast(
        result.message ||
          `Terima kasih, ${senderName}! Pesan Anda untuk MaktabIT Technology telah diterima.`,
        'success',
      )
      setSenderName('')
      setSenderEmail('')
      setProjectTopic(activeTopics[0])
      setSenderMessage('')
      setHoneypotWebsite('')
    } catch {
      showToast('Gagal menghubungi server. Periksa koneksi jaringan Anda.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="kontak" className="bg-slate-50 py-16 sm:py-24">
      {turnstileSiteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="lazyOnload"
        />
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm lg:grid-cols-12">
          {/* Informasi Kontak Perusahaan */}
          <div className="relative flex flex-col justify-between overflow-hidden bg-slate-950 p-8 text-white sm:p-10 lg:col-span-5">
            <div className="pointer-events-none absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />

            <div className="relative z-10 space-y-5">
              <span className="inline-block rounded-full border border-slate-800 bg-slate-900 px-3 py-1 font-mono text-xs text-sky-400">
                {badge}
              </span>
              <h2 className="font-display text-2xl leading-tight font-extrabold sm:text-3xl">
                {headline}
              </h2>
              <p className="text-sm leading-relaxed text-slate-300">{description}</p>

              <div className="space-y-4 pt-4 text-sm">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-sky-400">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span>{email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-emerald-400">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <span>{location}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-sky-400">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      />
                    </svg>
                  </div>
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-sky-400"
                  >
                    {githubLabel}
                  </a>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-8 border-t border-slate-800 pt-8 text-xs text-slate-400">
              {slaText}
            </div>
          </div>

          {/* Formulir Konsultasi */}
          <div className="p-8 sm:p-10 lg:col-span-7">
            <form id="contact-form" onSubmit={handleSubmit} className="space-y-5">
              {/* Field Honeypot Anti-Bot (Tersembunyi dari Pengguna Manusia) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="sender-website">Website</label>
                <input
                  type="text"
                  id="sender-website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypotWebsite}
                  onChange={(e) => setHoneypotWebsite(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="sender-name"
                    className="mb-2 block text-xs font-semibold tracking-wider text-slate-600 uppercase"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="sender-name"
                    required
                    minLength={2}
                    disabled={isSubmitting}
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Contoh: Ahmad Fauzi"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition-all focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none disabled:opacity-60"
                  />
                </div>
                <div>
                  <label
                    htmlFor="sender-email"
                    className="mb-2 block text-xs font-semibold tracking-wider text-slate-600 uppercase"
                  >
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    id="sender-email"
                    required
                    disabled={isSubmitting}
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="nama@perusahaan.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition-all focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="project-topic"
                  className="mb-2 block text-xs font-semibold tracking-wider text-slate-600 uppercase"
                >
                  Topik Kebutuhan
                </label>
                <select
                  id="project-topic"
                  disabled={isSubmitting}
                  value={projectTopic}
                  onChange={(e) => setProjectTopic(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition-all focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none disabled:opacity-60"
                >
                  {activeTopics.map((topic, idx) => (
                    <option key={idx} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="sender-message"
                  className="mb-2 block text-xs font-semibold tracking-wider text-slate-600 uppercase"
                >
                  Detail Pesan
                </label>
                <textarea
                  id="sender-message"
                  rows={4}
                  required
                  minLength={10}
                  disabled={isSubmitting}
                  value={senderMessage}
                  onChange={(e) => setSenderMessage(e.target.value)}
                  placeholder="Ceritakan singkat kebutuhan proyek atau ide kolaborasi Anda..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition-all focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none disabled:opacity-60"
                />
              </div>

              {turnstileSiteKey && (
                <div
                  className="cf-turnstile"
                  data-sitekey={turnstileSiteKey}
                  data-callback="onMaktabTurnstileSuccess"
                />
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-sky-200 transition-all hover:bg-sky-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                <span>{isSubmitting ? 'Mengirim Pesan...' : 'Kirim Pesan Sekarang'}</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      <Toast message={toastState.message} variant={toastState.variant} />
    </section>
  )
}
