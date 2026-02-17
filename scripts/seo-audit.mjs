import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const appDir = join(process.cwd(), "src", "app");
const targetPages = [
  { route: "/", file: join(appDir, "page.tsx") },
  { route: "/servicii", file: join(appDir, "servicii", "page.tsx") },
  { route: "/personaje", file: join(appDir, "personaje", "page.tsx") },
  { route: "/galerie", file: join(appDir, "galerie", "page.tsx") },
  { route: "/despre", file: join(appDir, "despre", "page.tsx") },
  { route: "/contact", file: join(appDir, "contact", "page.tsx") },
];

function countMatches(content, re) {
  return (content.match(re) || []).length;
}

function auditPage(route, file) {
  if (!existsSync(file)) {
    return {
      route,
      status: "missing",
      issues: [`Missing file: ${file}`],
      warnings: [],
      stats: {},
    };
  }

  const content = readFileSync(file, "utf8");
  const issues = [];
  const warnings = [];

  const hasMetadataExport = /export\s+const\s+metadata\s*:\s*Metadata/.test(content);
  const h1Count =
    countMatches(content, /<h1[\s>]/g) +
    countMatches(content, /<SectionHeading[\s\S]*?\bas\s*=\s*["']h1["']/g);
  const jsonLdCount = countMatches(content, /type="application\/ld\+json"/g);
  const imageTags = [...content.matchAll(/<Image[\s\S]*?\/>/g)].map((m) => m[0]);
  const imageCount = imageTags.length;

  let emptyAltCount = 0;
  let nonEmptyAltCount = 0;
  let missingAltCount = 0;
  for (const tag of imageTags) {
    const altAttr = tag.match(/\balt\s*=\s*(\{[^}]*\}|"[^"]*"|'[^']*')/);
    if (!altAttr) {
      missingAltCount += 1;
      continue;
    }
    const raw = altAttr[1].trim();
    const isEmpty =
      raw === '""' ||
      raw === "''" ||
      raw === '{""}' ||
      raw === "{''}";
    if (isEmpty) {
      emptyAltCount += 1;
    } else {
      nonEmptyAltCount += 1;
    }
  }

  if (!hasMetadataExport) {
    issues.push("Missing `export const metadata: Metadata`.");
  }
  if (h1Count !== 1) {
    warnings.push(`Expected exactly one <h1>, found ${h1Count}.`);
  }
  if (jsonLdCount < 1) {
    warnings.push("No JSON-LD script found in page component.");
  }
  if (missingAltCount > 0) {
    warnings.push(`${missingAltCount} image(s) without alt attribute.`);
  }

  return {
    route,
    status: issues.length > 0 ? "fail" : "ok",
    issues,
    warnings,
    stats: {
      h1Count,
      jsonLdCount,
      imageCount,
      emptyAltCount,
      nonEmptyAltCount,
      missingAltCount,
    },
  };
}

function auditApiOg() {
  const ogRoute = join(appDir, "api", "og", "route.tsx");
  if (!existsSync(ogRoute)) {
    return "warning: `/api/og` route missing.";
  }
  return null;
}

const results = targetPages.map((p) => auditPage(p.route, p.file));
const failed = results.filter((r) => r.status !== "ok");
const hasWarnings = results.some((r) => r.warnings.length > 0);
const ogWarning = auditApiOg();

console.log("SEO audit report");
console.log("================");

for (const result of results) {
  const { route, status, stats, issues, warnings } = result;
  console.log(`\n[${status.toUpperCase()}] ${route}`);
  if (Object.keys(stats).length) {
    console.log(
      `  h1=${stats.h1Count} | jsonLd=${stats.jsonLdCount} | images=${stats.imageCount} | altEmpty=${stats.emptyAltCount} | altNonEmpty=${stats.nonEmptyAltCount} | altMissing=${stats.missingAltCount}`
    );
  }
  for (const issue of issues) {
    console.log(`  issue: ${issue}`);
  }
  for (const warning of warnings) {
    console.log(`  warn: ${warning}`);
  }
}

if (ogWarning) {
  console.log(`\n${ogWarning}`);
}

if (failed.length > 0) {
  console.error(`\nSEO audit failed for ${failed.length} page(s).`);
  process.exit(1);
}

if (hasWarnings || ogWarning) {
  console.log("\nSEO audit passed with warnings.");
  process.exit(0);
}

console.log("\nSEO audit passed.");
