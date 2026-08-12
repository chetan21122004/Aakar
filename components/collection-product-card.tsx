"use client"

import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { useCart } from "@/contexts/cart-context"
import type { Product } from "@/lib/data"
import { getDefaultVariant, getProductBySlug } from "@/lib/products"

type CollectionProductCardProps = {
  product: Product
}

export function CollectionProductCard({ product }: CollectionProductCardProps) {
  const { addItem } = useCart()
  const catalogProduct = getProductBySlug(product.slug)
  const defaultVariant = catalogProduct ? getDefaultVariant(catalogProduct) : null

  const handleAddToCart = () => {
    if (!catalogProduct || !defaultVariant) return
    addItem({
      variantId: defaultVariant.id,
      productSlug: catalogProduct.slug,
      name: catalogProduct.name,
      image: catalogProduct.images[0],
      options: defaultVariant.options,
      pricePaise: defaultVariant.pricePaise,
    })
    toast.success("Added to cart", {
      description: catalogProduct.name,
    })
  }

  return (
    <article className="flex flex-col">
      <Link href={`/products/${product.slug}`} className="group block">
        <div className="relative mb-6 aspect-[4/5] overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col">
        <h2 className="mb-2 font-serif text-2xl text-foreground">{product.name}</h2>
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

        <dl className="mb-6 space-y-3 text-sm">
          {product.materials && (
            <div>
              <dt className="type-label mb-1">Material</dt>
              <dd className="text-muted-foreground">{product.materials[0]}</dd>
            </div>
          )}
          {product.dimensions && (
            <div>
              <dt className="type-label mb-1">Dimensions</dt>
              <dd className="text-muted-foreground">{product.dimensions}</dd>
            </div>
          )}
          <div>
            <dt className="type-label mb-1">Finish Options</dt>
            <dd className="text-muted-foreground">{product.finishOptions.join(", ")}</dd>
          </div>
          {product.productionTime && (
            <div>
              <dt className="type-label mb-1">Production</dt>
              <dd className="text-muted-foreground">{product.productionTime}</dd>
            </div>
          )}
        </dl>

        <p className="type-price mb-6 mt-auto">{product.price}</p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="btn-primary flex-1 text-center"
            onClick={handleAddToCart}
            disabled={!defaultVariant}
          >
            Add to Cart
          </button>
          <Link href={`/products/${product.slug}`} className="btn-outline-sm flex-1 text-center">
            View Details
          </Link>
        </div>
      </div>
    </article>
  )
}
