import Link from 'next/link'
import Image from 'next/image'

interface ProductCardProps {
  id: string
  title: string
  category: string
  price: string
  image: string
  href?: string
  quoteHref?: string
}

export function ProductCard({
  id,
  title,
  category,
  price,
  image,
  href = `/shop/${id}`,
  quoteHref = '/contact',
}: ProductCardProps) {
  return (
    <div className="group">
      <Link href={href} className="cursor-pointer">
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
      </Link>
      <div className="mt-4 flex items-center gap-5">
        <Link
          href={href}
          className="border-b border-foreground pb-0.5 text-xs font-medium uppercase tracking-widest text-foreground transition-opacity hover:opacity-70"
        >
          View Details
        </Link>
        <Link
          href={quoteHref}
          className="border-b border-accent pb-0.5 text-xs font-medium uppercase tracking-widest text-accent transition-opacity hover:opacity-70"
        >
          Request Quote
        </Link>
      </div>
    </div>
  )
}
