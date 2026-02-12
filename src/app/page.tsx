import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { CloudDividerImage } from "@/components/CloudDividerImage";
import { GrassDividerImage } from "@/components/GrassDividerImage";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { CharactersCarousel } from "@/components/CharactersCarousel";
import { CharactersStageCarousel } from "@/components/CharactersStageCarousel";
import { IconPartyHat, IconPaint, IconSparkles } from "@/components/Icons";
import { MomentsStrip } from "@/components/MomentsStrip";
import { siteConfig } from "@/lib/site";
import { toWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Animatori pentru petreceri de copii",
  description:
    "Animatori, personaje și momente tematice pentru petreceri de copii. Rezervă rapid pe WhatsApp sau prin formular.",
};

export default function Home() {
  const wa = toWhatsAppLink(
    siteConfig.whatsapp,
    "Bună! Vreau să rezerv animatori pentru o petrecere de copii."
  );

  const ldJson = {
    "@context": "https://schema.org",
    "@type": "EntertainmentBusiness",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    areaServed: siteConfig.city,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    sameAs: [
      siteConfig.socials.instagram,
      siteConfig.socials.facebook,
      siteConfig.socials.tiktok,
    ].filter(Boolean),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: siteConfig.phone,
        email: siteConfig.email,
        availableLanguage: ["ro"],
      },
    ],
  } as const;

  const panelClass =
    "sb-panel mx-auto max-w-6xl p-5 sm:p-6";

  const characterFrames = [
    {
      left: "12.63%",
      top: "17.48%",
      width: "13.41%",
      height: "50.98%",
    },
    {
      left: "43.49%",
      top: "26.37%",
      width: "13.15%",
      height: "55.57%",
    },
    {
      left: "73.89%",
      top: "17.48%",
      width: "13.41%",
      height: "50.98%",
    },
  ] as const;

  const characters = [
    { name: "Super Erou", img: "/characters/super-hero.png" },
    { name: "Prințesă", img: "/characters/princess.png" },
    { name: "Pirată", img: "/characters/pirate.png" },
    { name: "Unicorn", img: "/characters/unicorn.png" },
    { name: "Astronaut", img: "/characters/astronaut.png" },
    { name: "Clovn", img: "/characters/clown.png" },
    { name: "Zână", img: "/characters/fairy.png" },
    { name: "Cavaler", img: "/characters/knight.png" },
    { name: "Dinozaur", img: "/characters/dinosaur.png" },
  ] as const;

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />

      {/* Hero content (full-bleed over global background) */}
      <section className="relative z-20 flex min-h-[calc(100dvh-88px)] mt-[-88px] items-center overflow-hidden pb-16 pt-[92px] sm:pt-[96px]">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/sections/hero-bg.svg"
            alt=""
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
            aria-hidden="true"
          />
          <Image
            src="/model/bg-main.png"
            alt=""
            fill
            className="object-cover object-center opacity-[0.28]"
            priority
            sizes="100vw"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sky-300/10 via-white/10 to-background" />
          <div className="absolute inset-0 bg-noise opacity-[0.08]" />
          <div className="absolute inset-0 [background:radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.70),rgba(255,255,255,0)_48%)]" />
        </div>

        {/* Hero stickers */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          <div className="absolute -left-14 top-3 h-[120px] w-[130px] opacity-70 drop-shadow-sm sm:-left-2 sm:top-16 sm:h-[200px] sm:w-[210px] animate-float-slower">
            <Image
              src="/stickers/sticker-balloons.svg"
              alt=""
              fill
              className="object-contain"
              sizes="210px"
              aria-hidden="true"
            />
          </div>
          <div className="absolute left-6 top-24 hidden h-[88px] w-[88px] rotate-[-12deg] opacity-85 sm:block animate-float-reverse">
            <Image
              src="/stickers/sticker-star.svg"
              alt=""
              fill
              className="object-contain"
              sizes="88px"
              aria-hidden="true"
            />
          </div>
          <div className="absolute right-6 top-12 h-[90px] w-[90px] opacity-90 sm:right-12 sm:top-10 sm:h-[120px] sm:w-[120px] animate-float-reverse max-sm:hidden">
            <Image
              src="/stickers/sticker-sparkle.svg"
              alt=""
              fill
              className="object-contain"
              sizes="120px"
              aria-hidden="true"
            />
          </div>
          <div className="absolute right-10 top-40 hidden h-[92px] w-[92px] rotate-[10deg] opacity-85 sm:block animate-float-slower">
            <Image
              src="/stickers/sticker-crown.svg"
              alt=""
              fill
              className="object-contain"
              sizes="92px"
              aria-hidden="true"
            />
          </div>
          <div className="absolute left-1/2 top-10 hidden h-[78px] w-[120px] -translate-x-1/2 opacity-85 md:block animate-float-slow">
            <Image
              src="/stickers/sticker-cloud.svg"
              alt=""
              fill
              className="object-contain"
              sizes="120px"
              aria-hidden="true"
            />
          </div>
          <div className="absolute left-10 bottom-24 hidden h-[64px] w-[64px] opacity-80 sm:block md:bottom-28 md:left-20 animate-float-reverse">
            <Image
              src="/stickers/sticker-sparkle.svg"
              alt=""
              fill
              className="object-contain"
              sizes="64px"
              aria-hidden="true"
            />
          </div>
          <div className="absolute left-6 bottom-10 hidden h-[110px] w-[110px] rotate-[12deg] opacity-80 sm:block animate-float-slow">
            <Image
              src="/stickers/sticker-wand.svg"
              alt=""
              fill
              className="object-contain"
              sizes="110px"
              aria-hidden="true"
            />
          </div>
          <div className="absolute right-3 bottom-8 h-[96px] w-[96px] opacity-65 sm:right-24 sm:bottom-24 sm:h-[160px] sm:w-[160px] animate-float-slow">
            <Image
              src="/stickers/sticker-bird-01.svg"
              alt=""
              fill
              className="object-contain"
              sizes="160px"
              aria-hidden="true"
            />
          </div>
          <div className="absolute right-2 bottom-40 hidden h-[92px] w-[92px] rotate-[-8deg] opacity-70 sm:block animate-float-reverse">
            <Image
              src="/stickers/sticker-heart.svg"
              alt=""
              fill
              className="object-contain"
              sizes="92px"
              aria-hidden="true"
            />
          </div>
          <div className="absolute bottom-4 left-3 hidden h-[120px] w-[150px] rotate-[-6deg] opacity-80 md:block">
            <Image
              src="/stickers/sticker-rainbow.svg"
              alt=""
              fill
              className="object-contain"
              sizes="150px"
              aria-hidden="true"
            />
          </div>
        </div>

        <Container>
          <div className="relative z-10 mx-auto max-w-3xl px-2 text-center sm:px-0">
            <h1 className="storybook-title storybook-outline text-pretty text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
              Dă viață magiei!
            </h1>
            <p className="mt-4 text-sm font-semibold text-white/90 drop-shadow sm:text-base">
              Animatori, personaje și momente tematice pentru petreceri de copii care rămân în amintiri.
            </p>
            <p className="mt-3 text-xs font-semibold text-white/85 drop-shadow">
              {siteConfig.city} · Răspundem rapid · Program adaptat · Recuzită inclusă
            </p>

            <div className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <ButtonLink
                href="/servicii"
                size="lg"
                className="w-full justify-center sm:w-auto"
                data-track="cta_click"
                data-track-label="Hero: Vezi serviciile"
              >
                Vezi serviciile
              </ButtonLink>
              <ButtonLink
                href="/personaje"
                size="lg"
                variant="secondary"
                className="w-full justify-center sm:w-auto"
                data-track="cta_click"
                data-track-label="Hero: Vezi personaje"
              >
                Vezi personaje
              </ButtonLink>
              <ButtonAnchor
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                className="w-full justify-center sm:w-auto"
                data-track="cta_click"
                data-track-label="Hero: WhatsApp rapid"
              >
                WhatsApp (rapid)
              </ButtonAnchor>
            </div>
          </div>
        </Container>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 hidden justify-center sm:flex">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white/90 backdrop-blur">
            <span>Derulează</span>
            <span className="animate-float-slow">↓</span>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 [bottom:-1px] z-20">
          <CloudDividerImage className="h-24 w-full" />
        </div>
      </section>

      {/* Services */}
      <section className="relative z-10 -mt-20 overflow-hidden bg-gradient-to-b from-white via-amber-50 to-amber-100/60 pb-24 pt-6 sm:-mt-24 sm:pb-28 sm:pt-8">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/sections/services-bg.svg"
            alt=""
            fill
            className="object-cover object-center opacity-[0.95]"
            sizes="100vw"
            aria-hidden="true"
          />
        </div>
        <div className="absolute inset-0 opacity-[0.10]" aria-hidden="true">
          <Image
            src="/model/bg-services.png"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            aria-hidden="true"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-amber-100/60"
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.07]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.75),rgba(255,255,255,0)_55%)]" aria-hidden="true" />

        {/* Section stickers */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-2 top-12 hidden h-[120px] w-[120px] rotate-[-10deg] opacity-75 sm:block">
            <Image src="/stickers/sticker-confetti.svg" alt="" fill className="object-contain" sizes="120px" />
          </div>
          <div className="absolute right-4 top-6 hidden h-[88px] w-[88px] rotate-[10deg] opacity-80 md:block">
            <Image src="/stickers/sticker-star.svg" alt="" fill className="object-contain" sizes="88px" />
          </div>
          <div className="absolute bottom-6 left-6 hidden h-[120px] w-[120px] rotate-[8deg] opacity-80 md:block">
            <Image src="/stickers/sticker-flower.svg" alt="" fill className="object-contain" sizes="120px" />
          </div>
          <div className="absolute bottom-2 right-2 hidden h-[120px] w-[150px] rotate-[-6deg] opacity-85 md:block">
            <Image src="/stickers/sticker-rainbow.svg" alt="" fill className="object-contain" sizes="150px" />
          </div>
        </div>

        <Container className="relative">
          <div className="sb-panel mx-auto max-w-3xl px-6 py-8 text-center">
            <p className="text-sm font-semibold text-black/60">
              Capitolul 1: Activități magice
            </p>
            <h2 className="cartoon-title mt-2 text-pretty text-3xl font-extrabold tracking-tight text-black/85 sm:text-4xl">
              Serviciile noastre
            </h2>
          </div>

          <div className={cn(panelClass, "sb-frame mt-10")}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: IconPartyHat,
                  title: "Animație de petrecere",
                  desc: "Jocuri, dans și multă energie pentru o petrecere reușită.",
                  img: "/services/service-01.png",
                },
                {
                  icon: IconPaint,
                  title: "Face painting & sclipici",
                  desc: "Modele rapide, prietenoase cu copiii, cu un strop de magie.",
                  img: "/services/service-02.png",
                },
                {
                  icon: IconSparkles,
                  title: "Jocuri & mini-show",
                  desc: "Momente scurte care îi țin pe toți implicați și veseli.",
                  img: "/services/service-03.png",
                },
              ].map((s) => (
                <div
                  key={s.title}
                  className="sb-card relative flex h-full flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div className="absolute left-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-yellow-300 text-black/80 ring-1 ring-black/15 shadow-[0_10px_0_rgba(0,0,0,0.10)]">
                    <s.icon className="h-6 w-6" />
                  </div>

                  <div className="flex flex-1 flex-col p-4 pt-4">
                    <div className="rounded-[28px] border border-black/15 bg-white p-3 shadow-sm">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-black/10 bg-white">
                        <Image
                          src={s.img}
                          alt={s.title}
                          fill
                          className="object-cover"
                          sizes="(min-width: 1024px) 260px, (min-width: 640px) 40vw, 88vw"
                        />
                      </div>
                    </div>

                    <div className="mt-4 px-2 pb-2 text-center">
                      <h3 className="text-base font-extrabold tracking-tight text-black/85">
                        {s.title}
                      </h3>
                      <p className="line-clamp-2 mt-2 min-h-[40px] text-xs leading-5 text-black/70">
                        {s.desc}
                      </p>
                    </div>

                    <div className="mt-auto px-2 pb-4">
                      <ButtonLink
                        href="/servicii"
                        variant="outline"
                        className="w-full justify-center"
                        data-track="cta_click"
                        data-track-label={`Services card: ${s.title}`}
                      >
                        Detalii
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="sb-pill inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-black/70">
              {[
                "Baloane modelabile",
                "Bubble show",
                "Atelier slime",
                "Piniata",
                "Premii concursuri",
              ].map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white/80 px-3 py-1 ring-1 ring-black/10"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <ButtonLink
              href="/servicii"
              variant="outline"
              data-track="cta_click"
              data-track-label="Services: Vezi toate serviciile"
            >
              Vezi toate serviciile
            </ButtonLink>
          </div>

          <div className="mt-10">
            <div className={cn(panelClass, "sb-frame")}>
              <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
                <div>
                  <p className="text-sm font-semibold text-black/60">De ce noi</p>
                  <h3 className="mt-2 text-pretty text-2xl font-extrabold tracking-tight text-black/85 sm:text-3xl">
                    Organizare bună, energie, zâmbete
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-black/70">
                    Program adaptat vârstei, jocuri care includ pe toți și comunicare simplă.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {[
                      "Răspundem rapid",
                      "Punctualitate",
                      "Program adaptat",
                      "Siguranță & limite",
                    ].map((t) => (
                      <span
                        key={t}
                        className="sb-pill px-4 py-2 text-xs font-semibold text-black/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { k: "24h", v: "Confirmare (zile lucrătoare)" },
                    { k: "60–120m", v: "Durate flexibile" },
                    { k: "4–16", v: "Vârste (adaptat)" },
                  ].map((s) => (
                    <div
                      key={s.k}
                      className="sb-card p-5 text-center"
                    >
                      <p className="text-2xl font-extrabold tracking-tight text-black/85">
                        {s.k}
                      </p>
                      <p className="mt-2 text-xs font-semibold text-black/65">
                        {s.v}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <ButtonLink
                  href="/contact"
                  size="lg"
                  className="justify-center"
                  data-track="cta_click"
                  data-track-label="De ce noi: Cere disponibilitate"
                >
                  Cere disponibilitate
                </ButtonLink>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <div className={cn(panelClass, "sb-frame")}>
              <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
                <div>
                  <p className="text-sm font-semibold text-black/60">
                    Întrebări frecvente
                  </p>
                  <h3 className="mt-2 text-pretty text-2xl font-extrabold tracking-tight text-black/85 sm:text-3xl">
                    Tot ce vrei să știi, pe scurt
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-black/70">
                    Dacă nu găsești răspunsul aici, scrie-ne pe WhatsApp sau pe formular.
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      q: "Cât durează programul?",
                      a: "De obicei 60–120 minute, în funcție de vârstă și energie. Putem ajusta programul pe loc.",
                    },
                    {
                      q: "Ce trebuie să pregătesc înainte să veniți?",
                      a: "Un spațiu liber pentru jocuri, muzică (dacă ai) și câteva scaune. Noi venim cu recuzita de bază.",
                    },
                    {
                      q: "Se poate și la grădiniță / loc de joacă / restaurant?",
                      a: "Da. Adaptăm jocurile la spațiu și reguli. Dacă ai link locație (Google Maps), ne ajută mult.",
                    },
                    {
                      q: "Aveți face painting / baloane / piniată?",
                      a: "Da, ca opționale. Bifezi în formular sau ne scrii pe WhatsApp și îți recomandăm combinația potrivită.",
                    },
                    {
                      q: "Cum se face rezervarea?",
                      a: "Ne trimiți data, locația, vârsta și numărul de copii. Confirmăm disponibilitatea și stabilim programul.",
                    },
                    {
                      q: "Cât costă și ce include?",
                      a: "Prețul depinde de durata programului și opționale (piniată, slime, bubble show). Îți trimitem o ofertă clară după ce știm detaliile.",
                    },
                    {
                      q: "Veniți și în afara orașului?",
                      a: "Da. Spune-ne localitatea și îți confirmăm rapid costul de deplasare (dacă e cazul).",
                    },
                    {
                      q: "Ce se întâmplă dacă se schimbă planurile?",
                      a: "Anunță-ne cât mai repede. Încercăm să reprogramăm în funcție de disponibilitate.",
                    },
                  ].map((it) => (
                    <details
                      key={it.q}
                      className="sb-card group p-5"
                    >
                      <summary className="cursor-pointer list-none select-none text-sm font-extrabold tracking-tight text-black/85 [&::-webkit-details-marker]:hidden">
                        <span className="flex items-center justify-between gap-3">
                          <span>{it.q}</span>
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white text-black/70 transition group-open:rotate-45">
                            +
                          </span>
                        </span>
                      </summary>
                      <p className="mt-3 text-sm leading-6 text-black/70">
                        {it.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>

        <div className="pointer-events-none absolute inset-x-0 bottom-[74px] z-10 opacity-95">
          <GrassDividerImage className="h-20 w-full" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 [bottom:-1px] z-20">
          <CloudDividerImage className="h-24 w-full" />
        </div>
      </section>

      {/* Characters */}
      <section className="relative overflow-hidden pb-24 pt-20 sm:pb-28 sm:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.04]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.25),rgba(255,255,255,0)_55%)]" aria-hidden="true" />
        <div className="absolute inset-0 opacity-[0.92]" aria-hidden="true">
          <Image
            src="/sections/stage-bg.svg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            aria-hidden="true"
          />
        </div>
        <div className="pointer-events-none absolute left-2 top-12 hidden h-[120px] w-[120px] rotate-[-10deg] opacity-70 md:block" aria-hidden="true">
          <Image src="/stickers/sticker-confetti.svg" alt="" fill className="object-contain" sizes="120px" />
        </div>
        <div className="pointer-events-none absolute right-6 top-10 hidden h-[92px] w-[92px] rotate-[10deg] opacity-75 md:block" aria-hidden="true">
          <Image src="/stickers/sticker-star.svg" alt="" fill className="object-contain" sizes="92px" />
        </div>
        <div className="pointer-events-none absolute bottom-8 left-6 hidden h-[110px] w-[110px] rotate-[-6deg] opacity-75 md:block" aria-hidden="true">
          <Image src="/stickers/sticker-castle.svg" alt="" fill className="object-contain" sizes="110px" />
        </div>
        <div className="pointer-events-none absolute bottom-10 right-6 hidden h-[110px] w-[110px] rotate-[10deg] opacity-70 md:block" aria-hidden="true">
          <Image src="/stickers/sticker-crown.svg" alt="" fill className="object-contain" sizes="110px" />
        </div>
        <Container>
          <div className="mx-auto max-w-6xl">
            <div className={cn(panelClass, "sb-frame")}>
              <div className="relative overflow-hidden rounded-[40px] border border-black/10 bg-black/10 shadow-[0_34px_110px_rgba(0,0,0,0.22)]">
                <div className="relative aspect-[3/2] w-full">
                  <Image
                    src="/model/bg-characters.png"
                    alt=""
                    fill
                    className="object-cover object-center"
                    sizes="(min-width: 1024px) 960px, 94vw"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-violet-700/30 via-violet-800/26 to-indigo-950/32"
                    aria-hidden="true"
                  />

                  {/* Spotlight */}
                  <div
                    className="pointer-events-none absolute inset-0 z-[6] opacity-70 mix-blend-screen [background:radial-gradient(circle_at_50%_55%,rgba(255,255,255,0.42),rgba(255,255,255,0)_58%)]"
                    aria-hidden="true"
                  />

                  {/* Curtains */}
                  <div className="pointer-events-none absolute inset-0 z-[7]" aria-hidden="true">
                    <div className="absolute left-0 top-0 h-full w-[14%] bg-gradient-to-r from-rose-950/70 via-rose-800/55 to-transparent" />
                    <div className="absolute right-0 top-0 h-full w-[14%] bg-gradient-to-l from-rose-950/70 via-rose-800/55 to-transparent" />
                    <div className="absolute inset-x-0 top-0 h-[14%] bg-gradient-to-b from-rose-950/55 via-rose-800/35 to-transparent" />
                    <div className="absolute left-0 top-0 h-full w-[16%] opacity-35 [background-image:repeating-linear-gradient(90deg,rgba(255,255,255,0.0)_0,rgba(255,255,255,0.0)_14px,rgba(255,255,255,0.35)_14px,rgba(255,255,255,0.35)_20px)]" />
                    <div className="absolute right-0 top-0 h-full w-[16%] opacity-35 [background-image:repeating-linear-gradient(90deg,rgba(255,255,255,0.0)_0,rgba(255,255,255,0.0)_14px,rgba(255,255,255,0.35)_14px,rgba(255,255,255,0.35)_20px)]" />
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 bottom-[8%] z-[8] hidden justify-center sm:flex" aria-hidden="true">
                    <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/85 backdrop-blur">
                      Glisează sau folosește săgețile
                    </div>
                  </div>

                  {/* Frame fills (tablet/desktop) */}
                  <CharactersStageCarousel
                    className="absolute inset-0 z-10 hidden sm:block"
                    items={[...characters]}
                    showDots
                    autoPlayMs={4500}
                    frames={[
                      {
                        left: characterFrames[0].left,
                        top: characterFrames[0].top,
                        width: characterFrames[0].width,
                        height: characterFrames[0].height,
                      },
                      {
                        left: characterFrames[1].left,
                        top: characterFrames[1].top,
                        width: characterFrames[1].width,
                        height: characterFrames[1].height,
                      },
                      {
                        left: characterFrames[2].left,
                        top: characterFrames[2].top,
                        width: characterFrames[2].width,
                        height: characterFrames[2].height,
                      },
                    ]}
                  />

                  {/* Heading */}
                  <div className="absolute inset-x-0 top-0 z-20 flex justify-center p-5 sm:p-7">
                    <div className="w-full max-w-3xl rounded-[36px] border border-white/20 bg-white/10 px-6 py-7 text-center shadow-sm backdrop-blur sm:px-10 sm:py-9">
                      <p className="text-sm font-semibold text-white/85">
                        Capitolul 2: Prietenii fermecați
                      </p>
                      <h2 className="mt-2 text-pretty text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        Personajele noastre
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:hidden">
              <CharactersCarousel
                items={[...characters]}
              />
            </div>

            <div className="mt-6 flex justify-center sm:hidden">
              <ButtonLink
                href="/personaje"
                variant="secondary"
                className="w-full max-w-sm justify-center"
                data-track="cta_click"
                data-track-label="Stage (mobile): Vezi toate personajele"
              >
                Vezi toate personajele
              </ButtonLink>
            </div>

            <div className="mt-8 hidden justify-center sm:flex">
              <ButtonLink
                href="/personaje"
                variant="secondary"
                data-track="cta_click"
                data-track-label="Stage: Vezi toate personajele"
              >
                Vezi toate personajele
              </ButtonLink>
            </div>
          </div>
        </Container>

        <div className="pointer-events-none absolute inset-x-0 [bottom:-1px] z-20">
          <CloudDividerImage className="h-24 w-full" />
        </div>
      </section>

      {/* Memorable moments */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-white to-background py-16 sm:py-20">
        <div className="absolute inset-0 opacity-[0.96]" aria-hidden="true">
          <Image
            src="/sections/moments-bg.svg"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            aria-hidden="true"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.04]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.65),rgba(255,255,255,0)_55%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute left-6 top-10 hidden h-[110px] w-[110px] rotate-[-8deg] opacity-75 md:block" aria-hidden="true">
          <Image src="/stickers/sticker-heart.svg" alt="" fill className="object-contain" sizes="110px" />
        </div>
        <div className="pointer-events-none absolute right-6 top-10 hidden h-[110px] w-[110px] rotate-[10deg] opacity-75 md:block" aria-hidden="true">
          <Image src="/stickers/sticker-wand.svg" alt="" fill className="object-contain" sizes="110px" />
        </div>
        <div className="pointer-events-none absolute bottom-6 left-6 hidden h-[120px] w-[120px] rotate-[8deg] opacity-80 md:block" aria-hidden="true">
          <Image src="/stickers/sticker-flower.svg" alt="" fill className="object-contain" sizes="120px" />
        </div>
        <div className="pointer-events-none absolute bottom-2 right-2 hidden h-[120px] w-[150px] rotate-[-6deg] opacity-85 md:block" aria-hidden="true">
          <Image src="/stickers/sticker-rainbow.svg" alt="" fill className="object-contain" sizes="150px" />
        </div>
        <Container>
          <div className="sb-panel mx-auto max-w-3xl px-6 py-8 text-center">
            <p className="text-sm font-semibold text-black/60">
              Capitolul 3: Amintiri de păstrat
            </p>
            <h2 className="cartoon-title text-pretty text-3xl font-extrabold tracking-tight text-black/85 sm:text-4xl">
              Momente memorabile
            </h2>
          </div>

          <div className="mt-10">
            <div className={cn(panelClass, "sb-frame")}>
              <MomentsStrip
                showDots
                autoPlayMs={3600}
                items={[
                  { src: "/moments/moment-01.png", alt: "Moment 1", caption: "Moment #1" },
                  { src: "/moments/moment-02.png", alt: "Moment 2", caption: "Moment #2" },
                  { src: "/moments/moment-03.png", alt: "Moment 3", caption: "Moment #3" },
                  { src: "/moments/moment-04.png", alt: "Moment 4", caption: "Moment #4" },
                  { src: "/moments/moment-05.png", alt: "Moment 5", caption: "Moment #5" },
                  { src: "/moments/moment-06.png", alt: "Moment 6", caption: "Moment #6" },
                  { src: "/moments/moment-07.png", alt: "Moment 7", caption: "Moment #7" },
                  { src: "/moments/moment-08.png", alt: "Moment 8", caption: "Moment #8" },
                ]}
              />
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <div className="flex w-full max-w-2xl flex-col gap-3 sm:flex-row sm:justify-center">
              <ButtonLink
                href="/contact"
                className="justify-center"
                size="lg"
                data-track="cta_click"
                data-track-label="Moments: Rezervă acum"
              >
                Rezervă acum
              </ButtonLink>
              <ButtonAnchor
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
                className="justify-center"
                data-track="cta_click"
                data-track-label="Moments: WhatsApp"
              >
                WhatsApp
              </ButtonAnchor>
              <ButtonLink
                href="/galerie"
                variant="outline"
                size="lg"
                className="justify-center"
                data-track="cta_click"
                data-track-label="Moments: Galerie"
              >
                Vezi galeria
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
