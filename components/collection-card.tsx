import Link from 'next/link'
import Image from 'next/image'

interface CollectionCardProps {
  title: string
  description?: string
  image: string
  href?: string
  itemCount?: number
  ctaLabel?: string
}

export function CollectionCard({
  title,
  description,
  image,
  href = `/collections/${title.toLowerCase()}`,
  itemCount,
  ctaLabel = 'Explore →'
}: CollectionCardProps) {
  return (
    <Link href={href}>
      <div className="group cursor-pointer">
        <div className="relative overflow-hidden bg-muted h-64 mb-6">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
        </div>
        <div className="space-y-3">
          <h3 className="font-serif text-2xl text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
          {itemCount && (
            <p className="text-xs text-secondary uppercase tracking-widest font-semibold">
              {itemCount} pieces
            </p>
          )}
          <div className="pt-2">
            <span className="text-sm font-semibold text-accent group-hover:text-primary transition-colors">
              {ctaLabel}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
