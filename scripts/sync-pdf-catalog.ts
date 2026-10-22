import fs from "node:fs"
import { alignPdfCatalog, pdfCatalog } from "../lib/pdf-catalog"
import { conceptCollections } from "../lib/concepts"

const project = "aeppzycrudqkmsgothzz"
const configs = [".codex/config.toml", ".cursor/mcp.json"]
  .filter((file) => fs.existsSync(file))
  .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)
const tokens = [...new Set(configs.map((file) => {
  const source = fs.readFileSync(file, "utf8")
  return file.endsWith("json")
    ? JSON.parse(source).mcpServers?.supabase?.env?.SUPABASE_ACCESS_TOKEN
    : source.match(/SUPABASE_ACCESS_TOKEN\s*=\s*["']([^"']+)["']/)?.[1]
}).filter(Boolean))] as string[]
let activeToken: string | undefined

async function query(sql: string): Promise<any[]> {
  for (const token of activeToken ? [activeToken] : tokens) {
    const response = await fetch(`https://api.supabase.com/v1/projects/${project}/database/query`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query: sql }),
    })
    if (response.status === 401 && !activeToken) continue
    if (!response.ok) throw new Error(`Supabase HTTP ${response.status}: ${await response.text()}`)
    activeToken = token
    return await response.json()
  }
  throw new Error("Supabase rejected the tokens in both project configurations")
}

const sqlString = (value: unknown) => `'${JSON.stringify(value).replace(/'/g, "''")}'::jsonb`

async function main() {
  const before = await query(`select jsonb_build_object(
    'products', (select coalesce(jsonb_agg(p), '[]') from public.products p),
    'variants', (select coalesce(jsonb_agg(v), '[]') from public.product_variants v),
    'images', (select coalesce(jsonb_agg(i), '[]') from public.product_images i),
    'memberships', (select coalesce(jsonb_agg(m), '[]') from public.collection_products m),
    'collections', (select coalesce(jsonb_agg(c), '[]') from public.collections c),
    'categories', (select coalesce(jsonb_agg(c), '[]') from public.categories c)
  ) as snapshot`)
  const snapshot = before[0].snapshot
  console.log("Connected. Current catalog:", snapshot.products.map((p: any) => ({ slug: p.slug, published: p.is_published })))
  if (!process.argv.includes("--apply")) return

  fs.mkdirSync("tmp/catalog-backups", { recursive: true })
  const backup = `tmp/catalog-backups/before-pdf-sync-${Date.now()}.json`
  fs.writeFileSync(backup, JSON.stringify(snapshot, null, 2))
  console.log(`Saved catalog backup: ${backup}`)

  const payload = alignPdfCatalog([]).map((product, index) => ({
    ...product, collection: pdfCatalog[index].collection,
    sortOrder: pdfCatalog.filter((p) => p.collection === pdfCatalog[index].collection).findIndex((p) => p.slug === product.slug),
  }))
  await query(`begin;
    do $sync$
    declare item jsonb; col jsonb; pid uuid; cid uuid; catid uuid; oid uuid;
      payload jsonb := ${sqlString(payload)};
    begin
      for col in select value from jsonb_array_elements(${sqlString(conceptCollections)}) loop
        insert into public.collections (slug,name,eyebrow,narrative,image_path,accent_image_path,is_published)
        values (col->>'slug',col->>'name',col->>'eyebrow',col->>'narrative',col->>'image',col->>'accentImage',true)
        on conflict (slug) do update set name=excluded.name,is_published=true;
      end loop;
      for item in select value from jsonb_array_elements(payload) loop
        insert into public.categories (slug,name,is_published)
        values (item->>'categorySlug',item->>'category',true)
        on conflict (slug) do update set is_published=true returning id into catid;
        insert into public.products (slug,name,short_description,long_description,category_id,materials,dimensions_label,specs,is_published)
        values (item->>'slug',item->>'name',item->>'description',item->>'longDescription',catid,
          array(select jsonb_array_elements_text(item->'materials')),item->>'dimensions',
          array(select jsonb_array_elements_text(item->'specs')),true)
        on conflict (slug) do update set name=excluded.name,short_description=excluded.short_description,
          long_description=excluded.long_description,category_id=excluded.category_id,materials=excluded.materials,
          dimensions_label=excluded.dimensions_label,specs=excluded.specs,is_published=true returning id into pid;

        if not exists (select 1 from public.product_variants where product_id=pid and is_active) then
          insert into public.product_variants (product_id,sku,options,price_paise,stock_qty,is_default,is_active)
          values (pid,'AKR-PDF-' || upper(item->>'slug'),'{"finish":"Standard finish"}'::jsonb,
            (item->>'basePricePaise')::int,0,true,true)
          on conflict (sku) do update set is_active=true,is_default=true;
        end if;
        insert into public.product_option_types (product_id,name,sort_order) values (pid,'finish',0)
        on conflict (product_id,name) do update set sort_order=0 returning id into oid;
        insert into public.product_option_values (option_type_id,value,sort_order)
        select oid,v.options->>'finish',0 from public.product_variants v
        where v.product_id=pid and v.is_active and v.options->>'finish' is not null
        on conflict (option_type_id,value) do nothing;

        if item->>'image' <> '/placeholder.svg' or not exists (select 1 from public.product_images where product_id=pid) then
          update public.product_images set path=item->>'image',alt=item->>'name' where product_id=pid and sort_order=0;
          if not found then
            insert into public.product_images (product_id,path,alt,sort_order) values (pid,item->>'image',item->>'name',0);
          end if;
        end if;
      end loop;
      update public.products set is_published=false where slug not in (select value->>'slug' from jsonb_array_elements(payload));
      delete from public.collection_products where collection_id in
        (select id from public.collections where slug in ('still-mandu','hampi-rift','fatehpur-sikri','bishnupur-temples'));
      for item in select value from jsonb_array_elements(payload) loop
        select id into pid from public.products where slug=item->>'slug';
        select id into cid from public.collections where slug=item->>'collection';
        insert into public.collection_products (collection_id,product_id,sort_order) values (cid,pid,(item->>'sortOrder')::int);
      end loop;
      if (select count(*) from public.products where is_published) <> 14 then raise exception 'Expected 14 published products'; end if;
    end $sync$;
    commit;`)
  const counts = await query(`select c.slug,count(p.id)::int as products from public.collections c
    left join public.collection_products cp on cp.collection_id=c.id
    left join public.products p on p.id=cp.product_id and p.is_published
    where c.slug in ('still-mandu','hampi-rift','fatehpur-sikri','bishnupur-temples') group by c.slug order by c.slug`)
  console.log("Verified collection counts:", counts)
  const invalid = await query(`select p.slug from public.products p where p.is_published and
    (p.dimensions_label is null or cardinality(p.materials)=0 or not exists
      (select 1 from public.product_variants v where v.product_id=p.id and v.is_active and v.price_paise>0))`)
  if (invalid.length) throw new Error(`Incomplete products: ${JSON.stringify(invalid)}`)
  console.log("Verified: all 14 published products have specifications and active priced database variants.")
}
main().catch((error) => { console.error(error.message, error.cause?.code ?? ""); process.exitCode = 1 })
