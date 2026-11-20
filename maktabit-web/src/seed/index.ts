import type { Payload } from 'payload'

import type { Post } from '../payload-types'

function createLexicalContent(blocks: Array<{ type: 'h2' | 'p'; text: string }>): Post['content'] {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: blocks.map((block) => {
        if (block.type === 'h2') {
          return {
            type: 'heading',
            tag: 'h2',
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              {
                type: 'text',
                text: block.text,
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                version: 1,
              },
            ],
          }
        }
        return {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr',
          textFormat: 0,
          textStyle: '',
          children: [
            {
              type: 'text',
              text: block.text,
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              version: 1,
            },
          ],
        }
      }),
    },
  }
}

export async function seedDatabase(payload: Payload): Promise<void> {
  payload.logger.info('Memulai proses seeding data awal PT. MaktabIT Technology...')

  // 1. Seed SiteSettings Global
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      companyName: 'MaktabIT Technology',
      brandPrefix: 'Maktab',
      brandHighlight: 'IT',
      tagline: 'Solusi Rekayasa Perangkat Lunak & Inovasi Digital',
      copyrightText: '© 2026 MaktabIT Technology. Seluruh hak cipta dilindungi undang-undang.',
      splashEnabled: true,
      splashTagline:
        'Merancang fondasi perangkat lunak yang presisi, skalabel, dan berdampak nyata bagi transformasi digital masa depan.',
      splashStages: [
        { minProgress: 0, label: 'Menyiapkan lingkungan kerja MaktabIT...' },
        { minProgress: 30, label: 'Memuat modul profil & layanan...' },
        { minProgress: 65, label: 'Menghubungkan portofolio proyek awal...' },
        { minProgress: 95, label: 'Siap digunakan!' },
      ],
      heroBadge: 'Software Engineering & Digital Product Studio',
      heroHeadlinePrefix: 'Membangun Perangkat Lunak Cerdas untuk',
      heroHeadlineHighlight: 'Efisiensi & Kebermanfaatan',
      heroDescription:
        'Selamat datang di MaktabIT Technology. Terinspirasi dari filosofi "Maktab" sebagai pusat literasi, karya, dan produktivitas, kami hadir sebagai mitra pengembangan perangkat lunak yang menggabungkan ketajaman arsitektur kode dengan desain antarmuka yang humanis.',
      heroPrimaryCtaLabel: 'Eksplorasi Proyek Awal',
      heroPrimaryCtaHref: '#proyek',
      heroSecondaryCtaLabel: 'Baca Prakata Perusahaan',
      heroSecondaryCtaHref: '#tentang',
      heroImageUrl:
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
      coreValues: [
        { title: 'Clean Code', subtitle: 'Arsitektur Terstruktur', accentColor: 'white' },
        { title: 'Agile Dev', subtitle: 'Iterasi Cepat & Tepat', accentColor: 'sky' },
        { title: 'Open Tech', subtitle: 'Inovasi Terbuka', accentColor: 'emerald' },
        { title: 'Scalable', subtitle: 'Siap Berkembang', accentColor: 'white' },
      ],
      terminalCard: {
        filename: 'maktabit.config.ts',
        companyValue: 'MaktabIT Technology',
        focusProjects: '"TaskWorkerPro", "QuranWeb"',
        commentLine: '// Membangun solusi digital berdampak',
      },
      aboutBadge: 'Prakata & Perkenalan Perusahaan',
      aboutHeadline: 'Menjembatani Ide Kompleks Menjadi Produk Digital yang Andal',
      aboutGreeting: 'Assalamu’alaikum Warahmatullahi Wabarakatuh & Salam Inovasi,',
      aboutParagraphs: [
        {
          text: 'MaktabIT Technology didirikan atas keyakinan bahwa perangkat lunak yang hebat bukan hanya tentang baris kode yang rumit, melainkan tentang seberapa besar solusi tersebut mempermudah pekerjaan manusia, mempercepat produktivitas, dan memberikan nilai manfaat yang berkelanjutan.',
        },
        {
          text: 'Sebagai perusahaan yang berfokus pada pengembangan perangkat lunak (Software Development), kami mengawali langkah melalui riset dan pembuatan produk nyata—mulai dari otomasi manajemen tugas berskala tinggi hingga platform literasi digital yang ringan dan mudah diakses oleh masyarakat luas.',
        },
      ],
      aboutImageUrl:
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
      logoPhilosophyTitle: 'Filosofi Identitas MaktabIT',
      logoPhilosophyDescription:
        'Monogram "M" menyerupai lembar buku terbuka di dalam bingkai segi delapan presisi, melambangkan perpaduan antara ilmu pengetahuan (Maktab) dan rekayasa teknologi modern (IT).',
      visionTitle: 'Visi Kami',
      visionDescription:
        'Menjadi studio rekayasa perangkat lunak terpercaya yang melahirkan inovasi teknologi berstandar global, efisien, dan bernilai guna tinggi.',
      missionTitle: 'Misi Kami',
      missionDescription:
        'Mengembangkan sistem otomasi bisnis, aplikasi web modern, serta platform digital berbasis clean architecture dengan pengalaman pengguna terbaik.',
      contactBadge: 'HUBUNGI KAMI',
      contactHeadline: 'Mari Diskusikan Proyek Digital Anda Bersama MaktabIT',
      contactDescription:
        'Tertarik berkolaborasi pada pengembangan TaskWorkerPro, QuranWeb, atau membutuhkan tim rekayasa perangkat lunak untuk sistem baru Anda? Kirimkan pesan kepada kami.',
      email: 'hello@maktabit.tech',
      location: 'Jakarta, Indonesia',
      githubUrl: 'https://github.com/zhavick',
      githubLabel: 'github.com/zhavick',
      slaText: 'Respons cepat dalam 1x24 jam hari kerja.',
      consultationTopics: [
        { topic: 'Pengembangan Aplikasi Web Custom' },
        { topic: 'Kolaborasi / Implementasi TaskWorkerPro' },
        { topic: 'Kolaborasi / Pengembangan QuranWeb' },
        { topic: 'Konsultasi Arsitektur Sistem & API' },
      ],
    },
  })
  payload.logger.info('✓ Global SiteSettings berhasil diperbarui.')

  // 2. Seed Services
  const existingServices = await payload.count({ collection: 'services' })
  if (existingServices.totalDocs === 0) {
    const servicesData = [
      {
        title: 'Custom Web Application',
        description:
          'Pengembangan aplikasi berbasis web modern yang responsif, cepat, dan aman sesuai kebutuhan operasional bisnis maupun institusi.',
        icon: 'code' as const,
        accentColor: 'sky' as const,
        sortOrder: 1,
        isActive: true,
      },
      {
        title: 'Otomasi & Task Worker',
        description:
          'Perancangan sistem penjadwalan tugas otomatis (background worker), antrean proses, dan manajemen alur kerja terdistribusi.',
        icon: 'refresh' as const,
        accentColor: 'emerald' as const,
        sortOrder: 2,
        isActive: true,
      },
      {
        title: 'Platform Literasi & Edukasi',
        description:
          "Pembangunan portal konten digital, aplikasi Al-Qur'an web, dan sistem pembelajaran interaktif dengan tipografi nyaman dibaca.",
        icon: 'book' as const,
        accentColor: 'indigo' as const,
        sortOrder: 3,
        isActive: true,
      },
      {
        title: 'API & Arsitektur Sistem',
        description:
          'Integrasi REST/GraphQL API, optimasi basis data, serta konsultasi arsitektur cloud-ready yang mudah dipelihara.',
        icon: 'server' as const,
        accentColor: 'amber' as const,
        sortOrder: 4,
        isActive: true,
      },
    ]

    for (const service of servicesData) {
      await payload.create({ collection: 'services', data: service })
    }
    payload.logger.info('✓ 4 Layanan awal berhasil ditambahkan.')
  }

  // 3. Seed Projects
  const existingProjects = await payload.count({ collection: 'projects' })
  if (existingProjects.totalDocs === 0) {
    const projectsData = [
      {
        projectCode: 'PROJECT #01',
        title: 'TaskWorkerPro',
        slug: 'taskworker',
        categoryLabel: 'Workflow & Automation',
        modalBadge: 'PROJECT #01 • WORKFLOW ENGINE',
        accentColor: 'sky' as const,
        shortDesc:
          'TaskWorkerPro adalah sistem manajemen tugas, penjadwalan proses latar belakang (background worker), dan pemantauan alur kerja operasional yang dirancang untuk meningkatkan keandalan eksekusi tugas dan efisiensi produktivitas tim.',
        architectureSummary:
          'Dibangun dengan pendekatan modular untuk memisahkan antarmuka kontrol dari worker eksekutor, memastikan proses berat berjalan stabil tanpa menghambat responsivitas aplikasi utama.',
        capabilities: [
          { item: 'Manajemen antrean tugas (task queue) & eksekusi pekerja terstruktur.' },
          { item: 'Pemantauan status progres secara real-time dan pencatatan log aktivitas.' },
          { item: 'Arsitektur modular yang mudah diintegrasikan ke berbagai layanan.' },
        ],
        techTags: [
          { tag: 'Task Scheduling' },
          { tag: 'Worker Engine' },
          { tag: 'REST API' },
          { tag: 'Dashboard UI' },
        ],
        coverImageUrl:
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
        githubUrl: 'https://github.com/zhavick/TaskWorkerPro',
        githubDisplay: 'github.com/zhavick/TaskWorkerPro',
        sortOrder: 1,
        isFeatured: true,
      },
      {
        projectCode: 'PROJECT #02',
        title: 'QuranWeb',
        slug: 'quranweb',
        categoryLabel: 'Digital Islamic & Literacy',
        modalBadge: 'PROJECT #02 • DIGITAL LITERACY',
        accentColor: 'emerald' as const,
        shortDesc:
          "QuranWeb adalah platform Al-Qur'an digital berbasis web modern yang menghadirkan antarmuka bersih, bebas gangguan, serta navigasi surah dan ayat yang cepat untuk kenyamanan tilawah dan tadabbur di berbagai perangkat.",
        architectureSummary:
          'Menggunakan arsitektur web ringan dengan pemuatan data surah yang cepat dan tata letak responsif agar nyaman diakses dari perangkat seluler maupun layar komputer.',
        capabilities: [
          { item: 'Indeks 114 surah lengkap dengan pencarian instan & navigasi ayat cepat.' },
          { item: 'Tipografi teks Arab yang jernih dilengkapi terjemahan yang mudah dipahami.' },
          { item: 'Performa ringan & desain responsif optimal untuk ponsel maupun desktop.' },
        ],
        techTags: [
          { tag: 'Modern Web UI' },
          { tag: 'Arabic Typography' },
          { tag: 'Quran API' },
          { tag: 'Responsive' },
        ],
        coverImageUrl:
          'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1000&q=80',
        githubUrl: 'https://github.com/zhavick/QuranWeb',
        githubDisplay: 'github.com/zhavick/QuranWeb',
        sortOrder: 2,
        isFeatured: true,
      },
    ]

    for (const project of projectsData) {
      await payload.create({ collection: 'projects', data: project })
    }
    payload.logger.info('✓ 2 Proyek Portofolio awal (TaskWorkerPro & QuranWeb) berhasil ditambahkan.')
  }

  // 4. Seed TechStacks
  const existingTechStacks = await payload.count({ collection: 'tech-stacks' })
  if (existingTechStacks.totalDocs === 0) {
    const techStacksData = [
      {
        code: '01 // FRONTEND',
        title: 'Antarmuka Reaktif',
        description:
          'HTML5, Tailwind CSS, JavaScript / TypeScript, React & Next.js untuk pengalaman UI yang mulus.',
        accentColor: 'sky' as const,
        sortOrder: 1,
      },
      {
        code: '02 // BACKEND',
        title: 'Arsitektur Layanan',
        description:
          'Node.js, Go, Python, serta sistem antrean worker asinkron yang tangguh.',
        accentColor: 'emerald' as const,
        sortOrder: 2,
      },
      {
        code: '03 // DATA & API',
        title: 'Manajemen Data',
        description:
          'PostgreSQL, MySQL, Redis Caching, dan desain RESTful API yang terdokumentasi rapi.',
        accentColor: 'indigo' as const,
        sortOrder: 3,
      },
      {
        code: '04 // DEVOPS',
        title: 'Deployment & CI/CD',
        description:
          'Kontainerisasi Docker, Git workflow, serta otomasi pengujian dan rilis berkelanjutan.',
        accentColor: 'amber' as const,
        sortOrder: 4,
      },
    ]

    for (const stack of techStacksData) {
      await payload.create({ collection: 'tech-stacks', data: stack })
    }
    payload.logger.info('✓ 4 Pilar Ekosistem Teknologi berhasil ditambahkan.')
  }

  // 5. Seed Categories, Tags & Initial Blog Posts
  const existingPosts = await payload.count({ collection: 'posts' })
  if (existingPosts.totalDocs === 0) {
    const catEngineering = await payload.create({
      collection: 'categories',
      data: {
        name: 'Rekayasa Perangkat Lunak',
        slug: 'rekayasa-perangkat-lunak',
        description: 'Kajian teknis seputar arsitektur sistem, clean code, dan praktik pengembangan modern.',
      },
    })

    const catAutomation = await payload.create({
      collection: 'categories',
      data: {
        name: 'Otomasi & Sistem Terdistribusi',
        slug: 'otomasi-sistem-terdistribusi',
        description: 'Pembahasan mendalam mengenai background worker, antrean tugas, dan efisiensi operasional.',
      },
    })

    const catLiteracy = await payload.create({
      collection: 'categories',
      data: {
        name: 'Inovasi & Literasi Digital',
        slug: 'inovasi-literasi-digital',
        description: 'Eksplorasi antarmuka pengguna, tipografi, dan pengembangan produk digital berdampak.',
      },
    })

    const tagCleanArch = await payload.create({
      collection: 'tags',
      data: { name: 'Clean Architecture', slug: 'clean-architecture' },
    })
    const tagWorker = await payload.create({
      collection: 'tags',
      data: { name: 'Background Worker', slug: 'background-worker' },
    })
    const tagNextjs = await payload.create({
      collection: 'tags',
      data: { name: 'Next.js', slug: 'nextjs' },
    })
    const tagQuranWeb = await payload.create({
      collection: 'tags',
      data: { name: 'QuranWeb', slug: 'quranweb' },
    })

    const postsData = [
      {
        title: 'Arsitektur Background Worker Modern: Pelajaran dari Pengembangan TaskWorkerPro',
        slug: 'arsitektur-background-worker-modern-taskworkerpro',
        excerpt:
          'Bagaimana memisahkan beban proses asinkron dari aplikasi utama agar sistem tetap responsif, terukur, dan mudah dipantau secara real-time.',
        category: catAutomation.id,
        tags: [tagWorker.id, tagCleanArch.id],
        status: 'published' as const,
        publishedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        readingTimeMinutes: 5,
        coverImageUrl:
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
        content: createLexicalContent([
          {
            type: 'p',
            text: 'Dalam pengembangan aplikasi skala enterprise maupun produk digital bertumbuh, salah satu hambatan performa yang paling sering muncul adalah mengeksekusi pekerjaan berat secara sinkron di jalur request-response utama.',
          },
          {
            type: 'h2',
            text: 'Memisahkan Control Plane dan Worker Executor',
          },
          {
            type: 'p',
            text: 'Melalui inisiatif TaskWorkerPro, tim MaktabIT Technology merancang arsitektur modular yang memisahkan antarmuka kendali (control plane) dari mesin eksekutor latar belakang. Setiap tugas dimasukkan ke dalam antrean terstruktur dengan mekanisme retry otomatis dan pencatatan log terpusat.',
          },
          {
            type: 'h2',
            text: 'Observabilitas sebagai Prioritas Utama',
          },
          {
            type: 'p',
            text: 'Sistem otomasi yang baik bukan hanya sistem yang berjalan di belakang layar, melainkan sistem yang transparan. Dengan dashboard pemantauan real-time, tim engineering dapat segera mendeteksi bottleneck sebelum berdampak pada pengguna akhir.',
          },
        ]),
      },
      {
        title: "Merancang Tipografi & Pengalaman Membaca Al-Qur'an Digital yang Tenang pada QuranWeb",
        slug: 'merancang-tipografi-dan-pengalaman-membaca-quranweb',
        excerpt:
          'Pendekatan desain humanis pada QuranWeb untuk menghadirkan kejernihan teks Arab, kecepatan navigasi 114 surah, dan antarmuka bebas distraksi.',
        category: catLiteracy.id,
        tags: [tagQuranWeb.id, tagNextjs.id],
        status: 'published' as const,
        publishedAt: new Date(Date.now() - 1 * 86400000).toISOString(),
        readingTimeMinutes: 4,
        coverImageUrl:
          'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1000&q=80',
        content: createLexicalContent([
          {
            type: 'p',
            text: 'Filosofi "Maktab" berangkat dari semangat literasi dan ilmu pengetahuan. Ketika kami merancang QuranWeb, fokus utama kami adalah bagaimana teknologi web modern dapat menghadirkan pengalaman tilawah dan tadabbur yang tenang tanpa gangguan visual.',
          },
          {
            type: 'h2',
            text: 'Kejernihan Tipografi Arab & Kecepatan Akses',
          },
          {
            type: 'p',
            text: 'Pemilihan proporsi ukuran huruf Arab, jarak antarbaris (line-height), serta kontras warna dirancang agar mata pembaca tidak cepat lelah baik saat diakses melalui layar ponsel maupun monitor desktop.',
          },
        ]),
      },
      {
        title: 'Mengapa Clean Architecture Penting bagi Skalabilitas Produk Digital Perusahaan',
        slug: 'mengapa-clean-architecture-penting-bagi-skalabilitas-produk',
        excerpt:
          'Standar rekayasa perangkat lunak di MaktabIT Technology dalam menjaga kode tetap bersih, mudah diuji, dan siap berkembang jangka panjang.',
        category: catEngineering.id,
        tags: [tagCleanArch.id, tagNextjs.id],
        status: 'published' as const,
        publishedAt: new Date().toISOString(),
        readingTimeMinutes: 6,
        coverImageUrl:
          'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
        content: createLexicalContent([
          {
            type: 'p',
            text: 'Perangkat lunak yang sukses akan selalu mengalami perubahan kebutuhan bisnis. Tanpa fondasi arsitektur kode yang terstruktur, setiap penambahan fitur baru justru akan memperlambat kecepatan tim dan meningkatkan risiko regresi.',
          },
          {
            type: 'h2',
            text: 'Fondasi Kode yang Mudah Dipelihara',
          },
          {
            type: 'p',
            text: 'Di MaktabIT Technology, kami menerapkan pemisahan tanggung jawab (separation of concerns), pengetikan statis dengan TypeScript, serta dokumentasi API yang jelas agar setiap sistem yang kami bangun menjadi aset jangka panjang bagi mitra kami.',
          },
        ]),
      },
    ]

    for (const post of postsData) {
      await payload.create({ collection: 'posts', data: post })
    }
    payload.logger.info('✓ 3 Kategori, 4 Tag, dan 3 Artikel Blog awal berhasil ditambahkan.')
  }

  payload.logger.info('Seeding data awal PT. MaktabIT Technology selesai!')
}
