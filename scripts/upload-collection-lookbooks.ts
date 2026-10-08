/**
 * Upload Hampi Rift and Still Mandu lookbook pages into the public
 * product-media bucket and replace their collection_images rows.
 *
 * Usage: node --env-file=.env --import tsx scripts/upload-collection-lookbooks.ts
 */
import fs from "fs"
import path from "path"
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

const folders = [
  { slug: "hampi-rift", dir: "Hampi Collection", name: "Hampi Rift" },
  { slug: "still-mandu", dir: "Still Mandu Collection", name: "Still Mandu" },
] as const

function pageNumber(filename: string) {
  const match = filename.match(/page-(\d+)/i)
  return match ? Number(match[1]) : 0
}

async function uploadFolder(folder: (typeof folders)[number]) {
  const directory = path.join(process.cwd(), "public", "collections", folder.dir)
  const files = fs
    .readdirSync(directory)
    .filter((file) => file.toLowerCase().endsWith(".webp"))
    .sort((a, b) => pageNumber(a) - pageNumber(b))

  const { data: collection, error: collectionError } = await supabase
    .from("collections")
    .select("id")
    .eq("slug", folder.slug)
    .single()

  if (collectionError || !collection) {
    throw new Error(`Collection ${folder.slug} was not found`)
  }

  const rows: { collection_id: string; path: string; alt: string; sort_order: number }[] = []

  for (const [index, file] of files.entries()) {
    const page = pageNumber(file)
    const storagePath = `collections/${folder.slug}/page-${String(page).padStart(4, "0")}.webp`
    const body = fs.readFileSync(path.join(directory, file))
    const { error: uploadError } = await supabase.storage.from("product-media").upload(storagePath, body, {
      contentType: "image/webp",
      upsert: true,
    })
    if (uploadError) {
      throw new Error(`${storagePath}: ${uploadError.message}`)
    }
    const { data } = supabase.storage.from("product-media").getPublicUrl(storagePath)
    rows.push({
      collection_id: collection.id,
      path: data.publicUrl,
      alt: `${folder.name} lookbook, page ${page}`,
      sort_order: index,
    })
    console.log(`uploaded ${storagePath}`)
  }

  const { error: deleteError } = await supabase.from("collection_images").delete().eq("collection_id", collection.id)
  if (deleteError) throw new Error(deleteError.message)

  const { error: insertError } = await supabase.from("collection_images").insert(rows)
  if (insertError) throw new Error(insertError.message)

  console.log(`${folder.slug}: ${rows.length} images`)
}

async function main() {
  for (const folder of folders) {
    await uploadFolder(folder)
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
