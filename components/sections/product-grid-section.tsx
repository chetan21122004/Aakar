"use client";

import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { catalogProducts } from "@/lib/products";

const bestSellers = catalogProducts.slice(0, 6);

export function ProductGridSection() {
  return (
    <section id="best-sellers" className="bg-background">
      <div className="flex flex-col items-start justify-between gap-4 px-6 py-20 md:flex-row md:items-end md:px-12 md:py-28 lg:px-20">
        <div>
          <h2 className="type-h2">Best Sellers</h2>
          <p className="type-body mt-4 max-w-md">
            Our most-loved pieces — explore live pricing and variant options, then enquire for a quote.
          </p>
        </div>
        <Link
          href="/collections"
          className="btn-outline-sm whitespace-nowrap"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-12 px-6 pb-28 sm:grid-cols-2 md:px-12 lg:grid-cols-3 lg:px-20">
        {bestSellers.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
