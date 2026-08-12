"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { contactInfo } from "@/lib/data";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const columns = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Furniture", href: "/shop" },
      { label: "Collections", href: "/collections" },
      { label: "Spaces", href: "/for-architects" },
      { label: "Aakar Woodcraft", href: "/" },
    ],
  },
  {
    title: "Craft",
    links: [
      { label: "Design", href: "/craft-materials" },
      { label: "Hand Finishing", href: "/craft-materials" },
      { label: "Refinement", href: "/process" },
      { label: "Restoration", href: "/craft-materials" },
      { label: "Sanding", href: "/craft-materials" },
      { label: "Polishing", href: "/craft-materials" },
    ],
  },
  {
    title: "Contact Us",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Visit Us", href: "/contact" },
      { label: "Service & Repair", href: "/faq" },
      { label: "Home Consultation", href: "/contact" },
    ],
  },
] as const;

export function FooterSection() {
  const reduceMotion = useReducedMotion();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const brandY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [80, 0]
  );
  const brandScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [0.92, 1]
  );
  const glowX = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? ["30%", "30%"] : ["10%", "70%"]
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden bg-[#1A1410] text-[#F5F2EA]"
    >
      {/* Moving glow + grain atmosphere */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-[-20%] h-[70%] w-[55%] rounded-full bg-[#8B5E3C]/25 blur-[120px]"
        style={{ left: glowX }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#C4A882]/12 blur-[90px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative px-5 pb-8 pt-10 md:px-10 md:pb-10 md:pt-12 lg:px-16">
        <motion.div
          className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {columns.map((col) => (
            <motion.div
              key={col.title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.65, ease },
                },
              }}
            >
              <h4 className="mb-3 font-condensed text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-[#C4A882]">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group relative inline-block font-hero text-[0.92rem] font-light text-[#F5F2EA]/65 transition-colors hover:text-white"
                    >
                      {link.label}
                      <span
                        aria-hidden
                        className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[#C4A882] transition-transform duration-300 group-hover:scale-x-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.65, ease },
              },
            }}
          >
            <h4 className="mb-3 font-condensed text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-[#C4A882]">
              Newsletter
            </h4>
            <p className="mb-4 font-hero text-[0.85rem] font-light leading-relaxed text-[#F5F2EA]/55">
              Stories, launches, and craft notes — once in a while.
            </p>
            {subscribed ? (
              <p className="font-hero text-sm text-[#C4A882]">
                Thank you for subscribing.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="relative">
                <label htmlFor="footer-newsletter" className="sr-only">
                  Email for newsletter
                </label>
                <input
                  id="footer-newsletter"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-full border border-white/10 bg-[#F3EFE9] py-3 pl-4 pr-12 font-hero text-sm text-ink outline-none ring-[#C4A882]/0 transition focus:ring-2 focus:ring-[#C4A882]/50 placeholder:text-ink/40"
                />
                <motion.button
                  type="submit"
                  aria-label="Subscribe"
                  whileHover={reduceMotion ? undefined : { scale: 1.08, rotate: -8 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.94 }}
                  className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#6B4A35] text-white shadow-[0_0_24px_rgba(196,168,130,0.35)]"
                >
                  <ArrowRight size={16} strokeWidth={1.75} />
                </motion.button>
              </form>
            )}
            <a
              href={`mailto:${contactInfo.email}`}
              className="mt-4 block font-hero text-[0.8rem] font-light text-[#F5F2EA]/45 transition-colors hover:text-white"
            >
              {contactInfo.email}
            </a>
          </motion.div>
        </motion.div>

        {/* Giant scroll-driven brand mark */}
        <motion.div
          style={{ y: brandY, scale: brandScale }}
          className="relative mt-10 overflow-hidden border-t border-white/10 pt-6 md:mt-12 md:pt-8"
        >
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <p className="relative z-10 font-hero text-[0.75rem] font-light text-[#F5F2EA]/40">
              &copy; {new Date().getFullYear()} Aakar Woodcraft. All rights
              reserved.
            </p>
            <Link
              href="/"
              className="group relative z-10 select-none"
              aria-label="Aakar Woodcraft home"
            >
              <motion.span
                className="block font-serif text-[clamp(3.5rem,14vw,8.5rem)] font-light leading-[0.85] tracking-[-0.04em] text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(120deg, #F5F2EA 0%, #C4A882 45%, #F5F2EA 90%)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 8, repeat: Infinity, ease: "linear" }
                }
              >
                आकार
              </motion.span>
              <span className="mt-1 block font-condensed text-[0.7rem] font-semibold uppercase tracking-[0.35em] text-[#C4A882]/70 transition-colors group-hover:text-[#C4A882]">
                Aakar Woodcraft
              </span>
            </Link>
          </div>

          {/* Ghost watermark behind mark */}
          <motion.p
            aria-hidden
            className="pointer-events-none absolute -bottom-6 right-0 select-none font-condensed text-[clamp(4rem,18vw,11rem)] font-semibold uppercase leading-none tracking-[-0.06em] text-white/[0.04]"
            animate={
              reduceMotion
                ? undefined
                : { x: [0, -24, 0], opacity: [0.03, 0.06, 0.03] }
            }
            transition={
              reduceMotion
                ? undefined
                : { duration: 10, repeat: Infinity, ease: "easeInOut" }
            }
          >
            AAKAR
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}
