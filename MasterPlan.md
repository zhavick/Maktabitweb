# Master Plan Pengembangan Website & CMS — PT. MaktabIT Technology

Dokumen ini merupakan panduan arsitektur dan daftar teknologi yang dibutuhkan untuk mentransformasi tampilan statis [`Source/landing-sample.html`](Source/landing-sample.html) menjadi website perusahaan **PT. MaktabIT Technology** yang dinamis dengan kemampuan **Content Management System (CMS)** (blog informasi, pengelolaan profil & publikasi perusahaan, manajemen portofolio proyek, serta pengelolaan pesan kontak).

---

## 1. Analisis Kondisi Saat Ini (`landing-sample.html`)

Saat ini, file `Source/landing-sample.html` merupakan halaman statis *single-file* berbasis:
- **HTML5 + Vanilla JavaScript** (Splash Screen, Mobile Menu, Modal Ringkasan Proyek, Simulasi Form Kontak via Toast).
- **Tailwind CSS via CDN** (`cdn.tailwindcss.com`) — cocok untuk prototipe, namun **harus diganti ke build-time CSS** untuk produksi agar performa optimal.
- **Google Fonts** (`Plus Jakarta Sans`, `Inter`, `JetBrains Mono`).
- **Konten Hardcoded** yang idealnya menjadi dinamis melalui CMS:
  1. **Hero Section**: Judul utama, sub-judul, prakata singkat, gambar workspace, dan 4 nilai inti.
  2. **Prakata & Profil Perusahaan**: Sambutan eksekutif, filosofi logo, Visi & Misi.
  3. **Layanan Pengembangan Software**: Daftar layanan beserta ikon dan deskripsi.
  4. **Etalase Proyek (Portofolio)**: Kartu proyek (`TaskWorkerPro`, `QuranWeb`, dan proyek masa depan) beserta detail modal teknis dan tautan GitHub.
  5. **Ekosistem Teknologi**: Daftar *tech stack* perusahaan.
  6. **Kontak & Kolaborasi**: Alamat, email, tautan sosial media, dan form konsultasi (saat ini belum terhubung ke backend/database).
  7. **Fitur Baru yang Dibutuhkan**: Modul **Blog / Artikel Informasi & Publikasi**.

---

## 2. Kebutuhan Fungsional CMS

Agar website dapat dikelola tanpa harus mengubah kode HTML secara manual, sistem CMS perlu memiliki kapabilitas berikut:

1. **Manajemen Blog & Publikasi Informasi**
   - Membuat, mengedit, menghapus, dan menjadwalkan artikel/berita (CRUD).
   - Status publikasi: `Draft`, `Review`, `Published`, `Archived`.
   - Kategori, Tag, Pencarian artikel, dan Estimasi waktu baca.
   - *Rich Text Editor* (format teks, gambar, kutipan, tabel, dan *code block* dengan *syntax highlighting*).
2. **Manajemen Konten Halaman (Site Content / Page Builder Ringan)**
   - Mengubah teks Hero, Prakata, Visi & Misi, Layanan, Tech Stack, dan Informasi Kontak langsung dari dashboard admin.
   - Pengaturan aktif/nonaktif *Splash Screen* atau pesan pada *Splash Screen*.
3. **Manajemen Portofolio Proyek**
   - Menambah/mengubah proyek baru (judul, kategori, gambar, fitur utama, tag teknologi, ringkasan arsitektur untuk modal, dan tautan repositori/demo).
4. **Media Library**
   - Unggah, kelola, dan kompresi gambar (WebP/AVIF) untuk thumbnail artikel, banner, dan proyek.
5. **Inbox Pesan Kontak**
   - Menyimpan pesan dari formulir konsultasi ke database, menandai status (`Belum Dibaca`, `Sudah Dibalas`), dan mengirim notifikasi email otomatis ke tim MaktabIT.
6. **Manajemen Pengguna & Hak Akses (RBAC)**
   - Login aman untuk tim internal dengan peran berbeda (misal: `Super Admin`, `Editor`, `Author/Penulis`).
