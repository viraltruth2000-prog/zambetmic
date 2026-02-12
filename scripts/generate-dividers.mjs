import fs from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";

const outDir = path.join(process.cwd(), "public", "dividers");
fs.mkdirSync(outDir, { recursive: true });

function clamp01(n) {
  return Math.max(0, Math.min(1, n));
}

function smoothstep(a, b, x) {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function mulberry32(seed) {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function writePng(filePath, png) {
  fs.writeFileSync(filePath, PNG.sync.write(png));
}

function makePng(width, height) {
  return new PNG({ width, height });
}

function setPixel(png, x, y, r, g, b, a) {
  const idx = (png.width * y + x) << 2;
  png.data[idx] = r;
  png.data[idx + 1] = g;
  png.data[idx + 2] = b;
  png.data[idx + 3] = a;
}

function compositeOver(dstRgba, srcRgba) {
  const srcA = srcRgba[3] / 255;
  const dstA = dstRgba[3] / 255;
  const outA = srcA + dstA * (1 - srcA);
  if (outA <= 0) return [0, 0, 0, 0];
  const outR =
    (srcRgba[0] * srcA + dstRgba[0] * dstA * (1 - srcA)) / outA;
  const outG =
    (srcRgba[1] * srcA + dstRgba[1] * dstA * (1 - srcA)) / outA;
  const outB =
    (srcRgba[2] * srcA + dstRgba[2] * dstA * (1 - srcA)) / outA;
  return [outR | 0, outG | 0, outB | 0, (outA * 255) | 0];
}

function getPixel(png, x, y) {
  const idx = (png.width * y + x) << 2;
  return [
    png.data[idx],
    png.data[idx + 1],
    png.data[idx + 2],
    png.data[idx + 3],
  ];
}

function putPixel(png, x, y, rgba) {
  setPixel(png, x, y, rgba[0], rgba[1], rgba[2], rgba[3]);
}

function distanceToCloudSdf(x, y, circles) {
  let d = Infinity;
  for (const c of circles) {
    const dx = x - c.cx;
    const dy = y - c.cy;
    const dd = Math.sqrt(dx * dx + dy * dy) - c.r;
    if (dd < d) d = dd;
  }
  return d;
}

function generateCloudDivider() {
  const width = 2400;
  const height = 260;
  const png = makePng(width, height);

  // Transparent background by default.
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      setPixel(png, x, y, 0, 0, 0, 0);
    }
  }

  const rand = mulberry32(20260212);

  // Build circles along the top edge to create puffy clouds.
  const circles = [];
  let x = -80;
  while (x < width + 80) {
    const r = lerp(34, 62, rand());
    const y = lerp(78, 104, rand());
    circles.push({ cx: x, cy: y, r });
    x += lerp(55, 92, rand());
  }

  const baseWhiteTop = [255, 255, 255];
  const baseWhiteBottom = [246, 250, 255];
  const edgeSoftness = 6.0;

  // Draw cloud body with soft edge.
  for (let py = 0; py < height; py++) {
    for (let px = 0; px < width; px++) {
      const d = distanceToCloudSdf(px, py, circles);
      // Negative inside. Make a soft edge band around 0..edgeSoftness.
      const a = 1 - smoothstep(0, edgeSoftness, d);
      if (a <= 0) continue;

      const t = clamp01(py / 140);
      const r = lerp(baseWhiteTop[0], baseWhiteBottom[0], t);
      const g = lerp(baseWhiteTop[1], baseWhiteBottom[1], t);
      const b = lerp(baseWhiteTop[2], baseWhiteBottom[2], t);
      const src = [r | 0, g | 0, b | 0, (a * 255) | 0];
      const dst = getPixel(png, px, py);
      putPixel(png, px, py, compositeOver(dst, src));
    }
  }

  // Warm mist band under clouds (beige wave).
  for (let px = 0; px < width; px++) {
    const wave = 152 + Math.sin(px / 90) * 6 + Math.sin(px / 37) * 2.5;
    for (let py = 130; py < height; py++) {
      const dist = py - wave;
      const a = clamp01(1 - smoothstep(0, 60, dist)) * 0.55;
      if (a <= 0) continue;
      const t = clamp01((py - 120) / 120);
      const r = lerp(255, 252, t);
      const g = lerp(246, 235, t);
      const b = lerp(230, 205, t);
      const src = [r | 0, g | 0, b | 0, (a * 255) | 0];
      const dst = getPixel(png, px, py);
      putPixel(png, px, py, compositeOver(dst, src));
    }
  }

  // Soft shadow right under cloud edge.
  for (let py = 0; py < height; py++) {
    for (let px = 0; px < width; px++) {
      const d = distanceToCloudSdf(px, py, circles);
      if (d < 0) continue;
      const a = clamp01(1 - smoothstep(2, 38, d)) * 0.16;
      if (a <= 0) continue;
      const src = [0, 0, 0, (a * 255) | 0];
      const dst = getPixel(png, px, py);
      putPixel(png, px, py, compositeOver(dst, src));
    }
  }

  writePng(path.join(outDir, "cloud-divider.png"), png);
}

