'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const panelId = `faq-panel-${index}`

        return (
          <div key={index} className="overflow-hidden rounded-[1.35rem] border border-umber/15 bg-stone">
            <button
              type="button"
              id={`faq-trigger-${index}`}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left transition-colors hover:bg-sand/50 md:px-6 md:py-6"
            >
              <span className="font-condensed text-base font-semibold uppercase tracking-[.06em] text-ink md:text-lg">
                {item.question}
              </span>
              <ChevronDown
                size={19}
                className={`shrink-0 text-clay transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={`faq-trigger-${index}`}
                className="border-t border-umber/15 px-5 py-5 md:px-6 md:py-6"
              >
                <p className="max-w-3xl text-sm leading-relaxed text-ink/65 md:text-base">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
