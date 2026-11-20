import React from 'react'

export interface AboutSectionProps {
  badge?: string
  headline?: string
  greeting?: string
  paragraphs?: string[]
  imageUrl?: string
  logoPhilosophyTitle?: string
  logoPhilosophyDescription?: string
  visionTitle?: string
  visionDescription?: string
  missionTitle?: string
  missionDescription?: string
}

const DEFAULT_PARAGRAPHS = [
  'MaktabIT Technology didirikan atas keyakinan bahwa perangkat lunak yang hebat bukan hanya tentang baris kode yang rumit, melainkan tentang seberapa besar solusi tersebut mempermudah pekerjaan manusia, mempercepat produktivitas, dan memberikan nilai manfaat yang berkelanjutan.',
  'Sebagai perusahaan yang berfokus pada pengembangan perangkat lunak (Software Development), kami mengawali langkah melalui riset dan pembuatan produk nyata—mulai dari otomasi manajemen tugas berskala tinggi hingga platform literasi digital yang ringan dan mudah diakses oleh masyarakat luas.',
]

export function AboutSection({
  badge = 'Prakata & Perkenalan Perusahaan',
  headline = 'Menjembatani Ide Kompleks Menjadi Produk Digital yang Andal',
  greeting = 'Assalamu’alaikum Warahmatullahi Wabarakatuh & Salam Inovasi,',
  paragraphs = DEFAULT_PARAGRAPHS,
  imageUrl = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
  logoPhilosophyTitle = 'Filosofi Identitas MaktabIT',
  logoPhilosophyDescription = 'Monogram "M" menyerupai lembar buku terbuka di dalam bingkai segi delapan presisi, melambangkan perpaduan antara ilmu pengetahuan (Maktab) dan rekayasa teknologi modern (IT).',
  visionTitle = 'Visi Kami',
  visionDescription = 'Menjadi studio rekayasa perangkat lunak terpercaya yang melahirkan inovasi teknologi berstandar global, efisien, dan bernilai guna tinggi.',
  missionTitle = 'Misi Kami',
  missionDescription = 'Mengembangkan sistem otomasi bisnis, aplikasi web modern, serta platform digital berbasis clean architecture dengan pengalaman pengguna terbaik.',
}: AboutSectionProps) {
  const activeParagraphs = paragraphs.length > 0 ? paragraphs : DEFAULT_PARAGRAPHS

  return (
    <section id="tentang" className="border-b border-slate-200/80 bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Visual & Kartu Filosofi Logo */}
          <div className="space-y-6 lg:col-span-5">
            <div className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt="Kolaborasi Tim MaktabIT Technology"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Kartu Filosofi Identitas Logo */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-800">
                  <svg
                    className="h-7 w-7"
                    viewBox="0 0 72 72"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24 8H48L64 24V48L48 64H24L8 48V24L24 8Z"
                      stroke="#38BDF8"
                      strokeWidth="4"
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
                <div>
                  <h4 className="font-display text-base font-bold text-white">
                    {logoPhilosophyTitle}
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-300 sm:text-sm">
                    {logoPhilosophyDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Prakata Eksekutif & Visi Misi */}
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
              {badge}
            </div>

            <h2 className="font-display text-2xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              {headline}
            </h2>

            <div className="space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base">
              {greeting && (
                <p>
                  <strong>{greeting}</strong>
                </p>
              )}
              {activeParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Visi & Misi Grid */}
            <div className="grid grid-cols-1 gap-4 pt-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-5">
                <div className="mb-2 flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sm font-bold text-sky-600">
                    01
                  </span>
                  <h3 className="font-display font-bold text-slate-900">{visionTitle}</h3>
                </div>
                <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {visionDescription}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-5">
                <div className="mb-2 flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-sm font-bold text-emerald-600">
                    02
                  </span>
                  <h3 className="font-display font-bold text-slate-900">{missionTitle}</h3>
                </div>
                <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {missionDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
