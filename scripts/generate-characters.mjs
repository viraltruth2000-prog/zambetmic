import fs from "node:fs";
import path from "node:path";

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const outDir = path.join(process.cwd(), "public", "characters");
fs.mkdirSync(outDir, { recursive: true });

const characters = [
  { name: "Super Hero", palette: ["#60A5FA", "#FDE047", "#FB7185"] },
  { name: "Princess", palette: ["#F472B6", "#A78BFA", "#38BDF8"] },
  { name: "Pirate", palette: ["#34D399", "#60A5FA", "#FB923C"] },
  { name: "Unicorn", palette: ["#A78BFA", "#38BDF8", "#FDE047"] },
  { name: "Astronaut", palette: ["#60A5FA", "#22C55E", "#FDBA74"] },
  { name: "Clown", palette: ["#FB7185", "#60A5FA", "#FDE047"] },
  { name: "Fairy", palette: ["#A78BFA", "#F472B6", "#FDE047"] },
  { name: "Knight", palette: ["#38BDF8", "#34D399", "#FDBA74"] },
  { name: "Dinosaur", palette: ["#22C55E", "#FDE047", "#60A5FA"] },
];

function svgFor(name, w, h, [a, b, c]) {
  const initial = name.trim().slice(0, 1).toUpperCase();

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="${w}" y2="${h}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${a}"/>
      <stop offset="0.55" stop-color="${b}"/>
      <stop offset="1" stop-color="${c}"/>
    </linearGradient>
    <filter id="blur" x="-200" y="-200" width="${w + 400}" height="${h + 400}" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feGaussianBlur stdDeviation="36"/>
    </filter>
    <pattern id="spark" width="34" height="34" patternUnits="userSpaceOnUse">
      <circle cx="7" cy="9" r="1.2" fill="#ffffff" fill-opacity="0.25"/>
      <circle cx="20" cy="16" r="1.0" fill="#000000" fill-opacity="0.08"/>
      <circle cx="14" cy="28" r="1.1" fill="#ffffff" fill-opacity="0.18"/>
    </pattern>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <g filter="url(#blur)" opacity="0.72">
    <circle cx="${w * 0.30}" cy="${h * 0.35}" r="${h * 0.52}" fill="#ffffff" fill-opacity="0.22"/>
    <circle cx="${w * 0.78}" cy="${h * 0.62}" r="${h * 0.58}" fill="#ffffff" fill-opacity="0.16"/>
  </g>
  <rect width="${w}" height="${h}" fill="url(#spark)" opacity="0.95"/>

  <!-- silhouette -->
  <g opacity="0.92">
    <circle cx="${w * 0.50}" cy="${h * 0.34}" r="${h * 0.16}" fill="#111827" fill-opacity="0.22"/>
    <path d="M${w * 0.30} ${h * 0.92}c10-26 30-44 60-44s50 18 60 44" fill="#111827" fill-opacity="0.22"/>
  </g>

  <!-- initial badge -->
  <g>
    <circle cx="${w * 0.14}" cy="${h * 0.16}" r="${h * 0.10}" fill="#ffffff" fill-opacity="0.82"/>
    <circle cx="${w * 0.14}" cy="${h * 0.16}" r="${h * 0.10}" stroke="#111827" stroke-opacity="0.14" stroke-width="3"/>
    <text x="${w * 0.14}" y="${h * 0.20}" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="${h * 0.15}" font-weight="900" fill="#111827" fill-opacity="0.65">${initial}</text>
  </g>

  <!-- bottom strip -->
  <rect x="0" y="${h - 90}" width="${w}" height="90" fill="#000000" fill-opacity="0.18"/>
  <text x="${w / 2}" y="${h - 35}" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial" font-size="30" font-weight="800" fill="#ffffff" fill-opacity="0.88">${name}</text>
</svg>`;
}

for (const c of characters) {
  const svg = svgFor(c.name, 900, 1200, c.palette);
  const file = path.join(outDir, `${slugify(c.name)}.svg`);
  fs.writeFileSync(file, svg, "utf8");
}

console.log(`Generated ${characters.length} character placeholders into ${outDir}`);
