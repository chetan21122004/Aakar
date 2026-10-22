import { ProductCard } from "@/components/product-card"
import type { CatalogProduct } from "@/lib/products"

export function QuoteProductCard({ product }: { product: CatalogProduct }) {
  return <ProductCard product={product} />
}
