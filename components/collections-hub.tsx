"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { conceptCollections } from "@/lib/concepts"
import { catalogProducts } from "@/lib/products"

export function CollectionsHub() {
  const [activeSlug, setActiveSlug] = useState(conceptCollections[0].slug)
  const active = conceptCollections.find((collection) => collection.slug === activeSlug) ?? conceptCollections[0]
  const products = catalogProducts.filter((product) => active.productSlugs.includes(product.slug))

  return (
    <>
      <section className="px-5 pb-16 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {conceptCollections.map((collection) => (
            <button
              key={collection.slug}
              type="button"
              onClick={() => setActiveSlug(collection.slug)}
              className={`group relative aspect-[4/5] overflow-hidden rounded-[1.75rem] text-left transition-all ${activeSlug === collection.slug ? "ring-2 ring-ink ring-offset-4 ring-offset-sand" : "opacity-80 hover:opacity-100"}`}
            >
              <Image src={collection.image} alt={collection.name} fill sizes="(max-width: 640px) 100vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 p-5 text-white">
                <span className="block font-condensed text-[.68rem] font-semibold uppercase tracking-[.2em] text-white/70">{collection.eyebrow}</span>
                <span className="mt-1 block font-serif text-3xl font-light">{collection.name}</span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="bg-stone px-5 py-16 md:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
            <div>
              <p className="font-condensed text-xs font-semibold uppercase tracking-[.2em] text-umber">{active.eyebrow}</p>
              <h2 className="mt-3 font-serif text-5xl font-light leading-none text-ink">{active.name}</h2>
            </div>
            <p className="max-w-2xl font-hero text-lg font-light leading-relaxed text-ink/68">{active.narrative}</p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>

          <div className="mt-10 flex justify-center">
            <Link href={`/shop?collection=${active.slug}`} className="rounded-full bg-clay px-7 py-3.5 font-condensed text-sm font-semibold uppercase tracking-[.14em] text-sand transition-colors hover:bg-umber">Shop the collection</Link>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 text-center md:px-10 lg:px-16">
        <p className="font-condensed text-xs font-semibold uppercase tracking-[.2em] text-umber">Made for your space</p>
        <h2 className="mx-auto mt-3 max-w-2xl font-serif text-4xl font-light text-ink">Custom sizing within each collection&apos;s design language.</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">Dimensions, finishes and material specifications can be discussed during the enquiry process.</p>
        <Link href="/contact" className="mt-7 inline-flex rounded-full border border-ink px-6 py-3 font-condensed text-sm font-semibold uppercase tracking-[.12em] text-ink">Discuss your requirements</Link>
      </section>
    </>
  )
}
