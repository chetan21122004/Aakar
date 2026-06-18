"use client";

import { testimonials } from "@/lib/data";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-background">
      {/* Section Title */}
      <div className="px-6 pt-16 pb-12 text-center md:px-12 lg:px-20">
        <h2 className="type-h2">What Our Clients Say</h2>
      </div>

      <div className="grid grid-cols-1 gap-8 px-6 pb-20 md:grid-cols-3 md:gap-6 md:px-12 lg:px-20">
        {testimonials.map((testimonial) => (
          <div key={testimonial.name} className="border-t border-border pt-6">
            <p className="font-serif text-base leading-relaxed text-foreground font-light">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <p className="mt-4 font-sans text-sm font-medium text-foreground">{testimonial.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
