import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { EnquiryForm } from "@/components/enquiry-form"

export const metadata = {
  title: "Contact Us | Aakar Woodcraft",
  description: "Get in touch with Aakar Woodcraft for inquiries, custom orders, and consultations",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <section className="pt-24 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h1 className="font-serif text-5xl font-light text-foreground mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you&apos;re interested in our current collection or want to commission a bespoke piece, we&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
            {/* Contact Info */}
            <div className="space-y-12">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Address</h3>
                <p className="text-muted-foreground">
                  Aakar Woodcraft Studio<br/>
                  123 Craft Lane<br/>
                  Bengaluru, India 560001
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                <a href="tel:+918800000000" className="text-primary hover:text-primary-light transition-colors">
                  +91 8800 000 000
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Email</h3>
                <a href="mailto:hello@aakarwoodcraft.com" className="text-primary hover:text-primary-light transition-colors">
                  hello@aakarwoodcraft.com
                </a>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-2">Business Hours</h3>
                <div className="text-muted-foreground space-y-1">
                  <p>Monday - Friday: 10 AM - 6 PM</p>
                  <p>Saturday: 11 AM - 4 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Enquiry Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 border border-border">
                <h2 className="font-serif text-2xl text-foreground mb-8">Send us a Message</h2>
                <EnquiryForm />
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-border">
            <div>
              <h3 className="font-semibold text-foreground mb-3">Showroom Visits</h3>
              <p className="text-sm text-muted-foreground">
                Visit our showroom in Bengaluru to experience our furniture up close. We recommend booking an appointment for personalized attention.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Custom Orders</h3>
              <p className="text-sm text-muted-foreground">
                Have a specific vision? Our design team can create bespoke pieces tailored to your space, style, and budget.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3">Delivery & Installation</h3>
              <p className="text-sm text-muted-foreground">
                We offer nationwide delivery and professional installation services. Ask us about shipping costs and timelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  )
}