7. **SEO & Metadata Otomatis**
   - Pengaturan *Meta Title*, *Meta Description*, *OpenGraph Image*, *Slug URL*, serta `sitemap.xml` dan `robots.txt` otomatis.

---

## 3. Teknologi yang Harus Dimiliki (Tech Stack)

Berikut adalah daftar teknologi per lapisan arsitektur yang diperlukan.

### A. Frontend (Tampilan Publik & Interaktivitas)
| Komponen | Teknologi yang Disarankan | Fungsi & Alasan |
| :--- | :--- | :--- |
| **Framework UI** | **Next.js (App Router) + React** | Mendukung SSR (Server-Side Rendering) & ISR (Incremental Static Regeneration) sehingga halaman blog & landing page sangat cepat dan ramah SEO. Selaras dengan *tech stack* di `landing-sample.html`. |
| **Bahasa Pemrograman** | **TypeScript** | Menjaga konsistensi tipe data antara Frontend, API, dan Database sehingga minim *bug*. |
| **Styling** | **Tailwind CSS (PostCSS / v4)** | Mempertahankan 100% desain dari `landing-sample.html` namun dikompilasi secara efisien (ukuran file CSS sangat kecil). |
| **Animasi & Ikon** | **Framer Motion** (opsional) & **Lucide Icons** | Untuk transisi *Splash Screen*, modal proyek, dan ikon konsisten. |
| **Validasi Form** | **React Hook Form + Zod** | Validasi input form kontak & form dashboard CMS secara aman di sisi client dan server. |

---

### B. Backend & CMS Engine (Pilih Salah Satu Arsitektur)

Ada **3 pendekatan utama** yang dapat Anda pilih sesuai kenyamanan tim dan kecepatan pengembangan:

#### Opsi 1: Modern Integrated Full-Stack CMS *(Rekomendasi Utama)*
- **Teknologi**: **Next.js + Payload CMS 3.0** (atau **Next.js + Custom Admin Dashboard dengan Prisma/Drizzle ORM**).
- **Kelebihan**:
  - Frontend dan Admin Panel CMS berada dalam **satu repositori & satu deployment** (TypeScript *end-to-end*).
  - Payload CMS 3.0 langsung terpasang di dalam Next.js App Router (`/admin`), memiliki *Rich Text Editor* (Lexical), Media Library, RBAC, dan versi konten bawaan.
  - Sangat cocok untuk perusahaan *software engineering* modern seperti MaktabIT Technology.
- **Cocok jika**: Ingin arsitektur modern, performa tinggi, kontrol penuh atas kode, dan hemat biaya server.

#### Opsi 2: Headless CMS Terpisah
- **Teknologi**: **Next.js (Frontend)** + **Strapi** / **Directus** / **Sanity.io** (Backend CMS).
- **Kelebihan**:
  - UI Admin Panel langsung siap pakai tanpa perlu membangun komponen dashboard dari nol.
  - Menyediakan REST API & GraphQL otomatis sehingga konten bisa juga dipakai untuk aplikasi mobile di masa depan.
- **Kekurangan**: Perlu mengelola 2 layanan terpisah (Frontend dan Server CMS), kecuali memakai layanan *managed* seperti Sanity Cloud.

#### Opsi 3: Monolith PHP Modern *(Alternatif Cepat & Hemat Hosting)*
- **Teknologi**: **Laravel 11/12 + FilamentPHP + Tailwind CSS** (dengan Blade atau Inertia.js).
- **Kelebihan**:
  - **FilamentPHP** sangat cepat untuk membuat CMS lengkap (Blog, Media, Pengaturan Situs, RBAC) dalam hitungan hari.
  - Biaya hosting sangat terjangkau (bisa berjalan di VPS murah maupun *shared hosting* standar).
- **Cocok jika**: Tim lebih familier dengan ekosistem PHP/Laravel.

> **Rekomendasi untuk PT. MaktabIT Technology:** Gunakan **Opsi 1 (Next.js + Payload CMS 3.0 + PostgreSQL)** karena sangat konsisten dengan identitas teknologi yang ditampilkan di `landing-sample.html` (React, Next.js, TypeScript, Tailwind CSS, PostgreSQL).

