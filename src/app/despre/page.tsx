import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { SeoFaqSection } from "@/components/SeoFaqSection";
import { SeoRelatedLinksSection } from "@/components/SeoRelatedLinksSection";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";
import { toWhatsAppLink } from "@/lib/whatsapp";
import {
  buildBreadcrumbJson,
  buildFaqPageJson,
  buildPageMetadata,
  buildWebPageJson,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Despre",
  description: "Despre echipa noastră, stilul de lucru și felul în care animăm petrecerile copiilor.",
  path: "/despre",
});

const breadcrumbLdJson = buildBreadcrumbJson("Despre", "/despre");
const webPageLdJson = buildWebPageJson({
  name: "Despre",
  path: "/despre",
  description: "Despre echipa noastră, stilul de lucru și felul în care animăm petrecerile copiilor.",
});
const faqItems = [
  {
    q: "În ce zonă organizați petreceri pentru copii?",
    a: "Organizăm petreceri în București și Ilfov, iar pentru alte zone discutăm separat disponibilitatea.",
  },
  {
    q: "Cum adaptați programul pentru grupe diferite de vârstă?",
    a: "Ajustăm jocurile, ritmul și tipul de activități în funcție de vârsta copiilor și de spațiul evenimentului.",
  },
  {
    q: "Care este timpul de răspuns după trimiterea cererii?",
    a: "Revenim cât mai rapid, de regulă în aceeași zi lucrătoare, cu recomandări și pașii de rezervare.",
  },
] as const;
const faqLdJson = buildFaqPageJson(faqItems);

