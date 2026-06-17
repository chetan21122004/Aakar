import Link from 'next/link'
import Image from 'next/image'

interface ProductCardProps {
  id: string
  title: string
  category: string
  price: string
  image: string
  href?: string
}

export function ProductCard({
  id,
  title,
  category,
  price,
  image,
  href = `/shop/${id}`
}: ProductCardProps) {
  return (
    <Link href={href}>
      <div className="group cursor-pointer">
        <div className="relative overflow-hidden bg-muted mb-4 aspect-square">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="space-y-2">
          <p className="text-xs text-secondary uppercase tracking-widest font-semibold">
            {category}
          </p>
          <h3 className="font-serif text-lg text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {price}
          </p>
        </div>
      </div>
    </Link>
  )
}
