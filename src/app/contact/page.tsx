import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Rezervă animatori pentru petrecerea copilului tău.",
};

export default function ContactPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-black/10 bg-gradient-to-b from-emerald-50 via-white to-white py-14 sm:py-18">
        <Container>
          <SectionHeading
            eyebrow="Contact"
            title="Rezervă animatori"
            description="Completează formularul și revenim cu confirmare/disponibilitate în maximum 24h (în zile lucrătoare)."
          />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            <aside className="rounded-3xl border border-black/10 bg-zinc-50 p-7">
              <p className="text-sm font-semibold">Date rapide</p>
              <dl className="mt-5 space-y-4 text-sm">
                <div>
                  <dt className="text-black/60">Telefon</dt>
                  <dd className="mt-1 font-medium">
                    <a className="hover:underline" href={`tel:${siteConfig.phone}`}>
                      {siteConfig.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-black/60">Email</dt>
                  <dd className="mt-1 font-medium">
                    <a className="hover:underline" href={`mailto:${siteConfig.email}`}>
                      {siteConfig.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-black/60">Program</dt>
                  <dd className="mt-1 text-black/75">Luni–Vineri, 10:00–18:00</dd>
                </div>
              </dl>

              <div className="mt-8 rounded-2xl border border-black/10 bg-white p-5">
                <p className="text-xs font-medium text-black/60">Ce să incluzi</p>
                <p className="mt-2 text-sm leading-6 text-black/70">
                  Data, locația, vârsta copilului, numărul de copii și tema/
                  personajul dorit. Dacă ai link locație, ajută mult.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
}
