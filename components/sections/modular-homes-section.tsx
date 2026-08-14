"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type CSSProperties } from "react";
import {
  CheckCircle2,
  Hammer,
  Handshake,
  MessageCircle,
  PenTool,
  Ruler,
  Wrench,
} from "lucide-react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Consultation",
    copy: "Brief, site context, and lifestyle mapped into a clear modular brief.",
    Icon: MessageCircle,
  },
  {
    n: "02",
    title: "Design",
    copy: "Layouts and elevations refined into build-ready modular plans.",
    Icon: PenTool,
  },
  {
    n: "03",
    title: "Materials",
    copy: "Woods, finishes, and hardware curated for climate and feel.",
    Icon: Ruler,
  },
  {
    n: "04",
    title: "Fabrication",
    copy: "Workshop precision with traditional joinery and controlled finish.",
    Icon: Hammer,
  },
  {
    n: "05",
    title: "Quality",
    copy: "Structure, fit, and finish reviewed against drawings.",
    Icon: CheckCircle2,
  },
  {
    n: "06",
    title: "Install",
    copy: "On-site assembly by trained teams, on your schedule.",
    Icon: Wrench,
  },
  {
    n: "07",
    title: "Handover",
    copy: "Walkthrough, care guidance, and lasting support.",
    Icon: Handshake,
  },
] as const;

const tradePerks = [
  "Trade Pricing",
  "Dedicated Support",
  "Custom Solutions",
  "Material Management",
] as const;

const partnerImages = [
  {
    src: "/images/trade/blueprints.jpg",
    alt: "Architect reviewing blueprints and sketches at a worktable",
    className: "col-span-2 aspect-[2/1]",
  },
  {
    src: "/images/trade/meeting.jpg",
    alt: "Design team meeting in a modern studio",
    className: "aspect-[4/3]",
  },
  {
    src: "/images/trade/floorplans.jpg",
    alt: "Hands drawing detailed architectural floor plans",
    className: "aspect-[4/3]",
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

const SECTION_HEADING =
  "mb-5 text-center font-condensed text-[1.35rem] font-semibold uppercase tracking-[0.12em] text-ink md:mb-6 md:text-[1.65rem] md:tracking-[0.14em]";

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.88 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, delay: 0.12 + i * 0.09, ease },
  }),
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease },
  },
};

const woodRailStyle: CSSProperties = {
  backgroundImage: `
    repeating-linear-gradient(
      90deg,
      rgba(255,255,255,0.12) 0px,
      rgba(255,255,255,0.12) 2px,
      rgba(0,0,0,0) 6px,
      rgba(0,0,0,0) 14px
    ),
    repeating-linear-gradient(
      0deg,
      rgba(0,0,0,0.22) 0px,
      rgba(0,0,0,0.22) 1px,
      rgba(0,0,0,0) 3px,
      rgba(0,0,0,0) 7px
    ),
    linear-gradient(90deg, #A86F47 0%, #A86F47 50%, #76513D 100%)
  `,
  backgroundBlendMode: "overlay, multiply, normal",
  boxShadow: "inset 0 2px 0 rgba(255,255,255,0.10), inset 0 -2px 0 rgba(0,0,0,0.20)",
};

function ProcessStep({
  step,
  index,
  reduceMotion,
}: {
  step: (typeof steps)[number];
  index: number;
  reduceMotion: boolean | null;
}) {
  const { n, title, copy, Icon } = step;

  return (
    <motion.li
      custom={index}
      variants={stepVariants}
      whileHover={
        reduceMotion
          ? undefined
          : { y: -8, transition: { type: "spring", stiffness: 380, damping: 22 } }
      }
      className="group relative flex min-w-[148px] flex-1 flex-col items-center text-center md:min-w-0"
    >
      <div className="relative mb-5">
        <motion.span
          className="absolute -inset-3 rounded-full bg-primary/12 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        />
        <motion.span
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-[0_8px_24px_rgba(48,42,38,0.12)] md:h-16 md:w-16"
          whileHover={
            reduceMotion
              ? undefined
              : { scale: 1.06, transition: { type: "spring", stiffness: 400, damping: 16 } }
          }
        >
          <Icon size={22} strokeWidth={1.6} className="md:h-6 md:w-6" />
        </motion.span>
        <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border border-background bg-foreground font-condensed text-[0.65rem] font-semibold text-background">
          {n}
        </span>
      </div>
      <p className="font-condensed text-[0.85rem] font-semibold uppercase tracking-[0.08em] text-ink md:text-[0.95rem]">
        {title}
      </p>
      <p className="mt-2 max-w-[11.5rem] font-hero text-[0.88rem] font-light leading-relaxed text-ink/68 md:text-[0.92rem]">
        {copy}
      </p>
    </motion.li>
  );
}

