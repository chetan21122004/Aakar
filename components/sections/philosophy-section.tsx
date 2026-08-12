"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/scroll-motion";

export function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [alpineTranslateX, setAlpineTranslateX] = useState(-100);
  const [forestTranslateX, setForestTranslateX] = useState(100);
  const [titleOpacity, setTitleOpacity] = useState(1);
  const rafRef = useRef<number | null>(null);

  const updateTransforms = useCallback(() => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const animationStart = windowHeight;
    const animationEnd = windowHeight * 0.25;
    const progress = Math.max(
      0,
      Math.min(1, (animationStart - rect.top) / (animationStart - animationEnd))
    );

    setAlpineTranslateX((1 - progress) * -100);
    setForestTranslateX((1 - progress) * 100);
    setTitleOpacity(1 - progress);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateTransforms);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransforms();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateTransforms]);

  return (
    <section id="philosophy" className="overflow-hidden bg-background">
      <div
        ref={sectionRef}
        className="relative overflow-hidden px-6 md:px-12 lg:px-20"
      >
        <div className="relative w-full">
          <div
            className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
            style={{ opacity: titleOpacity }}
          >
            <h2 className="mx-auto max-w-5xl px-6 text-center font-serif text-[9vw] font-light leading-[1.05] tracking-tighter text-foreground md:text-[6.5vw] lg:text-[5vw]">
              Built with Honest Materials and Careful Craft
            </h2>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="overflow-hidden">
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-none will-change-transform"
                style={{
                  transform: `translate3d(${alpineTranslateX}%, 0, 0)`,
                  WebkitTransform: `translate3d(${alpineTranslateX}%, 0, 0)`,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1687422810663-c316494f725a?q=80&w=1200&auto=format&fit=crop"
                  alt="Craftsman hand-shaping a piece of solid wood"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6">
                  <span className="rounded-none bg-ink/90 px-4 py-2 text-sm font-medium text-sand backdrop-blur-md">
                    Hand-Finished
                  </span>
                </div>
              </div>
            </div>

            <div className="overflow-hidden">
              <div
                className="relative aspect-[4/3] overflow-hidden rounded-none will-change-transform"
                style={{
                  transform: `translate3d(${forestTranslateX}%, 0, 0)`,
                  WebkitTransform: `translate3d(${forestTranslateX}%, 0, 0)`,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1736506159893-22cca29b8018?q=80&w=1200&auto=format&fit=crop"
                  alt="Close-up of natural solid wood grain texture"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6">
                  <span className="rounded-none bg-[rgba(139,94,52,0.9)] px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                    Solid Wood
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pt-10 pb-8 md:px-12 md:pt-12 md:pb-10 lg:px-20">
        <StaggerContainer className="space-y-3 text-center" stagger={0.12}>
          <StaggerItem>
            <p className="text-xs font-semibold uppercase tracking-widest text-secondary">
              Our Philosophy
            </p>
          </StaggerItem>
          <StaggerItem>
            <p className="text-center font-serif text-3xl font-light leading-relaxed text-foreground">
              From solid wood frames to natural finishes and fine detailing, every Aakar Woodcraft piece is made with a focus on durability, comfort, and timeless design.
            </p>
          </StaggerItem>
          <StaggerItem className="pt-4">
            <a
              href="/process"
              className="inline-block border-b border-foreground pb-1 text-sm font-medium text-foreground transition-opacity hover:opacity-70"
            >
              Know Our Process
            </a>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
