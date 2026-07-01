"use client"

import Link from "next/link"
import { Instagram } from "lucide-react"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { contactInfo, footerLinks } from "@/lib/data"
import { useReveal } from "@/hooks/use-reveal"

function FooterLink({
  href,
  children,
  external,
  delay,
  visible,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
  delay: number
  visible: boolean
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group relative inline-block py-0.5 font-sans text-sm text-background/60 transition-all duration-300 hover:translate-x-1 hover:text-background md:text-base"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(12px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms, color 0.3s ease`,
      }}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-400 ease-out group-hover:w-full" />
    </Link>
  )
}

function FooterColumn({
  title,
  children,
  delay,
  visible,
  className = "",
}: {
  title: string
  children: React.ReactNode
  delay: number
  visible: boolean
  className?: string
}) {
  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <h4 className="mb-3 font-sans text-[10px] font-semibold uppercase tracking-[0.4em] text-accent">
        {title}
      </h4>
      {children}
    </div>
  )
}

export function FooterSection() {
  const whatsappHref = `https://wa.me/${contactInfo.whatsapp}`
  const mainReveal = useReveal()
  const bottomReveal = useReveal()

  return (
    <footer className="overflow-hidden">
      <div
        ref={mainReveal.ref as React.RefObject<HTMLDivElement>}
        className="relative overflow-hidden bg-foreground text-background"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[5%] top-[10%] select-none font-serif text-[28vw] font-light leading-[0.8] tracking-tighter text-background/[0.025] md:text-[20vw]"
          style={{
            transform: mainReveal.visible ? "translateX(0)" : "translateX(30px)",
            transition: "transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          AAKAR
        </div>

        <div
          aria-hidden
          className={`absolute left-0 top-0 h-full w-px bg-accent ${mainReveal.visible ? "animate-line-grow" : "scale-x-0"}`}
        />

        <div className="relative mx-auto max-w-7xl px-6 py-8 md:px-12 md:py-10 lg:px-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-6">
            <div
              className="lg:col-span-6 lg:row-span-2"
              style={{
                opacity: mainReveal.visible ? 1 : 0,
                transform: mainReveal.visible ? "translateY(0)" : "translateY(30px)",
                transition: "opacity 0.7s ease, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <Link href="/" className="group inline-block">
                <p className="font-serif text-[clamp(3rem,12vw,7rem)] font-light leading-[0.9] tracking-tighter text-background transition-transform duration-500 group-hover:translate-x-1">
                  AAKAR
                </p>
                <p
                  className="mt-1 font-sans text-[10px] font-semibold uppercase tracking-[0.5em] text-background/45 transition-all duration-700 group-hover:tracking-[0.55em]"
                >
                  Woodcraft
                </p>
              </Link>

              <p className="mt-4 max-w-md font-serif text-xl font-light leading-snug text-background/90 md:text-2xl">
                Contemporary Form.
                <span className="block text-background/50">Rooted in Craft.</span>
              </p>

              <p className="mt-3 max-w-sm text-sm leading-relaxed text-background/50">
                Solid wood furniture designed for homes that age beautifully. Each piece made to
                order in our workshop.
              </p>

              <Link
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-4 inline-flex items-center gap-2 border border-background/30 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-background transition-all duration-400 hover:border-accent hover:bg-accent hover:text-accent-foreground"
              >
                <WhatsAppIcon size={16} className="transition-transform duration-400 group-hover:scale-110" />
                WhatsApp Us
              </Link>
            </div>

            <FooterColumn
              title="Explore"
              delay={120}
              visible={mainReveal.visible}
              className="lg:col-span-3 lg:col-start-8 lg:row-start-1"
            >
              <ul className="space-y-2.5">
                {footerLinks.explore.map((link, i) => (
                  <li key={link.label}>
                    <FooterLink href={link.href} delay={180 + i * 50} visible={mainReveal.visible}>
                      {link.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </FooterColumn>

            <FooterColumn
              title="Company"
              delay={200}
              visible={mainReveal.visible}
              className="lg:col-span-2 lg:col-start-8 lg:row-start-2 lg:mt-2"
            >
              <ul className="space-y-2.5">
                {footerLinks.company.map((link, i) => (
                  <li key={link.label}>
                    <FooterLink href={link.href} delay={260 + i * 50} visible={mainReveal.visible}>
                      {link.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </FooterColumn>

            <FooterColumn
              title="Connect"
              delay={160}
              visible={mainReveal.visible}
              className="lg:col-span-3 lg:col-start-10 lg:row-start-1"
            >
              <ul className="space-y-3">
                <li>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="group relative inline-block py-0.5 text-sm text-background/60 transition-all duration-300 hover:translate-x-1 hover:text-background md:text-base"
                    style={{
                      opacity: mainReveal.visible ? 1 : 0,
                      transform: mainReveal.visible ? "translateX(0)" : "translateX(12px)",
                      transition: "opacity 0.5s ease 220ms, transform 0.5s ease 220ms, color 0.3s ease",
                    }}
                  >
                    <span className="relative z-10">{contactInfo.email}</span>
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-400 group-hover:w-full" />
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-block py-0.5 text-sm text-background/60 transition-all duration-300 hover:translate-x-1 hover:text-background md:text-base"
                    style={{
                      opacity: mainReveal.visible ? 1 : 0,
                      transform: mainReveal.visible ? "translateX(0)" : "translateX(12px)",
                      transition: "opacity 0.5s ease 270ms, transform 0.5s ease 270ms, color 0.3s ease",
                    }}
                  >
                    <span className="relative z-10">{contactInfo.phone}</span>
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-400 group-hover:w-full" />
                  </a>
                </li>
                <li>
                  <a
                    href={contactInfo.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 py-0.5 text-sm text-background/60 transition-all duration-300 hover:translate-x-1 hover:text-background md:text-base"
                    style={{
                      opacity: mainReveal.visible ? 1 : 0,
                      transform: mainReveal.visible ? "translateX(0)" : "translateX(12px)",
                      transition: "opacity 0.5s ease 320ms, transform 0.5s ease 320ms, color 0.3s ease",
                    }}
                  >
                    <Instagram
                      size={15}
                      className="transition-transform duration-400 group-hover:rotate-12 group-hover:text-accent"
                    />
                    {contactInfo.instagram}
                  </a>
                </li>
              </ul>
            </FooterColumn>
          </div>
        </div>
      </div>

      <div
        ref={bottomReveal.ref as React.RefObject<HTMLDivElement>}
        className="border-t border-background/10 bg-foreground px-6 py-4 text-background md:px-12 lg:px-20"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p
            aria-hidden
            className="select-none font-serif text-[clamp(2.5rem,10vw,5rem)] font-light leading-none tracking-tighter text-background/[0.08]"
            style={{
              opacity: bottomReveal.visible ? 1 : 0,
              transform: bottomReveal.visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.95)",
              transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            2025
          </p>

          <div
            className="flex w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
            style={{
              opacity: bottomReveal.visible ? 1 : 0,
              transform: bottomReveal.visible ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.5s ease 0.15s, transform 0.5s ease 0.15s",
            }}
          >
            <div className="space-y-0.5">
              <p className="text-[11px] text-background/50">
                &copy; 2025 Aakar Woodcraft. All rights reserved.
              </p>
              <p className="text-[11px] text-background/35">Designed and crafted in India</p>
            </div>

            <a
              href={contactInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
              className="group flex h-10 w-10 items-center justify-center border border-background/20 text-background/60 transition-all duration-400 hover:scale-110 hover:border-accent hover:bg-accent hover:text-accent-foreground"
            >
              <Instagram size={16} className="transition-transform duration-400 group-hover:rotate-12" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
