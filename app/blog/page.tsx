import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { blogPosts } from "@/lib/data"

export const metadata = {
  title: "Furniture Guides & Design Inspiration | Aakar Woodcraft",
  description: "Guides and inspiration on choosing, styling, and caring for solid wood furniture in modern Indian homes.",
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-serif text-4xl font-light text-foreground md:text-5xl mb-6">
            Furniture Guides and Design Inspiration
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Practical advice on choosing, styling, and caring for solid wood furniture in your home.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 pb-24">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <div className="relative aspect-[16/10] w-full overflow-hidden mb-5">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="text-xs uppercase tracking-wider text-primary mb-2">{post.category}</p>
              <h2 className="font-serif text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>

      <FooterSection />
    </main>
  )
}
