import type { Metadata } from "next";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Container } from "@/components/Container";
import type { GalleryItem } from "@/components/GalleryMasonry";
import { SeoFaqSection } from "@/components/SeoFaqSection";
import { SeoRelatedLinksSection } from "@/components/SeoRelatedLinksSection";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";
import { toWhatsAppLink } from "@/lib/whatsapp";
import {
  buildBreadcrumbJson,
  buildFaqPageJson,
  buildImageGalleryJson,
  buildPageMetadata,
  buildWebPageJson,
} from "@/lib/seo";

const GalleryMasonry = dynamic(
  () => import("@/components/GalleryMasonry").then((m) => m.GalleryMasonry),
  { loading: () => <div className="min-h-[980px] rounded-[28px] border border-black/10 bg-white/65" /> }
);

export const metadata: Metadata = buildPageMetadata({
  title: "Galerie",
  description: "Galerie cu momente vesele de la petreceri pentru copii.",
  path: "/galerie",
});

const breadcrumbLdJson = buildBreadcrumbJson("Galerie", "/galerie");
const webPageLdJson = buildWebPageJson({
  name: "Galerie",
  path: "/galerie",
  description: "Galerie cu momente vesele de la petreceri pentru copii.",
});
const faqItems = [
  {
    q: "Pozele din galerie sunt de la evenimente reale?",
    a: "Da, galeria include momente reale din petreceri organizate de echipa noastră, nu imagini de stoc.",
  },
  {
    q: "Pot vedea mai multe imagini pe o temă anume?",
    a: "Da, ne poți scrie pe WhatsApp și îți trimitem rapid exemple relevante pentru tema pe care o dorești.",
  },
  {
    q: "Cum rezerv o petrecere similară cu cele din galerie?",
    a: "Completezi formularul de contact sau ne scrii pe WhatsApp cu data, locația și vârsta copiilor.",
  },
] as const;
const faqLdJson = buildFaqPageJson(faqItems);

const galleryMoments = [
  {
    src: "/moments/moment-01.png",
    alt: "Copii la jocuri interactive în timpul petrecerii",
    caption: "Jocuri interactive cu toți copiii implicați",
  },
  {
    src: "/moments/moment-02.png",
    alt: "Moment de dans la aniversare copii",
    caption: "Dans și energie bună pe ringul de petrecere",
  },
  {
    src: "/moments/moment-03.png",
    alt: "Animator coordonând activități tematice pentru copii",
    caption: "Animatorul conduce activitățile tematice",
  },
  {
    src: "/moments/moment-04.png",
    alt: "Copii implicați într-o provocare de echipă",
    caption: "Provocări de echipă adaptate pe vârste",
  },
  {
    src: "/moments/moment-05.png",
    alt: "Cadru de la petrecere copii cu personaje tematice",
    caption: "Apariție de personaj și multe zâmbete",
  },
  {
    src: "/moments/moment-06.png",
    alt: "Activitate de petrecere pentru copii la interior",
    caption: "Joacă activă în spațiu interior",
  },
  {
    src: "/moments/moment-07.png",
    alt: "Copii participând la mini-show de animație",
    caption: "Mini-show cu jocuri și momente haioase",
  },
  {
    src: "/moments/moment-08.png",
    alt: "Final de petrecere cu atmosferă veselă",
    caption: "Final de petrecere cu energie sus",
  },
] as const;

const items: GalleryItem[] = galleryMoments.map((moment) => ({
  ...moment,
  width: 900,
  height: 675,
}));
const galleryLdJson = buildImageGalleryJson({
  name: "Galerie foto petreceri copii",
  path: "/galerie",
  description: "Momente reale din petreceri de copii: jocuri, dans, personaje și activități interactive.",
  images: galleryMoments,
});

