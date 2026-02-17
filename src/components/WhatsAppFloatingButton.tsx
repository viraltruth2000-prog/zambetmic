"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";
import { toWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppFloatingButton() {
  const [hideNearFooter, setHideNearFooter] = useState(false);

  useEffect(() => {
    const footerEl = document.getElementById("site-footer");
    if (!footerEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setHideNearFooter(Boolean(entry?.isIntersecting));
      },
      {
        root: null,
        threshold: 0.05,
      }
    );

    observer.observe(footerEl);
    return () => observer.disconnect();
  }, []);

  const href = toWhatsAppLink(
    siteConfig.whatsapp,
    "Bună! Aș vrea o ofertă pentru o petrecere de copii 🙂"
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact pe WhatsApp"
      data-track="open_whatsapp"
      data-track-label="Floating: WhatsApp"
      className={`fixed bottom-20 right-4 z-50 inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-b from-emerald-400 to-emerald-500 px-6 text-white shadow-[0_10px_24px_rgba(16,185,129,0.45)] ring-1 ring-white/30 transition-all duration-200 hover:-translate-y-0.5 hover:brightness-[1.04] active:scale-[0.98] sm:bottom-6 sm:right-6 ${
        hideNearFooter ? "pointer-events-none translate-y-2 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <span
        aria-hidden="true"
        className="-ml-1 mr-2 inline-flex h-5 w-5 items-center justify-center"
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.5 4.5h3l1.4 3.6-1.8 1.4a14.2 14.2 0 0 0 6.4 6.4l1.4-1.8 3.6 1.4v3a2 2 0 0 1-2.2 2 16.8 16.8 0 0 1-7.3-2.6 17.3 17.3 0 0 1-5.4-5.4A16.8 16.8 0 0 1 3.5 6.7 2 2 0 0 1 5.5 4.5Z"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-xl font-extrabold leading-none tracking-tight">
        WhatsApp
      </span>
    </a>
  );
}
