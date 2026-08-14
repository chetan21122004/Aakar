"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Sparkles,
  Truck,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const SECTION_HEADING =
  "mb-5 text-center font-condensed text-[1.35rem] font-semibold uppercase tracking-[0.12em] text-ink md:mb-6 md:text-[1.65rem] md:tracking-[0.14em]";

const stories = [
  {
    title: "The Art of Teak",
    href: "/craft-materials",
    image: "/images/craft/detail.jpg",
    alt: "Curved teak wood furniture detail",
  },
  {
    title: "Designing for Wellness",
    href: "/about",
    image: "/images/craft/featured.jpg",
    alt: "Calm living space with crafted wood furniture",
  },
  {
    title: "Studio Visits: Our Artisans",
    href: "/craft-materials",
    image: "/images/craft/process.jpg",
    alt: "Artisan hands working wood in the studio",
  },
] as const;

const voiceSets = [
  [
    {
      quote:
        "Aakar turned our brief into a calm teak living space — quiet, solid, and made for how we actually live.",
      name: "Sarah Simona",
      role: "Client",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    },
    {
      quote:
        "From first sketch to install, the custom dining project felt precise, collaborative, and beautifully finished.",
      name: "Burnit Tanon",
      role: "Client",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    },
    {
      quote:
        "As a design partner, their material discipline and craft standard make specifications easy to trust.",
      name: "Anna Solo",
      role: "Partner",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    },
  ],
  [
    {
      quote:
        "The console proportions and oil finish were exactly right for our entry — it feels like it has always belonged.",
      name: "Meera Kapoor",
      role: "Client",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    },
    {
      quote:
        "White-glove delivery and install were seamless. The piece arrived as carefully as it was made.",
      name: "Rohan Desai",
      role: "Client",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc694a895?q=80&w=200&auto=format&fit=crop",
    },
    {
      quote:
        "We specify Aakar on hospitality projects for joinery quality and consistent lead times.",
      name: "Priya Nair",
      role: "Architect",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    },
  ],
] as const;

const trustItems = [
  { label: "2 Year Warranty", Icon: CheckCircle2 },
  { label: "Pan-India Delivery", Icon: Truck },
  { label: "Secure Payments", Icon: CreditCard },
] as const;

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, delay: 0.1 + i * 0.1, ease },
  }),
};

export function JournalVoicesSection() {
  const reduceMotion = useReducedMotion();
  const [voiceIndex, setVoiceIndex] = useState(0);
  const voices = voiceSets[voiceIndex];

  const nextVoices = () => {
    setVoiceIndex((i) => (i + 1) % voiceSets.length);
  };

  return (
    <section className="bg-background px-5 py-10 md:px-10 md:py-12 lg:px-16">
      <div>
        {/* Journal / Stories */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease }}
        >
          <h2 className={SECTION_HEADING}>Journal / Stories</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stories.map((story, i) => (
            <motion.div key={story.title} custom={i} variants={cardVariants}>
              <Link
                href={story.href}
                className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-stone p-3 transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(48,42,38,0.08)] md:rounded-[2rem] md:p-3.5"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem] bg-background md:rounded-[1.5rem]">
                  <Image
                    src={story.image}
                    alt={story.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mt-4 px-1 pb-2 font-condensed text-[0.95rem] font-semibold uppercase tracking-[0.04em] text-ink md:text-[1.05rem]">
                  {story.title}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-6 flex justify-center md:mt-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.55, ease }}
        >
          <motion.div
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          >
            <Link
              href="/about"
              className="inline-flex rounded-full bg-primary px-7 py-3.5 font-condensed text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-secondary md:text-[0.8rem]"
            >
              Read More Stories
            </Link>
          </motion.div>
        </motion.div>

        {/* Testimonials capsule */}
        <motion.div
          className="relative mt-8 md:mt-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="relative overflow-hidden rounded-[2rem] bg-stone px-6 py-10 md:rounded-[2.5rem] md:px-12 md:py-12 lg:px-16">
            <h2 className={SECTION_HEADING}>Testimonials</h2>

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={voiceIndex}
                  initial={reduceMotion ? false : { opacity: 0, x: 28 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, x: -28 }}
                  transition={{ duration: 0.45, ease }}
                  className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6 lg:gap-10"
                >
                  {voices.map((v) => (
                    <blockquote key={v.name} className="flex flex-col">
                      <p className="flex-1 font-hero text-[0.92rem] font-light leading-relaxed text-ink/75 md:text-[0.95rem]">
                        &ldquo;{v.quote}&rdquo;
                      </p>
                      <footer className="mt-5 flex items-center gap-3">
                        <span className="relative h-11 w-11 overflow-hidden rounded-full border border-ink/10">
                          <Image
                            src={v.image}
                            alt=""
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        </span>
                        <span>
                          <span className="block font-condensed text-[0.85rem] font-semibold uppercase tracking-[0.06em] text-ink">
                            {v.name}
                          </span>
                          <span className="font-hero text-[0.8rem] font-light text-ink/55">
                            {v.role}
                          </span>
                        </span>
                      </footer>
                    </blockquote>
                  ))}
                </motion.div>
              </AnimatePresence>

              <motion.button
                type="button"
                onClick={nextVoices}
                aria-label="Next testimonials"
                whileHover={reduceMotion ? undefined : { scale: 1.08 }}
                whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                className="absolute -right-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-[0_8px_24px_rgba(48,42,38,0.12)] md:-right-3 lg:-right-5"
              >
                <ArrowRight size={18} strokeWidth={1.75} />
              </motion.button>
            </div>
          </div>

          <span className="absolute -bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white px-4 py-1.5 font-condensed text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink shadow-sm">
            Client Voices
          </span>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          className="relative mx-auto mt-8 max-w-3xl md:mt-10"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          <div className="relative flex flex-col items-stretch gap-0 overflow-hidden rounded-[999px] bg-[#3D3834] px-4 py-4 text-[#F5F2EA] sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-4 md:px-10">
            {trustItems.map(({ label, Icon }, i) => (
              <div
                key={label}
                className={`flex flex-1 items-center justify-center gap-2.5 px-3 py-2 sm:py-0 ${
                  i < trustItems.length - 1
                    ? "border-b border-white/15 sm:border-b-0 sm:border-r"
                    : ""
                }`}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/25">
                  <Icon size={14} strokeWidth={1.75} />
                </span>
                <span className="font-condensed text-[0.78rem] font-medium uppercase tracking-[0.1em] md:text-[0.82rem]">
                  {label}
                </span>
              </div>
            ))}
            <Sparkles
              size={12}
              className="absolute bottom-2 right-4 text-white/40 sm:bottom-2.5 sm:right-5"
              aria-hidden
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
