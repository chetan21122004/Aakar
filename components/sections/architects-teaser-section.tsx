"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { slideInLeft, slideInRight, viewport } from "@/components/motion/scroll-motion";

export function ArchitectsTeaserSection() {
  return (
    <section className="border-y border-border bg-muted/40 px-6 py-12 md:px-12 md:py-16 lg:px-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left">
        <motion.div
          className="max-w-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={slideInLeft}
        >
          <p className="type-label mb-4">Collaborations</p>
          <h2 className="type-h2">For Architects &amp; Designers</h2>
          <p className="type-body mt-6">
            We collaborate with architects and interior designers on residential and hospitality
            projects. Custom sizing, material samples, and dedicated support available.
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={slideInRight}
        >
          <Link
            href="/for-architects"
            className="group inline-flex shrink-0 items-center gap-2 border border-foreground px-8 py-3.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            Learn More
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
