import React from 'react'

export interface ServiceItemData {
  id?: string | number
  title: string
  description: string
  icon?: 'code' | 'refresh' | 'book' | 'server' | 'cloud' | 'shield' | null
  accentColor?: 'sky' | 'emerald' | 'indigo' | 'amber' | null
}

export interface ServicesSectionProps {
  services?: ServiceItemData[]
}

const DEFAULT_SERVICES: ServiceItemData[] = [
  {
    title: 'Custom Web Application',
    description:
      'Pengembangan aplikasi berbasis web modern yang responsif, cepat, dan aman sesuai kebutuhan operasional bisnis maupun institusi.',
    icon: 'code',
    accentColor: 'sky',
  },
  {
    title: 'Otomasi & Task Worker',
    description:
      'Perancangan sistem penjadwalan tugas otomatis (background worker), antrean proses, dan manajemen alur kerja terdistribusi.',
    icon: 'refresh',
    accentColor: 'emerald',
  },
  {
    title: 'Platform Literasi & Edukasi',
    description:
      "Pembangunan portal konten digital, aplikasi Al-Qur'an web, dan sistem pembelajaran interaktif dengan tipografi nyaman dibaca.",
    icon: 'book',
    accentColor: 'indigo',
  },
  {
    title: 'API & Arsitektur Sistem',
    description:
      'Integrasi REST/GraphQL API, optimasi basis data, serta konsultasi arsitektur cloud-ready yang mudah dipelihara.',
    icon: 'server',
    accentColor: 'amber',
  },
]

function renderServiceIcon(icon?: ServiceItemData['icon']) {
  switch (icon) {
    case 'refresh':
      return (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      )
    case 'book':
      return (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      )
    case 'server':
      return (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
          />
        </svg>
      )
    case 'cloud':
      return (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
          />
        </svg>
      )
    case 'shield':
      return (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      )
    case 'code':
    default:
      return (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      )
  }
}

function getAccentBoxClass(accent?: ServiceItemData['accentColor']) {
  switch (accent) {
    case 'emerald':
      return 'bg-emerald-50 text-emerald-600'
    case 'indigo':
      return 'bg-indigo-50 text-indigo-600'
    case 'amber':
      return 'bg-amber-50 text-amber-600'
    case 'sky':
    default:
      return 'bg-sky-50 text-sky-600'
  }
}

export function ServicesSection({ services = DEFAULT_SERVICES }: ServicesSectionProps) {
  const activeServices = services.length > 0 ? services : DEFAULT_SERVICES

  return (
    <section id="layanan" className="bg-slate-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="font-mono text-xs font-semibold tracking-widest text-sky-600 uppercase">
            Fokus Keahlian
          </span>
          <h2 className="font-display mt-2 text-2xl font-extrabold text-slate-900 sm:text-4xl">
            Layanan Pengembangan Software
          </h2>
          <p className="mt-3 text-sm text-slate-600 sm:text-base">
            Kami merancang dan membangun solusi digital dari tahap konsep, arsitektur sistem, hingga
            implementasi siap produksi.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {activeServices.map((service, index) => (
            <div
              key={service.id ?? index}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${getAccentBoxClass(service.accentColor)}`}
              >
                {renderServiceIcon(service.icon)}
              </div>
              <h3 className="font-display mb-2 text-lg font-bold text-slate-900">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
