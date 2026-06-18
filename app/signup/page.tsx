"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"

export default function SignupPage() {
  const { register, handleSubmit } = useForm<{ name: string; email: string; password: string }>()
  const [loading, setLoading] = useState(false)

  const onSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.info("Account registration coming soon", {
        description: "You can still checkout as a guest.",
      })
    }, 600)
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
                className="w-full border border-border bg-input px-4 py-3 font-sans text-sm"
              />
            </div>
            <div>
              <label className="type-label block mb-2">Email</label>
              <input
                {...register("email")}
                type="email"
                className="w-full border border-border bg-input px-4 py-3 font-sans text-sm"
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
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
          <p className="font-sans text-sm text-center text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-foreground underline underline-offset-2">
              Sign in
            </Link>
          </p>
        </div>
      </section>
      <FooterSection />
    </main>
  )
}
