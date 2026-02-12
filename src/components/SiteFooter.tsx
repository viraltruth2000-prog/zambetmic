import Link from "next/link";
import { Container } from "@/components/Container";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="pb-10">
      <Container>
        <div className="rounded-[34px] border-2 border-black/10 bg-amber-50/75 px-6 py-6 shadow-[0_18px_0_rgba(0,0,0,0.06),0_26px_80px_rgba(0,0,0,0.10)] backdrop-blur">
          <div className="grid gap-6 md:grid-cols-3 md:items-start">
            <div>
              <p className="text-sm font-extrabold tracking-tight text-black/85">
                Contact
              </p>
              <ul className="mt-3 space-y-2 text-sm text-black/70">
                <li>
                  <a className="hover:underline" href={`tel:${siteConfig.phone}`}>
                    {siteConfig.phone}
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href={`mailto:${siteConfig.email}`}>
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <span>{siteConfig.city}</span>
                </li>
                <li className="pt-1">
                  <Link
                    className="font-semibold text-black/70 hover:underline"
                    href="/contact"
                    data-track="cta_click"
                    data-track-label="Footer: Rezervă"
                  >
                    Rezervă
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-extrabold tracking-tight text-black/85">
                Rețele sociale
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                <a
                  className="rounded-full bg-white/70 px-4 py-2 font-semibold text-black/70 ring-1 ring-black/10 hover:bg-white"
                  href={siteConfig.socials.instagram}
                  data-track="cta_click"
                  data-track-label="Footer: Instagram"
                >
                  Instagram
                </a>
                <a
                  className="rounded-full bg-white/70 px-4 py-2 font-semibold text-black/70 ring-1 ring-black/10 hover:bg-white"
                  href={siteConfig.socials.facebook}
                  data-track="cta_click"
                  data-track-label="Footer: Facebook"
                >
                  Facebook
                </a>
                <a
                  className="rounded-full bg-white/70 px-4 py-2 font-semibold text-black/70 ring-1 ring-black/10 hover:bg-white"
                  href={siteConfig.socials.tiktok}
                  data-track="cta_click"
                  data-track-label="Footer: TikTok"
                >
                  TikTok
                </a>
              </div>
            </div>

            <div>
              <p className="text-sm font-extrabold tracking-tight text-black/85">
                Noutăți
              </p>
              <div className="mt-3 flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Email-ul tău"
                  className="h-11 w-full rounded-full border border-black/10 bg-white/75 px-4 text-sm text-black/80 placeholder:text-black/45 focus:outline-none focus:ring-2 focus:ring-black/15"
                />
                <button
                  type="button"
                  className="h-11 shrink-0 rounded-full bg-orange-500 px-5 text-sm font-semibold text-white shadow-sm shadow-orange-500/20 hover:bg-orange-600"
                >
                  Înscrie-te
                </button>
              </div>
              <p className="mt-2 text-xs text-black/55">
                Doar vizual (nu trimite emailuri încă).
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-black/10 pt-4 text-xs text-black/60">
            © {new Date().getFullYear()} {siteConfig.name}. Toate drepturile rezervate.
          </div>
        </div>
      </Container>
    </footer>
  );
}
