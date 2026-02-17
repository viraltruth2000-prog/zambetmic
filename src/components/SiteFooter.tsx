import Link from "next/link";
import { Container } from "@/components/Container";
import { CloudDividerImage } from "@/components/CloudDividerImage";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer id="site-footer" className="relative mt-7 bg-[#facc15] pb-8 pt-7">
      <div className="pointer-events-none absolute inset-x-0 top-0 -translate-y-[96%]">
        <CloudDividerImage className="h-24 w-full" />
      </div>
      <Container>
        <div className="relative rounded-[26px] border-2 border-black/10 bg-gradient-to-b from-yellow-100/95 via-yellow-100/92 to-yellow-100/88 px-6 py-6 shadow-[0_14px_0_rgba(0,0,0,0.06),0_28px_70px_rgba(0,0,0,0.12)] sm:px-8 sm:py-7">
          <div className="grid gap-7 md:grid-cols-3 md:items-start">
            <div>
              <p className="cartoon-title text-[1.2rem] font-extrabold tracking-tight text-black/85">
                Contact
              </p>
              <ul className="mt-4 space-y-2.5 text-sm font-semibold text-black/75">
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
                    className="inline-flex rounded-full border border-black/10 bg-white/75 px-3 py-1 font-semibold text-black/75 hover:bg-white"
                    href="/contact"
                    prefetch={false}
                    data-track="cta_click"
                    data-track-label="Footer: Rezervă"
                  >
                    Rezervă
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="cartoon-title text-[1.2rem] font-extrabold tracking-tight text-black/85">
                Rețele sociale
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5 text-sm">
                <a
                  className="rounded-full border border-black/10 bg-white/80 px-4 py-1.5 font-semibold text-black/75 shadow-[0_4px_0_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-px hover:bg-white"
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="cta_click"
                  data-track-label="Footer: Instagram"
                >
                  Instagram
                </a>
                <a
                  className="rounded-full border border-black/10 bg-white/80 px-4 py-1.5 font-semibold text-black/75 shadow-[0_4px_0_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-px hover:bg-white"
                  href={siteConfig.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="cta_click"
                  data-track-label="Footer: Facebook"
                >
                  Facebook
                </a>
                <a
                  className="rounded-full border border-black/10 bg-white/80 px-4 py-1.5 font-semibold text-black/75 shadow-[0_4px_0_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-px hover:bg-white"
                  href={siteConfig.socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="cta_click"
                  data-track-label="Footer: TikTok"
                >
                  TikTok
                </a>
              </div>
            </div>

            <div>
              <p className="cartoon-title text-[1.2rem] font-extrabold tracking-tight text-black/85">
                Noutăți
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
                <input
                  type="email"
                  placeholder="Email-ul tău"
                  className="h-10 w-full rounded-full border border-black/20 bg-white/92 px-4 text-sm text-black/80 placeholder:text-black/45 focus:outline-none focus:ring-2 focus:ring-black/15"
                />
                <button
                  type="button"
                  className="h-10 shrink-0 rounded-full border-2 border-orange-600 bg-gradient-to-b from-orange-400 to-orange-500 px-5 text-sm font-extrabold text-white shadow-[0_3px_0_rgba(0,0,0,0.16)] transition hover:brightness-[1.03]"
                >
                  Înscrie-te
                </button>
              </div>
              <p className="mt-2 text-xs font-semibold text-black/55">
                Doar vizual (nu trimite emailuri încă).
              </p>
            </div>
          </div>

          <div className="mt-6 border-t border-black/10 pt-4 text-xs font-semibold text-black/60">
            © {new Date().getFullYear()} {siteConfig.name}. Toate drepturile rezervate.
          </div>
        </div>
      </Container>
    </footer>
  );
}
