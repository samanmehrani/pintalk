import { redirect } from 'next/navigation'

import { AdminRole } from '@prisma/client'

import { getAdminFromCookies } from '@/api/admin/session'
import { hasRequiredRole } from '@/api/admin/rbac'

export async function requireAdminPage(access: AdminRole[] = []) {
  const admin = await getAdminFromCookies()
  if (!admin) {
    redirect('/admin/login')
  }
  if (access.length && !hasRequiredRole(admin.role, access)) {
    redirect('/admin/login')
  }
  return admin
}

export async function getOptionalAdmin() {
  return getAdminFromCookies()
}
