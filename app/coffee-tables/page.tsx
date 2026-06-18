import { CategoryPageTemplate } from "@/components/category-page-template"
import { categories } from "@/lib/data"

export const metadata = {
  title: "Custom Wooden Coffee Tables for Modern Homes | Aakar Woodcraft",
  description: "Statement coffee tables with hand-turned legs and natural live edges, built to order.",
}

export default function CoffeeTablesPage() {
  const category = categories.find((c) => c.slug === "coffee-tables")!
  return (
    <CategoryPageTemplate
      category={category}
      heroTitle="Custom Wooden Coffee Tables for Modern Homes"
      intro="Statement centrepieces with hand-turned legs and natural live edges, designed to anchor your living room and complement your existing furniture."
      ctaLabel="Shop Coffee Tables"
    />
  )
}
