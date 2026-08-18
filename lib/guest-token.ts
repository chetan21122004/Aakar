import { GUEST_TOKEN_KEY } from "@/lib/constants"

export function getOrCreateGuestToken(): string {
  if (typeof window === "undefined") return ""
  let token = localStorage.getItem(GUEST_TOKEN_KEY)
  if (!token) {
    token = crypto.randomUUID()
    localStorage.setItem(GUEST_TOKEN_KEY, token)
  }
  return token
}

export function getGuestToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(GUEST_TOKEN_KEY)
}
