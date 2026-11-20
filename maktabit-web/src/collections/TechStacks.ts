import type { CollectionConfig } from 'payload'

import { isAdminOrEditor, publicRead } from '../access/roles'
import {
  revalidateCollectionChangeHook,
  revalidateCollectionDeleteHook,
} from '../hooks/revalidateSite'

export const TechStacks: CollectionConfig = {
  slug: 'tech-stacks',
  labels: {
    singular: 'Ekosistem Teknologi',
    plural: 'Ekosistem Teknologi',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['code', 'title', 'accentColor', 'sortOrder'],
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
          name: 'code',
          label: 'Kode Kategori (Misal: 01 // FRONTEND)',
          type: 'text',
          required: true,
        },
        {
          name: 'title',
          label: 'Judul Pilar Teknologi',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'description',
      label: 'Daftar & Penjelasan Teknologi',
      type: 'textarea',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'accentColor',
          label: 'Warna Aksen',
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
        {
          name: 'sortOrder',
          label: 'Urutan Tampil',
          type: 'number',
          required: true,
          defaultValue: 1,
        },
      ],
    },
  ],
}
