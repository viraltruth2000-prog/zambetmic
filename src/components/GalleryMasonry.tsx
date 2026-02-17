"use client";

import Image from "next/image";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { cn } from "@/lib/cn";

export type GalleryItem = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

function clampIndex(i: number, len: number) {
  if (len <= 0) return 0;
  return (i + len) % len;
}

const GalleryTile = memo(function GalleryTile({
  item,
  idx,
  frameClass,
  onOpen,
}: {
  item: GalleryItem;
  idx: number;
  frameClass: string;
  onOpen: (idx: number) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(idx)}
      className={cn(
        "group mb-4 block w-full break-inside-avoid text-left transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
        idx % 2 === 0 ? "rotate-[-0.8deg]" : "rotate-[0.8deg]"
      )}
      aria-label={`Deschide: ${item.alt}`}
    >
      <div
        className={cn(
          "rounded-[28px] border-2 border-black/10 p-2 shadow-[0_8px_0_rgba(0,0,0,0.08),0_14px_24px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:rotate-0",
          frameClass
        )}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] border-2 border-white/70 bg-white">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            loading="lazy"
            quality={75}
            sizes="(min-width: 1280px) 360px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 96vw"
            className="h-full w-full select-none object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <p className="text-sm font-black text-white">{item.caption ?? item.alt}</p>
          </div>
          <span className="pointer-events-none absolute right-3 top-3 inline-flex rounded-full border border-black/10 bg-white/88 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-black/60 shadow-sm">
            Wow
          </span>
        </div>
      </div>
    </button>
  );
});

