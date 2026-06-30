"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, MessageCircle, X } from "lucide-react"
import { contactInfo } from "@/lib/data"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "The Console", href: "/the-console" },
  { label: "Craft & Materials", href: "/craft-materials" },
  { label: "For Architects", href: "/for-architects" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
]

export function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const isHomeHero = pathname === "/" && !isScrolled

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const showBarBackground = isScrolled || isMenuOpen || pathname !== "/"
  const useLightNav = isHomeHero && !showBarBackground
  const barRadius = isMenuOpen ? "rounded-t-2xl" : "rounded-full"

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const linkClass = (href: string) => {
    const isActive =
      href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)
    if (useLightNav) {
      return isActive
        ? "font-sans text-xs xl:text-sm whitespace-nowrap text-white transition-colors"
        : "font-sans text-xs xl:text-sm whitespace-nowrap text-white/70 transition-colors hover:text-white"
    }
    return isActive
      ? "font-sans text-xs xl:text-sm whitespace-nowrap text-foreground transition-colors"
      : "font-sans text-xs xl:text-sm whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
  }

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[96%] max-w-7xl -translate-x-1/2">
      <div
        className={`grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-2 transition-all duration-300 xl:gap-4 xl:px-5 ${
          showBarBackground ? `${barRadius} border border-border/50 bg-background/95 shadow-sm backdrop-blur-md` : ""
        }`}
      >
        <Link
          href="/"
          className={`shrink-0 font-serif text-base font-semibold tracking-tight transition-colors duration-300 whitespace-nowrap xl:text-lg ${
            useLightNav ? "text-white" : "text-foreground"
          }`}
        >
          Aakar Woodcraft
        </Link>

        <nav className="hidden min-w-0 items-center justify-center gap-x-3 xl:flex 2xl:gap-x-4">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-1 xl:flex">
          <Link
            href={`https://wa.me/${contactInfo.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`ml-1 flex items-center gap-1.5 border px-2.5 py-1.5 font-sans text-xs font-medium transition-all xl:px-3 ${
              useLightNav
                ? "border-white/30 text-white/80 hover:text-white"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            <MessageCircle size={14} />
            <span className="hidden 2xl:inline">WhatsApp</span>
          </Link>
          <Link
            href="/contact"
            className={`ml-1 px-3 py-2 font-sans text-xs font-semibold uppercase tracking-wide transition-all xl:px-4 ${
              useLightNav
                ? "bg-white text-foreground hover:bg-white/90"
                : "bg-foreground text-background hover:opacity-80"
            }`}
          >
            Enquire
          </Link>
        </div>

        <div className="col-start-3 flex shrink-0 items-center justify-end gap-1 xl:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`transition-colors ${useLightNav ? "text-white" : "text-foreground"}`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
                  className={`font-sans text-base transition-colors ${
                    isActive ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            })}
            <Link href="/contact" className="btn-primary mt-2 text-center" onClick={() => setIsMenuOpen(false)}>
              Enquire
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
  )
}
