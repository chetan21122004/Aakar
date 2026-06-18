"use client";

import { CollectionCard } from "@/components/collection-card";
import { collections } from "@/lib/data";

export function CollectionSection() {
  return (
    <section id="collections" className="bg-background">
      {/* Section Title */}
      <div className="px-6 py-20 md:px-12 lg:px-20 md:py-10">
        <h2 className="text-3xl font-serif font-light tracking-tight text-foreground md:text-4xl">
          Artistic Furniture Collections
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          Explore handcrafted collections inspired by Indian heritage, natural textures, and modern living.
        </p>
      </div>

      {/* Collections Grid/Carousel */}
      <div className="pb-24">
        {/* Mobile: Horizontal Carousel */}
        <div className="flex gap-6 overflow-x-auto px-6 pb-4 md:hidden snap-x snap-mandatory scrollbar-hide">
          {collections.map((collection) => (
            <div key={collection.slug} className="flex-shrink-0 w-[75vw] snap-center">
              <CollectionCard
                title={collection.name}
                description={collection.tagline}
                image={collection.image}
                href={`/collections/${collection.slug}`}
                itemCount={collection.pieceCount}
              />
            </div>
          ))}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 md:px-12 lg:px-20">
          {collections.slice(0, 3).map((collection) => (
            <CollectionCard
              key={collection.slug}
              title={collection.name}
              description={collection.tagline}
              image={collection.image}
              href={`/collections/${collection.slug}`}
              itemCount={collection.pieceCount}
            />
          ))}
        </div>
        <div className="hidden md:grid md:grid-cols-2 gap-8 md:px-12 lg:px-20 md:mt-8 lg:max-w-2xl lg:mx-auto">
          {collections.slice(3).map((collection) => (
            <CollectionCard
              key={collection.slug}
              title={collection.name}
              description={collection.tagline}
              image={collection.image}
              href={`/collections/${collection.slug}`}
              itemCount={collection.pieceCount}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
