import { revalidatePath } from 'next/cache'
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'

function safeRevalidate(paths: string[]) {
  try {
    for (const p of paths) {
      revalidatePath(p)
    }
  } catch {
    // Abaikan jika dipanggil dari CLI (misal: npm run seed) di luar konteks Next.js Server
  }
}

export const revalidateGlobalHook: GlobalAfterChangeHook = ({ doc }) => {
  safeRevalidate(['/', '/blog'])
  return doc
}

export const revalidateCollectionChangeHook: CollectionAfterChangeHook = ({ doc }) => {
  const paths = ['/', '/blog']
  if (doc && typeof doc === 'object' && 'slug' in doc && typeof doc.slug === 'string') {
    paths.push(`/blog/${doc.slug}`)
  }
  safeRevalidate(paths)
  return doc
}

export const revalidateCollectionDeleteHook: CollectionAfterDeleteHook = ({ doc }) => {
  const paths = ['/', '/blog']
  if (doc && typeof doc === 'object' && 'slug' in doc && typeof doc.slug === 'string') {
    paths.push(`/blog/${doc.slug}`)
  }
  safeRevalidate(paths)
  return doc
}
