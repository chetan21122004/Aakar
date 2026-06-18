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
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
          Full Name
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
        <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          className="w-full px-4 py-3 border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="+91 XXXXX XXXXX"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
          Email Address
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
        <label htmlFor="requirement" className="block text-sm font-semibold text-foreground mb-2">
          Furniture Requirement
        </label>
        <input
          type="text"
          id="requirement"
          name="requirement"
          className="w-full px-4 py-3 border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="e.g. Dining table for 6, Wardrobe for bedroom"
        />
      </div>

      <div>
        <label htmlFor="budget" className="block text-sm font-semibold text-foreground mb-2">
          Preferred Budget
        </label>
        <select
          id="budget"
          name="budget"
          className="w-full px-4 py-3 border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select a range</option>
          <option value="under-30k">Under ₹30,000</option>
          <option value="30k-60k">₹30,000 - ₹60,000</option>
          <option value="60k-1l">₹60,000 - ₹1,00,000</option>
          <option value="above-1l">Above ₹1,00,000</option>
          <option value="not-sure">Not sure yet</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full px-4 py-3 border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          placeholder="Tell us about your inquiry..."
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white font-semibold py-3 hover:bg-primary-light transition-colors"
      >
        {submitted ? 'Enquiry Sent!' : 'Submit Enquiry'}
      </button>
    </form>
  )
}
