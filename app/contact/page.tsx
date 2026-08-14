import Image from "next/image"
import { ArrowRight, Clock, Instagram, Mail, MapPin, MessageCircle } from "lucide-react"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { EnquiryForm } from "@/components/enquiry-form"
import { FadeInUp } from "@/components/motion/scroll-motion"
import { contactInfo } from "@/lib/data"

export const metadata = {
  title: "Contact Aakar Woodcraft | Start an Enquiry",
  description:
    "Tell us about your space, preferred piece, dimensions, and timeline. Start a furniture enquiry with Aakar Woodcraft.",
}

export default function ContactPage() {
  const whatsappHref = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(
    "Hi, I'd like to enquire about furniture from Aakar Woodcraft."
  )}`

  const contactOptions = [
    {
      label: "Email",
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      icon: Mail,
    },
    {
      label: "WhatsApp",
      value: contactInfo.phone,
      href: whatsappHref,
      icon: MessageCircle,
      external: true,
    },
    {
      label: "Instagram",
      value: contactInfo.instagram,
      href: contactInfo.instagramUrl,
      icon: Instagram,
      external: true,
    },
  ]

  return (
    <main className="min-h-screen bg-sand">
      <Header />

      <section className="px-5 pb-14 pt-32 md:px-10 md:pb-20 lg:px-16 lg:pt-36">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <FadeInUp>
            <p className="type-label mb-5">Contact the Studio</p>
            <h1 className="max-w-2xl text-[clamp(3rem,7vw,6.25rem)] leading-[.92]">
              Let’s shape the right piece for your space.
            </h1>
            <p className="mt-7 max-w-xl text-lg font-light leading-relaxed text-ink/70 md:text-xl">
              Share the room, dimensions, collection, and timeline you have in mind. We will help you understand the clearest way forward.
            </p>
            <a
              href="#enquiry"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-clay px-7 py-3.5 font-condensed text-sm font-semibold uppercase tracking-[.14em] text-sand transition-colors hover:bg-umber"
            >
              Start your enquiry <ArrowRight size={16} />
            </a>
          </FadeInUp>

          <FadeInUp delay={0.08} className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-stone md:rounded-[2.5rem]">
            <Image
              src="/catalog/fatehpur-sikri-sofa.webp"
              alt="Fatehpur Sikri-inspired sofa by Aakar Woodcraft"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
          </FadeInUp>
        </div>
      </section>

      <section className="border-y border-umber/15 bg-stone px-5 py-10 md:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {contactOptions.map((option, index) => {
            const Icon = option.icon
            return (
              <FadeInUp key={option.label} delay={index * 0.04}>
                <a
                  href={option.href}
                  target={option.external ? "_blank" : undefined}
                  rel={option.external ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-[1.35rem] border border-umber/15 bg-sand/45 p-5 transition-colors hover:bg-sand"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-clay text-sand">
                    <Icon size={18} strokeWidth={1.6} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-condensed text-xs font-semibold uppercase tracking-[.16em] text-umber">{option.label}</span>
                    <span className="mt-1 block truncate text-sm text-ink/75 group-hover:text-ink">{option.value}</span>
                  </span>
                </a>
              </FadeInUp>
            )
          })}
        </div>
      </section>

      <section id="enquiry" className="scroll-mt-24 px-5 py-16 md:px-10 md:py-24 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-16">
          <FadeInUp>
            <p className="type-label mb-3">Your requirements</p>
            <h2 className="text-3xl md:text-4xl">Tell us what you are considering.</h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/60 md:text-base">
              A useful enquiry can be simple. Include the piece or collection you like, approximate dimensions, your city, and any target timeline.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-4 rounded-[1.35rem] border border-umber/15 p-5">
                <Clock size={20} className="mt-0.5 shrink-0 text-clay" />
                <div>
                  <h3 className="text-base">Response time</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">{contactInfo.responseTime}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-[1.35rem] border border-umber/15 p-5">
                <MessageCircle size={20} className="mt-0.5 shrink-0 text-clay" />
                <div>
                  <h3 className="text-base">Prefer a quick conversation?</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/60">Continue on WhatsApp and share reference images if helpful.</p>
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 font-condensed text-sm font-semibold uppercase tracking-[.12em] text-clay transition-colors hover:text-umber">
                    Open WhatsApp <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.06} className="rounded-[2rem] border border-umber/10 bg-stone p-6 md:p-9 lg:p-10">
            <div className="mb-8 border-b border-umber/15 pb-6">
              <p className="type-label mb-3">Enquiry form</p>
              <h2 className="text-2xl md:text-3xl">Start a conversation</h2>
            </div>
            <EnquiryForm />
          </FadeInUp>
        </div>
      </section>

      <section className="px-5 pb-16 md:px-10 md:pb-24 lg:px-16">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-ink text-sand lg:grid-cols-2 md:rounded-[2.5rem]">
          <div className="relative min-h-[340px] lg:min-h-[480px]">
            <Image
              src="/catalog/still-mandu-lounge-chair.webp"
              alt="Still Mandu lounge chair by Aakar Woodcraft"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <FadeInUp className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
            <p className="font-condensed text-xs font-semibold uppercase tracking-[.22em] text-clay">Workshop visits</p>
            <h2 className="mt-4 text-3xl text-sand md:text-4xl">Experience the materials firsthand.</h2>
            <p className="mt-5 text-base font-light leading-relaxed text-sand/65">
              Workshop visits are available by appointment for material discussions, finish reviews, and project conversations.
            </p>
            <div className="mt-7 flex items-start gap-3 border-t border-sand/15 pt-6">
              <MapPin size={19} className="mt-0.5 shrink-0 text-clay" />
              <p className="max-w-md text-sm leading-relaxed text-sand/70">{contactInfo.address}</p>
            </div>
            <a href={`mailto:${contactInfo.email}?subject=Workshop visit request`} className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-clay px-7 py-3.5 font-condensed text-sm font-semibold uppercase tracking-[.14em] text-sand transition-colors hover:bg-umber">
              Request a visit <ArrowRight size={16} />
            </a>
          </FadeInUp>
        </div>
      </section>

      <FooterSection />
    </main>
  )
}
