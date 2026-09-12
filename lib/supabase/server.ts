import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { supabaseAuthCookieOptions } from "@/lib/supabase/auth-cookies"

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!.trim(),
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!.trim(),
    {
      cookieOptions: supabaseAuthCookieOptions,
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, { ...supabaseAuthCookieOptions, ...options })
            )
          } catch {
            // Called from Server Component; middleware will refresh session.
          }
        },
      },
    }
  )
}
