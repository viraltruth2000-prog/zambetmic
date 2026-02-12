import fs from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";

// Deterministic RNG (mulberry32)
function mulberry32(seed) {
  return function rng() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpColor(c1, c2, t) {
  return [
    Math.round(lerp(c1[0], c2[0], t)),
    Math.round(lerp(c1[1], c2[1], t)),
    Math.round(lerp(c1[2], c2[2], t)),
  ];
}

function putPixel(png, x, y, r, g, b, a = 255) {
  if (x < 0 || y < 0 || x >= png.width || y >= png.height) return;
  const idx = (png.width * y + x) << 2;
  png.data[idx] = r;
  png.data[idx + 1] = g;
  png.data[idx + 2] = b;
  png.data[idx + 3] = a;
}

function blendPixel(png, x, y, r, g, b, a) {
  if (x < 0 || y < 0 || x >= png.width || y >= png.height) return;
  const idx = (png.width * y + x) << 2;
  const dstR = png.data[idx];
  const dstG = png.data[idx + 1];
  const dstB = png.data[idx + 2];
  const dstA = png.data[idx + 3] / 255;

  const srcA = a / 255;
  const outA = srcA + dstA * (1 - srcA);
  if (outA <= 0) return;

  const outR = Math.round((r * srcA + dstR * dstA * (1 - srcA)) / outA);
  const outG = Math.round((g * srcA + dstG * dstA * (1 - srcA)) / outA);
  const outB = Math.round((b * srcA + dstB * dstA * (1 - srcA)) / outA);

  png.data[idx] = outR;
  png.data[idx + 1] = outG;
  png.data[idx + 2] = outB;
  png.data[idx + 3] = Math.round(outA * 255);
}

function drawRadialBlob(png, cx, cy, radius, color, alpha, softness = 0.85) {
  const r2 = radius * radius;
  const minX = Math.floor(cx - radius);
  const maxX = Math.ceil(cx + radius);
  const minY = Math.floor(cy - radius);
  const maxY = Math.ceil(cy + radius);

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const d2 = dx * dx + dy * dy;
      if (d2 > r2) continue;

      const d = Math.sqrt(d2) / radius;
      // Smooth falloff
      const t = clamp01(1 - Math.pow(d, 1 / softness));
      const a = Math.round(alpha * t);
      if (a <= 0) continue;
      blendPixel(png, x, y, color[0], color[1], color[2], a);
    }
  }
}

function drawConfettiDots(png, rng, density = 0.0022) {
  const colors = [
    [249, 115, 22], // orange
    [14, 165, 233], // sky
    [236, 72, 153], // pink
    [34, 197, 94], // green
    [250, 204, 21], // yellow
  ];

  const total = Math.floor(png.width * png.height * density);
  for (let i = 0; i < total; i++) {
    const x = Math.floor(rng() * png.width);
    const y = Math.floor(rng() * png.height);
    const c = colors[Math.floor(rng() * colors.length)];
    const a = 60 + Math.floor(rng() * 90);

    // Small 2x2-ish dot with jitter
    blendPixel(png, x, y, c[0], c[1], c[2], a);
    if (rng() > 0.4) blendPixel(png, x + 1, y, c[0], c[1], c[2], Math.round(a * 0.8));
    if (rng() > 0.4) blendPixel(png, x, y + 1, c[0], c[1], c[2], Math.round(a * 0.8));
  }
}

function drawConfettiStrokes(png, rng, count = 90) {
  const colors = [
    [249, 115, 22],
    [14, 165, 233],
    [236, 72, 153],
    [34, 197, 94],
    [250, 204, 21],
  ];

  for (let i = 0; i < count; i++) {
    const x0 = Math.floor(rng() * png.width);
    const y0 = Math.floor(rng() * png.height);
    const len = 10 + Math.floor(rng() * 26);
    const ang = rng() * Math.PI * 2;
    const c = colors[Math.floor(rng() * colors.length)];
    const a = 38 + Math.floor(rng() * 55);
    const thickness = 2 + Math.floor(rng() * 3);

    for (let t = 0; t < len; t++) {
      const x = Math.floor(x0 + Math.cos(ang) * t);
      const y = Math.floor(y0 + Math.sin(ang) * t);
      for (let oy = -thickness; oy <= thickness; oy++) {
        for (let ox = -thickness; ox <= thickness; ox++) {
          if (ox * ox + oy * oy > thickness * thickness) continue;
          blendPixel(png, x + ox, y + oy, c[0], c[1], c[2], a);
        }
      }
    }
  }
}

function render({ width, height, seed }) {
  const png = new PNG({ width, height });

  // Base diagonal gradient (sky -> cream -> orange)
  const cA = [125, 211, 252]; // sky-300
  const cB = [253, 230, 138]; // amber-200
  const cC = [253, 186, 116]; // orange-200

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const t = (x / width) * 0.65 + (y / height) * 0.35;
      const mid = 0.55;
      const col = t < mid ? lerpColor(cA, cB, t / mid) : lerpColor(cB, cC, (t - mid) / (1 - mid));
      putPixel(png, x, y, col[0], col[1], col[2], 255);
    }
  }

  const rng = mulberry32(seed);

  // Big soft blobs (balloon-ish)
  drawRadialBlob(png, Math.floor(width * 0.10), Math.floor(height * 0.22), Math.floor(width * 0.15), [251, 113, 133], 120);
  drawRadialBlob(png, Math.floor(width * 0.22), Math.floor(height * 0.16), Math.floor(width * 0.12), [56, 189, 248], 110);
  drawRadialBlob(png, Math.floor(width * 0.92), Math.floor(height * 0.22), Math.floor(width * 0.17), [250, 204, 21], 95);
  drawRadialBlob(png, Math.floor(width * 0.99), Math.floor(height * 0.46), Math.floor(width * 0.19), [251, 146, 60], 95);
  drawRadialBlob(png, Math.floor(width * 0.52), Math.floor(height * 1.04), Math.floor(width * 0.26), [52, 211, 153], 90);

  // Subtle vignette to keep focus on left text
  drawRadialBlob(png, Math.floor(width * 0.22), Math.floor(height * 0.36), Math.floor(width * 0.55), [255, 255, 255], 55, 0.65);

  // Confetti
  drawConfettiDots(png, rng, 0.0019);
  drawConfettiStrokes(png, rng, 70);

  // Extra soft sheen on the right
  drawRadialBlob(png, Math.floor(width * 0.78), Math.floor(height * 0.28), Math.floor(width * 0.25), [255, 255, 255], 70, 0.7);

  return png;
}

const width = Number(process.env.HERO_W || 1920);
const height = Number(process.env.HERO_H || 960);
const seed = Number(process.env.HERO_SEED || 1337);

const outPath = path.join(process.cwd(), "public", "hero-bg.png");
const png = render({ width, height, seed });

await new Promise((resolve, reject) => {
  png
    .pack()
    .pipe(fs.createWriteStream(outPath))
    .on("finish", resolve)
    .on("error", reject);
});

console.log(`Generated ${outPath} (${width}x${height}) seed=${seed}`);
