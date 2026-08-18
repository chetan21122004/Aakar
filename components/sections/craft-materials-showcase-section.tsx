"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: 0.06 + i * 0.07, ease },
  }),
};

const images = {
  plank: "/images/craft/woodstack.jpg",
  fluted: "/images/craft/detail.jpg",
  leg: "/images/craft/chair.jpg",
  featured: "/images/craft/featured.jpg",
} as const;

function Tile({
  src,
  alt,
  className,
  index,
  reduceMotion,
  children,
  sizes = "(max-width: 768px) 100vw, 40vw",
}: {
  src: string;
  alt: string;
  className?: string;
  index: number;
  reduceMotion: boolean | null;
  children?: React.ReactNode;
  sizes?: string;
}) {
  return (
    <motion.div
      custom={index}
      variants={tileVariants}
      whileHover={
        reduceMotion
          ? undefined
          : { y: -3, transition: { type: "spring", stiffness: 380, damping: 24 } }
      }
      className={`group relative overflow-hidden rounded-[1.75rem] md:rounded-[2rem] ${className ?? ""}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      {children}
    </motion.div>
  );
}

export function CraftMaterialsShowcaseSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="overflow-x-clip bg-background px-5 py-10 md:px-10 md:py-12 lg:px-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {/* Bottom: plank | stack | featured CTA */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-4 lg:gap-5">
          <Tile
            src={images.plank}
            alt="Stacked timber planks with natural grain"
            index={0}
            reduceMotion={reduceMotion}
            className="aspect-[3/4] md:col-span-3 md:aspect-auto md:min-h-[320px] lg:min-h-[360px]"
            sizes="(max-width: 768px) 50vw, 25vw"
          />

          <div className="grid grid-cols-2 gap-3 md:col-span-3 md:grid-cols-1 md:gap-4 lg:gap-5">
            <Tile
              src={images.fluted}
              alt="Wood cabinet surface detail"
              index={1}
              reduceMotion={reduceMotion}
              className="aspect-square md:aspect-[4/3] md:min-h-0"
              sizes="(max-width: 768px) 45vw, 20vw"
            />
            <Tile
              src={images.leg}
              alt="Solid wood furniture leg and joinery"
              index={2}
              reduceMotion={reduceMotion}
              className="aspect-square md:aspect-[4/3] md:min-h-0"
              sizes="(max-width: 768px) 45vw, 20vw"
            />
          </div>

          <Tile
            src={images.featured}
            alt="Solid wood dining table in a warm interior"
            index={3}
            reduceMotion={reduceMotion}
            className="aspect-[4/3] md:col-span-6 md:aspect-auto md:min-h-[320px] lg:min-h-[360px]"
            sizes="(max-width: 768px) 100vw, 50vw"
          >
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
              aria-hidden
            />
            <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 lg:p-8">
              <h3 className="max-w-md font-condensed text-[1.15rem] font-semibold uppercase leading-snug tracking-[0.04em] text-white md:text-[1.35rem]">
                Your Vision, Our Craft: Bespoke Commissions.
              </h3>
              <p className="mt-2 max-w-sm font-hero text-[0.88rem] font-light leading-relaxed text-white/80 md:text-[0.95rem]">
                Custom-designed creations made to mark your space - form,
                finish, and fit.
              </p>
              <motion.div
                whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="mt-4 inline-flex md:mt-5"
              >
                <Link
                  href="/contact"
                  className="inline-flex rounded-full bg-primary px-6 py-3 font-condensed text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-secondary md:px-7 md:text-[0.8rem]"
                >
                  Consult With Us
                </Link>
              </motion.div>
            </div>
          </Tile>
        </div>
      </motion.div>
    </section>
  );
}
