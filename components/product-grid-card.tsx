"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { formatINR } from "@/lib/format";
import { getDefaultVariant, type CatalogProduct } from "@/lib/products";
import { useCart } from "@/contexts/cart-context";
import { getOrCreateGuestToken } from "@/lib/guest-token";

type ProductGridCardProps = {
  product: CatalogProduct;
  image?: string;
};

export function ProductGridCard({ product, image }: ProductGridCardProps) {
  const { addItem } = useCart();
  const [wishlisted, setWishlisted] = useState(false);
  const defaultVariant = getDefaultVariant(product);
  const href = `/products/${product.slug}`;
  const imageSrc = image ?? product.images[0];

  useEffect(() => {
    const guestToken = getOrCreateGuestToken();
    fetch("/api/wishlist", { headers: { "x-guest-token": guestToken } })
      .then((res) => res.json())
      .then((data: { productIds?: string[] }) => {
        if (data.productIds?.includes(product.id)) setWishlisted(true);
      })
      .catch(() => undefined);
  }, [product.id]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      variantId: defaultVariant.id,
      productSlug: product.slug,
      name: product.name,
      image: product.images[0],
      options: defaultVariant.options,
      pricePaise: defaultVariant.pricePaise,
    });
    toast.success("Added to cart", { description: product.name });
  };

  const handleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const guestToken = getOrCreateGuestToken();
    const next = !wishlisted;
    setWishlisted(next)

    const res = await fetch("/api/wishlist", {
      method: next ? "POST" : "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-guest-token": guestToken,
      },
      body: JSON.stringify({ productId: product.id }),
    })

    if (!res.ok) {
      setWishlisted(!next)
      toast.error("Could not update wishlist")
    }
  };

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-border/60 bg-card p-3.5 pb-3.5 shadow-[0_1px_0_rgba(48,42,38,0.04)] transition-shadow duration-300 hover:shadow-[0_10px_28px_rgba(48,42,38,0.07)] md:p-4">
      <div className="relative mb-3 aspect-[4/5] overflow-hidden rounded-xl bg-background">
        <Link href={href} className="absolute inset-0 block">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </Link>
        <button
          type="button"
          onClick={handleWishlist}
          className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-card/90 text-foreground backdrop-blur-sm transition-colors hover:bg-background md:h-9 md:w-9"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
        >
          <Heart
            size={16}
            strokeWidth={1.6}
            className={wishlisted ? "fill-ink text-ink" : "text-ink"}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-0.5">
        <Link href={href} className="block">
          <h3 className="font-condensed text-[0.95rem] font-semibold uppercase leading-tight tracking-[0.04em] text-ink md:text-[1.05rem]">
            {product.name}
          </h3>
          <p className="mt-1 font-condensed text-[0.95rem] font-medium tracking-[0.02em] text-ink md:text-[1.05rem]">
            {formatINR(product.basePricePaise)}
          </p>
          <p className="mt-0.5 font-condensed text-[0.75rem] font-normal uppercase tracking-[0.08em] text-muted-foreground">
            {product.category}
          </p>
        </Link>

        <button
          type="button"
          onClick={handleAddToCart}
          className="mt-3.5 w-full rounded-full bg-primary py-2.5 font-condensed text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-secondary md:mt-4 md:py-3 md:text-[0.85rem]"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
