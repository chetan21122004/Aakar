"use client"

import { ProductGridCard } from "@/components/product-grid-card"
import type { CatalogProduct } from "@/lib/products"

export function ProductCard({ product }: { product: CatalogProduct }) {
  return <ProductGridCard product={product} />
}
