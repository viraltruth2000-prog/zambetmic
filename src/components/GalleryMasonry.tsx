"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";

export type GalleryItem = {
  src: string;
  alt: string;
  caption?: string;
};

function clampIndex(i: number, len: number) {
  if (len <= 0) return 0;
  return (i + len) % len;
}

export function GalleryMasonry({
  items,
  className,
}: {
  items: GalleryItem[];
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

  return (
    <div className={cn("relative", className)}>
      {/* Masonry via CSS columns */}
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((it, idx) => (
          <button
            key={`${it.src}-${idx}`}
            type="button"
            onClick={() => setOpenIndex(idx)}
            className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-3xl border border-black/10 bg-white text-left shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20"
            aria-label={`Deschide: ${it.alt}`}
          >
            <div className="relative">
              <img
                src={it.src}
                alt={it.alt}
                loading="lazy"
                className="w-full select-none object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <p className="text-sm font-semibold text-white">{it.caption ?? it.alt}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Imagine"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpenIndex(null);
          }}
        >
          <div className="relative w-full max-w-5xl">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl">
              <img
                src={active.src}
                alt={active.alt}
                className="max-h-[78dvh] w-full select-none object-contain"
                draggable={false}
              />
              <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-black/50 px-4 py-3 text-white/85 backdrop-blur">
                <p className="text-sm font-medium">
                  {active.caption ?? active.alt}
                </p>
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

            {/* Side nav buttons (desktop) */}
            <button
              type="button"
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur hover:bg-white/15"
              aria-label="Imaginea anterioară"
              onClick={() => setOpenIndex((i) => (i === null ? 0 : i - 1))}
            >
              ←
            </button>
            <button
              type="button"
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur hover:bg-white/15"
              aria-label="Imaginea următoare"
              onClick={() => setOpenIndex((i) => (i === null ? 0 : i + 1))}
            >
              →
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
