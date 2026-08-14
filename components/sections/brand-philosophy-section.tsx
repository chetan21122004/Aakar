"use client";

import { FadeInUp } from "@/components/motion/scroll-motion";

const SECTION_HEADING =
  "mb-5 text-center font-condensed text-[1.35rem] font-semibold uppercase tracking-[0.12em] text-ink md:mb-6 md:text-[1.65rem] md:tracking-[0.14em]";

export function BrandPhilosophySection() {
  return (
    <section className="bg-background px-5 py-8 md:px-10 md:py-10 lg:px-16">
      <FadeInUp className="mx-auto max-w-3xl text-center">
        <h2 className={SECTION_HEADING}>Brand Philosophy</h2>
        <p className="mt-4 font-hero text-[1.15rem] font-light leading-relaxed text-ink/70 md:mt-5 md:text-[1.35rem] lg:text-[1.45rem]">
          From solid wood frames to natural finishes and fine detailing, every
          Aakar Woodcraft piece is made with a focus on durability, comfort,
          and timeless design.
        </p>
      </FadeInUp>
    </section>
  );
}
