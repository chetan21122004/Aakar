import {
  AUTH_ACCOUNTS_KEY,
  AUTH_SESSION_KEY,
  clearAuthCookie,
  parseAuthCookie,
  serializeAuthCookie,
  sessionExpiryFrom,
  type AuthSession,
} from "@/lib/auth-session"

type StoredAccount = {
  email: string
  name: string
  phone: string
  passwordHash: string
}

async function hashPassword(email: string, password: string) {
  const payload = new TextEncoder().encode(`${email.trim().toLowerCase()}:${password}`)
  const digest = await crypto.subtle.digest("SHA-256", payload)
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
}

function readAccounts(): StoredAccount[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(AUTH_ACCOUNTS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as StoredAccount[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeAccounts(accounts: StoredAccount[]) {
  localStorage.setItem(AUTH_ACCOUNTS_KEY, JSON.stringify(accounts))
}

function writeSession(session: AuthSession) {
  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session))
  document.cookie = serializeAuthCookie(session)
}

export function readLocalSession(): AuthSession | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(AUTH_SESSION_KEY)
    if (raw) {
      const data = JSON.parse(raw) as AuthSession
      if (data.email && data.expiresAt > Date.now()) return data
    }
  } catch {
    /* ignore */
  }
  const cookieValue = document.cookie
    .split("; ")
    .find((part) => part.startsWith("aakar-auth="))
    ?.slice("aakar-auth=".length)
  const fromCookie = parseAuthCookie(cookieValue)
  if (fromCookie) return fromCookie
  clearLocalSession()
  return null
}

export function clearLocalSession() {
  if (typeof window === "undefined") return
  localStorage.removeItem(AUTH_SESSION_KEY)
  document.cookie = clearAuthCookie()
}

function startSession(account: Pick<StoredAccount, "email" | "name" | "phone">): AuthSession {
  const lastLogin = Date.now()
  const session: AuthSession = {
    email: account.email,
    name: account.name,
    phone: account.phone,
    lastLogin,
    expiresAt: sessionExpiryFrom(lastLogin),
  }
  writeSession(session)
  return session
}

export function persistCloudSession(input: { email: string; name?: string; phone?: string }) {
  return startSession({
    email: input.email.trim().toLowerCase(),
    name: input.name?.trim() || input.email,
    phone: input.phone?.trim() || "",
  })
}

export async function registerLocalAccount(input: {
  name: string
  email: string
  phone: string
  password: string
}) {
  const email = input.email.trim().toLowerCase()
  const accounts = readAccounts()
  if (accounts.some((account) => account.email === email)) {
    throw new Error("An account with this email already exists.")
  }
  const passwordHash = await hashPassword(email, input.password)
  const account: StoredAccount = {
    email,
    name: input.name.trim(),
    phone: input.phone.trim(),
    passwordHash,
  }
  writeAccounts([...accounts, account])
  return startSession(account)
}

export async function verifyLocalLogin(email: string, password: string) {
  const normalized = email.trim().toLowerCase()
  const accounts = readAccounts()
  const account = accounts.find((item) => item.email === normalized)
  if (!account) throw new Error("No account found for this email.")
  const passwordHash = await hashPassword(normalized, password)
  if (passwordHash !== account.passwordHash) throw new Error("Incorrect email or password.")
  return startSession(account)
}

export async function rememberVerifiedLogin(input: {
  email: string
  name?: string
  phone?: string
  password: string
}) {
  const email = input.email.trim().toLowerCase()
  const accounts = readAccounts()
  const passwordHash = await hashPassword(email, input.password)
  const existing = accounts.find((account) => account.email === email)
  const account: StoredAccount = {
    email,
    name: input.name?.trim() || existing?.name || email,
    phone: input.phone?.trim() || existing?.phone || "",
    passwordHash,
  }
  writeAccounts(existing ? accounts.map((item) => (item.email === email ? account : item)) : [...accounts, account])
  return startSession(account)
}