export default function DesprePage() {
  const wa = toWhatsAppLink(
    siteConfig.whatsapp,
    "Bună! Vreau o recomandare rapidă pentru petrecerea copilului."
  );

  const promises = [
    "Program adaptat pe vârstă și număr de copii",
    "Jocuri care includ toți copiii, fără excluderi",
    "Ritm bun: fără timpi morți și fără haos",
    "Comunicare clară, punctualitate și plan simplu",
  ] as const;

  const steps = [
    {
      title: "Ascultăm ce îți dorești",
      text: "Ne spui tema, vârsta copiilor și spațiul. Noi recomandăm formatul potrivit.",
    },
    {
      title: "Construim programul",
      text: "Alegem jocurile, momentele și personajele astfel încât energia să rămână sus.",
    },
    {
      title: "Animăm cap-coadă",
      text: "Venim pregătiți și ținem petrecerea fluidă, veselă și bine organizată.",
    },
  ] as const;

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
      <div
        className="pointer-events-none absolute -top-56 inset-x-0 bottom-0 -z-10 [background:linear-gradient(180deg,#d6f1ff_0%,#f6fcff_32%,#fff8e9_64%,#fff0d3_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-56 inset-x-0 bottom-0 -z-10 bg-noise opacity-[0.09]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-56 inset-x-0 bottom-0 -z-10 [background:radial-gradient(circle_at_10%_12%,rgba(56,189,248,0.22),rgba(56,189,248,0)_34%),radial-gradient(circle_at_88%_10%,rgba(251,191,36,0.26),rgba(251,191,36,0)_36%),radial-gradient(circle_at_16%_72%,rgba(236,72,153,0.16),rgba(236,72,153,0)_30%),radial-gradient(circle_at_84%_72%,rgba(45,212,191,0.15),rgba(45,212,191,0)_34%)]"
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute left-3 top-20 z-10 hidden h-20 w-20 rotate-[-10deg] sm:block">
        <Image src="/stickers/sticker-star.svg" alt="" fill sizes="80px" className="object-contain" />
      </div>
      <div className="pointer-events-none absolute right-4 top-26 z-10 hidden h-18 w-18 rotate-[10deg] sm:block">
        <Image src="/stickers/sticker-heart.svg" alt="" fill sizes="72px" className="object-contain" />
      </div>

      <section className="relative overflow-hidden pb-12 pt-14 sm:pt-16">
        <Container className="relative">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="rounded-[34px] border-[3px] border-black/10 bg-white/82 p-6 shadow-[0_16px_0_rgba(0,0,0,0.06),0_24px_44px_rgba(0,0,0,0.12)] backdrop-blur-sm sm:p-8">
              <h1 className="cartoon-title text-balance text-4xl font-extrabold tracking-tight text-black/85 sm:text-5xl">
                Echipă veselă, plan clar și petreceri care chiar ies bine
              </h1>
              <div className="mt-4 h-1.5 w-28 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-sky-500" />
              <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-black/70">
                Ne ocupăm de ritm, implicare și organizare, astfel încât fiecare copil să se simtă inclus și să se distreze.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href="/contact" size="lg">
                  Rezervă acum
                </ButtonLink>
                <ButtonAnchor
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="lg"
                  className="!border-emerald-700 !bg-gradient-to-b !from-emerald-400 !to-emerald-500 !text-white !shadow-[0_10px_0_rgba(0,0,0,0.12),0_18px_34px_rgba(16,185,129,0.28)]"
                >
                  WhatsApp rapid
                </ButtonAnchor>
              </div>
            </div>

            <aside className="interactive-pop rounded-[30px] border-[3px] border-black/10 bg-white/86 p-6 shadow-[0_14px_0_rgba(0,0,0,0.06),0_22px_38px_rgba(0,0,0,0.11)] backdrop-blur-sm">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-black/55">Ce ne definește</p>
              <ul className="mt-4 space-y-3 text-sm font-bold text-black/75">
                <li className="flex items-start gap-2.5">
                  <span className="mt-[7px] h-2.5 w-2.5 shrink-0 rounded-full bg-orange-500 shadow-[0_0_0_4px_rgba(249,115,22,0.2)]" />
                  Energie bună, dar controlată.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-[7px] h-2.5 w-2.5 shrink-0 rounded-full bg-pink-500 shadow-[0_0_0_4px_rgba(236,72,153,0.2)]" />
                  Activități potrivite vârstei.
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="mt-[7px] h-2.5 w-2.5 shrink-0 rounded-full bg-sky-500 shadow-[0_0_0_4px_rgba(14,165,233,0.2)]" />
                  Comunicare simplă cu părinții.
                </li>
              </ul>
            </aside>
          </div>
        </Container>
      </section>

      <section className="animate-page-enter-delay-1 cv-auto-tall pb-16 pt-4 sm:pb-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="interactive-pop rounded-[30px] border-[3px] border-black/10 bg-white/88 p-6 shadow-[0_14px_0_rgba(0,0,0,0.06),0_24px_42px_rgba(0,0,0,0.11)] sm:p-8">
              <h2 className="cartoon-title text-2xl font-extrabold tracking-tight text-black/85">Ce promitem</h2>
              <ul className="mt-6 space-y-3 text-sm font-semibold text-black/75 sm:text-base">
                {promises.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="mt-[9px] h-2 w-2 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.18)]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 rounded-2xl border-2 border-black/10 bg-gradient-to-r from-emerald-100 to-sky-100 p-4 text-sm font-bold text-black/70">
                Obiectivul nostru: copii implicați, părinți relaxați.
              </div>
            </article>

            <article className="interactive-pop rounded-[30px] border-[3px] border-black/10 bg-white/86 p-6 shadow-[0_14px_0_rgba(0,0,0,0.06),0_24px_42px_rgba(0,0,0,0.11)] sm:p-8">
              <h2 className="cartoon-title text-2xl font-extrabold tracking-tight text-black/85">Cum lucrăm</h2>
              <p className="mt-3 text-sm leading-7 text-black/70 sm:text-base">
                Fără complicații: stabilim rapid detaliile importante și venim cu un plan care funcționează în spațiul tău.
              </p>

              <ol className="mt-6 space-y-3">
                {steps.map((s, i) => (
                  <li
                    key={s.title}
                    className="rounded-2xl border-2 border-black/10 bg-white/84 px-4 py-3 shadow-[0_5px_0_rgba(0,0,0,0.06)]"
                  >
                    <p className="text-xs font-black uppercase tracking-wide text-black/55">Pasul {i + 1}</p>
                    <p className="mt-1 text-sm font-black text-black/80">{s.title}</p>
                    <p className="mt-1 text-sm text-black/70">{s.text}</p>
                  </li>
                ))}
              </ol>
            </article>
          </div>
        </Container>
      </section>

      <section className="animate-page-enter-delay-2 cv-auto pb-16 sm:pb-20">
        <Container>
          <div className="interactive-pop rounded-[32px] border-[3px] border-black/10 bg-gradient-to-r from-orange-100 via-yellow-50 to-cyan-100 px-6 py-8 text-center shadow-[0_15px_0_rgba(0,0,0,0.06),0_24px_42px_rgba(0,0,0,0.11)] sm:px-8">
            <h2 className="cartoon-title text-2xl font-extrabold text-black/85 sm:text-3xl">
              Hai să facem o petrecere memorabilă
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-black/70 sm:text-base">
              Trimite-ne data și locația, iar noi revenim rapid cu cea mai bună formulă pentru grupul tău.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <ButtonLink href="/contact" size="lg">
                Rezervă acum
              </ButtonLink>
              <ButtonAnchor
                href={`mailto:${siteConfig.email}`}
                variant="secondary"
                size="lg"
              >
                Trimite email
              </ButtonAnchor>
            </div>
          </div>
        </Container>
      </section>

      <SeoRelatedLinksSection
        title="Vezi și"
        trackingContext="despre_related"
        items={[
          {
            href: "/servicii",
            label: "Ce servicii oferim",
            description: "Pachete flexibile de animație, jocuri și activități pentru copii.",
          },
          {
            href: "/galerie",
            label: "Momente din evenimente",
            description: "Imagini reale din petreceri organizate de echipa noastră.",
          },
          {
            href: "/contact",
            label: "Discută direct cu noi",
            description: "Spune-ne data și locația, iar noi revenim cu propunerea potrivită.",
          },
        ]}
      />

      <SeoFaqSection
        title="Întrebări frecvente despre echipa noastră"
        trackingContext="despre_faq"
        items={[...faqItems]}
        relatedLinks={[
          { href: "/servicii", label: "Ce servicii oferim" },
          { href: "/galerie", label: "Vezi evenimente reale" },
          { href: "/contact", label: "Discută cu noi" },
        ]}
      />
    </div>
  );
}
