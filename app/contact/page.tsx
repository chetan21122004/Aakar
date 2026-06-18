import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { EnquiryForm } from "@/components/enquiry-form"
import { contactInfo } from "@/lib/data"

export const metadata = {
  title: "Contact Us | Aakar Woodcraft",
  description: "Share your custom furniture requirement with Aakar Woodcraft and our team will get back to you with the next steps.",
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
              Let&apos;s Build Your Custom Furniture
            </h1>
            <p className="text-lg text-muted-foreground">
              Share your requirement and our team will get back to you with the next steps.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                <p className="text-muted-foreground">+91 XXXXX XXXXX</p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Email</h3>
                <a href={`mailto:${contactInfo.email}`} className="text-primary hover:text-primary-light transition-colors">
                  {contactInfo.email}
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Location</h3>
                <p className="text-muted-foreground">India</p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Business Hours</h3>
                <p className="text-muted-foreground">Monday to Saturday, 10:00 AM &ndash; 7:00 PM</p>
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

          {/* Map placeholder */}
          <div className="pt-12 border-t border-border">
            <h3 className="font-semibold text-foreground mb-4">Find Us</h3>
            <div className="w-full h-64 bg-muted/50 border border-border flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Google Maps placeholder</p>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  )
}
