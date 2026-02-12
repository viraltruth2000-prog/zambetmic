"use client";

import { useEffect } from "react";

type TrackPayload = {
  event: string;
  label?: string;
  href?: string;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function track(payload: TrackPayload) {
  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({
      event: payload.event,
      label: payload.label,
      href: payload.href,
      ts: Date.now(),
    });
  } catch {
    // no-op
  }
}

export function AnalyticsEvents() {
  // Single delegated click listener; elements opt in via data attributes.
  // Usage: data-track="cta_click" data-track-label="Hero Rezerva"
  // Optional: data-track-href="..."
  // Note: No external analytics included; use dataLayer if you add GTM later.
  //
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const event = el.dataset.track;
      if (!event) return;
      track({
        event,
        label: el.dataset.trackLabel,
        href: el.dataset.trackHref || (el instanceof HTMLAnchorElement ? el.href : undefined),
      });
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
