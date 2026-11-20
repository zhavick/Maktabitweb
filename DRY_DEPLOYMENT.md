# Panduan Deployment VPS Level OS Tanpa Docker (`DRY_DEPLOYMENT.md`) — PT. MaktabIT Technology

Dokumen ini berisi panduan langkah demi langkah untuk menjalankan aplikasi **Next.js + Payload CMS 3.0 + PostgreSQL** (`maktabit-web`) **secara langsung di level sistem operasi (Bare-Metal / Native OS, tanpa Docker)** pada VPS Linux (Ubuntu 22.04 / 24.04 LTS atau Debian 12) yang **hanya menggunakan IP Publik (tanpa domain)**.

---

## Arsitektur Deployment Level OS

```text
[ Pengunjung / Admin Browser ]
              │
              ▼  HTTP (Port 80) — http://<IP_PUBLIK_VPS>
     ┌─────────────────┐
     │  Nginx (OS)     │  Reverse Proxy & Upload Size Handler (25 MB)
     └────────┬────────┘
              │  Proxy Pass -> http://127.0.0.1:3390
              ▼
     ┌─────────────────┐
     │  PM2 Daemon     │  Menjaga proses Node.js tetap hidup & auto-start saat boot
     │  Next.js +      │  Berjalan di Port 3390 (npm run start)
     │  Payload CMS 3  │
     └────┬───────┬────┘
          │       │
          │       └──────────────────────────────┐
          ▼  127.0.0.1:5432                      ▼  Filesystem / Cloud
┌──────────────────────┐              ┌───────────────────────────┐
│ PostgreSQL 16 (OS)   │              │ Folder ./media (OS Lokal) │
│ Database:            │              │ atau Cloudflare R2 / S3   │
│ maktabit_web         │              └───────────────────────────┘
└──────────────────────┘
```

---

## 1. Persiapan OS & Pembuatan Swap Memory

Proses kompilasi `npm run build` pada Next.js + Payload CMS membutuhkan RAM sekitar **2 GB – 4 GB**. Jika VPS Anda memiliki RAM 1 GB atau 2 GB, **wajib** membuat *Swap Memory* agar proses build tidak terhenti karena kehabisan memori (*Out of Memory / SIGKILL*).

```bash
# 1. Perbarui paket sistem operasi
sudo apt update && sudo apt upgrade -y

# 2. Instal paket utilitas dasar & compiler native (dibutuhkan oleh sharp/node-gyp)
sudo apt install -y curl wget git build-essential ufw ca-certificates gnupg

# 3. Buat Swap Memory 4 GB (lewati jika sudah memiliki swap >= 4 GB)
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# 4. Buat swap permanen saat VPS reboot
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# 5. Verifikasi RAM & Swap aktif
free -h
```

---

## 2. Instalasi Node.js (v22 LTS) & PM2 di Level OS

Pasang Node.js langsung di level OS menggunakan repositori resmi NodeSource, kemudian pasang **PM2** sebagai *process manager*:

```bash
# 1. Tambahkan repositori NodeSource Node.js 22.x LTS
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -

# 2. Instal Node.js & npm
sudo apt install -y nodejs

# 3. Verifikasi instalasi
node -v
npm -v

# 4. Instal PM2 secara global
sudo npm install -g pm2
pm2 -v
```

---

## 3. Instalasi & Konfigurasi PostgreSQL di Level OS

Instal database PostgreSQL langsung sebagai *service* sistem operasi (`systemd`):

```bash
# 1. Instal PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# 2. Pastikan service PostgreSQL berjalan dan aktif saat boot
sudo systemctl enable --now postgresql
sudo systemctl status postgresql
```

Buat user database dan database `maktabit_web`:

```bash
sudo -u postgres psql
```

Jalankan perintah SQL berikut di dalam prompt `postgres=#` (ganti `PasswordKuatMaktabIT2026!` dengan password pilihan Anda):

```sql
CREATE USER maktabit WITH PASSWORD 'PasswordKuatMaktabIT2026!';
CREATE DATABASE maktabit_web OWNER maktabit;
GRANT ALL PRIVILEGES ON DATABASE maktabit_web TO maktabit;
\c maktabit_web
GRANT ALL ON SCHEMA public TO maktabit;
\q
```

