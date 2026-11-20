import type { CollectionConfig } from 'payload'

import { isAdminOrEditor, publicRead } from '../access/roles'

const formatSlug = (val: string): string =>
  val
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: 'Kategori Blog',
    plural: 'Kategori Blog',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'description'],
    group: 'Blog & Publikasi',
  },
  access: {
    read: publicRead,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && typeof data.name === 'string') {
          data.slug = formatSlug(data.name)
        }
        return data
      },
    ],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          label: 'Nama Kategori',
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
      name: 'description',
      label: 'Deskripsi Kategori',
      type: 'textarea',
    },
  ],
}
