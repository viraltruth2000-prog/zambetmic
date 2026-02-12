import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CloudPuffDivider } from "@/components/CloudPuffDivider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import {
  IconBalloon,
  IconGift,
  IconMusic,
  IconPaint,
  IconPartyHat,
  IconSparkles,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Servicii",
  description:
    "Animatori copii, jocuri, dans, face painting, baloane modelabile și personaje pentru petreceri.",
};

export default function ServiciiPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-200/35 via-white to-background py-14 sm:py-18">
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.10]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.75),rgba(255,255,255,0)_55%)]"
          aria-hidden="true"
        />
        <Container className="relative">
          <SectionHeading
            eyebrow="Servicii"
            title="Animare completă pentru petreceri de copii"
            description="Program dinamic, adaptat vârstei: jocuri, dans, concursuri, personaje și ateliere."
          />

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact">Rezervă acum</ButtonLink>
            <ButtonLink href="/personaje" variant="secondary">
              Vezi personaje
            </ButtonLink>
          </div>
        </Container>

        <div className="pointer-events-none absolute inset-x-0 [bottom:-1px] text-white drop-shadow-[0_-10px_18px_rgba(0,0,0,0.10)] leading-none">
          <CloudPuffDivider className="h-20 w-full text-white" />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              {
                icon: IconPartyHat,
                title: "Animatori (jocuri & concursuri)",
                points: [
                  "Jocuri interactive și de echipă",
                  "Concursuri cu premii mici",
                  "Coordonare + energie constantă",
                ],
              },
              {
                icon: IconMusic,
                title: "Dans & mini-show",
                points: [
                  "Momente de dans ușor",
                  "Coregrafii pe hit-uri pentru copii",
                  "Pauze scurte, ritm bun",
                ],
              },
              {
                icon: IconSparkles,
                title: "Personaje & mascote",
                points: [
                  "Apariții surpriză",
                  "Poze și interacțiune",
                  "Mini-scene tematice",
                ],
              },
              {
                icon: IconPaint,
                title: "Face painting",
                points: [
                  "Modele rapide (5–8 min)",
                  "Produse potrivite pentru copii",
                  "Șervețele/curățare la îndemână",
                ],
              },
              {
                icon: IconBalloon,
                title: "Baloane modelabile",
                points: [
                  "Săbii, flori, animăluțe",
                  "Cadouri rapide pentru fiecare",
                  "Siguranță și ordine",
                ],
              },
              {
                icon: IconGift,
                title: "Piniata & ateliere",
                points: [
                  "Piniata (moment de vârf)",
                  "Atelier mic (slime / brățări) la cerere",
                  "Adaptare la spațiu",
                ],
              },
            ].map((card) => (
              <div
                key={card.title}
                className="sb-card p-7 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/25 via-pink-500/25 to-sky-500/25 ring-2 ring-black/10 shadow-[0_10px_0_rgba(0,0,0,0.08)]">
                    <card.icon className="h-6 w-6 text-black/70" />
                  </span>
                  <h3 className="cartoon-title text-lg font-extrabold tracking-tight text-black/85">
                    {card.title}
                  </h3>
                </div>
                <ul className="mt-5 space-y-3 text-sm text-black/75">
                  {card.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-black/60" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative bg-gradient-to-b from-amber-100/55 via-white to-background py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.07]" aria-hidden="true" />
        <Container>
          <SectionHeading
            eyebrow="Proces"
            title="Cum lucrăm"
            description="Simplu și predictibil, cu focus pe copil și invitați."
          />

          <ol className="mt-10 grid gap-5 lg:grid-cols-4">
            {["Detalii", "Confirmare", "Plan", "Petrecere"].map((step, idx) => (
              <li
                key={step}
                className="sb-card p-6"
              >
                <p className="text-xs font-medium text-black/60">
                  Pasul {idx + 1}
                </p>
                <p className="cartoon-title mt-2 text-base font-extrabold text-black/85">{step}</p>
                <p className="mt-2 text-sm leading-6 text-black/70">
                  {idx === 0
                    ? "Ne spui data, locația, vârsta și numărul de copii."
                    : idx === 1
                      ? "Confirmăm disponibilitatea și pachetul."
                      : idx === 2
                        ? "Stabilim tema, jocurile și programul."
                        : "Venim la timp și ținem energia sus."}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </div>
  );
}
