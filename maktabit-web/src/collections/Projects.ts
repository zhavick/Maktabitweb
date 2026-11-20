import type { CollectionConfig } from 'payload'

import { isAdminOrEditor, publicRead } from '../access/roles'
import {
  revalidateCollectionChangeHook,
  revalidateCollectionDeleteHook,
} from '../hooks/revalidateSite'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Proyek Portofolio',
    plural: 'Proyek Portofolio',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['projectCode', 'title', 'categoryLabel', 'isFeatured', 'sortOrder'],
    group: 'Konten Halaman',
  },
  access: {
    read: publicRead,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  hooks: {
    afterChange: [revalidateCollectionChangeHook],
    afterDelete: [revalidateCollectionDeleteHook],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'projectCode',
          label: 'Kode Proyek (Misal: PROJECT #01)',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          label: 'Nama Proyek',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          label: 'Slug / Key Unik (Misal: taskworker)',
          type: 'text',
          required: true,
          unique: true,
          index: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'categoryLabel',
          label: 'Label Kategori',
          type: 'text',
          required: true,
        },
        {
          name: 'modalBadge',
          label: 'Badge pada Modal Ringkasan Teknis',
          type: 'text',
          required: true,
        },
        {
          name: 'accentColor',
          label: 'Warna Tema Proyek',
          type: 'select',
          required: true,
          defaultValue: 'sky',
          options: [
            { label: 'Biru (Sky)', value: 'sky' },
            { label: 'Hijau (Emerald)', value: 'emerald' },
            { label: 'Ungu (Indigo)', value: 'indigo' },
            { label: 'Kuning (Amber)', value: 'amber' },
          ],
        },
      ],
    },
    {
      name: 'shortDesc',
      label: 'Deskripsi Singkat Proyek',
      type: 'textarea',
      required: true,
    },
    {
      name: 'architectureSummary',
      label: 'Ringkasan Arsitektur & Tujuan Pengembangan (Ditampilkan pada Modal)',
      type: 'textarea',
      required: true,
    },
    {
      name: 'capabilities',
      label: 'Daftar Kapabilitas Utama',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'item',
          label: 'Kapabilitas / Fitur',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'techTags',
      label: 'Tag Teknologi',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'tag',
          label: 'Nama Tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'coverImage',
      label: 'Gambar Preview Proyek (Upload Media)',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'coverImageUrl',
      label: 'URL Gambar Preview (Fallback jika belum upload media)',
      type: 'text',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'githubUrl',
          label: 'URL Repositori GitHub',
          type: 'text',
          required: true,
        },
        {
          name: 'githubDisplay',
          label: 'Teks Tampilan URL GitHub',
          type: 'text',
          required: true,
        },
        {
          name: 'liveUrl',
          label: 'URL Demo Live (Opsional)',
          type: 'text',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'sortOrder',
          label: 'Urutan Tampil',
          type: 'number',
          required: true,
          defaultValue: 1,
        },
        {
          name: 'isFeatured',
          label: 'Tampilkan di Landing Page Utama',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
  ],
}
