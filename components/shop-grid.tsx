"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { catalogProducts } from "@/lib/products"

const filters = [
  "All",
  "Sofas",
  "Dining Tables",
  "Coffee Tables",
  "Wardrobes",
  "Beds",
  "Chairs",
  "Consoles",
  "Storage",
]

export function ShopGrid() {
  const [activeFilter, setActiveFilter] = useState("All")

  const filteredProducts =
    activeFilter === "All"
      ? catalogProducts
      : catalogProducts.filter((p) => p.category === activeFilter)

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-12">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 font-sans text-sm font-medium uppercase tracking-wide transition-colors border ${
              activeFilter === filter
                ? "bg-primary text-white border-primary"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
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
