"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Container } from "@/components/Container";
import { cn } from "@/lib/cn";

const links = [
  { href: "/servicii", label: "Servicii" },
  { href: "/personaje", label: "Personaje" },
  { href: "/galerie", label: "Galerie" },
  { href: "/despre", label: "Despre" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const activeHref = useMemo(() => {
    if (!pathname) return "/";
    if (pathname === "/") return "/";
    const found = links.find((l) => pathname.startsWith(l.href));
    return found?.href ?? "/";
  }, [pathname]);

  return (
    <header
      className={cn(
        isHome ? "fixed inset-x-0 top-0 z-50" : "sticky top-0 z-50",
        "pt-1.5"
      )}
    >
      <Container>
        <div className="flex items-center gap-1.5">
          <Link
            href="/"
            prefetch={false}
            className={cn(
              "relative -ml-1 inline-flex shrink-0 items-center justify-center sm:-ml-2 md:-ml-4",
              "h-[102px] w-[160px] -translate-y-0.5 md:h-[130px] md:w-[204px]"
            )}
            aria-label="Acasă"
          >
            <span className="pointer-events-none absolute inset-0" aria-hidden="true">
              <Image
                src="/stickers/sticker-cloud.svg"
                alt=""
                fill
                className="object-contain"
                sizes="(min-width: 768px) 204px, 160px"
              />
            </span>
            <span className="relative z-10 h-22 w-22 md:h-26 md:w-26">
              <Image
                src="/corect2.png"
                alt="Logo"
                fill
                className="object-contain"
                sizes="(min-width: 768px) 104px, 88px"
                priority
              />
            </span>
          </Link>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <nav className="hidden flex-1 justify-center md:flex">
                <div
                  className={cn(
                    "inline-flex items-center rounded-full border-2 border-black/10 bg-white/92 shadow-[0_10px_24px_rgba(0,0,0,0.12)] backdrop-blur transition-all duration-200",
                    "gap-1.5 px-4 py-1.5"
                  )}
                >
                  {links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      prefetch={false}
                      className={cn(
                        "rounded-full px-4 py-1.5 text-[13px] font-extrabold tracking-tight text-black/75 transition-all duration-200 lg:text-[14px]",
                        l.href === activeHref
                          ? "bg-amber-100/95 text-black shadow-[0_2px_0_rgba(0,0,0,0.08)]"
                          : "hover:-translate-y-px hover:bg-zinc-100 hover:text-black"
                      )}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </nav>

              <Link
                href="/contact"
                prefetch={false}
                className={cn(
                  "animate-cta-glow inline-flex items-center justify-center rounded-full border-2 border-orange-600 bg-gradient-to-b from-orange-400 to-orange-500 px-7 text-sm font-extrabold text-white shadow-[0_3px_0_rgba(0,0,0,0.18),0_8px_16px_rgba(0,0,0,0.18)] transition-all duration-200 hover:brightness-[1.04] lg:text-base",
                  "h-10"
                )}
                data-track="cta_click"
                data-track-label="Header: Rezervă"
              >
                Rezervă acum
              </Link>
            </div>

            <nav className="mt-2 md:hidden">
              <div className="no-scrollbar flex gap-2 overflow-x-auto rounded-full border-2 border-black/10 bg-white/92 p-2 shadow-[0_10px_24px_rgba(0,0,0,0.12)] backdrop-blur">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    prefetch={false}
                    className={cn(
                      "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-extrabold tracking-tight text-black/75",
                      l.href === activeHref
                        ? "bg-amber-100/95 text-black"
                        : "hover:bg-zinc-100"
                    )}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </Container>
    </header>
  );
}
