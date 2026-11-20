import type { Access, FieldAccess } from 'payload'

export type UserRole = 'super-admin' | 'editor' | 'author'

type UserWithRole = {
  id: number | string
  role?: UserRole | null
}

const getUser = (user: unknown): UserWithRole | null => {
  if (!user || typeof user !== 'object') return null
  return user as UserWithRole
}

export const publicRead: Access = () => true

export const isAuthenticated: Access = ({ req: { user } }) => Boolean(user)

export const isSuperAdmin: Access = ({ req: { user } }) => {
  const u = getUser(user)
  return u?.role === 'super-admin'
}

export const isAdminOrEditor: Access = ({ req: { user } }) => {
  const u = getUser(user)
  return u?.role === 'super-admin' || u?.role === 'editor'
}

export const isSuperAdminOrSelf: Access = ({ req: { user } }) => {
  const u = getUser(user)
  if (!u) return false
  if (u.role === 'super-admin') return true

  return {
    id: {
      equals: u.id,
    },
  }
}

export const isSuperAdminFieldLevel: FieldAccess = ({ req: { user } }) => {
  const u = getUser(user)
  return u?.role === 'super-admin'
}
