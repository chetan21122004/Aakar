import Link from "next/link"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { EnquiryForm } from "@/components/enquiry-form"
import { contactInfo } from "@/lib/data"

export const metadata = {
  title: "Contact Us | Aakar Woodcraft",
  description:
    "Share your requirements. We will guide you through material selection, dimensions, and timelines.",
}

export default function ContactPage() {
  const whatsappHref = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(
    "Hi, I'd like to enquire about custom furniture from Aakar Woodcraft."
  )}`

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <h1 className="font-serif text-4xl font-light text-foreground md:text-5xl mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground">
              Share your requirements. We will guide you through material selection, dimensions, and
              timelines.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Email</h3>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-primary hover:text-primary-light transition-colors"
                >
                  {contactInfo.email}
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">WhatsApp</h3>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-light transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Instagram</h3>
                <a
                  href={contactInfo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-light transition-colors"
                >
                  {contactInfo.instagram}
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Response Time</h3>
                <p className="text-muted-foreground">{contactInfo.responseTime}</p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Workshop Visits</h3>
                <p className="text-muted-foreground">
                  Available by appointment. See our process firsthand and review material samples.
                </p>
              </div>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center border border-foreground/20 text-foreground font-semibold py-3 hover:bg-foreground hover:text-background transition-colors"
              >
                WhatsApp Us
              </a>
            </div>

            {/* Enquiry Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 border border-border">
                <h2 className="font-serif text-2xl text-foreground mb-8">Send Us a Message</h2>
                <EnquiryForm />
              </div>
            </div>
          </div>

          {/* Workshop location */}
          <div className="border-t border-border pt-12">
            <h3 className="mb-4 font-semibold text-foreground">Find Us</h3>
            <p className="mb-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
              {contactInfo.address}
            </p>
            <p className="text-sm text-muted-foreground">
              Workshop visits available by appointment.{" "}
              <Link href="/contact" className="text-primary underline-offset-2 hover:underline">
                Schedule a visit
              </Link>
            </p>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  )
}
