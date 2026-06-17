"use client";

import { FadeImage } from "@/components/fade-image";

const features = [
  {
    title: "Solid Wood Construction",
    description: "Materials",
    image: "/images/bottle-water.png",
  },
  {
    title: "Joinery Craftsmanship",
    description: "Technique",
    image: "/images/bottle-mountain.png",
  },
  {
    title: "Sustainable Sourcing",
    description: "Responsibility",
    image: "/images/product-forest.png",
  },
  {
    title: "Hand-Finished Surfaces",
    description: "Quality",
    image: "/images/bottle-canyon.png",
  },
  {
    title: "Timeless Design",
    description: "Aesthetics",
    image: "/images/bottle-fire.png",
  },
  {
    title: "Lifetime Durability",
    description: "Longevity",
    image: "/images/bottle-snow.png",
  },
];

export function FeaturedProductsSection() {
  return (
    <section id="technology" className="bg-background">
      {/* Section Title */}
      <div className="px-6 py-20 text-center md:px-12 md:py-28 lg:px-20 lg:py-32 lg:pb-20">
        <h2 className="text-3xl font-serif font-light tracking-tight text-foreground md:text-4xl lg:text-5xl">
          Our Materials & Methods.
          <br />
          What Makes Aakar Different.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm text-secondary font-semibold uppercase tracking-widest">
          Craftsmanship Details
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 gap-8 px-6 pb-20 md:grid-cols-3 md:px-12 lg:px-20">
        {features.map((feature) => (
          <div key={feature.title} className="group">
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-none mb-6">
              <FadeImage
                src={feature.image || "/placeholder.svg"}
                alt={feature.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-secondary font-semibold">
                {feature.description}
              </p>
              <h3 className="text-foreground text-xl font-serif font-light">
                {feature.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Link */}
      <div className="flex justify-center px-6 pb-28 md:px-12 lg:px-20">
        
      </div>
    </section>
  );
}
