import type { SupabaseClient, User } from "@supabase/supabase-js"

type GoTrueUserList = {
  users?: User[]
}

function adminAuthHeaders(serviceKey: string) {
  return {
    Authorization: `Bearer ${serviceKey}`,
    apikey: serviceKey,
  }
}

/** O(1) lookup via GoTrue admin filter — avoids scanning every user with listUsers(). */
export async function findAuthUserByEmail(admin: SupabaseClient, email: string) {
  const normalized = email.trim().toLowerCase()
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL)?.trim()
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()

  if (url && serviceKey) {
    const attempts = [
      `email.eq.${normalized}`,
      `email=eq.${normalized}`,
      `email.eq."${normalized}"`,
    ]

    for (const filter of attempts) {
      const response = await fetch(
        `${url}/auth/v1/admin/users?${new URLSearchParams({
          page: "1",
          per_page: "1",
          filter,
        })}`,
        {
          headers: adminAuthHeaders(serviceKey),
          cache: "no-store",
        },
      )

      if (!response.ok) continue

      const payload = (await response.json()) as GoTrueUserList
      const match = payload.users?.find((user) => user.email?.toLowerCase() === normalized)
      if (match) return match
    }
  }

  // Fallback: first page only (legacy projects without filter support).
  const { data, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 })
  if (error) throw error
  return data.users.find((user) => user.email?.toLowerCase() === normalized) ?? null
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
