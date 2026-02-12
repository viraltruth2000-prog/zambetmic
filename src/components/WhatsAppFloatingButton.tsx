import { siteConfig } from "@/lib/site";
import { toWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppFloatingButton() {
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
      data-track="cta_click"
      data-track-label="Floating: WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30 ring-1 ring-black/10 transition-transform hover:scale-[1.04] active:scale-[0.98]"
    >
      {/* Simple WA glyph (not a trademarked logo) */}
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M12 2.2c-5.4 0-9.8 4.1-9.8 9.2 0 1.6.4 3.2 1.2 4.6L2 22l6.6-1.7c1.1.5 2.3.7 3.4.7 5.4 0 9.8-4.1 9.8-9.2S17.4 2.2 12 2.2Z"
          fill="white"
          fillOpacity="0.92"
        />
        <path
          d="M9.3 8.2c.2-.5.4-.5.7-.5h.6c.2 0 .4 0 .6.4.2.4.8 1.8.9 2 0 .2.1.4 0 .6-.1.2-.2.3-.3.5-.1.2-.2.3-.4.5-.2.2-.4.4-.2.7.2.3 1 1.6 2.2 2.5 1.5 1.2 2 1.3 2.3 1.1.3-.2 1-.9 1.3-1.2.3-.3.5-.2.8-.1.3.1 2.1 1 2.4 1.2.3.2.5.3.5.5 0 .2-.2 1.4-.9 2-.7.6-1.5.7-2 .7-.5 0-1.1-.1-2.4-.6-1.3-.5-2.8-1.6-4-3-1.2-1.4-2-3-2.3-3.7-.3-.7-.3-1.3-.1-1.8.2-.5.5-1.2.7-1.6Z"
          fill="#0B3B2E"
          fillOpacity="0.9"
        />
      </svg>
    </a>
  );
}
