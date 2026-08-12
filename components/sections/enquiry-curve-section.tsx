"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const CTA_BG = "/images/cta/materials-banner.png";

export function EnquiryCurveSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [1.08, 1]
  );

  return (
    <section
      ref={ref}
      className="bg-[#F3EFE9] px-5 py-8 md:px-10 md:py-10 lg:px-16"
    >
      <motion.div
        className="relative overflow-hidden rounded-[1.75rem] md:rounded-[2rem]"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, ease }}
      >
        <div className="relative min-h-[280px] md:min-h-[300px] lg:min-h-[320px]">
          <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
            <Image
              src={CTA_BG}
              alt="Carved wood, linen, and stone material study"
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority={false}
            />
          </motion.div>

          {/* Soft readability washes — left dark wood / right linen */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-[#F3EFE9]/35"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent md:bg-none"
            aria-hidden
          />

          <div className="relative z-10 grid h-full min-h-[280px] grid-cols-1 gap-8 px-6 py-8 sm:px-8 md:min-h-[300px] md:grid-cols-2 md:items-center md:gap-8 md:px-10 md:py-10 lg:min-h-[320px] lg:px-14 lg:py-12">
            {/* Left — over carved wood */}
            <div className="flex flex-col justify-center md:max-w-[22rem]">
              <h2 className="font-condensed text-[1.75rem] font-semibold uppercase tracking-[0.1em] text-white md:text-[2rem] md:tracking-[0.12em] lg:text-[2.25rem]">
                Furniture Enquiry
              </h2>
              <p className="mt-3 max-w-[18rem] font-hero text-[1.02rem] font-light leading-relaxed text-white/90 md:text-[1.08rem]">
                Share dimensions, finish preferences, and timeline — we&apos;ll
                craft a tailored quote for your piece.
              </p>
              <motion.div
                whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="mt-6 inline-flex"
              >
                <Link
                  href="/contact"
                  className="inline-flex rounded-full bg-[#F3EFE9] px-7 py-3 font-condensed text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-[#3D2A1F] shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition-opacity hover:opacity-95 md:text-[0.82rem]"
                >
                  Furniture Enquiry
                </Link>
              </motion.div>
            </div>

            {/* Right — over linen */}
            <div className="flex flex-col justify-center md:ml-auto md:max-w-[22rem] md:text-right">
              <h2 className="font-condensed text-[1.75rem] font-semibold uppercase tracking-[0.1em] text-[#3D2A1F] md:text-[2rem] md:tracking-[0.12em] lg:text-[2.25rem]">
                Home Consultation
              </h2>
              <p className="mt-3 max-w-[18rem] font-hero text-[1.02rem] font-light leading-relaxed text-[#3D2A1F]/80 md:ml-auto md:text-[1.08rem]">
                Plan rooms end-to-end with material guidance, layouts, and
                made-to-order furniture for your space.
              </p>
              <motion.div
                whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="mt-6 inline-flex md:justify-end"
              >
                <Link
                  href="/contact"
                  className="inline-flex rounded-full bg-[#6B4A35] px-7 py-3 font-condensed text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_8px_24px_rgba(107,74,53,0.35)] transition-colors hover:bg-[#5C3A28] md:text-[0.82rem]"
                >
                  Home Consultation
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
