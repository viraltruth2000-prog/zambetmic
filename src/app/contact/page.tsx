import type { Metadata } from "next";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Container } from "@/components/Container";
import { SeoFaqSection } from "@/components/SeoFaqSection";
import { SeoRelatedLinksSection } from "@/components/SeoRelatedLinksSection";
import { ButtonAnchor } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";
import { toWhatsAppLink } from "@/lib/whatsapp";
import {
  buildBreadcrumbJson,
  buildFaqPageJson,
  buildPageMetadata,
  buildWebPageJson,
} from "@/lib/seo";

const ContactForm = dynamic(
  () => import("@/components/ContactForm").then((m) => m.ContactForm),
  { loading: () => <div className="min-h-[520px] rounded-[26px] border border-black/10 bg-white/70" /> }
);

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description: "Rezervă animatori pentru petrecerea copilului tău.",
  path: "/contact",
});

const breadcrumbLdJson = buildBreadcrumbJson("Contact", "/contact");
const webPageLdJson = buildWebPageJson({
  name: "Contact",
  path: "/contact",
  description: "Rezervă animatori pentru petrecerea copilului tău.",
});
const faqItems = [
  {
    q: "În cât timp răspundeți după trimiterea formularului?",
    a: "De regulă răspundem în aceeași zi lucrătoare, iar în perioade aglomerate în maximum 24h.",
  },
  {
    q: "Ce informații ajută pentru o ofertă rapidă?",
    a: "Data, locația, vârsta copiilor, numărul aproximativ de participanți și tema dorită ne ajută să revenim rapid cu opțiuni corecte.",
  },
  {
    q: "Pot face rezervarea direct pe WhatsApp?",
    a: "Da, poți trimite direct mesaj pe WhatsApp și continuăm acolo discuția pentru disponibilitate și pachete.",
  },
  {
    q: "Ce se întâmplă după ce trimit formularul?",
    a: "Verificăm data în calendar, apoi revenim cu opțiuni de pachet, interval și pașii clari pentru confirmarea rezervării.",
  },
  {
    q: "Se poate discuta și pentru rezervări urgente?",
    a: "Da, verificăm și solicitările urgente în funcție de intervalul rămas și disponibilitatea echipei.",
  },
] as const;
const faqLdJson = buildFaqPageJson(faqItems);

