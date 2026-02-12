import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { CloudPuffDivider } from "@/components/CloudPuffDivider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Despre",
  description: "Despre echipă, modul de lucru și petrecerile pentru copii pe care le animăm.",
};

export default function DesprePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-pink-200/35 via-white to-background py-14 sm:py-18">
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-[0.10]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.75),rgba(255,255,255,0)_55%)]"
          aria-hidden="true"
        />
        <Container className="relative">
          <SectionHeading
            eyebrow="Despre"
            title="Echipă veselă, organizare bună"
            description="Ne pasă de ritm, siguranță și implicare: fiecare copil să se simtă inclus."
          />
        </Container>

        <div className="pointer-events-none absolute inset-x-0 [bottom:-1px] text-white drop-shadow-[0_-10px_18px_rgba(0,0,0,0.10)] leading-none">
          <CloudPuffDivider className="h-20 w-full text-white" />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="sb-card p-8">
              <h3 className="cartoon-title text-xl font-extrabold tracking-tight text-black/85">Ce promitem</h3>
              <ul className="mt-6 space-y-3 text-sm text-black/75">
                {[
                  "Program adaptat vârstei",
                  "Jocuri care includ, nu exclud",
                  "Siguranță și limite clare",
                  "Punctualitate și comunicare simplă",
                ].map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-black/60" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sb-card bg-gradient-to-b from-sky-50/65 to-white p-8">
              <h3 className="cartoon-title text-xl font-extrabold tracking-tight text-black/85">Pentru cine e</h3>
              <p className="mt-3 text-sm leading-6 text-black/70">
                Pentru părinți care vor o petrecere organizată (acasă, în
                restaurant, loc de joacă sau grădină), fără haos și fără pauze
                plictisitoare.
              </p>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {[
                  "Aniversări",
                  "Locuri de joacă",
                  "Grădinițe / Școli",
                  "Evenimente corporate",
                ].map((tag) => (
                  <div
                    key={tag}
                    className="sb-pill px-4 py-3 text-sm font-semibold text-black/75"
                  >
                    {tag}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact">Rezervă acum</ButtonLink>
                <ButtonLink href={`mailto:${siteConfig.email}`} variant="outline">
                  Trimite email
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
