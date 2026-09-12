"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, LayoutGrid, Library, ShoppingBag, User } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { cn } from "@/lib/utils"

const items = [
  { href: "/", label: "Home", icon: Home, match: "exact" as const },
  { href: "/shop", label: "Shop", icon: LayoutGrid, match: "prefix" as const },
  { href: "/collections", label: "Collections", icon: Library, match: "prefix" as const },
  { href: "/cart", label: "Cart", icon: ShoppingBag, match: "prefix" as const },
  { href: "/account", label: "Account", icon: User, match: "prefix" as const },
]

export function MobileBottomNav({ onCartClick }: { onCartClick: () => void }) {
  const pathname = usePathname()
  const { itemCount } = useCart()

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#E7E0D8] bg-[#F6EFE5]/95 px-2 pt-1.5 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      aria-label="Mobile"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5">
        {items.map((item) => {
          const active =
            item.href === "/account"
              ? pathname.startsWith("/login") || pathname.startsWith("/account") || pathname.startsWith("/signup")
              : item.match === "exact"
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`)
          const Icon = item.icon
          const isCart = item.href === "/cart"

          if (isCart) {
            return (
              <li key={item.href}>
                <button
                  type="button"
                  onClick={onCartClick}
                  className={cn(
                    "relative flex w-full flex-col items-center gap-0.5 py-1.5 font-sans !text-[10px] font-medium !normal-case !tracking-normal",
                    active ? "text-[#A86F47]" : "text-[#6B5E54]",
                  )}
                >
                  <span className="relative">
                    <Icon size={22} strokeWidth={1.7} />
                    {itemCount > 0 && (
                      <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#A86F47] px-1 font-sans text-[9px] font-bold text-white">
                        {itemCount > 9 ? "9+" : itemCount}
                      </span>
                    )}
                  </span>
                  {item.label}
                </button>
              </li>
            )
          }

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-1.5 font-sans !text-[10px] font-medium !normal-case !tracking-normal",
                  active ? "text-[#A86F47]" : "text-[#6B5E54]",
                )}
              >
                <Icon size={22} strokeWidth={1.7} />
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
