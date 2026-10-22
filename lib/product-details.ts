import type { Product } from "@/lib/data"

// Source: Aakar Furniture - Product detail.pdf (October 2026).
// Prices were blank in the source; purchasing data stays with the catalog.
type Details = Pick<Product, "description" | "longDescription" | "materials" | "dimensions" | "specs">

function details(description: string, materials: string[], dimensions: string): Details {
  return { description, longDescription: description, materials, dimensions, specs: materials }
}

export const productDetails: Record<string, Details> = {
  "mandu-dining-table": details(
    "Inspired by the rhythmic arches of Mandu, this dining table blends architectural heritage with modern functionality. The sculptural base creates a sense of lightness while maintaining strong structural integrity. Perfect for contemporary spaces that value both design and storytelling.",
    ["Top: Solid Wood (Teak / Walnut finish)", "Base Arches: Cast Stone / Engineered Sandstone finish", "Bottom Platform: Solid Wood", "Finish: Matte / Natural oil finish"],
    "Length: 7-8 ft; Width: 3-3.5 ft; Height: 2.5 ft",
  ),
  "mandu-lounge-chair": details(
    "A soft interpretation of Mandu's arches, this lounge chair combines comfort with sculptural elegance. The curved back and repeated vertical elements create a calming visual rhythm, making it ideal for relaxed and mindful living spaces.",
    ["Frame: Solid Wood (Walnut / Teak)", "Backrest Spindles: Solid Wood", "Cushion: High-density foam", "Upholstery: Linen / Cotton / Bouclé fabric", "Finish: Matte wood polish"],
    "Width: 2.5-3 ft; Depth: 2.5 ft; Height: 2.5-3 ft; Seat Height: 1.5 ft",
  ),
  "mandu-console": details(
    "A balanced composition of solid and void, this console reflects the quiet beauty of Mandu. The contrast between stone and wood enhances material richness while maintaining a minimal and grounded aesthetic.",
    ["Top: Solid Wood", "Side Blocks: Natural Stone / Travertine / Sandstone", "Middle Structure: Solid Wood", "Finish: Matte + natural texture"],
    "Length: 4.5-5 ft; Width: 1.5 ft; Height: 2.5-2.75 ft",
  ),
  "mandu-bed": details(
    "Rooted in symmetry and stillness, this bed transforms architectural arches into a restful experience. The bold headboard becomes a focal point, while the low platform enhances a grounded and serene atmosphere.",
    ["Frame: Solid Wood", "Headboard: Solid Wood with CNC-cut arches", "Finish: Dark wood matte polish", "Upholstery: Linen / Cotton bedding"],
    "King Size - Length: 6.5 ft; Width: 6 ft; Headboard Height: 4-5 ft; Platform Height: 1-1.25 ft",
  ),
  "mandu-coffee-table": details(
    "Inspired by the step-wells of Mandu, this coffee table plays with depth and layering. The circular form adds softness, while the repeating arches bring continuity to the collection.",
    ["Top Ring: Stone / Microcement / Engineered Stone", "Base: Solid Wood with arch cutouts", "Inner Detail: Wood / Metal accent", "Finish: Matte"],
    "Diameter: 3-3.5 ft; Height: 1-1.25 ft",
  ),
  "hampi-coffee-table": details(
    "A sculptural coffee table inspired by monolithic stone forms, featuring a seamless top and fragmented base elements that reflect the timeless ruins of Hampi. Designed to balance solidity with visual lightness.",
    ["Top: PU Finished MDF (Stone Texture)", "Base: Textured Micro-Concrete Finish", "Structure: Internal MS Frame"],
    "1100 × 650 × 380 mm",
  ),
  "hampi-side-table": details(
    "A compact side table with a clean monolithic top supported by fragmented block elements, creating a subtle interplay between mass and void.",
    ["Top: PU Finish MDF", "Base: Micro-Concrete Texture", "Structure: MS Frame"],
    "Diameter: 400-450 mm; Height: 450 mm",
  ),
  "hampi-console": details(
    "A minimalist console defined by its continuous slab top and stacked base blocks, inspired by the layered architectural remnants of Hampi.",
    ["Top: PU Finished MDF", "Base: Textured Micro-Concrete", "Structure: MS Frame"],
    "1400 × 400 × 800 mm",
  ),
  "hampi-tv-unit": details(
    "A linear TV unit that expresses monolithic strength through its continuous top, while fragmented supports introduce rhythm and visual lightness.",
    ["Top: PU Finished MDF", "Base: Micro-Concrete Blocks", "Internal Shelf: Laminated Ply / MDF", "Structure: MS Frame"],
    "2000 × 450 × 500 mm",
  ),
  "hampi-dining-table": details(
    "A bold dining table with a sculpted monolithic top and clustered base elements, inspired by the structural balance of ancient ruins.",
    ["Top: PU Finish / Solid Surface", "Base: Micro-Concrete Blocks", "Structure: MS Frame"],
    "2000 × 900 × 750 mm",
  ),
  "hampi-dining-chair": details(
    "A soft, rounded chair form that contrasts with its fragmented base, offering both comfort and sculptural presence.",
    ["Upholstery: Bouclé Fabric", "Base: Micro-Concrete Finish", "Internal: Plywood + Foam + MS Support"],
    "520 × 580 × 780 mm",
  ),
  "hampi-l-shape-sofa": details(
    "A large monolithic seating form with smooth curves and soft edges, resting on fragmented supports that echo the architectural remains of Hampi.",
    ["Upholstery: Bouclé / Textured Fabric", "Base: Micro-Concrete Finish", "Internal: Plywood + High Density Foam + MS Frame"],
    "2800 × 1800 × 750 mm",
  ),
  "hampi-3-seater-sofa": details(
    "A refined three-seater sofa combining softness and structure, with a continuous form supported by subtle fragmented elements.",
    ["Upholstery: Bouclé Fabric", "Base: Micro-Concrete Blocks", "Internal: Plywood + Foam + MS Frame"],
    "2000 × 850 × 750 mm",
  ),
  "hampi-lounge-chairs": details(
    "Compact lounge chairs with a soft, enveloping form, grounded by solid block bases that reference the concept of fragmented ruins.",
    ["Upholstery: Bouclé Fabric", "Base: Micro-Concrete Finish", "Internal: Plywood + Foam"],
    "800 × 750 × 750 mm (each chair; pair)",
  ),
}

