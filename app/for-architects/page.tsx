import Image from "next/image"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { CTASection } from "@/components/cta-section"
import {
  architectBenefits,
  architectCaseStudies,
  architectCollaborationSteps,
  architectOfferings,
  architectTechnicalInfo,
  architectTestimonial,
} from "@/lib/data"

export const metadata = {
  title: "For Architects & Designers | Aakar Woodcraft",
  description:
    "Collaborate with Aakar Woodcraft on residential and hospitality projects. Custom sizing, material samples, dedicated project management, and pan-India delivery.",
}

export default function ForArchitectsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Intro */}
      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="type-label mb-4">Collaborations</p>
          <h1 className="font-serif text-4xl font-light text-foreground md:text-5xl mb-6">
            For Architects &amp; Designers
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We collaborate with architects and interior designers on residential and hospitality
            projects. Custom sizing, material samples, and dedicated support available.
          </p>
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-muted/40 px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4 text-center">
            What We Offer
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-12 leading-relaxed">
            Tailored support for design professionals
          </p>
          <ul className="space-y-4">
            {architectOfferings.map((item) => (
              <li key={item} className="text-sm text-muted-foreground flex gap-3">
                <span className="text-accent shrink-0">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How We Work Together */}
      <section className="border-t border-border">
        <div className="px-6 pt-16 pb-12 text-center md:px-12 md:pt-20 md:pb-16 lg:px-20">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground">
            How We Work Together
          </h2>
        </div>

        <div className="grid grid-cols-1 border-t border-border sm:grid-cols-2 md:grid-cols-4">
          {architectCollaborationSteps.map((item) => (
            <div
              key={item.step}
              className="border-b border-r border-border p-8 last:border-r-0 sm:[&:nth-child(2)]:border-r-0 md:border-b-0 md:[&:nth-child(2)]:border-r"
            >
              <p className="mb-4 font-serif text-4xl font-light text-secondary">{item.step}</p>
              <h3 className="mb-2 text-lg font-serif font-light text-foreground">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-12 text-center">
            Why Work With Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {architectBenefits.map((benefit) => (
              <div key={benefit.title}>
                <h3 className="font-serif text-lg text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Collaborations */}
      <section className="bg-muted/40 px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4 text-center">
            Past Collaborations
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-12 leading-relaxed">
            Selected projects with architects and designers
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {architectCaseStudies.map((study) => (
              <div key={study.title}>
                <div className="relative overflow-hidden bg-muted h-64 mb-6">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-2">{study.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{study.description}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto border-t border-border pt-8">
            <p className="font-serif text-base leading-relaxed text-foreground font-light">
              &ldquo;{architectTestimonial.quote}&rdquo;
            </p>
            <p className="mt-4 font-sans text-sm font-medium text-foreground">
              {architectTestimonial.name}
            </p>
          </div>
        </div>
      </section>

      {/* Technical Information */}
      <section className="px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-12 text-center">
            Technical Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {architectTechnicalInfo.map((item) => (
              <div key={item.title}>
                <h3 className="font-serif text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Book a consultation to discuss your project"
        subtitle="Share your project brief. We will respond within 24 hours with initial thoughts and next steps."
        primaryText="Book a Consultation"
        primaryHref="/contact"
        dark
      />

      <FooterSection />
    </main>
  )
}
