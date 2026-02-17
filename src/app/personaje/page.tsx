import type { Metadata } from "next";
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
  title: "Personaje",
  description:
    "Personaje și mascote pentru petreceri de copii: super-eroi, prințese, personaje amuzante.",
  path: "/personaje",
});

const breadcrumbLdJson = buildBreadcrumbJson("Personaje", "/personaje");
const webPageLdJson = buildWebPageJson({
  name: "Personaje",
  path: "/personaje",
  description:
    "Personaje și mascote pentru petreceri de copii: super-eroi, prințese, personaje amuzante.",
});
const faqItems = [
  {
    q: "Cum aleg personajul potrivit pentru vârsta copiilor?",
    a: "Te ajutăm cu recomandări în funcție de vârstă, temă și energia grupului, astfel încât activitățile să fie potrivite.",
  },
  {
    q: "Personajele pot fi combinate cu alte servicii?",
    a: "Da, poți combina personajul cu jocuri, dans, face painting și baloane modelabile pentru un program complet.",
  },
  {
    q: "Cu cât timp înainte este bine să rezerv?",
    a: "Ideal este cu 1-2 săptămâni înainte, dar verificăm și solicitările urgente în funcție de disponibilitate.",
  },
  {
    q: "Ce personaje sunt cele mai potrivite pentru aniversări 4-7 ani?",
    a: "Pentru 4-7 ani recomandăm personaje dinamice și interactive (super-eroi, prințese, unicorn), cu jocuri scurte și energice.",
  },
  {
    q: "Putem include două personaje în același program?",
    a: "Da, se poate include o apariție dublă sau schimb de personaje, în funcție de durata pachetului și tipul evenimentului.",
  },
] as const;
const faqLdJson = buildFaqPageJson(faqItems);

const characters = [
  {
    name: "Super Erou",
    vibe: "Energie & jocuri",
    age: "4-10 ani",
    duration: "60-90 min",
    color: "from-sky-500 to-indigo-500",
    tags: ["Jocuri", "Provocări", "Dans"],
  },
  {
    name: "Prințesă",
    vibe: "Povești & magie",
    age: "3-8 ani",
    duration: "60 min",
    color: "from-pink-500 to-fuchsia-500",
    tags: ["Povești", "Coroane", "Poze"],
  },
  {
    name: "Clovn simpatic",
    vibe: "Râsete garantate",
    age: "4-9 ani",
    duration: "60-90 min",
    color: "from-orange-500 to-rose-500",
    tags: ["Baloane", "Glume", "Mini-show"],
  },
  {
    name: "Pirată",
    vibe: "Aventură",
    age: "5-10 ani",
    duration: "60-90 min",
    color: "from-emerald-500 to-teal-500",
    tags: ["Comori", "Echipă", "Misiuni"],
  },
  {
    name: "Astronaut",
    vibe: "Curiozitate",
    age: "5-11 ani",
    duration: "60 min",
    color: "from-violet-500 to-sky-500",
    tags: ["Quiz", "Explorare", "Experimente"],
  },
  {
    name: "Unicorn",
    vibe: "Colorat",
    age: "3-8 ani",
    duration: "60 min",
    color: "from-fuchsia-500 to-sky-400",
    tags: ["Sclipici", "Dans", "Atelier"],
  },
] as const;

