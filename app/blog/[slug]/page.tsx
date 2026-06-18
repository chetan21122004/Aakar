import Image from "next/image"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { CTASection } from "@/components/cta-section"
import { blogPosts } from "@/lib/data"

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | Aakar Woodcraft`,
    description: post.excerpt,
  }
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) notFound()

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <article className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-primary mb-3 text-center">{post.category}</p>
          <h1 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-4 text-center">
            {post.title}
          </h1>
          <p className="text-sm text-muted-foreground text-center mb-10">
            Aakar Woodcraft Team
          </p>

          <div className="relative aspect-[16/9] w-full overflow-hidden mb-12">
            <Image src={post.image} alt={post.title} fill className="object-cover" />
          </div>

          <div className="space-y-10">
            {post.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-serif text-xl md:text-2xl text-foreground mb-3">{section.heading}</h2>
                <p className="text-base text-muted-foreground leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
        </div>
      </article>

      <CTASection
        title="Need custom furniture guidance?"
        subtitle="Tell us about your space and requirement, and our team will help you choose the right piece."
        primaryText="Request a Quote"
        primaryHref="/contact"
        dark
      />

      <FooterSection />
    </main>
  )
}
