// Aakar Woodcraft — shared dummy/static data for Milestone 1 (static UI only).
// All images are free-to-use Unsplash photos, hotlinked directly (next.config.mjs has images.unoptimized: true).
// No CMS / backend / API is wired up here — this file is the single source of truth for placeholder content.

export type Collection = {
  slug: string
  name: string
  tagline: string
  description: string
  image: string
  pieceCount: number
}

export type Product = {
  id: string
  slug: string
  name: string
  category: string
  categorySlug: string
  collection: string
  collectionSlug: string
  price: string
  image: string
  description: string
}

export type Category = {
  slug: string
  name: string
  description: string
  image: string
  startingPrice: string
}

// ---------- Collections (5 named editorial collections) ----------
export const collections: Collection[] = [
  {
    slug: "hampi-rift",
    name: "Hampi Rift",
    tagline: "A collection inspired by stone textures, heritage forms, and grounded architectural lines.",
    description:
      "Inspired by the weathered granite boulders and temple pillars of Hampi, this collection pairs heavy, monolithic forms with hand-chiselled detailing — furniture that feels carved from history.",
    image: "https://images.unsplash.com/photo-1585128903994-9788298932a6?q=80&w=1600&auto=format&fit=crop",
    pieceCount: 14,
  },
  {
    slug: "still-mandu",
    name: "Still Mandu",
    tagline: "Calm, minimal, and timeless pieces inspired by quiet spaces and historic elegance.",
    description:
      "Named for the quiet lake palaces of Mandu, this collection strips furniture back to its essentials — clean lines, soft edges, and a stillness that lets the grain of the wood do the talking.",
    image: "https://images.unsplash.com/photo-1631510390389-c1e4fb20ff31?q=80&w=1600&auto=format&fit=crop",
    pieceCount: 11,
  },
  {
    slug: "terravaani",
    name: "Terravaani",
    tagline: "Earthy tones, natural textures, and handcrafted forms for warm living spaces.",
    description:
      "Terravaani speaks the language of the earth — open-pore finishes, warm tonal woods, and silhouettes that draw from root systems and riverbeds. Grounded, textural, and quietly luxurious.",
    image: "https://images.unsplash.com/photo-1560449752-3fd4bdbe7df0?q=80&w=1600&auto=format&fit=crop",
    pieceCount: 16,
  },
  {
    slug: "sikri-shift",
    name: "Sikri Shift",
    tagline: "Bold silhouettes and refined details inspired by royal architecture and modern living.",
    description:
      "Drawing from the red sandstone arches and jharokhas of Fatehpur Sikri, this collection brings confident geometric framing and a regal silhouette to the modern Indian home.",
    image: "https://images.unsplash.com/photo-1568347760450-1ef7874c5f5f?q=80&w=1600&auto=format&fit=crop",
    pieceCount: 9,
  },
  {
    slug: "auroville",
    name: "Auroville",
    tagline: "Organic, peaceful, and contemporary furniture inspired by mindful design.",
    description:
      "An ode to Auroville's experimental, nature-led design ethos. Soft curves, lighter woods, and an organic-contemporary sensibility built for sunlit, open-plan living.",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1600&auto=format&fit=crop",
    pieceCount: 12,
  },
]

// ---------- Categories (5 product categories) ----------
export const categories: Category[] = [
  {
    slug: "sofas",
    name: "Sofas",
    description: "Hand-upholstered seating built on solid wood frames, designed for everyday comfort.",
    image: "https://images.unsplash.com/photo-1560184897-67f4a3f9a7fa?q=80&w=1600&auto=format&fit=crop",
    startingPrice: "From ₹68,000",
  },
  {
    slug: "dining-tables",
    name: "Dining Tables",
    description: "Expansive, heirloom-quality tables crafted from premium solid woods.",
    image: "https://images.unsplash.com/photo-1758977403438-1b8546560d31?q=80&w=1600&auto=format&fit=crop",
    startingPrice: "From ₹52,000",
  },
  {
    slug: "coffee-tables",
    name: "Coffee Tables",
    description: "Statement centrepieces with hand-turned legs and natural live edges.",
    image: "https://images.unsplash.com/photo-1581428982868-e410dd047a90?q=80&w=1600&auto=format&fit=crop",
    startingPrice: "From ₹22,000",
  },
  {
    slug: "wardrobes",
    name: "Wardrobes",
    description: "Spacious storage built with traditional joinery and soft-close detailing.",
    image: "https://images.unsplash.com/photo-1769690398694-9c5d5ca4b4ea?q=80&w=1600&auto=format&fit=crop",
    startingPrice: "From ₹85,000",
  },
  {
    slug: "beds",
    name: "Beds",
    description: "Substantial bed frames designed to be passed down, not replaced.",
    image: "https://images.unsplash.com/photo-1761591671882-b1c7b84bd0d6?q=80&w=1600&auto=format&fit=crop",
    startingPrice: "From ₹58,000",
  },
]

