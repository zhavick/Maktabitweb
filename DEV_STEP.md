# Panduan Rincian Pengembangan Bertahap (`DEV_STEP.md`) — PT. MaktabIT Technology

Dokumen ini adalah panduan teknis langkah demi langkah (*step-by-step*) untuk mengeksekusi rencana dari [`MasterPlan.md`](MasterPlan.md) dan mengubah desain statis [`Source/landing-sample.html`](Source/landing-sample.html) menjadi website perusahaan **PT. MaktabIT Technology** berbasis CMS modern.

**Stack Acuan Utama:** Next.js (App Router) + TypeScript + Tailwind CSS + Payload CMS 3.0 + PostgreSQL + Object Storage (Cloudflare R2 / Supabase Storage) + Resend + Cloudflare Turnstile.

---

## Ringkasan Alur Step *(Status: 100% Selesai)*

| Step | Nama Tahap | Fokus Utama | Status |
| :--- | :--- | :--- | :--- |
| **Step 0** | Persiapan Lingkungan & Layanan | Tools lokal, database PostgreSQL Docker, Git | ✅ Selesai |
| **Step 1** | Inisiasi Proyek & Konfigurasi Dasar | Setup Next.js 16, Payload CMS 3.94, Tailwind v4, Fonts, Port `3390` | ✅ Selesai |
| **Step 2** | Database, Media Storage & Auth RBAC | PostgreSQL, upload media (S3/R2 + lokal), hak akses RBAC | ✅ Selesai |
| **Step 3** | Pemodelan Data CMS & Seeding | Collections, Global `SiteSettings`, dan `npm run seed` | ✅ Selesai |
| **Step 4** | Migrasi UI `landing-sample.html` | Pemecahan HTML menjadi komponen React modular | ✅ Selesai |
| **Step 5** | Integrasi Landing Page Dinamis | Menghubungkan UI ke data CMS + On-Demand Revalidation | ✅ Selesai |
| **Step 6** | Modul Blog, Publikasi & Katalog Proyek | Halaman `/blog`, `/blog/[slug]`, `/proyek`, `/proyek/[slug]` | ✅ Selesai |
| **Step 7** | Backend Form Kontak & Notifikasi | API `/api/contact`, simpan ke CMS, email Resend & Turnstile | ✅ Selesai |
| **Step 8** | Optimasi SEO & Performa | `generateMetadata`, Sitemap, Robots, JSON-LD | ✅ Selesai |
| **Step 9** | Pengujian & Keamanan | Halaman `404`/`500`, Security Headers, Vitest RBAC (`4/4 passed`) | ✅ Selesai |
| **Step 10** | Deployment & Go-Live | CI GitHub Actions, PM2 config, `DRY_DEPLOYMENT.md`, `CMS_GUIDE.md`, `npm run build` | ✅ Selesai |

---

## Step 0: Persiapan Lingkungan & Layanan Pendukung

**Tujuan:** Memastikan seluruh perangkat pengembangan lokal dan akun infrastruktur dasar siap sebelum menulis kode.

### Rincian Pekerjaan
- [x] Instal **Node.js v20 LTS / v22 LTS+** (terpasang `v24.19.0`) dan package manager (**npm** `11.17.0` / opsional `pnpm`).
- [x] Instal **Git** (`2.55.0`) dan inisiasi repositori Git lokal di workspace (tambahkan remote GitHub bila siap).
- [x] Siapkan database **PostgreSQL**:
  - *Lokal*: Container `maktabit-postgres` (`postgres:16-alpine`) berjalan via Docker Compose di port `5432` dengan database `maktabit_web`.
- [ ] *(Opsional untuk Step 2)* Siapkan **Object Storage** untuk unggahan gambar (Cloudflare R2 / Supabase Storage).
- [ ] *(Opsional untuk Step 7)* Siapkan akun **Resend** (email notifikasi) dan **Cloudflare Turnstile** (anti-spam form kontak).

### Kriteria Selesai (Definition of Done)
- Perintah `node -v`, `pnpm -v`, dan `git --version` berjalan tanpa error.
- Koneksi string PostgreSQL (`DATABASE_URI`) tersedia dan dapat dihubungi.

---

## Step 1: Inisiasi Proyek Next.js + Payload CMS 3.0 + Tailwind CSS

**Tujuan:** Membuat fondasi proyek *full-stack* dalam satu repositori dengan konfigurasi font dan tema yang sesuai dengan `landing-sample.html`.

