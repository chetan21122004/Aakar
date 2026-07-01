"use client";

import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { catalogProducts } from "@/lib/products";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/scroll-motion";

const bestSellers = catalogProducts.slice(0, 6);

export function ProductGridSection() {
  return (
    <section id="best-sellers" className="bg-background">
      <FadeInUp className="flex flex-col items-start justify-between gap-4 px-6 pt-12 pb-8 md:flex-row md:items-end md:px-12 md:pt-16 md:pb-10 lg:px-20">
        <div>
          <h2 className="type-h2">Best Sellers</h2>
          <p className="type-body mt-4 max-w-md">
            Our most-loved pieces — explore live pricing and variant options, then enquire for a quote.
          </p>
        </div>
        <Link href="/collections" className="btn-outline-sm whitespace-nowrap">
          View All
        </Link>
      </FadeInUp>

      <StaggerContainer
        className="grid grid-cols-1 gap-x-8 gap-y-12 px-6 pb-12 sm:grid-cols-2 md:px-12 md:pb-16 lg:grid-cols-3 lg:px-20"
        stagger={0.1}
      >
        {bestSellers.map((product) => (
          <StaggerItem key={product.id}>
            <ProductCard product={product} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
