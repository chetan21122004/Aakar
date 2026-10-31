import Link from "next/link"
import {
  ChevronRight,
  HelpCircle,
  LayoutGrid,
  Package,
  ScanLine,
  ShoppingBag,
  UserRound,
} from "lucide-react"
import { SignOutButton } from "@/components/sign-out-button"
import { OrderStatusBadge } from "@/components/account/order-status-badge"
import { formatINR } from "@/lib/format"
import { cn } from "@/lib/utils"

export type AccountOrder = {
  id: string
  order_number: string
  status: string
  total_paise: number
  placed_at: string
}

type AccountPageViewProps = {
  displayName: string
  email: string
  phone?: string | null
  orders: AccountOrder[]
}

const SIDEBAR_LINKS = [
  { href: "#overview", label: "Overview", icon: LayoutGrid },
  { href: "#orders", label: "Your orders", icon: Package },
  { href: "#profile", label: "Login & profile", icon: UserRound },
  { href: "#help", label: "Help & contact", icon: HelpCircle },
] as const

function firstName(full: string) {
  const part = full.trim().split(/\s+/)[0]
  return part || "there"
}

function QuickLinkCard({
  href,
  title,
  description,
  icon: Icon,
  cta,
}: {
  href: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string; size?: number }>
  cta: string
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col border border-border bg-background p-5 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="font-sans text-sm font-semibold text-foreground">{title}</h3>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-muted text-primary">
          <Icon size={18} strokeWidth={1.75} />
        </span>
      </div>
      <p className="mb-4 flex-1 font-sans text-xs leading-relaxed text-muted-foreground">{description}</p>
      <span className="inline-flex items-center gap-1 font-sans text-xs font-medium text-primary group-hover:underline">
        {cta}
        <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  )
}

