import Image from "next/image"
import Link from "next/link"
import { catalogProducts } from "@/lib/products"

const featuredPieces = catalogProducts.slice(0, 4)

export function ShopByCategorySection() {
  return (
    <section className="bg-background px-6 py-16 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="type-h2">Featured Pieces</h2>
            <p className="type-body mt-3 max-w-md">
              Timeless designs for contemporary homes
            </p>
          </div>
          <Link href="/collections" className="btn-outline-sm self-start md:self-auto">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 md:gap-6">
          {featuredPieces.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group block"
            >
              <div className="relative mb-3 aspect-[4/5] overflow-hidden bg-muted">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="type-h3 text-base">{product.name}</h3>
              <p className="type-price-sm mt-1 text-muted-foreground">{product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
