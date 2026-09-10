"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ShoppingBag, User } from "lucide-react"
import { CartDrawer } from "@/components/cart-drawer"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { useCart } from "@/contexts/cart-context"
import { contactLink, moreNavLinks, primaryNavLinks } from "@/lib/nav-links"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

function BrandLogo() {
  return (
    <Link
      href="/"
      className="relative z-10 flex shrink-0 items-center gap-2 md:gap-2.5"
      aria-label="Aakar Woodcraft home"
    >
      <Image
        src="/aakar_mark.png"
        alt=""
        width={112}
        height={112}
        priority
        className="h-8 w-8 object-contain lg:h-10 lg:w-10"
      />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[0.95rem] font-normal tracking-[-0.02em] lowercase text-[#5c3d2e] lg:text-[1.1rem]">
          aakarwood
        </span>
        <span className="mt-1 flex items-center gap-1.5 font-sans text-[0.45rem] font-medium uppercase tracking-[0.28em] text-[#6b4423] lg:text-[0.55rem]">
          <span className="h-px w-2 bg-[#6b4423]/60" aria-hidden />
          CRAFT
          <span className="h-px w-2 bg-[#6b4423]/60" aria-hidden />
        </span>
      </span>
    </Link>
  )
}

const NAV_BAR =
  "border border-[#D9C8B7]/50 bg-[#F6EFE5]/95 shadow-sm backdrop-blur-md"

const NAV_ICON =
  "relative flex h-9 w-9 items-center justify-center text-[#302A26] transition-colors hover:text-[#A86F47]"

function isActivePath(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`)
}

function navLinkClass(active: boolean) {
  return cn(
    "font-sans !text-[13px] !font-medium !normal-case !tracking-[0.02em] whitespace-nowrap transition-colors",
    active ? "text-[#1F1A17]" : "text-[#5C524A] hover:text-[#1F1A17]",
  )
}

export function Header() {
  const pathname = usePathname()
  const { itemCount } = useCart()
  const [cartOpen, setCartOpen] = useState(false)
  const moreActive = moreNavLinks.some((link) => isActivePath(pathname, link.href))

  const cartBadge = itemCount > 0 && (
    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#A86F47] px-1 font-sans text-[10px] font-bold text-[#F6EFE5]">
      {itemCount > 9 ? "9+" : itemCount}
    </span>
  )

  return (
    <>
      <header className="site-header fixed top-3 left-1/2 z-50 w-[94%] max-w-6xl -translate-x-1/2 lg:top-4 lg:w-[96%]">
        <div
          className={`site-header__bar flex items-center justify-between gap-3 rounded-full px-3 py-1.5 lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-6 lg:px-6 lg:py-2 ${NAV_BAR}`}
        >
          <BrandLogo />

          <nav
            className="hidden min-w-0 items-center justify-center gap-x-6 lg:flex xl:gap-x-8"
            aria-label="Primary"
          >
            {primaryNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={navLinkClass(isActivePath(pathname, link.href))}
              >
                {link.label}
              </Link>
            ))}

            <DropdownMenu modal={false}>
              <DropdownMenuTrigger
                className={cn(
                  navLinkClass(moreActive),
                  "inline-flex items-center gap-1 outline-none",
                )}
              >
                More
                <ChevronDown className="size-3.5 opacity-70" aria-hidden />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-[10.5rem] rounded-xl border-[#D9C8B7] bg-[#F6EFE5] p-1.5"
              >
                {moreNavLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        "cursor-pointer rounded-lg px-3 py-2 !text-[13px] !normal-case !tracking-normal",
                        isActivePath(pathname, link.href)
                          ? "font-medium text-[#1F1A17]"
                          : "text-[#5C524A]",
                      )}
                    >
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <Link
              href={contactLink.href}
              className={cn(
                "rounded-full px-3.5 py-1.5 font-sans !text-[13px] font-medium !normal-case !tracking-normal transition-colors",
                isActivePath(pathname, contactLink.href)
                  ? "bg-[#302A26] text-white"
                  : "bg-[#A86F47] text-white hover:bg-[#8F5B38]",
              )}
            >
              {contactLink.label}
            </Link>
            <button
              type="button"
              className={NAV_ICON}
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
            >
              <ShoppingBag size={20} />
              {cartBadge}
            </button>
            <Link href="/login" className={NAV_ICON} aria-label="Account">
              <User size={20} />
            </Link>
          </div>

          <Link
            href={contactLink.href}
            className="rounded-full bg-[#A86F47] px-3 py-1.5 font-sans !text-[12px] font-medium !normal-case !tracking-normal text-white lg:hidden"
          >
            Contact
          </Link>
        </div>
      </header>

      <MobileBottomNav onCartClick={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  )
}
