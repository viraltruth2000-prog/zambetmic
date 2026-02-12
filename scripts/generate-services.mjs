import fs from "node:fs";
import path from "node:path";

function pad(n) {
  return String(n).padStart(2, "0");
}

const outDir = path.join(process.cwd(), "public", "services");
fs.mkdirSync(outDir, { recursive: true });

const palettes = [
  ["#38BDF8", "#FDE047", "#FB7185"],
  ["#A78BFA", "#34D399", "#FDBA74"],
  ["#60A5FA", "#F472B6", "#FDE047"],
];

function svgFor(i, w, h, [a, b, c]) {
  const cx = w * 0.5;
  const cy = h * 0.46;

  const icon =
    i === 1
      ? // balloons
        `<g transform="translate(${cx - 92} ${cy - 78})">
           <circle cx="42" cy="54" r="34" fill="#ffffff" fill-opacity="0.82"/>
           <circle cx="98" cy="40" r="30" fill="#ffffff" fill-opacity="0.76"/>
           <circle cx="150" cy="62" r="32" fill="#ffffff" fill-opacity="0.74"/>
           <path d="M42 88c12 12 24 12 36 0" stroke="#111827" stroke-opacity="0.18" stroke-width="3" stroke-linecap="round"/>
           <path d="M98 70c10 12 20 12 30 0" stroke="#111827" stroke-opacity="0.18" stroke-width="3" stroke-linecap="round"/>
           <path d="M150 96c12 12 24 12 36 0" stroke="#111827" stroke-opacity="0.18" stroke-width="3" stroke-linecap="round"/>
         </g>`
      : i === 2
        ? // brush + sparkles
          `<g transform="translate(${cx - 110} ${cy - 66})">
             <rect x="28" y="88" width="160" height="22" rx="11" fill="#111827" fill-opacity="0.10"/>
             <path d="M44 30c26 10 56 44 66 70l-20 10C76 78 58 54 36 42Z" fill="#ffffff" fill-opacity="0.82"/>
             <path d="M116 52c16 8 32 24 40 42l-18 8c-6-14-18-28-34-36Z" fill="#ffffff" fill-opacity="0.72"/>
             <path d="M176 28l6 18 18 6-18 6-6 18-6-18-18-6 18-6 6-18Z" fill="#ffffff" fill-opacity="0.55"/>
           </g>`
        : // magic wand
          `<g transform="translate(${cx - 110} ${cy - 72})">
             <path d="M54 126L178 12" stroke="#ffffff" stroke-opacity="0.78" stroke-width="16" stroke-linecap="round"/>
             <path d="M54 126L178 12" stroke="#111827" stroke-opacity="0.12" stroke-width="18" stroke-linecap="round"/>
             <path d="M166 28l6 18 18 6-18 6-6 18-6-18-18-6 18-6 6-18Z" fill="#ffffff" fill-opacity="0.65"/>
             <path d="M112 50l4 12 12 4-12 4-4 12-4-12-12-4 12-4 4-12Z" fill="#ffffff" fill-opacity="0.45"/>
           </g>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="${w}" y2="${h}" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="${a}"/>
      <stop offset="0.55" stop-color="${b}"/>
      <stop offset="1" stop-color="${c}"/>
    </linearGradient>
    <filter id="blur" x="-200" y="-200" width="${w + 400}" height="${h + 400}" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feGaussianBlur stdDeviation="28"/>
    </filter>
    <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="6" cy="6" r="1.1" fill="#FFFFFF" fill-opacity="0.20"/>
      <circle cx="16" cy="14" r="1.0" fill="#000000" fill-opacity="0.08"/>
    </pattern>
  </defs>

  <rect width="${w}" height="${h}" rx="28" fill="url(#g)"/>
  <g filter="url(#blur)" opacity="0.70">
    <circle cx="${w * 0.25}" cy="${h * 0.35}" r="${h * 0.55}" fill="#FFFFFF" fill-opacity="0.20"/>
    <circle cx="${w * 0.78}" cy="${h * 0.62}" r="${h * 0.58}" fill="#FFFFFF" fill-opacity="0.14"/>
  </g>
  <rect width="${w}" height="${h}" rx="28" fill="url(#dots)" opacity="0.85"/>

  ${icon}

  <rect x="0" y="${h - 72}" width="${w}" height="72" fill="#000000" fill-opacity="0.14"/>
</svg>`;
}

for (let i = 0; i < 3; i++) {
  const svg = svgFor(i + 1, 960, 600, palettes[i % palettes.length]);
  const file = path.join(outDir, `service-${pad(i + 1)}.svg`);
  fs.writeFileSync(file, svg, "utf8");
}

console.log(`Generated 3 service placeholders into ${outDir}`);

