import { products as rawProducts, type Product as BaseProduct } from "@/lib/data"
import { formatStartingPrice } from "@/lib/format"

export type ProductVariant = {
  id: string
  sku: string
  options: { finish?: string }
  pricePaise: number
  stockQty: number
}

export type CatalogProduct = BaseProduct & {
  basePricePaise: number
  images: string[]
  options: {
    finish: string[]
  }
  variants: ProductVariant[]
}

export type StockStatus = "in_stock" | "low_stock" | "made_to_order"

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

function finishModifier(finish: string): number {
  if (finish === "Matte Lacquer") return 150_000
  if (finish === "Dark Stain") return 200_000
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

  return product.finishOptions.map((finish, variantIndex) => ({
    id: `${product.id}-v${variantIndex}`,
    sku: `AKR-${product.id.padStart(2, "0")}-${variantIndex + 1}`,
    options: { finish },
    pricePaise: base + finishModifier(finish),
    stockQty: stockForVariant(productIndex, variantIndex),
  }))
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

  return {
    ...product,
    price: formatStartingPrice(basePricePaise),
    basePricePaise,
    images: buildImages(product, index),
    options: {
      finish: [...product.finishOptions],
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
  selected: { finish?: string }
): ProductVariant | undefined {
  return product.variants.find((variant) => {
    if (selected.finish && variant.options.finish !== selected.finish) return false
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
