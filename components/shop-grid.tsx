"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { conceptCollections } from "@/lib/concepts"
import type { CatalogProduct } from "@/lib/products"

const filters = [
  { label: "All pieces", slug: "all" },
  ...conceptCollections.map((collection) => ({ label: collection.name, slug: collection.slug })),
]

type ShopGridProps = {
  products: CatalogProduct[]
}

export function ShopGrid({ products }: ShopGridProps) {
  const [activeFilter, setActiveFilter] = useState("all")

  const activeCollection = conceptCollections.find((collection) => collection.slug === activeFilter)
  const filteredProducts = activeCollection
    ? products.filter((product) => activeCollection.productSlugs.includes(product.slug))
    : products

  return (
    <div>
      <div className="mb-12 flex flex-wrap gap-3 rounded-[1.5rem] border border-ink/10 bg-stone p-3">
        {filters.map((filter) => (
          <button
            key={filter.slug}
            onClick={() => setActiveFilter(filter.slug)}
            className={`rounded-full border px-5 py-2 font-condensed text-sm font-semibold uppercase tracking-[.08em] transition-colors ${
              activeFilter === filter.slug
                ? "bg-primary text-white border-primary"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-muted-foreground py-20 font-sans">
          No products found in this category yet.
        </p>
      )}
    </div>
  )
}
