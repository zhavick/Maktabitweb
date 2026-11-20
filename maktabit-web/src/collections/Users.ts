import type { CollectionConfig } from 'payload'

import {
  isSuperAdmin,
  isSuperAdminFieldLevel,
  isSuperAdminOrSelf,
} from '../access/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role', 'updatedAt'],
    group: 'Pengguna & Akses',
  },
  auth: true,
  access: {
    admin: ({ req: { user } }) => Boolean(user),
    create: isSuperAdmin,
    read: isSuperAdminOrSelf,
    update: isSuperAdminOrSelf,
    delete: isSuperAdmin,
  },
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation === 'create') {
          const existingUsers = await req.payload.count({
            collection: 'users',
            overrideAccess: true,
          })

          // Pastikan akun pertama yang dibuat otomatis menjadi Super Admin
          if (existingUsers.totalDocs === 0) {
            return {
              ...data,
              role: 'super-admin',
            }
          }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'name',
      label: 'Nama Lengkap',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      label: 'Peran (Role)',
      type: 'select',
      required: true,
      defaultValue: 'author',
      saveToJWT: true,
      access: {
        create: isSuperAdminFieldLevel,
        update: isSuperAdminFieldLevel,
      },
      options: [
        {
          label: 'Super Admin',
          value: 'super-admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
        {
          label: 'Author / Penulis',
          value: 'author',
        },
      ],
    },
    {
      name: 'avatar',
      label: 'Foto Profil',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
