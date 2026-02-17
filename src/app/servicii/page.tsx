import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SeoFaqSection } from "@/components/SeoFaqSection";
import { SeoRelatedLinksSection } from "@/components/SeoRelatedLinksSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";
import { toWhatsAppLink } from "@/lib/whatsapp";
import {
  buildBreadcrumbJson,
  buildFaqPageJson,
  buildPageMetadata,
  buildWebPageJson,
} from "@/lib/seo";
import {
  IconBalloon,
  IconGift,
  IconMusic,
  IconPaint,
  IconPartyHat,
  IconSparkles,
} from "@/components/Icons";

export const metadata: Metadata = buildPageMetadata({
  title: "Servicii",
  description:
    "Animatori copii, jocuri, dans, face painting, baloane modelabile și personaje pentru petreceri.",
  path: "/servicii",
});

const breadcrumbLdJson = buildBreadcrumbJson("Servicii", "/servicii");
const webPageLdJson = buildWebPageJson({
  name: "Servicii",
  path: "/servicii",
  description:
    "Animatori copii, jocuri, dans, face painting, baloane modelabile și personaje pentru petreceri.",
});
const faqItems = [
  {
    q: "Ce include un pachet standard de servicii?",
    a: "Programul include animator(i), jocuri coordonate, recuzită de bază și adaptare pe vârsta copiilor.",
  },
  {
    q: "Se poate combina animația cu face painting și baloane?",
    a: "Da, pachetele sunt flexibile și pot include opționale precum pictură pe față, baloane modelabile sau mini-show.",
  },
  {
    q: "Cum primesc o ofertă personalizată?",
    a: "Ne trimiți data, locația și numărul de copii pe pagina de contact sau pe WhatsApp, iar noi revenim rapid cu opțiuni.",
  },
  {
    q: "Organizați petreceri și în grădinițe sau școli?",
    a: "Da, organizăm activități și pentru grădinițe/școli, cu program adaptat pe grupe de vârstă și reguli de siguranță.",
  },
  {
    q: "Care este durata recomandată pentru o petrecere de copii?",
    a: "Pentru majoritatea grupelor, 60-90 de minute funcționează foarte bine; pentru grupuri mai mari recomandăm 90-120 de minute.",
  },
] as const;
const faqLdJson = buildFaqPageJson(faqItems);

const serviceCards = [
  {
    icon: IconPartyHat,
    title: "Animatori (jocuri & concursuri)",
    price: "de la 550 lei",
    duration: "60-90 min",
    accent: "from-orange-300/40 via-amber-300/25 to-pink-300/35",
    points: [
      "Jocuri interactive și de echipă",
      "Concursuri cu premii mici",
      "Coordonare + energie constantă",
    ],
  },
  {
    icon: IconMusic,
    title: "Dans & mini-show",
    price: "de la 650 lei",
    duration: "90 min",
    accent: "from-pink-300/35 via-sky-300/20 to-violet-300/30",
    points: [
      "Momente de dans ușor",
      "Coregrafii pe hit-uri pentru copii",
      "Pauze scurte, ritm bun",
    ],
  },
  {
    icon: IconSparkles,
    title: "Personaje & mascote",
    price: "de la 790 lei",
    duration: "60-90 min",
    accent: "from-sky-300/35 via-indigo-300/20 to-pink-300/35",
    points: [
      "Apariții surpriză",
      "Poze și interacțiune",
      "Mini-scene tematice",
    ],
  },
  {
    icon: IconPaint,
    title: "Face painting",
    price: "de la 350 lei",
    duration: "45-60 min",
    accent: "from-rose-300/35 via-orange-300/20 to-yellow-300/30",
    points: [
      "Modele rapide (5-8 min)",
      "Produse potrivite pentru copii",
      "Șervețele/curățare la îndemână",
    ],
  },
  {
    icon: IconBalloon,
    title: "Baloane modelabile",
    price: "de la 300 lei",
    duration: "30-45 min",
    accent: "from-cyan-300/35 via-emerald-300/20 to-lime-300/30",
    points: [
      "Săbii, flori, animăluțe",
      "Cadouri rapide pentru fiecare",
      "Siguranță și ordine",
    ],
  },
  {
    icon: IconGift,
    title: "Piniata & ateliere",
    price: "de la 450 lei",
    duration: "45-60 min",
    accent: "from-fuchsia-300/30 via-violet-300/20 to-sky-300/35",
    points: [
      "Piniata (moment de vârf)",
      "Atelier mic (slime / brățări) la cerere",
      "Adaptare la spațiu",
    ],
  },
] as const;
const serviceListLdJson = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Pachete servicii petreceri copii",
  itemListElement: serviceCards.map((card, index) => {
    const numericPrice = Number(card.price.replace(/[^\d]/g, ""));
    return {
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: card.title,
        description: card.points.join(". "),
        areaServed: siteConfig.city,
        provider: {
          "@type": "LocalBusiness",
          name: siteConfig.name,
          telephone: siteConfig.phone,
          email: siteConfig.email,
          url: siteConfig.url,
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "RON",
          availability: "https://schema.org/InStock",
          url: `${siteConfig.url}/contact`,
          ...(Number.isFinite(numericPrice) && numericPrice > 0 ? { price: numericPrice } : {}),
          eligibleDuration: {
            "@type": "QuantitativeValue",
            name: card.duration,
          },
        },
      },
    };
  }),
} as const;

