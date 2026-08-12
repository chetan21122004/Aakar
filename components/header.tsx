"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ShoppingBag, User, X } from "lucide-react"
import { CartDrawer } from "@/components/cart-drawer"
import { useCart } from "@/contexts/cart-context"
import { navLinks } from "@/lib/nav-links"

const SCROLL_THRESHOLD = 60

function BrandLogo({ solid }: { solid: boolean }) {
  const nameColor = solid ? "text-[#5c3d2e]" : "text-[#d4b896]"
  const craftColor = solid ? "text-[#6b4423]" : "text-[#c4a574]"

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
        className={`h-10 w-10 object-contain md:h-11 md:w-11 lg:h-12 lg:w-12 ${
          solid ? "" : "drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]"
        }`}
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-serif text-[1.05rem] font-normal tracking-[-0.02em] lowercase md:text-[1.2rem] lg:text-[1.35rem] ${nameColor}`}
        >
          aakarwood
        </span>
        <span
          className={`mt-1 flex items-center gap-1.5 font-sans text-[0.55rem] font-medium uppercase tracking-[0.28em] md:text-[0.6rem] ${craftColor}`}
        >
          <span className={`h-px w-2.5 ${solid ? "bg-[#6b4423]/60" : "bg-[#c4a574]/70"}`} aria-hidden />
          CRAFT
          <span className={`h-px w-2.5 ${solid ? "bg-[#6b4423]/60" : "bg-[#c4a574]/70"}`} aria-hidden />
        </span>
      </span>
    </Link>
  )
}

export function Header() {
  const pathname = usePathname()
  const { itemCount } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isHome = pathname === "/"
  const solid = !isHome || scrolled
  const barRadius = isMenuOpen ? "rounded-t-2xl" : "rounded-full"

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isHome) {
      setScrolled(true)
      return
    }
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [isHome])

  const linkClass = (href: string) => {
    const isActive =
      href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)
    if (solid) {
      return isActive
        ? "font-sans text-sm xl:text-base whitespace-nowrap text-foreground transition-colors"
        : "font-sans text-sm xl:text-base whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
    }
    return isActive
      ? "font-sans text-sm xl:text-base whitespace-nowrap text-white transition-colors"
      : "font-sans text-sm xl:text-base whitespace-nowrap text-white/85 transition-colors hover:text-white"
  }

  const iconBtnClass = solid
    ? "relative flex h-10 w-10 items-center justify-center text-foreground transition-colors hover:text-primary"
    : "relative flex h-10 w-10 items-center justify-center text-white/90 transition-colors hover:text-white"

  const cartBadge = itemCount > 0 && (
    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 font-sans text-[10px] font-bold text-accent-foreground">
      {itemCount > 9 ? "9+" : itemCount}
    </span>
  )

  // Homepage at top: full-bleed, no border, logo + links + cart/profile
  if (isHome && !scrolled) {
    return (
      <>
        <header className="fixed inset-x-0 top-0 z-50 border-0 bg-transparent shadow-none">
          <div className="relative flex items-center gap-3 px-5 py-4 md:px-8 lg:px-10 lg:py-5">
            <BrandLogo solid={false} />

            <nav
              className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-x-5 xl:flex 2xl:gap-x-7"
              aria-label="Primary"
            >
              {navLinks.map((link) => (
                <Link key={link.label} href={link.href} className={linkClass(link.href)}>
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="ml-auto flex shrink-0 items-center gap-0.5">
              <button
                type="button"
                className={`${iconBtnClass} hidden sm:flex`}
                onClick={() => setCartOpen(true)}
                aria-label="Open cart"
              >
                <ShoppingBag size={22} />
                {cartBadge}
              </button>
              <Link href="/login" className={`${iconBtnClass} hidden sm:flex`} aria-label="Account">
                <User size={22} />
              </Link>
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex h-10 w-10 items-center justify-center text-white transition-colors xl:hidden"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="mx-5 mb-4 max-h-[80vh] overflow-y-auto border border-white/15 bg-black/55 px-6 py-6 backdrop-blur-md xl:hidden">
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
                        isActive ? "font-medium text-white" : "text-white/80 hover:text-white"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                })}
                <Link
                  href="/login"
                  className="font-sans text-lg text-white/80 transition-colors hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Account
                </Link>
                <button
                  type="button"
                  className="text-left font-sans text-lg text-white/80 transition-colors hover:text-white"
                  onClick={() => {
                    setIsMenuOpen(false)
                    setCartOpen(true)
                  }}
                >
                  Cart{itemCount > 0 ? ` (${itemCount})` : ""}
                </button>
              </nav>
            </div>
          )}
        </header>

        <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
      </>
    )
  }

  return (
    <>
      <header className="fixed top-4 left-1/2 z-50 w-[96%] max-w-7xl -translate-x-1/2">
        <div
          className={`grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-2 transition-all duration-300 xl:gap-4 xl:px-5 ${barRadius} border border-border/50 bg-background/95 shadow-sm backdrop-blur-md`}
        >
          <BrandLogo solid />

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
              className={iconBtnClass}
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
            >
              <ShoppingBag size={22} />
              {cartBadge}
            </button>
            <Link href="/login" className={iconBtnClass} aria-label="Account">
              <User size={22} />
            </Link>
          </div>

          <div className="col-start-3 flex shrink-0 items-center justify-end gap-1 xl:hidden">
            <button
              type="button"
              className={iconBtnClass}
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
            >
              <ShoppingBag size={22} />
              {cartBadge}
            </button>
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="max-h-[80vh] overflow-y-auto rounded-b-2xl border border-t-0 border-border/50 bg-background/95 px-6 py-6 shadow-sm backdrop-blur-md xl:hidden">
            <nav className="flex flex-col gap-4">
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
                        ? "font-medium text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <Link
                href="/login"
                className="font-sans text-lg text-muted-foreground transition-colors hover:text-foreground"
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
