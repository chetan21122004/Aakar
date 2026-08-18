"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ShoppingBag, User, X } from "lucide-react"
import { CartDrawer } from "@/components/cart-drawer"
import { useCart } from "@/contexts/cart-context"
import { navLinks } from "@/lib/nav-links"

function BrandLogo() {
  return (
    <Link
      href="/"
      className="relative z-10 flex shrink-0 items-center gap-2.5 md:gap-3"
      aria-label="Aakar Woodcraft home"
    >
      <Image
        src="/aakar_mark.png"
        alt=""
        width={112}
        height={112}
        priority
        className="h-10 w-10 object-contain md:h-11 md:w-11 lg:h-12 lg:w-12"
      />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.05rem] font-normal tracking-[-0.02em] lowercase text-[#5c3d2e] md:text-[1.2rem] lg:text-[1.35rem]">
          aakarwood
        </span>
        <span className="mt-1 flex items-center gap-1.5 font-sans text-[0.55rem] font-medium uppercase tracking-[0.28em] text-[#6b4423] md:text-[0.6rem]">
          <span className="h-px w-2.5 bg-[#6b4423]/60" aria-hidden />
          CRAFT
          <span className="h-px w-2.5 bg-[#6b4423]/60" aria-hidden />
        </span>
      </span>
    </Link>
  )
}

const NAV_BAR =
  "border border-[#D9C8B7]/50 bg-[#F6EFE5]/95 shadow-sm backdrop-blur-md"

const NAV_BAR_HOME =
  "border border-[#C4B5A5] bg-[#F6EFE5] shadow-[0_8px_32px_rgba(48,42,38,0.16)] backdrop-blur-xl"

const NAV_LINK_ACTIVE =
  "font-sans text-sm xl:text-base whitespace-nowrap font-medium text-[#1F1A17] transition-colors"

const NAV_LINK =
  "font-sans text-sm xl:text-base whitespace-nowrap text-[#4A4038] transition-colors hover:text-[#1F1A17]"

const NAV_LINK_HOME_ACTIVE =
  "font-sans text-sm xl:text-base whitespace-nowrap font-semibold text-[#1F1A17] transition-colors"

const NAV_LINK_HOME =
  "font-sans text-sm xl:text-base whitespace-nowrap font-medium text-[#3D342F] transition-colors hover:text-[#1F1A17]"

const NAV_ICON =
  "relative flex h-10 w-10 items-center justify-center text-[#302A26] transition-colors hover:text-[#A86F47]"

export function Header() {
  const pathname = usePathname()
  const { itemCount } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const isHome = pathname === "/"

  const barRadius = isMenuOpen ? "rounded-t-2xl" : "rounded-full"
  const barStyle = isHome ? NAV_BAR_HOME : NAV_BAR

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const linkClass = (href: string) => {
    const isActive =
      href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)
    if (isHome) {
      return isActive ? NAV_LINK_HOME_ACTIVE : NAV_LINK_HOME
    }
    return isActive ? NAV_LINK_ACTIVE : NAV_LINK
  }

  const cartBadge = itemCount > 0 && (
    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#A86F47] px-1 font-sans text-[10px] font-bold text-[#F6EFE5]">
      {itemCount > 9 ? "9+" : itemCount}
    </span>
  )

  return (
    <>
      <header className="site-header fixed top-4 left-1/2 z-50 w-[96%] max-w-7xl -translate-x-1/2">
        <div
          className={`site-header__bar grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-2 transition-all duration-300 xl:gap-4 xl:px-5 ${barRadius} ${barStyle}`}
        >
          <BrandLogo />

          <nav className="hidden min-w-0 items-center justify-center gap-x-3 xl:flex 2xl:gap-x-5">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-1 xl:flex">
            <button
              type="button"
              className={NAV_ICON}
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
            >
              <ShoppingBag size={22} />
              {cartBadge}
            </button>
            <Link href="/login" className={NAV_ICON} aria-label="Account">
              <User size={22} />
            </Link>
          </div>

          <div className="col-start-3 flex shrink-0 items-center justify-end gap-1 xl:hidden">
            <button
              type="button"
              className={NAV_ICON}
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
            >
              <ShoppingBag size={22} />
              {cartBadge}
            </button>
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#302A26] transition-colors hover:text-[#A86F47]"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className={`max-h-[80vh] overflow-y-auto rounded-b-2xl border border-t-0 px-6 py-6 xl:hidden ${barStyle}`}>
            <nav className="flex flex-col gap-4" aria-label="Mobile">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href || pathname.startsWith(`${link.href}/`)

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`font-sans text-lg transition-colors ${
                      isActive
                        ? "font-medium text-[#302A26]"
                        : "text-[#6B5E54] hover:text-[#302A26]"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <Link
                href="/login"
                className="font-sans text-lg text-[#6B5E54] transition-colors hover:text-[#302A26]"
                onClick={() => setIsMenuOpen(false)}
              >
                Account
              </Link>
            </nav>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  )
}
