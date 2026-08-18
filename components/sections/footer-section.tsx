"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { contactInfo } from "@/lib/data";
import { FadeInUp } from "@/components/motion/scroll-motion";

const linkGroups = [
  {
    title: "Explore",
    links: [
      { label: "Shop", href: "/shop" },
      { label: "Collections", href: "/collections" },
      { label: "The Console", href: "/the-console" },
      { label: "See in Your Room", href: "/see-in-your-room" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "About", href: "/about" },
      { label: "Craft & Materials", href: "/craft-materials" },
      { label: "Our Process", href: "/process" },
      { label: "For Architects", href: "/for-architects" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Blog", href: "/blog" },
    ],
  },
] as const;

function FooterNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 font-hero text-[0.95rem] font-light text-[#302A26]/80 transition-colors hover:text-[#302A26]"
    >
      <span className="h-px w-0 bg-[#A86F47] transition-all duration-300 group-hover:w-4" />
      {children}
    </Link>
  );
}

function ArchLine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 48" fill="none" className={className} aria-hidden>
      <path
        d="M8 44 V22 C8 12 28 4 48 4 C68 4 88 12 88 22 V44"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M156 44 V18 C156 8 176 2 200 2 C224 2 244 8 244 18 V44"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M312 44 V22 C312 12 332 4 352 4 C372 4 392 12 392 22 V44"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path d="M0 44 H400" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
    </svg>
  );
}

export function FooterSection() {
  return (
    <footer className="bg-[#F6EFE5] text-[#302A26]">
      {/* Statement */}
      <div className="border-t border-[#D9C8B7]">
        <div className="mx-auto max-w-7xl px-5 pt-14 md:px-10 md:pt-16 lg:px-16 lg:pt-20">
          <FadeInUp>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="font-condensed text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[#A86F47]">
                  Aakar Woodcraft
                </p>
                <h2 className="mt-3 font-serif text-[clamp(2.25rem,6vw,4.5rem)] font-light leading-[1.02] tracking-[-0.03em] text-[#302A26]">
                  Objects. Spaces. Stories.
                </h2>
              </div>
              <p className="max-w-sm font-hero text-[1rem] font-light leading-relaxed text-[#302A26]/75 lg:pb-2 lg:text-right">
                Contemporary wooden furniture and modular spaces - designed in India, shaped by hand.
              </p>
            </div>
            <ArchLine className="mt-10 h-10 w-full max-w-md text-[#76513D]/35 md:mt-12" />
          </FadeInUp>
        </div>
      </div>

      {/* Main columns */}
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-10 md:py-14 lg:px-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <FadeInUp className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3" aria-label="Aakar Woodcraft home">
              <Image src="/aakar_mark.png" alt="" width={56} height={56} className="h-14 w-14 object-contain" />
              <span className="flex flex-col leading-none">
                <span className="font-serif text-[1.25rem] font-normal tracking-[-0.02em] lowercase text-[#5c3d2e]">
                  aakarwood
                </span>
                <span className="mt-1.5 flex items-center gap-1.5 font-sans text-[0.55rem] font-medium uppercase tracking-[0.28em] text-[#6b4423]">
                  <span className="h-px w-3 bg-[#6b4423]/60" aria-hidden />
                  Craft
                  <span className="h-px w-3 bg-[#6b4423]/60" aria-hidden />
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-xs font-hero text-[0.92rem] font-light leading-relaxed text-[#302A26]/72">
              Made-to-order furniture rooted in architectural form, natural materials, and workshop precision.
            </p>
            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#A86F47] px-7 py-3.5 font-condensed text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#F6EFE5] transition-colors hover:bg-[#76513D]"
            >
              Start a project
              <ArrowRight size={14} strokeWidth={1.75} />
            </Link>
          </FadeInUp>

          <FadeInUp delay={0.06} className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <h4 className="mb-5 font-condensed text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#76513D]">
                  {group.title}
                </h4>
                <ul className="space-y-3.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <FooterNavLink href={link.href}>{link.label}</FooterNavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </FadeInUp>

          <FadeInUp delay={0.1} className="lg:col-span-3">
            <h4 className="mb-5 font-condensed text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#76513D]">
              Visit &amp; Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-start gap-3 font-hero text-[0.9rem] font-light text-[#302A26]/85 transition-colors hover:text-[#A86F47]"
                >
                  <Mail size={17} className="mt-0.5 shrink-0 text-[#A86F47]" strokeWidth={1.5} />
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  className="flex items-start gap-3 font-hero text-[0.9rem] font-light text-[#302A26]/85 transition-colors hover:text-[#A86F47]"
                >
                  <Phone size={17} className="mt-0.5 shrink-0 text-[#A86F47]" strokeWidth={1.5} />
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={17} className="mt-0.5 shrink-0 text-[#A86F47]" strokeWidth={1.5} />
                <span className="font-hero text-[0.9rem] font-light leading-relaxed text-[#302A26]/80">
                  {contactInfo.address}
                </span>
              </li>
            </ul>
            <a
              href={contactInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 font-condensed text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#76513D] transition-colors hover:text-[#A86F47]"
            >
              <Instagram size={16} strokeWidth={1.5} />
              {contactInfo.instagram}
            </a>
          </FadeInUp>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="bg-[#302A26] text-[#F6EFE5]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 md:flex-row md:items-center md:justify-between md:px-10 lg:px-16">
          <div className="space-y-1">
            <p className="font-hero text-[0.8rem] font-light text-[#F6EFE5]/70">
              &copy; {new Date().getFullYear()} Aakar Woodcraft. All rights reserved.
            </p>
            <p className="font-condensed text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[#F6EFE5]/45">
              Handcrafted in Jodhpur, Rajasthan
            </p>
          </div>
          <p
            className="font-serif text-[2.5rem] font-light leading-none tracking-[-0.03em] text-[#F6EFE5]/12 md:text-[3rem]"
            aria-hidden
          >
            आकार
          </p>
        </div>
      </div>
    </footer>
  );
}
