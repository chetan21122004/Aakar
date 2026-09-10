"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { conceptCollections } from "@/lib/concepts"
import type { CatalogProduct } from "@/lib/products"

const filters = [
  { label: "All", slug: "all" },
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
      <div className="mb-6 flex flex-col gap-3 border-b border-[#E7E0D8] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-sans text-sm text-[#5C524A]">
          {filteredProducts.length} {filteredProducts.length === 1 ? "result" : "results"}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {filters.map((filter) => (
            <button
              key={filter.slug}
              onClick={() => setActiveFilter(filter.slug)}
              className={`rounded-full px-3.5 py-1.5 font-sans !text-[13px] font-medium !normal-case !tracking-normal transition-colors ${
                activeFilter === filter.slug
                  ? "bg-[#302A26] text-white"
                  : "bg-[#F3EDE4] text-[#5C524A] hover:bg-[#E7E0D8] hover:text-[#1F1A17]"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="py-20 text-center font-sans text-[#6B5E54]">
          No products found in this category yet.
        </p>
      )}
    </div>
  )
}
