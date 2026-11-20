import React from 'react'

export interface CoreValueItem {
  title: string
  subtitle: string
  accentColor?: 'white' | 'sky' | 'emerald' | null
}

export interface TerminalCardData {
  filename?: string | null
  companyValue?: string | null
  focusProjects?: string | null
  commentLine?: string | null
}

export interface HeroSectionProps {
  badge?: string
  headlinePrefix?: string
  headlineHighlight?: string
  description?: string
  primaryCtaLabel?: string
  primaryCtaHref?: string
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
  imageUrl?: string
  coreValues?: CoreValueItem[]
  terminalCard?: TerminalCardData
}

const DEFAULT_CORE_VALUES: CoreValueItem[] = [
  { title: 'Clean Code', subtitle: 'Arsitektur Terstruktur', accentColor: 'white' },
  { title: 'Agile Dev', subtitle: 'Iterasi Cepat & Tepat', accentColor: 'sky' },
  { title: 'Open Tech', subtitle: 'Inovasi Terbuka', accentColor: 'emerald' },
  { title: 'Scalable', subtitle: 'Siap Berkembang', accentColor: 'white' },
]

export function HeroSection({
  badge = 'Software Engineering & Digital Product Studio',
  headlinePrefix = 'Membangun Perangkat Lunak Cerdas untuk',
  headlineHighlight = 'Efisiensi & Kebermanfaatan',
  description = 'Selamat datang di MaktabIT Technology. Terinspirasi dari filosofi "Maktab" sebagai pusat literasi, karya, dan produktivitas, kami hadir sebagai mitra pengembangan perangkat lunak yang menggabungkan ketajaman arsitektur kode dengan desain antarmuka yang humanis.',
  primaryCtaLabel = 'Eksplorasi Proyek Awal',
  primaryCtaHref = '#proyek',
  secondaryCtaLabel = 'Baca Prakata Perusahaan',
  secondaryCtaHref = '#tentang',
  imageUrl = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
  coreValues = DEFAULT_CORE_VALUES,
  terminalCard = {
    filename: 'maktabit.config.ts',
    companyValue: 'MaktabIT Technology',
    focusProjects: '"TaskWorkerPro", "QuranWeb"',
    commentLine: '// Membangun solusi digital berdampak',
  },
}: HeroSectionProps) {
  const values = coreValues.length > 0 ? coreValues : DEFAULT_CORE_VALUES

  const getValueColorClass = (color?: 'white' | 'sky' | 'emerald' | null) => {
    if (color === 'sky') return 'text-sky-400'
    if (color === 'emerald') return 'text-emerald-400'
    return 'text-white'
  }

  return (
    <section className="tech-grid-bg relative overflow-hidden bg-slate-950 pt-14 pb-20 text-white sm:pt-20 sm:pb-28">
      {/* Dekorasi Cahaya */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-sky-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 rounded-full bg-emerald-500/15 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Kolom Kiri: Copywriting & Prakata */}
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3.5 py-1.5 text-xs font-medium text-sky-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>{badge}</span>
            </div>

            <h1 className="font-display text-3xl leading-[1.15] font-extrabold tracking-tight sm:text-5xl lg:text-[3.25rem]">
              {headlinePrefix}{' '}
              <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-400 bg-clip-text text-transparent">
                {headlineHighlight}
              </span>
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {description}
            </p>

            {/* Tombol Aksi Utama */}
            <div className="flex flex-col items-stretch gap-3.5 pt-2 sm:flex-row sm:items-center">
              <a
                href={primaryCtaHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-sky-500/25 transition-all hover:bg-sky-400"
              >
                <span>{primaryCtaLabel}</span>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href={secondaryCtaHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-slate-800"
              >
                <span>{secondaryCtaLabel}</span>
              </a>
            </div>

            {/* Sorotan Nilai Inti */}
            <div className="grid grid-cols-2 gap-4 border-t border-slate-800/80 pt-6 sm:grid-cols-4">
              {values.map((val, idx) => (
                <div key={idx}>
                  <div
                    className={`font-display text-xl font-bold ${getValueColorClass(val.accentColor)}`}
                  >
                    {val.title}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-400">{val.subtitle}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Kolom Kanan: Visual Workspace & Terminal Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-slate-800 bg-slate-900 p-3 shadow-2xl">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Lingkungan Pengembangan Perangkat Lunak MaktabIT Technology"
                  className="h-full w-full object-cover object-center opacity-90 transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                {/* Overlay Kartu Kode Mengambang */}
                <div className="absolute right-3 bottom-3 left-3 rounded-xl border border-slate-700/80 bg-slate-950/90 p-3.5 font-mono text-xs backdrop-blur-md">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {terminalCard?.filename || 'maktabit.config.ts'}
                    </span>
                  </div>
                  <div className="space-y-0.5 text-slate-300">
                    <div>
                      <span className="text-sky-400">const</span> company ={' '}
                      <span className="text-emerald-400">
                        &quot;{terminalCard?.companyValue || 'MaktabIT Technology'}&quot;
                      </span>
                      ;
                    </div>
                    <div>
                      <span className="text-sky-400">const</span> focus = [
                      <span className="text-amber-300">
                        {terminalCard?.focusProjects || '"TaskWorkerPro", "QuranWeb"'}
                      </span>
                      ];
                    </div>
                    <div className="text-slate-400">
                      {terminalCard?.commentLine || '// Membangun solusi digital berdampak'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
