"use client";

import { testimonials } from "@/lib/data";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/scroll-motion";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-background">
      <FadeInUp className="px-6 pt-12 pb-8 text-center md:px-12 lg:px-20">
        <h2 className="type-h2">What Our Clients Say</h2>
      </FadeInUp>

      <StaggerContainer
        className="grid grid-cols-1 gap-8 px-6 pb-12 md:grid-cols-3 md:gap-6 md:px-12 lg:px-20"
        stagger={0.15}
      >
        {testimonials.map((testimonial) => (
          <StaggerItem key={testimonial.name}>
            <div className="border-t border-border pt-6">
              <p className="font-serif text-base leading-relaxed text-foreground font-light">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <p className="mt-4 font-sans text-sm font-medium text-foreground">{testimonial.name}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
