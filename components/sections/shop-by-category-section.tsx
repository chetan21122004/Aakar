"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { categories } from "@/lib/data";
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

const categoryLabels: Record<string, string> = {
  consoles: "Consoles",
  "dining-tables": "Dining",
  "coffee-tables": "Tables",
  chairs: "Seating",
  beds: "Beds",
  sofas: "Sofas",
  wardrobes: "Wardrobe",
  cabinets: "Cabinets",
};

const shopCategories = categories.map((c) => ({
  label: categoryLabels[c.slug] ?? c.name,
  slug: c.slug,
  image: c.image,
}));

const newArrivals = catalogProducts.slice(0, 5);

function NewArrivalCard({ product }: { product: CatalogProduct }) {
  const { addItem } = useCart();
  const [wishlisted, setWishlisted] = useState(false);
  const defaultVariant = getDefaultVariant(product);
  const href = `/products/${product.slug}`;

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

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted((w) => !w);
  };

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-[#c9b8a8]/60 bg-[#FFFBF7] p-3.5 pb-3.5 shadow-[0_1px_0_rgba(48,42,38,0.04)] transition-shadow duration-300 hover:shadow-[0_10px_28px_rgba(48,42,38,0.07)] md:p-4">
      <div className="relative mb-3 aspect-[4/5] overflow-hidden rounded-xl bg-[#F6EFE5]">
        <Link href={href} className="absolute inset-0 block">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </Link>
        <button
          type="button"
          onClick={handleWishlist}
          className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#FFFBF7]/90 text-ink backdrop-blur-sm transition-colors hover:bg-white md:h-9 md:w-9"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
        >
          <Heart
            size={16}
            strokeWidth={1.6}
            className={wishlisted ? "fill-ink text-ink" : "text-ink"}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-0.5">
        <Link href={href} className="block">
          <h3 className="font-condensed text-[0.95rem] font-semibold uppercase leading-tight tracking-[0.04em] text-ink md:text-[1.05rem]">
            {product.name}
          </h3>
          <p className="mt-1 font-condensed text-[0.95rem] font-medium tracking-[0.02em] text-ink md:text-[1.05rem]">
            {formatINR(product.basePricePaise)}
          </p>
          <p className="mt-0.5 font-condensed text-[0.75rem] font-normal uppercase tracking-[0.08em] text-muted-foreground">
            {product.category}
          </p>
        </Link>

        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-3.5 w-full rounded-full bg-ink py-2.5 font-condensed text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-[#F6EFE5] transition-opacity hover:opacity-90 md:mt-4 md:py-3 md:text-[0.85rem]"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export function ShopByCategorySection() {
  return (
    <section className="bg-background px-5 py-10 md:px-10 md:py-12 lg:px-16">
      <FadeInUp className="mb-8 md:mb-10">
        <h2 className="mb-5 text-center font-condensed text-[1.35rem] font-semibold uppercase tracking-[0.12em] text-ink md:mb-6 md:text-[1.65rem] md:tracking-[0.14em]">
          Shop by Furniture Category
        </h2>

        <StaggerContainer
          className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-3 lg:grid-cols-8 lg:gap-2.5"
          stagger={0.05}
        >
          {shopCategories.map((cat) => (
            <StaggerItem key={cat.slug} className="min-w-0">
              <Link
                href="/shop"
                className="flex h-full min-w-0 items-center gap-2 overflow-hidden rounded-full border border-[#b9a594]/70 bg-[#FFFBF7]/60 py-2.5 pl-2 pr-2.5 transition-all duration-300 hover:border-ink/40 hover:bg-[#FFFBF7] md:gap-2.5 md:py-3 md:pl-2.5 md:pr-3"
              >
                <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full md:h-10 md:w-10">
                  <Image
                    src={cat.image}
                    alt=""
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </span>
                <span className="min-w-0 truncate font-condensed text-[0.78rem] font-semibold uppercase tracking-[0.06em] text-ink md:text-[0.85rem] lg:tracking-[0.04em]">
                  {cat.label}
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </FadeInUp>

      <FadeInUp>
        <h2 className="mb-5 text-center font-condensed text-[1.35rem] font-semibold uppercase tracking-[0.12em] text-ink md:mb-6 md:text-[1.65rem] md:tracking-[0.14em]">
          New Arrivals
        </h2>

        <StaggerContainer
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:gap-5"
          stagger={0.06}
        >
          {newArrivals.map((product) => (
            <StaggerItem key={product.id} className="h-full">
              <NewArrivalCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </FadeInUp>
    </section>
  );
}
