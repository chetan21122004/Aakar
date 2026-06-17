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
        <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full px-4 py-3 border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="+1 (555) 000-0000"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          className="w-full px-4 py-3 border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select a topic</option>
          <option value="custom">Custom Furniture</option>
          <option value="order">Order Inquiry</option>
          <option value="delivery">Delivery & Installation</option>
          <option value="maintenance">Care & Maintenance</option>
          <option value="other">Other</option>
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
        {submitted ? 'Message Sent!' : 'Send Enquiry'}
      </button>
    </form>
  )
}
