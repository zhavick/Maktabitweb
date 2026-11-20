# Panduan Penggunaan CMS (`CMS_GUIDE.md`) — PT. MaktabIT Technology

Dokumen ini adalah panduan operasional bagi tim administrator, editor, dan penulis di **PT. MaktabIT Technology** untuk mengelola konten website dan publikasi blog tanpa perlu mengubah kode program.

---

## 1. Akses Panel Admin & Pembuatan Akun Pertama

1. Buka browser dan akses URL Admin CMS:
   - **Lokal**: `http://localhost:3390/admin`
   - **Produksi (VPS IP Publik / Domain)**: `http://<IP_ATAU_DOMAIN_ANDA>/admin`
2. Saat pertama kali diakses (belum ada user di database), sistem akan menampilkan formulir **Create First User**.
3. Isi **Nama Lengkap**, **Email**, dan **Password**.
   - **Otomatis Super Admin**: Akun pertama yang dibuat secara otomatis diberikan hak akses tertinggi (**Super Admin**).
4. Untuk mengisi konten awal yang sama persis dengan halaman sampel (`TaskWorkerPro`, `QuranWeb`, 4 Layanan, 4 Tech Stack, dan 3 Artikel Blog), jalankan perintah berikut sekali saja di terminal server:
   ```bash
   npm run seed
   ```

---

## 2. Pembagian Peran & Hak Akses (RBAC)

Sistem CMS memiliki 3 tingkat peran pengguna pada menu **Pengguna & Akses → Users**:

| Peran (Role) | Hak Akses & Wewenang |
| :--- | :--- |
| **Super Admin** | Akses penuh ke seluruh fitur: mengelola akun pengguna & role, mengubah pengaturan situs, mengelola artikel/proyek/layanan, serta melihat & menghapus pesan kontak. |
| **Editor** | Dapat menulis, mengedit, dan menerbitkan seluruh artikel blog (termasuk milik penulis lain), mengubah pengaturan situs, proyek, layanan, media, dan membaca pesan kontak. Tidak dapat menghapus/mengubah role pengguna. |
| **Author / Penulis** | Fokus pada penulisan artikel blog dan unggah gambar media. Hanya dapat mengedit artikel miliknya sendiri dan tidak dapat mengubah pengaturan utama perusahaan. |

---

## 3. Mengubah Informasi Landing Page (Pengaturan Situs)

Buka menu sidebar **Konten Halaman → Pengaturan Situs & Konten Utama**. Halaman ini dibagi menjadi 4 tab:

1. **Tab Umum & Splash Screen**
   - Mengubah nama perusahaan (`MaktabIT Technology`), tagline, teks hak cipta footer, serta mengaktifkan/menonaktifkan *Splash Screen* interaktif beserta teks tahapan *loading*-nya.
2. **Tab Hero Section**
   - Mengubah badge, judul utama, teks highlight gradien, paragraf sambutan, tombol CTA, foto workspace Hero, 4 nilai inti (`Clean Code`, `Agile Dev`, `Open Tech`, `Scalable`), serta isi kartu kode `maktabit.config.ts`.
3. **Tab Tentang Kami (Prakata & Visi Misi)**
   - Mengubah salam pembuka, paragraf prakata eksekutif, foto tim, penjelasan filosofi identitas logo, serta pernyataan **Visi** dan **Misi**.
4. **Tab Kontak & Kolaborasi**
   - Mengubah alamat email resmi, lokasi kantor, tautan GitHub, catatan waktu respons (SLA), serta daftar pilihan topik pada formulir konsultasi.

> **Pembaruan Instan (On-Demand Revalidation):** Setiap kali Anda menekan tombol **Save**, tampilan halaman utama (`/`) langsung diperbarui secara otomatis.

---

## 4. Mengelola Layanan, Proyek Portofolio & Ekosistem Teknologi

Pada grup menu **Konten Halaman**:

1. **Layanan (`Services`)**
   - Tambah atau ubah kartu layanan pengembangan software.
   - Pilih ikon (`Code`, `Refresh`, `Book`, `Server`, `Cloud`, `Shield`), warna aksen (`Sky`, `Emerald`, `Indigo`, `Amber`), urutan tampil (`Sort Order`), dan centang **Tampilkan di Website**.
2. **Proyek Portofolio (`Projects`)**
   - Kelola proyek unggulan seperti `TaskWorkerPro`, `QuranWeb`, maupun proyek baru berikutnya.
   - Isi **Ringkasan Arsitektur & Tujuan Pengembangan** untuk ditampilkan pada popup *Modal Ringkasan Teknis* serta pada halaman studi kasus khusus proyek (`/proyek/[slug]`).
   - Tambahkan poin-poin **Kapabilitas Utama**, **Tag Teknologi**, gambar preview, serta URL repositori GitHub dan URL Demo Live.
   - Centang **Tampilkan di Landing Page Utama** jika ingin proyek muncul di halaman depan (`/`), atau biarkan tidak tercentang jika hanya ingin menampilkannya di halaman katalog `/proyek`.
3. **Ekosistem Teknologi (`TechStacks`)**
   - Kelola kartu pilar teknologi (`01 // FRONTEND`, `02 // BACKEND`, `03 // DATA & API`, `04 // DEVOPS`).

---

## 5. Menulis & Menerbitkan Artikel Blog (`/blog`)

Pada grup menu **Blog & Publikasi**:

1. **Kategori Blog (`Categories`)** & **Tag Artikel (`Tags`)**
   - Buat kategori atau tag baru. *Slug URL* akan dibuat otomatis dari nama kategori/tag.
2. **Artikel & Publikasi (`Posts`)**
   - Klik **Create New**.
   - Isi **Judul Artikel** (*Slug URL* akan terisi otomatis jika dikosongkan) dan **Ringkasan Artikel (Excerpt)**.
   - Pilih **Kategori**, **Tag Artikel**, dan unggah **Gambar Sampul** (atau masukkan URL gambar eksternal).
   - Tulis isi lengkap artikel menggunakan **Rich Text Editor** (mendukung Heading, Paragraf, Bold/Italic/Code, Bullet/Numbered List, Kutipan/Blockquote, Tautan, dan Gambar).
   - Pilih **Status Publikasi**:
     - `Draft (Konsep)`: Artikel tersimpan di CMS tetapi **tidak akan tampil** di halaman publik `/blog`.
     - `Published (Terbit)`: Artikel langsung tayang di halaman utama (bagian *Artikel & Informasi Terbaru*), halaman `/blog`, `/blog/[slug]`, serta terdaftar otomatis di `/sitemap.xml`.
   - Buka tab **SEO & Metadata** jika ingin menyesuaikan *Meta Title*, *Meta Description*, atau *OpenGraph Image* khusus untuk mesin pencari Google dan pratinjau media sosial.

---

## 6. Mengelola Pesan Masuk dari Formulir Konsultasi

1. Buka menu **Interaksi & Pesan → Pesan Kontak**.
2. Setiap pesan yang dikirim pengunjung melalui formulir konsultasi di halaman utama akan masuk dengan status **`Belum Dibaca (Unread)`**.
3. Klik pesan untuk membaca detailnya, ubah statusnya menjadi **`Sudah Dibaca (Read)`** atau **`Sudah Dibalas (Replied)`**, dan tambahkan catatan pada kolom **Catatan Internal Tim** bila diperlukan.
