import { CategoryPageTemplate } from "@/components/category-page-template"
import { categories } from "@/lib/data"

export const metadata = {
  title: "Custom Wooden Sofas for Modern Homes | Aakar Woodcraft",
  description: "Hand-upholstered custom wooden sofas built on solid wood frames, made to fit your living room.",
}

export default function SofasPage() {
  const category = categories.find((c) => c.slug === "sofas")!
  return (
    <CategoryPageTemplate
      category={category}
      heroTitle="Custom Wooden Sofas for Modern Homes"
      intro="Hand-upholstered seating built on solid wood frames, designed for everyday comfort and made to the exact size and style of your living room."
      ctaLabel="Shop Sofas"
    />
  )
}
