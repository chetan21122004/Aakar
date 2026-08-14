export type ConceptCollection = {
  slug: string
  name: string
  eyebrow: string
  narrative: string
  image: string
  accentImage: string
  productSlugs: string[]
}

export const conceptCollections: ConceptCollection[] = [
  {
    slug: "still-mandu",
    name: "Still Mandu",
    eyebrow: "Calm in repetition",
    narrative: "Mandu's passage from music and activity to silence is expressed through simple forms, repeated elements and intentional gaps - creating calm, openness and stillness.",
    image: "/catalog/still-mandu-bed.webp",
    accentImage: "/catalog/still-mandu-coffee-table.webp",
    productSlugs: ["signature-dining-table", "coffee-table", "dining-chair"],
  },
  {
    slug: "hampi-rift",
    name: "Hampi Rift",
    eyebrow: "Strength in incompleteness",
    narrative: "Hampi's ruins and monolithic forms meet in a system of solid volumes intentionally divided into parts. Fragmented yet stable, the collection finds beauty and power in incompleteness.",
    image: "/catalog/hampi-rift-sofa.webp",
    accentImage: "/catalog/hampi-rift-console.webp",
    productSlugs: ["fluted-console", "rounded-edge-console"],
  },
  {
    slug: "fatehpur-sikri",
    name: "Fatehpur Sikri",
    eyebrow: "Function before perfection",
    narrative: "Inspired by a perfectly designed city that struggled to serve its purpose, the collection explores furniture that prioritizes use and adaptability over visual perfection alone.",
    image: "/catalog/fatehpur-sikri-sofa.webp",
    accentImage: "/catalog/fatehpur-sikri-armchair.webp",
    productSlugs: ["lounge-sofa", "linear-wardrobe"],
  },
  {
    slug: "bishnupur-temples",
    name: "Bishnupur Temples",
    eyebrow: "Memory becomes material",
    narrative: "Bishnupur's terracotta temple walls once told stories through intricate reliefs. As those details soften with time, story becomes texture and memory becomes material.",
    image: "/catalog/bishnupur-bed.webp",
    accentImage: "/catalog/bishnupur-console.webp",
    productSlugs: ["heritage-console", "teak-platform-bed", "storage-cabinet"],
  },
]

export function getConceptForProduct(productSlug: string) {
  return conceptCollections.find((collection) => collection.productSlugs.includes(productSlug))
}

export function getConceptBySlug(slug: string) {
  return conceptCollections.find((collection) => collection.slug === slug)
}
