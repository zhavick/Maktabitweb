import { getPayload, type Payload } from 'payload'
import { beforeAll, describe, expect, it } from 'vitest'

import config from '@/payload.config'

let payload: Payload

describe('MaktabIT CMS Integration & RBAC Tests', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  it('memuat Global SiteSettings dengan identitas MaktabIT Technology', async () => {
    const settings = await payload.findGlobal({
      slug: 'site-settings',
    })
    expect(settings).toBeDefined()
    expect(settings.companyName).toBe('MaktabIT Technology')
    expect(settings.email).toBe('hello@maktabit.tech')
  })

  it('memuat daftar Layanan, Proyek Portofolio (TaskWorkerPro & QuranWeb), dan TechStacks', async () => {
    const [services, projects, techStacks] = await Promise.all([
      payload.find({ collection: 'services' }),
      payload.find({ collection: 'projects', sort: 'sortOrder' }),
      payload.find({ collection: 'tech-stacks' }),
    ])

    expect(services.totalDocs).toBeGreaterThanOrEqual(4)
    expect(projects.totalDocs).toBeGreaterThanOrEqual(2)
    expect(projects.docs.map((p) => p.slug)).toEqual(
      expect.arrayContaining(['taskworker', 'quranweb']),
    )
    expect(techStacks.totalDocs).toBeGreaterThanOrEqual(4)
  })

  it('membatasi akses publik agar hanya dapat membaca artikel berstatus published', async () => {
    const publicPosts = await payload.find({
      collection: 'posts',
      overrideAccess: false,
    })

    expect(publicPosts.totalDocs).toBeGreaterThanOrEqual(3)
    for (const post of publicPosts.docs) {
      expect(post.status).toBe('published')
    }
  })

  it('mengizinkan pengiriman pesan kontak publik tetapi menolak pembacaan tanpa autentikasi admin/editor', async () => {
    const created = await payload.create({
      collection: 'contact-messages',
      overrideAccess: false,
      data: {
        senderName: 'Penguji Integrasi QA',
        senderEmail: 'qa@maktabit.tech',
        topic: 'Pengembangan Aplikasi Web Custom',
        message: 'Pengujian otomatis penyimpanan pesan kontak dari vitest integration suite.',
        status: 'unread',
      },
    })

    expect(created.id).toBeDefined()

    // Publik tanpa login tidak boleh membaca daftar pesan kontak
    await expect(
      payload.find({
        collection: 'contact-messages',
        overrideAccess: false,
      }),
    ).rejects.toThrow()

    // Bersihkan data uji menggunakan akses sistem
    await payload.delete({
      collection: 'contact-messages',
      id: created.id,
      overrideAccess: true,
    })
  })
})
