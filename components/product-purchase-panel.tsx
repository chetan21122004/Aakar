"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import useEmblaCarousel from "embla-carousel-react"
import { MessageCircle, Minus, Plus, Star } from "lucide-react"
import { toast } from "sonner"
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
  getStockStatus,
  resolveVariant,
  type CatalogProduct,
} from "@/lib/products"
import { cn } from "@/lib/utils"

type ProductPurchasePanelProps = {
  product: CatalogProduct
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
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "border px-4 py-2 font-sans text-sm transition-colors",
              value === option
                ? "border-foreground bg-foreground text-background"
                : "border-border text-foreground hover:border-foreground/50"
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const router = useRouter()
  const { addItem } = useCart()
  const defaultVariant = getDefaultVariant(product)

  const [selected, setSelected] = useState({
    size: defaultVariant.options.size,
    wood: defaultVariant.options.wood,
    fabric: defaultVariant.options.fabric,
  })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

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
      description: `${product.name} — ${formatINR(activeVariant.pricePaise)}`,
    })
    if (redirectToCheckout) router.push("/checkout")
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden bg-muted" ref={emblaRef}>
            <div className="flex h-full">
              {product.images.map((src, i) => (
                <div key={src} className="relative min-w-0 flex-[0_0_100%]">
                  <Image
                    src={src}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => onThumbClick(i)}
                className={cn(
                  "relative aspect-square overflow-hidden bg-muted ring-2 ring-transparent transition-all",
                  selectedIndex === i && "ring-foreground"
                )}
              >
                <Image src={src} alt={`${product.name} thumbnail ${i + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Buy box */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="type-label mb-3">
            {product.category} · {product.collection} Collection
          </p>
          <h1 className="type-display mb-3">{product.name}</h1>

          <div className="mb-4 flex items-center gap-1.5 text-secondary">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} className={i < 4 ? "fill-accent text-accent" : "text-muted"} />
            ))}
            <span className="ml-1 font-sans text-sm text-muted-foreground">(24 reviews)</span>
          </div>

          <p className="type-price mb-4">{formatINR(activeVariant.pricePaise)}</p>

          <span
            className={cn(
              "mb-6 inline-block px-3 py-1 font-sans text-xs font-medium",
              stockStatus === "in_stock" && "bg-primary/10 text-primary",
              stockStatus === "low_stock" && "bg-amber-100 text-amber-800",
              stockStatus === "made_to_order" && "bg-muted text-muted-foreground"
            )}
          >
            {getStockLabel(activeVariant.stockQty)}
          </span>

          <div className="space-y-6 mb-8">
            {product.options.size && (
              <OptionGroup
                label="Size"
                options={product.options.size}
                value={selected.size}
                onChange={(size) => setSelected((s) => ({ ...s, size }))}
              />
            )}
            {product.options.wood && (
              <OptionGroup
                label="Wood"
                options={product.options.wood}
                value={selected.wood}
                onChange={(wood) => setSelected((s) => ({ ...s, wood }))}
              />
            )}
            {product.options.fabric && (
              <OptionGroup
                label="Fabric"
                options={product.options.fabric}
                value={selected.fabric}
                onChange={(fabric) => setSelected((s) => ({ ...s, fabric }))}
              />
            )}
          </div>

          <div className="hidden sm:flex flex-col sm:flex-row gap-3 mb-4">
            <button type="button" className="btn-primary flex-1" onClick={() => handleAddToCart(false)}>
              Add to Cart
            </button>
            <button type="button" className="btn-secondary flex-1" onClick={() => handleAddToCart(true)}>
              Buy Now
            </button>
          </div>

          <p className="type-body text-sm mb-4">Free delivery on orders over ₹1,00,000</p>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <MessageCircle size={16} />
            Questions? Chat on WhatsApp
          </a>

          <Accordion type="single" collapsible className="mt-8 border-t border-border">
            <AccordionItem value="description">
              <AccordionTrigger className="font-sans text-sm font-medium">Description & Details</AccordionTrigger>
              <AccordionContent>
                <p className="type-body mb-4">{product.longDescription ?? product.description}</p>
                {product.materials && (
                  <ul className="space-y-1.5">
                    {product.materials.map((m) => (
                      <li key={m} className="type-body text-sm flex gap-2">
                        <span className="text-accent">—</span> {m}
                      </li>
                    ))}
                  </ul>
                )}
                {product.dimensions && (
                  <p className="type-body text-sm mt-4">
                    <span className="font-medium text-foreground">Dimensions:</span> {product.dimensions}
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="quote">
              <AccordionTrigger className="font-sans text-sm font-medium">
                Need custom sizing? Request a quote
              </AccordionTrigger>
              <AccordionContent>
                <EnquiryForm />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Mobile sticky bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-sm p-4 sm:hidden">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="type-price-sm">{formatINR(activeVariant.pricePaise)}</p>
            <p className="font-sans text-xs text-muted-foreground">{getStockLabel(activeVariant.stockQty)}</p>
          </div>
          <button type="button" className="btn-primary px-5 py-3" onClick={() => handleAddToCart(false)}>
            Add to Cart
          </button>
        </div>
      </div>
    </>
  )
}
