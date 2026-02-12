import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { siteConfig } from "@/lib/site";
import { AnalyticsEvents } from "@/components/AnalyticsEvents";

const bodyFont = Fredoka({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "ro_RO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${bodyFont.variable} min-h-dvh bg-background text-foreground antialiased`}
      >
        <div className="relative isolate min-h-dvh">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>

        <WhatsAppFloatingButton />
        <MobileStickyCta />
        <AnalyticsEvents />
      </body>
    </html>
  );
}
