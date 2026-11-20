import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { ContactMessages } from './collections/ContactMessages'
import { Media } from './collections/Media'
import { Posts } from './collections/Posts'
import { Projects } from './collections/Projects'
import { Services } from './collections/Services'
import { Tags } from './collections/Tags'
import { TechStacks } from './collections/TechStacks'
import { Users } from './collections/Users'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isS3Configured = Boolean(
  process.env.S3_BUCKET && process.env.S3_ACCESS_KEY_ID && process.env.S3_SECRET_ACCESS_KEY,
)

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: 'light',
    meta: {
      titleSuffix: '— MaktabIT WP-Admin CMS',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      header: ['/components/admin/WPAdminBar#WPAdminBar'],
      beforeDashboard: ['/components/admin/WPDashboardWidgets#WPDashboardWidgets'],
      graphics: {
        Logo: '/components/admin/WPLogo#WPLogo',
        Icon: '/components/admin/WPLogo#WPIcon',
      },
    },
  },
  globals: [SiteSettings],
  collections: [
    Posts,
    Categories,
    Tags,
    Projects,
    Services,
    TechStacks,
    ContactMessages,
    Media,
    Users,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    s3Storage({
      enabled: isS3Configured,
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || 'auto',
        endpoint: process.env.S3_ENDPOINT || undefined,
        forcePathStyle: true,
      },
    }),
  ],
})
