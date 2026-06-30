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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
          Name <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-3 border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
          Email <span className="text-primary">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full px-4 py-3 border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full px-4 py-3 border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="+91 98765 43210"
        />
      </div>

      <div>
        <label htmlFor="projectType" className="block text-sm font-semibold text-foreground mb-2">
          Project Type
        </label>
        <select
          id="projectType"
          name="projectType"
          className="w-full px-4 py-3 border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
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

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
          Message <span className="text-primary">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full px-4 py-3 border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          placeholder="Tell us about your requirements, preferred pieces, timelines, or any specific questions..."
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white font-semibold py-3 hover:bg-primary-light transition-colors"
      >
        {submitted ? 'Enquiry Sent!' : 'Send Enquiry'}
      </button>
    </form>
  )
}
