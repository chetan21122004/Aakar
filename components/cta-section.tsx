"use client"

import Link from "next/link"
import { Clock, MapPin, Shield } from "lucide-react"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { trustBadges } from "@/lib/data"
import { useReveal } from "@/hooks/use-reveal"

interface CTASectionProps {
  title: string
  subtitle?: string
  primaryText: string
  primaryHref: string
  secondaryText?: string
  secondaryHref?: string
  dark?: boolean
}

const trustIcons = [Clock, MapPin, Shield]

function isExternal(href: string) {
  return href.startsWith("http://") || href.startsWith("https://")
}

function revealStyle(visible: boolean, delay = 0) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(14px)",
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
  }
}

function AnimatedTitle({
  title,
  visible,
  dark,
}: {
  title: string
  visible: boolean
  dark?: boolean
}) {
  const words = title.split(" ")

  return (
    <h2
      className={`font-serif text-3xl font-light tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-tight ${
        dark ? "text-primary-foreground" : "text-foreground"
      }`}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block transition-opacity duration-700 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transitionDelay: `${100 + i * 70}ms`,
          }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </h2>
  )
}

function CTAButton({
  href,
  children,
  variant,
  external,
  visible,
  dark,
  delay,
}: {
  href: string
  children: React.ReactNode
  variant: "primary" | "secondary"
  external?: boolean
  visible: boolean
  dark?: boolean
  delay: number
}) {
  const isPrimary = variant === "primary"

  const className = isPrimary
    ? dark
      ? "bg-accent text-accent-foreground hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(168,111,71,0.25)]"
      : "bg-primary text-primary-foreground hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(48,42,38,0.15)]"
    : dark
      ? "border border-primary-foreground/25 text-primary-foreground hover:-translate-y-px hover:border-primary-foreground/45 hover:bg-primary-foreground/5"
      : "border border-border text-foreground hover:-translate-y-px hover:bg-muted"

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 font-sans text-sm font-semibold uppercase tracking-wide transition-all duration-300 ease-out ${className}`}
      style={revealStyle(visible, delay)}
    >
      {children}
    </Link>
  )
}

function TrustItem({
  badge,
  index,
  visible,
  dark,
  showDivider,
}: {
  badge: (typeof trustBadges)[number]
  index: number
  visible: boolean
  dark?: boolean
  showDivider?: boolean
}) {
  const Icon = trustIcons[index]

  return (
    <div style={revealStyle(visible, 420 + index * 80)}>
      <div
        className={`group flex items-start gap-3 transition-transform duration-500 ease-out hover:translate-x-0.5 ${
          showDivider
            ? dark
              ? "sm:border-l sm:border-primary-foreground/10 sm:pl-6"
              : "sm:border-l sm:border-border sm:pl-6"
            : ""
        }`}
      >
        <Icon
          size={18}
          strokeWidth={1.5}
          className={`mt-0.5 shrink-0 transition-all duration-500 ease-out group-hover:scale-105 ${
            dark ? "text-accent" : "text-secondary"
          }`}
        />
        <div>
          <p
            className={`font-sans text-sm font-semibold uppercase tracking-wide transition-colors duration-300 group-hover:text-accent ${
              dark ? "text-primary-foreground" : "text-foreground"
            }`}
          >
            {badge.title}
          </p>
          <p
            className={`mt-1 text-sm leading-relaxed transition-colors duration-300 ${
              dark
                ? "text-primary-foreground/60 group-hover:text-primary-foreground/75"
                : "text-muted-foreground group-hover:text-foreground/70"
            }`}
          >
            {badge.subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}

export function CTASection({
  title,
  subtitle,
  primaryText,
  primaryHref,
  secondaryText,
  secondaryHref,
  dark = false,
}: CTASectionProps) {
  const { ref: revealRef, visible } = useReveal(0.12)

  return (
    <section
      className={`border-t border-border px-6 py-16 md:px-12 md:py-20 lg:px-20 ${
        dark ? "bg-umber text-primary-foreground" : "bg-sand text-foreground"
      }`}
    >
      <div ref={revealRef as React.RefObject<HTMLDivElement>} className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <p
              className={`type-label mb-4 ${dark ? "text-accent" : ""}`}
              style={revealStyle(visible, 0)}
            >
              Get in Touch
            </p>
            <AnimatedTitle title={title} visible={visible} dark={dark} />
            <div
              className="mt-5 h-px w-10 origin-left bg-accent transition-transform duration-700 ease-out"
              style={{
                transform: visible ? "scaleX(1)" : "scaleX(0)",
                transitionDelay: "320ms",
              }}
            />
          </div>

          <div>
            {subtitle && (
              <p
                className={`mb-6 max-w-lg text-base leading-relaxed md:text-lg ${
                  dark ? "text-primary-foreground/75" : "text-muted-foreground"
                }`}
                style={revealStyle(visible, 180)}
              >
                {subtitle}
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CTAButton
                href={primaryHref}
                variant="primary"
                external={isExternal(primaryHref)}
                visible={visible}
                dark={dark}
                delay={260}
              >
                {primaryText}
              </CTAButton>
              {secondaryText && secondaryHref && (
                <CTAButton
                  href={secondaryHref}
                  variant="secondary"
                  external={isExternal(secondaryHref)}
                  visible={visible}
                  dark={dark}
                  delay={340}
                >
                  {isExternal(secondaryHref) && <WhatsAppIcon size={16} />}
                  {secondaryText}
                </CTAButton>
              )}
            </div>
          </div>
        </div>

        <div className="relative mt-10 md:mt-12">
          <div
            aria-hidden
            className={`absolute inset-x-0 top-0 h-px origin-left ${
              dark ? "bg-primary-foreground/15" : "bg-border"
            }`}
            style={{
              transform: visible ? "scaleX(1)" : "scaleX(0)",
              transition: "transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) 380ms",
            }}
          />
          <div className="grid grid-cols-1 gap-6 pt-8 sm:grid-cols-3 sm:gap-8 md:pt-10">
            {trustBadges.map((badge, index) => (
              <TrustItem
                key={badge.title}
                badge={badge}
                index={index}
                visible={visible}
                dark={dark}
                showDivider={index > 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