function generateGrassDivider() {
  const width = 2400;
  const height = 220;
  const png = makePng(width, height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      setPixel(png, x, y, 0, 0, 0, 0);
    }
  }

  const rand = mulberry32(20260212 ^ 0xfaceb00c);

  // Wavy grass top edge.
  const top = new Array(width);
  for (let x = 0; x < width; x++) {
    const y =
      78 +
      Math.sin(x / 120) * 10 +
      Math.sin(x / 44) * 3 +
      Math.sin(x / 18) * 1.5;
    top[x] = y;
  }

  // Fill grass body with vertical gradient.
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (y < top[x]) continue;
      const t = clamp01((y - top[x]) / (height - top[x]));
      const r = lerp(74, 22, t);
      const g = lerp(222, 163, t);
      const b = lerp(128, 74, t);
      const a = 255;
      setPixel(png, x, y, r | 0, g | 0, b | 0, a);
    }
  }

  // Add blades.
  const blades = 5200;
  for (let i = 0; i < blades; i++) {
    const x = (rand() * width) | 0;
    const baseY = Math.max(0, Math.min(height - 1, (top[x] + rand() * 30) | 0));
    const h = (rand() * 44 + 18) | 0;
    const tilt = (rand() * 10 - 5) | 0;
    const bright = lerp(0.68, 1.05, rand());
    for (let k = 0; k < h; k++) {
      const y = baseY - k;
      if (y < 0) break;
      const xx = x + ((tilt * k) / h) | 0;
      if (xx < 0 || xx >= width) continue;
      const t = k / h;
      const a = (255 * (1 - t) * 0.7) | 0;
      const r = Math.max(0, Math.min(255, (44 * bright) | 0));
      const g = Math.max(0, Math.min(255, (200 * bright) | 0));
      const b = Math.max(0, Math.min(255, (74 * bright) | 0));
      const src = [r, g, b, a];
      const dst = getPixel(png, xx, y);
      putPixel(png, xx, y, compositeOver(dst, src));
    }
  }

  // Soft highlight band.
  for (let x = 0; x < width; x++) {
    const y0 = top[x] + 26;
    for (let y = 0; y < height; y++) {
      if (y < top[x]) continue;
      const dist = Math.abs(y - y0);
      const a = clamp01(1 - smoothstep(0, 32, dist)) * 0.12;
      if (a <= 0) continue;
      const src = [255, 255, 255, (a * 255) | 0];
      const dst = getPixel(png, x, y);
      putPixel(png, x, y, compositeOver(dst, src));
    }
  }

  writePng(path.join(outDir, "grass-divider.png"), png);
}

generateCloudDivider();
generateGrassDivider();

console.log("Generated dividers:", path.relative(process.cwd(), outDir));

