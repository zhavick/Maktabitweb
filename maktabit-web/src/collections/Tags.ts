import type { CollectionConfig } from 'payload'

import { isAdminOrEditor, isAuthenticated, publicRead } from '../access/roles'

const formatSlug = (val: string): string =>
  val
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

export const Tags: CollectionConfig = {
  slug: 'tags',
  labels: {
    singular: 'Tag Artikel',
    plural: 'Tag Artikel',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug'],
    group: 'Blog & Publikasi',
  },
  access: {
    read: publicRead,
    create: isAuthenticated,
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
          label: 'Nama Tag',
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
  ],
}
