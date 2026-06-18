import { CategoryPageTemplate } from "@/components/category-page-template"
import { categories } from "@/lib/data"

export const metadata = {
  title: "Custom Wooden Dining Tables for Modern Homes | Aakar Woodcraft",
  description: "Heirloom-quality dining tables crafted from premium solid woods, sized to your dining space.",
}

export default function DiningTablesPage() {
  const category = categories.find((c) => c.slug === "dining-tables")!
  return (
    <CategoryPageTemplate
      category={category}
      heroTitle="Custom Wooden Dining Tables for Modern Homes"
      intro="Expansive, heirloom-quality dining tables crafted from premium solid woods — sized and finished to match your dining space and household."
      ctaLabel="Shop Dining Tables"
    />
  )
}
