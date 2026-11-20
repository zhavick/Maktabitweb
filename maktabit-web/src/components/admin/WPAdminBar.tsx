'use client'

import Link from 'next/link'
import React from 'react'

export function WPAdminBar() {
  return (
    <div className="wp-maktab-adminbar">
      <div className="wp-maktab-adminbar__left">
        <Link href="/admin" className="wp-maktab-adminbar__brand" title="Dashboard MaktabIT CMS">
          <span className="wp-maktab-adminbar__logo-circle">M</span>
          <span className="wp-maktab-adminbar__title">MaktabIT CMS</span>
        </Link>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="wp-maktab-adminbar__item"
          title="Buka halaman depan website di tab baru"
        >
          <span className="wp-maktab-adminbar__icon">🏠</span>
          <span>Lihat Website</span>
        </a>

        <a
          href="/blog"
          target="_blank"
          rel="noopener noreferrer"
          className="wp-maktab-adminbar__item wp-maktab-adminbar__hide-mobile"
        >
          <span className="wp-maktab-adminbar__icon">📰</span>
          <span>Lihat Blog</span>
        </a>

        <Link
          href="/admin/collections/posts/create"
          className="wp-maktab-adminbar__item wp-maktab-adminbar__new-btn"
        >
          <span className="wp-maktab-adminbar__plus">+</span>
          <span>Baru (Tulis Artikel)</span>
        </Link>

        <Link
          href="/admin/collections/projects/create"
          className="wp-maktab-adminbar__item wp-maktab-adminbar__hide-mobile"
        >
          <span>+ Proyek</span>
        </Link>

        <Link
          href="/admin/collections/media/create"
          className="wp-maktab-adminbar__item wp-maktab-adminbar__hide-mobile"
        >
          <span>+ Media</span>
        </Link>

        <Link
          href="/admin/collections/contact-messages"
          className="wp-maktab-adminbar__item wp-maktab-adminbar__hide-mobile"
        >
          <span className="wp-maktab-adminbar__icon">✉️</span>
          <span>Kotak Masuk</span>
        </Link>
      </div>

      <div className="wp-maktab-adminbar__right">
        <Link
          href="/admin/globals/site-settings"
          className="wp-maktab-adminbar__item wp-maktab-adminbar__hide-mobile"
        >
          <span>⚙️ Pengaturan Situs</span>
        </Link>
        <Link href="/admin/account" className="wp-maktab-adminbar__item">
          <span>👤 Profil Akun</span>
        </Link>
      </div>
    </div>
  )
}
