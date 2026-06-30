"use client"

import Link from "next/link"
import { Clock, Instagram, MapPin, MessageCircle, Shield } from "lucide-react"
import { contactInfo, footerLinks, trustBadges } from "@/lib/data"

const trustIcons = [Clock, MapPin, Shield]

export function FooterSection() {
  const whatsappHref = `https://wa.me/${contactInfo.whatsapp}`

  return (
    <footer>
      {/* Trust strip */}
      <div className="bg-primary px-6 py-10 md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-3">
          {trustBadges.map((badge, index) => {
            const Icon = trustIcons[index]
            return (
              <div
                key={badge.title}
                className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:text-left"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-primary-foreground/20">
                  <Icon size={18} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-primary-foreground">
                    {badge.title}
                  </p>
                  <p className="mt-0.5 text-sm text-primary-foreground/70">{badge.subtitle}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Main footer */}
      <div className="bg-foreground px-6 py-16 text-background md:px-12 md:py-20 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-5">
              <Link href="/" className="inline-block">
                <p className="font-serif text-2xl font-light leading-none tracking-tight text-background">
                  AAKAR
                </p>
                <p className="mt-1 font-serif text-sm font-light uppercase tracking-[0.3em] text-background/70">
                  Woodcraft
                </p>
              </Link>
              <p className="mt-6 max-w-sm font-serif text-lg font-light leading-snug text-background/90">
                Contemporary Form. Rooted in Craft.
              </p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-background/60">
                Solid wood furniture designed for homes that age beautifully. Each piece made to
                order in our workshop.
              </p>
              <Link
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 border border-background/30 px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-background hover:text-foreground"
              >
                <MessageCircle size={16} />
                WhatsApp Us
              </Link>
            </div>

            {/* Explore */}
            <div className="lg:col-span-2 lg:col-start-7">
              <h4 className="type-label mb-5 text-background/50">Explore</h4>
              <ul className="space-y-3">
                {footerLinks.explore.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/70 transition-colors hover:text-background"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="lg:col-span-2">
              <h4 className="type-label mb-5 text-background/50">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/70 transition-colors hover:text-background"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="lg:col-span-3">
              <h4 className="type-label mb-5 text-background/50">Connect</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-sm text-background/70 transition-colors hover:text-background"
                  >
                    {contactInfo.email}
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-background/70 transition-colors hover:text-background"
                  >
                    {contactInfo.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={contactInfo.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-background/70 transition-colors hover:text-background"
                  >
                    <Instagram size={14} />
                    {contactInfo.instagram}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10 bg-foreground px-6 py-6 text-background md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-1 text-center md:items-start md:text-left">
            <p className="text-xs text-background/50">
              &copy; 2025 Aakar Woodcraft. All rights reserved.
            </p>
            <p className="text-xs text-background/40">Designed and crafted in India</p>
          </div>

          <a
            href={contactInfo.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Instagram"
            className="flex h-9 w-9 items-center justify-center border border-background/20 text-background/60 transition-colors hover:border-background/40 hover:text-background"
          >
            <Instagram size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
