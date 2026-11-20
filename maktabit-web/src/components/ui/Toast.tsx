'use client'

import React from 'react'

export interface ToastProps {
  message: string | null
  variant?: 'success' | 'error'
}

export function Toast({ message, variant = 'success' }: ToastProps) {
  const isVisible = Boolean(message)

  return (
    <div
      id="toast-notification"
      className={`pointer-events-none fixed right-5 bottom-5 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
      }`}
    >
      <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3.5 text-sm text-white shadow-xl">
        <span
          className={`h-2.5 w-2.5 shrink-0 rounded-full ${
            variant === 'error' ? 'bg-rose-400' : 'bg-emerald-400'
          }`}
        />
        <span id="toast-message">{message}</span>
      </div>
    </div>
  )
}
