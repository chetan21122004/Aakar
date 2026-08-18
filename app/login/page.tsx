import { Suspense } from "react"
import LoginPage from "./login-client"

export default function LoginPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background pt-32 text-center">Loading...</div>}>
      <LoginPage />
    </Suspense>
  )
}
