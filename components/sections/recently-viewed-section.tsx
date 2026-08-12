"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { formatINR } from "@/lib/format";
import {
  catalogProducts,
  getDefaultVariant,
  type CatalogProduct,
} from "@/lib/products";
import { useCart } from "@/contexts/cart-context";
import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

const FINISH_SWATCH: Record<string, string> = {
  "Natural Oil": "#E8DFD0",
  "Matte Lacquer": "#C4A882",
  "Dark Stain": "#3D2A1F",
};

const RECENT_SLUGS = [
  "fluted-console",
  "dining-chair",
  "rounded-edge-console",
  "heritage-console",
  "coffee-table",
] as const;

const DISPLAY_IMAGE: Record<string, string> = {
  "fluted-console": "/images/product-cabinet.png",
  "dining-chair":
    "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop",
  "rounded-edge-console": "/images/product-wardrobe.png",
  "heritage-console": "/images/product-sofa.png",
  "coffee-table": "/images/product-coffee-table.png",
};

const ease = [0.22, 1, 0.36, 1] as const;

const SECTION_HEADING =
  "mb-5 text-center font-condensed text-[1.35rem] font-semibold uppercase tracking-[0.12em] text-ink md:mb-6 md:text-[1.65rem] md:tracking-[0.14em]";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: 0.08 + i * 0.08, ease },
  }),
};

function RecentCard({
  product,
  index,
  reduceMotion,
}: {
  product: CatalogProduct;
  index: number;
  reduceMotion: boolean | null;
}) {
  const { addItem } = useCart();
  const [wishlisted, setWishlisted] = useState(false);
  const defaultVariant = getDefaultVariant(product);
  const href = `/products/${product.slug}`;
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
    <motion.article
      custom={index}
      variants={cardVariants}
      whileHover={
        reduceMotion
          ? undefined
          : { y: -6, transition: { type: "spring", stiffness: 340, damping: 22 } }
      }
      className="group relative flex h-full flex-col rounded-[1.75rem] border border-[#c9b8a8]/80 bg-[#FFFBF7] p-4 pb-5 md:rounded-[2rem] md:p-5"
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          setWishlisted((w) => !w);
        }}
        className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#FFFBF7]/90 text-ink backdrop-blur-sm transition-colors hover:bg-white"
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={wishlisted}
      >
        <Heart
          size={17}
          strokeWidth={1.6}
          className={wishlisted ? "fill-ink text-ink" : "text-ink/70"}
        />
      </button>

      <Link
        href={href}
        className="relative mb-4 block aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-[#F3EFE9]"
      >
        <Image
          src={image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04] md:p-4"
        />
      </Link>

      <div className="mt-auto flex flex-col px-0.5">
        <Link href={href} className="block">
          <h3 className="font-condensed text-[0.95rem] font-semibold uppercase leading-tight tracking-[0.04em] text-ink md:text-[1.05rem]">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 font-condensed text-[0.95rem] font-medium tracking-[0.02em] text-ink md:text-[1.05rem]">
          {formatINR(product.basePricePaise)}
        </p>
        <div className="mt-2 flex items-center gap-1.5" aria-label="Available finishes">
          {swatches.map((finish) => (
            <span
              key={finish}
              title={finish}
              className="h-3 w-3 rounded-full border border-ink/15"
              style={{ backgroundColor: FINISH_SWATCH[finish] ?? "#C9B79A" }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-4 w-full rounded-full bg-ink py-2.5 font-condensed text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-[#F3EFE9] transition-opacity hover:opacity-90 md:py-3 md:text-[0.85rem]"
        >
          Add to Cart
        </button>
      </div>
    </motion.article>
  );
}

export function RecentlyViewedSection() {
  const reduceMotion = useReducedMotion();
  const products = RECENT_SLUGS.map((slug) =>
    catalogProducts.find((p) => p.slug === slug)
  ).filter(Boolean) as CatalogProduct[];

  return (
    <section className="bg-[#F3EFE9] px-5 py-10 md:px-10 md:py-12 lg:px-16">
      <div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease }}
          className={SECTION_HEADING}
        >
          Recently Viewed Products
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {products.map((product, i) => (
            <RecentCard
              key={product.id}
              product={product}
              index={i}
              reduceMotion={reduceMotion}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
