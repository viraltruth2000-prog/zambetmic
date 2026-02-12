"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

export type StageFrame = {
  left: string;
  top: string;
  width: string;
  height: string;
};

export type StageCharacter = {
  name: string;
  img: string;
};

function clampIndex(i: number, len: number) {
  if (len <= 0) return 0;
  return (i + len) % len;
}

export function CharactersStageCarousel({
  items,
  frames,
  className,
  initialIndex = 0,
  showDots = false,
  autoPlayMs,
}: {
  items: StageCharacter[];
  frames: [StageFrame, StageFrame, StageFrame];
  className?: string;
  initialIndex?: number;
  showDots?: boolean;
  autoPlayMs?: number;
}) {
  const [activeIndex, setActiveIndex] = useState(() =>
    clampIndex(initialIndex, items.length)
  );
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const pointerState = useRef<{
    id: number;
    startX: number;
    startY: number;
    moved: boolean;
  } | null>(null);

  const active = useMemo(() => {
    const len = items.length;
    if (len === 0) return null;
    const left = items[clampIndex(activeIndex - 1, len)]!;
    const center = items[clampIndex(activeIndex, len)]!;
    const right = items[clampIndex(activeIndex + 1, len)]!;
    return { left, center, right } as const;
  }, [activeIndex, items]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight") setActiveIndex((i) => i + 1);
      if (e.key === "ArrowLeft") setActiveIndex((i) => i - 1);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!autoPlayMs || autoPlayMs < 1200) return;
    if (items.length <= 1) return;
    if (paused || reduceMotion) return;

    const id = window.setInterval(() => {
      setActiveIndex((i) => i + 1);
    }, autoPlayMs);

    return () => window.clearInterval(id);
  }, [autoPlayMs, items.length, paused, reduceMotion]);

  if (!active) return null;

  const frameItems: [StageCharacter, StageCharacter, StageCharacter] = [
    active.left,
    active.center,
    active.right,
  ];

  return (
    <div
      className={cn("relative", className)}
      aria-label="Carousel personaje"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onPointerDown={(e) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        pointerState.current = {
          id: e.pointerId,
          startX: e.clientX,
          startY: e.clientY,
          moved: false,
        };
        setPaused(true);
        (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        const st = pointerState.current;
        if (!st || st.id !== e.pointerId) return;
        const dx = e.clientX - st.startX;
        const dy = e.clientY - st.startY;
        if (Math.abs(dx) > 10 || Math.abs(dy) > 10) st.moved = true;
      }}
      onPointerUp={(e) => {
        const st = pointerState.current;
        if (!st || st.id !== e.pointerId) return;
        const dx = e.clientX - st.startX;
        const dy = e.clientY - st.startY;
        pointerState.current = null;
        if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy)) {
          setActiveIndex((i) => i + (dx < 0 ? 1 : -1));
        }
        setPaused(false);
      }}
      onPointerCancel={() => {
        pointerState.current = null;
        setPaused(false);
      }}
    >
      {/* Frames content */}
      {frameItems.map((c, idx) => {
        const f = frames[idx]!;
        const isCenter = idx === 1;

        return (
          <div
            key={`${idx}-${c.name}-${c.img}`}
            className={cn(
              "absolute overflow-hidden rounded-[16px] ring-1 ring-black/10",
              "transition-[transform,opacity,filter] duration-500 will-change-transform",
              "ease-[cubic-bezier(.2,1,.2,1)]",
              isCenter
                ? "scale-[1.02] animate-storybook-pop"
                : "scale-[0.98] opacity-95 animate-storybook-fade"
            )}
            style={{ left: f.left, top: f.top, width: f.width, height: f.height }}
            aria-hidden="true"
          >
            {isCenter ? (
              <>
                <div className="pointer-events-none absolute -inset-6 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.45),rgba(255,255,255,0)_60%)] opacity-70" />
                <div className="pointer-events-none absolute inset-0 ring-2 ring-white/45" />
                <div className="pointer-events-none absolute -inset-2 rounded-[18px] shadow-[0_26px_80px_rgba(0,0,0,0.22)]" />
              </>
            ) : null}
            <div className="relative h-full w-full">
              <Image
                src={c.img}
                alt={c.name}
                fill
                className="object-cover"
                sizes="(min-width: 640px) 22vw, 0px"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0" />
          </div>
        );
      })}

      {/* Arrows (like the reference mock) */}
      <button
        type="button"
        className="absolute left-[6%] top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-black/15 bg-white/80 text-black/80 shadow-[0_14px_0_rgba(0,0,0,0.08),0_22px_60px_rgba(0,0,0,0.14)] backdrop-blur transition hover:-translate-y-[55%] hover:bg-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:flex"
        aria-label="Personajul anterior"
        onClick={() => setActiveIndex((i) => i - 1)}
      >
        ←
      </button>
      <button
        type="button"
        className="absolute right-[6%] top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-black/15 bg-white/80 text-black/80 shadow-[0_14px_0_rgba(0,0,0,0.08),0_22px_60px_rgba(0,0,0,0.14)] backdrop-blur transition hover:-translate-y-[55%] hover:bg-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:flex"
        aria-label="Personajul următor"
        onClick={() => setActiveIndex((i) => i + 1)}
      >
        →
      </button>

      {showDots ? (
        <div className="absolute inset-x-0 bottom-[4%] z-20 hidden justify-center gap-2 sm:flex">
          {items.map((_, idx) => {
            const isActive = clampIndex(activeIndex, items.length) === idx;
            return (
              <button
                key={idx}
                type="button"
                aria-label={`Mergi la ${idx + 1}`}
                className={cn(
                  "h-2.5 w-2.5 rounded-full border border-white/30 shadow-[0_8px_0_rgba(0,0,0,0.12)] transition",
                  isActive
                    ? "bg-white/95 scale-[1.05]"
                    : "bg-white/35 hover:bg-white/55"
                )}
                onClick={() => setActiveIndex(idx)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") setActiveIndex((i) => i + 1);
                  if (e.key === "ArrowLeft") setActiveIndex((i) => i - 1);
                }}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
