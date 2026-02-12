"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

export type MomentItem = {
  src: string;
  alt: string;
  caption?: string;
};

function clampIndex(i: number, len: number) {
  if (len <= 0) return 0;
  return (i + len) % len;
}

export function MomentsStrip({
  items,
  className,
  showDots = false,
  autoPlayMs,
}: {
  items: MomentItem[];
  className?: string;
  showDots?: boolean;
  autoPlayMs?: number;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [activeDot, setActiveDot] = useState(0);
  const activeDotRef = useRef(0);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const active = useMemo(() => {
    if (openIndex === null) return null;
    return items[clampIndex(openIndex, items.length)] ?? null;
  }, [items, openIndex]);

  useEffect(() => {
    if (openIndex === null) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? 0 : i + 1));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? 0 : i - 1));
    }

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [openIndex]);

  function scrollBy(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const next = clampIndex(activeDotRef.current + (direction === 1 ? 1 : -1), items.length);
    el.scrollTo({ left: next * 280, behavior: "smooth" });
  }

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!autoPlayMs || autoPlayMs < 1200) return;
    if (paused || openIndex !== null || reduceMotion) return;
    const el = scrollerRef.current;
    if (!el) return;

    const id = window.setInterval(() => {
      const next = clampIndex(activeDotRef.current + 1, items.length);
      el.scrollTo({ left: next * 280, behavior: "smooth" });
    }, autoPlayMs);

    return () => window.clearInterval(id);
  }, [autoPlayMs, paused, openIndex, items.length, reduceMotion]);

  useEffect(() => {
    function onScroll() {
      const el = scrollerRef.current;
      if (!el) return;
      // 260 card width + 20 gap (gap-5)
      const step = 280;
      const idx = Math.max(0, Math.round(el.scrollLeft / step));
      activeDotRef.current = idx;
      setActiveDot(idx);
    }

    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        className="absolute -left-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-black/15 bg-white/85 text-black/80 shadow-[0_14px_0_rgba(0,0,0,0.08),0_22px_60px_rgba(0,0,0,0.14)] backdrop-blur transition hover:-translate-y-[55%] hover:bg-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 sm:flex"
        aria-label="Momente anterioare"
        onClick={() => scrollBy(-1)}
      >
        ←
      </button>
      <button
        type="button"
        className="absolute -right-2 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-black/15 bg-white/85 text-black/80 shadow-[0_14px_0_rgba(0,0,0,0.08),0_22px_60px_rgba(0,0,0,0.14)] backdrop-blur transition hover:-translate-y-[55%] hover:bg-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 sm:flex"
        aria-label="Momente următoare"
        onClick={() => scrollBy(1)}
      >
        →
      </button>

      <div
        ref={scrollerRef}
        className="flex gap-5 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [scroll-snap-type:x_mandatory] [&::-webkit-scrollbar]:hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {items.map((it, idx) => (
          <button
            key={`${it.src}-${idx}`}
            type="button"
            onClick={() => setOpenIndex(idx)}
            className="group relative shrink-0 overflow-hidden rounded-[28px] border-2 border-black/10 bg-white/85 shadow-[0_16px_0_rgba(0,0,0,0.06),0_22px_70px_rgba(0,0,0,0.12)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_0_rgba(0,0,0,0.06),0_28px_90px_rgba(0,0,0,0.14)] active:scale-[0.99] [scroll-snap-align:start]"
            style={{ width: 260 }}
            aria-label={`Deschide: ${it.alt}`}
          >
            <div className="aspect-[4/3]">
              <Image
                src={it.src}
                alt={it.alt}
                width={520}
                height={390}
                className="h-full w-full object-cover"
                sizes="260px"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <p className="text-sm font-extrabold tracking-tight text-white">
                  {it.caption ?? it.alt}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {showDots ? (
        <div className="mt-5 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 shadow-[0_12px_0_rgba(0,0,0,0.06)] backdrop-blur">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Mergi la ${idx + 1}`}
              className={cn(
                "h-2.5 w-2.5 rounded-full border border-black/10 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
                idx === activeDot
                  ? "bg-black/40 scale-[1.08]"
                  : "bg-black/15 hover:bg-black/25"
              )}
              onClick={() => {
                const el = scrollerRef.current;
                if (!el) return;
                el.scrollTo({ left: idx * 280, behavior: "smooth" });
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") scrollBy(1);
                if (e.key === "ArrowLeft") scrollBy(-1);
              }}
            />
          ))}
          </div>
        </div>
      ) : null}

      {/* Lightbox */}
      {active ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Imagine"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpenIndex(null);
          }}
        >
          <div className="relative w-full max-w-5xl">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">
              <div className="relative max-h-[78dvh] w-full">
                <Image
                  src={active.src}
                  alt={active.alt}
                  width={1600}
                  height={1200}
                  className="max-h-[78dvh] w-full select-none object-contain"
                  draggable={false}
                  sizes="(min-width: 1024px) 960px, 92vw"
                />
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-black/50 px-4 py-3 text-white/85 backdrop-blur">
                <p className="text-sm font-medium">{active.caption ?? active.alt}</p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-semibold hover:bg-white/15"
                    onClick={() => setOpenIndex((i) => (i === null ? 0 : i - 1))}
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-semibold hover:bg-white/15"
                    onClick={() => setOpenIndex((i) => (i === null ? 0 : i + 1))}
                  >
                    →
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-sm font-semibold hover:bg-white/15"
                    onClick={() => setOpenIndex(null)}
                  >
                    Închide
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
