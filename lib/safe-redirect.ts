export function safeNextPath(value: string | null, fallback = "/account") {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("://")) {
    return fallback
  }
  return value
}
