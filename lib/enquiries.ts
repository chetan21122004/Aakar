export const ENQUIRY_SOURCES = [
  "contact",
  "product",
  "architects",
  "see_in_room",
  "consultation",
] as const

export type EnquirySource = (typeof ENQUIRY_SOURCES)[number]

export const FURNITURE_PROJECT_TYPES = [
  { value: "console", label: "Console" },
  { value: "dining-table", label: "Dining Table" },
  { value: "coffee-table", label: "Coffee Table" },
  { value: "dining-chair", label: "Dining Chair" },
  { value: "custom", label: "Custom Furniture" },
  { value: "architect", label: "Architect / Designer Project" },
  { value: "workshop-visit", label: "Workshop Visit" },
  { value: "other", label: "Other" },
] as const

export const CONSULTATION_PROJECT_TYPES = [
  { value: "full-home", label: "Full home" },
  { value: "living-room", label: "Living room" },
  { value: "bedroom", label: "Bedroom" },
  { value: "dining", label: "Dining" },
  { value: "modular-home", label: "Modular home" },
  { value: "site-visit", label: "Site visit" },
  { value: "material-guidance", label: "Material & finish guidance" },
  { value: "other", label: "Other" },
] as const

export function isEnquirySource(value: string | undefined): value is EnquirySource {
  return !!value && (ENQUIRY_SOURCES as readonly string[]).includes(value)
}

export function parseEnquirySource(value: string | undefined): EnquirySource {
  return isEnquirySource(value) ? value : "contact"
}

export function projectTypesForSource(source: EnquirySource) {
  return source === "consultation" ? CONSULTATION_PROJECT_TYPES : FURNITURE_PROJECT_TYPES
}
