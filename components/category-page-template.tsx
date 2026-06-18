import { Header } from "@/components/header"
import { FooterSection } from "@/components/sections/footer-section"
import { ProductCard } from "@/components/product-card"
import { FAQAccordion } from "@/components/faq-accordion"
import { CTASection } from "@/components/cta-section"
import { contactInfo, faqItems, type Category } from "@/lib/data"
import { catalogProducts } from "@/lib/products"

interface CategoryPageTemplateProps {
  category: Category
  heroTitle: string
  intro: string
  ctaLabel: string
}

export function CategoryPageTemplate({ category, heroTitle, intro, ctaLabel }: CategoryPageTemplateProps) {
  const categoryProducts = catalogProducts.filter((p) => p.categorySlug === category.slug)

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="type-h1 mb-6">{heroTitle}</h1>
          <p className="type-body text-lg">{intro}</p>
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 pb-24">
        <div className="max-w-7xl mx-auto">
          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="type-body text-center">
              New pieces in this category are being added soon — share your requirement and we&apos;ll build one for you.
            </p>
          )}
        </div>
      </section>

      <section className="px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="type-h2 mb-10 text-center">Frequently Asked Questions</h2>
          <FAQAccordion items={faqItems.slice(0, 3)} />
        </div>
      </section>

      <CTASection
        title={`Ready to Order Your ${category.name.replace(/s$/, "")}?`}
        subtitle={`${category.description} ${category.startingPrice}.`}
        primaryText={ctaLabel}
        primaryHref="/shop"
        secondaryText="WhatsApp Us"
        secondaryHref={`https://wa.me/${contactInfo.whatsapp}`}
      />

      <FooterSection />
    </main>
  )
}
