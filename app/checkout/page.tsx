import { Suspense } from "react"
import CheckoutPage from "./checkout-client"

export default function CheckoutPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background pt-32 text-center">Loading...</div>}>
      <CheckoutPage />
    </Suspense>
  )
}
