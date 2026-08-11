import sharp from "sharp";
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const RAW = "/tmp/scrape/raw";
const OUT = path.resolve("public/images");

// source file (in /tmp/scrape/raw) -> output slug
const MAP = {
  // buses
  "NS-832-RT.jpg": "fleet/ns-832-rt-1",
  "NS-832-RT-unutrasnjost-1.jpg": "fleet/ns-832-rt-2",
  "IMG-1131d61e509ab9db88fd7a8b222b3892-V.jpg": "fleet/zr-242-hr-1",
  "20250625_154619-scaled.jpg": "fleet/zr-242-hr-2",
  "20250605_143210-scaled.jpg": "fleet/zr-242-hr-3",
  "slika-1-NS-754-RT.jpg": "fleet/ns-754-rt-1",
  "slika-2-NS-754-RT.jpg": "fleet/ns-754-rt-2",
  "slika-4-NS-754-RT.jpg": "fleet/ns-754-rt-3",
  "NS-754-RT-632-spoljasnost.jpg": "fleet/ns-754-rt-4",
  "0-02-05-2e41dd500a4e1816e1fe4e857f95893ffb096b39cc77b4c00b14c58f69c09a93_942fcdfa.jpg":
    "fleet/ns-765-rt-1",
  "0-02-05-113ba1df4154be1e7f3dd5f73adf0e1b33112f0c082338f058ebd4c1b74150ab_899a3dce.jpg":
    "fleet/ns-765-rt-2",
  "NS-765-RT-prizemlje.jpg": "fleet/ns-765-rt-3",
  "NS-765-RT-sprat-1.jpg": "fleet/ns-765-rt-4",
  "NS-765-RT-slika-4-1.jpg": "fleet/ns-765-rt-5",
  "slika-NS-778-RT.jpg": "fleet/ns-778-rt-1",
  "NS-778-RT-slika-spoljasnost-2.jpg": "fleet/ns-778-rt-2",
  "slika-unutrasnjost-NS-778-RT.jpg": "fleet/ns-778-rt-3",
  "SLIKA-1-spoljasnost-NS-785-RT.jpg": "fleet/ns-785-rt-1",
  "SLIKA-2-spoljasnost-NS-785-RT.jpg": "fleet/ns-785-rt-2",
  "SLIKA-3-spoljasnost-NS-785-RT.jpg": "fleet/ns-785-rt-3",
  "NS-785-RT-unutrasnjost.jpg": "fleet/ns-785-rt-4",
  // minibuses
  "SPRINTER-519-sl1-3.jpg": "fleet/ns-837-kl-1",
  "SPRINTER-519-SL-4-1.jpg": "fleet/ns-837-kl-2",
  "SPRINTER-519-unutr-2-1.jpg": "fleet/ns-837-kl-3",
  "NS-858-RT-slika-1-1.jpg": "fleet/ns-858-rt-1",
  "NS-858-RT-unutr-1.jpg": "fleet/ns-858-rt-2",
  "NS-861-RT-slika-1-1.jpg": "fleet/ns-861-rt-1",
  "NS-861-RT-slika-3-1-scaled.jpg": "fleet/ns-861-rt-2",
  // hero / backgrounds / category art
  "bus.png": "hero/bus",
  "kombi.png": "hero/kombi",
  "auto.png": "hero/auto",
  "SPRINTER-519-sl1-2.jpg": "hero/minibus-wide",
  "PROFILNA-2-1-1-scaled.jpg": "hero/profilna-wide",
  "SPRINTER-519-slika-2-1.jpg": "hero/sprinter-wide",
  "PROFILNA-4-1.jpg": "misc/profilna-square",
  "PROFILNA-1-1-1.jpg": "misc/profilna-alt",
};

const WIDTHS = [640, 1024, 1600];

async function run() {
  const files = await readdir(RAW);
  let done = 0;
  for (const file of files) {
    const slug = MAP[file];
    if (!slug) {
      console.log("skip (unmapped):", file);
      continue;
    }
    const dest = path.join(OUT, slug);
    await mkdir(path.dirname(dest), { recursive: true });

    const input = path.join(RAW, file);
    const meta = await sharp(input).metadata();
    const hasAlpha = Boolean(meta.hasAlpha);

    // Every width is always emitted (never upscaled) so that a `-1600.webp`
    // reference resolves even when the source is narrower than 1600px.
    for (const w of WIDTHS) {
      const pipeline = sharp(input)
        .rotate()
        .resize({ width: w, withoutEnlargement: true });
      await pipeline
        .clone()
        .webp({ quality: 78, effort: 6, alphaQuality: 90 })
        .toFile(`${dest}-${w}.webp`);
    }

    // tiny blurred placeholder, inlined later as base64 if needed
    await sharp(input)
      .rotate()
      .resize({ width: 20 })
      .webp({ quality: 40 })
      .toFile(`${dest}-blur.webp`);

    console.log(
      `${file} -> ${slug} (${meta.width}x${meta.height}${hasAlpha ? ", alpha" : ""})`
    );
    done++;
  }
  console.log(`\nProcessed ${done} images.`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