### Rincian Pekerjaan
- [x] Inisiasi proyek Payload CMS 3.0 (`3.94.0`) + Next.js App Router (`16.4.6`) di folder `maktabit-web`:
  ```bash
  npx create-payload-app@latest -n maktabit-web -t blank --db postgres --use-npm
  ```
- [x] Instal dan konfigurasikan **Tailwind CSS v4** (`@tailwindcss/postcss`) serta plugin tipografi (`@tailwindcss/typography`).
- [x] Pindahkan konfigurasi font dari `landing-sample.html` ke `next/font/google` di `src/app/(frontend)/layout.tsx`:
  - `Inter` (`--font-inter`)
  - `Plus Jakarta Sans` (`--font-plus-jakarta`)
  - `JetBrains Mono` (`--font-jetbrains-mono`)
- [x] Pindahkan animasi kustom CSS (`logo-stroke`, `drawStroke`, `progress-shimmer`, `tech-grid-bg`, `float`, `pulse-slow`) ke `src/app/(frontend)/globals.css`.
- [x] Siapkan file `.env` dan `.env.example` berisi `DATABASE_URL`, `PAYLOAD_SECRET`, dan `NEXT_PUBLIC_SITE_URL=http://localhost:3390`.

### Kriteria Selesai
- `pnpm dev` berjalan lancar di `http://localhost:3390`.
- Halaman admin Payload dapat dibuka di `http://localhost:3390/admin` dan akun admin pertama berhasil dibuat.

---

## Step 2: Konfigurasi Database, Media Storage & Autentikasi RBAC

**Tujuan:** Menyiapkan sistem manajemen pengguna dengan hak akses terpisah serta penyimpanan media yang aman untuk produksi.

### Rincian Pekerjaan
- [x] Konfigurasikan koleksi **`Users`** (`src/collections/Users.ts`):
  - Field: `name`, `email`, `role` (`super-admin`, `editor`, `author`), `avatar`.
  - Terapkan **Access Control (RBAC)** di `src/access/roles.ts`:
    - `super-admin`: Akses penuh ke semua koleksi, pengaturan situs, dan manajemen user (akun pertama otomatis jadi `super-admin`).
    - `editor`: Dapat mengelola semua artikel blog, proyek, layanan, media, dan membaca pesan kontak.
    - `author`: Hanya dapat membuat & mengedit artikel miliknya sendiri (tidak bisa mengubah `SiteSettings` atau menghapus user).
- [x] Konfigurasikan koleksi **`Media`** (`src/collections/Media.ts`):
  - Aktifkan fitur `upload` dengan validasi `mimeTypes` (gambar: `image/jpeg`, `image/png`, `image/webp`, `image/svg+xml`, `image/gif`).
  - Tambahkan field wajib `alt` (untuk SEO & aksesibilitas) dan `caption`.
  - Definisikan `imageSizes` otomatis (`thumbnail`, `card`, `hero`).
