"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const heroImage = {
  src: "/images/hero/hero-objects-spaces.png",
  alt: "Stone arched courtyard with a circular craft table at center",
} as const;

export function HeroSection() {
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

  return (
    <section className="relative h-[100svh] min-h-[560px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 px-5 pb-8 md:px-10 md:pb-10 lg:px-16 lg:pb-12">
        <div
          className={`min-w-0 transition-all duration-700 ease-out ${
            entered && !reduceMotion
              ? "translate-y-0 opacity-100"
              : reduceMotion
                ? "opacity-100"
                : "translate-y-4 opacity-0"
          }`}
        >
          <h1 className="whitespace-nowrap font-hero text-[clamp(1.5rem,4.2vw,2.85rem)] font-normal leading-[1.05] tracking-[-0.015em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
            Objects. Spaces. Stories.
          </h1>
          <p className="mt-2 font-hero text-[clamp(0.8rem,1.15vw,0.95rem)] font-light leading-snug tracking-[0.01em] text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)] md:mt-2.5">
            Contemporary Form. Rooted in Craft.
          </p>
        </div>
      </div>
    </section>
  );
}
