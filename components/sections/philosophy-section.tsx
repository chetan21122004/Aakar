import Image from "next/image";

export function PhilosophySection() {
  return (
    <section id="philosophy" className="bg-background">
      <div className="px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36">
        <h2 className="mx-auto mb-12 max-w-5xl text-center font-serif text-3xl font-light leading-snug tracking-tight text-foreground md:mb-16 md:text-4xl lg:text-5xl">
          Built with Honest Materials and Careful Craft
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-none">
            <Image
              src="https://images.unsplash.com/photo-1687422810663-c316494f725a?q=80&w=1200&auto=format&fit=crop"
              alt="Craftsman hand-shaping a piece of solid wood"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6">
              <span className="rounded-none bg-[rgba(23,63,53,0.9)] px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                Hand-Finished
              </span>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-none">
            <Image
              src="https://images.unsplash.com/photo-1736506159893-22cca29b8018?q=80&w=1200&auto=format&fit=crop"
              alt="Close-up of natural solid wood grain texture"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-6 left-6">
              <span className="rounded-none bg-[rgba(139,94,52,0.9)] px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                Solid Wood
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-20 md:px-12 md:pb-28 lg:px-20 lg:pb-14">
        <div className="space-y-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-secondary">
            Our Philosophy
          </p>
          <p className="mt-8 text-center font-serif text-3xl font-light leading-relaxed text-foreground">
            From solid wood frames to natural finishes and fine detailing, every Aakar Woodcraft piece is made with a focus on durability, comfort, and timeless design.
          </p>
          <div className="pt-6">
            <a
              href="/process"
              className="inline-block border-b border-foreground pb-1 text-sm font-medium text-foreground transition-opacity hover:opacity-70"
            >
              Know Our Process
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
