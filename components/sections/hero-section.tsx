"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const heroImage = {
  src: "/images/hero/hero-objects-spaces.png",
  alt: "Stone arched courtyard with a circular craft table at center",
} as const;

const HERO_VIDEO = "/images/hero/hero_bg.mp4";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [entered, setEntered] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

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
    if (reduceMotion) return;
    const video = videoRef.current;
    if (!video) return;

    let revealed = false;
    let fading = false;
    let fadeTimer = 0;

    const isFullyBuffered = () => {
      if (!video.duration || !Number.isFinite(video.duration)) return false;
      if (video.buffered.length === 0) return false;
      return video.buffered.end(video.buffered.length - 1) >= video.duration - 0.05;
    };

    const keepRate = () => {
      if (video.playbackRate !== 0.75) video.playbackRate = 0.75;
    };

    const onPlaying = () => {
      keepRate();
      if (!revealed || fading) return;
      fading = true;
      window.cancelAnimationFrame(fadeTimer);
      fadeTimer = window.requestAnimationFrame(() => {
        fadeTimer = window.requestAnimationFrame(() => setVideoReady(true));
      });
    };

    const startCrossfade = () => {
      if (revealed) return;
      revealed = true;
      video.playbackRate = 0.75;
      void video.play().then(onPlaying).catch(() => undefined);
    };

    const onProgress = () => {
      if (isFullyBuffered()) startCrossfade();
    };

    video.playbackRate = 0.75;
    video.addEventListener("progress", onProgress);
    video.addEventListener("canplaythrough", onProgress);
    video.addEventListener("loadeddata", onProgress);
    video.addEventListener("play", keepRate);
    video.addEventListener("playing", onPlaying);
    if (isFullyBuffered() || video.readyState >= 4) onProgress();

    return () => {
      video.removeEventListener("progress", onProgress);
      video.removeEventListener("canplaythrough", onProgress);
      video.removeEventListener("loadeddata", onProgress);
      video.removeEventListener("play", keepRate);
      video.removeEventListener("playing", onPlaying);
      window.cancelAnimationFrame(fadeTimer);
    };
  }, [reduceMotion]);

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
        {!reduceMotion && (
          <video
            ref={videoRef}
            className={`pointer-events-none absolute inset-0 h-full w-full origin-center scale-[1.25] object-cover object-center transition-opacity duration-[1800ms] ease-in-out ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
            src={HERO_VIDEO}
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
            tabIndex={-1}
          />
        )}
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
