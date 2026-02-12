"use client";

import { useState } from "react";

export function KidsHeroBackdrop({
  tone = "dark",
  imagePngSrc,
  imageWebpSrc,
}: {
  tone?: "dark" | "light";
  imagePngSrc?: string;
  imageWebpSrc?: string;
}) {
  const [fallback, setFallback] = useState(false);

  const usingCustom = !fallback;

  const primarySources = {
    png: imagePngSrc ?? "/hero-bg-custom.png",
    webp: imageWebpSrc,
  };

  const fallbackSources = {
    png: "/hero-bg.png",
    webp: undefined,
  };

  const sources = fallback ? fallbackSources : primarySources;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Background image (drop-in): add public/hero-bg-custom.png (or .webp). Falls back to existing hero-bg.png */}
      <picture className="absolute inset-0" key={fallback ? "fallback" : "custom"}>
        {sources.webp ? <source type="image/webp" srcSet={sources.webp} /> : null}
        <source type="image/png" srcSet={sources.png} />
        <img
          src={sources.png}
          alt=""
          className="h-full w-full object-cover object-center"
          loading="eager"
          aria-hidden="true"
          onError={() => {
            if (!fallback) setFallback(true);
          }}
        />
      </picture>

      {/* base gradient tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-200/40 via-white/10 to-white/0" />

      {/* ambient blobs (disabled for custom illustration to avoid "confetti" look) */}
      {!usingCustom && (
        <>
          <div className="animate-float-slow absolute -left-20 top-24 h-72 w-72 rounded-full bg-pink-400/30 blur-2xl" />
          <div className="animate-float-reverse absolute left-20 top-10 h-56 w-56 rounded-full bg-sky-400/30 blur-2xl" />
          <div className="animate-float-slower absolute right-10 top-16 h-64 w-64 rounded-full bg-yellow-300/25 blur-2xl" />
          <div className="animate-float-slow absolute -right-32 top-44 h-80 w-80 rounded-full bg-orange-400/25 blur-2xl" />
          <div className="animate-float-reverse absolute left-1/2 -bottom-52 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl" />
        </>
      )}

      {/* grain */}
      <div className="bg-noise absolute inset-0 opacity-25 mix-blend-overlay" />

      {/* overlay */}
      {tone === "dark" ? (
        <div className="absolute inset-0 bg-black/45" />
      ) : (
        <div
          className={
            usingCustom
              ? "absolute inset-0 bg-gradient-to-r from-white/60 via-white/25 to-white/5"
              : "absolute inset-0 bg-white/55"
          }
        />
      )}
    </div>
  );
}
