"use client";

import { FadeImage } from "@/components/fade-image";

const collections = [
  {
    id: 1,
    name: "Sofas & Seating",
    description: "Hand-upholstered comfort seating with solid wood frames",
    price: "From $1,200",
    image: "/images/accessory-charger.png",
  },
  {
    id: 2,
    name: "Dining Tables",
    description: "Expansive tables crafted from premium solid woods",
    price: "From $1,800",
    image: "/images/accessory-sleeve.png",
  },
  {
    id: 3,
    name: "Coffee Tables",
    description: "Statement pieces with hand-turned details and inlays",
    price: "From $800",
    image: "/images/accessory-bike-mount.png",
  },
  {
    id: 4,
    name: "Wardrobes & Storage",
    description: "Spacious storage solutions with traditional joinery",
    price: "From $2,200",
    image: "/images/accessory-strap.png",
  },
  {
    id: 5,
    name: "Beds & Frames",
    description: "Substantial bed frames designed for heirloom quality",
    price: "From $2,500",
    image: "/images/accessory-carabiner.png",
  },
  {
    id: 6,
    name: "Custom Pieces",
    description: "Bespoke furniture made to your specifications",
    price: "Request Quote",
    image: "/images/accessory-speaker-base.png",
  },
];

export function CollectionSection() {
  return (
    <section id="collections" className="bg-background">
      {/* Section Title */}
      <div className="px-6 py-20 md:px-12 lg:px-20 md:py-10">
        <h2 className="text-3xl font-serif font-light tracking-tight text-foreground md:text-4xl">
          Explore Our Collections
        </h2>
        <p className="mt-4 text-secondary uppercase text-xs tracking-widest font-semibold">
          Browse by Category
        </p>
      </div>

      {/* Accessories Grid/Carousel */}
      <div className="pb-24">
        {/* Mobile: Horizontal Carousel */}
        <div className="flex gap-6 overflow-x-auto px-6 pb-4 md:hidden snap-x snap-mandatory scrollbar-hide">
          {collections.map((collection) => (
            <div key={collection.id} className="group flex-shrink-0 w-[75vw] snap-center">
              {/* Image */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-none bg-muted">
                <FadeImage
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-serif font-light leading-snug text-foreground">
                      {collection.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {collection.description}
                    </p>
                  </div>
                  <span className="text-lg font-medium text-primary">
                    {collection.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 md:px-12 lg:px-20">
          {collections.map((collection) => (
            <div key={collection.id} className="group">
              {/* Image */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-none bg-muted">
                <FadeImage
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-serif font-light leading-snug text-foreground">
                      {collection.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {collection.description}
                    </p>
                  </div>
                  <span className="font-medium text-primary">
                    {collection.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
