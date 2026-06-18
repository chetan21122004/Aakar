import { CategoryPageTemplate } from "@/components/category-page-template"
import { categories } from "@/lib/data"

export const metadata = {
  title: "Custom Wooden Wardrobes for Modern Homes | Aakar Woodcraft",
  description: "Spacious wardrobes built with traditional joinery and soft-close detailing, sized to your room.",
}

export default function WardrobesPage() {
  const category = categories.find((c) => c.slug === "wardrobes")!
  return (
    <CategoryPageTemplate
      category={category}
      heroTitle="Custom Wooden Wardrobes for Modern Homes"
      intro="Spacious storage built with traditional joinery and soft-close detailing, custom-built to your room size, doorway, and storage needs."
      ctaLabel="Shop Wardrobes"
    />
  )
}
