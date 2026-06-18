"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"

export default function LoginPage() {
  const { register, handleSubmit } = useForm<{ email: string; password: string }>()
  const [loading, setLoading] = useState(false)

  const onSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.info("Account login coming soon", {
        description: "Sign-in will be available in a future update.",
      })
    }, 600)
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
                className="w-full border border-border bg-input px-4 py-3 font-sans text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="type-label block mb-2">Password</label>
              <input
                {...register("password")}
                type="password"
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