Uji koneksi database lokal:

```bash
psql "postgresql://maktabit:PasswordKuatMaktabIT2026!@127.0.0.1:5432/maktabit_web" -c "\conninfo"
```

---

## 4. Penempatan Kode Proyek & Konfigurasi `.env` (Khusus IP Publik)

Siapkan direktori `/var/www/MaktabITWeb` di VPS:

```bash
sudo mkdir -p /var/www/MaktabITWeb
sudo chown -R $USER:$USER /var/www/MaktabITWeb
```

### Cara A — Menggunakan Git Clone
```bash
git clone <URL_REPOSITORY_GIT_ANDA> /var/www/MaktabITWeb
cd /var/www/MaktabITWeb/maktabit-web
```

### Cara B — Upload Langsung dari Komputer Lokal (Tanpa GitHub)
Jika Anda ingin mengunggah langsung dari komputer Windows Anda via PowerShell (tanpa menyertakan `node_modules` dan `.next`):
```powershell
# Jalankan di PowerShell komputer lokal Anda:
tar --exclude="node_modules" --exclude=".next" --exclude=".git" -czf maktabit-web.tar.gz -C c:\TEMP\VSCODE\MaktabITWeb maktabit-web
scp maktabit-web.tar.gz user@<IP_PUBLIK_VPS>:/var/www/MaktabITWeb/
```
Lalu di terminal VPS:
```bash
cd /var/www/MaktabITWeb
tar -xzf maktabit-web.tar.gz
cd /var/www/MaktabITWeb/maktabit-web
```

---

### Konfigurasi File `.env` untuk IP Publik

Misalkan IP Publik VPS Anda adalah `203.0.113.50`. Buat file `.env`:

```bash
cd /var/www/MaktabITWeb/maktabit-web
nano .env
```

Isi dengan konfigurasi berikut:

```env
# Koneksi PostgreSQL Lokal di VPS
DATABASE_URL=postgresql://maktabit:PasswordKuatMaktabIT2026!@127.0.0.1:5432/maktabit_web

# Secret Key Payload CMS (Gunakan string acak minimal 32 karakter)
# Anda dapat membuatnya dengan perintah: openssl rand -hex 32
PAYLOAD_SECRET=9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e

# URL Publik menggunakan IP Publik VPS (Gunakan http://, BUKAN https://)
NEXT_PUBLIC_SITE_URL=http://203.0.113.50

# Opsional: Object Storage (Kosongkan jika ingin menyimpan gambar di disk VPS ./media)
# S3_BUCKET=
# S3_ACCESS_KEY_ID=
# S3_SECRET_ACCESS_KEY=
# S3_REGION=auto
# S3_ENDPOINT=

# Opsional: Notifikasi Email & Anti-Spam Form Kontak
# RESEND_API_KEY=
# CONTACT_RECIPIENT_EMAIL=hello@maktabit.tech
# NEXT_PUBLIC_TURNSTILE_SITE_KEY=
# TURNSTILE_SECRET_KEY=
```

> **Penting untuk Akses via IP Publik (HTTP):**
> Pastikan `NEXT_PUBLIC_SITE_URL` diawali **`http://`** (bukan `https://`) selama Anda belum memasang domain dan sertifikat SSL. Payload CMS menggunakan *HttpOnly Cookie* untuk sesi login `/admin`; jika diset `https://` padahal diakses lewat `http://<IP_PUBLIK>`, browser akan menolak menyimpan cookie login.

Pastikan folder penyimpanan media lokal tersedia dan memiliki izin tulis:
```bash
mkdir -p /var/www/MaktabITWeb/maktabit-web/media
```

---

## 5. Instalasi Dependensi, Build Produksi & Menjalankan dengan PM2

Di dalam direktori `/var/www/MaktabITWeb/maktabit-web`:

```bash
# 1. Instal seluruh dependensi
npm install

# 2. Build aplikasi untuk produksi
npm run build

# 3. Isi data awal MaktabIT Technology (jalankan sekali saat instalasi pertama)
npm run seed
```

Setelah `npm run build` selesai tanpa error, jalankan aplikasi menggunakan **PM2** melalui file konfigurasi `ecosystem.config.cjs` yang sudah disediakan di dalam folder `maktabit-web` (otomatis berjalan di port `3390`):