export function ModularHomesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const processInView = useInView(processRef, { once: true, amount: 0.35 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [40, -40]);
  const blobY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-30, 50]);
  const lineProgress = useTransform(
    scrollYProgress,
    [0.15, 0.45],
    reduceMotion ? [1, 1] : [0, 1]
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background px-5 py-10 md:px-10 md:py-12 lg:px-16"
    >
      {/* Soft animated atmosphere */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/8 blur-3xl"
        aria-hidden
      />
      <motion.div
        style={{ y: blobY }}
        className="pointer-events-none absolute -right-16 bottom-24 h-80 w-80 rounded-full bg-stone/40 blur-3xl"
        aria-hidden
      />

      <div className="relative">
        {/* Process */}
        <div ref={processRef} className="mb-8 md:mb-10">
          <motion.div
            initial="hidden"
            animate={processInView ? "visible" : "hidden"}
            variants={headingVariants}
          >
            <h2 className={SECTION_HEADING}>How Modular Homes Work</h2>
          </motion.div>

          <motion.ol
            initial="hidden"
            animate={processInView ? "visible" : "hidden"}
            className="relative flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-7 md:gap-3 md:overflow-visible md:pb-0 lg:gap-4"
          >
            {/* Animated wood progress rail (desktop) */}
            <div
              className="pointer-events-none absolute left-[7%] right-[7%] top-[1.7rem] hidden h-[16px] overflow-hidden rounded-full bg-ink/10 md:block"
              aria-hidden
            >
              <div className="h-full w-full" style={woodRailStyle} />
              <motion.div
                className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-clay/90 via-primary/85 to-secondary/90"
                style={{ scaleX: lineProgress }}
              />
            </div>

            {steps.map((step, i) => (
              <ProcessStep
                key={step.title}
                step={step}
                index={i}
                reduceMotion={reduceMotion}
              />
            ))}
          </motion.ol>
        </div>

        {/* Dual cards */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          {/* Partner card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            whileHover={
              reduceMotion
                ? undefined
                : { y: -4, transition: { type: "spring", stiffness: 320, damping: 24 } }
            }
            className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-border/55 bg-background p-5 shadow-[0_12px_40px_rgba(48,42,38,0.06)] md:rounded-[2.5rem] md:p-6 lg:p-7"
          >
            <div className="mb-5 grid grid-cols-2 gap-2.5 md:mb-6 md:gap-3">
              {partnerImages.map((img, i) => (
                <motion.div
                  key={img.src}
                  initial={reduceMotion ? false : { opacity: 0, scale: 1.06 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.12 + i * 0.08, ease }}
                  className={`relative overflow-hidden rounded-[1.25rem] md:rounded-[1.5rem] ${img.className}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </motion.div>
              ))}
            </div>

            <h3 className="font-condensed text-[1.15rem] font-semibold uppercase leading-snug tracking-[0.04em] text-ink md:text-[1.3rem]">
              Partner with AAKAR:{" "}
              <span className="font-semibold normal-case tracking-normal">
                For Architects &amp; Designers.
              </span>
            </h3>

            <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
              {tradePerks.map((perk, i) => (
                <motion.li
                  key={perk}
                  initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.4, ease }}
                  className="flex items-start gap-2.5 font-hero text-[0.95rem] font-light text-ink/80 md:text-[1rem]"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-[1px] bg-ink"
                    aria-hidden
                  />
                  {perk}
                </motion.li>
              ))}
            </ul>

            <motion.div
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className="mt-auto pt-7 md:pt-8"
            >
              <Link
                href="/for-architects"
                className="inline-flex rounded-full bg-primary px-8 py-3.5 font-condensed text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-primary-foreground shadow-[0_10px_28px_rgba(168,111,71,0.28)] transition-colors hover:bg-secondary md:text-[0.8rem]"
              >
                Join Our Trade Program
              </Link>
            </motion.div>
          </motion.div>

          {/* Visualize in your space */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: 0.12 }}
            whileHover={
              reduceMotion
                ? undefined
                : { y: -4, transition: { type: "spring", stiffness: 320, damping: 24 } }
            }
            className="relative min-h-[480px] overflow-hidden rounded-[2rem] md:min-h-full md:rounded-[2.5rem]"
          >
            <Link
              href="/see-in-your-room"
              className="group relative flex h-full min-h-[480px] flex-col overflow-hidden"
            >
              <Image
                src="/images/see-in-your-space/visualize-in-space.png"
                alt="Hand holding a phone previewing furniture in a living room"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-[center_20%] transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/55 via-35% to-transparent"
                aria-hidden
              />
              <div className="relative z-10 mt-auto px-6 pb-7 pt-16 text-center md:px-8 md:pb-9">
                <h3 className="font-condensed text-[1.25rem] font-semibold uppercase tracking-[0.06em] text-white md:text-[1.4rem]">
                  See It in Your Space
                </h3>
                <p className="mx-auto mt-2 max-w-xs font-hero text-[0.92rem] font-light leading-relaxed text-white/80 md:text-[0.98rem]">
                  Preview how Aakar pieces look in your room before you order.
                </p>
                <span className="mt-6 inline-flex rounded-full bg-primary px-8 py-3.5 font-condensed text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-white transition-colors group-hover:bg-secondary md:text-[0.8rem]">
                  Try Now
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
