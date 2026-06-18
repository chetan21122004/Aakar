import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"

export const metadata = {
  title: "See in Your Room | Aakar Woodcraft",
  description: "Preview how selected furniture could look in your own space before requesting a quote.",
}

const steps = [
  { step: "01", title: "Choose a Furniture Product", description: "Pick a piece from our shop that you're interested in." },
  { step: "02", title: "Upload a Photo of Your Room", description: "Share a photo of the space where the piece would go." },
  { step: "03", title: "Preview the Furniture in Your Space", description: "See an approximate visual of how the piece could fit." },
  { step: "04", title: "Request a Quote with the Visual", description: "Send the preview along with your enquiry to our team." },
]

export default function SeeInYourRoomPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-4xl font-light text-foreground md:text-5xl mb-6">
            See Furniture in Your Room
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Preview how selected furniture could look in your own space before requesting a quote.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="px-6 md:px-12 lg:px-20 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.step} className="text-center sm:text-left">
              <div className="w-12 h-12 rounded-full border border-foreground/20 flex items-center justify-center font-serif text-base text-foreground mb-4 mx-auto sm:mx-0">
                {step.step}
              </div>
              <h3 className="font-serif text-base text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tool UI (static placeholders, no real AI integration in Milestone 1) */}
      <section className="px-6 md:px-12 lg:px-20 pb-24">
        <div className="max-w-5xl mx-auto bg-muted/40 p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3">1. Upload Room Photo</h3>
                <div className="aspect-[4/3] w-full bg-white border border-dashed border-border flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">No photo uploaded</p>
                </div>
                <button className="mt-3 w-full border border-foreground/20 text-foreground font-semibold py-3 hover:bg-foreground hover:text-background transition-colors">
                  Upload Room Photo
                </button>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">2. Select Furniture</h3>
                <div className="aspect-[4/3] w-full bg-white border border-dashed border-border flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">No product selected</p>
                </div>
                <button className="mt-3 w-full border border-foreground/20 text-foreground font-semibold py-3 hover:bg-foreground hover:text-background transition-colors">
                  Select Product
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="font-semibold text-foreground mb-3">Preview Result</h3>
              <div className="flex-1 aspect-[4/3] w-full bg-white border border-dashed border-border flex items-center justify-center">
                <p className="text-sm text-muted-foreground text-center px-6">
                  Your preview will appear here once a room photo and product are selected.
                </p>
              </div>
              <a
                href="/contact"
                className="mt-3 block w-full text-center bg-primary text-white font-semibold py-3 hover:bg-primary-light transition-colors"
              >
                Request a Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </main>
  )
}