// ---------- Featured products (6 on Home, more available for Shop) ----------
export const products: Product[] = [
  {
    id: "1",
    slug: "curved-sectional-sofa",
    name: "Curved Sectional Sofa",
    category: "Sofas",
    categorySlug: "sofas",
    collection: "Auroville",
    collectionSlug: "auroville",
    price: "From ₹85,000",
    image: "https://images.unsplash.com/photo-1631510390389-c1e4fb20ff31?q=80&w=1200&auto=format&fit=crop",
    description: "A premium curved wooden sectional sofa designed for spacious living rooms.",
  },
  {
    id: "2",
    slug: "solid-wood-dining-table",
    name: "Solid Wood Dining Table",
    category: "Dining Tables",
    categorySlug: "dining-tables",
    collection: "Hampi Rift",
    collectionSlug: "hampi-rift",
    price: "From ₹65,000",
    image: "https://images.unsplash.com/photo-1585128903994-9788298932a6?q=80&w=1200&auto=format&fit=crop",
    description: "A six-seater dining table in solid wood with a hand-rubbed natural finish and chamfered legs.",
  },
  {
    id: "3",
    slug: "minimal-coffee-table",
    name: "Minimal Coffee Table",
    category: "Coffee Tables",
    categorySlug: "coffee-tables",
    collection: "Still Mandu",
    collectionSlug: "still-mandu",
    price: "From ₹28,000",
    image: "https://images.unsplash.com/photo-1581428982868-e410dd047a90?q=80&w=1200&auto=format&fit=crop",
    description: "A single live-edge slab top set on hand-turned wood legs, finished with natural oil.",
  },
  {
    id: "4",
    slug: "custom-wardrobe",
    name: "Custom Wardrobe",
    category: "Wardrobes",
    categorySlug: "wardrobes",
    collection: "Terravaani",
    collectionSlug: "terravaani",
    price: "From ₹95,000",
    image: "https://images.unsplash.com/photo-1769690398694-9c5d5ca4b4ea?q=80&w=1200&auto=format&fit=crop",
    description: "A four-door wardrobe with fluted panel detailing, custom-built to your room size.",
  },
  {
    id: "5",
    slug: "wooden-bed-frame",
    name: "Wooden Bed Frame",
    category: "Beds",
    categorySlug: "beds",
    collection: "Sikri Shift",
    collectionSlug: "sikri-shift",
    price: "From ₹75,000",
    image: "https://images.unsplash.com/photo-1761591671882-b1c7b84bd0d6?q=80&w=1200&auto=format&fit=crop",
    description: "A low-profile bed frame in solid wood with an upholstered headboard and integrated side tables.",
  },
  {
    id: "6",
    slug: "accent-lounge-chair",
    name: "Accent Lounge Chair",
    category: "Chairs",
    categorySlug: "chairs",
    collection: "Auroville",
    collectionSlug: "auroville",
    price: "From ₹38,000",
    image: "https://images.unsplash.com/photo-1685612213152-b995e1641013?q=80&w=1200&auto=format&fit=crop",
    description: "A light, organic-curved lounge chair in solid wood with a hand-woven cane back.",
  },
  {
    id: "7",
    slug: "mandu-dining-chair-set",
    name: "Mandu Dining Chair (Set of 4)",
    category: "Dining Tables",
    categorySlug: "dining-tables",
    collection: "Still Mandu",
    collectionSlug: "still-mandu",
    price: "₹38,000",
    image: "https://images.unsplash.com/photo-1568347760450-1ef7874c5f5f?q=80&w=1200&auto=format&fit=crop",
    description: "Minimal, comfortable dining chairs in solid oak with a woven seat and gently sloped backrest.",
  },
  {
    id: "8",
    slug: "terra-bedside-table",
    name: "Terra Bedside Table",
    category: "Beds",
    categorySlug: "beds",
    collection: "Terravaani",
    collectionSlug: "terravaani",
    price: "₹16,500",
    image: "https://images.unsplash.com/photo-1718717621302-a359be21a111?q=80&w=1200&auto=format&fit=crop",
    description: "A compact bedside table with a single drawer and open shelf, finished in a warm walnut tone.",
  },
]