export default function GaleriePage() {
  const wa = toWhatsAppLink(
    siteConfig.whatsapp,
    "Bună! Vreau o petrecere super distractivă pentru copii."
  );

  return (
    <div className="relative isolate -mt-[112px] overflow-x-hidden bg-[#fffaf0] pt-[112px] md:-mt-[142px] md:pt-[142px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLdJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLdJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLdJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryLdJson) }}
      />
      <div
        className="pointer-events-none absolute -top-56 inset-x-0 bottom-0 -z-10 [background:linear-gradient(180deg,#cdeeff_0%,#ecfbff_30%,#fff8dd_64%,#ffeec8_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-56 inset-x-0 bottom-0 -z-10 bg-noise opacity-[0.1]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-56 inset-x-0 bottom-0 -z-10 [background:radial-gradient(circle_at_8%_10%,rgba(56,189,248,0.28),rgba(56,189,248,0)_36%),radial-gradient(circle_at_90%_8%,rgba(251,191,36,0.28),rgba(251,191,36,0)_36%),radial-gradient(circle_at_22%_72%,rgba(236,72,153,0.18),rgba(236,72,153,0)_32%),radial-gradient(circle_at_80%_70%,rgba(52,211,153,0.18),rgba(52,211,153,0)_36%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-30 left-2 z-10 h-20 w-20 rotate-[-12deg] sm:left-10 sm:h-28 sm:w-28"
        aria-hidden="true"
      >
        <Image src="/stickers/sticker-star.svg" alt="" fill sizes="(min-width: 640px) 112px, 80px" className="object-contain" />
      </div>
      <div
        className="pointer-events-none absolute top-30 right-3 z-10 h-18 w-18 rotate-[10deg] sm:right-12 sm:h-24 sm:w-24"
        aria-hidden="true"
      >
        <Image src="/stickers/sticker-heart.svg" alt="" fill sizes="(min-width: 640px) 96px, 72px" className="object-contain" />
      </div>
      <div
        className="pointer-events-none absolute top-54 right-[10%] z-10 hidden h-28 w-28 rotate-[8deg] md:block"
        aria-hidden="true"
      >
        <Image src="/stickers/sticker-balloons.svg" alt="" fill sizes="112px" className="object-contain" />
      </div>

      <section className="relative overflow-hidden pb-12 pt-14 sm:pt-16">
        <Container className="relative">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="p-2 sm:p-4">
              <h1 className="cartoon-title mt-1 max-w-3xl text-balance text-4xl font-extrabold tracking-tight text-black/85 sm:text-5xl">
                Albumul nostru de super-petreceri cu joacă, râsete și magie
              </h1>
              <div className="mt-4 h-1.5 w-32 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-sky-500" />

              <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-black/70">
                Dă click pe orice poză și o vezi mare instant. Mergi stânga-dreapta cu săgețile, iar ESC închide albumul.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonAnchor
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  className="!border-emerald-700 !bg-gradient-to-b !from-emerald-400 !to-emerald-500 !text-white !shadow-[0_10px_0_rgba(0,0,0,0.12),0_18px_34px_rgba(16,185,129,0.28)]"
                  data-track="open_whatsapp"
                  data-track-label="Galerie hero: WhatsApp"
                >
                  Vreau petrecere la fel
                </ButtonAnchor>
                <ButtonLink
                  href="/personaje"
                  variant="secondary"
                  size="lg"
                  data-track="cta_click"
                  data-track-label="Galerie hero: Personaje"
                >
                  Vezi personajele
                </ButtonLink>
              </div>
            </div>

            <aside className="interactive-pop relative overflow-hidden rounded-[32px] border-[3px] border-black/10 bg-white/86 p-6 shadow-[0_16px_0_rgba(0,0,0,0.06),0_24px_44px_rgba(0,0,0,0.12)] backdrop-blur-sm">
              <div
                className="pointer-events-none absolute right-0 top-0 h-24 w-24 translate-x-6 -translate-y-6 rounded-full bg-gradient-to-br from-fuchsia-300/45 to-orange-300/35 blur-xl"
                aria-hidden="true"
              />
              <p className="text-xs font-black uppercase tracking-[0.16em] text-black/55">Ce găsești în galerie</p>
              <ul className="mt-4 space-y-3.5 text-sm font-bold text-black/75">
                <li className="flex items-start gap-2.5">
                  <span className="mt-[7px] h-2.5 w-2.5 shrink-0 rounded-full bg-orange-500 shadow-[0_0_0_4px_rgba(249,115,22,0.2)]" />
                  Super-jocuri care țin energia sus de la început până la final.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-[7px] h-2.5 w-2.5 shrink-0 rounded-full bg-pink-500 shadow-[0_0_0_4px_rgba(236,72,153,0.2)]" />
                  Dans, personaje și surprize care fac copiiii să zâmbească nonstop.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-[7px] h-2.5 w-2.5 shrink-0 rounded-full bg-sky-500 shadow-[0_0_0_4px_rgba(14,165,233,0.2)]" />
                  Momente reale de la petreceri adevărate, fără poze de stoc.
                </li>
              </ul>

            </aside>
          </div>
        </Container>
      </section>

      <section className="animate-page-enter-delay-1 cv-auto-tall relative pb-16 pt-4 sm:pb-20">
        <Container>
          <div className="interactive-pop relative overflow-hidden rounded-[40px] border-[3px] border-black/10 bg-white/88 p-4 shadow-[0_18px_0_rgba(0,0,0,0.07),0_30px_56px_rgba(0,0,0,0.14)] backdrop-blur-sm sm:p-6">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_18%_16%,rgba(56,189,248,0.2),rgba(56,189,248,0)_35%),radial-gradient(circle_at_82%_22%,rgba(236,72,153,0.2),rgba(236,72,153,0)_34%),radial-gradient(circle_at_50%_20%,rgba(251,191,36,0.24),rgba(251,191,36,0)_40%)]"
              aria-hidden="true"
            />
            <div className="relative mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-black/10 bg-white/84 px-4 py-3 shadow-[0_6px_0_rgba(0,0,0,0.06)]">
              <p className="text-sm font-black uppercase tracking-[0.14em] text-black/60">Album Foto</p>
              <p className="text-sm font-bold text-black/70">Click pe poză pentru varianta mare</p>
            </div>
            <GalleryMasonry items={items} />
          </div>
        </Container>
      </section>

      <section className="animate-page-enter-delay-2 cv-auto pb-16 sm:pb-20">
        <Container>
          <div className="interactive-pop relative overflow-hidden rounded-[34px] border-[3px] border-black/10 bg-gradient-to-r from-orange-100 via-yellow-50 to-cyan-100 px-6 py-8 text-center shadow-[0_16px_0_rgba(0,0,0,0.07),0_24px_44px_rgba(0,0,0,0.12)] sm:px-8">
            <div className="pointer-events-none absolute left-4 top-2 h-12 w-12 rotate-[-10deg] opacity-80 sm:h-16 sm:w-16">
              <Image src="/stickers/sticker-confetti.svg" alt="" fill sizes="(min-width: 640px) 64px, 48px" className="object-contain" />
            </div>
            <div className="pointer-events-none absolute bottom-2 right-4 h-12 w-12 rotate-[8deg] opacity-80 sm:h-16 sm:w-16">
              <Image src="/stickers/sticker-rainbow.svg" alt="" fill sizes="(min-width: 640px) 64px, 48px" className="object-contain" />
            </div>
            <h2 className="cartoon-title text-2xl font-extrabold text-black/85 sm:text-3xl">
              Hai să facem și petrecerea ta la fel de colorată
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-black/70 sm:text-base">
              Spune-ne pe WhatsApp data, vârsta copiilor și tema preferată. Noi venim cu planul complet de distracție.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <ButtonAnchor
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="!border-emerald-700 !bg-gradient-to-b !from-emerald-400 !to-emerald-500 !text-white !shadow-[0_10px_0_rgba(0,0,0,0.12),0_18px_34px_rgba(16,185,129,0.28)]"
                data-track="open_whatsapp"
                data-track-label="Galerie final: WhatsApp"
              >
                Discută pe WhatsApp
              </ButtonAnchor>
              <ButtonLink
                href="/contact"
                variant="secondary"
                size="lg"
                data-track="cta_click"
                data-track-label="Galerie final: Contact"
              >
                Cere ofertă
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <SeoRelatedLinksSection
        title="Planifică următorul pas"
        trackingContext="galerie_related"
        items={[
          {
            href: "/servicii",
            label: "Servicii pentru petreceri copii",
            description: "Descoperă pachetele potrivite pentru jocuri, dans și activități tematice.",
          },
          {
            href: "/personaje",
            label: "Personaje și mascote",
            description: "Alege personajul ideal în funcție de vârstă, temă și durata petrecerii.",
          },
          {
            href: "/contact",
            label: "Cere ofertă pentru data ta",
            description: "Trimite rapid detaliile evenimentului pentru disponibilitate și ofertă.",
          },
        ]}
      />

      <SeoFaqSection
        title="Întrebări frecvente despre galerie"
        trackingContext="galerie_faq"
        items={[...faqItems]}
        relatedLinks={[
          { href: "/servicii", label: "Vezi serviciile" },
          { href: "/personaje", label: "Vezi personajele" },
          { href: "/contact", label: "Rezervă acum" },
        ]}
      />
    </div>
  );
}
