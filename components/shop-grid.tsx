"use client"

import { useMemo, useState } from "react"
import { ProductCard } from "@/components/product-card"
import { conceptCollections } from "@/lib/concepts"
import type { CatalogProduct } from "@/lib/products"

const filters = [
  { label: "All", slug: "all" },
  ...conceptCollections.map((collection) => ({ label: collection.name, slug: collection.slug })),
]

type ShopGridProps = {
  products: CatalogProduct[]
  initialCollection?: string
}

export function ShopGrid({ products, initialCollection }: ShopGridProps) {
  const startingFilter = filters.some((filter) => filter.slug === initialCollection)
    ? initialCollection!
    : "all"
  const [activeFilter, setActiveFilter] = useState(startingFilter)

  const activeCollection = conceptCollections.find((collection) => collection.slug === activeFilter)
  const filteredProducts = useMemo(
    () =>
      activeCollection
        ? products.filter((product) => activeCollection.productSlugs.includes(product.slug))
        : products,
    [activeCollection, products],
  )

  return (
    <div>
      <div className="sticky top-[4.75rem] z-20 -mx-4 mb-4 border-y border-[#E7E0D8] bg-[#F6EFE5]/95 px-4 py-3 backdrop-blur-xl md:static md:z-0 md:mx-0 md:mb-6 md:flex md:items-center md:justify-between md:border-x-0 md:border-t-0 md:bg-transparent md:px-0 md:py-0 md:pb-4 md:backdrop-blur-none">
        <p className="mb-2 font-sans text-xs text-[#5C524A] md:mb-0 md:text-sm">
          {filteredProducts.length} {filteredProducts.length === 1 ? "piece" : "pieces"}
        </p>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
          {filters.map((filter) => (
            <button
              key={filter.slug}
              type="button"
              onClick={() => setActiveFilter(filter.slug)}
              className={`shrink-0 cursor-pointer rounded-full px-3.5 py-2 font-sans !text-[13px] font-medium !normal-case !tracking-normal transition-colors duration-200 touch-manipulation ${
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

      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="py-20 text-center font-sans text-[#6B5E54]">No products found in this collection yet.</p>
      )}
    </div>
  )
}
