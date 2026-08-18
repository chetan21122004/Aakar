"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { createClient } from "@/lib/supabase/client"
import { getGuestToken } from "@/lib/guest-token"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") ?? "/account"
  const { register, handleSubmit } = useForm<{ email: string; password: string }>()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: { email: string; password: string }) => {
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      toast.error("Sign in failed", { description: error.message })
      setLoading(false)
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

    toast.success("Welcome back")
    router.push(redirect)
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-md mx-auto">
          <h1 className="type-h1 mb-2 text-center">Sign In</h1>
          <p className="type-body text-center mb-10">Access your orders and saved details.</p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="type-label block mb-2">Email</label>
              <input
                {...register("email")}
                type="email"
                required
                className="w-full border border-border bg-input px-4 py-3 font-sans text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="type-label block mb-2">Password</label>
              <input
                {...register("password")}
                type="password"
                required
                className="w-full border border-border bg-input px-4 py-3 font-sans text-sm"
              />
            </div>
            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <p className="font-sans text-sm text-center text-muted-foreground mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-foreground underline underline-offset-2">
              Create one
            </Link>
          </p>
        </div>
      </section>
      <FooterSection />
    </main>
  )
}
