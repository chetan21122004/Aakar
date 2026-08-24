'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import {
  parseEnquirySource,
  projectTypesForSource,
  type EnquirySource,
} from '@/lib/enquiries'

type EnquiryFormProps = {
  source?: EnquirySource
  productSlug?: string
}

export function EnquiryForm({ source = 'contact', productSlug }: EnquiryFormProps) {
  const enquirySource = parseEnquirySource(source)
  const isConsultation = enquirySource === 'consultation'
  const projectTypes = projectTypesForSource(enquirySource)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone') || undefined,
          projectType: formData.get('projectType') || undefined,
          message: formData.get('message'),
          source: enquirySource,
          productSlug,
          website: formData.get('website') || undefined,
        }),
      })

      const payload = (await res.json().catch(() => null)) as { error?: string } | null
      if (!res.ok) {
        throw new Error(payload?.error || 'Failed')
      }
      setSubmitted(true)
      form.reset()
      toast.success(isConsultation ? 'Consultation requested' : 'Enquiry sent', {
        description: 'We will respond within 24 hours.',
      })
      setTimeout(() => setSubmitted(false), 3000)
    } catch (error) {
      toast.error(isConsultation ? 'Could not request consultation' : 'Could not send enquiry', {
        description:
          error instanceof Error && error.message !== 'Failed'
            ? error.message
            : 'Please try again or email us directly.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className="mb-2 block font-condensed text-xs font-semibold uppercase tracking-[.12em] text-ink">
          Name <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          minLength={2}
          className="w-full border border-umber/20 bg-sand px-4 py-3.5 text-sm text-ink outline-none transition-shadow placeholder:text-ink/35 focus:border-clay focus:ring-2 focus:ring-clay/15"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block font-condensed text-xs font-semibold uppercase tracking-[.12em] text-ink">
          Email <span className="text-primary">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full border border-umber/20 bg-sand px-4 py-3.5 text-sm text-ink outline-none transition-shadow placeholder:text-ink/35 focus:border-clay focus:ring-2 focus:ring-clay/15"
          placeholder="your@email.com"
        />
      </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor="phone" className="mb-2 block font-condensed text-xs font-semibold uppercase tracking-[.12em] text-ink">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full border border-umber/20 bg-sand px-4 py-3.5 text-sm text-ink outline-none transition-shadow placeholder:text-ink/35 focus:border-clay focus:ring-2 focus:ring-clay/15"
          placeholder="+91 98765 43210"
        />
      </div>
      <div>
        <label htmlFor="projectType" className="mb-2 block font-condensed text-xs font-semibold uppercase tracking-[.12em] text-ink">
          {isConsultation ? 'Consultation focus' : 'Project Type'}
        </label>
        <select
          id="projectType"
          name="projectType"
          className="w-full border border-umber/20 bg-sand px-4 py-3.5 text-sm text-ink outline-none transition-shadow focus:border-clay focus:ring-2 focus:ring-clay/15"
          defaultValue=""
        >
          <option value="" disabled>
            {isConsultation ? 'Select room or scope' : 'Select project type'}
          </option>
          {projectTypes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block font-condensed text-xs font-semibold uppercase tracking-[.12em] text-ink">
          Message <span className="text-primary">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          minLength={10}
          className="w-full resize-none border border-umber/20 bg-sand px-4 py-3.5 text-sm text-ink outline-none transition-shadow placeholder:text-ink/35 focus:border-clay focus:ring-2 focus:ring-clay/15"
          placeholder={
            enquirySource === "see_in_room"
              ? "I previewed this piece in my room and would like a quote..."
              : isConsultation
                ? "Tell us about your home, rooms to plan, city, and preferred timeline..."
                : "Tell us about your requirements, preferred pieces, timelines, or any specific questions..."
          }
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-clay py-3.5 font-condensed text-sm font-semibold uppercase tracking-[.14em] text-sand transition-colors hover:bg-umber disabled:opacity-60"
      >
        {submitted
          ? isConsultation
            ? 'Consultation requested'
            : 'Enquiry Sent!'
          : loading
            ? 'Sending...'
            : isConsultation
              ? 'Request consultation'
              : 'Send Enquiry'}
      </button>
    </form>
  )
}
