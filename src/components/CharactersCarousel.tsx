"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

export type CharacterCard = {
  name: string;
  img: string;
  tag?: string;
};

export function CharactersCarousel({
  items,
  className,
  tone = "dark",
}: {
  items: CharacterCard[];
  className?: string;
  tone?: "dark" | "light";
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [activeDot, setActiveDot] = useState(0);
  const activeDotRef = useRef(0);

  function scrollBy(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first ? first.offsetWidth + 12 : 332;
    const next = Math.max(0, Math.min(items.length - 1, activeDotRef.current + (direction === 1 ? 1 : -1)));
    el.scrollTo({ left: next * step, behavior: "smooth" });
  }

  useEffect(() => {
    let raf = 0;
    function onScroll() {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const el = scrollerRef.current;
        if (!el) return;
        const first = el.firstElementChild as HTMLElement | null;
        const step = first ? first.offsetWidth + 12 : 332;
        const idx = Math.max(0, Math.round(el.scrollLeft / step));
        activeDotRef.current = idx;
        setActiveDot((prev) => (prev === idx ? prev : idx));
      });
    }

    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [items.length]);

  return (
    <div className={cn("relative", className)}>
      <div
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[40px] blur-[0px]",
            tone === "dark"
              ? "bg-gradient-to-b from-violet-700/55 via-violet-800/55 to-indigo-950/55"
              : "bg-gradient-to-b from-yellow-300/80 via-yellow-200/75 to-yellow-100/70"
          )}
        />

      <div
          className={cn(
            "relative overflow-hidden rounded-[34px] border border-black/10 p-4 sm:p-5 backdrop-blur",
            tone === "dark"
              ? "bg-gradient-to-b from-violet-700/70 via-violet-800/70 to-indigo-950/70 shadow-[0_24px_70px_rgba(0,0,0,0.22)]"
              : "bg-gradient-to-b from-yellow-200/85 via-yellow-100/82 to-white/84 shadow-[0_14px_38px_rgba(0,0,0,0.12)]"
          )}
        >
        {tone === "light" ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_18%_18%,rgba(59,130,246,0.38)_2px,transparent_3px),radial-gradient(circle_at_72%_34%,rgba(249,115,22,0.35)_2px,transparent_3px),radial-gradient(circle_at_44%_72%,rgba(234,179,8,0.35)_2px,transparent_3px)] [background-size:110px_110px]"
          />
        ) : null}

        <button
          type="button"
          onClick={() => scrollBy(-1)}
          className="absolute left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-black/15 bg-white/95 text-black/80 shadow-[0_8px_0_rgba(0,0,0,0.08),0_14px_28px_rgba(0,0,0,0.16)] transition duration-200 hover:-translate-y-[55%] hover:bg-white active:scale-[0.98] sm:flex"
          aria-label="Anterior"
        >
          <span aria-hidden="true" className="text-lg leading-none">‹</span>
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          className="absolute right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-black/15 bg-white/95 text-black/80 shadow-[0_8px_0_rgba(0,0,0,0.08),0_14px_28px_rgba(0,0,0,0.16)] transition duration-200 hover:-translate-y-[55%] hover:bg-white active:scale-[0.98] sm:flex"
          aria-label="Următor"
        >
          <span aria-hidden="true" className="text-lg leading-none">›</span>
        </button>

        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-10 bg-gradient-to-r from-white/55 to-transparent sm:block" />
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-10 bg-gradient-to-l from-white/55 to-transparent sm:block" />

        <div
          ref={scrollerRef}
          className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth pb-2 [scroll-snap-type:x_mandatory]"
        >
          {items.map((c) => (
            <div
              key={c.name}
              className="shrink-0 [scroll-snap-align:start]"
              style={{ width: 320 }}
            >
              <div className="group overflow-hidden rounded-3xl border border-white/15 bg-white/95 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,0,0,0.16)]">
                <div className="relative aspect-[4/3] bg-gradient-to-b from-sky-50 via-white to-orange-50">
                  {c.tag ? (
                    <span className="absolute left-3 top-3 z-10 rounded-full border border-black/10 bg-yellow-300 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-black/75 shadow-[0_4px_0_rgba(0,0,0,0.1)]">
                      {c.tag}
                    </span>
                  ) : null}
                  <Image
                    src={c.img}
                    alt={`${c.name} - personaj pentru petreceri de copii`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
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

        <div className="mt-4 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1.5 shadow-[0_8px_0_rgba(0,0,0,0.05)] backdrop-blur">
            {items.map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`Slide ${idx + 1}`}
                className={cn(
                  "h-2.5 w-2.5 rounded-full border border-black/10 transition",
                  idx === activeDot ? "bg-black/40 scale-110" : "bg-black/15 hover:bg-black/25"
                )}
                onClick={() => {
                  const el = scrollerRef.current;
                  if (!el) return;
                  const first = el.firstElementChild as HTMLElement | null;
                  const step = first ? first.offsetWidth + 12 : 332;
                  el.scrollTo({ left: idx * step, behavior: "smooth" });
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
