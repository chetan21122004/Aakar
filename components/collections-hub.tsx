"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { conceptCollections } from "@/lib/concepts"
import type { CatalogProduct } from "@/lib/products"
import { cn } from "@/lib/utils"

type CollectionsHubProps = {
  products: CatalogProduct[]
}

export function CollectionsHub({ products }: CollectionsHubProps) {
  const [activeSlug, setActiveSlug] = useState(conceptCollections[0].slug)
  const active = conceptCollections.find((collection) => collection.slug === activeSlug) ?? conceptCollections[0]
  const productsInCollection = products.filter((product) => active.productSlugs.includes(product.slug))

  return (
    <>
      <section className="px-4 pb-8 md:px-10 md:pb-16 lg:px-16">
        <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:hidden">
          {conceptCollections.map((collection) => (
            <button
              key={collection.slug}
              type="button"
              onClick={() => setActiveSlug(collection.slug)}
              className={cn(
                "relative aspect-[4/5] w-[68vw] max-w-[280px] shrink-0 snap-center overflow-hidden rounded-[1.5rem] text-left transition-opacity duration-200",
                activeSlug === collection.slug ? "ring-2 ring-ink ring-offset-2 ring-offset-sand" : "opacity-75",
              )}
            >
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                sizes="70vw"
                className="object-cover"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-4 text-white">
                <span className="block font-condensed text-[.65rem] font-semibold uppercase tracking-[.18em] text-white/70">
                  {collection.eyebrow}
                </span>
                <span className="mt-1 block font-serif text-[1.65rem] font-light leading-none">{collection.name}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="mx-auto hidden max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid lg:grid-cols-4">
          {conceptCollections.map((collection) => (
            <button
              key={collection.slug}
              type="button"
              onClick={() => setActiveSlug(collection.slug)}
              className={cn(
                "group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-[1.75rem] text-left transition-all duration-200",
                activeSlug === collection.slug ? "ring-2 ring-ink ring-offset-4 ring-offset-sand" : "opacity-80 hover:opacity-100",
              )}
            >
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                sizes="(max-width: 640px) 100vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-5 text-white">
                <span className="block font-condensed text-[.68rem] font-semibold uppercase tracking-[.2em] text-white/70">
                  {collection.eyebrow}
                </span>
                <span className="mt-1 block font-serif text-3xl font-light">{collection.name}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="bg-stone px-4 py-8 md:px-10 md:py-16 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 lg:grid-cols-[.72fr_1.28fr] lg:items-end lg:gap-8">
            <div>
              <p className="font-condensed text-[11px] font-semibold uppercase tracking-[.2em] text-umber md:text-xs">
                {active.eyebrow}
              </p>
              <h2 className="mt-2 font-serif text-[2rem] font-light leading-none text-ink md:text-5xl">{active.name}</h2>
            </div>
            <p className="font-hero text-[15px] font-light leading-relaxed text-ink/68 md:max-w-2xl md:text-lg">
              {active.narrative}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-5 md:mt-10 lg:grid-cols-3">
            {productsInCollection.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          <div className="mt-7 flex justify-center md:mt-10">
            <Link
              href={`/collections/${active.slug}`}
              className="cursor-pointer rounded-full bg-clay px-6 py-3 font-sans text-[13px] font-medium text-sand transition-colors duration-200 hover:bg-umber md:px-7 md:py-3.5 md:font-condensed md:text-sm md:font-semibold md:uppercase md:tracking-[.14em]"
            >
              Open collection
            </Link>
          </div>
        </div>
      </section>

      <section className="hidden px-5 py-16 text-center md:block md:px-10 lg:px-16">
        <p className="font-condensed text-xs font-semibold uppercase tracking-[.2em] text-umber">Made for your space</p>
        <h2 className="mx-auto mt-3 max-w-2xl font-serif text-4xl font-light text-ink">
          Custom sizing within each collection&apos;s design language.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Dimensions, finishes and material specifications can be discussed during the enquiry process.
        </p>
        <Link
          href="/contact"
          className="mt-7 inline-flex cursor-pointer rounded-full border border-ink px-6 py-3 font-condensed text-sm font-semibold uppercase tracking-[.12em] text-ink"
        >
          Discuss your requirements
        </Link>
      </section>
    </>
  )
}
