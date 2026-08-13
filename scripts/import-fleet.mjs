import sharp from "sharp";
import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const SRC = process.env.FLEET_SRC ?? "/Users/miljanvajagic/rental-travel-images";
const OUT = path.resolve("public/images/fleet");

// Source folder -> plate slug. Folder names carry the authoritative plate, so
// they win over the SEO-style file names inside (several are mislabelled).
const FOLDERS = {
  "VDL SINERGY NS765": "ns-765-rt",
  "VDL MAGIQ NS754": "ns-754-rt",
  "VDL BERKHOF NS832": "ns-832-rt",
  "VAN HOOL NS868": "ns-868-rt",
  "VDL JONCKHEERE  NS778": "ns-778-rt",
  "VDL JONCKHEERE  NS785": "ns-785-rt",
  "Mercedes NS858": "ns-858-rt",
  "mercedes NS861": "ns-861-rt",
  "mercedes NS871": "ns-871-rt",
};

const WIDTHS = [640, 1024, 1600];
const MAX_PER_VEHICLE = 12;

async function variants(input, dest) {
  for (const width of WIDTHS) {
    await sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(`${dest}-${width}.webp`);
  }
  await sharp(input)
    .rotate()
    .resize({ width: 20 })
    .webp({ quality: 40 })
    .toFile(`${dest}-blur.webp`);
}

async function run() {
  await mkdir(OUT, { recursive: true });
  const manifest = {};

  for (const [folder, slug] of Object.entries(FOLDERS)) {
    const dir = path.join(SRC, folder);
    const names = (await readdir(dir)).filter((n) => /\.(jpe?g|png)$/i.test(n));

    const seen = new Set();
    const candidates = [];

    for (const name of names.sort()) {
      const file = path.join(dir, name);
      const digest = createHash("md5").update(await readFile(file)).digest("hex");
      if (seen.has(digest)) {
        console.log(`  dup  ${name}`);
        continue;
      }
      seen.add(digest);

      // `rotate()` applies EXIF orientation, so read dimensions the same way.
      const meta = await sharp(file).rotate().metadata();
      candidates.push({ file, name, width: meta.width, height: meta.height });
    }

    // Landscape shots first: card covers are 4:3, so portraits crop badly there.
    candidates.sort((a, b) => {
      const aLandscape = a.width >= a.height ? 0 : 1;
      const bLandscape = b.width >= b.height ? 0 : 1;
      return aLandscape - bLandscape || a.name.localeCompare(b.name);
    });

    const picked = candidates.slice(0, MAX_PER_VEHICLE);
    console.log(`\n${folder} -> ${slug} (${picked.length}/${names.length})`);

    manifest[slug] = [];
    for (const [index, image] of picked.entries()) {
      const dest = path.join(OUT, `${slug}-${index + 1}`);
      await variants(image.file, dest);
      manifest[slug].push(`/images/fleet/${slug}-${index + 1}`);
      console.log(
        `  ${String(index + 1).padStart(2)} ${image.width}x${image.height}  ${image.name}`
      );
    }
  }

  await writeFile(
    path.resolve("scripts/fleet-manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`
  );
  console.log("\nWrote scripts/fleet-manifest.json");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
