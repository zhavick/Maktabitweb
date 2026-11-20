import type { CollectionConfig } from 'payload'

import { isAdminOrEditor, publicRead } from '../access/roles'
import {
  revalidateCollectionChangeHook,
  revalidateCollectionDeleteHook,
} from '../hooks/revalidateSite'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Layanan',
    plural: 'Layanan',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'icon', 'accentColor', 'sortOrder', 'isActive'],
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
      name: 'title',
      label: 'Nama Layanan',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Deskripsi Layanan',
      type: 'textarea',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'icon',
          label: 'Ikon Layanan',
          type: 'select',
          required: true,
          defaultValue: 'code',
          options: [
            { label: 'Kode / Web App (Code)', value: 'code' },
            { label: 'Otomasi / Siklus (Refresh)', value: 'refresh' },
            { label: 'Buku / Literasi (Book)', value: 'book' },
            { label: 'Server / API (Server)', value: 'server' },
            { label: 'Cloud / Infrastruktur (Cloud)', value: 'cloud' },
            { label: 'Keamanan / Shield (Shield)', value: 'shield' },
          ],
        },
        {
          name: 'accentColor',
          label: 'Warna Aksen Kartu',
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
          name: 'isActive',
          label: 'Tampilkan di Website',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
  ],
}
