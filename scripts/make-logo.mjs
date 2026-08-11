import sharp from "sharp";

const SRC = "assets/logo-source.png";
const BG = [10, 17, 35];
// distance from the flat navy backdrop above which a pixel is considered logo art
const TOLERANCE = 46;

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const out = Buffer.alloc(info.width * info.height * 4);
const brand = new Map();

for (let i = 0, o = 0; i < data.length; i += info.channels, o += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const dist = Math.hypot(r - BG[0], g - BG[1], b - BG[2]);

  out[o] = r;
  out[o + 1] = g;
  out[o + 2] = b;
  // soft edge so anti-aliased pixels fade instead of stair-stepping
  out[o + 3] = Math.max(0, Math.min(255, Math.round(((dist - 14) / TOLERANCE) * 255)));

  if (dist > 90 && (r > 90 || b > 90)) {
    const key = `${Math.round(r / 24) * 24},${Math.round(g / 24) * 24},${Math.round(b / 24) * 24}`;
    brand.set(key, (brand.get(key) ?? 0) + 1);
  }
}

const base = sharp(out, {
  raw: { width: info.width, height: info.height, channels: 4 },
}).trim({ threshold: 1 });

await base.clone().png({ compressionLevel: 9 }).toFile("public/images/logo.png");
await base
  .clone()
  .resize({ width: 560, withoutEnlargement: true })
  .webp({ quality: 92, alphaQuality: 100 })
  .toFile("public/images/logo.webp");
await base
  .clone()
  .resize({ width: 280, withoutEnlargement: true })
  .webp({ quality: 92, alphaQuality: 100 })
  .toFile("public/images/logo-sm.webp");

const meta = await sharp("public/images/logo.png").metadata();
console.log("logo.png", meta.width, "x", meta.height);
console.log(
  "dominant brand colors:",
  [...brand.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([k, v]) => {
      const [r, g, b] = k.split(",").map(Number);
      return `#${[r, g, b].map((n) => Math.min(255, n).toString(16).padStart(2, "0")).join("")} (${v})`;
    })
);
