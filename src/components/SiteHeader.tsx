"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/ui/Button";
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

  const activeHref = useMemo(() => {
    if (!pathname) return "/";
    if (pathname === "/") return "/";
    const found = links.find((l) => pathname.startsWith(l.href));
    return found?.href ?? "/";
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      <Container className="flex justify-center pt-3">
        <div className="relative flex w-full max-w-6xl items-center justify-between gap-4 rounded-[60px] border border-black/10 bg-gradient-to-b from-sky-100 via-sky-200 to-white px-6 py-3 shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
          <div className="absolute -left-16 hidden h-16 w-44 items-center gap-3 rounded-full bg-white/90 px-4 shadow-[0_12px_24px_rgba(0,0,0,0.22)] sm:flex">
            <span className="relative h-12 w-12 overflow-hidden rounded-[20px] shadow-[0_8px_20px_rgba(0,0,0,0.18)]">
              <Image
                src="/logo-screenshot.png"
                alt="Zâmbește Kids logo"
                fill
                className="object-cover"
                sizes="48px"
                priority
              />
            </span>
            <div className="flex flex-col text-xs font-bold text-black/80">
              <span>Zâmbește Kids Events</span>
              <span className="text-[11px] font-semibold uppercase text-black/60">Animatori & personaje</span>
            </div>
          </div>
          <nav className="flex flex-1 justify-center gap-4 text-[13px] font-black uppercase tracking-tight text-black/70">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "px-4 py-1 rounded-full transition-colors duration-200",
                  l.href === activeHref
                    ? "bg-white text-black shadow-[0_12px_0_rgba(0,0,0,0.08)] ring-1 ring-black/10"
                    : "hover:text-black"
                )}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <ButtonLink
            href="/contact"
            variant="primary"
            className="h-11 w-32 rounded-full text-sm font-bold"
            data-track="cta_click"
            data-track-label="Header: Rezervă"
          >
            Rezervă
          </ButtonLink>
        </div>
      </Container>
    </header>
  );
}
