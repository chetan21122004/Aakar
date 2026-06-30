import { Clock, MapPin, Shield } from "lucide-react"
import { trustBadges } from "@/lib/data"

const icons = [Clock, MapPin, Shield]

export function TrustBarSection() {
  return (
    <section className="border-y border-border bg-muted/30 px-6 py-10 md:px-12 lg:px-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-3">
        {trustBadges.map((badge, index) => {
          const Icon = icons[index]
          return (
            <div key={badge.title} className="flex flex-col items-center gap-3 text-center sm:items-start sm:text-left">
              <div className="flex h-10 w-10 items-center justify-center border border-border bg-background">
                <Icon size={18} className="text-primary" />
              </div>
              <div>
                <p className="font-sans text-sm font-semibold uppercase tracking-wide text-foreground">
                  {badge.title}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{badge.subtitle}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
