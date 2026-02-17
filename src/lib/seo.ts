import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

type SocialTheme = "default" | "services" | "characters" | "gallery" | "about" | "contact";

function getSocialThemeByPath(path: string): SocialTheme {
  if (path === "/servicii") return "services";
  if (path === "/personaje") return "characters";
  if (path === "/galerie") return "gallery";
  if (path === "/despre") return "about";
  if (path === "/contact") return "contact";
  return "default";
}

export function buildSocialImageUrl({
  title,
  subtitle,
  theme = "default",
}: {
  title: string;
  subtitle: string;
  theme?: SocialTheme;
}) {
  const params = new URLSearchParams({
    title,
    subtitle,
    theme,
  });
  return `/api/og?${params.toString()}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
}: BuildPageMetadataInput): Metadata {
  const socialImage = buildSocialImageUrl({
    title,
    subtitle: description,
    theme: getSocialThemeByPath(path),
  });

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} · ${siteConfig.name}`,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: "ro_RO",
      type: "website",
      images: [{ url: socialImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${siteConfig.name}`,
      description,
      images: [socialImage],
    },
  };
}

export function buildBreadcrumbJson(name: string, path: string) {
  const base = siteConfig.url.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Acasă",
        item: `${base}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: `${base}${path}`,
      },
    ],
  } as const;
}

export function buildWebPageJson({
  name,
  path,
  description,
}: {
  name: string;
  path: string;
  description: string;
}) {
  const base = siteConfig.url.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    url: `${base}${path}`,
    description,
    inLanguage: "ro-RO",
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: base,
    },
  } as const;
}

export function buildFaqPageJson(items: ReadonlyArray<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  } as const;
}

export function buildOrganizationJson() {
  const base = siteConfig.url.replace(/\/$/, "");
  const sameAs = Object.values(siteConfig.socials).filter((url) => {
    return /^https?:\/\//.test(url) && !/instagram\.com\/?$|facebook\.com\/?$|tiktok\.com\/?$/i.test(url);
  });

  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: siteConfig.name,
    url: base,
    description: siteConfig.description,
    image: `${base}/opengraph-image`,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    areaServed: siteConfig.city,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressCountry: "RO",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      email: siteConfig.email,
      contactType: "customer service",
      availableLanguage: ["ro", "en"],
    },
    sameAs: sameAs.length ? sameAs : undefined,
  } as const;
}

export function buildImageGalleryJson({
  name,
  path,
  description,
  images,
}: {
  name: string;
  path: string;
  description: string;
  images: ReadonlyArray<{ src: string; caption?: string; alt?: string }>;
}) {
  const base = siteConfig.url.replace(/\/$/, "");
  const url = `${base}${path}`;

  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name,
    description,
    url,
    inLanguage: "ro-RO",
    associatedMedia: images.map((img, idx) => ({
      "@type": "ImageObject",
      contentUrl: `${base}${img.src}`,
      url: `${base}${img.src}`,
      name: img.caption ?? img.alt ?? `Imagine ${idx + 1}`,
      caption: img.caption ?? img.alt,
    })),
  } as const;
}
