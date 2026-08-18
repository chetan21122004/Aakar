import { createStaticClient } from "@/lib/supabase/static"
import { createAdminClient } from "@/lib/supabase/admin"
import { formatStartingPrice } from "@/lib/format"
import type { CatalogProduct, ProductVariant } from "@/lib/products"

type DbProduct = {
  id: string
  slug: string
  name: string
  short_description: string | null
  long_description: string | null
  materials: string[] | null
  dimensions_label: string | null
  specs: string[] | null
  production_time_label: string | null
  categories: { slug: string; name: string } | null
  product_images: { path: string; alt: string | null; sort_order: number }[]
  product_variants: {
    id: string
    sku: string
    options: { finish?: string }
    price_paise: number
    stock_qty: number
    is_default: boolean
    is_active: boolean
  }[]
}

const PRODUCT_SELECT = `
  id, slug, name, short_description, long_description, materials, dimensions_label, specs, production_time_label,
  categories ( slug, name ),
  product_images ( path, alt, sort_order ),
  product_variants ( id, sku, options, price_paise, stock_qty, is_default, is_active )
`

function mapProduct(row: DbProduct): CatalogProduct {
  const variants: ProductVariant[] = (row.product_variants ?? [])
    .filter((v) => v.is_active)
    .map((v) => ({
      id: v.id,
      sku: v.sku,
      options: v.options ?? {},
      pricePaise: v.price_paise,
      stockQty: v.stock_qty,
    }))

  const finishOptions = [
    ...new Set(
      variants.map((v) => v.options.finish).filter((f): f is string => Boolean(f))
    ),
  ]

  const images = [...(row.product_images ?? [])]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((img) => img.path)

  const basePricePaise = variants.length
    ? Math.min(...variants.map((v) => v.pricePaise))
    : 0

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.categories?.name ?? "",
    categorySlug: row.categories?.slug ?? "",
    price: formatStartingPrice(basePricePaise),
    image: images[0] ?? "/catalog/hampi-rift-console.webp",
    description: row.short_description ?? "",
    longDescription: row.long_description ?? undefined,
    materials: row.materials ?? undefined,
    dimensions: row.dimensions_label ?? undefined,
    specs: row.specs ?? undefined,
    finishOptions: finishOptions.length ? finishOptions : ["Natural Oil"],
    productionTime: row.production_time_label ?? undefined,
    basePricePaise,
    images: images.length ? images : ["/catalog/hampi-rift-console.webp"],
    options: { finish: finishOptions.length ? finishOptions : ["Natural Oil"] },
    variants,
  }
}

export async function getCatalogProducts(): Promise<CatalogProduct[]> {
  const supabase = createStaticClient()
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_published", true)
    .order("name")

  if (error || !data?.length) {
    return getCatalogProductsAdmin()
  }

  return (data as DbProduct[]).map(mapProduct)
}

async function getCatalogProductsAdmin(): Promise<CatalogProduct[]> {
  try {
    const admin = createAdminClient()
    const { data, error } = await admin
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("is_published", true)
      .order("name")
    if (error || !data) return []
    return (data as DbProduct[]).map(mapProduct)
  } catch {
    return []
  }
}

export async function getProductBySlugFromDb(slug: string): Promise<CatalogProduct | null> {
  const supabase = createStaticClient()
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle()

  if (!error && data) return mapProduct(data as DbProduct)

  try {
    const admin = createAdminClient()
    const { data: adminData } = await admin
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle()
    return adminData ? mapProduct(adminData as DbProduct) : null
  } catch {
    return null
  }
}

export async function getProductSlugs(): Promise<string[]> {
  const products = await getCatalogProducts()
  return products.map((p) => p.slug)
}

export type DbCollection = {
  id: string
  slug: string
  name: string
  tagline: string | null
  eyebrow: string | null
  narrative: string | null
  image_path: string | null
  accent_image_path: string | null
  collection_products: { product_id: string; sort_order: number; products: { slug: string } | null }[]
}

export async function getCollectionsFromDb() {
  const supabase = createStaticClient()
  const { data, error } = await supabase
    .from("collections")
    .select(
      `id, slug, name, tagline, eyebrow, narrative, image_path, accent_image_path,
       collection_products ( product_id, sort_order, products ( slug ) )`
    )
    .eq("is_published", true)
    .order("sort_order")

  if (error || !data) return []
  return data as DbCollection[]
}

export async function getCollectionBySlugFromDb(slug: string) {
  const collections = await getCollectionsFromDb()
  return collections.find((c) => c.slug === slug) ?? null
}

export async function getCategoriesFromDb() {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from("categories")
    .select("slug, name, description, image_path, sort_order")
    .eq("is_published", true)
    .order("sort_order")
  return data ?? []
}

export async function getFaqsFromDb() {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from("faqs")
    .select("question, answer, sort_order")
    .eq("is_published", true)
    .order("sort_order")
  return data ?? []
}

export async function getBlogPostsFromDb() {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from("blog_posts")
    .select("slug, title, category, excerpt, image_path, published_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
  return data ?? []
}

export async function getBlogPostBySlugFromDb(slug: string) {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from("blog_posts")
    .select(`slug, title, category, excerpt, image_path, published_at, blog_post_sections ( heading, body, sort_order )`)
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle()
  return data
}
