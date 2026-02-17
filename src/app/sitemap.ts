import { siteConfig } from "@/lib/site";
import type { MetadataRoute } from "next";
import { existsSync, statSync } from "node:fs";
import { join } from "node:path";

function getRouteLastModified(routePath: string): Date {
  const appDir = join(process.cwd(), "src", "app");
  const pageFile =
    routePath === "/"
      ? join(appDir, "page.tsx")
      : join(appDir, routePath.replace(/^\//, ""), "page.tsx");

  if (existsSync(pageFile)) {
    return statSync(pageFile).mtime;
  }

  return new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");

  const routes = ["/", "/servicii", "/personaje", "/galerie", "/despre", "/contact"];

  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: getRouteLastModified(path),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
