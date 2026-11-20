import { getPayload } from 'payload'

import config from '@/payload.config'
import type { Media, Post, Project, Service, SiteSetting, TechStack } from '@/payload-types'
import type { LandingPageClientProps } from '@/components/LandingPageClient'

export function resolveMediaUrl(
  mediaField: number | Media | null | undefined,
  fallbackUrl?: string | null,
  defaultUrl = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
): string {
  if (mediaField && typeof mediaField === 'object' && 'url' in mediaField && mediaField.url) {
    return mediaField.url
  }
  if (fallbackUrl && fallbackUrl.trim().length > 0) {
    return fallbackUrl
  }
  return defaultUrl
}

export interface LandingCMSData {
  landingProps: Omit<LandingPageClientProps, 'extraSection'>
  latestPosts: Post[]
  siteSettings: SiteSetting | null
}

export async function getLandingCMSData(): Promise<LandingCMSData> {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const [siteSettings, servicesRes, projectsRes, techStacksRes, postsRes] = await Promise.all([
      payload.findGlobal({
        slug: 'site-settings',
        depth: 1,
      }),
      payload.find({
        collection: 'services',
        where: {
          isActive: {
            equals: true,
          },
        },
        sort: 'sortOrder',
        limit: 20,
      }),
      payload.find({
        collection: 'projects',
        where: {
          isFeatured: {
            equals: true,
          },
        },
        sort: 'sortOrder',
        depth: 1,
        limit: 20,
      }),
      payload.find({
        collection: 'tech-stacks',
        sort: 'sortOrder',
        limit: 20,
      }),
      payload.find({
        collection: 'posts',
        where: {
          status: {
            equals: 'published',
          },
        },
        sort: '-publishedAt',
        depth: 1,
        limit: 3,
      }),
    ])

    const landingProps = mapCMSDataToLandingProps(
      siteSettings,
      servicesRes.docs,
      projectsRes.docs,
      techStacksRes.docs,
    )

    return {
      landingProps,
      latestPosts: postsRes.docs,
      siteSettings,
    }
  } catch (error) {
    console.warn('Gagal mengambil data CMS (menggunakan fallback default):', error)
    return {
      landingProps: {},
      latestPosts: [],
      siteSettings: null,
    }
  }
}

function mapCMSDataToLandingProps(
  settings: SiteSetting,
  services: Service[],
  projects: Project[],
  techStacks: TechStack[],
): Omit<LandingPageClientProps, 'extraSection'> {
  return {
    splash: {
      enabled: settings.splashEnabled ?? true,
      brandPrefix: settings.brandPrefix || 'Maktab',
      brandHighlight: settings.brandHighlight || 'IT',
      tagline: settings.splashTagline || undefined,
      stages:
        settings.splashStages?.map((s) => ({
          minProgress: s.minProgress,
          label: s.label,
        })) ?? undefined,
    },
    navbar: {
      brandPrefix: settings.brandPrefix || 'Maktab',
      brandHighlight: settings.brandHighlight || 'IT',
    },
    hero: {
      badge: settings.heroBadge || undefined,
      headlinePrefix: settings.heroHeadlinePrefix || undefined,
      headlineHighlight: settings.heroHeadlineHighlight || undefined,
      description: settings.heroDescription || undefined,
      primaryCtaLabel: settings.heroPrimaryCtaLabel || undefined,
      primaryCtaHref: settings.heroPrimaryCtaHref || undefined,
      secondaryCtaLabel: settings.heroSecondaryCtaLabel || undefined,
      secondaryCtaHref: settings.heroSecondaryCtaHref || undefined,
      imageUrl: resolveMediaUrl(settings.heroImage, settings.heroImageUrl),
      coreValues:
        settings.coreValues?.map((v) => ({
          title: v.title,
          subtitle: v.subtitle,
          accentColor: v.accentColor,
        })) ?? undefined,
      terminalCard: settings.terminalCard
        ? {
            filename: settings.terminalCard.filename,
            companyValue: settings.terminalCard.companyValue,
            focusProjects: settings.terminalCard.focusProjects,
            commentLine: settings.terminalCard.commentLine,
          }
        : undefined,
    },
    about: {
      badge: settings.aboutBadge || undefined,
      headline: settings.aboutHeadline || undefined,
      greeting: settings.aboutGreeting || undefined,
      paragraphs: settings.aboutParagraphs?.map((p) => p.text) ?? undefined,
      imageUrl: resolveMediaUrl(
        settings.aboutImage,
        settings.aboutImageUrl,
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
      ),
      logoPhilosophyTitle: settings.logoPhilosophyTitle || undefined,
      logoPhilosophyDescription: settings.logoPhilosophyDescription || undefined,
      visionTitle: settings.visionTitle || undefined,
      visionDescription: settings.visionDescription || undefined,
      missionTitle: settings.missionTitle || undefined,
      missionDescription: settings.missionDescription || undefined,
    },
    services: {
      services: services.map((s) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        icon: s.icon,
        accentColor: s.accentColor,
      })),
    },
    projects: {
      githubProfileUrl: settings.githubUrl || 'https://github.com/zhavick',
      projects: projects.map((p) => ({
        id: p.id,
        projectCode: p.projectCode,
        title: p.title,
        slug: p.slug,
        categoryLabel: p.categoryLabel,
        modalBadge: p.modalBadge,
        accentColor: p.accentColor,
        shortDesc: p.shortDesc,
        architectureSummary: p.architectureSummary,
        capabilities: p.capabilities?.map((c) => c.item) ?? [],
        techTags: p.techTags?.map((t) => t.tag) ?? [],
        coverImageUrl: resolveMediaUrl(p.coverImage, p.coverImageUrl),
        githubUrl: p.githubUrl,
        githubDisplay: p.githubDisplay,
        liveUrl: p.liveUrl,
      })),
    },
    techStack: {
      techStacks: techStacks.map((t) => ({
        id: t.id,
        code: t.code,
        title: t.title,
        description: t.description,
        accentColor: t.accentColor,
      })),
    },
    contact: {
      badge: settings.contactBadge || undefined,
      headline: settings.contactHeadline || undefined,
      description: settings.contactDescription || undefined,
      email: settings.email || undefined,
      location: settings.location || undefined,
      githubUrl: settings.githubUrl || undefined,
      githubLabel: settings.githubLabel || undefined,
      slaText: settings.slaText || undefined,
      topics: settings.consultationTopics?.map((c) => c.topic) ?? undefined,
    },
    footer: {
      brandPrefix: settings.brandPrefix || 'Maktab',
      brandHighlight: settings.brandHighlight || 'IT',
      copyrightText: settings.copyrightText || undefined,
    },
  }
}
