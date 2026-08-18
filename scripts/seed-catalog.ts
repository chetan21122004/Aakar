/**
 * Seed catalog, blog, and FAQ from static lib/data.ts into Supabase.
 * Requires SUPABASE_SERVICE_ROLE_KEY in environment.
 *
 * Usage: npx tsx scripts/seed-catalog.ts
 */
import { createClient } from "@supabase/supabase-js"
import { categories, products, blogPosts, faqItems } from "../lib/data"
import { conceptCollections } from "../lib/concepts"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY")
  process.exit(1)
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const COLLECTION_GALLERIES: Record<string, string[]> = {
  "still-mandu": [
    "/catalog/still-mandu-bed.webp",
    "/catalog/still-mandu-lounge-chair.webp",
    "/catalog/still-mandu-coffee-table.webp",
    "/catalog/still-mandu-dining-table.webp",
  ],
  "hampi-rift": [
    "/catalog/hampi-rift-console.webp",
    "/catalog/hampi-rift-media-unit.webp",
    "/catalog/hampi-rift-sofa.webp",
  ],
  "fatehpur-sikri": [
    "/catalog/fatehpur-sikri-armchair.webp",
    "/catalog/fatehpur-sikri-sofa.webp",
    "/catalog/fatehpur-sikri-media-unit.webp",
  ],
  "bishnupur-temples": [
    "/catalog/bishnupur-bed.webp",
    "/catalog/bishnupur-armchair.webp",
    "/catalog/bishnupur-dining-table.webp",
    "/catalog/bishnupur-console.webp",
  ],
}

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

function parseLeadTimeDays(label?: string): { min: number; max: number } {
  if (!label) return { min: 28, max: 42 }
  const weeks = label.match(/(\d+)[–-](\d+)/)
  if (weeks) {
    return { min: parseInt(weeks[1], 10) * 7, max: parseInt(weeks[2], 10) * 7 }
  }
  return { min: 28, max: 42 }
}

