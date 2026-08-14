'use client'

import { useState } from 'react'

export function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
          Project Type
        </label>
        <select
          id="projectType"
          name="projectType"
          className="w-full border border-umber/20 bg-sand px-4 py-3.5 text-sm text-ink outline-none transition-shadow focus:border-clay focus:ring-2 focus:ring-clay/15"
          defaultValue=""
        >
          <option value="" disabled>
            Select project type
          </option>
          <option value="console">Console</option>
          <option value="dining-table">Dining Table</option>
          <option value="coffee-table">Coffee Table</option>
          <option value="dining-chair">Dining Chair</option>
          <option value="custom">Custom Furniture</option>
          <option value="architect">Architect / Designer Project</option>
          <option value="workshop-visit">Workshop Visit</option>
          <option value="other">Other</option>
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
          className="w-full resize-none border border-umber/20 bg-sand px-4 py-3.5 text-sm text-ink outline-none transition-shadow placeholder:text-ink/35 focus:border-clay focus:ring-2 focus:ring-clay/15"
          placeholder="Tell us about your requirements, preferred pieces, timelines, or any specific questions..."
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-clay py-3.5 font-condensed text-sm font-semibold uppercase tracking-[.14em] text-sand transition-colors hover:bg-umber"
      >
        {submitted ? 'Enquiry Sent!' : 'Send Enquiry'}
      </button>
    </form>
  )
}
