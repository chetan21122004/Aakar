import { Truck, Shield, TreePine, MapPin } from "lucide-react"

const items = [
  { icon: Truck, label: "Free delivery over ₹1L" },
  { icon: TreePine, label: "Solid wood craftsmanship" },
  { icon: MapPin, label: "Made in India" },
  { icon: Shield, label: "Secure checkout" },
]

export function TrustBarSection() {
  return (
    <section className="border-y border-border bg-muted/30 px-6 py-8 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-2 gap-6 md:grid-cols-4">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3">
            <Icon size={20} className="shrink-0 text-primary" />
            <span className="font-sans text-sm font-medium text-foreground">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
