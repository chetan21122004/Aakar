"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import { toast } from "sonner";
import { formatINR } from "@/lib/format";
import {
  catalogProducts,
  getDefaultVariant,
  type CatalogProduct,
} from "@/lib/products";
import { useCart } from "@/contexts/cart-context";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/scroll-motion";

const journeys = [
  {
    title: "Premium Furniture",
    href: "/shop",
    image: "/catalog/still-mandu-dining-table.webp",
    alt: "Still Mandu dining table in an architectural interior",
  },
  {
    title: "Modular Homes",
    href: "/the-console",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
    alt: "Contemporary modular home with wood cladding",
  },
] as const;

const materials = [
  {
    name: "Sandstone",
    image: "/images/featured/material-stone.jpg",
  },
  {
    name: "Aged Wood",
    image: "/images/featured/material-wood.jpg",
  },
  {
    name: "Linen Ash",
    image: "/images/featured/material-linen.jpg",
  },
  {
    name: "Metal Accent",
    image: "/images/featured/material-metal.jpg",
  },
] as const;

const gallery = [
  {
    src: "/images/featured/arch-palace.jpg",
    alt: "Mandu palace arches rising above the horizon",
    className: "aspect-[4/5]",
  },
  {
    src: "/images/featured/palace-water.jpg",
    alt: "Historic hill fort reflected above still water channels",
    className: "aspect-[4/5]",
  },
] as const;

/** Five Echoes of Mandu collection picks */
const FEATURED_SLUGS = [
  "signature-dining-table",
  "dining-chair",
  "fluted-console",
  "coffee-table",
  "heritage-console",
] as const;

const DISPLAY_NAME: Record<string, string> = {
  "signature-dining-table": "Mandu Dining Table",
  "dining-chair": "Arch Lounge Chair",
  "fluted-console": "Colonnade Console",
  "coffee-table": "Reservoir Table",
  "heritage-console": "Pavilion Console",
};

const DISPLAY_IMAGE: Record<string, string> = {
  "signature-dining-table": "/images/featured/product-dining.jpg",
  "dining-chair": "/images/featured/product-lounge.jpg",
  "fluted-console": "/images/featured/product-console.jpg",
  "coffee-table": "/images/featured/product-coffee.jpg",
  "heritage-console": "/images/featured/product-pavilion.jpg",
};

const SECTION_HEADING =
  "mb-5 text-center font-condensed text-[1.35rem] font-semibold uppercase tracking-[0.12em] text-ink md:mb-6 md:text-[1.65rem] md:tracking-[0.14em]";

const FINISH_SWATCH: Record<string, string> = {
  "Natural Oil": "#E8DFD0",
  "Matte Lacquer": "#C4A882",
  "Dark Stain": "#3D2A1F",
};

function ArchPerspectiveSketch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      >
        {/* Outer arch */}
        <path
          d="M30 248 V112 C30 56 72 24 100 24 C128 24 170 56 170 112 V248"
          strokeWidth="1.25"
        />
        {/* Inner arch */}
        <path
          d="M50 248 V120 C50 74 76 44 100 44 C124 44 150 74 150 120 V248"
          strokeWidth="1.05"
        />
        {/* Side walls */}
        <path d="M20 248 V132" strokeWidth="0.95" opacity="0.55" />
        <path d="M180 248 V132" strokeWidth="0.95" opacity="0.55" />

        {/* Base line + ground hatching */}
        <path d="M20 248 H180" strokeWidth="1.05" />
        <path d="M42 240 H78" strokeWidth="0.85" opacity="0.35" />
        <path d="M122 240 H160" strokeWidth="0.85" opacity="0.35" />

        {/* Construction ticks */}
        <path d="M58 34 H88" strokeWidth="0.9" opacity="0.45" />
        <path d="M112 34 H142" strokeWidth="0.9" opacity="0.45" />

        {/* Top reference line */}
        <path d="M40 24 H160" strokeWidth="0.9" opacity="0.35" />
      </g>
    </svg>
  );
}

function ArchElevationSketch({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      >
        {/* Outer elevation arch */}
        <path
          d="M22 248 V96 C22 46 52 18 80 18 C108 18 138 46 138 96 V248"
          strokeWidth="1.25"
        />
        {/* Inner elevation arch */}
        <path
          d="M38 248 V105 C38 62 56 40 80 40 C104 40 122 62 122 105 V248"
          strokeWidth="1.05"
        />

        {/* Side reference lines */}
        <path d="M12 248 V142" strokeWidth="0.95" opacity="0.55" />
        <path d="M148 248 V142" strokeWidth="0.95" opacity="0.55" />

        {/* Baseline + mid reference */}
        <path d="M12 248 H148" strokeWidth="1.05" />
        <path d="M30 12 H130" strokeWidth="0.9" opacity="0.4" />
        <path d="M48 206 H112" strokeWidth="0.85" opacity="0.45" />
        <path d="M48 216 H112" strokeWidth="0.85" opacity="0.35" />
      </g>
    </svg>
  );
}

