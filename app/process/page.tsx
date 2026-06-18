import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { CTASection } from "@/components/cta-section"
import { processSteps } from "@/lib/data"

export const metadata = {
  title: "Our Process | Aakar Woodcraft",
  description: "A simple, guided process from your first enquiry to final delivery and installation of your custom wooden furniture.",
}

export default function ProcessPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-4xl font-light text-foreground md:text-5xl mb-6">
            How Custom Furniture Comes to Life
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A simple, guided process from your first enquiry to final delivery and installation.
          </p>
        </div>
      </section>

      {/* Process steps */}
      <section className="px-6 md:px-12 lg:px-20 pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-12">
          {processSteps.map((step) => (
            <div key={step.step} className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-full border border-foreground/20 flex items-center justify-center font-serif text-lg text-foreground">
                  {step.step}
                </div>
              </div>
              <div>
                <h3 className="font-serif text-xl text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title="Ready to discuss your furniture requirement?"
        subtitle="Share a few details about your space and our team will guide you through the rest."
        primaryText="Request a Quote"
        primaryHref="/contact"
        dark
      />

      <FooterSection />
    </main>
  )
}