// ---------- "Why Choose Aakar Woodcraft" (6 cards) ----------
export const whyChooseFeatures = [
  {
    title: "Solid Wood Construction",
    description:
      "No particleboard, no veneers over MDF. Every piece is built from solid sheesham, mango, teak, or oak.",
  },
  {
    title: "Traditional Joinery",
    description:
      "Mortise-and-tenon and dovetail joints used by generations of Indian carpenters, not just glue and screws.",
  },
  {
    title: "Made to Your Space",
    description:
      "Every dimension can be adjusted to fit your room, your doorway, and the way you actually live.",
  },
  {
    title: "Sustainable Sourcing",
    description:
      "Wood is sourced from responsibly managed plantations, with offcuts repurposed rather than discarded.",
  },
  {
    title: "Hand-Finished Detailing",
    description:
      "Every surface is sanded and finished by hand across multiple passes for a touch you can feel.",
  },
  {
    title: "Pan-India Delivery & Installation",
    description:
      "From our workshop to your home — white-glove delivery and on-site assembly across India.",
  },
]

// ---------- Process Preview (4 steps) ----------
export const processSteps = [
  {
    step: "01",
    title: "Share Your Requirement",
    description: "Tell us what furniture you need, your preferred size, style, material, and space details.",
  },
  {
    step: "02",
    title: "Design & Estimate",
    description: "We discuss the design direction, suggest materials and finishes, and share an estimated quote.",
  },
  {
    step: "03",
    title: "Crafting Begins",
    description: "Once approved, our team begins crafting your furniture with careful attention to detail.",
  },
  {
    step: "04",
    title: "Delivery & Installation",
    description: "The finished piece is delivered and installed at your space with proper finishing checks.",
  },
]

// ---------- Testimonials (3 dummy) ----------
export const testimonials = [
  {
    name: "Homeowner, Pune",
    role: "",
    quote: "The finish and proportions were exactly what we wanted for our living room.",
  },
  {
    name: "Custom Furniture Client",
    role: "",
    quote: "Aakar helped us customize the dining table size and wood finish perfectly.",
  },
  {
    name: "Interior Project Client",
    role: "",
    quote: "The piece feels premium, solid, and beautifully crafted.",
  },
]

// ---------- Gallery images (spaces, details, finished pieces) ----------
export const galleryImages = [
  { src: "https://images.unsplash.com/photo-1762529716272-b316f61502e7?q=80&w=1600&auto=format&fit=crop", alt: "Modern living room styled with handcrafted wooden furniture" },
  { src: "https://images.unsplash.com/photo-1585128903994-9788298932a6?q=80&w=1600&auto=format&fit=crop", alt: "Solid wood dining table with chairs" },
  { src: "https://images.unsplash.com/photo-1736506159893-22cca29b8018?q=80&w=1600&auto=format&fit=crop", alt: "Close-up of dark wood grain texture" },
  { src: "https://images.unsplash.com/photo-1581428982868-e410dd047a90?q=80&w=1600&auto=format&fit=crop", alt: "Wooden coffee table beside a sofa" },
  { src: "https://images.unsplash.com/photo-1687422810663-c316494f725a?q=80&w=1600&auto=format&fit=crop", alt: "Craftsman shaping a piece of wood by hand" },
  { src: "https://images.unsplash.com/photo-1769690398694-9c5d5ca4b4ea?q=80&w=1600&auto=format&fit=crop", alt: "Bedroom with a large wooden wardrobe" },
  { src: "https://images.unsplash.com/photo-1761591671882-b1c7b84bd0d6?q=80&w=1600&auto=format&fit=crop", alt: "Wooden bed frame with bedside table and lamp" },
  { src: "https://images.unsplash.com/photo-1685612213152-b995e1641013?q=80&w=1600&auto=format&fit=crop", alt: "Vintage-style wooden armchair" },
]

// ---------- Misc shared placeholders ----------
export const contactInfo = {
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "hello@aakarwoodcraft.com",
  address: "Aakar Woodcraft Workshop, Industrial Estate Road, Jodhpur, Rajasthan, India",
}
