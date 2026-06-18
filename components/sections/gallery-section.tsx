"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

export function GallerySection() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState("100vh");
  const [translateX, setTranslateX] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastScrollRef = useRef(0);

  const images = [
    { src: "https://images.unsplash.com/photo-1762529716272-b316f61502e7?q=80&w=1600&auto=format&fit=crop", alt: "Modern living room styled with handcrafted wooden furniture" },
    { src: "https://images.unsplash.com/photo-1585128903994-9788298932a6?q=80&w=1600&auto=format&fit=crop", alt: "Solid wood dining table with chairs" },
    { src: "https://images.unsplash.com/photo-1736506159893-22cca29b8018?q=80&w=1600&auto=format&fit=crop", alt: "Close-up of dark wood grain texture" },
    { src: "https://images.unsplash.com/photo-1581428982868-e410dd047a90?q=80&w=1600&auto=format&fit=crop", alt: "Wooden coffee table beside a sofa" },
    { src: "https://images.unsplash.com/photo-1687422810663-c316494f725a?q=80&w=1600&auto=format&fit=crop", alt: "Craftsman shaping a piece of wood by hand" },
    { src: "https://images.unsplash.com/photo-1769690398694-9c5d5ca4b4ea?q=80&w=1600&auto=format&fit=crop", alt: "Bedroom with a large wooden wardrobe" },
    { src: "https://images.unsplash.com/photo-1761591671882-b1c7b84bd0d6?q=80&w=1600&auto=format&fit=crop", alt: "Wooden bed frame with bedside table and lamp" },
    { src: "https://images.unsplash.com/photo-1685612213152-b995e1641013?q=80&w=1600&auto=format&fit=crop", alt: "Vintage-style wooden armchair" },
  ];

  // Calculate section height based on content width
  useEffect(() => {
    const calculateHeight = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      // Height = viewport height + the extra scroll needed to reveal all content
      const totalHeight = viewportHeight + (containerWidth - viewportWidth);
      setSectionHeight(`${totalHeight}px`);
    };

    // Small delay to ensure container is rendered
    const timer = setTimeout(calculateHeight, 100);
    window.addEventListener("resize", calculateHeight);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateHeight);
    };
  }, []);

  const updateTransform = useCallback(() => {
    if (!galleryRef.current || !containerRef.current) return;
    
    const rect = galleryRef.current.getBoundingClientRect();
    const containerWidth = containerRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    
    // Total scroll distance needed to reveal all images
    const totalScrollDistance = containerWidth - viewportWidth;
    
    // Current scroll position within this section
    const scrolled = Math.max(0, -rect.top);
    
    // Progress from 0 to 1
    const progress = Math.min(1, scrolled / totalScrollDistance);
    
    // Calculate new translateX
    const newTranslateX = progress * -totalScrollDistance;
    
    setTranslateX(newTranslateX);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      // Use requestAnimationFrame for smooth updates
      rafRef.current = requestAnimationFrame(updateTransform);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransform();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateTransform]);

  return (
    <>
      {/* Section Title */}
      <div className="bg-background px-6 pt-20 pb-10 md:px-12 md:pt-28 lg:px-20">
        <h2 className="text-3xl font-serif font-light tracking-tight text-foreground md:text-4xl">
          Spaces, Details and Finished Pieces
        </h2>
      </div>

    <section
      id="gallery"
      ref={galleryRef}
      className="relative bg-background"
      style={{ height: sectionHeight }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full items-center">
          {/* Horizontal scrolling container */}
          <div 
            ref={containerRef}
            className="flex gap-6 px-6"
            style={{
              transform: `translate3d(${translateX}px, 0, 0)`,
              WebkitTransform: `translate3d(${translateX}px, 0, 0)`,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              perspective: 1000,
              WebkitPerspective: 1000,
              touchAction: 'pan-y',
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="relative h-[70vh] w-[85vw] flex-shrink-0 overflow-hidden rounded-2xl md:w-[60vw] lg:w-[45vw]"
                style={{
                  transform: 'translateZ(0)',
                  WebkitTransform: 'translateZ(0)',
                }}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index < 3}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
