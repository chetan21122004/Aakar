"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
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
  const barRadius = isMenuOpen ? "rounded-t-2xl" : "rounded-full"

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const linkClass = (href: string) => {
    const isActive =
      href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)
    return isActive
      ? "font-sans text-xs xl:text-sm whitespace-nowrap text-foreground transition-colors"
      : "font-sans text-xs xl:text-sm whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground"
  }

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[96%] max-w-7xl -translate-x-1/2">
      <div
        className={`grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-2 transition-all duration-300 xl:gap-4 xl:px-5 ${barRadius} border border-border/50 bg-background/95 shadow-sm backdrop-blur-md`}
      >
        <Link
          href="/"
          className="shrink-0 font-serif text-base font-semibold tracking-tight text-foreground transition-colors duration-300 whitespace-nowrap xl:text-lg"
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
            className="ml-1 flex items-center gap-1.5 border border-border px-2.5 py-1.5 font-sans text-xs font-medium text-muted-foreground transition-all hover:text-foreground xl:px-3"
          >
            <WhatsAppIcon size={14} />
            <span className="hidden 2xl:inline">WhatsApp</span>
          </Link>
          <Link
            href="/contact"
            className="ml-1 bg-foreground px-3 py-2 font-sans text-xs font-semibold uppercase tracking-wide text-background transition-all hover:opacity-80 xl:px-4"
          >
            Enquire
          </Link>
        </div>

        <div className="col-start-3 flex shrink-0 items-center justify-end gap-1 xl:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-foreground transition-colors"
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
              <WhatsAppIcon size={16} />
              WhatsApp
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
