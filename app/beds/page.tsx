import { CategoryPageTemplate } from "@/components/category-page-template"
import { categories } from "@/lib/data"

export const metadata = {
  title: "Custom Wooden Beds for Modern Homes | Aakar Woodcraft",
  description: "Substantial solid wood bed frames designed to be passed down, sized and finished to order.",
}

export default function BedsPage() {
  const category = categories.find((c) => c.slug === "beds")!
  return (
    <CategoryPageTemplate
      category={category}
      heroTitle="Custom Wooden Beds for Modern Homes"
      intro="Substantial bed frames designed to be passed down, not replaced — built in solid wood and finished to match your bedroom."
      ctaLabel="Shop Beds"
    />
  )
}
