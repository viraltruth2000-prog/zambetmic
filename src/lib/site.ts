function cleanUrl(value: string | undefined, fallback: string) {
  const next = value?.trim();
  if (!next) return fallback;
  return next.replace(/\/$/, "");
}

function cleanText(value: string | undefined, fallback: string) {
  const next = value?.trim();
  return next && next.length > 0 ? next : fallback;
}

const siteUrl = cleanUrl(process.env.NEXT_PUBLIC_SITE_URL, "https://example.com");

export const siteConfig = {
  name: cleanText(process.env.NEXT_PUBLIC_SITE_NAME, "Zâmbete Kids Events"),
  description: cleanText(
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
    "Animatori pentru petreceri de copii: jocuri, dans, personaje și momente tematice care țin energia sus."
  ),
  url: siteUrl,
  email: cleanText(process.env.NEXT_PUBLIC_CONTACT_EMAIL, "contact@example.com"),
  phone: cleanText(process.env.NEXT_PUBLIC_CONTACT_PHONE, "+40XXXXXXXXX"),
  whatsapp: cleanText(process.env.NEXT_PUBLIC_CONTACT_WHATSAPP, "+40XXXXXXXXX"),
  city: cleanText(process.env.NEXT_PUBLIC_CITY, "București & Ilfov"),
  socials: {
    instagram: cleanText(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM, "https://instagram.com/"),
    facebook: cleanText(process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK, "https://facebook.com/"),
    tiktok: cleanText(process.env.NEXT_PUBLIC_SOCIAL_TIKTOK, "https://tiktok.com/"),
  },
} as const;