export default function PersonajePage() {
  const wa = toWhatsAppLink(
    siteConfig.whatsapp,
    "Bună! Vreau detalii despre personaje pentru petrecerea copilului."
  );

  return (
    <div className="relative isolate -mt-[112px] overflow-x-hidden bg-[#fff9eb] pt-[112px] md:-mt-[142px] md:pt-[142px]">
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
        className="pointer-events-none absolute -top-56 inset-x-0 bottom-0 -z-10 [background:linear-gradient(180deg,#d9f2ff_0%,#f6fcff_28%,#fff8ea_58%,#fff4d8_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-56 inset-x-0 bottom-0 -z-10 bg-noise opacity-[0.09]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-56 inset-x-0 bottom-0 -z-10 [background:radial-gradient(circle_at_10%_8%,rgba(56,189,248,0.25),rgba(56,189,248,0)_32%),radial-gradient(circle_at_90%_10%,rgba(251,191,36,0.26),rgba(251,191,36,0)_36%),radial-gradient(circle_at_18%_58%,rgba(236,72,153,0.18),rgba(236,72,153,0)_30%),radial-gradient(circle_at_82%_60%,rgba(45,212,191,0.14),rgba(45,212,191,0)_32%),radial-gradient(circle_at_50%_96%,rgba(244,114,182,0.14),rgba(244,114,182,0)_36%)]"
        aria-hidden="true"
      />

      <section className="relative overflow-hidden pb-12 pt-14 sm:pt-16">
        <div className="relative w-full px-4 sm:px-8 lg:px-10">
          <div className="py-8 sm:py-10 lg:py-12">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="cartoon-title text-balance text-4xl font-extrabold tracking-tight text-black/85 sm:text-5xl">
                Alege personajul care ridică energia petrecerii
              </h1>
              <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-sky-500" />
              <p className="mx-auto mt-5 max-w-2xl text-balance text-lg leading-8 text-black/70">
                De la super-eroi la prințese și mascote, alegem personajul după vârstă, număr de copii și tipul
                activităților dorite.
              </p>

              <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
                <ButtonLink href="/contact" size="lg" data-track="cta_click" data-track-label="Personaje hero: Contact">
                  Rezervă personajul dorit
                </ButtonLink>
                <ButtonAnchor
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="lg"
                  className="!border-emerald-700 !bg-gradient-to-b !from-emerald-400 !to-emerald-500 !text-white !shadow-[0_10px_0_rgba(0,0,0,0.12),0_18px_34px_rgba(16,185,129,0.28)]"
                  data-track="open_whatsapp"
                  data-track-label="Personaje hero: WhatsApp"
                >
                  WhatsApp rapid
                </ButtonAnchor>
                <ButtonLink href="/servicii" variant="secondary" size="lg" data-track="cta_click" data-track-label="Personaje hero: Servicii">
                  Vezi servicii
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="animate-page-enter-delay-1 cv-auto-tall relative py-16 sm:py-20">
        <Container className="relative">
          <div className="mb-8 rounded-[22px] bg-white/85 px-5 py-4 text-sm font-semibold text-black/70 ring-1 ring-black/10 shadow-[0_10px_24px_rgba(0,0,0,0.08)]">
            Personajele pot fi combinate cu jocuri, dans, face painting și baloane modelabile pentru un program complet.
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {characters.map((c) => (
              <article
                key={c.name}
                className="interactive-pop group overflow-hidden rounded-[28px] border-2 border-black/10 bg-white/92 shadow-[0_14px_32px_rgba(0,0,0,0.1)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.14)]"
              >
                <div className={`relative h-30 bg-gradient-to-br ${c.color}`}>
                  <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_2px),radial-gradient(circle_at_70%_40%,white_1px,transparent_2px),radial-gradient(circle_at_40%_70%,white_1px,transparent_2px)] [background-size:18px_18px]" />
                </div>

                <div className="p-6">
                  <h3 className="cartoon-title text-xl font-extrabold tracking-tight text-black/85">{c.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-black/65">{c.vibe}</p>

                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-black text-black/70">
                    <span className="rounded-full bg-amber-100 px-3 py-1 ring-1 ring-black/10">{c.age}</span>
                    <span className="rounded-full bg-sky-100 px-3 py-1 ring-1 ring-black/10">{c.duration}</span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span key={t} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-black/70 ring-1 ring-black/10">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6">
                    <ButtonLink href="/contact" className="w-full justify-center" data-track="cta_click" data-track-label={`Personaje card: ${c.name}`}>
                      Verifică disponibilitatea
                    </ButtonLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="animate-page-enter-delay-2 cv-auto pb-16 sm:pb-20">
        <Container>
          <div className="interactive-pop rounded-[30px] bg-gradient-to-r from-orange-100 via-yellow-50 to-sky-100 px-6 py-8 text-center ring-1 ring-black/10 shadow-[0_14px_30px_rgba(0,0,0,0.09)] sm:px-8">
            <h2 className="cartoon-title text-2xl font-extrabold text-black/85 sm:text-3xl">Nu ești sigur ce personaj să alegi?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-black/70 sm:text-base">
              Trimite pe WhatsApp vârsta copiilor, tema și durata dorită. Îți recomandăm rapid combinația potrivită.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <ButtonAnchor
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="!border-emerald-700 !bg-gradient-to-b !from-emerald-400 !to-emerald-500 !text-white !shadow-[0_10px_0_rgba(0,0,0,0.12),0_18px_34px_rgba(16,185,129,0.28)]"
                data-track="open_whatsapp"
                data-track-label="Personaje final: WhatsApp"
              >
                Discută pe WhatsApp
              </ButtonAnchor>
              <ButtonLink href="/contact" variant="secondary" size="lg" data-track="cta_click" data-track-label="Personaje final: Contact">
                Cere ofertă completă
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="cv-auto relative bg-[#fffdf7] py-12 sm:py-14">
        <Container>
          <div className="rounded-[28px] border-2 border-black/10 bg-white/90 p-6 shadow-[0_12px_28px_rgba(0,0,0,0.08)] sm:p-8">
            <h2 className="cartoon-title text-2xl font-extrabold tracking-tight text-black/85 sm:text-3xl">
              Personaje pentru aniversări copii și petreceri tematice
            </h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-black/70 sm:text-base">
              Personajele noastre sunt potrivite pentru petreceri de copii în apartament, curte, restaurant sau loc de joacă.
              Adaptăm energia și scenariul la vârsta copiilor, astfel încât fiecare copil să participe activ.
            </p>
            <p className="mt-3 text-sm font-semibold leading-7 text-black/70 sm:text-base">
              Dacă vrei personaje la grădiniță sau la o aniversare în București ori Ilfov, te ajutăm cu recomandări rapide
              după temă, durată și numărul de invitați.
            </p>
          </div>
        </Container>
      </section>

      <SeoRelatedLinksSection
        title="Explorează și"
        trackingContext="personaje_related"
        items={[
          {
            href: "/servicii",
            label: "Pachete complete de animație",
            description: "Combină personajele cu jocuri, dans, face painting și baloane modelabile.",
          },
          {
            href: "/galerie",
            label: "Galerie cu momente reale",
            description: "Vezi imagini reale din petreceri cu personaje și activități interactive.",
          },
          {
            href: "/contact",
            label: "Rezervă personajul dorit",
            description: "Confirmă disponibilitatea pe data ta prin formular sau WhatsApp.",
          },
        ]}
      />

      <SeoFaqSection
        title="Întrebări frecvente despre personaje"
        trackingContext="personaje_faq"
        items={[...faqItems]}
        relatedLinks={[
          { href: "/servicii", label: "Pachete servicii" },
          { href: "/galerie", label: "Momente reale" },
          { href: "/contact", label: "Rezervă personaj" },
        ]}
      />
    </div>
  );
}