export default function ContactPage() {
  const wa = toWhatsAppLink(
    siteConfig.whatsapp,
    "Bună! Vreau să verific disponibilitatea pentru petrecerea copilului."
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
      <div
        className="pointer-events-none absolute -top-56 inset-x-0 bottom-0 -z-10 [background:linear-gradient(180deg,#d8f4ff_0%,#f4fcff_30%,#fff9e8_62%,#fff1d3_100%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-56 inset-x-0 bottom-0 -z-10 bg-noise opacity-[0.09]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-56 inset-x-0 bottom-0 -z-10 [background:radial-gradient(circle_at_12%_10%,rgba(56,189,248,0.24),rgba(56,189,248,0)_34%),radial-gradient(circle_at_90%_12%,rgba(251,191,36,0.26),rgba(251,191,36,0)_36%),radial-gradient(circle_at_18%_76%,rgba(236,72,153,0.16),rgba(236,72,153,0)_30%),radial-gradient(circle_at_82%_74%,rgba(52,211,153,0.14),rgba(52,211,153,0)_34%)]"
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute left-4 top-24 z-10 hidden h-20 w-20 -rotate-6 sm:block">
        <Image src="/stickers/sticker-wand.svg" alt="" fill sizes="80px" className="object-contain" />
      </div>
      <div className="pointer-events-none absolute right-5 top-24 z-10 hidden h-20 w-20 rotate-8 sm:block">
        <Image src="/stickers/sticker-star.svg" alt="" fill sizes="80px" className="object-contain" />
      </div>

      <section className="relative overflow-hidden pb-12 pt-14 sm:pt-16">
        <Container className="relative">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="rounded-[34px] border-[3px] border-black/10 bg-white/84 p-6 shadow-[0_16px_0_rgba(0,0,0,0.06),0_24px_44px_rgba(0,0,0,0.11)] backdrop-blur-sm sm:p-8">
              <h1 className="cartoon-title text-balance text-4xl font-extrabold tracking-tight text-black/85 sm:text-5xl">
                Rezervă rapid și simplu, fără mesaje pierdute
              </h1>
              <div className="mt-4 h-1.5 w-28 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-sky-500" />
              <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-black/70">
                Completezi formularul și revenim cu disponibilitate în maximum 24h, în zilele lucrătoare.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonAnchor
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="lg"
                  className="!border-emerald-700 !bg-gradient-to-b !from-emerald-400 !to-emerald-500 !text-white !shadow-[0_10px_0_rgba(0,0,0,0.12),0_18px_34px_rgba(16,185,129,0.28)]"
                >
                  Cere ofertă pe WhatsApp
                </ButtonAnchor>
                <ButtonAnchor href={`tel:${siteConfig.phone}`} variant="secondary" size="lg">
                  Sună pentru disponibilitate
                </ButtonAnchor>
              </div>
            </div>

            <aside className="interactive-pop rounded-[30px] border-[3px] border-black/10 bg-white/86 p-6 shadow-[0_14px_0_rgba(0,0,0,0.06),0_22px_38px_rgba(0,0,0,0.11)] backdrop-blur-sm">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-black/55">Date rapide</p>
              <dl className="mt-4 space-y-4 text-sm">
                <div className="rounded-2xl border-2 border-black/10 bg-white/84 px-4 py-3">
                  <dt className="text-xs font-black uppercase tracking-wide text-black/55">Telefon</dt>
                  <dd className="mt-1 text-base font-black text-black/80">
                    <a className="hover:underline" href={`tel:${siteConfig.phone}`}>
                      {siteConfig.phone}
                    </a>
                  </dd>
                </div>
                <div className="rounded-2xl border-2 border-black/10 bg-white/84 px-4 py-3">
                  <dt className="text-xs font-black uppercase tracking-wide text-black/55">Email</dt>
                  <dd className="mt-1 text-base font-black text-black/80">
                    <a className="hover:underline" href={`mailto:${siteConfig.email}`}>
                      {siteConfig.email}
                    </a>
                  </dd>
                </div>
                <div className="rounded-2xl border-2 border-black/10 bg-white/84 px-4 py-3">
                  <dt className="text-xs font-black uppercase tracking-wide text-black/55">Program</dt>
                  <dd className="mt-1 text-sm font-semibold text-black/75">Luni-Vineri, 10:00-18:00</dd>
                </div>
              </dl>
            </aside>
          </div>
        </Container>
      </section>

      <section className="animate-page-enter-delay-1 cv-auto-tall pb-16 pt-4 sm:pb-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="interactive-pop lg:col-span-2 rounded-[30px] border-[3px] border-black/10 bg-white/88 p-2 shadow-[0_14px_0_rgba(0,0,0,0.06),0_24px_42px_rgba(0,0,0,0.11)] sm:p-3">
              <ContactForm />
            </div>

            <aside className="space-y-5">
              <div className="interactive-pop rounded-[28px] border-[3px] border-black/10 bg-white/88 p-6 shadow-[0_12px_0_rgba(0,0,0,0.06),0_20px_34px_rgba(0,0,0,0.1)]">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-black/55">Ce să incluzi în mesaj</p>
                <ul className="mt-4 space-y-3 text-sm font-semibold text-black/75">
                  {[
                    "Data evenimentului",
                    "Locația (sau link Maps)",
                    "Vârsta și numărul copiilor",
                    "Tema sau personajul dorit",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="interactive-pop rounded-[28px] border-[3px] border-black/10 bg-gradient-to-r from-orange-100 via-yellow-50 to-cyan-100 p-6 shadow-[0_12px_0_rgba(0,0,0,0.06),0_20px_34px_rgba(0,0,0,0.1)]">
                <p className="cartoon-title text-xl font-extrabold text-black/85">Preferi fără formular?</p>
                <p className="mt-2 text-sm leading-7 text-black/70">
                  Scrie-ne direct pe WhatsApp și îți răspundem cât mai rapid.
                </p>
                <ButtonAnchor
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full justify-center !border-emerald-700 !bg-gradient-to-b !from-emerald-400 !to-emerald-500 !text-white !shadow-[0_10px_0_rgba(0,0,0,0.12),0_18px_34px_rgba(16,185,129,0.28)]"
                >
                  Deschide WhatsApp
                </ButtonAnchor>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="cv-auto relative bg-[#fffdf7] py-12 sm:py-14">
        <Container>
          <div className="rounded-[28px] border-2 border-black/10 bg-white/90 p-6 shadow-[0_12px_28px_rgba(0,0,0,0.08)] sm:p-8">
            <h2 className="cartoon-title text-2xl font-extrabold tracking-tight text-black/85 sm:text-3xl">
              Contact rapid pentru animatori copii în București și Ilfov
            </h2>
            <p className="mt-4 text-sm font-semibold leading-7 text-black/70 sm:text-base">
              Pentru o ofertă exactă, trimite-ne data, locația și vârsta copiilor. Răspundem rapid cu disponibilitate
              și recomandarea de pachet potrivit pentru aniversări, evenimente la grădiniță sau petreceri tematice.
            </p>
            <p className="mt-3 text-sm font-semibold leading-7 text-black/70 sm:text-base">
              Poți rezerva atât prin formularul de contact, cât și direct pe WhatsApp, dacă vrei răspuns imediat și
              clarificări scurte despre preț, durată și personaje disponibile.
            </p>
          </div>
        </Container>
      </section>

      <SeoRelatedLinksSection
        title="Înainte de rezervare, poți vedea și"
        trackingContext="contact_related"
        items={[
          {
            href: "/servicii",
            label: "Pachete servicii disponibile",
            description: "Vezi ce include fiecare pachet și ce opțiuni poți combina pentru eveniment.",
          },
          {
            href: "/personaje",
            label: "Personaje pentru petrecere",
            description: "Alege personajele potrivite pentru vârsta copiilor și tema aniversării.",
          },
          {
            href: "/galerie",
            label: "Galerie cu evenimente reale",
            description: "Inspiră-te din imagini reale de la petreceri organizate recent.",
          },
        ]}
      />

      <SeoFaqSection
        title="Întrebări frecvente despre contact și rezervare"
        trackingContext="contact_faq"
        items={[...faqItems]}
        relatedLinks={[
          { href: "/servicii", label: "Pachete servicii" },
          { href: "/personaje", label: "Personaje disponibile" },
          { href: "/galerie", label: "Vezi evenimente reale" },
        ]}
      />
    </div>
  );
}
