import Link from 'next/link'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'

export async function WPDashboardWidgets() {
  let postsCount = 0
  let publishedPostsCount = 0
  let draftPostsCount = 0
  let projectsCount = 0
  let servicesCount = 0
  let categoriesCount = 0
  let mediaCount = 0
  let unreadMessagesCount = 0
  let recentPosts: Array<{
    id: number | string
    title: string
    slug: string
    status: string
    updatedAt: string
  }> = []
  let recentMessages: Array<{
    id: number | string
    senderName: string
    topic: string
    status: string
    createdAt: string
  }> = []

  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const [
      allPosts,
      pubPosts,
      drfPosts,
      projects,
      services,
      categories,
      media,
      unreadMsgs,
      latestPostsList,
      latestMsgsList,
    ] = await Promise.all([
      payload.count({ collection: 'posts' }),
      payload.count({
        collection: 'posts',
        where: { status: { equals: 'published' } },
      }),
      payload.count({
        collection: 'posts',
        where: { status: { equals: 'draft' } },
      }),
      payload.count({ collection: 'projects' }),
      payload.count({ collection: 'services' }),
      payload.count({ collection: 'categories' }),
      payload.count({ collection: 'media' }),
      payload.count({
        collection: 'contact-messages',
        where: { status: { equals: 'unread' } },
      }),
      payload.find({
        collection: 'posts',
        sort: '-updatedAt',
        limit: 5,
        depth: 0,
      }),
      payload.find({
        collection: 'contact-messages',
        sort: '-createdAt',
        limit: 4,
        depth: 0,
      }),
    ])

    postsCount = allPosts.totalDocs
    publishedPostsCount = pubPosts.totalDocs
    draftPostsCount = drfPosts.totalDocs
    projectsCount = projects.totalDocs
    servicesCount = services.totalDocs
    categoriesCount = categories.totalDocs
    mediaCount = media.totalDocs
    unreadMessagesCount = unreadMsgs.totalDocs

    recentPosts = latestPostsList.docs.map((p) => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      status: p.status,
      updatedAt: p.updatedAt,
    }))

    recentMessages = latestMsgsList.docs.map((m) => ({
      id: m.id,
      senderName: m.senderName,
      topic: m.topic,
      status: m.status,
      createdAt: m.createdAt,
    }))
  } catch {
    // fallback safely
  }

  return (
    <div className="wp-maktab-dashboard">
      {/* 1. WordPress Welcome Panel */}
      <div className="wp-welcome-panel">
        <div className="wp-welcome-panel__header">
          <div>
            <span className="wp-welcome-panel__badge">WP-Admin Mode • PT. MaktabIT Technology</span>
            <h2 className="wp-welcome-panel__title">
              Selamat Datang di Pusat Kendali MaktabIT CMS!
            </h2>
            <p className="wp-welcome-panel__desc">
              Kelola artikel blog, halaman publikasi utama, portofolio proyek, dan pesan konsultasi
              klien dengan tata letak familier ala WordPress.
            </p>
          </div>
          <div className="wp-welcome-panel__cta-group">
            <Link href="/admin/collections/posts/create" className="wp-btn wp-btn--primary">
              ✏️ Tulis Artikel Baru
            </Link>
            <Link href="/admin/globals/site-settings" className="wp-btn wp-btn--secondary">
              🎨 Sesuaikan Landing Page
            </Link>
          </div>
        </div>

        <div className="wp-welcome-panel__columns">
          <div className="wp-welcome-panel__col">
            <h4>Mulai Publikasi</h4>
            <ul>
              <li>
                <Link href="/admin/collections/posts/create">➕ Buat Artikel / Berita Baru</Link>
              </li>
              <li>
                <Link href="/admin/collections/categories">📁 Kelola Kategori &amp; Topik Blog</Link>
              </li>
              <li>
                <Link href="/admin/collections/media">🖼️ Pustaka Media &amp; Gambar</Link>
              </li>
            </ul>
          </div>

          <div className="wp-welcome-panel__col">
            <h4>Kelola Konten Halaman</h4>
            <ul>
              <li>
                <Link href="/admin/globals/site-settings">
                  ⚙️ Edit Hero, Prakata, Visi &amp; Misi
                </Link>
              </li>
              <li>
                <Link href="/admin/collections/projects">
                  🚀 Kelola Portofolio Proyek ({projectsCount})
                </Link>
              </li>
              <li>
                <Link href="/admin/collections/services">
                  🛠️ Kelola Daftar Layanan ({servicesCount})
                </Link>
              </li>
            </ul>
          </div>

          <div className="wp-welcome-panel__col">
            <h4>Tautan Langsung Situs</h4>
            <ul>
              <li>
                <a href="/" target="_blank" rel="noopener noreferrer">
                  🌐 Buka Landing Page Utama &nearr;
                </a>
              </li>
              <li>
                <a href="/blog" target="_blank" rel="noopener noreferrer">
                  📰 Buka Halaman Indeks Blog &nearr;
                </a>
              </li>
              <li>
                <a href="/proyek" target="_blank" rel="noopener noreferrer">
                  💼 Buka Katalog Proyek &nearr;
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 2. WordPress Metabox Grid (At a Glance, Activity, Inbox) */}
      <div className="wp-metabox-grid">
        {/* Metabox 1: Sekilas Pandang (At a Glance) */}
        <div className="wp-postbox">
          <div className="wp-postbox__header">
            <h3>📊 Sekilas Pandang (At a Glance)</h3>
          </div>
          <div className="wp-postbox__body">
            <div className="wp-glance-grid">
              <Link href="/admin/collections/posts" className="wp-glance-item">
                <span className="wp-glance-item__num">{postsCount}</span>
                <span className="wp-glance-item__label">
                  Total Artikel ({publishedPostsCount} Terbit, {draftPostsCount} Konsep)
                </span>
              </Link>

              <Link href="/admin/collections/projects" className="wp-glance-item">
                <span className="wp-glance-item__num">{projectsCount}</span>
                <span className="wp-glance-item__label">Proyek Portofolio</span>
              </Link>

              <Link href="/admin/collections/services" className="wp-glance-item">
                <span className="wp-glance-item__num">{servicesCount}</span>
                <span className="wp-glance-item__label">Layanan Aktif</span>
              </Link>

              <Link href="/admin/collections/categories" className="wp-glance-item">
                <span className="wp-glance-item__num">{categoriesCount}</span>
                <span className="wp-glance-item__label">Kategori Blog</span>
              </Link>

              <Link href="/admin/collections/media" className="wp-glance-item">
                <span className="wp-glance-item__num">{mediaCount}</span>
                <span className="wp-glance-item__label">Berkas Pustaka Media</span>
              </Link>

              <Link href="/admin/collections/contact-messages" className="wp-glance-item">
                <span
                  className="wp-glance-item__num"
                  style={{ color: unreadMessagesCount > 0 ? '#d63638' : '#2271b1' }}
                >
                  {unreadMessagesCount}
                </span>
                <span className="wp-glance-item__label">Pesan Konsultasi Belum Dibaca</span>
              </Link>
            </div>
            <div className="wp-postbox__footer-note">
              MaktabIT CMS v3.94 • Tema Admin bergaya WordPress (Next.js + Payload + PostgreSQL).
            </div>
          </div>
        </div>

        {/* Metabox 2: Aktivitas & Artikel Terbaru (Activity) */}
        <div className="wp-postbox">
          <div className="wp-postbox__header">
            <h3>📝 Aktivitas Publikasi Terbaru (Recently Published)</h3>
            <Link href="/admin/collections/posts/create" className="wp-postbox__action">
              + Tambah Baru
            </Link>
          </div>
          <div className="wp-postbox__body">
            {recentPosts.length === 0 ? (
              <p className="wp-empty-text">Belum ada artikel yang ditulis.</p>
            ) : (
              <ul className="wp-activity-list">
                {recentPosts.map((post) => (
                  <li key={post.id} className="wp-activity-list__item">
                    <div className="wp-activity-list__main">
                      <Link
                        href={`/admin/collections/posts/${post.id}`}
                        className="wp-activity-list__title"
                      >
                        {post.title}
                      </Link>
                      <span
                        className={`wp-status-badge ${
                          post.status === 'published'
                            ? 'wp-status-badge--pub'
                            : 'wp-status-badge--draft'
                        }`}
                      >
                        {post.status === 'published' ? 'Terbit' : 'Draft'}
                      </span>
                    </div>
                    <div className="wp-activity-list__actions">
                      <Link href={`/admin/collections/posts/${post.id}`}>Sunting</Link>
                      <span>|</span>
                      <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                        Lihat
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Metabox 3: Pesan Konsultasi Terbaru */}
        <div className="wp-postbox">
          <div className="wp-postbox__header">
            <h3>✉️ Kotak Masuk Konsultasi Terbaru</h3>
            <Link href="/admin/collections/contact-messages" className="wp-postbox__action">
              Lihat Semua
            </Link>
          </div>
          <div className="wp-postbox__body">
            {recentMessages.length === 0 ? (
              <p className="wp-empty-text">Belum ada pesan masuk dari pengunjung.</p>
            ) : (
              <ul className="wp-activity-list">
                {recentMessages.map((msg) => (
                  <li key={msg.id} className="wp-activity-list__item">
                    <div className="wp-activity-list__main">
                      <Link
                        href={`/admin/collections/contact-messages/${msg.id}`}
                        className="wp-activity-list__title"
                      >
                        {msg.senderName} — <span style={{ fontWeight: 400 }}>{msg.topic}</span>
                      </Link>
                      <span
                        className={`wp-status-badge ${
                          msg.status === 'unread'
                            ? 'wp-status-badge--unread'
                            : 'wp-status-badge--pub'
                        }`}
                      >
                        {msg.status === 'unread' ? 'Baru' : msg.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="wp-section-divider">
        <span>Semua Koleksi &amp; Modul Data (WordPress Post Types)</span>
      </div>
    </div>
  )
}
