import { siteConfig } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = new URL(siteConfig.url);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    host: base.toString(),
    sitemap: new URL("/sitemap.xml", base).toString(),
  };
}
