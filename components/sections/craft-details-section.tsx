"use client";

import Image from "next/image";
import { craftDetailsHome } from "@/lib/data";
import {
  FadeInUp,
  Parallax,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/scroll-motion";

export function CraftDetailsSection() {
  return (
    <section className="bg-background px-6 py-12 md:px-12 md:py-16 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <FadeInUp className="mb-12 text-center md:mb-16">
          <h2 className="type-h2">The Details</h2>
          <p className="type-body mx-auto mt-4 max-w-md">
            Where craft meets contemporary design
          </p>
        </FadeInUp>

        <StaggerContainer className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12" stagger={0.15}>
          {craftDetailsHome.map((detail) => (
            <StaggerItem key={detail.title}>
              <article className="group">
                <Parallax className="relative mb-6 aspect-[4/3] overflow-hidden bg-muted" offset={36}>
                  <Image
                    src={detail.image}
                    alt={detail.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Parallax>
                <h3 className="type-h3 mb-3">{detail.title}</h3>
                <p className="type-body">{detail.description}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
