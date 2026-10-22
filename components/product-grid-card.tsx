"use client";

import Link from "next/link";
import { ProductImageSwitcher } from "@/components/product-image-switcher";
import { useEffect, useState } from "react";
import { Camera, Heart } from "lucide-react";
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
  const gallery = image ? [image] : product.images;

  useEffect(() => {
    if (defaultVariant?.id.startsWith("demo:")) {
      try {
        const saved: string[] = JSON.parse(localStorage.getItem("aakar-demo-wishlist") ?? "[]");
        setWishlisted(saved.includes(product.slug));
      } catch { setWishlisted(false); }
      return;
    }
    const guestToken = getOrCreateGuestToken();
    fetch("/api/wishlist", { headers: { "x-guest-token": guestToken } })
      .then((res) => res.json())
      .then((data: { productIds?: string[] }) => {
        if (data.productIds?.includes(product.id)) setWishlisted(true);
      })
      .catch(() => undefined);
  }, [product.id, product.slug, defaultVariant?.id]);

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
    if (defaultVariant?.id.startsWith("demo:")) {
      try {
        const saved: string[] = JSON.parse(localStorage.getItem("aakar-demo-wishlist") ?? "[]");
        const next = !wishlisted;
        localStorage.setItem("aakar-demo-wishlist", JSON.stringify(next
          ? [...new Set([...saved, product.slug])]
          : saved.filter((slug) => slug !== product.slug)));
        setWishlisted(next);
      } catch { toast.error("Could not update wishlist"); }
      return;
    }
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
    <article className="product-grid-card group relative flex h-full flex-col rounded-2xl border border-border/60 bg-card p-3.5 pb-3.5 shadow-[0_1px_0_rgba(48,42,38,0.04)] transition-shadow duration-300 hover:shadow-[0_10px_28px_rgba(48,42,38,0.07)] md:p-4">
      <div className="relative mb-3 aspect-[4/5] overflow-hidden rounded-xl bg-background">
        <ProductImageSwitcher
          href={href}
          images={gallery}
          alt={product.name}
          sizes="(max-width: 768px) 50vw, 20vw"
          imageClassName="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <button
          type="button"
          onClick={handleWishlist}
          className="absolute right-2.5 top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-card/90 text-foreground backdrop-blur-sm transition-colors hover:bg-background md:h-9 md:w-9"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
        >
          <Heart
            size={16}
            strokeWidth={1.6}
            className={wishlisted ? "fill-ink text-ink" : "text-ink"}
          />
        </button>
        <Link href={`/see-in-your-room?product=${encodeURIComponent(product.slug)}`} aria-label={`See ${product.name} in your room`} className="absolute left-2.5 top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-card/90 text-foreground backdrop-blur-sm md:h-9 md:w-9">
          <Camera size={16} />
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-3.5 px-0.5 md:gap-4">
        <Link href={href} className="block after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-primary">
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
          className="relative z-10 mt-auto w-full rounded-full bg-primary py-2.5 font-condensed text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-secondary md:py-3 md:text-[0.85rem]"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
