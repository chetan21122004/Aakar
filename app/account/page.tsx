import Link from "next/link"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="type-h1 mb-4">My Account</h1>
          <p className="type-body mb-8">
            Sign in to view your order history, saved addresses, and profile details.
          </p>
          <div className="border border-border bg-card p-8">
            <p className="font-sans text-sm text-muted-foreground mb-6">
              Account features are coming soon. You can still shop and checkout as a guest.
            </p>
            <Link href="/login" className="btn-primary">
              Sign In
            </Link>
          </div>
        </div>
      </section>
      <FooterSection />
    </main>
  )
}
