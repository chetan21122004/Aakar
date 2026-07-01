"use client";

import { processSteps } from "@/lib/data";
import {
  FadeIn,
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/scroll-motion";

export function EditorialSection() {
  return (
    <section className="bg-background">
      <FadeInUp className="px-6 pt-12 pb-10 text-center md:px-12 md:pt-16 md:pb-12 lg:px-20">
        <h2 className="text-3xl font-serif font-light tracking-tight text-foreground md:text-4xl lg:text-5xl">
          From Enquiry to Installation
        </h2>
        <p className="mx-auto mt-6 max-w-md text-sm text-secondary font-semibold uppercase tracking-widest">
          Our Process
        </p>
      </FadeInUp>

      <StaggerContainer
        className="grid grid-cols-1 border-t border-border sm:grid-cols-2 md:grid-cols-4"
        stagger={0.12}
        delayChildren={0.1}
      >
        {processSteps.map((item) => (
          <StaggerItem
            key={item.step}
            className="border-b border-r border-border p-8 last:border-r-0 sm:[&:nth-child(2)]:border-r-0 md:border-b-0 md:[&:nth-child(2)]:border-r"
          >
            <p className="mb-4 font-serif text-4xl font-light text-secondary">
              {item.step}
            </p>
            <h3 className="mb-2 text-lg font-serif font-light text-foreground">
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeIn className="flex justify-center px-6 py-10 md:py-12" delay={0.15}>
        <a
          href="/process"
          className="border-b border-foreground pb-1 text-sm font-medium text-foreground transition-opacity hover:opacity-70"
        >
          View Full Process
        </a>
      </FadeIn>
    </section>
  );
}
