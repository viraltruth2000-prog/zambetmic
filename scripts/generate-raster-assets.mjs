import fs from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function hexToRgb(hex) {
  const h = hex.replace("#", "").trim();
  const v = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function mixRgb(a, b, t) {
  return [
    Math.round(lerp(a[0], b[0], t)),
    Math.round(lerp(a[1], b[1], t)),
    Math.round(lerp(a[2], b[2], t)),
  ];
}

function setPx(img, x, y, r, g, b, a = 255) {
  if (x < 0 || y < 0 || x >= img.width || y >= img.height) return;
  const idx = (img.width * y + x) << 2;
  img.data[idx + 0] = r;
  img.data[idx + 1] = g;
  img.data[idx + 2] = b;
  img.data[idx + 3] = a;
}

function fillGradient(img, c1, c2, c3) {
  const a = hexToRgb(c1);
  const b = hexToRgb(c2);
  const c = hexToRgb(c3);
  for (let y = 0; y < img.height; y++) {
    const ty = y / (img.height - 1);
    for (let x = 0; x < img.width; x++) {
      const tx = x / (img.width - 1);
      const t = (tx * 0.65 + ty * 0.35);
      const ab = mixRgb(a, b, Math.min(1, t * 1.25));
      const abc = mixRgb(ab, c, Math.max(0, (t - 0.35) / 0.65));
      const noise = (Math.sin((x + y) * 0.03) + Math.sin(x * 0.07) + Math.sin(y * 0.05)) * 2.2;
      setPx(
        img,
        x,
        y,
        Math.max(0, Math.min(255, abc[0] + noise)),
        Math.max(0, Math.min(255, abc[1] + noise)),
        Math.max(0, Math.min(255, abc[2] + noise)),
        255
      );
    }
  }
}

function drawCircle(img, cx, cy, r, color, alpha = 255) {
  const [cr, cg, cb] = typeof color === "string" ? hexToRgb(color) : color;
  const r2 = r * r;
  const x0 = Math.floor(cx - r);
  const x1 = Math.ceil(cx + r);
  const y0 = Math.floor(cy - r);
  const y1 = Math.ceil(cy + r);
  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const dx = x - cx;
      const dy = y - cy;
      if (dx * dx + dy * dy <= r2) {
        // alpha blend over
        const idx = (img.width * y + x) << 2;
        if (idx < 0 || idx + 3 >= img.data.length) continue;
        const a = alpha / 255;
        img.data[idx + 0] = Math.round(img.data[idx + 0] * (1 - a) + cr * a);
        img.data[idx + 1] = Math.round(img.data[idx + 1] * (1 - a) + cg * a);
        img.data[idx + 2] = Math.round(img.data[idx + 2] * (1 - a) + cb * a);
      }
    }
  }
}

function drawRect(img, x, y, w, h, color, alpha = 255) {
  const [cr, cg, cb] = typeof color === "string" ? hexToRgb(color) : color;
  const x0 = Math.max(0, Math.floor(x));
  const y0 = Math.max(0, Math.floor(y));
  const x1 = Math.min(img.width - 1, Math.ceil(x + w));
  const y1 = Math.min(img.height - 1, Math.ceil(y + h));
  for (let yy = y0; yy <= y1; yy++) {
    for (let xx = x0; xx <= x1; xx++) {
      const idx = (img.width * yy + xx) << 2;
      const a = alpha / 255;
      img.data[idx + 0] = Math.round(img.data[idx + 0] * (1 - a) + cr * a);
      img.data[idx + 1] = Math.round(img.data[idx + 1] * (1 - a) + cg * a);
      img.data[idx + 2] = Math.round(img.data[idx + 2] * (1 - a) + cb * a);
    }
  }
}

function addConfetti(img, count = 220) {
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * img.width);
    const y = Math.floor(Math.random() * img.height);
    const w = 4 + Math.floor(Math.random() * 10);
    const h = 2 + Math.floor(Math.random() * 4);
    const angle = Math.random() * Math.PI;
    const col = [
      [96, 165, 250],
      [253, 224, 71],
      [244, 114, 182],
      [52, 211, 153],
      [251, 146, 60],
      [167, 139, 250],
    ][i % 6];

    // tiny rotated rect approximation: draw a short line with thickness
    for (let t = 0; t < w; t++) {
      const xx = Math.round(x + Math.cos(angle) * t);
      const yy = Math.round(y + Math.sin(angle) * t);
      for (let ty = -Math.floor(h / 2); ty <= Math.floor(h / 2); ty++) {
        setPx(img, xx, yy + ty, col[0], col[1], col[2], 160);
      }
    }
  }
}

function writePng(file, img) {
  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(file);
    stream.on("finish", resolve);
    stream.on("error", reject);
    img.pack().pipe(stream);
  });
}

