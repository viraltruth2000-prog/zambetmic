import fs from "node:fs";
import path from "node:path";

function pad(n) {
  return String(n).padStart(2, "0");
}

const outDir = path.join(process.cwd(), "public", "moments");
fs.mkdirSync(outDir, { recursive: true });

const palettes = [
  ["#60A5FA", "#FDE047", "#FB7185"],
  ["#34D399", "#A78BFA", "#FDBA74"],
  ["#F472B6", "#38BDF8", "#FDE047"],
  ["#FB923C", "#60A5FA", "#22C55E"],
  ["#A78BFA", "#38BDF8", "#FDBA74"],
  ["#22C55E", "#60A5FA", "#F472B6"],
  ["#FDE047", "#FB7185", "#60A5FA"],
  ["#38BDF8", "#FB923C", "#34D399"],
];

function svgFor(i, w, h, [a, b, c]) {
  const sparkleX = 140 + (i % 4) * 26;
  const sparkleY = 110 + ((i * 5) % 6) * 22;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="${w}" y2="${h}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${a}"/>
      <stop offset="0.55" stop-color="${b}"/>
      <stop offset="1" stop-color="${c}"/>
    </linearGradient>
    <filter id="blur" x="-200" y="-200" width="${w + 400}" height="${h + 400}" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feGaussianBlur stdDeviation="34"/>
    </filter>
    <pattern id="confetti" width="36" height="36" patternUnits="userSpaceOnUse">
      <rect x="6" y="8" width="10" height="3" rx="1.5" fill="#ffffff" fill-opacity="0.38"/>
      <rect x="20" y="18" width="8" height="3" rx="1.5" fill="#000000" fill-opacity="0.10"/>
      <rect x="10" y="28" width="12" height="3" rx="1.5" fill="#ffffff" fill-opacity="0.26"/>
    </pattern>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#g)"/>

  <g filter="url(#blur)" opacity="0.65">
    <circle cx="${w * 0.23}" cy="${h * 0.35}" r="${h * 0.36}" fill="#ffffff" fill-opacity="0.24"/>
    <circle cx="${w * 0.78}" cy="${h * 0.62}" r="${h * 0.42}" fill="#ffffff" fill-opacity="0.18"/>
  </g>

  <rect width="${w}" height="${h}" fill="url(#confetti)" opacity="0.9"/>

  <!-- sparkle -->
  <g opacity="0.7">
    <path d="M${sparkleX} ${sparkleY}l10 24 24 10-24 10-10 24-10-24-24-10 24-10 10-24Z" fill="#FFFFFF" fill-opacity="0.30"/>
  </g>

  <!-- photo strip -->
  <rect x="0" y="${h - 88}" width="${w}" height="88" fill="#000000" fill-opacity="0.16"/>
</svg>`;
}

for (let i = 0; i < 8; i++) {
  const svg = svgFor(i + 1, 900, 675, palettes[i % palettes.length]);
  const file = path.join(outDir, `moment-${pad(i + 1)}.svg`);
  fs.writeFileSync(file, svg, "utf8");
}

console.log(`Generated 8 moment placeholders into ${outDir}`);