```bash
# 4. Jalankan aplikasi di background menggunakan ecosystem.config.cjs
pm2 start ecosystem.config.cjs

# 5. Pastikan statusnya "online"
pm2 status

# 6. Simpan daftar proses & aktifkan auto-start saat VPS menyala ulang (reboot)
pm2 save
pm2 startup
```
*(Salin dan jalankan baris perintah `sudo env PATH=...` yang ditampilkan oleh output `pm2 startup`, lalu jalankan `pm2 save` sekali lagi).*

Uji apakah server lokal merespons di port `3390`:
```bash
curl -I http://127.0.0.1:3390
```

---

## 6. Setup Nginx sebagai Reverse Proxy (Port 80 → Port 3390)

Agar website dapat diakses langsung melalui **`http://<IP_PUBLIK_VPS>`** (tanpa perlu mengetik `:3390`), pasang Nginx di level OS:

```bash
sudo apt install -y nginx
sudo systemctl enable --now nginx
```

Buat file konfigurasi *virtual host* untuk MaktabIT:

```bash
sudo nano /etc/nginx/sites-available/maktabit-web
```

Masukkan konfigurasi berikut:

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    # Menerima request langsung dari IP Publik VPS
    server_name _;

    # Mengizinkan upload gambar di Payload CMS (/admin) hingga 25 MB
    client_max_body_size 25M;

    location / {
        proxy_pass http://127.0.0.1:3390;
        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 120s;
    }
}
```

Aktifkan konfigurasi Nginx tersebut:

```bash
# Nonaktifkan konfigurasi default bawaan Nginx
sudo rm -f /etc/nginx/sites-enabled/default

# Aktifkan konfigurasi maktabit-web
sudo ln -s /etc/nginx/sites-available/maktabit-web /etc/nginx/sites-enabled/

# Uji validitas sintaks Nginx & muat ulang
sudo nginx -t
sudo systemctl reload nginx
```

---

## 7. Konfigurasi Firewall OS (UFW)

Amankan VPS agar hanya membuka port SSH (`22`) dan HTTP (`80`) ke publik, sementara port internal (`3390` dan `5432`) tertutup dari akses luar langsung:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx HTTP'
sudo ufw enable
sudo ufw status
```

*(Opsional: Jika Anda juga ingin membuka akses langsung ke port `3390` tanpa melalui Nginx, jalankan `sudo ufw allow 3390/tcp`).*

---

## 8. Panduan Operasional & Pemeliharaan di VPS

### A. Mengakses Aplikasi
- **Halaman Publik**: `http://<IP_PUBLIK_VPS>`
- **Admin Panel CMS**: `http://<IP_PUBLIK_VPS>/admin` *(Saat pertama kali dibuka, buat akun pertama yang otomatis menjadi `Super Admin`)*.

### B. Memantau Log & Restart Aplikasi
```bash
# Melihat log real-time aplikasi Next.js + Payload
pm2 logs maktabit-web

# Memantau penggunaan CPU & RAM
pm2 monit

# Restart aplikasi
pm2 restart maktabit-web
```

### C. Memperbarui Aplikasi (Deploy Update Baru)
Setiap kali ada pembaruan kode:
```bash
cd /var/www/MaktabITWeb/maktabit-web
git pull
npm install
npm run build
pm2 restart maktabit-web
```

### D. Backup Database PostgreSQL & Media Lokal
```bash
# Backup database ke file .sql
pg_dump "postgresql://maktabit:PasswordKuatMaktabIT2026!@127.0.0.1:5432/maktabit_web" > ~/backup_maktabit_$(date +%F).sql

# Backup folder gambar/media lokal
tar -czf ~/backup_media_$(date +%F).tar.gz -C /var/www/MaktabITWeb/maktabit-web media
```

---

## 9. Konfigurasi Multi-Aplikasi Sub-Path pada Satu IP Publik