export function AccountPageView({ displayName, email, phone, orders }: AccountPageViewProps) {
  const greeting = firstName(displayName)
  const orderCount = orders.length
  const latestOrder = orders[0]

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-[#E8E0D6]/60">
      <div className="border-b border-border bg-background/90">
        <div className="mx-auto max-w-6xl px-4 py-3 md:px-8">
          <nav className="font-sans text-xs text-muted-foreground" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-foreground hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-border">
                ›
              </li>
              <li className="font-medium text-foreground">Your account</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-10">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-sans text-sm text-muted-foreground">Account</p>
            <h1 className="type-h1 text-2xl md:text-3xl">
              Hello, <span className="text-primary">{greeting}</span>
            </h1>
            <p className="mt-2 max-w-xl font-sans text-sm text-muted-foreground">
              Manage orders, profile details, and shortcuts to shop Aakar Woodcraft.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/shop" className="btn-primary px-5 py-2.5 text-sm">
              Continue shopping
            </Link>
            <SignOutButton variant="outline" />
          </div>
        </header>

        <nav
          className="mb-6 flex gap-2 overflow-x-auto pb-1 lg:hidden"
          aria-label="Account sections"
        >
          {SIDEBAR_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="shrink-0 border border-border bg-background px-3 py-2 font-sans text-xs font-medium shadow-sm hover:bg-muted"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <nav
              className="sticky top-28 border border-border bg-background p-2 shadow-sm"
              aria-label="Account sections"
            >
              <p className="px-3 py-2 font-sans text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Your account
              </p>
              <ul className="space-y-0.5">
                {SIDEBAR_LINKS.map(({ href, label, icon: Icon }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="flex items-center gap-2.5 px-3 py-2.5 font-sans text-sm text-foreground transition-colors hover:bg-muted hover:text-primary"
                    >
                      <Icon size={16} className="shrink-0 text-muted-foreground" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="space-y-8">
            <section id="overview" className="scroll-mt-28">
              <h2 className="mb-4 font-sans text-lg font-semibold text-foreground">Quick links</h2>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <QuickLinkCard
                  href="#orders"
                  title="Your orders"
                  description={
                    orderCount > 0 && latestOrder
                      ? `Latest: ${latestOrder.order_number} · ${formatINR(latestOrder.total_paise)}`
                      : "Track packages, view order details, and buy again."
                  }
                  icon={Package}
                  cta={orderCount > 0 ? `View all (${orderCount})` : "View orders"}
                />
                <QuickLinkCard
                  href="#profile"
                  title="Login & profile"
                  description={`Signed in as ${email}. Update contact info when profile editing is available.`}
                  icon={UserRound}
                  cta="View profile"
                />
                <QuickLinkCard
                  href="/cart"
                  title="Shopping cart"
                  description="Review items, shipping, and proceed to checkout."
                  icon={ShoppingBag}
                  cta="Go to cart"
                />
                <QuickLinkCard
                  href="/see-in-your-room"
                  title="See in your room"
                  description="Preview furniture in your space with AI placement."
                  icon={ScanLine}
                  cta="Open tool"
                />
                <QuickLinkCard
                  href="/shop"
                  title="Shop furniture"
                  description="Browse beds, consoles, and collections for Indian homes."
                  icon={LayoutGrid}
                  cta="Browse shop"
                />
                <QuickLinkCard
                  href="/contact"
                  title="Customer service"
                  description="Questions about orders, delivery, or custom work — we’re here to help."
                  icon={HelpCircle}
                  cta="Contact us"
                />
              </div>
            </section>

            <section id="orders" className="scroll-mt-28">
              <div className="border border-border bg-background shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 md:px-6">
                  <div>
                    <h2 className="font-sans text-lg font-semibold">Your orders</h2>
                    <p className="font-sans text-xs text-muted-foreground">
                      {orderCount > 0
                        ? `${orderCount} recent order${orderCount === 1 ? "" : "s"}`
                        : "Orders appear here after checkout"}
                    </p>
                  </div>
                  {orderCount > 0 && (
                    <Link
                      href="/shop"
                      className="font-sans text-sm font-medium text-primary hover:underline"
                    >
                      Buy again
                    </Link>
                  )}
                </div>

                {orders.length === 0 ? (
                  <div className="flex flex-col items-center px-6 py-14 text-center">
                    <Package size={40} className="mb-4 text-muted-foreground" strokeWidth={1.25} />
                    <p className="font-sans text-base font-medium">No orders yet</p>
                    <p className="mt-1 max-w-sm font-sans text-sm text-muted-foreground">
                      When you place an order, it will show up here with status and tracking details.
                    </p>
                    <Link href="/shop" className="btn-primary mt-6 px-6 py-2.5 text-sm">
                      Start shopping
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] border-collapse font-sans text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                          <th className="px-5 py-3 font-semibold md:px-6">Order</th>
                          <th className="px-4 py-3 font-semibold">Placed</th>
                          <th className="px-4 py-3 font-semibold">Total</th>
                          <th className="px-4 py-3 font-semibold">Status</th>
                          <th className="px-5 py-3 text-right font-semibold md:px-6">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {orders.map((order) => (
                          <tr key={order.id} className="hover:bg-muted/20">
                            <td className="px-5 py-4 md:px-6">
                              <p className="font-medium tabular-nums">{order.order_number}</p>
                              <p className="mt-0.5 text-xs text-muted-foreground">Order ID · {order.id.slice(0, 8)}…</p>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-muted-foreground">
                              {new Date(order.placed_at).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </td>
                            <td className="px-4 py-4 font-medium tabular-nums">{formatINR(order.total_paise)}</td>
                            <td className="px-4 py-4">
                              <OrderStatusBadge status={order.status} />
                            </td>
                            <td className="px-5 py-4 text-right md:px-6">
                              <Link
                                href={`/order-confirmation?orderId=${order.id}`}
                                className={cn(
                                  "inline-flex items-center gap-1 font-medium text-primary hover:underline",
                                )}
                              >
                                View details
                                <ChevronRight size={14} />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>

            <section id="profile" className="scroll-mt-28">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="border border-border bg-background p-6 shadow-sm">
                  <h2 className="mb-1 font-sans text-lg font-semibold">Login & security</h2>
                  <p className="mb-5 font-sans text-xs text-muted-foreground">
                    Credentials used to sign in across devices.
                  </p>
                  <dl className="space-y-4 font-sans text-sm">
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Email</dt>
                      <dd className="mt-1 break-all font-medium">{email}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Password</dt>
                      <dd className="mt-1 text-muted-foreground">••••••••</dd>
                    </div>
                  </dl>
                  <p className="mt-5 font-sans text-xs text-muted-foreground">
                    To change your password, use{" "}
                    <Link href="/login" className="text-primary hover:underline">
                      forgot password
                    </Link>{" "}
                    on the sign-in page when that flow is enabled.
                  </p>
                </div>

                <div className="border border-border bg-background p-6 shadow-sm">
                  <h2 className="mb-1 font-sans text-lg font-semibold">Contact information</h2>
                  <p className="mb-5 font-sans text-xs text-muted-foreground">
                    Used for order updates and delivery coordination.
                  </p>
                  <dl className="space-y-4 font-sans text-sm">
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Name</dt>
                      <dd className="mt-1 font-medium">{displayName || "—"}</dd>
                    </div>
                    {phone ? (
                      <div>
                        <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Phone</dt>
                        <dd className="mt-1 font-medium tabular-nums">{phone}</dd>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Add a phone number at checkout for SMS updates.</p>
                    )}
                  </dl>
                </div>
              </div>
            </section>

            <section id="help" className="scroll-mt-28">
              <div className="border border-border bg-background p-6 shadow-sm md:p-8">
                <h2 className="font-sans text-lg font-semibold">Need help?</h2>
                <p className="mt-2 max-w-2xl font-sans text-sm text-muted-foreground">
                  For delivery, returns, or custom furniture enquiries, reach out — typical response within one business
                  day.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/contact" className="btn-primary px-5 py-2.5 text-sm">
                    Contact support
                  </Link>
                  <Link
                    href="/faq"
                    className="inline-flex items-center justify-center border border-border bg-background px-5 py-2.5 font-sans text-sm font-medium transition-colors hover:bg-muted"
                  >
                    Read FAQ
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