export function GalleryMasonry({
  items,
  className,
}: {
  items: GalleryItem[];
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [allowTilt, setAllowTilt] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchMoveXRef = useRef<number | null>(null);
  const tiltRafRef = useRef<number | null>(null);
  const tiltTargetRef = useRef({ x: 0, y: 0 });
  const tiltLayerRef = useRef<HTMLDivElement | null>(null);
  const onOpen = useCallback((idx: number) => setOpenIndex(idx), []);
  const closeLightbox = useCallback(() => setOpenIndex(null), []);
  const goPrev = useCallback(() => {
    setOpenIndex((i) => (i === null ? 0 : i - 1));
  }, []);
  const goNext = useCallback(() => {
    setOpenIndex((i) => (i === null ? 0 : i + 1));
  }, []);
  const goTo = useCallback((idx: number) => setOpenIndex(idx), []);
  const onPrevClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    goPrev();
  }, [goPrev]);
  const onNextClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    goNext();
  }, [goNext]);
  const frameStyles = [
    "bg-gradient-to-br from-sky-300 via-cyan-200 to-emerald-200",
    "bg-gradient-to-br from-pink-300 via-fuchsia-200 to-violet-200",
    "bg-gradient-to-br from-amber-300 via-yellow-200 to-orange-200",
    "bg-gradient-to-br from-lime-300 via-emerald-200 to-teal-200",
  ] as const;

  const active = useMemo(() => {
    if (openIndex === null) return null;
    return items[clampIndex(openIndex, items.length)] ?? null;
  }, [items, openIndex]);
  const activeIndex = useMemo(() => {
    if (openIndex === null) return 0;
    return clampIndex(openIndex, items.length);
  }, [items.length, openIndex]);

  useEffect(() => {
    if (openIndex === null) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [closeLightbox, goNext, goPrev, openIndex]);

  useEffect(() => {
    const mqlHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const mqlReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAllowTilt(mqlHover.matches && !mqlReduced.matches);
    sync();
    mqlHover.addEventListener("change", sync);
    mqlReduced.addEventListener("change", sync);
    return () => {
      mqlHover.removeEventListener("change", sync);
      mqlReduced.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (tiltRafRef.current !== null) {
        cancelAnimationFrame(tiltRafRef.current);
      }
    };
  }, []);

  return (
    <div className={cn("relative", className)}>
      {/* Masonry via CSS columns */}
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
        {items.map((it, idx) => (
          <GalleryTile
            key={`${it.src}-${idx}`}
            item={it}
            idx={idx}
            frameClass={frameStyles[idx % frameStyles.length]}
            onOpen={onOpen}
          />
        ))}
      </div>

      {/* Lightbox */}
      {active ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(218,236,255,0.45)] p-3 backdrop-blur-sm sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Imagine"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}
        >
          <div className="animate-storybook-pop relative w-full max-w-6xl">
            <div className="overflow-hidden rounded-[24px] border border-white/55 bg-[rgba(255,255,255,0.32)] shadow-[0_14px_34px_rgba(45,88,131,0.18)] backdrop-blur-md">
              <div className="flex items-center justify-between gap-3 border-b border-white/35 bg-[linear-gradient(90deg,rgba(255,235,186,0.58),rgba(252,205,222,0.48),rgba(197,222,255,0.56))] px-3 py-2.5 sm:px-4 sm:py-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-white/60 bg-white/82 px-3 py-1 text-xs font-black text-black/70 shadow-[0_2px_0_rgba(0,0,0,0.14)]">
                    {activeIndex + 1} / {items.length}
                  </span>
                  <p className="hidden text-xs font-bold text-black/60 sm:block">
                    ← → pentru navigare, ESC pentru închidere
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/80 bg-white/92 text-2xl font-black leading-none text-black/70 shadow-[0_3px_0_rgba(0,0,0,0.12)] transition-transform duration-200 hover:scale-105 hover:bg-white active:scale-95"
                  aria-label="Închide galeria"
                  onClick={closeLightbox}
                >
                  ×
                </button>
              </div>

              <div
                className="relative bg-transparent"
                onTouchStart={(e) => {
                  const x = e.touches[0]?.clientX ?? null;
                  touchStartXRef.current = x;
                  touchMoveXRef.current = x;
                }}
                onTouchMove={(e) => {
                  touchMoveXRef.current = e.touches[0]?.clientX ?? null;
                }}
                onTouchEnd={() => {
                  const touchStartX = touchStartXRef.current;
                  const touchMoveX = touchMoveXRef.current;
                  if (touchStartX === null || touchMoveX === null) return;
                  const delta = touchMoveX - touchStartX;
                  if (Math.abs(delta) > 48) {
                    if (delta < 0) goNext();
                    if (delta > 0) goPrev();
                  }
                  touchStartXRef.current = null;
                  touchMoveXRef.current = null;
                }}
                onMouseMove={(e) => {
                  if (!allowTilt) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const nx = (e.clientX - rect.left) / rect.width - 0.5;
                  const ny = (e.clientY - rect.top) / rect.height - 0.5;
                  const next = { x: nx * 8, y: ny * 8 };
                  const prev = tiltTargetRef.current;
                  if (Math.abs(next.x - prev.x) < 0.35 && Math.abs(next.y - prev.y) < 0.35) return;
                  tiltTargetRef.current = next;
                  if (tiltRafRef.current !== null) return;
                  tiltRafRef.current = requestAnimationFrame(() => {
                    tiltRafRef.current = null;
                    const node = tiltLayerRef.current;
                    if (!node) return;
                    const { x, y } = tiltTargetRef.current;
                    node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
                  });
                }}
                onMouseLeave={() => {
                  if (!allowTilt) return;
                  tiltTargetRef.current = { x: 0, y: 0 };
                  const node = tiltLayerRef.current;
                  if (node) node.style.transform = "translate3d(0,0,0)";
                }}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const leftZone = rect.width * 0.33;
                  const rightZone = rect.width * 0.67;
                  if (x < leftZone) goPrev();
                  if (x > rightZone) goNext();
                }}
              >
                <button
                  type="button"
                  className="absolute left-2 top-1/2 z-10 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/80 bg-white/92 text-2xl font-black text-black/65 shadow-[0_4px_0_rgba(0,0,0,0.12)] backdrop-blur transition-transform duration-200 hover:scale-105 hover:bg-white active:scale-95 md:flex"
                  aria-label="Imaginea anterioară"
                  onClick={onPrevClick}
                >
                  ←
                </button>
                <button
                  type="button"
                  className="absolute right-2 top-1/2 z-10 hidden h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/80 bg-white/92 text-2xl font-black text-black/65 shadow-[0_4px_0_rgba(0,0,0,0.12)] backdrop-blur transition-transform duration-200 hover:scale-105 hover:bg-white active:scale-95 md:flex"
                  aria-label="Imaginea următoare"
                  onClick={onNextClick}
                >
                  →
                </button>

                <div
                  key={active.src}
                  ref={tiltLayerRef}
                  className="max-h-[74dvh] w-full transition-transform duration-200 ease-out"
                  style={{ transform: "translate3d(0,0,0)" }}
                >
                  <Image
                    src={active.src}
                    alt={active.alt}
                    width={active.width ?? 900}
                    height={active.height ?? 675}
                    quality={82}
                    sizes="(min-width: 1280px) 1120px, 92vw"
                    className="max-h-[74dvh] w-full select-none object-contain"
                    draggable={false}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-white/35 bg-[linear-gradient(90deg,rgba(181,223,255,0.54),rgba(230,199,255,0.48),rgba(255,220,184,0.56))] px-3 py-2.5 text-black/75 sm:px-4 sm:py-3">
                <p className="line-clamp-1 text-sm font-black">{active.caption ?? active.alt}</p>
                <div className="flex items-center gap-2 md:hidden">
                  <button
                    type="button"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/80 bg-white/92 text-2xl font-black text-black/70 shadow-[0_3px_0_rgba(0,0,0,0.12)] transition-transform duration-200 active:scale-95"
                    onClick={goPrev}
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/80 bg-white/92 text-2xl font-black text-black/70 shadow-[0_3px_0_rgba(0,0,0,0.12)] transition-transform duration-200 active:scale-95"
                    onClick={goNext}
                  >
                    →
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 border-t border-white/30 bg-white/28 px-3 py-2.5">
                {items.map((_, i) => (
                  <button
                    key={`dot-${i}`}
                    type="button"
                    aria-label={`Mergi la imaginea ${i + 1}`}
                    onClick={() => goTo(i)}
                    className={cn(
                      "h-2.5 rounded-full transition-all duration-200",
                      i === activeIndex ? "w-6 bg-black/55" : "w-2.5 bg-black/25 hover:bg-black/40"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
