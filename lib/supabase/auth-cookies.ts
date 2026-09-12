import { AUTH_SESSION_DAYS } from "@/lib/auth-session"

export const supabaseAuthCookieOptions = {
  path: "/",
  sameSite: "lax" as const,
  maxAge: AUTH_SESSION_DAYS * 24 * 60 * 60,
}
