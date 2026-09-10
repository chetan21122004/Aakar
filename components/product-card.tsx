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
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#E7E0D8] bg-[#FFFcf8] transition-shadow duration-200 hover:shadow-[0_8px_24px_rgba(48,42,38,0.08)]">
      <div className="relative aspect-square overflow-hidden bg-[#F3EDE4]">
        <Link href={href} className="absolute inset-0 block">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </Link>
        <Link
          href={`/see-in-your-room?product=${encodeURIComponent(product.slug)}`}
          className="absolute right-2.5 top-2.5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#302A26] shadow-sm transition-colors hover:text-[#A86F47]"
          aria-label={`See ${product.name} in your room`}
          title="See in your room"
        >
          <Camera size={15} />
        </Link>
      </div>

      <div className="flex flex-1 flex-col px-3.5 pb-4 pt-3">
        <p className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-[#8A6A4F]">
          {collection?.name ?? product.category}
        </p>
        <Link href={href} className="mt-1 block">
          <h3 className="font-hero !normal-case !tracking-[-0.01em] line-clamp-2 text-[15px] font-medium leading-snug text-[#0F1111] md:text-[16px]">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 font-sans text-[11px] text-[#6B5E54]">From</p>
        <p className="font-sans text-[1.35rem] font-semibold tabular-nums leading-none text-[#0F1111]">
          {formatINR(product.basePricePaise)}
        </p>
        <p className="mt-2 font-sans text-[12px] leading-snug text-[#067D62]">{stockLabel}</p>

        <button
          type="button"
          className="mt-auto w-full rounded-lg bg-[#A86F47] px-3 py-2.5 font-sans !text-[13px] font-medium !normal-case !tracking-normal text-white transition-colors hover:bg-[#8F5B38]"
          onClick={handleAddToCart}
        >
          Add to cart
        </button>
      </div>
    </article>
  )
}
