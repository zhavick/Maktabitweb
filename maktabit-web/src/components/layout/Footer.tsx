import React from 'react'

export interface FooterProps {
  brandPrefix?: string
  brandHighlight?: string
  copyrightText?: string
}

export function Footer({
  brandPrefix = 'Maktab',
  brandHighlight = 'IT',
  copyrightText = '© 2026 MaktabIT Technology. Seluruh hak cipta dilindungi undang-undang.',
}: FooterProps) {
  return (
    <footer className="mt-auto border-t border-slate-900 bg-slate-950 py-10 text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900">
            <svg className="h-5 w-5" viewBox="0 0 72 72" fill="none">
              <path d="M24 8H48L64 24V48L48 64H24L8 48V24L24 8Z" stroke="#38BDF8" strokeWidth="5" />
              <path
                d="M20 46V26L36 37L52 26V46"
                stroke="#FFFFFF"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="font-display text-base font-bold text-white">
            {brandPrefix}
            <span className="text-sky-400">{brandHighlight}</span> Technology
          </span>
        </div>

        <div className="text-center text-xs sm:text-right">{copyrightText}</div>
      </div>
    </footer>
  )
}
