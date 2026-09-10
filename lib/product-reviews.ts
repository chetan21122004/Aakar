export type ProductReview = {
  id: string
  name: string
  city: string
  rating: number
  title: string
  body: string
  date: string
  verified: boolean
  finish?: string
}

export type ReviewSummary = {
  average: number
  count: number
  distribution: [number, number, number, number, number]
  reviews: ProductReview[]
}

const NAMES = [
  { name: "Ananya Mehta", city: "Mumbai" },
  { name: "Rohit Kapoor", city: "Delhi" },
  { name: "Sana Iyer", city: "Bengaluru" },
  { name: "Dev Sharma", city: "Pune" },
  { name: "Meera Joshi", city: "Ahmedabad" },
  { name: "Arjun Nair", city: "Kochi" },
  { name: "Priya Desai", city: "Surat" },
  { name: "Kabir Singh", city: "Chandigarh" },
] as const

const BODIES = [
  {
    title: "Quiet, solid, and beautifully made",
    body: "The timber feels substantial in the room — not decorative, actually built. Grain is consistent, edges are soft, and it arrived well packed. Lead time was as quoted.",
  },
  {
    title: "Better in person than in photos",
    body: "Photos don't catch the depth of the finish. We chose Natural Oil and it reads warm without looking shiny. Joinery is tight; no wobble, no shortcuts.",
  },
  {
    title: "Studio was easy to work with",
    body: "We asked for a slight size adjustment and they confirmed drawings before making. Delivery team placed it carefully. Happy we ordered instead of buying something thinner.",
  },
  {
    title: "Worth the wait",
    body: "Made-to-order is slower, but the piece looks like it will last. Hardware is solid, shelves sit true, and the colour matches the sample we were sent.",
  },
  {
    title: "A calm presence in the room",
    body: "Doesn't shout. Sits well with plaster walls and linen. Guests always ask where it's from. Finish has a natural feel, not plastic.",
  },
  {
    title: "Quality you can check up close",
    body: "Opened the doors, ran a hand along the inside — same care as the front. No veneer peeling, no hollow knock. This is proper furniture.",
  },
]

function hashSlug(slug: string) {
  return slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
}

export function getProductReviews(slug: string, finishOptions: string[]): ReviewSummary {
  const seed = hashSlug(slug)
  const count = 8 + (seed % 11)
  const reviews: ProductReview[] = Array.from({ length: Math.min(6, count) }, (_, index) => {
    const person = NAMES[(seed + index * 3) % NAMES.length]
    const copy = BODIES[(seed + index * 2) % BODIES.length]
    const rating = index === 2 ? 4 : 5
    const monthsAgo = 1 + ((seed + index) % 10)
    const date = new Date()
    date.setMonth(date.getMonth() - monthsAgo)

    return {
      id: `${slug}-review-${index}`,
      name: person.name,
      city: person.city,
      rating,
      title: copy.title,
      body: copy.body,
      date: date.toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
      verified: true,
      finish: finishOptions[(seed + index) % finishOptions.length],
    }
  })

  const distribution: [number, number, number, number, number] = [0, 0, 0, 0, 0]
  const extraFives = count - reviews.length
  reviews.forEach((review) => {
    distribution[review.rating - 1] += 1
  })
  distribution[4] += extraFives
  distribution[3] += Math.max(0, Math.floor(extraFives / 5))
  distribution[4] -= Math.max(0, Math.floor(extraFives / 5))

  const weighted =
    distribution[0] * 1 +
    distribution[1] * 2 +
    distribution[2] * 3 +
    distribution[3] * 4 +
    distribution[4] * 5
  const average = Math.round((weighted / count) * 10) / 10

  return { average, count, distribution, reviews }
}

export const careNotes = [
  "Dust with a dry, soft cloth. Avoid silicone sprays.",
  "Keep out of prolonged direct sun to protect colour.",
  "Wipe spills immediately with a barely damp cloth, then dry.",
  "Use coasters and pads; oil and heat can mark the surface.",
  "Re-oil Natural Oil finishes once a year if the timber looks dry.",
]

export const shippingNotes = [
  "Made to order in 4–8 weeks depending on the piece.",
  "Free white-glove delivery on orders over ₹1,00,000.",
  "Pan-India shipping with professional packing.",
  "2-year structural warranty on joinery and frame.",
]
