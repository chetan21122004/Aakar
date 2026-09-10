import type { CatalogProduct } from "@/lib/products"
import { careNotes, shippingNotes } from "@/lib/product-reviews"

export function ProductDetailInfo({ product }: { product: CatalogProduct }) {
  const sections = [
    {
      id: "description",
      title: "Product description",
      content: (
        <>
          <p>{product.longDescription ?? product.description}</p>
          {product.materials?.length ? (
            <p className="mt-4">
              <span className="font-medium text-[#0F1111]">Materials. </span>
              {product.materials.join(" · ")}
            </p>
          ) : null}
        </>
      ),
    },
    {
      id: "specs",
      title: "Specifications",
      content: (
        <dl className="divide-y divide-[#E7E0D8]">
          {product.dimensions && (
            <div className="grid grid-cols-[8rem_1fr] gap-4 py-3 sm:grid-cols-[10rem_1fr]">
              <dt className="text-[#6B5E54]">Dimensions</dt>
              <dd>{product.dimensions}</dd>
            </div>
          )}
          <div className="grid grid-cols-[8rem_1fr] gap-4 py-3 sm:grid-cols-[10rem_1fr]">
            <dt className="text-[#6B5E54]">Finishes</dt>
            <dd>{product.options.finish.join(", ")}</dd>
          </div>
          {product.productionTime && (
            <div className="grid grid-cols-[8rem_1fr] gap-4 py-3 sm:grid-cols-[10rem_1fr]">
              <dt className="text-[#6B5E54]">Lead time</dt>
              <dd>{product.productionTime}</dd>
            </div>
          )}
          {(product.specs ?? []).map((spec) => (
            <div key={spec} className="grid grid-cols-[8rem_1fr] gap-4 py-3 sm:grid-cols-[10rem_1fr]">
              <dt className="text-[#6B5E54]">Detail</dt>
              <dd>{spec}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    {
      id: "care",
      title: "Care & maintenance",
      content: (
        <ul className="space-y-2">
          {careNotes.map((note) => (
            <li key={note} className="flex gap-2">
              <span className="text-[#A86F47]">•</span>
              {note}
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "shipping",
      title: "Shipping, delivery & warranty",
      content: (
        <ul className="space-y-2">
          {shippingNotes.map((note) => (
            <li key={note} className="flex gap-2">
              <span className="text-[#A86F47]">•</span>
              {note}
            </li>
          ))}
        </ul>
      ),
    },
  ]

  return (
    <section className="mt-16 border-t border-[#E7E0D8] pt-12">
      <div className="space-y-3">
        {sections.map((section) => (
          <details
            key={section.id}
            id={section.id}
            open={section.id === "description"}
            className="rounded-[1.75rem] border border-[#E7E0D8] bg-[#FFFcf8] px-5 py-4 md:rounded-[2rem] md:px-7 md:py-5"
          >
            <summary className="cursor-pointer font-hero !text-lg !font-medium !normal-case !tracking-[-0.02em] text-[#0F1111]">
              {section.title}
            </summary>
            <div className="mt-4 max-w-4xl font-sans text-sm leading-relaxed text-[#3D342F] md:text-[15px]">
              {section.content}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
