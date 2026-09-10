export const SHIPPING_PAISE = 0
export const FREE_SHIPPING_THRESHOLD_PAISE = 100
export const CART_STORAGE_KEY = "aakar-cart"
export const ORDER_STORAGE_KEY = "aakar-last-order"
export const GUEST_TOKEN_KEY = "aakar-guest-token"
export const SEE_IN_ROOM_DRAFT_KEY = "aakar-see-in-room-draft"
export const ROOM_PREVIEW_DAILY_LIMIT = 5

export function isLocalhostHost(host: string | null | undefined) {
  if (process.env.VERCEL === "1") return false
  const hostname = (host ?? "").split(",")[0]?.trim().split(":")[0]?.toLowerCase() ?? ""
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "0.0.0.0" || hostname === "[::1]" || hostname === "::1"
}
