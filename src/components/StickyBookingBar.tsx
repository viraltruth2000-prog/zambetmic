"use client";

import { useEffect, useState } from "react";
import { ButtonAnchor } from "@/components/ui/Button";

export function StickyBookingBar({ href }: { href: string }) {
  const [hideNearFooter, setHideNearFooter] = useState(false);
  const [hideForOverlay, setHideForOverlay] = useState(false);

  useEffect(() => {
    const footerEl = document.getElementById("site-footer");
    if (!footerEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setHideNearFooter(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.05 }
    );

    observer.observe(footerEl);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const computeOverlay = () => {
      const modalOpen = Boolean(
        document.querySelector('[role="dialog"][aria-modal="true"]')
      );
      const lockedBody = document.body.style.overflow === "hidden";
      setHideForOverlay(modalOpen || lockedBody);
    };

    const observer = new MutationObserver(() => computeOverlay());
    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      childList: true,
      attributeFilter: ["style", "class", "aria-hidden"],
    });
    computeOverlay();

    return () => observer.disconnect();
  }, []);

  const hidden = hideNearFooter || hideForOverlay;

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-4 z-40 hidden justify-center transition-all duration-200 lg:flex ${
        hidden ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="pointer-events-auto inline-flex items-center gap-3 rounded-full border-2 border-black/10 bg-white/92 px-3 py-2 shadow-[0_16px_36px_rgba(0,0,0,0.18)] backdrop-blur">
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-black/70">
          Verifica rapid
        </span>
        <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-sm font-semibold text-black/70">
          Data evenimentului
        </span>
        <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-sm font-semibold text-black/70">
          Bucuresti / Ilfov
        </span>
        <ButtonAnchor
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          size="md"
          className="justify-center"
          data-track="open_whatsapp"
          data-track-label="Sticky booking bar"
        >
          Cere oferta acum
        </ButtonAnchor>
      </div>
    </div>
  );
}
