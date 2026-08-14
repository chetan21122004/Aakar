"use client";

import { catalogProducts, type CatalogProduct } from "@/lib/products";
import { ProductGridCard } from "@/components/product-grid-card";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/scroll-motion";

const RECENT_SLUGS = [
  "fluted-console",
  "dining-chair",
  "rounded-edge-console",
  "heritage-console",
  "coffee-table",
] as const;

const DISPLAY_IMAGE: Record<string, string> = {
  "fluted-console": "/catalog/hampi-rift-console.webp",
  "dining-chair": "/catalog/still-mandu-lounge-chair.webp",
  "rounded-edge-console": "/catalog/hampi-rift-media-unit.webp",
  "heritage-console": "/catalog/bishnupur-console.webp",
  "coffee-table": "/catalog/still-mandu-coffee-table.webp",
};

const SECTION_HEADING =
  "mb-5 text-center font-condensed text-[1.35rem] font-semibold uppercase tracking-[0.12em] text-ink md:mb-6 md:text-[1.65rem] md:tracking-[0.14em]";

export function RecentlyViewedSection() {
  const products = RECENT_SLUGS.map((slug) =>
    catalogProducts.find((p) => p.slug === slug)
  ).filter(Boolean) as CatalogProduct[];

  return (
    <section className="bg-background px-5 py-10 md:px-10 md:py-12 lg:px-16">
      <FadeInUp>
        <h2 className={SECTION_HEADING}>Recently Viewed Products</h2>

        <StaggerContainer
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:gap-5"
          stagger={0.06}
        >
          {products.map((product) => (
            <StaggerItem key={product.id} className="h-full">
              <ProductGridCard
                product={product}
                image={DISPLAY_IMAGE[product.slug]}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </FadeInUp>
    </section>
  );
}
