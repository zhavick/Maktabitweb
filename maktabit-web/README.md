# Website & CMS Resmi — PT. MaktabIT Technology (`maktabit-web`)

Aplikasi web perusahaan dan **Content Management System (CMS)** untuk **PT. MaktabIT Technology**, dibangun menggunakan **Next.js 16 (App Router)**, **Payload CMS 3.94**, **TypeScript**, **Tailwind CSS v4**, dan **PostgreSQL 16**.

---

## Fitur Utama

- **Landing Page Dinamis**: Seluruh konten Hero, Prakata & Profil, Visi & Misi, Layanan, Proyek Portofolio (`TaskWorkerPro`, `QuranWeb`), Tech Stack, Kontak, dan *Splash Screen* interaktif dapat diubah langsung dari dashboard `/admin`.
- **Modul Blog & Publikasi (`/blog` & `/blog/[slug]`)**: Mendukung pencarian kata kunci, filter kategori & tag, pagination, Lexical Rich Text Editor, status `draft`/`published`, riwayat versi, estimasi waktu baca, tombol berbagi, dan rekomendasi artikel terkait.
- **Katalog & Studi Kasus Proyek (`/proyek` & `/proyek/[slug]`)**: Halaman direktori portofolio dan detail arsitektur teknis untuk setiap proyek.
- **Manajemen Pesan Kontak (`POST /api/contact`)**: Dilengkapi validasi input, *honeypot* anti-bot, *rate limiting* berbasis IP, dukungan Cloudflare Turnstile, penyimpanan ke CMS (`contact-messages`), dan notifikasi email via Resend.
- **Role-Based Access Control (RBAC)**: Tiga tingkat hak akses (`super-admin`, `editor`, `author`) di mana akun pertama otomatis menjadi `super-admin`.
- **SEO & Performa**: Dynamic Metadata (`generateMetadata`), OpenGraph, JSON-LD (`Organization` & `BlogPosting`), `/sitemap.xml`, `/robots.txt`, serta *on-demand revalidation* (`revalidatePath`).

---

## Cara Menjalankan di Lokal (Port `3390`)

### 1. Jalankan Database PostgreSQL
```bash
docker compose up -d
```

### 2. Instal Dependensi & Seed Data Awal
```bash
npm install
npm run seed
```

### 3. Jalankan Development Server
```bash
npm run dev
```

Buka di browser:
- **Halaman Utama**: `http://localhost:3390`
- **Blog & Publikasi**: `http://localhost:3390/blog`
- **Katalog Proyek**: `http://localhost:3390/proyek`
- **Admin Panel CMS**: `http://localhost:3390/admin`

---

## Perintah Penting (`package.json`)

| Perintah | Fungsi |
| :--- | :--- |
| `npm run dev` | Menjalankan server pengembangan di port `3390` |
| `npm run build` | Mengompilasi bundel produksi Next.js + Payload CMS |
| `npm run start` | Menjalankan server produksi hasil build di port `3390` |
| `npm run seed` | Mengisi database dengan data awal PT. MaktabIT Technology |
| `npm run generate:types` | Memperbarui `src/payload-types.ts` dari skema CMS |
| `npm run lint` | Menjalankan pemeriksaan kualitas kode ESLint v9 |
| `npm run test:int` | Menjalankan pengujian integrasi & RBAC dengan Vitest |

---

## Dokumentasi Lengkap di Root Workspace

- [`../MasterPlan.md`](../MasterPlan.md) — Arsitektur & spesifikasi teknologi CMS.
- [`../DEV_STEP.md`](../DEV_STEP.md) — Rincian langkah pengembangan (Step 0 – Step 10).
- [`../DRY_DEPLOYMENT.md`](../DRY_DEPLOYMENT.md) — Panduan deployment VPS level OS (tanpa Docker) berbasis IP Publik.
- [`../CMS_GUIDE.md`](../CMS_GUIDE.md) — Panduan operasional pengelolaan konten & blog bagi tim admin/redaksi.
