"use client";

import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/data";

const featured = products.slice(0, 6);

export function ProductGridSection() {
  return (
    <section id="featured-products" className="bg-background">
      {/* Section Title */}
      <div className="flex flex-col items-start justify-between gap-4 px-6 py-20 md:flex-row md:items-end md:px-12 md:py-28 lg:px-20">
        <div>
          <h2 className="text-3xl font-serif font-light tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Made-to-Order Furniture for Every Space
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Explore signature furniture pieces crafted with solid wood, refined finishes, and customization options.
          </p>
        </div>
        <a
          href="/shop"
          className="border-b border-foreground pb-1 text-sm font-medium text-foreground transition-opacity hover:opacity-70 whitespace-nowrap"
        >
          Shop All →
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 px-6 pb-28 sm:grid-cols-2 md:px-12 lg:grid-cols-3 lg:px-20">
        {featured.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.name}
            category={product.category}
            price={product.price}
            image={product.image}
            href={`/shop/${product.slug}`}
          />
        ))}
      </div>
    </section>
  );
}
