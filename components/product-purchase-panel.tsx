"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import useEmblaCarousel from "embla-carousel-react"
import { Camera, ChevronLeft, ChevronRight, Clock, Shield, Truck, X } from "lucide-react"
import { toast } from "sonner"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import { EnquiryForm } from "@/components/enquiry-form"
import { useCart } from "@/contexts/cart-context"
import { contactInfo } from "@/lib/data"
import { formatINR, formatOptionsLabel } from "@/lib/format"
import {
  getDefaultVariant,
  getStockLabel,
  getStockStatus,
  resolveVariant,
  type CatalogProduct,
} from "@/lib/products"
import { cn } from "@/lib/utils"
import { getConceptForProduct } from "@/lib/concepts"

import { ReviewSummaryInline } from "@/components/product-reviews"

type ProductPurchasePanelProps = {
  product: CatalogProduct
  ratingAverage?: number
  ratingCount?: number
}

const FINISH_SWATCH: Record<string, string> = {
  "Natural Oil": "#E8DFD0",
  "Matte Lacquer": "#C4A882",
  "Dark Stain": "#3D2A1F",
}

export function ProductPurchasePanel({ product, ratingAverage, ratingCount }: ProductPurchasePanelProps) {
  const router = useRouter()
  const { addItem } = useCart()
  const defaultVariant = getDefaultVariant(product)
  const collection = getConceptForProduct(product.slug)
  const gallery = useMemo(
    () => [...new Set(product.images.filter(Boolean))],
    [product.images]
  )

  const [selected, setSelected] = useState({
    finish: defaultVariant.options.finish,
  })
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: gallery.length > 1,
    align: "start",
  })

  const activeVariant = useMemo(
    () => resolveVariant(product, selected) ?? defaultVariant,
    [product, selected, defaultVariant]
  )
  const stockStatus = getStockStatus(activeVariant.stockQty)

  const whatsappHref = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(
    `Hi, I'm interested in the ${product.name} (${formatOptionsLabel(activeVariant.options)}).`
  )}`

  const onThumbClick = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index)
    },
    [emblaApi]
  )

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on("select", onSelect)
    onSelect()
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi])

  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false)
      if (event.key === "ArrowLeft") emblaApi?.scrollPrev()
      if (event.key === "ArrowRight") emblaApi?.scrollNext()
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [lightboxOpen, emblaApi])

  const handleAddToCart = (redirectToCheckout = false) => {
    if (!activeVariant) return
    addItem({
      variantId: activeVariant.id,
      productSlug: product.slug,
      name: product.name,
      image: product.images[0],
      options: activeVariant.options,
      pricePaise: activeVariant.pricePaise,
    })
    toast.success("Added to cart", {
      description: `${product.name} - ${formatINR(activeVariant.pricePaise)}`,
    })
    if (redirectToCheckout) router.push("/checkout")
  }

  const thumbs = (
    <>
      {gallery.map((src, i) => (
        <button
          key={`${src}-thumb-${i}`}
          type="button"
          onClick={() => onThumbClick(i)}
          className={cn(
            "relative aspect-square w-16 shrink-0 overflow-hidden rounded-2xl bg-[#FFFcf8] ring-2 ring-offset-2 ring-offset-sand transition-all lg:w-full",
            selectedIndex === i ? "ring-clay" : "ring-transparent hover:ring-[#C4B5A5]"
          )}
        >
          <Image
            src={src}
            alt={`${product.name} thumbnail ${i + 1}`}
            fill
            className="object-contain p-1"
            sizes="80px"
          />
        </button>
      ))}
    </>
  )

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 items-start gap-8 lg:justify-between lg:gap-6 xl:gap-8",
          gallery.length > 1
            ? "lg:grid-cols-[5.5rem_minmax(0,46rem)_minmax(22rem,28rem)] xl:grid-cols-[6rem_minmax(0,52rem)_minmax(24rem,30rem)]"
            : "lg:grid-cols-[minmax(0,52rem)_minmax(24rem,30rem)]",
        )}
      >
        {gallery.length > 1 && (
          <div className="hidden max-h-[42rem] flex-col gap-2 overflow-y-auto pr-0.5 lg:flex">
            {thumbs}
          </div>
        )}

        <div className="min-w-0">
          <div className="relative min-h-[420px] overflow-hidden rounded-[1.75rem] border border-[#E7E0D8] bg-[#FFFcf8] md:min-h-[560px] md:rounded-[2rem] xl:min-h-[640px]">
            <div className="h-full min-h-[420px] md:min-h-[560px] xl:min-h-[640px]" ref={emblaRef}>
              <div className="flex h-full min-h-[420px] md:min-h-[560px] xl:min-h-[640px]">
                {gallery.map((src, i) => (
                  <div
                    key={`${src}-${i}`}
                    className="relative min-h-[420px] min-w-0 flex-[0_0_100%] cursor-zoom-in md:min-h-[560px] xl:min-h-[640px]"
                    onClick={() => setLightboxOpen(true)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault()
                        setLightboxOpen(true)
                      }
                    }}
                    aria-label={`Open ${product.name} image`}
                  >
                    <Image
                      src={src}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      className="pointer-events-none object-contain p-6 md:p-10"
                      sizes="(max-width: 1024px) 100vw, 52rem"
                      priority={i === 0}
                    />
                  </div>
                ))}
              </div>
            </div>
            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => emblaApi?.scrollPrev()}
                  className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#302A26] shadow-sm"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => emblaApi?.scrollNext()}
                  className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#302A26] shadow-sm"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
            <Link
              href={`/see-in-your-room?product=${encodeURIComponent(product.slug)}`}
              className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 font-sans !text-[13px] font-medium !normal-case !tracking-normal text-[#1F1A17] shadow-[0_8px_24px_rgba(48,42,38,0.16)] transition-colors hover:bg-white"
            >
              <Camera size={16} className="text-[#A86F47]" />
              See in your room
            </Link>
          </div>
          {gallery.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">{thumbs}</div>
          )}
        </div>

        <div className="rounded-[1.75rem] border border-[#E7E0D8] bg-[#FFFcf8] p-6 md:rounded-[2rem] lg:sticky lg:top-28 lg:self-start lg:p-8">
          <p className="font-sans text-[12px] text-[#8A6A4F]">
            {collection?.name ?? product.category}
            <span className="text-[#C4B5A5]"> · </span>
            {product.category}
          </p>
          <h1 className="mt-1 font-hero !text-[1.85rem] !font-medium !normal-case !leading-snug !tracking-[-0.02em] text-[#0F1111] md:!text-[2.15rem]">
            {product.name}
          </h1>
          {ratingAverage != null && ratingCount != null && (
            <ReviewSummaryInline average={ratingAverage} count={ratingCount} />
          )}

          <p className="mt-4 font-sans text-[2rem] font-semibold tabular-nums leading-none text-[#0F1111]">
            {formatINR(activeVariant.pricePaise)}
          </p>
          <p className="mt-1 font-sans text-[12px] text-[#6B5E54]">Inclusive of taxes</p>
          <p
            className={cn(
              "mt-2 font-sans text-sm font-medium",
              stockStatus === "in_stock" && "text-[#067D62]",
              stockStatus === "low_stock" && "text-[#B12704]",
              stockStatus === "made_to_order" && "text-[#8A6A4F]",
            )}
          >
            {getStockLabel(activeVariant.stockQty)}
          </p>

          {product.description && (
            <p className="mt-4 font-sans text-sm leading-relaxed text-[#3D342F]">{product.description}</p>
          )}

          <Link
            href={`/see-in-your-room?product=${encodeURIComponent(product.slug)}`}
            className="mt-5 flex items-start gap-3 rounded-[1.35rem] border border-[#D9C8B7] bg-[#F6EFE5] px-4 py-3.5 transition-colors hover:border-[#A86F47] hover:bg-[#F3E8DC]"
          >
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#A86F47] shadow-sm">
              <Camera size={18} />
            </span>
            <span>
              <span className="block font-sans !text-sm font-semibold !normal-case !tracking-normal text-[#1F1A17]">
                See this piece in your room
              </span>
              <span className="mt-0.5 block font-sans !text-[13px] font-normal !normal-case !tracking-normal leading-snug text-[#5C524A]">
                Upload a photo of your space and preview how it sits before you order.
              </span>
            </span>
          </Link>

          <div className="mt-5 border-t border-[#E7E0D8] pt-4">
            <p className="font-sans text-sm text-[#0F1111]">
              <span className="font-semibold">Finish:</span> {selected.finish}
            </p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {product.options.finish.map((option) => {
                const isSelected = selected.finish === option
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelected((s) => ({ ...s, finish: option }))}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-4 py-2 font-sans !text-[13px] !normal-case !tracking-normal",
                      isSelected
                        ? "border-[#A86F47] bg-[#F6EFE5] text-[#1F1A17]"
                        : "border-[#D9C8B7] bg-white text-[#5C524A] hover:border-[#A86F47]",
                    )}
                  >
                    <span
                      className="h-3.5 w-3.5 shrink-0 rounded-full border border-black/10"
                      style={{ backgroundColor: FINISH_SWATCH[option] ?? "#C9B79A" }}
                      aria-hidden
                    />
                    {option}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-5 hidden flex-col gap-3 sm:flex">
            <button
              type="button"
              className="w-full rounded-full bg-[#A86F47] py-3.5 font-sans !text-sm font-medium !normal-case !tracking-normal text-white transition-colors hover:bg-[#8F5B38]"
              onClick={() => handleAddToCart(false)}
            >
              Add to cart
            </button>
            <button
              type="button"
              className="w-full rounded-full border border-[#302A26] bg-[#302A26] py-3.5 font-sans !text-sm font-medium !normal-case !tracking-normal text-white transition-colors hover:bg-[#1F1A17]"
              onClick={() => handleAddToCart(true)}
            >
              Buy now
            </button>
          </div>

          <ul className="mt-5 space-y-2.5 border-t border-[#E7E0D8] pt-4">
            <li className="flex gap-2.5 text-[13px] leading-snug text-[#3D342F]">
              <Truck size={16} className="mt-0.5 shrink-0 text-[#067D62]" />
              Free delivery on orders over ₹1,00,000
            </li>
            <li className="flex gap-2.5 text-[13px] leading-snug text-[#3D342F]">
              <Clock size={16} className="mt-0.5 shrink-0 text-[#8A6A4F]" />
              {product.productionTime ?? "Made to order in 4–6 weeks"}
            </li>
            <li className="flex gap-2.5 text-[13px] leading-snug text-[#3D342F]">
              <Shield size={16} className="mt-0.5 shrink-0 text-[#8A6A4F]" />
              2-year structural warranty
            </li>
          </ul>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 font-sans !text-[13px] !normal-case !tracking-normal text-[#067D62] hover:underline"
          >
            <WhatsAppIcon size={15} />
            Chat with us on WhatsApp
          </a>
        </div>
      </div>

      <details className="mt-12 rounded-[1.75rem] border border-[#E7E0D8] bg-[#FFFcf8] p-6 md:rounded-[2rem] md:p-8">
        <summary className="cursor-pointer font-hero !text-lg !font-medium !normal-case !tracking-[-0.02em] text-[#0F1111]">
          Need custom sizing? Request a quote
        </summary>
        <div className="mt-4">
          <EnquiryForm source="product" productSlug={product.slug} />
        </div>
      </details>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#1F1A17]/92 p-4 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} image`}
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-[#1F1A17]"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close image"
          >
            <X size={20} />
          </button>
          {gallery.length > 1 && (
            <>
              <button
                type="button"
                className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#1F1A17]"
                onClick={(event) => {
                  event.stopPropagation()
                  emblaApi?.scrollPrev()
                }}
                aria-label="Previous image"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#1F1A17] md:right-16"
                onClick={(event) => {
                  event.stopPropagation()
                  emblaApi?.scrollNext()
                }}
                aria-label="Next image"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}
          <div
            className="relative h-[min(86vh,860px)] w-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={gallery[selectedIndex] ?? gallery[0]}
              alt={`${product.name} enlarged view`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}

      <div className="fixed inset-x-0 bottom-[4.75rem] z-40 border-t border-[#E7E0D8] bg-white/95 p-3 backdrop-blur-sm lg:hidden" style={{ bottom: "calc(4.75rem + env(safe-area-inset-bottom))" }}>
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="font-sans text-lg font-semibold tabular-nums text-[#0F1111]">
              {formatINR(activeVariant.pricePaise)}
            </p>
          </div>
          <Link
            href={`/see-in-your-room?product=${encodeURIComponent(product.slug)}`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E7E0D8] text-[#302A26]"
            aria-label={`See ${product.name} in your room`}
          >
            <Camera size={18} />
          </Link>
          <button
            type="button"
            className="rounded-full bg-[#A86F47] px-5 py-2.5 font-sans !text-sm font-medium !normal-case !tracking-normal text-white"
            onClick={() => handleAddToCart(false)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </>
  )
}