---

### C. Database & Caching
| Komponen | Teknologi | Fungsi |
| :--- | :--- | :--- |
| **Database Utama** | **PostgreSQL** (bisa self-hosted atau *managed* via **Supabase** / **Neon**) | Menyimpan artikel blog, konten halaman, daftar proyek, pengguna CMS, dan pesan kontak secara relasional & kuat. *(Alternatif: MySQL / MariaDB)*. |
| **ORM / Query Builder** | **Prisma ORM** atau **Drizzle ORM** *(jika membangun CMS custom)* | Memudahkan migrasi skema database dan query aman dengan TypeScript. *(Payload CMS sudah menyertakan adapter Drizzle/PostgreSQL bawaan)*. |
| **Caching (Opsional)** | **Redis / Upstash** atau **Next.js Built-in Cache** | Mempercepat pemuatan artikel blog populer dan mengurangi beban database. |

---

### D. Media Storage & Rich Text Editor
| Komponen | Teknologi | Fungsi |
| :--- | :--- | :--- |
| **Object Storage** | **Cloudflare R2** / **Supabase Storage** / **Cloudinary** / **AWS S3** | Menyimpan gambar artikel, foto profil, dan thumbnail proyek secara permanen (hindari menyimpan file upload langsung di filesystem container agar tidak hilang saat re-deploy). |
| **Rich Text Editor** | **Lexical** (bawaan Payload) atau **Tiptap** / **Editor.js** | Editor penulisan artikel modern seperti Notion/Medium (mendukung heading, list, gambar, embed, dan blok kode). |

---

### E. Autentikasi, Keamanan & Email
| Komponen | Teknologi | Fungsi |
| :--- | :--- | :--- |
| **Autentikasi & RBAC** | **Auth.js (NextAuth)** / **Better Auth** / *Built-in Auth CMS* | Login admin dengan hashing password (`bcrypt`/`argon2`), sesi aman (`HttpOnly Cookie`), dan pembatasan hak akses. |
| **Anti-Spam Form Kontak** | **Cloudflare Turnstile** (gratis & ringan) atau **Google reCAPTCHA** | Mencegah bot mengirim spam melalui formulir konsultasi. |
| **Layanan Email (SMTP/API)** | **Resend** / **Brevo** / **Amazon SES** | Mengirim notifikasi email ke `hello@maktabit.tech` saat ada pesan kontak baru, serta email reset password admin. |
| **Keamanan Web** | **DOMPurify / Sanitasi HTML**, **Rate Limiting**, **HTTPS/SSL** | Mencegah serangan XSS pada konten blog, brute-force login, dan spam API. |

---

### F. SEO, Analytics & Monitoring
| Komponen | Teknologi | Fungsi |
| :--- | :--- | :--- |
| **SEO Teknis** | **Next.js Metadata API**, `sitemap.ts`, `robots.ts`, **JSON-LD Schema** | Memastikan setiap artikel blog & halaman proyek terindeks optimal di Google. |
| **Analytics** | **Google Analytics 4** atau **Umami / Plausible** (privacy-friendly) | Memantau jumlah pembaca blog, sumber trafik, dan klik CTA. |
| **Error Monitoring** | **Sentry** | Melacak error pada frontend maupun backend secara *real-time*. |

---

### G. DevOps, Version Control & Hosting (Deployment)
| Komponen | Teknologi | Fungsi |
| :--- | :--- | :--- |
| **Version Control** | **Git & GitHub** | Manajemen kode sumber, branching, dan kolaborasi tim. |
| **CI/CD** | **GitHub Actions** | Otomasi linting, pengujian, build, dan deployment saat kode di-push. |
| **Hosting / Infrastruktur** | **Opsi Managed**: **Vercel** / **Cloudflare** (Frontend+App) + **Neon/Supabase** (DB) + **Cloudflare R2** (Storage)<br>**Opsi Self-Hosted VPS**: **Docker + Coolify / Dokploy + Nginx/Traefik** | Menjalankan website secara stabil dengan SSL otomatis. Opsi *Managed* memiliki *free tier* yang sangat baik untuk tahap awal; opsi *VPS + Docker* cocok untuk kontrol penuh dan biaya tetap jangka panjang. |
| **Domain & DNS** | **Cloudflare DNS** | Pengelolaan domain (misal `maktabit.tech`), proteksi DDoS, CDN, dan SSL gratis. |

