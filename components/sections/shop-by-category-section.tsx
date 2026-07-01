"use client";

import Image from "next/image";
import Link from "next/link";
import { catalogProducts } from "@/lib/products";
import {
  FadeInUp,
  Parallax,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/scroll-motion";

const featuredPieces = catalogProducts.slice(0, 4);

export function ShopByCategorySection() {
  return (
    <section className="bg-background px-6 pt-10 pb-12 md:px-12 md:pt-12 md:pb-14 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <FadeInUp className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="type-h2">Featured Pieces</h2>
            <p className="type-body mt-3 max-w-md">
              Timeless designs for contemporary homes
            </p>
          </div>
          <Link href="/collections" className="btn-outline-sm self-start md:self-auto">
            View All
          </Link>
        </FadeInUp>
        <StaggerContainer className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 md:gap-6" stagger={0.08}>
          {featuredPieces.map((product) => (
            <StaggerItem key={product.slug}>
              <Link href={`/products/${product.slug}`} className="group block">
                <Parallax className="relative mb-3 aspect-[4/5] overflow-hidden bg-muted" offset={24}>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Parallax>
                <h3 className="type-h3 text-base">{product.name}</h3>
                <p className="type-price-sm mt-1 text-muted-foreground">{product.price}</p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
