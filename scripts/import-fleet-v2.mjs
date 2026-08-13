import sharp from "sharp";
import { createHash } from "node:crypto";
import { mkdir, readdir, readFile } from "node:fs/promises";
import path from "node:path";

const SRC = process.env.FLEET_SRC ?? "/Users/miljanvajagic/rental-travel-images-v2";

// Folder -> output slug. Photos are numbered by file name, so the indices in
// `site.ts` line up with the sorted listing this script prints. `from` keeps
// numbering clear of photos a vehicle already has, and `only` limits the import
// to the file names listed (the rest were already imported earlier).
const FLEET = {
  "NS 878-RT dabldeker": { slug: "ns-878-rt" },
  "NS 915-RT dabldeker ": { slug: "ns-915-rt" },
  "NS 884-RT bus ": { slug: "ns-884-rt" },
  "NS 890-RT kombi ": { slug: "ns-890-rt" },
  "NS 868-RT bus ": {
    slug: "ns-868-rt",
    from: 7,
    only: ["20260310_220343.jpg", "20260408_084907.jpg"],
  },
  skudo: { slug: "fiat-scudo" },
};

// Shots of the whole fleet, used by the home page carousel.
const SHARED = { folder: "zajednicke", slug: "zajednicke" };

const FLEET_WIDTHS = [640, 1024, 1600];
// The carousel is full-bleed, so it also needs the largest device size.
const HERO_WIDTHS = [640, 1024, 1600, 1920];

async function variants(input, dest, widths) {
  for (const width of widths) {
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

async function images(folder) {
  const dir = path.join(SRC, folder);
  const names = (await readdir(dir))
    .filter((name) => /\.(jpe?g|png)$/i.test(name))
    .sort();

  const seen = new Set();
  const picked = [];

  for (const name of names) {
    const file = path.join(dir, name);
    const digest = createHash("md5").update(await readFile(file)).digest("hex");
    if (seen.has(digest)) {
      console.log(`  dup  ${name}`);
      continue;
    }
    seen.add(digest);
    picked.push({ file, name });
  }

  return picked;
}

async function run() {
  const fleetOut = path.resolve("public/images/fleet");
  const heroOut = path.resolve("public/images/hero");
  await mkdir(fleetOut, { recursive: true });
  await mkdir(heroOut, { recursive: true });

  for (const [folder, { slug, from = 1, only }] of Object.entries(FLEET)) {
    const all = await images(folder);
    const picked = only ? all.filter((image) => only.includes(image.name)) : all;
    console.log(`\n${folder.trim()} -> ${slug}`);

    for (const [index, image] of picked.entries()) {
      const dest = path.join(fleetOut, `${slug}-${index + from}`);
      await variants(image.file, dest, FLEET_WIDTHS);
      console.log(`  ${String(index + from).padStart(2)}  ${image.name}`);
    }
  }

  const shared = await images(SHARED.folder);
  console.log(`\n${SHARED.folder} -> hero/${SHARED.slug}`);
  for (const [index, image] of shared.entries()) {
    const dest = path.join(heroOut, `${SHARED.slug}-${index + 1}`);
    await variants(image.file, dest, HERO_WIDTHS);
    console.log(`  ${index + 1} ${image.name}`);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
