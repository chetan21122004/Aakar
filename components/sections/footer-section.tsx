"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { categories, contactInfo } from "@/lib/data";

const footerLinks = {
  explore: [
    { label: "Home", href: "/" },
    { label: "Collections", href: "/collections" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Process", href: "/process" },
    { label: "Blog", href: "/blog" },
  ],
  collections: [
    { label: "Hampi Rift", href: "/collections/hampi-rift" },
    { label: "Still Mandu", href: "/collections/still-mandu" },
    { label: "Terravaani", href: "/collections/terravaani" },
    { label: "Sikri Shift", href: "/collections/sikri-shift" },
    { label: "Auroville", href: "/collections/auroville" },
  ],
  service: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
    { label: "See in Your Room", href: "/see-in-your-room" },
    { label: "Request a Quote", href: "/contact" },
  ],
};

export function FooterSection() {
  return (
    <footer className="bg-background">
      {/* Main Footer Content */}
      <div className="border-t border-border px-6 py-16 md:px-12 md:py-20 lg:px-20">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="text-lg font-serif font-semibold text-foreground">
              Aakar Woodcraft
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Handcrafted custom wooden furniture designed for modern Indian homes.
            </p>
            <Link
              href={`https://wa.me/${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <MessageCircle size={16} />
              WhatsApp Us
            </Link>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Collections</h4>
            <ul className="space-y-3">
              {footerLinks.collections.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Shop by Category</h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/${category.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service / Contact */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Get in Touch</h4>
            <ul className="space-y-3">
              {footerLinks.service.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="text-sm text-muted-foreground">{contactInfo.phone}</li>
              <li className="text-sm text-muted-foreground">{contactInfo.email}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border px-6 py-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 Aakar Woodcraft. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Instagram
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Pinterest
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              YouTube
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
