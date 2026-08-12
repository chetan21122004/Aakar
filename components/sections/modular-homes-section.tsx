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
    linear-gradient(90deg, #8B6A4A 0%, #6B4A35 50%, #5C3A28 100%)
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
          className="absolute -inset-3 rounded-full bg-[#6B4A35]/12 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        />
        <motion.span
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#6B4A35] text-white shadow-[0_8px_24px_rgba(48,42,38,0.12)] md:h-16 md:w-16"
          whileHover={
            reduceMotion
              ? undefined
              : { scale: 1.06, transition: { type: "spring", stiffness: 400, damping: 16 } }
          }
        >
          <Icon size={22} strokeWidth={1.6} className="md:h-6 md:w-6" />
        </motion.span>
        <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border border-[#F3EFE9] bg-ink font-condensed text-[0.65rem] font-semibold text-[#F3EFE9]">
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
      className="relative overflow-hidden bg-[#F3EFE9] px-5 py-10 md:px-10 md:py-12 lg:px-16"
    >
      {/* Soft animated atmosphere */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#6B4A35]/8 blur-3xl"
        aria-hidden
      />
      <motion.div
        style={{ y: blobY }}
        className="pointer-events-none absolute -right-16 bottom-24 h-80 w-80 rounded-full bg-[#C4A882]/14 blur-3xl"
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
                className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-[#8B6A4A]/90 via-[#6B4A35]/85 to-[#5C3A28]/90"
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
            className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-[#c9b8a8]/55 bg-[#F3EFE9] p-5 shadow-[0_12px_40px_rgba(48,42,38,0.06)] md:rounded-[2.5rem] md:p-6 lg:p-7"
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
                className="inline-flex rounded-full bg-[#6B4A35] px-8 py-3.5 font-condensed text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-[#F7F1E8] shadow-[0_10px_28px_rgba(107,74,53,0.28)] transition-colors hover:bg-[#5C3A28] md:text-[0.8rem]"
              >
                Join Our Trade Program
              </Link>
            </motion.div>
          </motion.div>

          {/* AR card */}
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
            className="relative flex min-h-[480px] flex-col overflow-hidden rounded-[2rem] md:min-h-full md:rounded-[2.5rem]"
          >
            <motion.div
              className="absolute inset-0"
              initial={reduceMotion ? false : { scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.3, ease }}
            >
              <Image
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop"
                alt="Living room ready for AR furniture visualization"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20"
              aria-hidden
            />

            {/* Centered phone in hand */}
            <motion.div
              className="relative z-10 mx-auto mt-10 w-[42%] max-w-[170px] sm:mt-12 sm:w-[38%] md:mt-14"
              initial={reduceMotion ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, delay: 0.25, ease }}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: [0, -8, 0],
                      transition: {
                        duration: 4.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }
              }
            >
              <div className="overflow-hidden rounded-[1.6rem] border-[3px] border-white/95 shadow-[0_28px_60px_rgba(0,0,0,0.45)]">
                <div className="relative aspect-[9/19] bg-ink">
                  <Image
                    src="https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=600&auto=format&fit=crop"
                    alt="AR preview of a wooden lounge chair"
                    fill
                    sizes="170px"
                    className="object-cover"
                  />
                  <span className="absolute inset-x-2.5 bottom-2.5 rounded-md bg-white/95 px-1.5 py-1 text-center font-condensed text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-ink">
                    Live AR
                  </span>
                </div>
              </div>
              {/* Soft hand silhouette under phone */}
              <div
                className="mx-auto -mt-1 h-8 w-[72%] rounded-b-[2rem] bg-gradient-to-b from-[#c4a484]/90 to-transparent blur-[1px]"
                aria-hidden
              />
            </motion.div>

            <div className="relative z-10 mt-auto flex flex-col items-center px-6 pb-7 pt-8 text-center md:px-8 md:pb-9">
              <motion.h3
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.28, duration: 0.55, ease }}
                className="font-condensed text-[1.25rem] font-semibold uppercase tracking-[0.06em] text-white md:text-[1.4rem]"
              >
                Visualize in Your Space
              </motion.h3>
              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.36, duration: 0.5, ease }}
                className="mt-2 max-w-xs font-hero text-[0.92rem] font-light leading-relaxed text-white/80 md:text-[0.98rem]"
              >
                Try our AR feature — place Aakar pieces in your room before you order.
              </motion.p>
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.44, duration: 0.5, ease }}
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="mt-6"
              >
                <Link
                  href="/see-in-your-room"
                  className="inline-flex rounded-full bg-[#6B4A35] px-8 py-3.5 font-condensed text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#5C3A28] md:text-[0.8rem]"
                >
                  Get Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
