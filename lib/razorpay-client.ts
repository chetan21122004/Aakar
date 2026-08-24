export type RazorpaySuccessResponse = {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

export type RazorpayCheckoutOptions = {
  key: string
  amount: number
  currency: string
  name: string
  description?: string
  order_id: string
  prefill?: {
    name?: string
    email?: string
    contact?: string
  }
  notes?: Record<string, string>
  theme?: { color: string }
  handler: (response: RazorpaySuccessResponse) => void
  modal?: {
    ondismiss?: () => void
  }
}

type RazorpayInstance = {
  open: () => void
  on: (event: "payment.failed", handler: (response: { error: { description?: string } }) => void) => void
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => RazorpayInstance
  }
}

export function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve()
      return
    }

    const existing = document.querySelector<HTMLScriptElement>('script[src="https://checkout.razorpay.com/v1/checkout.js"]')
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true })
      existing.addEventListener("error", () => reject(new Error("Failed to load Razorpay")), { once: true })
      return
    }

    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Failed to load Razorpay Checkout"))
    document.body.appendChild(script)
  })
}

export function openRazorpayCheckout(options: RazorpayCheckoutOptions) {
  if (!window.Razorpay) {
    throw new Error("Razorpay Checkout is not loaded")
  }
  const checkout = new window.Razorpay(options)
  return checkout
}
