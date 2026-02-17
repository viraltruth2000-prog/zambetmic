import type { Metadata } from "next";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Container } from "@/components/Container";
import { CloudDividerImage } from "@/components/CloudDividerImage";
import { SeoFaqSection } from "@/components/SeoFaqSection";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import {
  buildFaqPageJson,
  buildImageGalleryJson,
  buildSocialImageUrl,
  buildWebPageJson,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { toWhatsAppLink } from "@/lib/whatsapp";

const CharactersCarousel = dynamic(
  () => import("@/components/CharactersCarousel").then((m) => m.CharactersCarousel),
  { loading: () => <div className="h-[320px] w-full rounded-[24px] bg-white/60" /> }
);

const MomentsStrip = dynamic(
  () => import("@/components/MomentsStrip").then((m) => m.MomentsStrip),
  { loading: () => <div className="h-[220px] w-full rounded-[24px] bg-white/60" /> }
);

const QuickQuoteForm = dynamic(
  () => import("@/components/QuickQuoteForm").then((m) => m.QuickQuoteForm),
  { loading: () => <div className="h-36 w-full rounded-[18px] bg-white/70" /> }
);

const StickyBookingBar = dynamic(
  () => import("@/components/StickyBookingBar").then((m) => m.StickyBookingBar)
);

export const metadata: Metadata = {
  title: "Animatori Petreceri Copii Bucuresti si Ilfov",
  description:
    "Animatori pentru petreceri copii in Bucuresti si Ilfov: personaje, jocuri interactive si oferta rapida pe WhatsApp.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Animatori Petreceri Copii Bucuresti si Ilfov",
    description:
      "Personaje, jocuri si momente tematice pentru petreceri de copii. Verifica rapid disponibilitatea.",
    url: "/",
    images: [
      {
        url: buildSocialImageUrl({
          title: "Animatori Petreceri Copii Bucuresti si Ilfov",
          subtitle: "Personaje, jocuri interactive si oferta rapida pe WhatsApp.",
          theme: "default",
        }),
        width: 1200,
        height: 630,
        alt: "Animatori copii in Bucuresti si Ilfov",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Animatori Petreceri Copii Bucuresti si Ilfov",
    description:
      "Verifica rapid disponibilitatea pentru data ta. Animatori si personaje pentru petreceri de copii.",
    images: [
      buildSocialImageUrl({
        title: "Animatori Petreceri Copii Bucuresti si Ilfov",
        subtitle: "Verifica rapid disponibilitatea pentru data ta.",
        theme: "default",
      }),
    ],
  },
};

const services = [
  {
    title: "Animație de petrecere",
    desc: "Jocuri, dans și activități interactive care țin energia sus.",
    img: "/services/service-01.png",
    badge: "🎉",
    priceFrom: "de la 550 lei",
    duration: "60-90 min",
  },
  {
    title: "Pictură pe Față",
    desc: "Picturi vesele și sclipici pentru transformări rapide.",
    img: "/services/service-02.png",
    badge: "🎨",
    priceFrom: "de la 350 lei",
    duration: "45-60 min",
  },
  {
    title: "Mini Show & Jocuri",
    desc: "Mini show și concursuri simple, adaptate grupei de vârstă.",
    img: "/services/service-03.png",
    badge: "🎭",
    priceFrom: "de la 650 lei",
    duration: "90 min",
  },
] as const;

const featuredPackages = [
  {
    name: "Basic Fun",
    price: "de la 550 lei",
    duration: "60-90 min",
    includes: ["1 animator", "Jocuri interactive", "Recuzita de baza"],
    tone: "from-sky-100 via-white to-sky-50",
    featured: false,
  },
  {
    name: "Popular Party",
    price: "de la 890 lei",
    duration: "90-120 min",
    includes: ["2 animatori", "Jocuri + mini show", "Pictura pe fata"],
    tone: "from-amber-100 via-white to-yellow-50",
    featured: true,
  },
  {
    name: "Premium Magic",
    price: "de la 1290 lei",
    duration: "120 min",
    includes: ["2 animatori + personaj", "Show tematic", "Activitati bonus"],
    tone: "from-rose-100 via-white to-orange-50",
    featured: false,
  },
] as const;

const characters = [
  { name: "Super Erou", img: "/characters/super-hero.png", tag: "Popular" },
  { name: "Prințesă", img: "/characters/princess.png", tag: "4-7 ani" },
  { name: "Pirată", img: "/characters/pirate.png", tag: "Aventură" },
  { name: "Unicorn", img: "/characters/unicorn.png", tag: "Nou" },
  { name: "Astronaut", img: "/characters/astronaut.png", tag: "6-9 ani" },
  { name: "Clovn simpatic", img: "/characters/clown.png", tag: "Distracție" },
] as const;

const moments = [
  {
    src: "/moments/moment-01.png",
    alt: "Aniversare copii cu jocuri interactive coordonate de animator",
    caption: "Aniversare Maria, 6 ani · Sector 3",
  },
  {
    src: "/moments/moment-02.png",
    alt: "Moment de pictură pe față la petrecere de copii",
    caption: "Pictură pe față · București",
  },
  {
    src: "/moments/moment-03.png",
    alt: "Mini-spectacol pentru copii în cadrul petrecerii",
    caption: "Mini spectacol · ianuarie",
  },
  {
    src: "/moments/moment-04.png",
    alt: "Jocuri de echipă pentru copii la eveniment",
    caption: "Jocuri de echipă · Ilfov",
  },
  {
    src: "/moments/moment-05.png",
    alt: "Cadru de la petrecere copii cu program tematic",
    caption: "Petrecere Andrei, 7 ani · februarie",
  },
  {
    src: "/moments/moment-06.png",
    alt: "Distracție de weekend pentru copii cu animator",
    caption: "Distracție de weekend · Pipera",
  },
] as const;

const processSteps = [
  {
    title: "1. Spui data",
    desc: "Trimiti rapid data, locatia si varsta copiilor.",
  },
  {
    title: "2. Primesti planul",
    desc: "Iti propunem pachetul potrivit si confirmam disponibilitatea.",
  },
  {
    title: "3. Ne ocupam noi",
    desc: "Venim cu recuzita si coordonam energia petrecerii cap-coada.",
  },
] as const;

const testimonials = [
  {
    quote: "Copiii au fost super implicati de la inceput pana la final. Organizare excelenta!",
    name: "Ioana M.",
    meta: "Aniversare 6 ani - Bucuresti",
  },
  {
    quote: "Am primit raspuns foarte repede si totul a fost clar. Recomand cu incredere.",
    name: "Andrei P.",
    meta: "Petrecere la gradinita - Ilfov",
  },
  {
    quote: "Personajele au fost exact ce ne doream, iar jocurile au fost adaptate perfect grupei.",
    name: "Roxana D.",
    meta: "Petrecere tematica - Sector 4",
  },
] as const;

const faqs = [
  {
    q: "Ce include pachetul standard?",
    a: "Coordonare jocuri, activitati interactive, recuzita de baza si animator dedicat pentru durata aleasa.",
  },
  {
    q: "In ce zone va deplasati?",
    a: "Acoperim Bucuresti si Ilfov. Pentru alte zone, confirmam separat disponibilitatea si costul de transport.",
  },
  {
    q: "Cu cat timp inainte trebuie rezervat?",
    a: "Ideal cu 1-2 saptamani inainte, dar verificam si solicitarile urgente in functie de calendar.",
  },
  {
    q: "Se poate personaliza programul pe varsta?",
    a: "Da. Adaptam jocurile si ritmul activitatilor dupa varsta copiilor si spatiul evenimentului.",
  },
  {
    q: "Cum se confirma rezervarea?",
    a: "Dupa validarea detaliilor, primesti oferta finala si pasii de confirmare pe WhatsApp sau email.",
  },
] as const;

export default function Home() {
  const wa = toWhatsAppLink(
    siteConfig.whatsapp,
    "Bună! Vreau să rezerv un pachet pentru petrecerea copilului."
  );

  const businessLdJson = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}#localbusiness`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    image: `${siteConfig.url}/corect2.png`,
    areaServed: ["Bucuresti", "Ilfov"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bucuresti",
      addressRegion: "Bucuresti-Ilfov",
      addressCountry: "RO",
    },
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: "de la 350 RON",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: siteConfig.phone,
        email: siteConfig.email,
        availableLanguage: ["ro"],
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
    ],
    sameAs: Object.values(siteConfig.socials).filter(Boolean),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicii petreceri copii",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.desc,
        },
      })),
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.9,
      bestRating: 5,
      worstRating: 1,
      reviewCount: 3,
    },
    review: testimonials.map((item) => ({
      "@type": "Review",
      reviewBody: item.quote,
      reviewRating: {
        "@type": "Rating",
        ratingValue: 5,
        bestRating: 5,
      },
      author: {
        "@type": "Person",
        name: item.name,
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    })),
  } as const;

  const faqLdJson = {
    ...buildFaqPageJson(faqs),
  } as const;
  const webPageLdJson = buildWebPageJson({
    name: "Acasă",
    path: "/",
    description:
      "Animatori pentru petreceri copii în București și Ilfov: personaje, jocuri interactive și ofertă rapidă pe WhatsApp.",
  });
  const homeGalleryLdJson = buildImageGalleryJson({
    name: "Momente reale din petreceri pentru copii",
    path: "/",
    description: "Galerie de momente reale: jocuri, dans, pictură pe față și activități tematice pentru copii.",
    images: moments,
  });

  const sectionTitleClass =
    "cartoon-title text-center text-[2.1rem] font-extrabold tracking-tight text-black/85 sm:text-[2.7rem]";
  const sectionBodyClass =
    "mx-auto mt-2 max-w-2xl text-center text-sm font-semibold leading-6 text-black/70 sm:text-base";
  const cardClass =
    "hover-lift-tilt rounded-[28px] border-2 border-black/10 bg-white/90 shadow-[0_14px_32px_rgba(0,0,0,0.1)] transition-transform duration-200 hover:-translate-y-0.5";

  return (
    <div className="overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessLdJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLdJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLdJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeGalleryLdJson) }}
      />

      <section className="relative flex min-h-dvh items-center pb-17 pt-[120px] sm:pb-20 sm:pt-[120px]">
        <div className="absolute inset-0">
          <Image
            src="/6f1ee822-843d-4ae5-9b1f-788586cbbb98.png"
            alt=""
            fill
            priority
            fetchPriority="high"
            quality={75}
            className="object-cover object-top"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-sky-100/15 to-white/12" />
          <div className="absolute inset-0 bg-noise opacity-[0.04]" />
          <div className="absolute inset-x-0 top-0 h-[40%] [background:radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.60),rgba(255,255,255,0)_58%)]" />
        </div>

        <div className="pointer-events-none absolute left-4 top-20 hidden h-14 w-14 animate-float-slow sm:left-10 sm:block sm:h-20 sm:w-20">
          <Image src="/stickers/sticker-bird-01.svg" alt="" fill sizes="(min-width: 640px) 80px, 56px" className="object-contain" />
        </div>
        <div className="pointer-events-none absolute right-4 top-24 hidden h-14 w-14 animate-float-reverse sm:right-10 sm:block sm:h-20 sm:w-20">
          <Image src="/stickers/sticker-bird-01.svg" alt="" fill sizes="(min-width: 640px) 80px, 56px" className="object-contain" />
        </div>
        <div className="pointer-events-none absolute left-1/2 top-16 hidden h-16 w-24 -translate-x-1/2 md:block">
          <Image src="/stickers/sticker-cloud.svg" alt="" fill sizes="96px" className="object-contain" />
        </div>
        <div className="pointer-events-none absolute left-0 bottom-8 hidden h-44 w-44 opacity-50 sm:block md:h-56 md:w-56">
          <Image src="/stickers/sticker-castle.svg" alt="" fill sizes="(min-width: 768px) 224px, 176px" className="object-contain" />
        </div>
        <div className="pointer-events-none absolute bottom-8 right-0 hidden h-44 w-44 -scale-x-100 opacity-50 sm:block md:h-56 md:w-56">
          <Image src="/stickers/sticker-castle.svg" alt="" fill sizes="(min-width: 768px) 224px, 176px" className="object-contain" />
        </div>

        <Container className="relative">
          <div className="animate-storybook-pop animate-gentle-bob mx-auto max-w-[48rem] rounded-[40px] border-2 border-black/10 bg-white/78 px-6 py-9 text-center shadow-[0_24px_60px_rgba(0,0,0,0.16)] backdrop-blur sm:px-10">
            <h1 className="cartoon-title mt-4 text-[2.35rem] font-extrabold tracking-tight text-black/90 sm:text-[4.2rem]">
              Dă Viață Magiei!
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold leading-6 text-black/70 sm:text-base">
              Animatori și personaje pentru petreceri de copii în București și Ilfov.
              Primești rapid o propunere clară, adaptată vârstei și numărului de invitați.
            </p>
            <p className="mx-auto mt-3 inline-flex max-w-max items-center rounded-full border border-black/10 bg-rose-100 px-4 py-1 text-xs font-black uppercase tracking-wide text-rose-700">
              Weekend-urile se ocupă rapid
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink
                href="/servicii"
                size="lg"
                className="w-full justify-center sm:w-auto"
                data-track="cta_click"
                data-track-label="Hero: Services"
              >
                Vezi pachetele
              </ButtonLink>
              <ButtonLink
                href="/personaje"
                variant="secondary"
                size="lg"
                className="w-full justify-center sm:w-auto"
                data-track="cta_click"
                data-track-label="Hero: Characters"
              >
                Alege personajele
              </ButtonLink>
              <ButtonAnchor
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                className="w-full justify-center sm:w-auto !border-emerald-700 !bg-gradient-to-b !from-emerald-400 !to-emerald-500 !text-white !shadow-[0_10px_0_rgba(0,0,0,0.12),0_18px_34px_rgba(16,185,129,0.28)]"
                data-track="open_whatsapp"
                data-track-label="Hero: WhatsApp"
              >
                Cere ofertă pe WhatsApp
              </ButtonAnchor>
            </div>

            <div className="mt-5 grid gap-2 text-xs font-black text-black/70 sm:grid-cols-3 sm:text-sm">
              <p className="rounded-full bg-white/85 px-4 py-2 ring-1 ring-black/10">
                +350 petreceri organizate
              </p>
              <p className="rounded-full bg-white/85 px-4 py-2 ring-1 ring-black/10">
                Răspuns în max. 10 minute
              </p>
              <p className="rounded-full bg-white/85 px-4 py-2 ring-1 ring-black/10">
                București & Ilfov
              </p>
            </div>
          </div>
        </Container>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 translate-y-[42%]">
          <CloudDividerImage className="h-24 w-full sm:h-[6.5rem]" />
        </div>
      </section>

      <section className="animate-reveal-up cv-auto relative z-20 bg-[#fff9eb] pb-16 pt-10">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 -translate-y-[54%]">
          <CloudDividerImage className="h-24 w-full sm:h-[6.5rem]" />
        </div>
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/612040f4-3b7a-4825-b460-fc0bae38e3a0.png"
            alt=""
            fill
            quality={75}
            className="object-cover object-[center_68%] opacity-75"
            sizes="100vw"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_10%_8%,rgba(255,255,255,0.46),rgba(255,255,255,0)_40%),radial-gradient(circle_at_90%_15%,rgba(255,255,255,0.36),rgba(255,255,255,0)_40%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_15%_20%,rgba(250,204,21,0.38)_1px,transparent_2px),radial-gradient(circle_at_70%_30%,rgba(56,189,248,0.36)_1px,transparent_2px),radial-gradient(circle_at_40%_75%,rgba(249,115,22,0.30)_1px,transparent_2px)] [background-size:90px_90px]" />
        <div className="pointer-events-none absolute left-3 top-8 hidden h-20 w-20 rotate-[-10deg] md:block">
          <Image src="/stickers/sticker-confetti.svg" alt="" fill sizes="80px" className="object-contain opacity-80" />
        </div>
        <div className="pointer-events-none absolute bottom-6 right-3 hidden h-20 w-20 rotate-[8deg] md:block">
          <Image src="/stickers/sticker-flower.svg" alt="" fill sizes="80px" className="object-contain opacity-80" />
        </div>
        <Container className="relative">
          <h2 className={sectionTitleClass}>
            Serviciile Noastre
          </h2>
          <p className={sectionBodyClass}>
            Pachete clare, cu preț orientativ și durată, adaptate vârstei și spațiului.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className={`${cardClass} animate-storybook-fade flex h-full flex-col overflow-hidden p-4`}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] border-[3px] border-black/10">
                  <span className="absolute left-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-black/10 bg-yellow-300 text-lg shadow-[0_6px_0_rgba(0,0,0,0.1)]">
                    {service.badge}
                  </span>
                  <Image
                    src={service.img}
                    alt={service.title}
                    fill
                    quality={75}
                    className="object-cover transition-transform duration-300 hover:scale-[1.03]"
                    sizes="(min-width: 1280px) 360px, (min-width: 768px) 30vw, 92vw"
                  />
                </div>
                <h3 className="mt-4 text-[1.35rem] font-extrabold leading-tight tracking-tight text-black/85">
                  {service.title}
                </h3>
                <p className="line-clamp-2 mt-2 min-h-[44px] text-sm font-semibold leading-5 text-black/70">
                  {service.desc}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-black text-black/70">
                  <span className="rounded-full bg-amber-100 px-3 py-1 ring-1 ring-black/10">
                    {service.priceFrom}
                  </span>
                  <span className="rounded-full bg-sky-100 px-3 py-1 ring-1 ring-black/10">
                    {service.duration}
                  </span>
                </div>
                <div className="mt-auto pt-4">
                  <ButtonLink
                    href="/servicii"
                    variant="secondary"
                    className="w-full justify-center"
                    data-track="cta_click"
                    data-track-label={`Services card: ${service.title}`}
                  >
                    Cere oferta pentru acest pachet
                  </ButtonLink>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-7 rounded-[28px] border-2 border-black/10 bg-white/80 px-5 py-4 text-center text-sm font-semibold text-black/70 shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
            Prețul final se stabilește în funcție de locație, durată și numărul copiilor.
          </div>

          <div className="mt-7 flex justify-center">
            <ButtonLink href="/servicii" size="lg" data-track="cta_click" data-track-label="Services: Vezi toate serviciile">
              Vezi toate serviciile
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="animate-reveal-up cv-auto relative bg-[#fffef6] py-13">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-noise" />
        <Container className="relative">
          <h2 className={sectionTitleClass}>Cum Funcționează Rezervarea</h2>
          <p className={sectionBodyClass}>
            3 pași simpli, de la mesajul tău până la petrecerea gata organizată.
          </p>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {processSteps.map((step) => (
              <article key={step.title} className={`${cardClass} p-5`}>
                <h3 className="text-xl font-extrabold tracking-tight text-black/85">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm font-semibold leading-6 text-black/70">
                  {step.desc}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="animate-reveal-up cv-auto relative bg-gradient-to-b from-white via-[#fffdf6] to-[#fff9ee] py-14">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-noise" />
        <Container className="relative">
          <h2 className={sectionTitleClass}>Pachete Recomandate</h2>
          <p className={sectionBodyClass}>
            3 opțiuni clare, ușor de comparat, în funcție de buget și energia petrecerii.
          </p>

          <div className="mt-7 grid gap-5 lg:grid-cols-3">
            {featuredPackages.map((pkg) => (
              <article
                key={pkg.name}
                className={`${cardClass} overflow-hidden bg-gradient-to-b ${pkg.tone} p-5 ${pkg.featured ? "lg:-translate-y-1 lg:shadow-[0_20px_44px_rgba(0,0,0,0.16)]" : ""}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-[1.45rem] font-extrabold tracking-tight text-black/85">
                    {pkg.name}
                  </h3>
                  {pkg.featured ? (
                    <span className="rounded-full border border-black/10 bg-yellow-300 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-black/75">
                      Cel mai ales
                    </span>
                  ) : null}
                </div>

                <p className="mt-2 text-lg font-black text-black/80">{pkg.price}</p>
                <p className="text-xs font-black uppercase tracking-wide text-black/60">
                  Durată: {pkg.duration}
                </p>

                <ul className="mt-4 space-y-2 text-sm font-semibold text-black/75">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5">
                  <ButtonLink
                    href="/contact"
                    className="w-full justify-center"
                    data-track="cta_click"
                    data-track-label={`Package: ${pkg.name}`}
                  >
                    Vreau acest pachet
                  </ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="animate-reveal-up cv-auto-tall relative bg-gradient-to-b from-yellow-400 via-yellow-300 to-yellow-200 py-14">
        <div className="pointer-events-none absolute inset-x-0 top-0 -translate-y-[96%]">
          <CloudDividerImage className="h-22 w-full" />
        </div>
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_12%_22%,rgba(255,255,255,0.30),rgba(255,255,255,0)_40%),radial-gradient(circle_at_85%_18%,rgba(255,255,255,0.28),rgba(255,255,255,0)_36%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.09] [background-image:radial-gradient(circle_at_18%_24%,rgba(255,255,255,0.45)_2px,transparent_3px),radial-gradient(circle_at_72%_36%,rgba(255,255,255,0.35)_2px,transparent_3px),radial-gradient(circle_at_42%_72%,rgba(249,115,22,0.25)_2px,transparent_3px)] [background-size:120px_120px]" />
        <div className="pointer-events-none absolute left-6 top-9 hidden h-14 w-14 md:block">
          <Image src="/stickers/sticker-star.svg" alt="" fill sizes="56px" className="object-contain opacity-80" />
        </div>
        <div className="pointer-events-none absolute right-8 top-10 hidden h-16 w-16 md:block">
          <Image src="/stickers/sticker-crown.svg" alt="" fill sizes="64px" className="object-contain opacity-75" />
        </div>
        <Container className="relative">
          <h2 className={sectionTitleClass}>
            Personajele Noastre
          </h2>
          <p className={sectionBodyClass}>
            Alege personajul preferat și adaptăm jocurile pe temă.
          </p>

          <div className="mt-7 rounded-[28px] border-2 border-black/10 bg-yellow-200/55 p-2 shadow-[0_10px_22px_rgba(0,0,0,0.1)]">
            <CharactersCarousel
              items={[...characters]}
              tone="light"
            />
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/personaje" size="lg" className="justify-center" data-track="cta_click" data-track-label="Characters section">
              Vezi toate personajele
            </ButtonLink>
          </div>
        </Container>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-[96%]">
          <CloudDividerImage className="h-22 w-full" />
        </div>
      </section>

      <section className="animate-reveal-up cv-auto-tall relative bg-[#fff9ee] py-14">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_8%_12%,rgba(251,191,36,0.16),rgba(251,191,36,0)_40%),radial-gradient(circle_at_90%_14%,rgba(56,189,248,0.14),rgba(56,189,248,0)_38%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-noise" />
        <div className="pointer-events-none absolute left-4 top-8 hidden h-14 w-14 md:block">
          <Image src="/stickers/sticker-heart.svg" alt="" fill sizes="56px" className="object-contain opacity-70" />
        </div>
        <div className="pointer-events-none absolute right-4 top-8 hidden h-16 w-16 md:block">
          <Image src="/stickers/sticker-wand.svg" alt="" fill sizes="64px" className="object-contain opacity-70" />
        </div>
        <Container className="relative">
          <h2 className={sectionTitleClass}>
            Momente Memorabile
          </h2>
          <p className={sectionBodyClass}>
            Cele mai frumoase cadre din petrecerile noastre recente.
          </p>
          <div className="mt-7 rounded-[30px] border-[3px] border-black/10 bg-white/90 p-4 shadow-[0_14px_0_rgba(0,0,0,0.08),0_20px_60px_rgba(0,0,0,0.12)]">
            <div className="mb-3 flex items-center justify-between rounded-full border border-black/10 bg-yellow-100/80 px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>
              <p className="text-xs font-black uppercase tracking-wide text-black/65">
                Album de petrecere
              </p>
            </div>
            <MomentsStrip
              showDots
              autoPlayMs={3500}
              items={[...moments]}
            />
          </div>
          <div className="mt-7 flex justify-center">
            <ButtonLink href="/galerie" variant="outline" size="lg" data-track="cta_click" data-track-label="Moments: Galerie">
              Vezi galeria completă
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="animate-reveal-up cv-auto relative bg-gradient-to-b from-rose-100/60 via-white to-[#fff9ee] py-14">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-noise" />
        <Container className="relative">
          <h2 className={sectionTitleClass}>Părinții Ne Recomandă</h2>
          <p className={sectionBodyClass}>
            4.9/5 din feedback-uri reale, după sute de petreceri organizate.
          </p>
          <div className="mt-3 text-center text-xl tracking-wide text-amber-500">
            ★★★★★
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.name} className={`${cardClass} p-5`}>
                <p className="text-sm font-semibold leading-6 text-black/75">
                  &quot;{item.quote}&quot;
                </p>
                <p className="mt-4 text-sm font-extrabold text-black/85">{item.name}</p>
                <p className="text-xs font-semibold text-black/60">{item.meta}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="animate-reveal-up relative bg-[#fffdf7] py-14">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-noise" />
        <SeoFaqSection
          title="Întrebări frecvente"
          trackingContext="home_faq"
          items={[...faqs]}
          relatedLinks={[
            { href: "/servicii", label: "Vezi serviciile" },
            { href: "/personaje", label: "Alege personajele" },
            { href: "/galerie", label: "Galerie evenimente" },
            { href: "/contact", label: "Cere ofertă" },
          ]}
        />
      </section>

      <section className="animate-reveal-up cv-auto relative bg-gradient-to-b from-sky-200 to-sky-300 py-12">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_50%_8%,rgba(255,255,255,0.68),rgba(255,255,255,0)_44%)]" />
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.025]" />
        <div className="pointer-events-none absolute left-2 top-5 hidden h-24 w-24 md:block">
          <Image src="/stickers/sticker-confetti.svg" alt="" fill sizes="96px" className="object-contain" />
        </div>
        <div className="pointer-events-none absolute bottom-4 right-3 hidden h-24 w-24 md:block">
          <Image src="/stickers/sticker-star.svg" alt="" fill sizes="96px" className="object-contain" />
        </div>
        <Container className="relative">
          <div className="sb-panel mx-auto max-w-4xl border-[3px] border-black/10 bg-white/84 px-6 py-8 text-center">
            <h2 className="cartoon-title text-3xl font-extrabold tracking-tight text-black/85 sm:text-4xl">
              Primește Oferta Pentru Data Ta în Câteva Minute
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-6 text-black/70 sm:text-base">
              Completezi 4 câmpuri, iar noi îți trimitem rapid opțiuni potrivite pentru eveniment.
            </p>
            <QuickQuoteForm />
            <div className="mt-4">
              <ButtonAnchor
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                className="w-full justify-center sm:w-auto"
                data-track="open_whatsapp"
                data-track-label="Final CTA: WhatsApp direct"
              >
                Sau scrie-ne direct pe WhatsApp
              </ButtonAnchor>
            </div>
          </div>
        </Container>
      </section>
      <StickyBookingBar href={wa} />
    </div>
  );
}