---

## 4. Rancangan Struktur Data (Content Models / Skema Database)

Berikut adalah entitas data utama yang perlu disiapkan di dalam CMS:

1. **`users`** — Akun pengelola CMS (`id`, `name`, `email`, `password_hash`, `role: admin|editor|author`, `avatar`, `created_at`).
2. **`posts` (Blog & Publikasi)** — (`id`, `title`, `slug`, `excerpt`, `content_json/html`, `cover_image`, `status: draft|published`, `published_at`, `author_id`, `category_id`, `seo_title`, `seo_description`, `views_count`).
3. **`categories` & `tags`** — Pengelompokan artikel blog (`id`, `name`, `slug`, `description`).
4. **`projects` (Portofolio)** — (`id`, `project_code`, `title`, `slug`, `category_label`, `short_desc`, `architecture_summary`, `capabilities_list`, `tech_tags`, `cover_image`, `github_url`, `live_url`, `is_featured`, `sort_order`).
5. **`services` (Layanan)** — (`id`, `title`, `description`, `icon_name`, `accent_color`, `sort_order`, `is_active`).
6. **`site_settings` (Global / Singleton)** — Menyimpan konten statis yang dapat diubah sewaktu-waktu:
   - Pengaturan Brand (Nama perusahaan, tagline, logo, copyright).
   - Konten Hero (Headline, subheadline, teks prakata, 4 nilai inti, hero image).
   - Konten Tentang Kami (Prakata eksekutif, filosofi logo, Visi, Misi, foto tim).
   - Pengaturan Kontak (Email, lokasi, tautan GitHub/LinkedIn, SLA respons).
   - Pengaturan Splash Screen (Aktif/nonaktif, teks tahapan loading).
7. **`contact_messages`** — Pesan dari form konsultasi (`id`, `sender_name`, `sender_email`, `topic`, `message`, `status: unread|read|replied`, `created_at`).
8. **`media`** — Metadata file/gambar yang diunggah (`id`, `filename`, `url`, `mime_type`, `alt_text`, `size`).

---

## 5. Rancangan Peta Halaman (Sitemap & Routing — *Telah Diimplementasikan*)

### Halaman Publik (Pengunjung)
- `/` — Landing Page utama (mengadopsi desain `landing-sample.html` secara dinamis + bagian *Artikel & Informasi Terbaru* + *Splash Screen* interaktif).
- `/blog` — Daftar seluruh artikel & publikasi informasi (dengan filter kategori, tag, pencarian kata kunci, dan pagination).
- `/blog/[slug]` — Halaman detail artikel (dilengkapi Lexical Rich Text Renderer, tombol *share*, artikel terkait, JSON-LD `BlogPosting`, dan metadata SEO).
- `/proyek` — Halaman katalog seluruh portofolio & inisiatif proyek perusahaan.
- `/proyek/[slug]` — Halaman detail studi kasus & ringkasan arsitektur teknis proyek (misal `/proyek/taskworker`, `/proyek/quranweb`).
- `/sitemap.xml` & `/robots.txt` — Dihasilkan secara dinamis dari database PostgreSQL.

