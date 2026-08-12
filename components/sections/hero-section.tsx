"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const slides = [
  {
    src: "/images/hero/hero-objects-spaces.png",
    alt: "Stone arched courtyard with a circular craft table at center",
  },
  {
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2400&auto=format&fit=crop",
    alt: "Dark dining room with solid wood table and low light",
  },
  {
    src: "https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=2400&auto=format&fit=crop",
    alt: "Moody modern interior with deep wood tones",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2400&auto=format&fit=crop",
    alt: "Dim architectural lounge with walnut furniture",
  },
  {
    src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2400&auto=format&fit=crop",
    alt: "Dark teal sofa and deep wood living room",
  },
  {
    src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2400&auto=format&fit=crop",
    alt: "Dim bedroom with dark wood accents",
  },
] as const;

const AUTO_MS = 6500;

export function HeroSection() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion]);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }, []);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length);
  }, []);

  return (
    <section
      className="relative h-[100svh] min-h-[560px] overflow-hidden bg-[#2a241f]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured spaces"
    >
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((slide, i) => {
          const active = i === index;
          return (
            <div
              key={slide.src}
              className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
              style={{
                opacity: active ? 1 : 0,
                pointerEvents: active ? "auto" : "none",
              }}
              aria-hidden={!active}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                quality={95}
                sizes="100vw"
                className="object-cover object-center brightness-[0.62] contrast-[1.08] saturate-[0.95]"
              />
            </div>
          );
        })}
        {/* Darken for white nav / headline contrast */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/50"
          aria-hidden
        />
      </div>

      {/* Bottom: headline left · arrow counter right */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-8 px-5 pb-8 md:px-10 md:pb-10 lg:px-16 lg:pb-12">
        <div
          className={`min-w-0 transition-all duration-700 ease-out ${
            entered && !reduceMotion
              ? "translate-y-0 opacity-100"
              : reduceMotion
                ? "opacity-100"
                : "translate-y-4 opacity-0"
          }`}
        >
          <h1 className="whitespace-nowrap font-hero text-[clamp(1.5rem,4.2vw,2.85rem)] font-normal leading-[1.05] tracking-[-0.015em] text-white">
            Objects. Spaces. Stories.
          </h1>
          <p className="mt-2 font-hero text-[clamp(0.8rem,1.15vw,0.95rem)] font-light leading-snug tracking-[0.01em] text-white/85 md:mt-2.5">
            Contemporary Form. Rooted in Craft.
          </p>
        </div>

        <div
          className="mb-1 flex shrink-0 items-center gap-5 md:gap-6"
          role="group"
          aria-label="Carousel controls"
        >
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous slide"
            className="flex h-8 w-8 items-center justify-center text-white/90 transition-opacity hover:text-white"
          >
            <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden>
              <path d="M7 1L1 6l6 5M1.5 6H21" stroke="currentColor" strokeWidth="1.25" />
            </svg>
          </button>

          <p
            className="min-w-[3.5rem] text-center font-hero text-[13px] font-light tracking-[0.08em] text-white tabular-nums md:text-[14px]"
            aria-live="polite"
          >
            {index + 1} / {slides.length}
          </p>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next slide"
            className="flex h-8 w-8 items-center justify-center text-white/90 transition-opacity hover:text-white"
          >
            <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden>
              <path d="M15 1l6 5-6 5M20.5 6H1" stroke="currentColor" strokeWidth="1.25" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
