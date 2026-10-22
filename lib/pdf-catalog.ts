import type { CatalogProduct } from "@/lib/products"
import { productDetails } from "@/lib/product-details"
import { formatStartingPrice } from "@/lib/format"

// Display placeholders until these products have saved catalog prices.
const dummyPricesINR: Record<string, number> = {
  "mandu-dining-table": 45000,
  "mandu-lounge-chair": 18000,
  "mandu-console": 28000,
  "mandu-bed": 65000,
  "mandu-coffee-table": 22000,
  "hampi-coffee-table": 24000,
  "hampi-side-table": 9500,
  "hampi-console": 30000,
  "hampi-tv-unit": 35000,
  "hampi-dining-table": 48000,
  "hampi-dining-chair": 12000,
  "hampi-l-shape-sofa": 85000,
  "hampi-3-seater-sofa": 58000,
  "hampi-lounge-chairs": 36000,
}

const page = (collection: string, number: number) => {
  const folder = collection === "still-mandu" ? "Still Mandu Collection" : "Hampi Collection"
  const prefix = collection === "still-mandu" ? folder : "Hampi rift Collection"
  return `/collections/${encodeURIComponent(folder)}/${encodeURIComponent(`${prefix}_page-${String(number).padStart(4, "0")}.webp`)}`
}

// One entry per product in the supplied product-details PDF, in PDF order.
export const pdfCatalog = [
  { slug: "signature-dining-table", key: "mandu-dining-table", name: "Still Mandu Dining Table", collection: "still-mandu", category: "Dining Tables", categorySlug: "dining-tables", image: "/catalog/still-mandu-dining-table.webp" },
  { slug: "dining-chair", key: "mandu-lounge-chair", name: "Still Mandu Lounge Chair", collection: "still-mandu", category: "Chairs", categorySlug: "chairs", image: page("still-mandu", 2) },
  { slug: "still-mandu-console-unit", key: "mandu-console", name: "Still Mandu Console Unit", collection: "still-mandu", category: "Consoles", categorySlug: "consoles", image: page("still-mandu", 11) },
  { slug: "still-mandu-bed", key: "mandu-bed", name: "Still Mandu Bed", collection: "still-mandu", category: "Beds", categorySlug: "beds", image: "/catalog/still-mandu-bed.webp" },
  { slug: "coffee-table", key: "mandu-coffee-table", name: "Still Mandu Coffee Table", collection: "still-mandu", category: "Coffee Tables", categorySlug: "coffee-tables", image: page("still-mandu", 4) },
  { slug: "hampi-rift-coffee-table", key: "hampi-coffee-table", name: "Hampi Rift Coffee Table", collection: "hampi-rift", category: "Coffee Tables", categorySlug: "coffee-tables", image: page("hampi-rift", 5) },
  { slug: "hampi-rift-side-table", key: "hampi-side-table", name: "Hampi Rift Side Table", collection: "hampi-rift", category: "Side Tables", categorySlug: "side-tables", image: "/placeholder.svg" },
  { slug: "fluted-console", key: "hampi-console", name: "Hampi Rift Console Table", collection: "hampi-rift", category: "Consoles", categorySlug: "consoles", image: "/catalog/hampi-rift-console.webp" },
  { slug: "rounded-edge-console", key: "hampi-tv-unit", name: "Hampi Rift TV Unit", collection: "hampi-rift", category: "TV Units", categorySlug: "tv-units", image: page("hampi-rift", 29) },
  { slug: "hampi-rift-dining-table", key: "hampi-dining-table", name: "Hampi Rift Dining Table", collection: "hampi-rift", category: "Dining Tables", categorySlug: "dining-tables", image: "/placeholder.svg" },
  { slug: "hampi-rift-dining-chair", key: "hampi-dining-chair", name: "Hampi Rift Dining Chair", collection: "hampi-rift", category: "Chairs", categorySlug: "chairs", image: page("hampi-rift", 9) },
  { slug: "hampi-rift-l-shape-sofa", key: "hampi-l-shape-sofa", name: "Hampi Rift Main Sofa (L-Shape)", collection: "hampi-rift", category: "Sofas", categorySlug: "sofas", image: page("hampi-rift", 23) },
  { slug: "hampi-rift-3-seater-sofa", key: "hampi-3-seater-sofa", name: "Hampi Rift 3-Seater Sofa", collection: "hampi-rift", category: "Sofas", categorySlug: "sofas", image: "/placeholder.svg" },
  { slug: "hampi-rift-lounge-chairs", key: "hampi-lounge-chairs", name: "Hampi Rift Lounge Chairs (Pair)", collection: "hampi-rift", category: "Chairs", categorySlug: "chairs", image: page("hampi-rift", 13) },
]

