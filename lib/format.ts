export function formatINR(paise: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100)
}

export function formatOptionsLabel(options: Record<string, string | undefined>): string {
  return Object.values(options)
    .filter(Boolean)
    .join(" · ")
}
