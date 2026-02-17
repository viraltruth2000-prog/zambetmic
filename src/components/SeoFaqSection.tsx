import Link from "next/link";
import { Container } from "@/components/Container";

type FaqItem = {
  q: string;
  a: string;
};

type RelatedLink = {
  href: string;
  label: string;
};

export function SeoFaqSection({
  title,
  items,
  relatedLinks = [],
  trackingContext = "seo_faq",
}: {
  title: string;
  items: FaqItem[];
  relatedLinks?: RelatedLink[];
  trackingContext?: string;
}) {
  return (
    <section className="cv-auto pb-16 sm:pb-20">
      <Container>
        <h2 className="cartoon-title text-2xl font-extrabold tracking-tight text-black/85 sm:text-3xl">
          {title}
        </h2>
        <div className="mt-5 grid gap-3">
          {items.map((item) => (
            <details
              key={item.q}
              className="rounded-[24px] border-2 border-black/10 bg-white/92 px-5 py-4 shadow-[0_10px_24px_rgba(0,0,0,0.09)]"
            >
              <summary
                className="cursor-pointer list-none text-left text-base font-extrabold text-black/85"
                data-track="faq_toggle"
                data-track-label={`${trackingContext}: ${item.q}`}
              >
                {item.q}
              </summary>
              <p className="mt-2 text-sm font-semibold leading-6 text-black/70">{item.a}</p>
            </details>
          ))}
        </div>

        {relatedLinks.length ? (
          <div className="mt-6 flex flex-wrap gap-2.5">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                data-track="internal_link_click"
                data-track-label={`${trackingContext}: ${link.label}`}
                data-track-href={link.href}
                className="rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-semibold text-black/75 shadow-[0_4px_0_rgba(0,0,0,0.06)] hover:bg-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
