export const AUTH_COOKIE = "aakar-auth"
export const AUTH_ACCOUNTS_KEY = "aakar-auth-accounts"
export const AUTH_SESSION_KEY = "aakar-auth-session"
export const AUTH_SESSION_DAYS = 10

export type AuthSession = {
  email: string
  name: string
  phone?: string
  lastLogin: number
  expiresAt: number
}

export function sessionExpiryFrom(lastLogin: number) {
  return lastLogin + AUTH_SESSION_DAYS * 24 * 60 * 60 * 1000
}

export function parseAuthCookie(value: string | undefined | null): AuthSession | null {
  if (!value) return null
  try {
    const data = JSON.parse(decodeURIComponent(value)) as AuthSession
    if (!data?.email || typeof data.expiresAt !== "number" || data.expiresAt < Date.now()) {
      return null
    }
    return data
  } catch {
    return null
  }
}

export function serializeAuthCookie(session: AuthSession) {
  const maxAge = Math.max(0, Math.floor((session.expiresAt - Date.now()) / 1000))
  return `${AUTH_COOKIE}=${encodeURIComponent(JSON.stringify(session))}; Path=/; Max-Age=${maxAge}; SameSite=Lax`
}

export function clearAuthCookie() {
  return `${AUTH_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`
}
