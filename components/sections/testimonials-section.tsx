"use client";

import { testimonials } from "@/lib/data";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-background">
      {/* Section Title */}
      <div className="px-6 pt-20 pb-16 text-center md:px-12 md:pt-28 md:pb-20 lg:px-20">
        <h2 className="text-3xl font-serif font-light tracking-tight text-foreground md:text-4xl lg:text-5xl">
          What Our Clients Say.
        </h2>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 gap-10 px-6 pb-24 md:grid-cols-3 md:gap-8 md:px-12 lg:px-20">
        {testimonials.map((testimonial) => (
          <div key={testimonial.name} className="border-t border-border pt-8">
            <p className="text-lg leading-relaxed text-foreground font-serif font-light">
              "{testimonial.quote}"
            </p>
            <div className="mt-6">
              <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
              {testimonial.role && (
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
