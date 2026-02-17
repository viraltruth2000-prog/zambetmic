"use client";

import { useEffect } from "react";
import { pushAnalyticsEvent } from "@/lib/analytics";

export function AnalyticsEvents() {
  // Single delegated click listener; elements opt in via data attributes.
  // Usage: data-track="cta_click" data-track-label="Hero Rezerva"
  // Optional: data-track-href="..."
  // Note: No external analytics included; use dataLayer if you add GTM later.
  //
  useEffect(() => {
    let detached = false;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let idleId: number | null = null;

    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const event = el.dataset.track;
      if (!event) return;
      pushAnalyticsEvent({
        event,
        label: el.dataset.trackLabel,
        href: el.dataset.trackHref || (el instanceof HTMLAnchorElement ? el.href : undefined),
      });
    }

    const attach = () => {
      if (detached) return;
      document.addEventListener("click", onClick, { capture: true });
    };

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (typeof w.requestIdleCallback === "function") {
      idleId = w.requestIdleCallback(attach);
    } else {
      timeoutId = globalThis.setTimeout(attach, 700);
    }

    return () => {
      detached = true;
      if (timeoutId !== null) globalThis.clearTimeout(timeoutId);
      if (idleId !== null && typeof w.cancelIdleCallback === "function") {
        w.cancelIdleCallback(idleId);
      }
      document.removeEventListener("click", onClick, { capture: true });
    };
  }, []);

  return null;
}
