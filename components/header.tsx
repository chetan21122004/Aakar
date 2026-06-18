"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, MessageCircle } from "lucide-react";
import { contactInfo } from "@/lib/data";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Collections", href: "/collections" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl transition-all duration-300 ${isScrolled ? "bg-background/90 backdrop-blur-md rounded-full" : "bg-transparent"}`}
      style={{
        boxShadow: isScrolled ? "rgba(23, 63, 53, 0.06) 0px 0px 0px 1px, rgba(23, 63, 53, 0.06) 0px 1px 1px -0.5px, rgba(23, 63, 53, 0.06) 0px 3px 3px -1.5px, rgba(23, 63, 53, 0.06) 0px 6px 6px -3px, rgba(23, 63, 53, 0.06) 0px 12px 12px -6px" : "none"
      }}
    >
      <div className="flex items-center justify-between transition-all duration-300 px-2 pl-5 py-2">
        {/* Logo */}
        <Link href="/" className={`font-serif text-lg font-semibold tracking-tight transition-colors duration-300 whitespace-nowrap ${isScrolled ? "text-foreground" : "text-white"}`}>
          Aakar Woodcraft
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm transition-colors ${isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={`https://wa.me/${contactInfo.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-none border ${isScrolled ? "border-border text-foreground hover:bg-muted" : "border-white/40 text-white hover:bg-white/10"}`}
          >
            <MessageCircle size={16} />
            WhatsApp Us
          </Link>
          <Link
            href="/contact"
            className={`px-4 py-2 text-sm font-medium transition-all rounded-none ${isScrolled ? "bg-foreground text-background hover:opacity-80" : "bg-white text-foreground hover:bg-white/90"}`}
          >
            Request a Quote
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`transition-colors lg:hidden ${isScrolled ? "text-foreground" : "text-white"}`}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background px-6 py-8 lg:hidden rounded-b-none max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-lg text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={`https://wa.me/${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 border border-border px-5 py-3 text-center text-sm font-medium text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageCircle size={16} />
              WhatsApp Us
            </Link>
            <Link
              href="/contact"
              className="bg-foreground px-5 py-3 text-center text-sm font-medium text-background"
              onClick={() => setIsMenuOpen(false)}
            >
              Request a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