const legacyKeys: Record<string, string> = {
  "signature-dining-table": "mandu-dining-table",
  "coffee-table": "mandu-coffee-table",
  "dining-chair": "mandu-lounge-chair",
  "fluted-console": "hampi-console",
  "rounded-edge-console": "hampi-tv-unit",
}

export function getProductDetails(product: Pick<Product, "slug" | "name">): Details | undefined {
  const legacy = legacyKeys[product.slug]
  if (legacy) return productDetails[legacy]
  const name = `${product.slug} ${product.name}`.toLowerCase().replace(/[^a-z0-9]+/g, " ")
  const collection = name.includes("mandu") ? "mandu" : name.includes("hampi") ? "hampi" : undefined
  if (!collection) return undefined
  let piece: string | undefined
  if (name.includes("coffee") || name.includes("central table")) piece = "coffee-table"
  else if (name.includes("side table")) piece = "side-table"
  else if (name.includes("dining table")) piece = "dining-table"
  else if (name.includes("lounge chair")) piece = collection === "mandu" ? "lounge-chair" : "lounge-chairs"
  else if (name.includes("dining chair")) piece = "dining-chair"
  else if (name.includes("console")) piece = "console"
  else if (name.includes("tv unit") || name.includes("media unit")) piece = "tv-unit"
  else if (name.includes("bed")) piece = "bed"
  else if (/3 seater|three seater/.test(name)) piece = "3-seater-sofa"
  else if (/l shape|main sofa|sectional|modular sofa/.test(name)) piece = "l-shape-sofa"
  return piece ? productDetails[`${collection}-${piece}`] : undefined
}
