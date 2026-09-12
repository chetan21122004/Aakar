import type { SupabaseClient } from "@supabase/supabase-js"

export async function findAuthUserByEmail(admin: SupabaseClient, email: string) {
  const normalized = email.trim().toLowerCase()
  for (let page = 1; page <= 20; page += 1) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 200 })
    if (error) throw error
    const match = data.users.find((user) => user.email?.toLowerCase() === normalized)
    if (match) return match
    if (data.users.length < 200) break
  }
  return null
}

export async function confirmAuthUserEmail(admin: SupabaseClient, email: string) {
  const user = await findAuthUserByEmail(admin, email)
  if (!user) return null
  if (!user.email_confirmed_at) {
    const { error } = await admin.auth.admin.updateUserById(user.id, { email_confirm: true })
    if (error) throw error
  }
  return user
}
