"use client"

import { useState } from "react"
import Link from "next/link"
import { CollectionProductCard } from "@/components/collection-product-card"
import {
  collectionHubCategories,
  materialSpecifications,
  products,
} from "@/lib/data"

export function CollectionsHub() {
  const [activeCategory, setActiveCategory] = useState(collectionHubCategories[0].id)

  const currentCategory = collectionHubCategories.find((c) => c.id === activeCategory)!
  const categoryProducts = products.filter((p) =>
    currentCategory.categorySlugs.includes(p.categorySlug)
  )

  return (
    <>
      <section className="border-y border-border bg-muted/30 px-6 md:px-12 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-2 py-6 md:gap-4">
          {collectionHubCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors ${
                activeCategory === category.id
                  ? "bg-foreground text-background"
                  : "border border-border bg-background text-muted-foreground hover:text-foreground"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20 pt-16 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="type-h3 mb-12 text-center">{currentCategory.label}</h2>
          <div
            className={`grid grid-cols-1 gap-12 ${
              categoryProducts.length === 1
                ? "mx-auto max-w-md"
                : categoryProducts.length === 2
                  ? "md:grid-cols-2 md:max-w-4xl md:mx-auto"
                  : "md:grid-cols-3"
            }`}
          >
            {categoryProducts.map((product) => (
              <CollectionProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/40 px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 font-serif text-2xl text-foreground md:text-3xl">
            Custom Sizing Available
          </h2>
          <p className="mb-8 text-base leading-relaxed text-muted-foreground">
            All pieces can be customized within the design framework to suit your space.
            Dimensions, finishes, and material specifications can be discussed during the enquiry
            process.
          </p>
          <Link href="/contact" className="btn-primary">
            Discuss Your Requirements
          </Link>
        </div>
      </section>

      <section className="border-t border-border px-6 py-20 md:px-12 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="type-h2 mb-4 text-center">Material Specifications</h2>
          <p className="type-body mx-auto mb-12 max-w-xl text-center">
            All furniture is made from solid Indian Walnut
          </p>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {materialSpecifications.map((spec) => (
              <div key={spec.title} className="border border-border bg-background p-8 text-center">
                <h3 className="type-label mb-3">{spec.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{spec.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
