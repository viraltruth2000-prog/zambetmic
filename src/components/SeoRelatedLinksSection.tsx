import Link from "next/link";
import { Container } from "@/components/Container";

type RelatedItem = {
  href: string;
  label: string;
  description: string;
};

export function SeoRelatedLinksSection({
  title,
  items,
  trackingContext = "seo_related",
}: {
  title: string;
  items: ReadonlyArray<RelatedItem>;
  trackingContext?: string;
}) {
  if (!items.length) return null;

  return (
    <section className="cv-auto pb-14 sm:pb-16">
      <Container>
        <h2 className="cartoon-title text-2xl font-extrabold tracking-tight text-black/85 sm:text-3xl">
          {title}
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              data-track="internal_link_click"
              data-track-label={`${trackingContext}: ${item.label}`}
              data-track-href={item.href}
              className="rounded-[22px] border-2 border-black/10 bg-white/90 p-4 shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition hover:-translate-y-0.5 hover:bg-white"
            >
              <p className="text-sm font-extrabold text-black/85">{item.label}</p>
              <p className="mt-1 text-sm font-semibold leading-6 text-black/65">{item.description}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
