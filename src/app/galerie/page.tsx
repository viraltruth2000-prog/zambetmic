import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CloudPuffDivider } from "@/components/CloudPuffDivider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryMasonry, type GalleryItem } from "@/components/GalleryMasonry";

export const metadata: Metadata = {
  title: "Galerie",
  description: "Galerie cu poze și momente de la petreceri de copii.",
};

const items: GalleryItem[] = Array.from({ length: 12 }).map((_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    src: `/gallery/img-${n}.svg`,
    alt: `Petrecere copii – moment ${i + 1}`,
    caption: `Moment #${i + 1}`,
  };
});

export default function GaleriePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-yellow-200/35 via-white to-background py-14 sm:py-18">
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.10]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.75),rgba(255,255,255,0)_55%)]"
          aria-hidden="true"
        />
        <Container className="relative">
          <SectionHeading
            eyebrow="Galerie"
            title="Culoare, zâmbete, energie"
            description="Click pe o poză ca să o vezi mare (lightbox). Săgeți stânga/dreapta pentru navigare, ESC pentru închidere."
          />
        </Container>

        <div className="pointer-events-none absolute inset-x-0 [bottom:-1px] text-white drop-shadow-[0_-10px_18px_rgba(0,0,0,0.10)] leading-none">
          <CloudPuffDivider className="h-20 w-full text-white" />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <GalleryMasonry items={items} />
          <p className="mt-8 text-sm text-black/60">
            Înlocuiește imaginile din `public/gallery/` cu poze reale (JPG/PNG/WebP)
            păstrând numele fișierelor (sau actualizează lista din această pagină).
          </p>
        </Container>
      </section>
    </div>
  );
}
