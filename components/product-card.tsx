"use client"

import Link from "next/link"
import Image from "next/image"
import { Camera } from "lucide-react"
import { toast } from "sonner"
import { useCart } from "@/contexts/cart-context"
import { getDefaultVariant, getStockLabel, type CatalogProduct } from "@/lib/products"
import { formatINR } from "@/lib/format"
import { getConceptForProduct } from "@/lib/concepts"

interface ProductCardProps {
  product: CatalogProduct
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const defaultVariant = getDefaultVariant(product)
  const href = `/products/${product.slug}`
  const collection = getConceptForProduct(product.slug)
  const stockLabel = getStockLabel(defaultVariant.stockQty)

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
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E7E0D8] bg-[#FFFcf8] transition-shadow duration-200 hover:shadow-[0_8px_24px_rgba(48,42,38,0.08)] md:rounded-xl">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F3EDE4] md:aspect-square">
        <Link href={href} className="absolute inset-0 block">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </Link>
        <Link
          href={`/see-in-your-room?product=${encodeURIComponent(product.slug)}`}
          className="absolute right-2 top-2 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/95 text-[#302A26] shadow-sm transition-colors duration-200 hover:text-[#A86F47] md:right-2.5 md:top-2.5 md:h-9 md:w-9"
          aria-label={`See ${product.name} in your room`}
          title="See in your room"
        >
          <Camera size={14} />
        </Link>
      </div>

      <div className="flex flex-1 flex-col px-2.5 pb-3 pt-2.5 md:px-3.5 md:pb-4 md:pt-3">
        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-[#8A6A4F] md:text-[11px]">
          {collection?.name ?? product.category}
        </p>
        <Link href={href} className="mt-1 block">
          <h3 className="font-hero !normal-case !tracking-[-0.01em] line-clamp-2 text-[13px] font-medium leading-snug text-[#0F1111] md:text-[16px]">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1.5 font-sans text-[15px] font-semibold tabular-nums leading-none text-[#0F1111] md:mt-2 md:text-[1.35rem]">
          {formatINR(product.basePricePaise)}
        </p>
        <p className="mt-1 hidden font-sans text-[12px] leading-snug text-[#067D62] md:mt-2 md:block">{stockLabel}</p>

        <button
          type="button"
          className="mt-auto cursor-pointer rounded-full bg-[#A86F47] px-2 py-2 font-sans !text-[12px] font-medium !normal-case !tracking-normal text-white transition-colors duration-200 hover:bg-[#8F5B38] md:mt-3 md:rounded-lg md:px-3 md:py-2.5 md:!text-[13px]"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
    </article>
  )
}
