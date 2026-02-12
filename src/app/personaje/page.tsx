import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CloudPuffDivider } from "@/components/CloudPuffDivider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Personaje",
  description:
    "Personaje și mascote pentru petreceri de copii: super-eroi, prințese, personaje amuzante.",
};

const characters = [
  {
    name: "Super Erou",
    vibe: "Energie & jocuri",
    color: "from-sky-500 to-indigo-500",
    tags: ["Jocuri", "Provocări", "Dans"],
  },
  {
    name: "Prințesă",
    vibe: "Povești & magie",
    color: "from-pink-500 to-fuchsia-500",
    tags: ["Povești", "Coroane", "Poze"],
  },
  {
    name: "Clovn simpatic",
    vibe: "Râsete garantate",
    color: "from-orange-500 to-rose-500",
    tags: ["Baloane", "Glume", "Mini-show"],
  },
  {
    name: "Pirată",
    vibe: "Aventură",
    color: "from-emerald-500 to-teal-500",
    tags: ["Vânătoare de comori", "Echipă", "Misiuni"],
  },
  {
    name: "Astronaut",
    vibe: "Curiozitate",
    color: "from-violet-500 to-sky-500",
    tags: ["Experimente", "Quiz", "Explorare"],
  },
  {
    name: "Unicorn",
    vibe: "Colorat",
    color: "from-fuchsia-500 to-sky-400",
    tags: ["Sclipici", "Dans", "Atelier"],
  },
] as const;

export default function PersonajePage() {
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
            eyebrow="Personaje"
            title="Alege personajul preferat"
            description="Exemple de personaje (poți redenumi și înlocui cu costumele tale reale)."
          />

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact">Rezervă acum</ButtonLink>
            <ButtonLink href="/servicii" variant="secondary">
              Vezi servicii
            </ButtonLink>
          </div>
        </Container>

        <div className="pointer-events-none absolute inset-x-0 [bottom:-1px] text-white drop-shadow-[0_-10px_18px_rgba(0,0,0,0.10)] leading-none">
          <CloudPuffDivider className="h-20 w-full text-white" />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {characters.map((c) => (
              <div
                key={c.name}
                className="sb-card overflow-hidden"
              >
                <div
                  className={`h-28 bg-gradient-to-br ${c.color} relative`}
                >
                  <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_2px),radial-gradient(circle_at_70%_40%,white_1px,transparent_2px),radial-gradient(circle_at_40%_70%,white_1px,transparent_2px)] [background-size:18px_18px]" />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="cartoon-title text-lg font-extrabold tracking-tight text-black/85">
                        {c.name}
                      </h3>
                      <p className="mt-1 text-sm text-black/65">{c.vibe}</p>
                    </div>
                    <span className="sb-pill px-4 py-2 text-xs font-semibold text-black/70">
                      60–90 min
                    </span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span
                        key={t}
                        className="sb-pill px-4 py-2 text-xs font-semibold text-black/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6">
                    <ButtonLink href="/contact" className="w-full justify-center">
                      Întreabă de disponibilitate
                    </ButtonLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