function JourneyCard({
  item,
  style,
}: {
  item: (typeof journeys)[number];
  style?: MotionStyle;
}) {
  return (
    <motion.div style={style} className="will-change-transform">
      <Link
        href={item.href}
        className="group relative block aspect-[5/4] overflow-hidden rounded-[1.75rem] shadow-[0_18px_40px_-28px_rgba(48,42,38,0.45)] md:aspect-[16/11] md:rounded-[2rem]"
      >
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-transparent"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 lg:p-8">
          <p className="font-condensed text-[1.15rem] font-semibold uppercase tracking-[0.1em] text-white md:text-[1.35rem]">
            {item.title}
          </p>
          <span className="mt-3 inline-flex rounded-full bg-primary px-5 py-2 font-condensed text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 group-hover:bg-secondary md:mt-3.5 md:px-6 md:text-[0.78rem]">
            Explore
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function JourneySplit() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const leftX = useTransform(
    scrollYProgress,
    [0, 0.75],
    reduceMotion ? ["0%", "0%"] : ["-55%", "0%"]
  );
  const rightX = useTransform(
    scrollYProgress,
    [0, 0.75],
    reduceMotion ? ["0%", "0%"] : ["55%", "0%"]
  );
  const leftRotate = useTransform(
    scrollYProgress,
    [0, 0.75],
    reduceMotion ? [0, 0] : [-8, 0]
  );
  const rightRotate = useTransform(
    scrollYProgress,
    [0, 0.75],
    reduceMotion ? [0, 0] : [8, 0]
  );
  const cardScale = useTransform(
    scrollYProgress,
    [0, 0.75],
    reduceMotion ? [1, 1] : [0.88, 1]
  );
  const cardOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.55],
    reduceMotion ? [1, 1, 1] : [0.35, 0.75, 1]
  );
  const gap = useTransform(
    scrollYProgress,
    [0, 0.75],
    reduceMotion ? ["1rem", "1rem"] : ["2.75rem", "1rem"]
  );
  const titleY = useTransform(
    scrollYProgress,
    [0, 0.55],
    reduceMotion ? [0, 0] : [28, 0]
  );
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.35],
    reduceMotion ? [1, 1] : [0, 1]
  );
  const dividerScale = useTransform(
    scrollYProgress,
    [0.35, 0.85],
    reduceMotion ? [1, 1] : [0, 1]
  );

  return (
    <div ref={ref} className="mb-8 md:mb-10">
      <motion.h2
        style={{ y: titleY, opacity: titleOpacity }}
        className={SECTION_HEADING}
      >
        Journey Split
      </motion.h2>

      <motion.div
        className="relative grid grid-cols-1 md:grid-cols-2"
        style={{ gap }}
      >
        {/* Desktop center spark line as cards meet */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[18%] bottom-[18%] z-10 hidden w-px origin-center bg-gradient-to-b from-transparent via-[#8B5E3C]/55 to-transparent md:block"
          style={{ scaleY: dividerScale }}
        />

        <JourneyCard
          item={journeys[0]}
          style={{
            x: leftX,
            rotate: leftRotate,
            scale: cardScale,
            opacity: cardOpacity,
          }}
        />
        <JourneyCard
          item={journeys[1]}
          style={{
            x: rightX,
            rotate: rightRotate,
            scale: cardScale,
            opacity: cardOpacity,
          }}
        />
      </motion.div>
    </div>
  );
}

function FeaturedProductCard({ product }: { product: CatalogProduct }) {
  const { addItem } = useCart();
  const defaultVariant = getDefaultVariant(product);
  const href = `/products/${product.slug}`;
  const title = DISPLAY_NAME[product.slug] ?? product.name;
  const image = DISPLAY_IMAGE[product.slug] ?? product.images[0];
  const swatches = product.options.finish.slice(0, 3);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      variantId: defaultVariant.id,
      productSlug: product.slug,
      name: product.name,
      image: product.images[0],
      options: defaultVariant.options,
      pricePaise: defaultVariant.pricePaise,
    });
    toast.success("Added to cart", { description: product.name });
  };

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-border/60 bg-card p-3.5 pb-3.5 shadow-[0_1px_0_rgba(48,42,38,0.04)] transition-shadow duration-300 hover:shadow-[0_10px_28px_rgba(48,42,38,0.07)] md:p-4">
      <Link
        href={href}
        className="relative mb-3 block aspect-[4/5] overflow-hidden rounded-xl bg-background"
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </Link>

      <div className="flex flex-1 flex-col px-0.5">
        <Link href={href} className="block">
          <h3 className="font-condensed text-[0.95rem] font-semibold uppercase leading-tight tracking-[0.04em] text-ink md:text-[1.05rem]">
            {title}
          </h3>
        </Link>

        <div className="mt-1.5 flex items-center gap-2">
          <p className="font-condensed text-[0.95rem] font-medium tracking-[0.02em] text-ink md:text-[1.05rem]">
            {formatINR(product.basePricePaise)}
          </p>
          <div className="flex items-center gap-1.5" aria-label="Available finishes">
            {swatches.map((finish) => (
              <span
                key={finish}
                title={finish}
                className="h-2.5 w-2.5 rounded-full border border-ink/15"
                style={{ backgroundColor: FINISH_SWATCH[finish] ?? "#C9B79A" }}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-3.5 w-full rounded-full bg-primary py-2.5 font-condensed text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-secondary md:mt-4 md:py-3 md:text-[0.85rem]"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export function CraftDetailsSection() {
  const featured = FEATURED_SLUGS.map((slug) =>
    catalogProducts.find((p) => p.slug === slug)
  ).filter(Boolean) as CatalogProduct[];

  return (
    <section className="overflow-x-clip bg-background px-5 py-10 md:px-10 md:py-12 lg:px-16">
      <JourneySplit />

      {/* Featured Furniture - Echoes of Mandu */}
      <FadeInUp>
        <h2 className={SECTION_HEADING}>Echoes of Mandu</h2>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-6 xl:gap-8">
          {/* Left: copy + sketches */}
          <div className="lg:col-span-4">
            <p className="mb-3 font-condensed text-[0.75rem] font-medium uppercase tracking-[0.22em] text-ink/55 md:text-[0.8rem]">
              Featured Furniture
            </p>
            <p className="max-w-md font-hero text-[0.98rem] font-normal leading-[1.65] text-ink/68 md:text-[1.05rem]">
              Inspired by Mandu - once a city of step-wells, reservoirs, and
              arched repetition - restated as quiet, minimal architectural form
              for contemporary living.
            </p>

            <div className="mt-7 flex items-end gap-3 text-ink/55 md:mt-8 md:gap-4">
              <ArchPerspectiveSketch className="h-40 w-auto sm:h-48 md:h-52" />
              <ArchElevationSketch className="h-36 w-auto sm:h-44 md:h-48" />
            </div>
          </div>

          {/* Middle: material palette */}
          <div className="lg:col-span-3 lg:pt-1">
            <p className="mb-6 text-center font-condensed text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink md:mb-7 lg:text-left">
              Material Palette
            </p>
            <div className="mx-auto grid max-w-[230px] grid-cols-2 gap-x-7 gap-y-7 sm:max-w-[250px] lg:mx-0">
              {materials.map((m) => (
                <div key={m.name} className="flex flex-col items-center gap-2.5">
                  <span className="relative h-[4.35rem] w-[4.35rem] overflow-hidden rounded-full border border-ink/10 shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)] md:h-[4.85rem] md:w-[4.85rem]">
                    <Image
                      src={m.image}
                      alt=""
                      fill
                      sizes="78px"
                      className="object-cover"
                    />
                  </span>
                  <span className="text-center font-condensed text-[0.7rem] font-medium uppercase tracking-[0.14em] text-ink/72">
                    {m.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Mandu inspiration gallery */}
          <StaggerContainer
            className="grid grid-cols-2 gap-3 md:gap-3.5 lg:col-span-5"
            stagger={0.1}
          >
            {gallery.map((shot) => (
              <StaggerItem
                key={shot.src}
                className={`group relative overflow-hidden rounded-[1.5rem] md:rounded-[1.85rem] ${shot.className}`}
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 28vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </FadeInUp>

      {/* Five Mandu collection recommendations */}
      <FadeInUp className="mt-8 md:mt-10 lg:mt-10">
        <StaggerContainer
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:gap-5"
          stagger={0.06}
        >
          {featured.map((product) => (
            <StaggerItem key={product.id} className="h-full">
              <FeaturedProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </FadeInUp>
    </section>
  );
}
