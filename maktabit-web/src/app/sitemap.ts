import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'

import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3390').replace(/\/$/, '')

  const routes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/proyek`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const [postsRes, projectsRes] = await Promise.all([
      payload.find({
        collection: 'posts',
        where: {
          status: {
            equals: 'published',
          },
        },
        sort: '-publishedAt',
        limit: 500,
        depth: 0,
      }),
      payload.find({
        collection: 'projects',
        sort: 'sortOrder',
        limit: 100,
        depth: 0,
      }),
    ])

    for (const post of postsRes.docs) {
      routes.push({
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt || post.publishedAt || post.createdAt),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }

    for (const project of projectsRes.docs) {
      routes.push({
        url: `${siteUrl}/proyek/${project.slug}`,
        lastModified: new Date(project.updatedAt || project.createdAt),
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    }
  } catch {
    // Kembalikan rute utama jika database belum dapat dihubungi saat build statis
  }

  return routes
}
