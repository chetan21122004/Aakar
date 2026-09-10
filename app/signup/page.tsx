"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { PasswordInput } from "@/components/password-input"
import { createClient } from "@/lib/supabase/client"
import { getGuestToken } from "@/lib/guest-token"
import { safeNextPath } from "@/lib/safe-redirect"

function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = safeNextPath(searchParams.get("redirect"))
  const { register, handleSubmit } = useForm<{
    name: string
    email: string
    phone: string
    password: string
  }>()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: { name: string; email: string; phone: string; password: string }) => {
    setLoading(true)

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    const result = (await response.json()) as { error?: string }

    if (!response.ok) {
      toast.error("Registration failed", { description: result.error })
      setLoading(false)
      return
    }

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      toast.error("Account created, but sign in failed", { description: error.message })
      setLoading(false)
      router.push(`/login?redirect=${encodeURIComponent(redirect)}`)
      return
    }

    const guestToken = getGuestToken()
    if (guestToken) {
      await fetch("/api/cart/merge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guestToken }),
      })
    }

    toast.success("Account created")
    router.push(redirect)
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-md mx-auto">
          <h1 className="type-h1 mb-2 text-center">Create Account</h1>
          <p className="type-body text-center mb-10">Save your details for faster checkout.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="type-label block mb-2">Full Name</label>
              <input
                {...register("name")}
                required
                className="w-full border border-border bg-input px-4 py-3 font-sans text-sm"
              />
            </div>
            <div>
              <label className="type-label block mb-2">Email</label>
              <input
                {...register("email")}
                type="email"
                required
                className="w-full border border-border bg-input px-4 py-3 font-sans text-sm"
              />
            </div>
            <div>
              <label className="type-label block mb-2">Phone</label>
              <input
                {...register("phone")}
                type="tel"
                required
                minLength={10}
                placeholder="+91 98765 43210"
                className="w-full border border-border bg-input px-4 py-3 font-sans text-sm"
              />
            </div>
            <div>
              <label className="type-label block mb-2">Password</label>
              <PasswordInput {...register("password")} required minLength={6} />
            </div>
            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
          <p className="font-sans text-sm text-center text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link
              href={`/login?redirect=${encodeURIComponent(redirect)}`}
              className="text-foreground underline underline-offset-2"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>
      <FooterSection />
    </main>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background pt-32 text-center">Loading...</div>}>
      <SignupForm />
    </Suspense>
  )
}
