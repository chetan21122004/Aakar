/**
 * Replace Hampi Rift and Still Mandu product photos with lookbook pages,
 * and unpublish the older placeholder products.
 *
 * Usage: node --env-file=.env --import tsx scripts/assign-collection-images.ts
 */
import { createClient } from "@supabase/supabase-js"

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY")
  process.exit(1)
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const retiredSlugs = [
  "lounge-sofa",
  "linear-wardrobe",
  "heritage-console",
  "teak-platform-bed",
  "storage-cabinet",
]

const collectionSlugs = ["hampi-rift", "still-mandu"]

function splitEvenly<T>(items: T[], parts: number): T[][] {
  const size = Math.floor(items.length / parts)
  const extra = items.length % parts
  const chunks: T[][] = []
  let cursor = 0
  for (let index = 0; index < parts; index += 1) {
    const count = size + (index < extra ? 1 : 0)
    chunks.push(items.slice(cursor, cursor + count))
    cursor += count
  }
  return chunks
}

async function main() {
  const { error: retireError } = await supabase
    .from("products")
    .update({ is_published: false })
    .in("slug", retiredSlugs)
  if (retireError) throw new Error(retireError.message)
  console.log(`unpublished ${retiredSlugs.length} placeholder products`)

  for (const slug of collectionSlugs) {
    const { data: collection, error: collectionError } = await supabase
      .from("collections")
      .select("id, name")
      .eq("slug", slug)
      .single()
    if (collectionError || !collection) throw new Error(`Missing collection ${slug}`)

    const { data: images, error: imageError } = await supabase
      .from("collection_images")
      .select("path, alt, sort_order")
      .eq("collection_id", collection.id)
      .order("sort_order")
    if (imageError) throw new Error(imageError.message)
    if (!images?.length) throw new Error(`No lookbook images for ${slug}`)

    const { data: links, error: linkError } = await supabase
      .from("collection_products")
      .select("product_id, sort_order")
      .eq("collection_id", collection.id)
      .order("sort_order")
    if (linkError) throw new Error(linkError.message)
    if (!links?.length) throw new Error(`No products for ${slug}`)

    const chunks = splitEvenly(images, links.length)
    for (const [index, link] of links.entries()) {
      const { error: deleteError } = await supabase.from("product_images").delete().eq("product_id", link.product_id)
      if (deleteError) throw new Error(deleteError.message)

      const rows = chunks[index].map((image, sortOrder) => ({
        product_id: link.product_id,
        path: image.path,
        alt: image.alt ?? `${collection.name} lookbook`,
        sort_order: sortOrder,
      }))
      const { error: insertError } = await supabase.from("product_images").insert(rows)
      if (insertError) throw new Error(insertError.message)
      console.log(`${slug} product ${index + 1}: ${rows.length} images`)
    }
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
