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
  longDescription?: string
  materials?: string[]
  dimensions?: string
  customizationOptions?: string[]
}

export type BlogPost = {
  slug: string
  title: string
  category: string
  excerpt: string
  image: string
  sections: { heading: string; body: string }[]
}

export type FAQItem = {
  question: string
  answer: string
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

// ---------- Shop products (exact 12-product Shop list from brief) ----------
const defaultCustomization = [
  "Choice of solid wood (sheesham, mango, teak, or oak)",
  "Multiple finish and stain options",
  "Adjustable dimensions to fit your space",
  "Upholstery fabric and color selection (where applicable)",
]

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
    longDescription:
      "The Curved Sectional Sofa brings a soft, organic silhouette to spacious living rooms. Built on a solid wood frame and finished with hand-selected upholstery, it is designed to be the anchor piece of an open-plan home — equally suited to quiet evenings and full living-room gatherings.",
    materials: ["Solid wood frame (sheesham or mango)", "High-density foam cushioning", "Premium upholstery fabric"],
    dimensions: "Customizable as per room size",
    customizationOptions: defaultCustomization,
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
    longDescription:
      "A six-seater dining table built from solid wood, finished by hand for a natural, tactile surface. Chamfered legs and traditional joinery give it the weight and presence of an heirloom piece, while the size and finish can be adjusted to match your dining space exactly.",
    materials: ["Solid wood top and legs", "Hand-rubbed natural finish", "Traditional mortise-and-tenon joinery"],
    dimensions: "Customizable as per room size",
    customizationOptions: defaultCustomization,
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
    longDescription:
      "A single live-edge slab top set on hand-turned legs, finished with natural oil to highlight the grain. Designed as a quiet centrepiece for minimal living rooms, where the wood itself is the detail.",
    materials: ["Live-edge solid wood slab", "Hand-turned wood legs", "Natural oil finish"],
    dimensions: "Customizable as per room size",
    customizationOptions: defaultCustomization,
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
    longDescription:
      "A four-door wardrobe with fluted panel detailing, built to your exact room dimensions. Internal shelving, drawers, and hanging space can all be configured to match how you actually store your belongings.",
    materials: ["Solid wood and engineered wood panels", "Soft-close hinges and channels", "Fluted panel detailing"],
    dimensions: "Customizable as per room size",
    customizationOptions: defaultCustomization,
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
    longDescription:
      "A low-profile bed frame in solid wood, paired with an upholstered headboard and integrated side tables. The bold, geometric framing draws from royal architectural lines while staying grounded and comfortable for everyday use.",
    materials: ["Solid wood frame", "Upholstered headboard", "Integrated side tables"],
    dimensions: "Customizable as per room size",
    customizationOptions: defaultCustomization,
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
    longDescription:
      "A light, organic-curved lounge chair with a hand-woven cane back. Designed for sunlit corners and reading nooks, it pairs solid wood construction with a soft, breathable seat.",
    materials: ["Solid wood frame", "Hand-woven cane backing", "Cushioned seat"],
    dimensions: "Customizable as per room size",
    customizationOptions: defaultCustomization,
  },
  {
    id: "7",
    slug: "hampi-rift-console",
    name: "Hampi Rift Console",
    category: "Consoles",
    categorySlug: "consoles",
    collection: "Hampi Rift",
    collectionSlug: "hampi-rift",
    price: "From ₹42,000",
    image: "https://images.unsplash.com/photo-1568347760450-1ef7874c5f5f?q=80&w=1200&auto=format&fit=crop",
    description: "A monolithic console table with hand-chiselled detailing, inspired by Hampi's stone architecture.",
    longDescription:
      "A monolithic console table with hand-chiselled detailing, built for entryways and hallways. Heavy, grounded forms and a textured finish give it the feel of furniture carved from history.",
    materials: ["Solid wood construction", "Hand-chiselled surface detailing", "Natural matte finish"],
    dimensions: "Customizable as per room size",
    customizationOptions: defaultCustomization,
  },
  {
    id: "8",
    slug: "terravaani-storage-cabinet",
    name: "Terravaani Storage Cabinet",
    category: "Storage",
    categorySlug: "storage",
    collection: "Terravaani",
    collectionSlug: "terravaani",
    price: "From ₹58,000",
    image: "https://images.unsplash.com/photo-1718717621302-a359be21a111?q=80&w=1200&auto=format&fit=crop",
    description: "An earthy, open-pore finished storage cabinet with warm tonal wood and soft, rounded edges.",
    longDescription:
      "An earthy storage cabinet finished in an open-pore texture that lets the natural wood tone come through. Soft, rounded edges and quiet hardware make it equally at home in a living room or bedroom.",
    materials: ["Solid wood and veneer panels", "Open-pore natural finish", "Soft-close hardware"],
    dimensions: "Customizable as per room size",
    customizationOptions: defaultCustomization,
  },
  {
    id: "9",
    slug: "still-mandu-coffee-table",
    name: "Still Mandu Coffee Table",
    category: "Coffee Tables",
    categorySlug: "coffee-tables",
    collection: "Still Mandu",
    collectionSlug: "still-mandu",
    price: "From ₹32,000",
    image: "https://images.unsplash.com/photo-1581428982868-e410dd047a90?q=80&w=1200&auto=format&fit=crop",
    description: "A calm, minimal coffee table with clean lines and soft edges, finished to let the grain speak.",
    longDescription:
      "Clean lines and soft edges define this coffee table, stripped back to let the natural grain of the wood do the talking. A quiet, considered centrepiece for minimal living spaces.",
    materials: ["Solid wood top", "Hand-finished edges", "Natural oil finish"],
    dimensions: "Customizable as per room size",
    customizationOptions: defaultCustomization,
  },
  {
    id: "10",
    slug: "sikri-shift-bedside-table",
    name: "Sikri Shift Bedside Table",
    category: "Storage",
    categorySlug: "storage",
    collection: "Sikri Shift",
    collectionSlug: "sikri-shift",
    price: "From ₹22,000",
    image: "https://images.unsplash.com/photo-1769690398694-9c5d5ca4b4ea?q=80&w=1200&auto=format&fit=crop",
    description: "A compact bedside table with bold geometric framing and a single drawer, in a warm wood tone.",
    longDescription:
      "A compact bedside table with bold, confident geometric framing inspired by royal architectural arches. A single drawer and open shelf keep it functional, while the warm wood tone keeps it grounded.",
    materials: ["Solid wood frame", "Single drawer with soft-close glide", "Warm natural finish"],
    dimensions: "Customizable as per room size",
    customizationOptions: defaultCustomization,
  },
  {
    id: "11",
    slug: "auroville-lounge-sofa",
    name: "Auroville Lounge Sofa",
    category: "Sofas",
    categorySlug: "sofas",
    collection: "Auroville",
    collectionSlug: "auroville",
    price: "From ₹92,000",
    image: "https://images.unsplash.com/photo-1560184897-67f4a3f9a7fa?q=80&w=1200&auto=format&fit=crop",
    description: "An organic, contemporary lounge sofa with soft curves and lighter woods, built for sunlit rooms.",
    longDescription:
      "Soft curves and lighter woods give this lounge sofa an organic, contemporary feel, built for open-plan, sunlit living rooms. A relaxed silhouette that still holds its shape for years of everyday use.",
    materials: ["Solid wood frame", "High-density foam cushioning", "Premium upholstery fabric"],
    dimensions: "Customizable as per room size",
    customizationOptions: defaultCustomization,
  },
  {
    id: "12",
    slug: "custom-dining-bench",
    name: "Custom Dining Bench",
    category: "Dining Tables",
    categorySlug: "dining-tables",
    collection: "Still Mandu",
    collectionSlug: "still-mandu",
    price: "From ₹34,000",
    image: "https://images.unsplash.com/photo-1685612213152-b995e1641013?q=80&w=1200&auto=format&fit=crop",
    description: "A minimal solid wood dining bench, built to match your existing table's wood tone and finish.",
    longDescription:
      "A minimal solid wood dining bench, made to match the wood tone and finish of your existing dining table. A simple, comfortable seating option for everyday meals or extra seating when guests are over.",
    materials: ["Solid wood construction", "Hand-finished surface", "Reinforced joinery"],
    dimensions: "Customizable as per room size",
    customizationOptions: defaultCustomization,
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

// ---------- FAQ (exact 6 Q&A from brief) ----------
export const faqItems: FAQItem[] = [
  {
    question: "Do you make custom furniture?",
    answer:
      "Yes, Aakar Woodcraft creates custom furniture based on your size, material, finish, and design requirements.",
  },
  {
    question: "Can I choose the wood and finish?",
    answer: "Yes, you can choose from available wood types, finishes, colors, and detailing options.",
  },
  {
    question: "How long does custom furniture take?",
    answer:
      "The timeline depends on the product size and complexity. A basic estimate is shared after requirement discussion.",
  },
  {
    question: "Do you provide delivery and installation?",
    answer:
      "Yes, delivery and installation can be coordinated based on your location and project requirements.",
  },
  {
    question: "Can I request a quote online?",
    answer: "Yes, you can submit an enquiry form or contact directly through WhatsApp.",
  },
  {
    question: "What is the See in Your Room feature?",
    answer:
      "It is an AI-based feature planned for the website where customers can upload a room photo and visualize selected furniture in their space. For now, this is a static UI preview only.",
  },
]

// ---------- Blog (listing + detail content) ----------
export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-choose-solid-wood-furniture-for-your-home",
    title: "How to Choose Solid Wood Furniture for Your Home",
    category: "Buying Guide",
    excerpt:
      "A practical guide to spotting genuine solid wood, understanding finishes, and choosing pieces that last for years rather than seasons.",
    image: "https://images.unsplash.com/photo-1585128903994-9788298932a6?q=80&w=1600&auto=format&fit=crop",
    sections: [
      {
        heading: "Why solid wood matters",
        body: "Solid wood furniture is built to last for generations rather than a few years. Unlike particleboard or plywood pieces wrapped in a wood-look laminate, solid wood can be repaired, refinished, and passed down — and it ages with character instead of wearing out.",
      },
      {
        heading: "How to check wood quality",
        body: "Look at the grain on the edges and underside of a piece, not just the visible top surface — genuine solid wood shows consistent grain all the way through. Check joints for traditional joinery such as mortise-and-tenon rather than just glue and staples, and gently test for weight and stability.",
      },
      {
        heading: "Choosing the right finish",
        body: "A natural oil or hand-rubbed finish highlights the grain and feels warmer to the touch, while a lacquered finish offers more resistance to spills and daily wear. Consider how the piece will be used day to day before choosing a finish.",
      },
      {
        heading: "Matching furniture with your space",
        body: "Lighter wood tones tend to suit smaller or more contemporary rooms, while deeper, richer tones work well in larger or more traditional spaces. Measure your space carefully and consider how the piece will sit alongside your existing furniture.",
      },
      {
        heading: "When to choose custom furniture",
        body: "If you have an unusual room size, a specific wood or finish in mind, or simply can't find the right proportions off the shelf, custom furniture lets you specify exactly what you need rather than compromising.",
      },
      {
        heading: "Final buying checklist",
        body: "Before you buy, confirm the wood type, check the joinery, ask about the finish and maintenance it needs, and make sure the dimensions are right for your space. A little diligence upfront means a piece that lasts.",
      },
    ],
  },
  {
    slug: "dining-table-size-guide-for-indian-homes",
    title: "Dining Table Size Guide for Indian Homes",
    category: "Furniture Guide",
    excerpt:
      "From compact 4-seaters to large family tables — how to pick the right dining table dimensions for your room and household size.",
    image: "https://images.unsplash.com/photo-1758977403438-1b8546560d31?q=80&w=1600&auto=format&fit=crop",
    sections: [
      {
        heading: "Start with your room, not the table",
        body: "Before choosing a size, measure your dining area and leave at least 90 cm of clearance on all sides for chairs to pull out and people to walk past comfortably.",
      },
      {
        heading: "Sizing for seating count",
        body: "As a general guide, a 4-seater table needs roughly 4 feet in length, a 6-seater around 6 feet, and an 8-seater closer to 8 feet — though shape and chair style can shift this.",
      },
      {
        heading: "Shape considerations",
        body: "Rectangular tables suit longer rooms and larger gatherings, while round or square tables work well in compact or square-shaped dining areas and encourage easier conversation.",
      },
      {
        heading: "Custom sizing for awkward spaces",
        body: "Many Indian homes have dining areas that don't match standard furniture dimensions. A custom table lets you fit the exact footprint of your room without sacrificing seating capacity.",
      },
      {
        heading: "When to choose custom furniture",
        body: "If your dining area is an unusual shape, opens into another room, or needs to seat more people than standard tables allow, a custom-built table solves the problem precisely.",
      },
      {
        heading: "Final buying checklist",
        body: "Measure your space, decide on your typical seating count, choose a shape that fits the room, and confirm clearance space before finalizing your dining table.",
      },
    ],
  },
  {
    slug: "custom-furniture-vs-ready-made-furniture",
    title: "Custom Furniture vs Ready-Made Furniture",
    category: "Custom Furniture",
    excerpt:
      "Weighing the trade-offs between off-the-shelf convenience and made-to-order furniture built around your space and needs.",
    image: "https://images.unsplash.com/photo-1560449752-3fd4bdbe7df0?q=80&w=1600&auto=format&fit=crop",
    sections: [
      {
        heading: "Why solid wood matters",
        body: "Whether custom or ready-made, the material is what determines how long a piece lasts. Solid wood construction is the foundation worth prioritizing in either path.",
      },
      {
        heading: "What ready-made furniture offers",
        body: "Ready-made furniture is available immediately, often at a lower upfront cost, and works well when your space matches standard dimensions and your needs are fairly typical.",
      },
      {
        heading: "What custom furniture offers",
        body: "Custom furniture is built to your exact dimensions, wood, finish, and design preferences — ideal for unusual room sizes, specific style requirements, or pieces meant to last a lifetime.",
      },
      {
        heading: "Matching furniture with your space",
        body: "If your room has non-standard proportions, an awkward alcove, or a specific design vision, ready-made options often involve compromise that custom furniture avoids.",
      },
      {
        heading: "When to choose custom furniture",
        body: "Choose custom when standard sizes don't fit, when you want a specific wood or finish, or when you're furnishing a space you plan to live in for years to come.",
      },
      {
        heading: "Final buying checklist",
        body: "Weigh your timeline, budget, and how closely your space matches standard furniture sizes — then decide whether ready-made convenience or custom precision suits you better.",
      },
    ],
  },
  {
    slug: "how-to-match-wood-furniture-with-modern-interiors",
    title: "How to Match Wood Furniture with Modern Interiors",
    category: "Interior Design",
    excerpt:
      "Practical tips on pairing solid wood furniture — tones, textures, and silhouettes — with clean, contemporary interior styling.",
    image: "https://images.unsplash.com/photo-1560184897-67f4a3f9a7fa?q=80&w=1600&auto=format&fit=crop",
    sections: [
      {
        heading: "Why solid wood matters",
        body: "Wood adds warmth and texture to interiors that can otherwise feel cold or sterile, making it a natural complement to modern, minimal design schemes.",
      },
      {
        heading: "Choosing the right finish",
        body: "For modern interiors, lighter or matte finishes tend to feel more contemporary, while glossy or very dark finishes can read as more traditional or formal.",
      },
      {
        heading: "Matching furniture with your space",
        body: "Stick to one or two dominant wood tones across a room to keep the palette cohesive, and let one statement piece — like a dining table or console — anchor the space.",
      },
      {
        heading: "Balancing silhouettes",
        body: "Pair clean-lined, minimal wood furniture with simpler wall and lighting choices, and save more sculptural or organic pieces for rooms with otherwise plain backdrops.",
      },
      {
        heading: "When to choose custom furniture",
        body: "If you have a specific tone or finish in mind to match your interior palette, custom furniture lets you specify it exactly rather than searching for a close match.",
      },
      {
        heading: "Final buying checklist",
        body: "Decide on your dominant wood tone, choose a finish that matches your interior style, and pick one or two statement pieces rather than overcrowding the room.",
      },
    ],
  },
]