// Approved galleries: keep the existing cover first, followed by other views.
const approvedGalleries: Record<string, string[]> = {
  "fluted-console": [1, 2, 3, 4].map((number) => page("hampi-rift", number)),
  "signature-dining-table": [5, 19, 25, 27].map((number) => page("still-mandu", number)),
  "dining-chair": [2, 7, 8, 28, 29].map((number) => page("still-mandu", number)),
  "coffee-table": [4, 6, 17, 20, 24].map((number) => page("still-mandu", number)),
  "still-mandu-console-unit": [11, 9, 16, 22, 26].map((number) => page("still-mandu", number)),
  "hampi-rift-coffee-table": [5, 6, 7, 8].map((number) => page("hampi-rift", number)),
  "hampi-rift-dining-chair": [9, 10, 11, 12].map((number) => page("hampi-rift", number)),
  "hampi-rift-lounge-chairs": [13, 14, 15, 16, 17, 18].map((number) => page("hampi-rift", number)),
  "rounded-edge-console": [29, 27, 28, 30].map((number) => page("hampi-rift", number)),
  "hampi-rift-l-shape-sofa": [23, 22, 24, 19, 20, 21, 25, 26].map((number) => page("hampi-rift", number)),
}

export function alignPdfCatalog(existing: CatalogProduct[]): CatalogProduct[] {
  return pdfCatalog.map((entry) => {
    const source = existing.find((product) => product.slug === entry.slug)
      ?? existing.find((product) => product.name.toLowerCase() === entry.name.toLowerCase())
    const images = approvedGalleries[entry.slug]
      ? ((source?.images.length ?? 0) > 1 ? source!.images : approvedGalleries[entry.slug])
      : entry.image === "/placeholder.svg" && source?.images.length
        ? source.images
        : [entry.image]
    const basePricePaise = source?.basePricePaise && source.basePricePaise > 0
      ? source.basePricePaise
      : dummyPricesINR[entry.key] * 100
    const variants = source?.variants.length ? source.variants : [{
      id: `demo:${entry.slug}`,
      sku: `DEMO-${entry.slug.toUpperCase()}`,
      options: { finish: "Standard finish" },
      pricePaise: basePricePaise,
      stockQty: 0,
    }]
    return {
      id: source?.id ?? entry.slug,
      ...source,
      ...productDetails[entry.key],
      variants,
      finishOptions: variants.map((variant) => variant.options.finish).filter((finish): finish is string => Boolean(finish)),
      options: { finish: variants.map((variant) => variant.options.finish).filter((finish): finish is string => Boolean(finish)) },
      price: formatStartingPrice(basePricePaise),
      basePricePaise,
      // Keep established URLs and purchasing records, but use the PDF's names.
      slug: entry.slug,
      name: entry.name,
      category: entry.category,
      categorySlug: entry.categorySlug,
      image: images[0],
      images,
    }
  })
}

export const pdfMembership = ["still-mandu", "hampi-rift", "fatehpur-sikri", "bishnupur-temples"].map((slug) => ({
  slug,
  name: ({ "still-mandu": "Still Mandu", "hampi-rift": "Hampi Rift", "fatehpur-sikri": "Fatehpur Sikri", "bishnupur-temples": "Bishnupur Temples" })[slug]!,
  productSlugs: pdfCatalog.filter((entry) => entry.collection === slug).map((entry) => entry.slug),
}))
