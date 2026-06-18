"use client";

import { FadeImage } from "@/components/fade-image";

const features = [
  {
    title: "Custom-Made Furniture",
    description: "Every piece can be tailored to your space, size, material, finish, and lifestyle.",
    image: "https://images.unsplash.com/photo-1611600700192-d87eaeed4f81?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Solid Wood Craftsmanship",
    description: "Built with attention to structure, durability, proportion, and long-term use.",
    image: "https://images.unsplash.com/photo-1683115099191-51e617fc5ff1?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Premium Materials",
    description: "Carefully selected wood, finishes, fabrics, and hardware for a refined final product.",
    image: "https://images.unsplash.com/photo-1571205086863-9d186c5cb8fb?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Designed for Indian Homes",
    description: "Furniture designed around real homes, room sizes, climate, and everyday living.",
    image: "https://images.unsplash.com/photo-1583418007992-a8e33a92e7ad?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Personal Consultation",
    description: "Share your requirement and get guided through design, material, and estimate options.",
    image: "https://images.unsplash.com/photo-1546484396-fb3fc6f95f98?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Long-Lasting Quality",
    description: "Pieces built to age beautifully and remain useful for years.",
    image: "https://images.unsplash.com/photo-1687422810663-c316494f725a?q=80&w=1000&auto=format&fit=crop",
  },
];

export function FeaturedProductsSection() {
  return (
    <section id="why-choose" className="bg-background">
      {/* Section Title */}
      <div className="px-6 py-20 text-center md:px-12 md:py-28 lg:px-20 lg:py-32 lg:pb-20">
        <h2 className="text-3xl font-serif font-light tracking-tight text-foreground md:text-4xl lg:text-5xl">
          Why Choose
          <br />
          Aakar Woodcraft.
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm text-secondary font-semibold uppercase tracking-widest">
          What Makes Us Different
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
              <h3 className="text-foreground text-xl font-serif font-light">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Link */}
      <div className="flex justify-center px-6 pb-28 md:px-12 lg:px-20">
        <a
          href="/about"
          className="border-b border-foreground pb-1 text-sm font-medium text-foreground transition-opacity hover:opacity-70"
        >
          Learn More About Our Craft →
        </a>
      </div>
    </section>
  );
}
