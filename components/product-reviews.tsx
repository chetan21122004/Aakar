import { Star } from "lucide-react"
import type { ReviewSummary } from "@/lib/product-reviews"
import { cn } from "@/lib/utils"

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={size}
          className={cn(
            index < Math.round(rating) ? "fill-[#C45500] text-[#C45500]" : "text-[#D5D0C8]",
          )}
        />
      ))}
    </span>
  )
}

export function ReviewSummaryInline({
  average,
  count,
}: {
  average: number
  count: number
}) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-2">
      <Stars rating={average} />
      <span className="font-sans text-sm font-medium tabular-nums text-[#0F1111]">{average.toFixed(1)}</span>
      <a href="#reviews" className="font-sans !text-sm !normal-case !tracking-normal text-[#007185] hover:underline">
        {count} ratings
      </a>
    </div>
  )
}

export function ProductReviews({ summary }: { summary: ReviewSummary }) {
  const max = Math.max(...summary.distribution)

  return (
    <section id="reviews" className="scroll-mt-28 border-t border-[#E7E0D8] pt-16">
      <div className="grid gap-12 lg:grid-cols-[18rem_1fr] lg:gap-16">
        <div>
          <h2 className="font-hero !text-2xl !font-medium !normal-case !tracking-[-0.02em] text-[#0F1111]">
            Customer reviews
          </h2>
          <div className="mt-4 flex items-center gap-2">
            <Stars rating={summary.average} size={18} />
            <p className="font-sans text-lg font-medium text-[#0F1111]">{summary.average.toFixed(1)} out of 5</p>
          </div>
          <p className="mt-1 font-sans text-sm text-[#6B5E54]">{summary.count} global ratings</p>

          <ul className="mt-6 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const value = summary.distribution[star - 1]
              const width = max === 0 ? 0 : (value / summary.count) * 100
              return (
                <li key={star} className="grid grid-cols-[3.5rem_1fr_2rem] items-center gap-2">
                  <span className="font-sans text-[13px] text-[#007185]">{star} star</span>
                  <div className="h-2.5 overflow-hidden rounded-sm bg-[#E7E0D8]">
                    <div className="h-full rounded-sm bg-[#FFA41C]" style={{ width: `${width}%` }} />
                  </div>
                  <span className="text-right font-sans text-[12px] tabular-nums text-[#6B5E54]">
                    {Math.round((value / summary.count) * 100)}%
                  </span>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="space-y-8">
          {summary.reviews.map((review) => (
            <article key={review.id} className="border-b border-[#E7E0D8] pb-8 last:border-b-0 last:pb-0">
              <p className="font-sans text-sm font-medium text-[#0F1111]">
                {review.name}
                <span className="ml-2 font-normal text-[#6B5E54]">{review.city}</span>
              </p>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <Stars rating={review.rating} size={14} />
                <h3 className="font-sans !text-sm !font-semibold !normal-case !tracking-normal text-[#0F1111]">
                  {review.title}
                </h3>
              </div>
              <p className="mt-1 font-sans text-[12px] text-[#6B5E54]">
                Reviewed {review.date}
                {review.verified ? " · Verified purchase" : ""}
                {review.finish ? ` · Finish: ${review.finish}` : ""}
              </p>
              <p className="mt-3 max-w-3xl font-sans text-sm leading-relaxed text-[#3D342F]">{review.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
