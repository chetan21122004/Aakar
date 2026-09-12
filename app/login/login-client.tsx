"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { PasswordInput } from "@/components/password-input"
import { createClient } from "@/lib/supabase/client"
import { getGuestToken } from "@/lib/guest-token"
import { persistCloudSession } from "@/lib/local-auth"
import { safeNextPath } from "@/lib/safe-redirect"

function authErrorMessage(message: string) {
  const text = message.toLowerCase()
  if (text.includes("invalid login") || text.includes("invalid credentials") || text.includes("not confirmed")) {
    return "Email or password is incorrect. Create an account if you are new."
  }
  return message
}

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = safeNextPath(searchParams.get("redirect"))
  const fromRoomPreview = redirect.startsWith("/see-in-your-room")
  const { register, handleSubmit } = useForm<{ email: string; password: string }>()
  const [loading, setLoading] = useState(false)

  const finishLogin = async (email: string, name?: string) => {
    persistCloudSession({ email, name })
    const guestToken = getGuestToken()
    if (guestToken) {
      await fetch("/api/cart/merge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guestToken }),
      }).catch(() => undefined)
    }
    toast.success("Welcome back")
    router.push(redirect)
    router.refresh()
  }

  const onSubmit = async (data: { email: string; password: string }) => {
    setLoading(true)
    try {
      const supabase = createClient()
      let { data: signedIn, error } = await supabase.auth.signInWithPassword({
        email: data.email.trim(),
        password: data.password,
      })
      if (error && /not confirmed/i.test(error.message)) {
        await fetch("/api/auth/confirm-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: data.email.trim(), password: data.password }),
        })
        const retry = await supabase.auth.signInWithPassword({
          email: data.email.trim(),
          password: data.password,
        })
        signedIn = retry.data
        error = retry.error
      }
      if (error || !signedIn.user) {
        throw new Error(authErrorMessage(error?.message || "Could not sign in."))
      }
      await finishLogin(
        signedIn.user.email || data.email,
        (signedIn.user.user_metadata?.full_name as string | undefined) || data.email,
      )
    } catch (error) {
      toast.error("Sign in failed", {
        description: error instanceof Error ? error.message : "Check your email and password.",
      })
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-md mx-auto">
          <h1 className="type-h1 mb-2 text-center">Sign In</h1>
          <p className="type-body text-center mb-10">
            {fromRoomPreview
              ? "Sign in to preview furniture in your room. Works on any device."
              : "Use the same email and password on any phone or computer."}
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="type-label block mb-2">Email</label>
              <input
                {...register("email")}
                type="email"
                required
                autoComplete="email"
                className="w-full border border-border bg-input px-4 py-3 font-sans text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="type-label block mb-2">Password</label>
              <PasswordInput {...register("password")} required autoComplete="current-password" />
            </div>
            <button type="submit" className="btn-primary w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <p className="font-sans text-sm text-center text-muted-foreground mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href={`/signup?redirect=${encodeURIComponent(redirect)}`}
              className="text-foreground underline underline-offset-2"
            >
              Create one
            </Link>
          </p>
        </div>
      </section>
      <FooterSection />
    </main>
  )
}
