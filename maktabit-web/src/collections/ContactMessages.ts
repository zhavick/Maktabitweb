import type { CollectionConfig } from 'payload'

import { isAdminOrEditor, isSuperAdmin } from '../access/roles'

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  labels: {
    singular: 'Pesan Kontak',
    plural: 'Pesan Kontak',
  },
  admin: {
    useAsTitle: 'senderName',
    defaultColumns: ['senderName', 'senderEmail', 'topic', 'status', 'createdAt'],
    group: 'Interaksi & Pesan',
  },
  access: {
    create: () => true,
    read: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isSuperAdmin,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'senderName',
          label: 'Nama Pengirim',
          type: 'text',
          required: true,
        },
        {
          name: 'senderEmail',
          label: 'Email Pengirim',
          type: 'email',
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'topic',
          label: 'Topik Kebutuhan',
          type: 'text',
          required: true,
        },
        {
          name: 'status',
          label: 'Status Tindak Lanjut',
          type: 'select',
          required: true,
          defaultValue: 'unread',
          options: [
            { label: 'Belum Dibaca (Unread)', value: 'unread' },
            { label: 'Sudah Dibaca (Read)', value: 'read' },
            { label: 'Sudah Dibalas (Replied)', value: 'replied' },
          ],
        },
      ],
    },
    {
      name: 'message',
      label: 'Detail Pesan',
      type: 'textarea',
      required: true,
    },
    {
      name: 'adminNotes',
      label: 'Catatan Internal Tim (Opsional)',
      type: 'textarea',
    },
  ],
}