const valuePoints = [
  "Coordonare cap-coadă, fără pauze moarte",
  "Adaptare după vârstă, spațiu și energie",
  "Confirmare rapidă pe WhatsApp",
  "Echipă punctuală + recuzită inclusă",
] as const;

export default function ServiciiPage() {
  const wa = toWhatsAppLink(
    siteConfig.whatsapp,
    "Bună! Vreau să verific un pachet pentru petrecerea copilului."
  );

  return (
    <div className="overflow-x-hidden">
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceListLdJson) }}
      />
      <section className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#d8f2ff_0%,#f8fcff_42%,#fff9ec_100%)] pb-16 pt-14 sm:pb-20 sm:pt-16">
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.08]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-[440px] w-[920px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.84),rgba(255,255,255,0)_70%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_8%_8%,rgba(56,189,248,0.22),rgba(56,189,248,0)_34%),radial-gradient(circle_at_90%_12%,rgba(251,191,36,0.28),rgba(251,191,36,0)_35%),radial-gradient(circle_at_18%_88%,rgba(236,72,153,0.2),rgba(236,72,153,0)_32%)]"
          aria-hidden="true"
        />

        <div className="relative w-full px-4 sm:px-8 lg:px-10">
          <div className="overflow-hidden rounded-[36px] bg-white/60 shadow-[0_18px_36px_rgba(0,0,0,0.1)] backdrop-blur-sm">
            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.2fr,0.8fr] lg:items-end lg:p-10">
              <div>
                <SectionHeading
                  as="h1"
                  eyebrow="Servicii"
                  title="Pachete construite pentru energie, râsete și control"
                  description="Selectezi tipul de activitate, noi facem mixul potrivit de joc, ritm și implicare, astfel încât petrecerea să rămână fluidă de la început până la final."
                />

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <ButtonLink href="/contact" size="lg" data-track="cta_click" data-track-label="Servicii hero: Contact">
                    Cere ofertă animatori copii
                  </ButtonLink>
                  <ButtonAnchor
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outline"
                    size="lg"
                    className="!border-emerald-700 !bg-gradient-to-b !from-emerald-400 !to-emerald-500 !text-white !shadow-[0_10px_0_rgba(0,0,0,0.12),0_18px_34px_rgba(16,185,129,0.28)]"
                    data-track="open_whatsapp"
                    data-track-label="Servicii hero: WhatsApp"
                  >
                    WhatsApp rapid
                  </ButtonAnchor>
                  <ButtonLink href="/personaje" variant="secondary" size="lg" data-track="cta_click" data-track-label="Servicii hero: Personaje">
                    Vezi personaje
                  </ButtonLink>
                </div>
              </div>

              <aside>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-black/55">Ce primești</p>
                <ul className="mt-4 space-y-3 text-sm font-semibold text-black/75 sm:text-base">
                  {valuePoints.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_0_0_4px_rgba(16,185,129,0.18)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
            <div className="bg-white/45 px-6 py-4 text-sm font-semibold text-black/65 sm:px-8 lg:px-10">
              Pachetele sunt flexibile: ajustăm timpul și activitățile în funcție de numărul copiilor.
            </div>
          </div>
        </div>
      </section>

      <section className="animate-page-enter-delay-1 cv-auto-tall relative -mt-6 pb-18 sm:pb-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#fff9ec] to-transparent" aria-hidden="true" />
        <Container className="relative">
          <div className="grid gap-6 lg:grid-cols-3">
            {serviceCards.map((card) => (
              <article
                key={card.title}
                className="interactive-pop group relative overflow-hidden rounded-[30px] border-2 border-black/10 bg-white p-6 shadow-[0_14px_32px_rgba(0,0,0,0.1)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.14)]"
              >
                <div className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-r ${card.accent}`} />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 ring-2 ring-black/10 shadow-[0_8px_0_rgba(0,0,0,0.08)]">
                      <card.icon className="h-6 w-6 text-black/70" />
                    </span>
                    <h3 className="cartoon-title text-lg font-extrabold tracking-tight text-black/85">{card.title}</h3>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-black text-black/70">
                    <span className="rounded-full bg-amber-100 px-3 py-1 ring-1 ring-black/10">{card.price}</span>
                    <span className="rounded-full bg-sky-100 px-3 py-1 ring-1 ring-black/10">{card.duration}</span>
                  </div>

                  <ul className="mt-5 space-y-3 text-sm text-black/75">
                    {card.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-black/60" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <ButtonLink
                      href="/contact"
                      variant="secondary"
                      className="w-full justify-center"
                      data-track="cta_click"
                      data-track-label={`Servicii card: ${card.title}`}
                    >
                      Cere ofertă pentru pachet
                    </ButtonLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="animate-page-enter-delay-2 cv-auto relative border-y border-black/5 bg-[linear-gradient(180deg,#fffdf6_0%,#fff5dc_100%)] py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_20%_15%,rgba(251,191,36,0.22),rgba(251,191,36,0)_38%),radial-gradient(circle_at_82%_88%,rgba(56,189,248,0.18),rgba(56,189,248,0)_36%)]" />
        <Container className="relative">
          <SectionHeading
            eyebrow="Proces"
            title="Cum lucrăm, clar și rapid"
            description="Un flux simplu în 4 pași, ca să știi exact ce urmează după primul mesaj."
          />

          <ol className="mt-9 grid gap-5 lg:grid-cols-4">
            {[
              {
                title: "Detalii",
                text: "Ne trimiți data, locația, vârsta și numărul de copii.",
              },
              {
                title: "Confirmare",
                text: "Confirmăm disponibilitatea și îți propunem pachetul optim.",
              },
              {
                title: "Plan",
                text: "Stabilim tema, jocurile și ordinea momentelor.",
              },
              {
                title: "Petrecere",
                text: "Venim la timp și menținem energia sus până la final.",
              },
            ].map((step, idx) => (
              <li
                key={step.title}
                className="interactive-pop rounded-[24px] border-2 border-black/10 bg-white/90 p-5 shadow-[0_10px_26px_rgba(0,0,0,0.09)]"
              >
                <p className="inline-flex rounded-full bg-yellow-300 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-black/75">
                  Pasul {idx + 1}
                </p>
                <p className="cartoon-title mt-3 text-base font-extrabold text-black/85">{step.title}</p>
                <p className="mt-2 text-sm leading-6 text-black/70">{step.text}</p>
              </li>
            ))}
          </ol>

          <div className="interactive-pop mt-10 rounded-[28px] border-2 border-black/10 bg-white/90 px-6 py-7 text-center shadow-[0_14px_32px_rgba(0,0,0,0.11)]">
            <p className="text-base font-semibold text-black/75">Vrei să verificăm rapid data ta?</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <ButtonLink href="/contact" size="lg" data-track="cta_click" data-track-label="Servicii final: Contact">
                Verifică disponibilitatea datei
              </ButtonLink>
              <ButtonAnchor
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                className="!border-emerald-700 !bg-gradient-to-b !from-emerald-400 !to-emerald-500 !text-white !shadow-[0_10px_0_rgba(0,0,0,0.12),0_18px_34px_rgba(16,185,129,0.28)]"
                data-track="open_whatsapp"
                data-track-label="Servicii final: WhatsApp"
              >
                Discută pe WhatsApp
              </ButtonAnchor>
            </div>
          </div>
        </Container>
      </section>

      <section className="cv-auto relative bg-[#fffdf7] py-12 sm:py-14">
        <Container>
          <div className="rounded-[28px] border-2 border-black/10 bg-white/90 p-6 shadow-[0_12px_28px_rgba(0,0,0,0.08)] sm:p-8">
            <h2 className="cartoon-title text-2xl font-extrabold tracking-tight text-black/85 sm:text-3xl">
              Servicii petreceri copii în București și Ilfov
            </h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-black/70 sm:text-base">
              Organizăm programe pentru aniversări acasă, la restaurant, în locuri de joacă sau la grădiniță.
              Fiecare pachet de animație pentru copii este adaptat după vârstă, numărul invitaților și timpul disponibil.
            </p>
            <p className="mt-3 text-sm font-semibold leading-7 text-black/70 sm:text-base">
              Dacă cauți animatori copii în București, Sector 1-6 sau în Ilfov, îți recomandăm o combinație clară:
              jocuri interactive, personaje tematice și activități bonus (face painting, baloane modelabile).
            </p>
          </div>
        </Container>
      </section>

      <SeoRelatedLinksSection
        title="Vezi și paginile asociate"
        trackingContext="servicii_related"
        items={[
          {
            href: "/personaje",
            label: "Personaje pentru petreceri copii",
            description: "Alege personaje tematice pentru super-eroi, prințese și aniversări.",
          },
          {
            href: "/galerie",
            label: "Galerie evenimente reale",
            description: "Uită-te la momente reale din petreceri organizate în București și Ilfov.",
          },
          {
            href: "/contact",
            label: "Contact și rezervare rapidă",
            description: "Trimite data și locația pentru disponibilitate și ofertă personalizată.",
          },
        ]}
      />

      <SeoFaqSection
        title="Întrebări frecvente despre servicii"
        trackingContext="servicii_faq"
        items={[...faqItems]}
        relatedLinks={[
          { href: "/personaje", label: "Vezi personajele" },
          { href: "/galerie", label: "Vezi galeria" },
          { href: "/contact", label: "Cere ofertă" },
        ]}
      />
    </div>
  );
}
