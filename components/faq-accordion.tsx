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
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const panelId = `faq-panel-${index}`

        return (
          <div
            key={index}
            className="border border-border rounded-none overflow-hidden"
          >
            <button
              type="button"
              id={`faq-trigger-${index}`}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
            >
              <span className="font-semibold text-foreground">
                {item.question}
              </span>
              <ChevronDown
                size={20}
                className={`text-secondary transition-transform ${
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
                className="px-6 py-4 bg-muted/30 border-t border-border"
              >
                <p className="text-muted-foreground leading-relaxed">
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
