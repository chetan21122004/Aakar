import Image from "next/image"
import { craftDetailsHome } from "@/lib/data"

export function CraftDetailsSection() {
  return (
    <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="type-h2">The Details</h2>
          <p className="type-body mx-auto mt-4 max-w-md">
            Where craft meets contemporary design
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          {craftDetailsHome.map((detail) => (
            <article key={detail.title} className="group">
              <div className="relative mb-6 aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src={detail.image}
                  alt={detail.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="type-h3 mb-3">{detail.title}</h3>
              <p className="type-body">{detail.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
