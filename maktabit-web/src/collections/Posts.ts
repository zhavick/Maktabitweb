import type { Access, CollectionConfig } from 'payload'

import { isAdminOrEditor, isAuthenticated } from '../access/roles'
import {
  revalidateCollectionChangeHook,
  revalidateCollectionDeleteHook,
} from '../hooks/revalidateSite'

const formatSlug = (val: string): string =>
  val
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

const canReadPosts: Access = ({ req: { user } }) => {
  if (user) return true
  return {
    status: {
      equals: 'published',
    },
  }
}

const canUpdatePosts: Access = ({ req: { user } }) => {
  if (!user) return false
  const role = (user as { role?: string }).role
  if (role === 'super-admin' || role === 'editor') return true
  return {
    author: {
      equals: user.id,
    },
  }
}

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: 'Artikel & Publikasi',
    plural: 'Artikel & Publikasi',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishedAt', 'author'],
    group: 'Blog & Publikasi',
  },
  versions: {
    maxPerDoc: 10,
  },
  access: {
    read: canReadPosts,
    create: isAuthenticated,
    update: canUpdatePosts,
    delete: isAdminOrEditor,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && typeof data.title === 'string') {
          data.slug = formatSlug(data.title)
        }
        return data
      },
    ],
    beforeChange: [
      ({ data, operation, req }) => {
        if (operation === 'create' && req.user && !data.author) {
          data.author = req.user.id
        }
        if (data.status === 'published' && !data.publishedAt) {
          data.publishedAt = new Date().toISOString()
        }
        return data
      },
    ],
    afterChange: [revalidateCollectionChangeHook],
    afterDelete: [revalidateCollectionDeleteHook],
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Konten Artikel',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'title',
                  label: 'Judul Artikel',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'slug',
                  label: 'Slug URL',
                  type: 'text',
                  required: true,
                  unique: true,
                  index: true,
                },
              ],
            },
            {
              name: 'excerpt',
              label: 'Ringkasan Artikel (Excerpt)',
              type: 'textarea',
              required: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'category',
                  label: 'Kategori',
                  type: 'relationship',
                  relationTo: 'categories',
                  required: true,
                },
                {
                  name: 'tags',
                  label: 'Tag Artikel',
                  type: 'relationship',
                  relationTo: 'tags',
                  hasMany: true,
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'status',
                  label: 'Status Publikasi',
                  type: 'select',
                  required: true,
                  defaultValue: 'draft',
                  options: [
                    { label: 'Draft (Konsep)', value: 'draft' },
                    { label: 'Published (Terbit)', value: 'published' },
                  ],
                },
                {
                  name: 'publishedAt',
                  label: 'Tanggal Publikasi',
                  type: 'date',
                  admin: {
                    date: {
                      pickerAppearance: 'dayAndTime',
                    },
                  },
                },
                {
                  name: 'readingTimeMinutes',
                  label: 'Estimasi Waktu Baca (Menit)',
                  type: 'number',
                  defaultValue: 4,
                  min: 1,
                },
              ],
            },
            {
              name: 'author',
              label: 'Penulis',
              type: 'relationship',
              relationTo: 'users',
            },
            {
              name: 'coverImage',
              label: 'Gambar Sampul (Upload Media)',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'coverImageUrl',
              label: 'URL Gambar Sampul (Fallback jika belum upload media)',
              type: 'text',
            },
            {
              name: 'content',
              label: 'Isi Lengkap Artikel',
              type: 'richText',
              required: true,
            },
          ],
        },
        {
          label: 'SEO & Metadata',
          fields: [
            {
              name: 'seo',
              label: 'Pengaturan SEO',
              type: 'group',
              fields: [
                {
                  name: 'metaTitle',
                  label: 'Meta Title (Kosongkan untuk memakai judul artikel)',
                  type: 'text',
                },
                {
                  name: 'metaDescription',
                  label: 'Meta Description (Kosongkan untuk memakai ringkasan)',
                  type: 'textarea',
                },
                {
                  name: 'ogImage',
                  label: 'OpenGraph Image Kustom',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
