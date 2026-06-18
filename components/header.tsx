"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, MessageCircle, ShoppingBag, User, X } from "lucide-react"
import { CartDrawer } from "@/components/cart-drawer"
import { useCart } from "@/contexts/cart-context"
import { contactInfo } from "@/lib/data"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

export function Header() {
  const pathname = usePathname()
  const { itemCount } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const isHomeHero = pathname === "/" && !isScrolled

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const iconBtnClass = `relative flex h-9 w-9 items-center justify-center transition-colors ${
    isHomeHero ? "text-white hover:text-white/80" : "text-foreground hover:text-primary"
  }`

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl transition-all duration-300 ${isScrolled ? "bg-background/90 backdrop-blur-md rounded-full" : "bg-transparent"}`}
        style={{
          boxShadow: isScrolled
            ? "rgba(23, 63, 53, 0.06) 0px 0px 0px 1px, rgba(23, 63, 53, 0.06) 0px 1px 1px -0.5px, rgba(23, 63, 53, 0.06) 0px 3px 3px -1.5px, rgba(23, 63, 53, 0.06) 0px 6px 6px -3px, rgba(23, 63, 53, 0.06) 0px 12px 12px -6px"
            : "none",
        }}
      >
        <div className="flex items-center justify-between transition-all duration-300 px-2 pl-5 py-2">
          <Link
            href="/"
            className={`font-serif text-lg font-semibold tracking-tight transition-colors duration-300 whitespace-nowrap ${isHomeHero ? "text-white" : "text-foreground"}`}
          >
            Aakar Woodcraft
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`font-sans text-sm transition-colors ${isHomeHero ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-1 lg:flex">
            <button type="button" className={iconBtnClass} onClick={() => setCartOpen(true)} aria-label="Open cart">
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 font-sans text-[10px] font-bold text-accent-foreground">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>
            <Link href="/login" className={iconBtnClass} aria-label="Account">
              <User size={20} />
            </Link>
            <Link
              href={`https://wa.me/${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`ml-1 flex items-center gap-1.5 px-3 py-1.5 font-sans text-xs font-medium transition-all border ${
                isHomeHero ? "border-white/30 text-white/80 hover:text-white" : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              <MessageCircle size={14} />
              WhatsApp
            </Link>
            <Link
              href="/shop"
              className={`ml-1 px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wide transition-all ${
                isHomeHero ? "bg-white text-foreground hover:bg-white/90" : "bg-foreground text-background hover:opacity-80"
              }`}
            >
              Shop Now
            </Link>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <button type="button" className={iconBtnClass} onClick={() => setCartOpen(true)} aria-label="Open cart">
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 font-sans text-[10px] font-bold text-accent-foreground">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`transition-colors ${isHomeHero ? "text-white" : "text-foreground"}`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-t border-border bg-background px-6 py-8 lg:hidden rounded-b-none max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-sans text-lg text-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/login" className="font-sans text-lg text-foreground" onClick={() => setIsMenuOpen(false)}>
                Account
              </Link>
              <Link href="/shop" className="btn-primary mt-2 text-center" onClick={() => setIsMenuOpen(false)}>
                Shop Now
              </Link>
              <Link
                href={`https://wa.me/${contactInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-border px-5 py-3 text-center font-sans text-sm text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageCircle size={16} />
                WhatsApp
              </Link>
            </nav>
          </div>
        )}
      </header>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  )
}