Jika di VPS yang sama Anda menjalankan container Docker lain dan ingin mengaksesnya menggunakan sub-path pada IP Publik yang sama:
- **`http://<IP_PUBLIK>/`** → **MaktabIT Web & CMS** (Port `3390`)
- **`http://<IP_PUBLIK>/quranweb/`** → **QuranWeb** (Docker Port `3382`)
- **`http://<IP_PUBLIK>/tracker/`** → **TrackerKerja** (Docker Port `3005`)

Gunakan konfigurasi lengkap `/etc/nginx/sites-available/maktabit-web` berikut:

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    client_max_body_size 25M;

    # =====================================================================
    # A. SUB-PATH 1: QURANWEB (Docker Port 3382) -> http://<IP>/quranweb/
    # =====================================================================
    location = /quranweb {
        return 301 /quranweb/;
    }

    location /quranweb/ {
        proxy_pass http://127.0.0.1:3382/;
        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Accept-Encoding "";

        sub_filter_types text/css application/javascript text/javascript;
        sub_filter_once off;
        sub_filter 'href="/' 'href="/quranweb/';
        sub_filter 'src="/' 'src="/quranweb/';
        sub_filter '"/data/' '"/quranweb/data/';
        sub_filter '`/data/' '`/quranweb/data/';
        sub_filter '"/fonts/' '"/quranweb/fonts/';
        sub_filter 'url(/fonts/' 'url(/quranweb/fonts/';
        sub_filter 'url("/fonts/' 'url("/quranweb/fonts/';
        sub_filter '"/api/' '"/quranweb/api/';
        sub_filter '`/api/' '`/quranweb/api/';
    }

    location /data/ {
        proxy_pass http://127.0.0.1:3382/data/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }

    location /fonts/ {
        proxy_pass http://127.0.0.1:3382/fonts/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }

    # =====================================================================
    # B. SUB-PATH 2: TRACKER (Docker Port 3005) -> http://<IP>/tracker/
    # =====================================================================
    location = /tracker {
        return 301 /tracker/;
    }

    # Pengaman jika ada redirect langsung ke /login dari Tracker
    location = /login {
        return 302 /tracker/login$is_args$args;
    }

    location /tracker/ {
        proxy_pass http://127.0.0.1:3005/;
        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Accept-Encoding "";

        proxy_redirect / /tracker/;

        sub_filter_types text/css application/javascript text/javascript application/json text/x-component;
        sub_filter_once off;

        # Runtime Shim di <head> untuk mencegat Axios (XHR), Fetch, dan History API
        sub_filter '<head>' '<head><script>(function(){var P="/tracker";function fix(u){if(typeof u==="string"&&u.startsWith("/")&&!u.startsWith(P+"/")&&u!==P){return P+u}return u}var oOpen=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(m,u){arguments[1]=fix(u);return oOpen.apply(this,arguments)};var oFetch=window.fetch;window.fetch=function(u,o){if(typeof u==="string")u=fix(u);return oFetch.call(this,u,o)};var oPush=history.pushState;history.pushState=function(s,t,u){return oPush.call(this,s,t,fix(u))};var oRep=history.replaceState;history.replaceState=function(s,t,u){return oRep.call(this,s,t,fix(u))}})();</script>';

        # Rewrite atribut HTML & bundle Next.js
        sub_filter 'href="/' 'href="/tracker/';
        sub_filter 'src="/' 'src="/tracker/';
        sub_filter '"/_next/' '"/tracker/_next/';
        sub_filter '`/_next/' '`/tracker/_next/';

        # Rewrite getBaseUrl() Axios & SignalR (/api -> /tracker/api)
        sub_filter 'let e="/api"' 'let e="/tracker/api"';
        sub_filter '?"/api":e:"/api"' '?"/tracker/api":e:"/tracker/api"';
        sub_filter '"/uploads/' '"/tracker/uploads/';

        # Rewrite redirect /login & /dashboard di dalam chunk JS
        sub_filter '"/login"' '"/tracker/login"';
        sub_filter '"/login?' '"/tracker/login?';
        sub_filter '"/dashboard"' '"/tracker/dashboard"';
    }

    # =====================================================================
    # C. ROOT IP: MAKTABIT WEB & CMS (Port 3390) -> http://<IP>/
    # =====================================================================
    location / {
        proxy_pass http://127.0.0.1:3390;
        proxy_http_version 1.1;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 120s;
    }
}
```

