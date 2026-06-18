import Link from 'next/link'

interface CTASectionProps {
  title: string
  subtitle?: string
  primaryText: string
  primaryHref: string
  secondaryText?: string
  secondaryHref?: string
  dark?: boolean
}

function isExternal(href: string) {
  return href.startsWith('http://') || href.startsWith('https://')
}

export function CTASection({
  title,
  subtitle,
  primaryText,
  primaryHref,
  secondaryText,
  secondaryHref,
  dark = false
}: CTASectionProps) {
  return (
    <section
      className={`py-24 px-6 md:px-12 ${
        dark ? 'bg-primary text-white' : 'bg-accent/10'
      }`}
    >
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className={`font-serif text-4xl md:text-5xl ${
            dark ? 'text-white' : 'text-foreground'
          }`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`text-lg ${
              dark ? 'text-white/80' : 'text-muted-foreground'
            }`}>
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={primaryHref}
            target={isExternal(primaryHref) ? '_blank' : undefined}
            rel={isExternal(primaryHref) ? 'noopener noreferrer' : undefined}
            className={`px-8 py-4 font-semibold transition-all ${
              dark
                ? 'bg-white text-primary hover:bg-accent hover:text-foreground'
                : 'bg-primary text-white hover:bg-primary-light'
            }`}
          >
            {primaryText}
          </Link>
          {secondaryText && secondaryHref && (
            <Link
              href={secondaryHref}
              target={isExternal(secondaryHref) ? '_blank' : undefined}
              rel={isExternal(secondaryHref) ? 'noopener noreferrer' : undefined}
              className={`px-8 py-4 font-semibold border transition-all ${
                dark
                  ? 'border-white text-white hover:bg-white/10'
                  : 'border-primary text-primary hover:bg-primary/10'
              }`}
            >
              {secondaryText}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
