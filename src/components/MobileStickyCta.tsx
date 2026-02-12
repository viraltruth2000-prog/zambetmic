import { siteConfig } from "@/lib/site";
import { toWhatsAppLink } from "@/lib/whatsapp";
import { ButtonLink, ButtonAnchor } from "@/components/ui/Button";

export function MobileStickyCta() {
  const wa = toWhatsAppLink(
    siteConfig.whatsapp,
    "Bună! Vreau să rezerv animatori pentru o petrecere de copii."
  );

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
      <div className="mx-auto w-full max-w-screen-2xl px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-2">
        <div className="flex gap-3 rounded-full border-2 border-black/10 bg-white/80 p-2 shadow-[0_18px_60px_rgba(0,0,0,0.16)] backdrop-blur">
          <ButtonLink
            href="/contact"
            className="flex-1 justify-center"
            data-track="cta_click"
            data-track-label="Sticky: Rezervă"
          >
            Rezervă
          </ButtonLink>
          <ButtonAnchor
            href={wa}
            variant="secondary"
            className="flex-1 justify-center"
            data-track="cta_click"
            data-track-label="Sticky: WhatsApp"
          >
            WhatsApp
          </ButtonAnchor>
        </div>
      </div>
    </div>
  );
}
