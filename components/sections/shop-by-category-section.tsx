"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/data";
import { catalogProducts, type CatalogProduct } from "@/lib/products";
import { ProductGridCard } from "@/components/product-grid-card";
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

const newArrivalsFallback = catalogProducts.slice(0, 5);

type ShopByCategorySectionProps = {
  products?: CatalogProduct[];
};

export function ShopByCategorySection({ products = newArrivalsFallback }: ShopByCategorySectionProps) {
  const newArrivals = products.slice(0, 5);

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
                className="flex h-full min-w-0 items-center gap-2 overflow-hidden rounded-full border border-border/70 bg-card/60 py-2.5 pl-2 pr-2.5 transition-all duration-300 hover:border-primary/40 hover:bg-card md:gap-2.5 md:py-3 md:pl-2.5 md:pr-3"
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
              <ProductGridCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </FadeInUp>
    </section>
  );
}