async function main() {
  console.log("Seeding Aakar Woodcraft catalog...")

  const categoryIdBySlug = new Map<string, string>()
  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i]
    const { data, error } = await supabase
      .from("categories")
      .upsert(
        {
          slug: cat.slug,
          name: cat.name,
          description: cat.description,
          image_path: cat.image,
          sort_order: i,
          is_published: true,
        },
        { onConflict: "slug" }
      )
      .select("id, slug")
      .single()
    if (error) throw error
    categoryIdBySlug.set(data.slug, data.id)
  }
  console.log(`  ${categories.length} categories`)

  const collectionIdBySlug = new Map<string, string>()
  for (let i = 0; i < conceptCollections.length; i++) {
    const col = conceptCollections[i]
    const { data, error } = await supabase
      .from("collections")
      .upsert(
        {
          slug: col.slug,
          name: col.name,
          tagline: col.eyebrow,
          eyebrow: col.eyebrow,
          narrative: col.narrative,
          image_path: col.image,
          accent_image_path: col.accentImage,
          sort_order: i,
          is_published: true,
        },
        { onConflict: "slug" }
      )
      .select("id, slug")
      .single()
    if (error) throw error
    collectionIdBySlug.set(data.slug, data.id)
  }
  console.log(`  ${conceptCollections.length} collections`)

  const productIdBySlug = new Map<string, string>()

  for (let index = 0; index < products.length; index++) {
    const p = products[index]
    const leadTime = parseLeadTimeDays(p.productionTime)
    const { data: product, error: productError } = await supabase
      .from("products")
      .upsert(
        {
          slug: p.slug,
          name: p.name,
          short_description: p.description,
          long_description: p.longDescription ?? p.description,
          category_id: categoryIdBySlug.get(p.categorySlug),
          materials: p.materials ?? [],
          dimensions_label: p.dimensions,
          specs: p.specs ?? [],
          production_time_label: p.productionTime,
          lead_time_days_min: leadTime.min,
          lead_time_days_max: leadTime.max,
          fulfillment_type: "made_to_order",
          custom_size_allowed: true,
          is_published: true,
        },
        { onConflict: "slug" }
      )
      .select("id, slug")
      .single()
    if (productError) throw productError
    productIdBySlug.set(product.slug, product.id)

    const concept = conceptCollections.find((c) => c.productSlugs.includes(p.slug))
    const pool = [p.image, ...(concept ? COLLECTION_GALLERIES[concept.slug] : [])]
    const uniqueImages = [...new Set(pool)]

    await supabase.from("product_images").delete().eq("product_id", product.id)
    for (let imgIdx = 0; imgIdx < uniqueImages.length; imgIdx++) {
      const { error: imgError } = await supabase.from("product_images").insert({
        product_id: product.id,
        path: uniqueImages[imgIdx],
        alt: p.name,
        sort_order: imgIdx,
      })
      if (imgError) throw imgError
    }

    const { data: optType, error: optTypeError } = await supabase
      .from("product_option_types")
      .upsert(
        { product_id: product.id, name: "finish", sort_order: 0 },
        { onConflict: "product_id,name" }
      )
      .select("id")
      .single()
    if (optTypeError) throw optTypeError

    await supabase.from("product_variants").delete().eq("product_id", product.id)

    const base = parsePricePaise(p.price)
    for (let vIdx = 0; vIdx < p.finishOptions.length; vIdx++) {
      const finish = p.finishOptions[vIdx]
      const { error: variantError } = await supabase.from("product_variants").insert({
        product_id: product.id,
        sku: `AKR-${p.id.padStart(2, "0")}-${vIdx + 1}`,
        options: { finish },
        price_paise: base + finishModifier(finish),
        stock_qty: stockForVariant(index, vIdx),
        is_default: vIdx === 0,
        is_active: true,
      })
      if (variantError) throw variantError
    }
  }
  console.log(`  ${products.length} products with variants`)

  for (const col of conceptCollections) {
    const collectionId = collectionIdBySlug.get(col.slug)
    if (!collectionId) continue
    for (let i = 0; i < col.productSlugs.length; i++) {
      const productId = productIdBySlug.get(col.productSlugs[i])
      if (!productId) continue
      const { error } = await supabase.from("collection_products").upsert(
        { collection_id: collectionId, product_id: productId, sort_order: i },
        { onConflict: "collection_id,product_id" }
      )
      if (error) throw error
    }
  }
  console.log("  collection-product links")

  for (let i = 0; i < blogPosts.length; i++) {
    const post = blogPosts[i]
    const { data: row, error: postError } = await supabase
      .from("blog_posts")
      .upsert(
        {
          slug: post.slug,
          title: post.title,
          category: post.category,
          excerpt: post.excerpt,
          image_path: post.image,
          is_published: true,
        },
        { onConflict: "slug" }
      )
      .select("id")
      .single()
    if (postError) throw postError

    await supabase.from("blog_post_sections").delete().eq("post_id", row.id)
    for (let sIdx = 0; sIdx < post.sections.length; sIdx++) {
      const section = post.sections[sIdx]
      const { error: secError } = await supabase.from("blog_post_sections").insert({
        post_id: row.id,
        heading: section.heading,
        body: section.body,
        sort_order: sIdx,
      })
      if (secError) throw secError
    }
  }
  console.log(`  ${blogPosts.length} blog posts`)

  await supabase.from("faqs").delete().neq("id", "00000000-0000-0000-0000-000000000000")
  for (let i = 0; i < faqItems.length; i++) {
    const faq = faqItems[i]
    const { error } = await supabase.from("faqs").insert({
      question: faq.question,
      answer: faq.answer,
      sort_order: i,
      is_published: true,
    })
    if (error) throw error
  }
  console.log(`  ${faqItems.length} FAQs`)
  console.log("Seed complete.")
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