### Halaman Internal CMS (Admin Panel Payload CMS 3.0)
- `/admin/login` — Halaman masuk pengelola.
- `/admin` — Dashboard utama ringkasan seluruh koleksi & pengaturan situs.
- `/admin/globals/site-settings` — Pengubahan informasi perusahaan (Umum & Splash Screen, Hero Section, Tentang Kami/Prakata/Visi/Misi, Kontak & Topik Konsultasi).
- `/admin/collections/posts` — Pengelolaan artikel blog (tulis, edit, terbitkan, riwayat versi, & SEO).
- `/admin/collections/categories` & `/admin/collections/tags` — Pengelolaan kategori & tag blog.
- `/admin/collections/projects` — Pengelolaan portofolio proyek.
- `/admin/collections/services` — Pengelolaan daftar layanan.
- `/admin/collections/tech-stacks` — Pengelolaan pilar ekosistem teknologi.
- `/admin/collections/media` — Galeri & unggah aset gambar (otomatis membuat ukuran `thumbnail`, `card`, `hero`).
- `/admin/collections/contact-messages` — Kotak masuk pesan formulir konsultasi (`unread`, `read`, `replied`).
- `/admin/collections/users` — Manajemen akun pengelola (`super-admin`, `editor`, `author`).

---

## 6. Roadmap / Tahapan Implementasi *(Status: 100% Selesai)*

| Fase | Fokus Pekerjaan | Output Utama | Status |
| :--- | :--- | :--- | :--- |
| **Fase 1: Inisiasi & Migrasi UI** | Setup proyek Next.js 16 + TypeScript + Tailwind CSS v4 (Port `3390`). Memecah `landing-sample.html` menjadi komponen modular (`SplashScreen`, `Navbar`, `Hero`, `About`, `Services`, `Projects`, `TechStack`, `Contact`, `Footer`). | Website berjalan di Next.js dengan tampilan identik `landing-sample.html`. | ✅ Selesai |
| **Fase 2: Setup Database & CMS Core** | Integrasi PostgreSQL 16, Media Storage (R2/S3 + fallback lokal `./media`), dan Payload CMS 3.94.0 beserta autentikasi RBAC (`super-admin`, `editor`, `author`). | Admin Panel `/admin` dapat diakses dan sistem RBAC teruji. | ✅ Selesai |
| **Fase 3: Modul Dinamis, Blog & Proyek** | Membuat Global `site-settings` dan koleksi `posts`, `categories`, `tags`, `projects`, `services`, `tech-stacks`. Membangun `/blog`, `/blog/[slug]`, `/proyek`, `/proyek/[slug]`, serta seeding data awal. | Semua konten publikasi, proyek & blog dapat diubah dari CMS dengan *on-demand revalidation*. | ✅ Selesai |
| **Fase 4: Integrasi Kontak & SEO** | Menghubungkan form kontak ke `/api/contact` + database + notifikasi email (Resend) + anti-spam (Turnstile & Honeypot) + rate limiting. Menambahkan Dynamic SEO, Sitemap, Robots, dan JSON-LD. | Pesan pengunjung masuk ke CMS & email; website siap terindeks Google. | ✅ Selesai |
| **Fase 5: Pengujian & Deployment** | Halaman error kustom (`404`/`500`), Security Headers, Vitest Integration & RBAC Tests (`4/4 passed`), CI GitHub Actions, PM2 config, serta panduan [`DRY_DEPLOYMENT.md`](DRY_DEPLOYMENT.md) & [`CMS_GUIDE.md`](CMS_GUIDE.md). | Bundel produksi `npm run build` lulus 100% dan siap *live*. | ✅ Selesai |

---

## 7. Prasyarat Lingkungan Pengembangan (Tools Lokal)

Sebelum mulai membangun, pastikan perangkat pengembangan sudah memiliki:
1. **Node.js (v20 LTS atau v22 LTS)** & Package Manager (**pnpm** atau **npm**).
2. **Git** (untuk *version control* dan koneksi ke GitHub).
3. **Code Editor** (VS Code + ekstensi Tailwind CSS IntelliSense, ESLint, Prettier).
4. **Database Lokal / Cloud**: Docker Desktop (untuk menjalankan PostgreSQL lokal) **atau** akun gratis di **Supabase / Neon** untuk PostgreSQL *cloud*.
5. **Akun Layanan Pendukung (Free Tier tersedia)**: GitHub, Cloudflare (DNS & R2 Storage), Vercel (atau VPS), dan Resend (Email).
