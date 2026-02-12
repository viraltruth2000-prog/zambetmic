"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

export type CharacterCard = {
  name: string;
  img: string;
};

export function CharactersCarousel({
  items,
  className,
}: {
  items: CharacterCard[];
  className?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const step = useMemo(() => 340, []);

  function scrollBy(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  }

  return (
    <div className={cn("relative", className)}>
      <div className="pointer-events-none absolute inset-0 rounded-[40px] bg-gradient-to-b from-violet-700/55 via-violet-800/55 to-indigo-950/55 blur-[0px]" />

      <div className="relative rounded-[40px] border border-black/10 bg-gradient-to-b from-violet-700/70 via-violet-800/70 to-indigo-950/70 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-black/15 bg-white/85 text-black/80 shadow-[0_14px_0_rgba(0,0,0,0.08),0_22px_60px_rgba(0,0,0,0.14)] backdrop-blur transition hover:-translate-y-[55%] hover:bg-white active:scale-[0.98] md:flex"
          aria-label="Anterior"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-black/15 bg-white/85 text-black/80 shadow-[0_14px_0_rgba(0,0,0,0.08),0_22px_60px_rgba(0,0,0,0.14)] backdrop-blur transition hover:-translate-y-[55%] hover:bg-white active:scale-[0.98] md:flex"
          aria-label="Următor"
        >
          →
        </button>

        <div
          ref={scrollerRef}
          className="flex gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [scroll-snap-type:x_mandatory] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((c) => (
            <div
              key={c.name}
              className="shrink-0 [scroll-snap-align:start]"
              style={{ width: 280 }}
            >
              <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/95 shadow-sm">
                <div className="relative aspect-[4/3] bg-gradient-to-b from-sky-50 via-white to-orange-50">
                  <Image
                    src={c.img}
                    alt={c.name}
                    fill
                    className="object-cover"
                    sizes="280px"
                    priority={false}
                  />
                </div>
                <div className="p-5 text-center">
                  <p className="text-sm font-extrabold tracking-tight text-black/85">
                    {c.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
