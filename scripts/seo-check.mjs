import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const cwd = process.cwd();
const envLocalPath = resolve(cwd, ".env.local");

function parseEnvFile(content) {
  const env = {};
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const idx = line.indexOf("=");
    if (idx <= 0) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, "");
    env[key] = value;
  }
  return env;
}

function readEnvLocal() {
  if (!existsSync(envLocalPath)) {
    return {};
  }
  try {
    return parseEnvFile(readFileSync(envLocalPath, "utf8"));
  } catch {
    return {};
  }
}

function getValue(key, envLocal) {
  const runtime = process.env[key];
  if (runtime && runtime.trim()) return runtime.trim();
  const local = envLocal[key];
  return local && local.trim() ? local.trim() : "";
}

function isPlaceholderUrl(value) {
  return (
    !value ||
    /example\.com/i.test(value) ||
    /^https?:\/\/(www\.)?(instagram|facebook|tiktok)\.com\/?$/i.test(value)
  );
}

const envLocal = readEnvLocal();
const checks = [];
const warnings = [];

const siteUrl = getValue("NEXT_PUBLIC_SITE_URL", envLocal);
if (!siteUrl || !/^https?:\/\//.test(siteUrl) || /example\.com/i.test(siteUrl)) {
  checks.push("NEXT_PUBLIC_SITE_URL is missing or still placeholder (must be real https domain).");
}

const siteName = getValue("NEXT_PUBLIC_SITE_NAME", envLocal);
if (!siteName) checks.push("NEXT_PUBLIC_SITE_NAME is missing.");

const siteDescription = getValue("NEXT_PUBLIC_SITE_DESCRIPTION", envLocal);
if (!siteDescription) checks.push("NEXT_PUBLIC_SITE_DESCRIPTION is missing.");

const contactEmail = getValue("NEXT_PUBLIC_CONTACT_EMAIL", envLocal);
if (!contactEmail || /example\.com/i.test(contactEmail)) {
  checks.push("NEXT_PUBLIC_CONTACT_EMAIL is missing or placeholder.");
}

const contactPhone = getValue("NEXT_PUBLIC_CONTACT_PHONE", envLocal);
if (!contactPhone || /X{3,}/.test(contactPhone)) {
  checks.push("NEXT_PUBLIC_CONTACT_PHONE is missing or placeholder.");
}

const socialKeys = [
  "NEXT_PUBLIC_SOCIAL_INSTAGRAM",
  "NEXT_PUBLIC_SOCIAL_FACEBOOK",
  "NEXT_PUBLIC_SOCIAL_TIKTOK",
];
for (const key of socialKeys) {
  const value = getValue(key, envLocal);
  if (isPlaceholderUrl(value)) {
    warnings.push(`${key} looks generic/placeholder; set brand profile URL.`);
  }
}

const googleVerification = getValue("GOOGLE_SITE_VERIFICATION", envLocal);
if (!googleVerification) {
  warnings.push("GOOGLE_SITE_VERIFICATION missing (recommended before Search Console verification).");
}

if (checks.length === 0) {
  console.log("SEO check: required configuration looks valid.");
} else {
  console.error("SEO check: required issues found:");
  for (const item of checks) {
    console.error(`- ${item}`);
  }
}

if (warnings.length > 0) {
  console.log("SEO check: warnings:");
  for (const item of warnings) {
    console.log(`- ${item}`);
  }
}

if (checks.length > 0) {
  process.exit(1);
}
