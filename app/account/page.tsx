import { cookies } from "next/headers"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { AccountPageView } from "@/components/account/account-page-view"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { AUTH_COOKIE, parseAuthCookie } from "@/lib/auth-session"

export default async function AccountPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const cookieStore = await cookies()
  const localSession = parseAuthCookie(cookieStore.get(AUTH_COOKIE)?.value)

  if (!user && !localSession) {
    return null
  }

  const { data: profile } = user
    ? await supabase.from("profiles").select("full_name, phone").eq("id", user.id).maybeSingle()
    : { data: null }

  let orders: {
    id: string
    order_number: string
    status: string
    total_paise: number
    placed_at: string
  }[] = []

  if (user) {
    try {
      const admin = createAdminClient()
      const { data } = await admin
        .from("orders")
        .select("id, order_number, status, total_paise, placed_at")
        .eq("user_id", user.id)
        .order("placed_at", { ascending: false })
        .limit(20)
      orders = data ?? []
    } catch {
      orders = []
    }
  }

  const displayName = profile?.full_name || localSession?.name || user?.email || ""
  const email = user?.email || localSession?.email || ""
  const phone = profile?.phone || localSession?.phone

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <AccountPageView displayName={displayName} email={email} phone={phone} orders={orders} />
      <FooterSection />
    </main>
  )
}
