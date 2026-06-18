"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const word = "AAKAR";

const sideImages = [
  {
    src: "https://images.unsplash.com/photo-1581428982868-e410dd047a90?q=80&w=1000&auto=format&fit=crop",
    alt: "Wooden coffee table beside a sofa",
    position: "left",
    span: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1736506159893-22cca29b8018?q=80&w=1000&auto=format&fit=crop",
    alt: "Close-up of dark wood grain texture",
    position: "left",
    span: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1758977403438-1b8546560d31?q=80&w=1000&auto=format&fit=crop",
    alt: "Modern dining table with upholstered chairs",
    position: "right",
    span: 1,
  },
  {
    src: "https://images.unsplash.com/photo-1685612213152-b995e1641013?q=80&w=1000&auto=format&fit=crop",
    alt: "Handcrafted wooden lounge chair",
    position: "right",
    span: 1,
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * 2;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Text fades out first (0 to 0.2)
  const textOpacity = Math.max(0, 1 - (scrollProgress / 0.2));
  
  // Image transforms start after text fades (0.2 to 1)
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));
  
  // Smooth interpolations
  const centerWidth = 100 - (imageProgress * 58); // 100% to 42%
  const centerHeight = 100 - (imageProgress * 30); // 100% to 70%
  const sideWidth = imageProgress * 22; // 0% to 22%
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + (imageProgress * 100); // -100% to 0%
  const sideTranslateRight = 100 - (imageProgress * 100); // 100% to 0%
  const borderRadius = imageProgress * 24; // 0px to 24px
  const gap = imageProgress * 16; // 0px to 16px
  
  // Vertical offset for side columns to move them up on mobile
  const sideTranslateY = -(imageProgress * 15); // Move up by 15% when fully expanded

  return (
    <section ref={sectionRef} className="relative bg-background">
      {/* Sticky container for scroll animation */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          {/* Bento Grid Container */}
          <div 
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ gap: `${gap}px`, padding: `${imageProgress * 16}px`, paddingBottom: `${60 + (imageProgress * 40)}px` }}
          >
            
            {/* Left Column */}
            <div 
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateLeft}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "left").map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Hero Image - Center */}
            <div 
              className="relative overflow-hidden will-change-transform"
              style={{
                width: `${centerWidth}%`,
                height: `${centerHeight}%`,
                flex: "0 0 auto",
                borderRadius: `${borderRadius}px`,
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1762529716272-b316f61502e7?q=80&w=2000&auto=format&fit=crop"
                alt="Modern living room styled with handcrafted wooden furniture"
                fill
                className="object-cover"
                priority
              />
              
              {/* Overlay Text - Fades out first */}
              <div 
                className="absolute inset-0 flex items-end overflow-hidden"
                style={{ opacity: textOpacity }}
              >
                <h1 className="w-full text-[22vw] font-medium leading-[0.8] tracking-tighter text-white">
                  {word.split("").map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block animate-[slideUp_0.8s_ease-out_forwards] opacity-0"
                      style={{
                        animationDelay: `${index * 0.08}s`,
                        transition: 'all 1.5s',
                        transitionTimingFunction: 'cubic-bezier(0.86, 0, 0.07, 1)',
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </h1>
              </div>
            </div>

            {/* Right Column */}
            <div 
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateRight}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "right").map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Scroll space to enable animation */}
      <div className="h-[200vh]" />

      {/* Tagline Section */}
      <div className="px-6 pt-32 pb-12 md:pt-48 md:px-12 md:pb-16 lg:px-20 lg:pt-56 lg:pb-20">
        <h2 className="mx-auto max-w-3xl text-center font-serif text-3xl leading-snug text-foreground md:text-4xl lg:text-5xl font-light">
          Custom Wooden Furniture Crafted for Modern Indian Homes
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-muted-foreground md:text-lg">
          Premium solid wood furniture, artistic collections, and made-to-order pieces designed with craftsmanship, comfort, and timeless style.
        </p>
      </div>

      {/* Hero CTAs */}
      <div className="flex flex-col items-center justify-center gap-4 px-6 pb-28 sm:flex-row md:pb-36 lg:pb-44">
        <a
          href="/collections"
          className="w-full bg-foreground px-8 py-4 text-center text-sm font-medium text-background transition-opacity hover:opacity-85 sm:w-auto"
        >
          Explore Collections
        </a>
        <a
          href="/contact"
          className="w-full border border-border px-8 py-4 text-center text-sm font-medium text-foreground transition-colors hover:bg-muted sm:w-auto"
        >
          Request a Quote
        </a>
      </div>
    </section>
  );
}
