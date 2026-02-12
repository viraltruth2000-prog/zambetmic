import fs from "node:fs";
import path from "node:path";

function pad(n) {
  return String(n).padStart(2, "0");
}

const outDir = path.join(process.cwd(), "public", "gallery");
fs.mkdirSync(outDir, { recursive: true });

const palettes = [
  ["#38BDF8", "#FDE047", "#FB7185"],
  ["#FDBA74", "#60A5FA", "#34D399"],
  ["#F472B6", "#A78BFA", "#22C55E"],
  ["#FDE047", "#38BDF8", "#FB923C"],
  ["#34D399", "#F472B6", "#60A5FA"],
  ["#FB923C", "#FDE047", "#A78BFA"],
  ["#60A5FA", "#22C55E", "#FB7185"],
  ["#A78BFA", "#38BDF8", "#FDE047"],
  ["#FB7185", "#34D399", "#FDBA74"],
  ["#22C55E", "#60A5FA", "#F472B6"],
  ["#38BDF8", "#FB923C", "#34D399"],
  ["#FDE047", "#FB7185", "#60A5FA"],
];

function svgFor(i, w, h, [a, b, c]) {
  const blobX = 120 + (i % 4) * 40;
  const blobY = 90 + ((i * 7) % 6) * 30;
  const blob2X = w - 160 - ((i * 11) % 5) * 30;
  const blob2Y = h - 140 - ((i * 13) % 5) * 22;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="${w}" y2="${h}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${a}"/>
      <stop offset="0.55" stop-color="${b}"/>
      <stop offset="1" stop-color="${c}"/>
    </linearGradient>
    <filter id="blur" x="-200" y="-200" width="${w + 400}" height="${h + 400}" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feGaussianBlur stdDeviation="30"/>
    </filter>
    <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="5" cy="6" r="1.2" fill="#0EA5E9" fill-opacity="0.28"/>
      <circle cx="16" cy="12" r="1.1" fill="#F97316" fill-opacity="0.25"/>
      <circle cx="12" cy="22" r="1.0" fill="#EC4899" fill-opacity="0.22"/>
      <circle cx="24" cy="24" r="1.0" fill="#22C55E" fill-opacity="0.18"/>
    </pattern>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <g filter="url(#blur)" opacity="0.75">
    <circle cx="${blobX}" cy="${blobY}" r="160" fill="#FFFFFF" fill-opacity="0.20"/>
    <circle cx="${blob2X}" cy="${blob2Y}" r="190" fill="#FFFFFF" fill-opacity="0.16"/>
  </g>
  <rect width="${w}" height="${h}" fill="url(#dots)" opacity="0.9"/>

  <!-- playful strokes -->
  <g opacity="0.22" stroke="#0F172A" stroke-linecap="round">
    <path d="M${w * 0.20} ${h * 0.25}l24 16" stroke-width="8"/>
    <path d="M${w * 0.72} ${h * 0.32}l-18 26" stroke-width="8"/>
    <path d="M${w * 0.52} ${h * 0.70}l28-12" stroke-width="8"/>
  </g>

  <!-- label strip (no text) -->
  <rect x="0" y="${h - 96}" width="${w}" height="96" fill="#000000" fill-opacity="0.18"/>
</svg>`;
}

const sizes = [
  [960, 720],
  [960, 1200],
  [960, 840],
  [960, 1080],
  [960, 760],
  [960, 1320],
  [960, 900],
  [960, 1040],
  [960, 820],
  [960, 1160],
  [960, 780],
  [960, 980],
];

for (let i = 0; i < 12; i++) {
  const [w, h] = sizes[i] ?? [960, 720];
  const svg = svgFor(i + 1, w, h, palettes[i % palettes.length]);
  const file = path.join(outDir, `img-${pad(i + 1)}.svg`);
  fs.writeFileSync(file, svg, "utf8");
}

console.log(`Generated 12 SVG placeholders into ${outDir}`);
