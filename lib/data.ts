// Aakar Woodcraft - shared static data for Milestone 1 (static UI only).
// Product copy sourced from Website Pages Pdfs.md.

export const FINISH_OPTIONS = ["Natural Oil", "Matte Lacquer", "Dark Stain"] as const

export type Product = {
  id: string
  slug: string
  name: string
  category: string
  categorySlug: string
  price: string
  image: string
  description: string
  longDescription?: string
  materials?: string[]
  dimensions?: string
  specs?: string[]
  finishOptions: string[]
  productionTime?: string
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

export type Collection = {
  slug: string
  name: string
  tagline: string
  image: string
  pieceCount: number
}

export const collections: Collection[] = [
  {
    slug: "still-mandu",
    name: "Still Mandu",
    tagline: "Quiet architectural forms shaped by Mandu's arches and measured repetition.",
    image: "/catalog/still-mandu-bed.webp",
    pieceCount: 5,
  },
  {
    slug: "hampi-rift",
    name: "Hampi Rift",
    tagline: "Sculptural volumes inspired by Hampi's weathered stone landscape.",
    image: "/catalog/hampi-rift-sofa.webp",
    pieceCount: 7,
  },
  {
    slug: "fatehpur-sikri",
    name: "Fatehpur Sikri",
    tagline: "Carved detail and ceremonial proportions translated into contemporary furniture.",
    image: "/catalog/fatehpur-sikri-sofa.webp",
    pieceCount: 4,
  },
  {
    slug: "bishnupur-temples",
    name: "Bishnupur Temples",
    tagline: "Warm timber forms informed by Bishnupur's terracotta reliefs and temple geometry.",
    image: "/catalog/bishnupur-bed.webp",
    pieceCount: 6,
  },
]

// ---------- Shop categories (no dedicated category pages - links to /shop) ----------
export const categories: Category[] = [
  {
    slug: "consoles",
    name: "Consoles",
    description: "Contemporary console tables with fluted detailing, rounded edges, and heritage joinery.",
    image: "/catalog/hampi-rift-console.webp",
    startingPrice: "Starting at ₹98,000",
  },
  {
    slug: "dining-tables",
    name: "Dining Tables",
    description: "Live-edge solid wood dining tables with tapered legs, built to seat and gather.",
    image: "/catalog/still-mandu-dining-table.webp",
    startingPrice: "Starting at ₹2,85,000",
  },
  {
    slug: "coffee-tables",
    name: "Coffee Tables",
    description: "Solid walnut coffee tables designed as quiet centrepieces for living spaces.",
    image: "/catalog/still-mandu-coffee-table.webp",
    startingPrice: "Starting at ₹75,000",
  },
  {
    slug: "chairs",
    name: "Chairs",
    description: "Ergonomic solid wood dining chairs with subtle backrest detailing.",
    image: "/catalog/still-mandu-lounge-chair.webp",
    startingPrice: "Starting at ₹42,000",
  },
  {
    slug: "beds",
    name: "Beds",
    description: "Solid wood bed frames with quiet proportions for restful bedrooms.",
    image: "/catalog/bishnupur-bed.webp",
    startingPrice: "Starting at ₹1,65,000",
  },
  {
    slug: "sofas",
    name: "Sofas",
    description: "Crafted seating with solid wood frames and tailored upholstery.",
    image: "/catalog/hampi-rift-sofa.webp",
    startingPrice: "Starting at ₹1,85,000",
  },
  {
    slug: "wardrobes",
    name: "Wardrobes",
    description: "Made-to-order wardrobes with solid wood fronts and precise joinery.",
    image: "/catalog/fatehpur-sikri-media-unit.webp",
    startingPrice: "Starting at ₹2,20,000",
  },
  {
    slug: "cabinets",
    name: "Cabinets",
    description: "Storage cabinets with warm wood grain and refined hardware.",
    image: "/catalog/bishnupur-console.webp",
    startingPrice: "Starting at ₹1,10,000",
  },
]

// ---------- Products (6-piece catalog from Website Pages Pdfs.md) ----------
export const products: Product[] = [
  {
    id: "1",
    slug: "fluted-console",
    name: "Hampi Rift Console",
    category: "Consoles",
    categorySlug: "consoles",
    price: "Starting at ₹1,25,000",
    image: "/catalog/hampi-rift-console.webp",
    description: "A grounded console composed from divided monolithic volumes.",
    longDescription:
      "Our most celebrated piece. Vertical fluting across the facade creates subtle rhythm and texture. Rounded edges soften the form. Brass handles add a jewel-like accent. Each console is hand-finished to reveal the natural grain of solid walnut.",
    materials: ["Solid Indian Walnut", "Brushed brass hardware"],
    dimensions: "W 150 × D 40 × H 75 cm (width adjustable between 120–180 cm)",
    specs: [
      "Vertical fluting detail across front panel",
      "Soft rounded edges on all surfaces",
      "Two interior shelves",
      "Solid wood construction (no veneers)",
      "Mortise and tenon joinery",
      "Hand-finished to museum standards",
    ],
    finishOptions: ["Natural Oil", "Matte Lacquer", "Dark Stain"],
    productionTime: "4–6 weeks",
  },
  {
    id: "2",
    slug: "signature-dining-table",
    name: "Still Mandu Dining Table",
    category: "Dining Tables",
    categorySlug: "dining-tables",
    price: "Starting at ₹2,85,000",
    image: "/catalog/still-mandu-dining-table.webp",
    description: "Repeated arch forms create a quiet rhythm beneath an oval top.",
    longDescription:
      "A signature dining table built from solid Indian walnut with a live-edge top and elegantly tapered legs. Traditional mortise-and-tenon joinery gives it the weight and presence of an heirloom piece, while proportions can be adjusted to match your dining space.",
    materials: ["Solid Indian Walnut"],
    dimensions: "Customizable to your dining space",
    specs: [
      "Live-edge solid wood top",
      "Tapered legs",
      "Mortise and tenon joinery",
      "Hand-rubbed natural oil or matte lacquer finish",
    ],
    finishOptions: ["Natural Oil", "Matte Lacquer", "Dark Stain"],
    productionTime: "4–6 weeks",
  },
  {
    id: "3",
    slug: "coffee-table",
    name: "Mandu Oval Coffee Table",
    category: "Coffee Tables",
    categorySlug: "coffee-tables",
    price: "Starting at ₹75,000",
    image: "/catalog/still-mandu-coffee-table.webp",
    description: "A low oval centrepiece shaped by repetition, openness and stillness.",
    longDescription:
      "Designed as a quiet centrepiece for living rooms, this coffee table is built from solid Indian walnut with soft, hand-finished edges and traditional joinery. Proportions and finish can be tailored to your space.",
    materials: ["Solid Indian Walnut"],
    dimensions: "Customizable to your living space",
    specs: [
      "Solid wood construction (no veneers)",
      "Mortise and tenon joinery",
      "Hand-finished edges",
    ],
    finishOptions: ["Natural Oil", "Matte Lacquer", "Dark Stain"],
    productionTime: "4–6 weeks",
  },
  {
    id: "4",
    slug: "dining-chair",
    name: "Mandu Arch Lounge Chair",
    category: "Chairs",
    categorySlug: "chairs",
    price: "Starting at ₹42,000",
    image: "/catalog/still-mandu-lounge-chair.webp",
    description: "An enveloping lounge chair framed by Mandu's repeated arches.",
    longDescription:
      "An ergonomic dining chair with a subtle curved backrest, built from solid Indian walnut. Designed for everyday comfort at the dining table, with hand-finished surfaces and traditional joinery throughout.",
    materials: ["Solid Indian Walnut"],
    dimensions: "Standard dining chair proportions (customizable on request)",
    specs: [
      "Ergonomic curved backrest",
      "Solid wood frame",
      "Mortise and tenon joinery",
      "Hand-finished surfaces",
    ],
    finishOptions: ["Natural Oil", "Matte Lacquer", "Dark Stain"],
    productionTime: "4–6 weeks",
  },
  {
    id: "5",
    slug: "rounded-edge-console",
    name: "Hampi Rift Media Unit",
    category: "Consoles",
    categorySlug: "consoles",
    price: "Starting at ₹98,000",
    image: "/catalog/hampi-rift-media-unit.webp",
    description: "A long media unit built from separated stone-like volumes.",
    longDescription:
      "A minimalist console with soft, tactile rounded edges and integrated drawer storage. Built from solid Indian walnut with hand-sanded surfaces through multiple grits - no sharp corners, just a quiet, inviting form for entryways and hallways.",
    materials: ["Solid Indian Walnut"],
    dimensions: "W 120 × D 35 × H 70 cm",
    specs: [
      "Soft rounded edges on all surfaces",
      "Drawer storage",
      "Solid wood construction (no veneers)",
      "Mortise and tenon joinery",
    ],
    finishOptions: ["Natural Oil", "Matte Lacquer"],
    productionTime: "4–6 weeks",
  },
  {
    id: "6",
    slug: "heritage-console",
    name: "Bishnupur Story Console",
    category: "Consoles",
    categorySlug: "consoles",
    price: "Starting at ₹1,40,000",
    image: "/catalog/bishnupur-console.webp",
    description: "Narrative terracotta reliefs translated into carved timber panels.",
    longDescription:
      "Where subtle traditional joinery meets modern proportions. This console draws on centuries-old woodworking methods - mortise and tenon construction, hand-finished surfaces - in a form suited to contemporary Indian homes.",
    materials: ["Solid Indian Walnut"],
    dimensions: "W 180 × D 45 × H 75 cm",
    specs: [
      "Traditional mortise and tenon joinery",
      "Solid wood construction (no veneers)",
      "Hand-rubbed finish",
      "Custom sizing available within design framework",
    ],
    finishOptions: ["Natural Oil", "Dark Stain"],
    productionTime: "4–6 weeks",
  },
  {
    id: "7",
    slug: "teak-platform-bed",
    name: "Bishnupur Story Bed",
    category: "Beds",
    categorySlug: "beds",
    price: "Starting at ₹1,65,000",
    image: "/catalog/bishnupur-bed.webp",
    description: "A carved bed where temple stories become texture and material.",
    longDescription:
      "A low platform bed in solid wood with clean lines and a calm presence. Built for Indian bedrooms that need durable craft without visual noise.",
    materials: ["Solid Teak"],
    dimensions: "Queen / King (customizable)",
    specs: [
      "Solid wood platform frame",
      "Mortise and tenon joinery",
      "Custom sizing available",
      "Hand-finished surfaces",
    ],
    finishOptions: ["Natural Oil", "Matte Lacquer", "Dark Stain"],
    productionTime: "5–7 weeks",
  },
  {
    id: "8",
    slug: "lounge-sofa",
    name: "Fatehpur Sikri Sofa",
    category: "Sofas",
    categorySlug: "sofas",
    price: "Starting at ₹1,85,000",
    image: "/catalog/fatehpur-sikri-sofa.webp",
    description: "Ceremonial arches and carved surfaces balanced with everyday comfort.",
    longDescription:
      "A lounge sofa built on a solid wood frame with tailored upholstery. Soft seating, firm structure, and proportions suited to modern living rooms.",
    materials: ["Solid Indian Walnut", "Upholstery fabric"],
    dimensions: "W 210 × D 95 × H 80 cm",
    specs: [
      "Solid wood frame",
      "High-density cushioning",
      "Tailored upholstery",
      "Custom fabric options",
    ],
    finishOptions: ["Natural Oil", "Matte Lacquer"],
    productionTime: "5–7 weeks",
  },
  {
    id: "9",
    slug: "linear-wardrobe",
    name: "Fatehpur Sikri Media Unit",
    category: "Wardrobes",
    categorySlug: "wardrobes",
    price: "Starting at ₹2,20,000",
    image: "/catalog/fatehpur-sikri-media-unit.webp",
    description: "An architectural media unit exploring beauty that remains functional.",
    longDescription:
      "A linear wardrobe with solid wood fronts and made-to-order interiors. Designed for calm bedrooms that need storage without cluttered hardware.",
    materials: ["Solid Indian Walnut"],
    dimensions: "Custom to room height and width",
    specs: [
      "Solid wood front panels",
      "Adjustable interior configuration",
      "Soft-close hardware",
      "Made-to-order sizing",
    ],
    finishOptions: ["Natural Oil", "Matte Lacquer", "Dark Stain"],
    productionTime: "6–8 weeks",
  },
  {
    id: "10",
    slug: "storage-cabinet",
    name: "Bishnupur Story Cabinet",
    category: "Cabinets",
    categorySlug: "cabinets",
    price: "Starting at ₹1,10,000",
    image: "/catalog/bishnupur-console.webp",
    description: "A storage cabinet with carved panels inspired by terracotta storytelling.",
    longDescription:
      "A versatile storage cabinet for living rooms and dining spaces. Solid wood construction with refined hardware and balanced proportions.",
    materials: ["Solid Indian Walnut", "Brushed brass hardware"],
    dimensions: "W 100 × D 40 × H 120 cm",
    specs: [
      "Adjustable shelves",
      "Solid wood construction",
      "Brushed brass hardware",
      "Hand-finished surfaces",
    ],
    finishOptions: ["Natural Oil", "Matte Lacquer", "Dark Stain"],
    productionTime: "4–6 weeks",
  },
]

// ---------- "Why Choose Aakar Woodcraft" (6 cards) ----------
export const whyChooseFeatures = [
  {
    title: "Solid Wood Construction",
    description:
      "No particleboard, no veneers over MDF. Every piece is built from solid Indian walnut.",
  },
  {
    title: "Traditional Joinery",
    description:
      "Mortise-and-tenon joints used by generations of Indian carpenters - no screws, no shortcuts.",
  },
  {
    title: "Made to Your Space",
    description:
      "Every dimension can be adjusted within the design framework to fit your room and doorway.",
  },
  {
    title: "Sustainable Sourcing",
    description:
      "Wood sourced from certified sustainable plantations, with offcuts repurposed rather than discarded.",
  },
  {
    title: "Hand-Finished Detailing",
    description:
      "Every surface is sanded and finished by hand across seven grits for a touch you can feel.",
  },
  {
    title: "Pan-India Delivery & Installation",
    description:
      "From our workshop to your home - white-glove delivery and on-site assembly across India.",
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

// ---------- For Architects page ----------
export const architectOfferings = [
  "Custom sizing within design framework",
  "Material samples and finish consultation",
  "Dedicated project manager",
  "Volume pricing for multiple pieces",
  "Coordinated delivery timelines",
]

export const architectCollaborationSteps = [
  {
    step: "01",
    title: "Initial Discussion",
    description: "Share your project brief and requirements.",
  },
  {
    step: "02",
    title: "Material Samples",
    description: "Review wood samples and finish options.",
  },
  {
    step: "03",
    title: "Custom Sizing",
    description: "Adjust dimensions to suit your design intent.",
  },
  {
    step: "04",
    title: "Production & Delivery",
    description: "Coordinated timelines and white-glove installation.",
  },
]

export const architectBenefits = [
  {
    title: "Design Integrity",
    description:
      "We respect your design vision. Customization within our design framework maintains aesthetic coherence.",
  },
  {
    title: "Reliable Timelines",
    description:
      "We provide realistic production schedules and honor our commitments. No surprises. No delays.",
  },
  {
    title: "Quality Assurance",
    description:
      "Museum-quality standards. Every piece inspected before delivery. Your reputation is our priority.",
  },
]

export const architectCaseStudies = [
  {
    title: "Private Villa, Bangalore",
    description: "Custom dining set and console for contemporary villa.",
    image:
      "/catalog/still-mandu-dining-table.webp",
  },
  {
    title: "Boutique Hotel, Goa",
    description: "Furniture suite for 12 rooms and common areas.",
    image:
      "/catalog/hampi-rift-sofa.webp",
  },
]

export const architectTestimonial = {
  quote:
    "AAKAR understands the balance between flexibility and design discipline. Their furniture elevated our project without compromising the overall vision.",
  name: "Principal Architect, Design Studio",
}

export const architectTechnicalInfo = [
  {
    title: "CAD Drawings Available",
    description:
      "Technical drawings and specifications available for integration into your project documentation.",
  },
  {
    title: "Volume Pricing",
    description:
      "Competitive pricing for multiple pieces or full project furnishing. Pricing transparency from the start.",
  },
  {
    title: "Lead Times",
    description:
      "Standard pieces: 4–6 weeks. Complex customization: 6–8 weeks. Rush orders considered on a case-by-case basis.",
  },
  {
    title: "Pan-India Delivery",
    description:
      "White-glove delivery across India. Installation support available. Packaging designed for safe long-distance transport.",
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

// ---------- Gallery images ----------
export const galleryImages = [
  { src: "/catalog/still-mandu-bed.webp", alt: "Still Mandu bed in an architectural bedroom" },
  { src: "/catalog/still-mandu-dining-table.webp", alt: "Still Mandu dining table" },
  { src: "/catalog/hampi-rift-console.webp", alt: "Hampi Rift console" },
  { src: "/catalog/hampi-rift-sofa.webp", alt: "Hampi Rift modular sofa" },
  { src: "/catalog/fatehpur-sikri-armchair.webp", alt: "Fatehpur Sikri inspired armchair" },
  { src: "/catalog/fatehpur-sikri-sofa.webp", alt: "Fatehpur Sikri inspired sofa" },
  { src: "/catalog/bishnupur-console.webp", alt: "Bishnupur Temples console" },
  { src: "/catalog/bishnupur-armchair.webp", alt: "Bishnupur Temples armchair" },
]

// ---------- Home page sections (from Website Pages Pdfs.md) ----------
export const craftDetailsHome = [
  {
    title: "Vertical Fluting",
    description:
      "Hand-carved grooves create subtle rhythm and texture across the surface.",
    image:
      "https://images.unsplash.com/photo-1631510390389-c1e4fb20ff31?q=80&w=1200&auto=format&fit=crop",
    alt: "Close-up of vertical fluting detail on solid wood",
  },
  {
    title: "Rounded Edges",
    description:
      "Soft, tactile edges hand-finished to perfection. No sharp corners.",
    image:
      "https://images.unsplash.com/photo-1568347760450-1ef7874c5f5f?q=80&w=1200&auto=format&fit=crop",
    alt: "Wooden console with softly rounded edges",
  },
]

export const trustBadges = [
  {
    title: "Made to Order",
    subtitle: "4–6 weeks production time",
  },
  {
    title: "Pan-India Delivery",
    subtitle: "White-glove delivery included",
  },
  {
    title: "2-Year Warranty",
    subtitle: "Structural warranty on every piece",
  },
]

export const footerLinks = {
  explore: [
    { label: "Collections", href: "/collections" },
    { label: "The Console", href: "/the-console" },
    { label: "Craft & Materials", href: "/craft-materials" },
    { label: "For Architects", href: "/for-architects" },
  ],
  company: [
    { label: "About Aakar", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ],
}

export const collectionHubCategories = [
  {
    id: "still-mandu",
    label: "Still Mandu",
    slug: "still-mandu",
    productSlugs: ["signature-dining-table", "coffee-table", "dining-chair"],
  },
  {
    id: "hampi-rift",
    label: "Hampi Rift",
    slug: "hampi-rift",
    productSlugs: ["fluted-console", "rounded-edge-console"],
  },
  {
    id: "fatehpur-sikri",
    label: "Fatehpur Sikri",
    slug: "fatehpur-sikri",
    productSlugs: ["lounge-sofa", "linear-wardrobe"],
  },
  {
    id: "bishnupur-temples",
    label: "Bishnupur Temples",
    slug: "bishnupur-temples",
    productSlugs: ["heritage-console", "teak-platform-bed", "storage-cabinet"],
  },
]

export const materialSpecifications = [
  {
    title: "Joinery",
    description: "Traditional mortise and tenon construction. No screws.",
  },
  {
    title: "Finish",
    description: "Hand-rubbed oil or matte lacquer. Food-safe, low VOC.",
  },
]

// ---------- Misc shared placeholders ----------
export const contactInfo = {
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "hello@aakarwoodcraft.com",
  instagram: "@aakarwoodcraft",
  instagramUrl: "https://instagram.com/aakarwoodcraft",
  address: "Aakar Woodcraft Workshop, Industrial Estate Road, Jodhpur, Rajasthan, India",
  responseTime: "We respond to all enquiries within 24 hours on business days.",
}

// ---------- FAQ ----------
export const faqItems: FAQItem[] = [
  {
    question: "How long does production take?",
    answer:
      "Each piece is made to order. Production begins after final approval of dimensions and finish. Most pieces require 4–6 weeks.",
  },
  {
    question: "Do you ship across India?",
    answer:
      "Yes. Pan-India white-glove delivery is included. Each piece is carefully packed and delivered by our trusted partners, with installation assistance available.",
  },
  {
    question: "Can dimensions be customized?",
    answer:
      "All pieces can be customized within the design framework to suit your space. Dimensions, finishes, and material specifications can be discussed during the enquiry process.",
  },
  {
    question: "What finish options are available?",
    answer:
      "We offer Natural Oil (a matte, tactile finish that enhances grain), Matte Lacquer (a smooth, protective surface with subtle sheen), and Dark Stain (a deep, rich tone with natural variation).",
  },
  {
    question: "How do I care for solid wood furniture?",
    answer:
      "Wipe with a soft dry cloth. Apply wood conditioner every 6 months. Avoid direct sunlight and moisture. A detailed care guide is provided with delivery.",
  },
  {
    question: "Do you work with architects and designers?",
    answer:
      "Yes. We collaborate with architects and interior designers on residential and hospitality projects. Custom sizing, material samples, and dedicated support are available.",
  },
  {
    question: "Is there a warranty?",
    answer:
      "Yes. Every piece is backed by a 2-year structural warranty. We stand behind every piece we make.",
  },
  {
    question: "Can I visit your workshop?",
    answer:
      "Yes. Workshop visits are available by appointment. See how we work, understand our process, and experience the materials firsthand.",
  },
]

export const faqQuickStats = [
  { value: "4–6 Weeks", label: "For most pieces" },
  { value: "Pan-India", label: "White-glove delivery" },
  { value: "2 Years", label: "Structural warranty" },
]

// ---------- Blog ----------
export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-choose-solid-wood-furniture-for-your-home",
    title: "How to Choose Solid Wood Furniture for Your Home",
    category: "Buying Guide",
    excerpt:
      "A practical guide to spotting genuine solid wood, understanding finishes, and choosing pieces that last for years rather than seasons.",
    image: "/catalog/still-mandu-bed.webp",
    sections: [
      {
        heading: "Why solid wood matters",
        body: "Solid wood furniture is built to last for generations rather than a few years. Unlike particleboard or plywood pieces wrapped in a wood-look laminate, solid wood can be repaired, refinished, and passed down - and it ages with character instead of wearing out.",
      },
      {
        heading: "How to check wood quality",
        body: "Look at the grain on the edges and underside of a piece, not just the visible top surface - genuine solid wood shows consistent grain all the way through. Check joints for traditional joinery such as mortise-and-tenon rather than just glue and staples, and gently test for weight and stability.",
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
      "From compact 4-seaters to large family tables - how to pick the right dining table dimensions for your room and household size.",
    image: "/catalog/bishnupur-dining-table.webp",
    sections: [
      {
        heading: "Start with your room, not the table",
        body: "Before choosing a size, measure your dining area and leave at least 90 cm of clearance on all sides for chairs to pull out and people to walk past comfortably.",
      },
      {
        heading: "Sizing for seating count",
        body: "As a general guide, a 4-seater table needs roughly 4 feet in length, a 6-seater around 6 feet, and an 8-seater closer to 8 feet - though shape and chair style can shift this.",
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
    image: "/catalog/hampi-rift-sofa.webp",
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
        body: "Custom furniture is built to your exact dimensions, wood, finish, and design preferences - ideal for unusual room sizes, specific style requirements, or pieces meant to last a lifetime.",
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
        body: "Weigh your timeline, budget, and how closely your space matches standard furniture sizes - then decide whether ready-made convenience or custom precision suits you better.",
      },
    ],
  },
  {
    slug: "how-to-match-wood-furniture-with-modern-interiors",
    title: "How to Match Wood Furniture with Modern Interiors",
    category: "Interior Design",
    excerpt:
      "Practical tips on pairing solid wood furniture - tones, textures, and silhouettes - with clean, contemporary interior styling.",
    image: "/catalog/fatehpur-sikri-sofa.webp",
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
        body: "Stick to one or two dominant wood tones across a room to keep the palette cohesive, and let one statement piece - like a dining table or console - anchor the space.",
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
