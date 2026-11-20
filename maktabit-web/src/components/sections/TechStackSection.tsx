import React from 'react'

export interface TechStackItemData {
  id?: string | number
  code: string
  title: string
  description: string
  accentColor?: 'sky' | 'emerald' | 'indigo' | 'amber' | null
}

export interface TechStackSectionProps {
  techStacks?: TechStackItemData[]
}

const DEFAULT_TECH_STACKS: TechStackItemData[] = [
  {
    code: '01 // FRONTEND',
    title: 'Antarmuka Reaktif',
    description:
      'HTML5, Tailwind CSS, JavaScript / TypeScript, React & Next.js untuk pengalaman UI yang mulus.',
    accentColor: 'sky',
  },
  {
    code: '02 // BACKEND',
    title: 'Arsitektur Layanan',
    description:
      'Node.js, Go, Python, serta sistem antrean worker asinkron yang tangguh.',
    accentColor: 'emerald',
  },
  {
    code: '03 // DATA & API',
    title: 'Manajemen Data',
    description:
      'PostgreSQL, MySQL, Redis Caching, dan desain RESTful API yang terdokumentasi rapi.',
    accentColor: 'indigo',
  },
  {
    code: '04 // DEVOPS',
    title: 'Deployment & CI/CD',
    description:
      'Kontainerisasi Docker, Git workflow, serta otomasi pengujian dan rilis berkelanjutan.',
    accentColor: 'amber',
  },
]

function getAccentStyle(accent?: TechStackItemData['accentColor']) {
  switch (accent) {
    case 'emerald':
      return { text: 'text-emerald-400', hoverBorder: 'hover:border-emerald-500/50' }
    case 'indigo':
      return { text: 'text-indigo-400', hoverBorder: 'hover:border-indigo-500/50' }
    case 'amber':
      return { text: 'text-amber-400', hoverBorder: 'hover:border-amber-500/50' }
    case 'sky':
    default:
      return { text: 'text-sky-400', hoverBorder: 'hover:border-sky-500/50' }
  }
}

export function TechStackSection({ techStacks = DEFAULT_TECH_STACKS }: TechStackSectionProps) {
  const activeStacks = techStacks.length > 0 ? techStacks : DEFAULT_TECH_STACKS

  return (
    <section id="teknologi" className="bg-slate-900 py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="font-mono text-xs font-semibold tracking-widest text-sky-400 uppercase">
            Standar Rekayasa
          </span>
          <h2 className="font-display mt-2 text-2xl font-extrabold sm:text-3xl">
            Ekosistem Teknologi Modern
          </h2>
          <p className="mt-2 text-sm text-slate-400 sm:text-base">
            Kami memilih tumpukan teknologi (<em>tech stack</em>) yang teruji untuk menjamin
            kecepatan pengembangan, keamanan data, dan kemudahan skalabilitas.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {activeStacks.map((stack, idx) => {
            const style = getAccentStyle(stack.accentColor)
            return (
              <div
                key={stack.id ?? idx}
                className={`rounded-2xl border border-slate-800 bg-slate-950/70 p-5 transition-colors ${style.hoverBorder}`}
              >
                <div className={`mb-1 font-mono text-xs ${style.text}`}>{stack.code}</div>
                <div className="font-display mb-1 text-base font-bold text-white">
                  {stack.title}
                </div>
                <p className="text-xs leading-relaxed text-slate-400">{stack.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
