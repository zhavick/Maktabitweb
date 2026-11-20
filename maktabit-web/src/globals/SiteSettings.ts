import type { GlobalConfig } from 'payload'

import { isAdminOrEditor, publicRead } from '../access/roles'
import { revalidateGlobalHook } from '../hooks/revalidateSite'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Pengaturan Situs & Konten Utama',
  admin: {
    group: 'Konten Halaman',
  },
  access: {
    read: publicRead,
    update: isAdminOrEditor,
  },
  hooks: {
    afterChange: [revalidateGlobalHook],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Umum & Splash Screen',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'companyName',
                  label: 'Nama Perusahaan',
                  type: 'text',
                  required: true,
                  defaultValue: 'MaktabIT Technology',
                },
                {
                  name: 'brandPrefix',
                  label: 'Teks Brand Utama',
                  type: 'text',
                  required: true,
                  defaultValue: 'Maktab',
                },
                {
                  name: 'brandHighlight',
                  label: 'Teks Highlight Brand',
                  type: 'text',
                  required: true,
                  defaultValue: 'IT',
                },
              ],
            },
            {
              name: 'tagline',
              label: 'Tagline Perusahaan',
              type: 'text',
              required: true,
              defaultValue: 'Solusi Rekayasa Perangkat Lunak & Inovasi Digital',
            },
            {
              name: 'logo',
              label: 'Logo Kustom (Opsional, kosongkan untuk memakai SVG MaktabIT bawaan)',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'copyrightText',
              label: 'Teks Hak Cipta Footer',
              type: 'text',
              required: true,
              defaultValue:
                '© 2026 MaktabIT Technology. Seluruh hak cipta dilindungi undang-undang.',
            },
            {
              name: 'splashEnabled',
              label: 'Aktifkan Splash Screen Interaktif',
              type: 'checkbox',
              defaultValue: true,
            },
            {
              name: 'splashTagline',
              label: 'Deskripsi Singkat pada Splash Screen',
              type: 'textarea',
              defaultValue:
                'Merancang fondasi perangkat lunak yang presisi, skalabel, dan berdampak nyata bagi transformasi digital masa depan.',
            },
            {
              name: 'splashStages',
              label: 'Tahapan Loading Splash Screen',
              type: 'array',
              defaultValue: [
                { minProgress: 0, label: 'Menyiapkan lingkungan kerja MaktabIT...' },
                { minProgress: 30, label: 'Memuat modul profil & layanan...' },
                { minProgress: 65, label: 'Menghubungkan portofolio proyek awal...' },
                { minProgress: 95, label: 'Siap digunakan!' },
              ],
              fields: [
                {
                  name: 'minProgress',
                  label: 'Persentase Minimum (0-100)',
                  type: 'number',
                  required: true,
                  min: 0,
                  max: 100,
                },
                {
                  name: 'label',
                  label: 'Teks Status',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Hero Section',
          fields: [
            {
              name: 'heroBadge',
              label: 'Label Badge Hero',
              type: 'text',
              required: true,
              defaultValue: 'Software Engineering & Digital Product Studio',
            },
            {
              name: 'heroHeadlinePrefix',
              label: 'Judul Utama (Bagian Awal)',
              type: 'text',
              required: true,
              defaultValue: 'Membangun Perangkat Lunak Cerdas untuk',
            },
            {
              name: 'heroHeadlineHighlight',
              label: 'Judul Utama (Bagian Highlight Gradien)',
              type: 'text',
              required: true,
              defaultValue: 'Efisiensi & Kebermanfaatan',
            },
            {
              name: 'heroDescription',
              label: 'Paragraf Pengantar Hero',
              type: 'textarea',
              required: true,
              defaultValue:
                'Selamat datang di MaktabIT Technology. Terinspirasi dari filosofi "Maktab" sebagai pusat literasi, karya, dan produktivitas, kami hadir sebagai mitra pengembangan perangkat lunak yang menggabungkan ketajaman arsitektur kode dengan desain antarmuka yang humanis.',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'heroPrimaryCtaLabel',
                  label: 'Teks Tombol Utama',
                  type: 'text',
                  defaultValue: 'Eksplorasi Proyek Awal',
                },
                {
                  name: 'heroPrimaryCtaHref',
                  label: 'Target Link Tombol Utama',
                  type: 'text',
                  defaultValue: '#proyek',
                },
                {
                  name: 'heroSecondaryCtaLabel',
                  label: 'Teks Tombol Sekunder',
                  type: 'text',
                  defaultValue: 'Baca Prakata Perusahaan',
                },
                {
                  name: 'heroSecondaryCtaHref',
                  label: 'Target Link Tombol Sekunder',
                  type: 'text',
                  defaultValue: '#tentang',
                },
              ],
            },
            {
              name: 'heroImage',
              label: 'Gambar Workspace Hero (Upload Media)',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'heroImageUrl',
              label: 'URL Gambar Hero (Fallback jika belum upload media)',
              type: 'text',
              defaultValue:
                'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
            },
            {
              name: 'coreValues',
              label: 'Sorotan 4 Nilai Inti',
              type: 'array',
              defaultValue: [
                { title: 'Clean Code', subtitle: 'Arsitektur Terstruktur', accentColor: 'white' },
                { title: 'Agile Dev', subtitle: 'Iterasi Cepat & Tepat', accentColor: 'sky' },
                { title: 'Open Tech', subtitle: 'Inovasi Terbuka', accentColor: 'emerald' },
                { title: 'Scalable', subtitle: 'Siap Berkembang', accentColor: 'white' },
              ],
              fields: [
                {
                  name: 'title',
                  label: 'Judul Nilai',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'subtitle',
                  label: 'Sub-judul',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'accentColor',
                  label: 'Warna Teks Judul',
                  type: 'select',
                  defaultValue: 'white',
                  options: [
                    { label: 'Putih', value: 'white' },
                    { label: 'Biru (Sky)', value: 'sky' },
                    { label: 'Hijau (Emerald)', value: 'emerald' },
                  ],
                },
              ],
            },
            {
              name: 'terminalCard',
              label: 'Kartu Kode Mengambang (Hero)',
              type: 'group',
              fields: [
                {
                  name: 'filename',
                  label: 'Nama File Konfigurasi',
                  type: 'text',
                  defaultValue: 'maktabit.config.ts',
                },
                {
                  name: 'companyValue',
                  label: 'Nilai const company',
                  type: 'text',
                  defaultValue: 'MaktabIT Technology',
                },
                {
                  name: 'focusProjects',
                  label: 'Daftar Fokus Proyek',
                  type: 'text',
                  defaultValue: '"TaskWorkerPro", "QuranWeb"',
                },
                {
                  name: 'commentLine',
                  label: 'Komentar Kode',
                  type: 'text',
                  defaultValue: '// Membangun solusi digital berdampak',
                },
              ],
            },
          ],
        },
        {
          label: 'Tentang Kami (Prakata & Visi Misi)',
          fields: [
            {
              name: 'aboutBadge',
              label: 'Label Badge Tentang Kami',
              type: 'text',
              defaultValue: 'Prakata & Perkenalan Perusahaan',
            },
            {
              name: 'aboutHeadline',
              label: 'Judul Bagian Tentang Kami',
              type: 'text',
              required: true,
              defaultValue: 'Menjembatani Ide Kompleks Menjadi Produk Digital yang Andal',
            },
            {
              name: 'aboutGreeting',
              label: 'Salam Pembuka Prakata',
              type: 'text',
              defaultValue: 'Assalamu’alaikum Warahmatullahi Wabarakatuh & Salam Inovasi,',
            },
            {
              name: 'aboutParagraphs',
              label: 'Paragraf Prakata Perusahaan',
              type: 'array',
              defaultValue: [
                {
                  text: 'MaktabIT Technology didirikan atas keyakinan bahwa perangkat lunak yang hebat bukan hanya tentang baris kode yang rumit, melainkan tentang seberapa besar solusi tersebut mempermudah pekerjaan manusia, mempercepat produktivitas, dan memberikan nilai manfaat yang berkelanjutan.',
                },
                {
                  text: 'Sebagai perusahaan yang berfokus pada pengembangan perangkat lunak (Software Development), kami mengawali langkah melalui riset dan pembuatan produk nyata—mulai dari otomasi manajemen tugas berskala tinggi hingga platform literasi digital yang ringan dan mudah diakses oleh masyarakat luas.',
                },
              ],
              fields: [
                {
                  name: 'text',
                  label: 'Isi Paragraf',
                  type: 'textarea',
                  required: true,
                },
              ],
            },
            {
              name: 'aboutImage',
              label: 'Foto Tim / Kolaborasi (Upload Media)',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'aboutImageUrl',
              label: 'URL Foto Tim (Fallback jika belum upload media)',
              type: 'text',
              defaultValue:
                'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
            },
            {
              name: 'logoPhilosophyTitle',
              label: 'Judul Filosofi Logo',
              type: 'text',
              defaultValue: 'Filosofi Identitas MaktabIT',
            },
            {
              name: 'logoPhilosophyDescription',
              label: 'Penjelasan Filosofi Logo',
              type: 'textarea',
              defaultValue:
                'Monogram "M" menyerupai lembar buku terbuka di dalam bingkai segi delapan presisi, melambangkan perpaduan antara ilmu pengetahuan (Maktab) dan rekayasa teknologi modern (IT).',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'visionTitle',
                  label: 'Judul Visi',
                  type: 'text',
                  defaultValue: 'Visi Kami',
                },
                {
                  name: 'missionTitle',
                  label: 'Judul Misi',
                  type: 'text',
                  defaultValue: 'Misi Kami',
                },
              ],
            },
            {
              name: 'visionDescription',
              label: 'Deskripsi Visi',
              type: 'textarea',
              defaultValue:
                'Menjadi studio rekayasa perangkat lunak terpercaya yang melahirkan inovasi teknologi berstandar global, efisien, dan bernilai guna tinggi.',
            },
            {
              name: 'missionDescription',
              label: 'Deskripsi Misi',
              type: 'textarea',
              defaultValue:
                'Mengembangkan sistem otomasi bisnis, aplikasi web modern, serta platform digital berbasis clean architecture dengan pengalaman pengguna terbaik.',
            },
          ],
        },
        {
          label: 'Kontak & Kolaborasi',
          fields: [
            {
              name: 'contactBadge',
              label: 'Label Badge Kontak',
              type: 'text',
              defaultValue: 'HUBUNGI KAMI',
            },
            {
              name: 'contactHeadline',
              label: 'Judul Bagian Kontak',
              type: 'text',
              defaultValue: 'Mari Diskusikan Proyek Digital Anda Bersama MaktabIT',
            },
            {
              name: 'contactDescription',
              label: 'Deskripsi Bagian Kontak',
              type: 'textarea',
              defaultValue:
                'Tertarik berkolaborasi pada pengembangan TaskWorkerPro, QuranWeb, atau membutuhkan tim rekayasa perangkat lunak untuk sistem baru Anda? Kirimkan pesan kepada kami.',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'email',
                  label: 'Email Resmi',
                  type: 'email',
                  defaultValue: 'hello@maktabit.tech',
                },
                {
                  name: 'location',
                  label: 'Lokasi Kantor',
                  type: 'text',
                  defaultValue: 'Jakarta, Indonesia',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'githubUrl',
                  label: 'URL Profil GitHub',
                  type: 'text',
                  defaultValue: 'https://github.com/zhavick',
                },
                {
                  name: 'githubLabel',
                  label: 'Label Tampilan GitHub',
                  type: 'text',
                  defaultValue: 'github.com/zhavick',
                },
              ],
            },
            {
              name: 'slaText',
              label: 'Catatan Waktu Respons (SLA)',
              type: 'text',
              defaultValue: 'Respons cepat dalam 1x24 jam hari kerja.',
            },
            {
              name: 'consultationTopics',
              label: 'Daftar Pilihan Topik Form Konsultasi',
              type: 'array',
              defaultValue: [
                { topic: 'Pengembangan Aplikasi Web Custom' },
                { topic: 'Kolaborasi / Implementasi TaskWorkerPro' },
                { topic: 'Kolaborasi / Pengembangan QuranWeb' },
                { topic: 'Konsultasi Arsitektur Sistem & API' },
              ],
              fields: [
                {
                  name: 'topic',
                  label: 'Nama Topik',
                  type: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
