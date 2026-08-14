"use client"

import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"
import { useCart } from "@/contexts/cart-context"
import { getDefaultVariant, type CatalogProduct } from "@/lib/products"
import { formatStartingPrice } from "@/lib/format"
import { getConceptForProduct } from "@/lib/concepts"

interface ProductCardProps {
  product: CatalogProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const defaultVariant = getDefaultVariant(product)
  const href = `/products/${product.slug}`
  const collection = getConceptForProduct(product.slug)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      variantId: defaultVariant.id,
      productSlug: product.slug,
      name: product.name,
      image: product.images[0],
      options: defaultVariant.options,
      pricePaise: defaultVariant.pricePaise,
    })
    toast.success("Added to cart", {
      description: product.name,
    })
  }

  return (
    <article className="group flex h-full flex-col border border-ink/10 bg-stone p-3.5 shadow-[0_1px_0_rgba(48,42,38,.04)] transition-shadow hover:shadow-[0_18px_44px_-30px_rgba(48,42,38,.45)] md:p-4">
      <Link href={href} className="cursor-pointer block">
        <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-sand">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="space-y-2">
          <p className="font-condensed text-[.7rem] font-semibold uppercase tracking-[.16em] text-umber">{collection?.name ?? product.category}</p>
          <h3 className="type-h3 text-lg group-hover:text-primary transition-colors">{product.name}</h3>
          <p className="type-price-sm">{formatStartingPrice(product.basePricePaise)}</p>
        </div>
      </Link>
      <div className="mt-auto flex items-center gap-3 pt-4">
        <button type="button" className="btn-primary flex-1 py-2.5 text-xs" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <Link href={href} className="btn-outline-sm shrink-0 py-2.5">
          Details
        </Link>
      </div>
    </article>
  )
}
