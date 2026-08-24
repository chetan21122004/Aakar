"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "sonner"
import { WhatsAppIcon } from "@/components/whatsapp-icon"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { EnquiryForm } from "@/components/enquiry-form"
import { useCart } from "@/contexts/cart-context"
import { contactInfo } from "@/lib/data"
import { formatINR, formatOptionsLabel } from "@/lib/format"
import {
  getDefaultVariant,
  getStockLabel,
  resolveVariant,
  type CatalogProduct,
} from "@/lib/products"
import { cn } from "@/lib/utils"
import { getConceptForProduct } from "@/lib/concepts"

type ProductPurchasePanelProps = {
  product: CatalogProduct
}

const FINISH_SWATCH: Record<string, string> = {
  "Natural Oil": "#E8DFD0",
  "Matte Lacquer": "#C4A882",
  "Dark Stain": "#3D2A1F",
}

function OptionGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: string[]
  value?: string
  onChange: (val: string) => void
}) {
  return (
    <div>
      <p className="type-label mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = value === option
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 font-sans text-sm tracking-normal transition-colors",
                selected
                  ? "border-ink bg-ink text-sand"
                  : "border-ink/25 bg-sand text-ink hover:border-ink/60"
              )}
            >
              <span
                className="h-3.5 w-3.5 shrink-0 rounded-full border border-ink/20"
                style={{ backgroundColor: FINISH_SWATCH[option] ?? "#C9B79A" }}
                aria-hidden
              />
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
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
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: gallery.length > 1,
    align: "start",
  })

  const activeVariant = useMemo(
    () => resolveVariant(product, selected) ?? defaultVariant,
    [product, selected, defaultVariant]
  )

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

  return (
    <>
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:gap-14">
        <div className="min-w-0 space-y-4">
          <div className="relative overflow-hidden rounded-[2rem] bg-stone">
            <div className="aspect-[4/3] w-full" ref={emblaRef}>
              <div className="flex h-full">
                {gallery.map((src, i) => (
                  <div key={`${src}-${i}`} className="relative min-w-0 flex-[0_0_100%]">
                    <Image
                      src={src}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 55vw"
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
                  className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-sand/90 text-ink shadow-sm backdrop-blur-sm transition-colors hover:bg-sand"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => emblaApi?.scrollNext()}
                  className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-sand/90 text-ink shadow-sm backdrop-blur-sm transition-colors hover:bg-sand"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
          </div>
          {gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {gallery.map((src, i) => (
                <button
                  key={`${src}-thumb-${i}`}
                  type="button"
                  onClick={() => onThumbClick(i)}
                  className={cn(
                    "relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-stone ring-2 ring-offset-2 ring-offset-sand transition-all",
                    selectedIndex === i ? "ring-ink" : "ring-transparent hover:ring-ink/30"
                  )}
                >
                  <Image
                    src={src}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-[2rem] border border-ink/10 bg-stone p-6 lg:sticky lg:top-28 lg:self-start lg:p-8">
          <p className="font-condensed text-xs font-semibold uppercase tracking-[.18em] text-umber">
            {collection?.name ?? product.category}
          </p>
          <p className="mt-2 text-xs uppercase tracking-[.12em] text-ink/55">{product.category}</p>
          <h1 className="type-display mb-3">{product.name}</h1>

          <p className="type-price mb-2">{formatINR(activeVariant.pricePaise)}</p>
          <p className="mb-5 font-sans text-sm text-ink/60">{getStockLabel(activeVariant.stockQty)}</p>

          {product.description && (
            <p className="type-body mb-6">{product.description}</p>
          )}

          <div className="mb-8 space-y-6">
            <OptionGroup
              label="Finish"
              options={product.options.finish}
              value={selected.finish}
              onChange={(finish) => setSelected((s) => ({ ...s, finish }))}
            />
          </div>

          <div className="mb-4 hidden gap-3 sm:flex">
            <button
              type="button"
              className="btn-primary min-h-12 flex-1 px-5 py-3 text-xs"
              onClick={() => handleAddToCart(false)}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="btn-secondary min-h-12 flex-1 px-5 py-3 text-xs"
              onClick={() => handleAddToCart(true)}
            >
              Buy Now
            </button>
          </div>

          <p className="type-body mb-4 text-sm">Free delivery on orders over ₹1,00,000</p>

          <div className="flex flex-col gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-sm tracking-normal text-ink/65 transition-colors hover:text-ink"
            >
              <WhatsAppIcon size={16} />
              Questions? Chat on WhatsApp
            </a>
            <Link
              href={`/see-in-your-room?product=${encodeURIComponent(product.slug)}`}
              className="font-sans text-sm tracking-normal text-ink/65 underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              See this piece in your room
            </Link>
          </div>

          <Accordion type="single" collapsible className="mt-8 border-t border-ink/10">
            <AccordionItem value="description">
              <AccordionTrigger className="font-sans text-sm font-medium tracking-normal">
                Description & Details
              </AccordionTrigger>
              <AccordionContent>
                <p className="type-body mb-4">{product.longDescription ?? product.description}</p>
                {product.materials && (
                  <ul className="space-y-1.5">
                    {product.materials.map((m) => (
                      <li key={m} className="type-body flex gap-2 text-sm">
                        <span className="text-accent">—</span> {m}
                      </li>
                    ))}
                  </ul>
                )}
                {product.specs && (
                  <ul className="mt-4 space-y-1.5">
                    {product.specs.map((s) => (
                      <li key={s} className="type-body flex gap-2 text-sm">
                        <span className="text-accent">—</span> {s}
                      </li>
                    ))}
                  </ul>
                )}
                {product.dimensions && (
                  <p className="type-body mt-4 text-sm">
                    <span className="font-medium text-foreground">Dimensions:</span> {product.dimensions}
                  </p>
                )}
                {product.productionTime && (
                  <p className="type-body mt-4 text-sm">
                    <span className="font-medium text-foreground">Production:</span> {product.productionTime}
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="quote">
              <AccordionTrigger className="font-sans text-sm font-medium tracking-normal">
                Need custom sizing? Request a quote
              </AccordionTrigger>
              <AccordionContent>
                <EnquiryForm source="product" productSlug={product.slug} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 p-4 backdrop-blur-sm sm:hidden">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="type-price-sm">{formatINR(activeVariant.pricePaise)}</p>
          </div>
          <button
            type="button"
            className="btn-primary px-5 py-3 text-xs"
            onClick={() => handleAddToCart(false)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  )
}
