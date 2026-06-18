"use client"

import Link from "next/link"
import Image from "next/image"
import { toast } from "sonner"
import { useCart } from "@/contexts/cart-context"
import { getDefaultVariant, type CatalogProduct } from "@/lib/products"
import { formatINR } from "@/lib/format"

interface ProductCardProps {
  product: CatalogProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const defaultVariant = getDefaultVariant(product)
  const href = `/products/${product.slug}`

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
    <div className="group">
      <Link href={href} className="cursor-pointer block">
        <div className="relative overflow-hidden bg-muted mb-4 aspect-square">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="space-y-2">
          <p className="type-label">{product.category}</p>
          <h3 className="type-h3 text-lg group-hover:text-primary transition-colors">{product.name}</h3>
          <p className="type-price-sm">{formatINR(defaultVariant.pricePaise)}</p>
        </div>
      </Link>
      <div className="mt-4 flex items-center gap-3">
        <button type="button" className="btn-primary flex-1 py-2.5 text-xs" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <Link href={href} className="btn-outline-sm shrink-0 py-2.5">
          Details
        </Link>
      </div>
    </div>
  )
}
