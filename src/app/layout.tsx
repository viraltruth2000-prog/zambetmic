import type { Metadata } from "next";
import { Baloo_2, Fredoka } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { ClientGlobalWidgets } from "@/components/ClientGlobalWidgets";
import { siteConfig } from "@/lib/site";
import { buildOrganizationJson, buildSocialImageUrl } from "@/lib/seo";

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

const bodyFont = Fredoka({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const displayFont = Baloo_2({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "animatori petreceri copii",
    "petreceri copii Bucuresti",
    "personaje petreceri copii",
    "face painting copii",
    "organizare aniversari copii",
  ],
  applicationName: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  category: "events",
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/corect2.png", type: "image/png" }],
    apple: [{ url: "/corect2.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  alternates: {
    canonical: "/",
  },
  verification: googleSiteVerification
    ? {
        google: googleSiteVerification,
      }
    : undefined,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: buildSocialImageUrl({
          title: siteConfig.name,
          subtitle: `${siteConfig.city} · Animatori, personaje, jocuri și rezervare rapidă`,
          theme: "default",
        }),
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      buildSocialImageUrl({
        title: siteConfig.name,
        subtitle: `${siteConfig.city} · Animatori, personaje, jocuri și rezervare rapidă`,
        theme: "default",
      }),
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationLdJson = buildOrganizationJson();

  return (
    <html lang="ro" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${bodyFont.variable} ${displayFont.variable} min-h-dvh bg-background text-foreground antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLdJson) }}
        />
        <div className="relative isolate min-h-dvh">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>

        <MobileStickyCta />
        <ClientGlobalWidgets />
      </body>
    </html>
  );
}
