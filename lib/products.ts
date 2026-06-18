import { products as rawProducts, type Product as BaseProduct } from "@/lib/data"
import { formatINR } from "@/lib/format"

export type ProductVariant = {
  id: string
  sku: string
  options: { size?: string; wood?: string; fabric?: string }
  pricePaise: number
  stockQty: number
}

export type CatalogProduct = BaseProduct & {
  basePricePaise: number
  images: string[]
  options: {
    size?: string[]
    wood?: string[]
    fabric?: string[]
  }
  variants: ProductVariant[]
}

export type StockStatus = "in_stock" | "low_stock" | "made_to_order"

const WOODS = ["Sheesham", "Mango", "Teak"] as const
const FABRICS = ["Linen", "Velvet", "Leather"] as const

const EXTRA_IMAGES = [
  "https://images.unsplash.com/photo-1736506159893-22cca29b8018?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1687422810663-c316494f725a?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560449752-3fd4bdbe7df0?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1758977403438-1b8546560d31?q=80&w=1200&auto=format&fit=crop",
]

function parsePricePaise(price: string): number {
  const match = price.match(/[\d,]+/)
  if (!match) return 0
  return parseInt(match[0].replace(/,/g, ""), 10) * 100
}

function getSizesForCategory(categorySlug: string): string[] {
  if (categorySlug === "sofas") return ["2-Seater", "3-Seater", "Sectional"]
  if (categorySlug === "dining-tables") return ["4-Seater", "6-Seater", "8-Seater"]
  if (categorySlug === "coffee-tables") return ["Small", "Medium", "Large"]
  if (categorySlug === "beds") return ["Queen", "King"]
  if (categorySlug === "wardrobes") return ["2-Door", "3-Door", "4-Door"]
  return ["Standard", "Large"]
}

function hasFabric(categorySlug: string): boolean {
  return categorySlug === "sofas" || categorySlug === "chairs"
}

function woodModifier(wood: string): number {
  if (wood === "Teak") return 800_000
  if (wood === "Mango") return 300_000
  return 0
}

function sizeModifier(categorySlug: string, size: string, index: number): number {
  if (categorySlug === "sofas") {
    if (size === "3-Seater") return 500_000
    if (size === "Sectional") return 1_200_000
  }
  if (categorySlug === "dining-tables") {
    if (size === "6-Seater") return 400_000
    if (size === "8-Seater") return 900_000
  }
  if (categorySlug === "coffee-tables") {
    if (size === "Medium") return 200_000
    if (size === "Large") return 450_000
  }
  if (categorySlug === "wardrobes") {
    if (size === "3-Door") return 600_000
    if (size === "4-Door") return 1_100_000
  }
  if (categorySlug === "beds" && size === "King") return 500_000
  return index * 150_000
}

function fabricModifier(fabric: string): number {
  if (fabric === "Velvet") return 250_000
  if (fabric === "Leather") return 600_000
  return 0
}

function stockForVariant(productIndex: number, variantIndex: number): number {
  const seed = (productIndex * 7 + variantIndex * 3) % 10
  if (seed === 0) return 0
  if (seed <= 2) return seed
  return seed + 4
}

function buildVariants(product: BaseProduct, productIndex: number): ProductVariant[] {
  const base = parsePricePaise(product.price)
  const sizes = getSizesForCategory(product.categorySlug)
  const withFabric = hasFabric(product.categorySlug)
  const variants: ProductVariant[] = []
  let variantIndex = 0

  for (const size of sizes) {
    for (const wood of WOODS) {
      const fabrics = withFabric ? FABRICS : [undefined]
      for (const fabric of fabrics) {
        const options: ProductVariant["options"] = { size, wood }
        if (fabric) options.fabric = fabric

        const pricePaise =
          base +
          sizeModifier(product.categorySlug, size, sizes.indexOf(size)) +
          woodModifier(wood) +
          (fabric ? fabricModifier(fabric) : 0)

        variants.push({
          id: `${product.id}-v${variantIndex}`,
          sku: `AKR-${product.id.padStart(2, "0")}-${variantIndex + 1}`,
          options,
          pricePaise,
          stockQty: stockForVariant(productIndex, variantIndex),
        })
        variantIndex++
      }
    }
  }

  return variants
}

function buildImages(product: BaseProduct, index: number): string[] {
  const pool = [product.image, ...EXTRA_IMAGES]
  return [
    product.image,
    pool[(index + 1) % pool.length],
    pool[(index + 2) % pool.length],
    pool[(index + 3) % pool.length],
  ]
}

function enrichProduct(product: BaseProduct, index: number): CatalogProduct {
  const basePricePaise = parsePricePaise(product.price)
  const sizes = getSizesForCategory(product.categorySlug)
  const withFabric = hasFabric(product.categorySlug)

  return {
    ...product,
    price: `From ${formatINR(basePricePaise)}`,
    basePricePaise,
    images: buildImages(product, index),
    options: {
      size: sizes,
      wood: [...WOODS],
      ...(withFabric ? { fabric: [...FABRICS] } : {}),
    },
    variants: buildVariants(product, index),
  }
}

export const catalogProducts: CatalogProduct[] = rawProducts.map(enrichProduct)

export function getProductBySlug(slug: string): CatalogProduct | undefined {
  return catalogProducts.find((p) => p.slug === slug)
}

export function getDefaultVariant(product: CatalogProduct): ProductVariant {
  const inStock = product.variants.find((v) => v.stockQty > 0)
  return inStock ?? product.variants[0]
}

export function resolveVariant(
  product: CatalogProduct,
  selected: { size?: string; wood?: string; fabric?: string }
): ProductVariant | undefined {
  return product.variants.find((variant) => {
    if (selected.size && variant.options.size !== selected.size) return false
    if (selected.wood && variant.options.wood !== selected.wood) return false
    if (product.options.fabric) {
      if (selected.fabric && variant.options.fabric !== selected.fabric) return false
      if (!selected.fabric && variant.options.fabric) return false
    }
    return true
  })
}

export function getStockStatus(qty: number): StockStatus {
  if (qty === 0) return "made_to_order"
  if (qty <= 5) return "low_stock"
  return "in_stock"
}

export function getStockLabel(qty: number): string {
  const status = getStockStatus(qty)
  if (status === "made_to_order") return "Made to Order — ships in 4–6 weeks"
  if (status === "low_stock") return `Only ${qty} left in stock`
  return "In Stock"
}