- [x] Hubungkan plugin storage S3/R2 (`@payloadcms/storage-s3`) pada `payload.config.ts` (aktif otomatis jika `S3_BUCKET`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` diisi di `.env`, dan *fallback* aman ke folder lokal `media/` saat pengembangan lokal).

### Kriteria Selesai
- Admin dapat login, membuat akun dengan role berbeda, dan hak akses masing-masing role terverifikasi.
- Upload gambar di `/admin/collections/media` berhasil masuk ke bucket Object Storage dan tampil di panel admin.

---

## Step 3: Pemodelan Konten CMS (Collections & Globals) + Seeding

**Tujuan:** Membangun seluruh struktur data CMS agar semua bagian website dapat dikelola tanpa mengubah kode.

### Rincian Pekerjaan
- [x] Buat **Global `SiteSettings`** (`src/globals/SiteSettings.ts`) dengan tab terstruktur:
  - **Tab Umum & Brand**: Nama perusahaan, tagline, logo, teks copyright, aktif/nonaktif *Splash Screen*.
  - **Tab Hero**: Badge, headline, sub-headline, deskripsi prakata, gambar hero, 4 kartu nilai inti, dan cuplikan kode terminal.
  - **Tab Tentang Kami**: Prakata eksekutif, foto tim, judul & deskripsi filosofi logo, Visi, dan Misi.
  - **Tab Kontak**: Email, lokasi, link GitHub/sosial media, teks SLA respons, dan daftar opsi topik form konsultasi.
- [x] Buat **Collections**:
  - `Services` (`src/collections/Services.ts`): `title`, `description`, `icon`, `accentColor`, `sortOrder`, `isActive`.
  - `Projects` (`src/collections/Projects.ts`): `projectCode`, `title`, `slug`, `categoryLabel`, `modalBadge`, `accentColor`, `shortDesc`, `architectureSummary`, `capabilities` (array), `techTags` (array), `coverImage`, `coverImageUrl`, `githubUrl`, `githubDisplay`, `liveUrl`, `isFeatured`, `sortOrder`.
  - `TechStacks` (`src/collections/TechStacks.ts`): `code` (misal `01 // FRONTEND`), `title`, `description`, `accentColor`, `sortOrder`.
  - `Categories` & `Tags` (`src/collections/Categories.ts`, `src/collections/Tags.ts`): `name`, `slug`, `description`.
  - `Posts` (`src/collections/Posts.ts`): `title`, `slug`, `excerpt`, `coverImage`, `coverImageUrl`, `content` (Lexical Rich Text), `category`, `tags`, `author`, `status` (`draft`/`published`), `publishedAt`, `readingTimeMinutes`, dan tab `SEO` (`metaTitle`, `metaDescription`, `ogImage`).
  - `ContactMessages` (`src/collections/ContactMessages.ts`): `senderName`, `senderEmail`, `topic`, `message`, `status` (`unread`, `read`, `replied`), `adminNotes`.
- [x] Buat script seeding (`src/seed/index.ts` & `src/seed/run.ts`) untuk mengisi data awal yang persis sama dengan isi `Source/landing-sample.html` (termasuk `TaskWorkerPro`, `QuranWeb`, 4 layanan, 4 tech stack, dan 3 artikel blog contoh).

### Kriteria Selesai
- Semua Global dan Collection muncul rapi di sidebar `/admin`.
- Menjalankan script seed mengisi database dengan konten awal tanpa duplikasi.

---

## Step 4: Migrasi UI `landing-sample.html` ke Komponen Modular

**Tujuan:** Mengonversi `Source/landing-sample.html` menjadi komponen React/Next.js yang bersih, terstruktur, dan responsif dengan desain 100% setia pada sampel.

### Rincian Pekerjaan
- [x] Buat struktur folder komponen di `src/components/`:
  - `layout/SplashScreen.tsx` *(Client Component: animasi SVG stroke, progress bar, tombol skip, dan state `sessionStorage` agar tidak muncul berulang saat navigasi antar halaman)*
  - `layout/Navbar.tsx` *(Client Component: menu desktop, dropdown mobile, tombol Replay Splash, CTA, plus menu baru **Blog & Publikasi**)*
  - `layout/Footer.tsx`
  - `sections/HeroSection.tsx`
  - `sections/AboutSection.tsx`
  - `sections/ServicesSection.tsx`
  - `sections/ProjectsSection.tsx` & `ui/ProjectModal.tsx` *(Client Component untuk modal Ringkasan Teknis)*
  - `sections/TechStackSection.tsx`
  - `sections/ContactSection.tsx` & `ui/Toast.tsx`
- [x] Rakit seluruh section tersebut melalui `src/components/LandingPageClient.tsx` pada `src/app/(frontend)/page.tsx`.
- [x] Pastikan perilaku interaktif (Splash Screen, Replay Splash, Mobile Menu, Project Modal) berjalan mulus di Next.js tanpa error *hydration*.

### Kriteria Selesai
- Tampilan `http://localhost:3390` identik secara visual dan interaktif dengan `Source/landing-sample.html` pada layar desktop, tablet, dan mobile.

---

## Step 5: Integrasi Data CMS ke Landing Page (Dinamis & ISR)

**Tujuan:** Menghapus seluruh teks *hardcoded* pada komponen Landing Page dan menggantinya dengan data dinamis dari CMS.

### Rincian Pekerjaan
- [x] Buat helper pengambilan data server-side (`src/lib/cms.ts`) menggunakan Payload Local API (`getPayload`) untuk mengambil:
  - `SiteSettings`
  - `Services` (hanya yang `isActive: true`, urut berdasarkan `sortOrder`)
  - `Projects` (yang `isFeatured: true`, urut berdasarkan `sortOrder`)
  - `TechStacks`
  - 3 `Posts` terbaru yang berstatus `published`
- [x] Kirim data dari Server Component (`page.tsx`) sebagai *props* ke setiap komponen section melalui `LandingPageClient`.
- [x] Pasang **Payload Hooks (`afterChange` / `afterDelete`)** (`src/hooks/revalidateSite.ts`) pada `SiteSettings`, `Services`, `Projects`, `TechStacks`, dan `Posts` untuk memanggil `revalidatePath('/')` dan `revalidatePath('/blog')`.
  - *Hasilnya*: Website tetap super cepat seperti halaman statis, namun langsung terbarui dalam hitungan detik setiap kali admin menekan tombol **Save / Publish** di CMS.

### Kriteria Selesai
- Mengubah teks Hero, menambah Proyek baru, atau mengedit Layanan di `/admin` langsung mengubah tampilan di `http://localhost:3390` setelah halaman dimuat ulang.

---

## Step 6: Pengembangan Modul Blog & Publikasi Informasi (`/blog`)

**Tujuan:** Menghadirkan fitur blog informasi dan publikasi artikel yang profesional, mudah dicari, dan nyaman dibaca.

### Rincian Pekerjaan
- [x] Tambahkan section **`LatestPostsSection.tsx`** di Landing Page (menampilkan 3 artikel terbaru + tombol *"Lihat Semua Publikasi"*).
- [x] Bangun halaman daftar artikel `src/app/(frontend)/blog/page.tsx`:
  - Pencarian artikel berdasarkan judul/kata kunci (`?q=...`).
  - Filter berdasarkan Kategori (`?category=...`) dan Tag (`?tag=...`).
  - Pagination (`?page=1, 2, ...`).
  - Tampilan *empty state* jika artikel tidak ditemukan.
- [x] Bangun halaman detail artikel `src/app/(frontend)/blog/[slug]/page.tsx`:
  - Header artikel (kategori, judul, tanggal terbit, nama penulis, estimasi waktu baca, *cover image*).
  - Komponen **Rich Text Renderer** (`src/components/blog/RichText.tsx`) untuk merender output Lexical (heading, paragraf, list, blockquote, gambar, link, dan *code block*).
  - Tombol berbagi (`src/components/blog/ShareButtons.tsx`: Copy Link, WhatsApp, X/Twitter).
  - Bagian *Artikel Terkait*.
- [x] Tambahkan tautan navigasi **Blog & Publikasi** pada `Navbar.tsx` (desktop dan mobile).
- [x] Bangun halaman katalog portofolio proyek `src/app/(frontend)/proyek/page.tsx` dan halaman detail studi kasus `src/app/(frontend)/proyek/[slug]/page.tsx` serta hubungkan dari `ProjectModal.tsx`.

### Kriteria Selesai
- Pengunjung dapat membaca, mencari, dan memfilter artikel di `/blog` serta membuka detail artikel di `/blog/[slug]`.
- Artikel berstatus `draft` tidak muncul di halaman publik.

---

## Step 7: Integrasi Form Kontak, Anti-Spam & Notifikasi Email

**Tujuan:** Menghubungkan formulir konsultasi pada `ContactSection` ke backend agar pesan tersimpan di CMS dan terkirim ke email admin.

### Rincian Pekerjaan
- [x] Pasang dukungan widget **Cloudflare Turnstile** (aktif otomatis jika `NEXT_PUBLIC_TURNSTILE_SITE_KEY` diset) serta *honeypot field* anti-bot pada `ContactSection.tsx`.
- [x] Buat API Route `src/app/api/contact/route.ts` dengan alur:
  1. Validasi payload input (`name`, `email`, `topic`, `message`, `website` honeypot, `turnstileToken`).
  2. Verifikasi token Turnstile ke API Cloudflare (jika `TURNSTILE_SECRET_KEY` dikonfigurasi).
  3. Terapkan *rate limiting* berbasis IP (maksimal 5 pesan per 10 menit per IP).
  4. Simpan data pesan ke koleksi `ContactMessages` di CMS dengan status `unread`.
  5. Kirim email notifikasi ke `CONTACT_RECIPIENT_EMAIL` (`hello@maktabit.tech`) menggunakan **Resend HTTP API** (jika `RESEND_API_KEY` dikonfigurasi).
- [x] Perbarui `ContactSection.tsx` agar menampilkan status *loading* (`Mengirim Pesan...`), Toast sukses (`variant="success"`) jika berhasil disimpan ke CMS, dan Toast error (`variant="error"`) jika gagal.

### Kriteria Selesai
- Mengirim form di halaman utama menyimpan pesan baru di `/admin/collections/contact-messages` dan memicu email notifikasi masuk.

---

## Step 8: Optimasi SEO, Metadata Dinamis & Performa

**Tujuan:** Memastikan website PT. MaktabIT Technology siap bersaing di mesin pencari (Google) dan memiliki skor performa tinggi.

### Rincian Pekerjaan
- [x] Implementasikan `generateMetadata()` di `layout.tsx`, `page.tsx`, `blog/page.tsx`, dan `blog/[slug]/page.tsx` (Title, Description, Canonical URL, OpenGraph, Twitter Card).
- [x] Buat `src/app/sitemap.ts` yang secara otomatis mendaftarkan `/`, `/blog`, dan seluruh `/blog/[slug]` yang berstatus `published`.
- [x] Buat `src/app/robots.ts` (izinkan crawling halaman publik, blokir `/admin` dan `/api`).
- [x] Tambahkan **JSON-LD Structured Data**:
  - Schema `Organization` di Landing Page (`src/app/(frontend)/page.tsx`).
  - Schema `BlogPosting` di halaman detail artikel (`src/app/(frontend)/blog/[slug]/page.tsx`).
- [x] Konfigurasikan `remotePatterns` untuk domain gambar (`images.unsplash.com`, `placehold.co`, `**.r2.dev`, `**.supabase.co`) di `next.config.ts`.

### Kriteria Selesai
- `/sitemap.xml` dan `/robots.txt` dapat diakses dan berisi URL valid.
- Skor Lighthouse (Performance, Accessibility, Best Practices, SEO) mencapai target **≥ 90**.

---

## Step 9: Pengujian (Testing) & Hardening Keamanan

**Tujuan:** Memastikan aplikasi bebas dari bug fatal, aman dari celah umum web, dan siap dibangun untuk produksi.

### Rincian Pekerjaan
- [x] Buat halaman error kustom: `src/app/(frontend)/not-found.tsx` (404) dan `src/app/(frontend)/error.tsx` (500) sesuai tema visual MaktabIT.
- [x] Tambahkan **Security Headers** di `next.config.ts` (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `poweredByHeader: false`).
- [x] Lakukan pengujian checklist QA & Integration Test (`tests/int/api.int.spec.ts`):
  - CRUD & pembacaan data pada Blog, Proyek, Layanan, TechStacks, dan Pengaturan Situs.
  - Pengujian pembatasan akses RBAC (publik hanya bisa melihat artikel `published` dan tidak bisa membaca `contact-messages`).
  - Pengujian responsivitas komponen dan validasi form kontak.
- [x] Jalankan verifikasi TypeScript, ESLint, dan Integration Tests:
  ```bash
  npx tsc --noEmit
  npm run lint
  npm run test:int
  ```

### Kriteria Selesai
- Tidak ada error TypeScript, ESLint, maupun kegagalan pada `pnpm build`.
- Seluruh skenario QA lolos uji.

---

## Step 10: Deployment ke Produksi, Domain & Monitoring

**Tujuan:** Meluncurkan website PT. MaktabIT Technology ke lingkungan produksi secara aman dan terpantau.

### Rincian Pekerjaan
- [x] Setup CI workflow di `.github/workflows/ci.yml` (otomatis jalankan `tsc --noEmit`, `npm run lint`, dan `npm run build` pada setiap Push & Pull Request).
- [x] Siapkan konfigurasi deployment produksi:
  - **Opsi VPS Level OS Tanpa Docker (IP Publik)**: Panduan lengkap di [`DRY_DEPLOYMENT.md`](DRY_DEPLOYMENT.md) dan konfigurasi PM2 `maktabit-web/ecosystem.config.cjs` (Port `3390`).
  - **Opsi Docker / Coolify / Dokploy**: `maktabit-web/Dockerfile` diperbarui ke port `3390`.
- [x] Pasang komponen Analytics (`src/components/analytics/SiteAnalytics.tsx` di `layout.tsx`) yang mendukung **Google Analytics 4** (`NEXT_PUBLIC_GA_MEASUREMENT_ID`) dan **Umami** (`NEXT_PUBLIC_UMAMI_WEBSITE_ID`).
- [x] Jalankan migrasi & seed awal (`npm run seed`), serta verifikasi `npm run build` produksi.
- [x] Buat dokumentasi *Panduan Penggunaan CMS* ([`CMS_GUIDE.md`](CMS_GUIDE.md)) untuk tim redaksi/admin internal.

### Kriteria Selesai
- Website dapat diakses publik melalui domain resmi dengan HTTPS.
- Admin dapat login di `https://domain-anda.com/admin`, menerbitkan artikel baru, dan perubahan langsung tampil secara *live*.