async function genServices() {
  const outDir = path.join(process.cwd(), "public", "services");
  ensureDir(outDir);

  const palettes = [
    ["#38BDF8", "#FDE047", "#FB7185"],
    ["#A78BFA", "#34D399", "#FDBA74"],
    ["#60A5FA", "#F472B6", "#FDE047"],
  ];

  for (let i = 0; i < 3; i++) {
    const img = new PNG({ width: 960, height: 600 });
    const pal = palettes[i];
    if (!pal) throw new Error(`Missing palette for service ${i + 1}`);
    const [a, b, c] = pal;
    fillGradient(img, a, b, c);
    addConfetti(img, 200);
    drawRect(img, 0, img.height - 80, img.width, 80, "#000000", 35);

    // icon silhouettes
    const cx = img.width / 2;
    const cy = img.height * 0.48;
    if (i === 0) {
      drawCircle(img, cx - 90, cy - 40, 52, "#FFFFFF", 170);
      drawCircle(img, cx, cy - 70, 46, "#FFFFFF", 150);
      drawCircle(img, cx + 96, cy - 30, 50, "#FFFFFF", 160);
    } else if (i === 1) {
      drawRect(img, cx - 130, cy + 40, 260, 36, "#111827", 35);
      drawRect(img, cx - 120, cy - 40, 200, 30, "#FFFFFF", 160);
      drawCircle(img, cx + 110, cy - 70, 26, "#FFFFFF", 140);
    } else {
      drawRect(img, cx - 140, cy + 50, 280, 20, "#111827", 30);
      for (let k = 0; k < 7; k++) {
        drawCircle(img, cx - 120 + k * 40, cy - 40 + (k % 2) * 14, 10, "#FFFFFF", 120);
      }
      drawRect(img, cx - 150, cy - 20, 300, 12, "#FFFFFF", 120);
    }

    const file = path.join(outDir, `service-0${i + 1}.png`);
    await writePng(file, img);
  }
}

async function genCharacters() {
  const outDir = path.join(process.cwd(), "public", "characters");
  ensureDir(outDir);

  const items = [
    { slug: "super-hero", pal: ["#60A5FA", "#FDE047", "#FB7185"] },
    { slug: "princess", pal: ["#F472B6", "#A78BFA", "#38BDF8"] },
    { slug: "pirate", pal: ["#34D399", "#60A5FA", "#FB923C"] },
    { slug: "unicorn", pal: ["#A78BFA", "#38BDF8", "#FDE047"] },
    { slug: "astronaut", pal: ["#60A5FA", "#22C55E", "#FDBA74"] },
    { slug: "clown", pal: ["#FB7185", "#60A5FA", "#FDE047"] },
    { slug: "fairy", pal: ["#A78BFA", "#F472B6", "#FDE047"] },
    { slug: "knight", pal: ["#38BDF8", "#34D399", "#FDBA74"] },
    { slug: "dinosaur", pal: ["#22C55E", "#FDE047", "#60A5FA"] },
  ];

  for (const it of items) {
    const img = new PNG({ width: 900, height: 1200 });
    fillGradient(img, it.pal[0], it.pal[1], it.pal[2]);
    addConfetti(img, 260);
    drawRect(img, 0, img.height - 120, img.width, 120, "#000000", 45);

    // silhouette
    const cx = img.width / 2;
    const headY = img.height * 0.33;
    drawCircle(img, cx, headY, 92, "#111827", 55);
    drawRect(img, cx - 180, headY + 80, 360, 420, "#111827", 55);

    // corner badge
    drawCircle(img, img.width * 0.16, img.height * 0.16, 70, "#FFFFFF", 200);
    drawCircle(img, img.width * 0.16, img.height * 0.16, 66, "#111827", 22);

    const file = path.join(outDir, `${it.slug}.png`);
    await writePng(file, img);
  }
}

async function genMoments() {
  const outDir = path.join(process.cwd(), "public", "moments");
  ensureDir(outDir);

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

  for (let i = 0; i < 8; i++) {
    const img = new PNG({ width: 900, height: 675 });
    const pal = palettes[i];
    if (!pal) throw new Error(`Missing palette for moment ${i + 1}`);
    fillGradient(img, pal[0], pal[1], pal[2]);
    addConfetti(img, 180);
    drawRect(img, 0, img.height - 90, img.width, 90, "#000000", 35);

    // "sparkle" blob
    drawCircle(img, img.width * 0.22, img.height * 0.32, 86, "#FFFFFF", 45);
    drawCircle(img, img.width * 0.78, img.height * 0.58, 112, "#FFFFFF", 35);

    const file = path.join(outDir, `moment-0${i + 1}.png`);
    await writePng(file, img);
  }
}

await genServices();
await genCharacters();
await genMoments();

console.log("Generated raster placeholders (PNG) into public/services, public/characters, public/moments");
