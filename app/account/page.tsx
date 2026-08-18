import Link from "next/link"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { formatINR } from "@/lib/format"
import { SignOutButton } from "@/components/sign-out-button"

export default async function AccountPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone")
    .eq("id", user.id)
    .maybeSingle()

  let orders: {
    id: string
    order_number: string
    status: string
    total_paise: number
    placed_at: string
  }[] = []

  try {
    const admin = createAdminClient()
    const { data } = await admin
      .from("orders")
      .select("id, order_number, status, total_paise, placed_at")
      .eq("user_id", user.id)
      .order("placed_at", { ascending: false })
      .limit(10)
    orders = data ?? []
  } catch {
    orders = []
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start justify-between gap-4 mb-10">
            <div>
              <h1 className="type-h1 mb-2">My Account</h1>
              <p className="type-body">{profile?.full_name || user.email}</p>
            </div>
            <SignOutButton />
          </div>

          <div className="border border-border bg-card p-6 mb-8">
            <h2 className="type-h3 text-lg mb-4">Profile</h2>
            <dl className="space-y-2 font-sans text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Email</dt>
                <dd>{user.email}</dd>
              </div>
              {profile?.phone && (
                <div className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">Phone</dt>
                  <dd>{profile.phone}</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="border border-border bg-card p-6">
            <h2 className="type-h3 text-lg mb-4">Order History</h2>
            {orders.length === 0 ? (
              <p className="font-sans text-sm text-muted-foreground mb-4">
                No orders yet.{" "}
                <Link href="/shop" className="text-foreground underline">
                  Start shopping
                </Link>
              </p>
            ) : (
              <ul className="divide-y divide-border">
                {orders.map((order) => (
                  <li key={order.id} className="py-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-sans text-sm font-medium">{order.order_number}</p>
                      <p className="font-sans text-xs text-muted-foreground capitalize">
                        {order.status.replace("_", " ")} · {new Date(order.placed_at).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-sans text-sm font-medium">{formatINR(order.total_paise)}</p>
                      <Link
                        href={`/order-confirmation?orderId=${order.id}`}
                        className="font-sans text-xs text-muted-foreground hover:text-foreground"
                      >
                        View
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
      <FooterSection />
    </main>
  )
}
