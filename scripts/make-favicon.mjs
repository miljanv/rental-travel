import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const SRC = path.resolve("public/images/logo.png");
const INK = { r: 12, g: 19, b: 21, alpha: 255 };

/**
 * The wordmark is unreadable at 16px, so the favicon is the stylized R plus
 * the red/blue stripe that sits in its bowl.
 */
const MARK = { left: 0, top: 0, width: 165, height: 222 };

async function tile(size, { radius = 0 } = {}) {
  const cropped = await sharp(SRC).extract(MARK).png().toBuffer();
  const mark = await sharp(cropped).trim({ threshold: 8 }).toBuffer();

  const padded = Math.round(size * 0.72);
  const resized = await sharp(mark)
    .resize({
      width: padded,
      height: padded,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .toBuffer();

  const canvas = sharp({
    create: { width: size, height: size, channels: 4, background: INK },
  });

  if (radius > 0) {
    const r = Math.round(radius);
    const svg = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
        <rect width="${size}" height="${size}" rx="${r}" ry="${r}" fill="#0c1315"/>
      </svg>`
    );
    return sharp(svg)
      .composite([{ input: resized, gravity: "centre" }])
      .png();
  }

  return canvas.composite([{ input: resized, gravity: "centre" }]).png();
}

function ico(images) {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  const entries = [];
  const payloads = [];
  let offset = 6 + 16 * count;

  for (const { png, width, height } of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(width >= 256 ? 0 : width, 0);
    entry.writeUInt8(height >= 256 ? 0 : height, 1);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    payloads.push(png);
    offset += png.length;
  }

  return Buffer.concat([header, ...entries, ...payloads]);
}

const png16 = await (await tile(16)).toBuffer();
const png32 = await (await tile(32)).toBuffer();
const png180 = await (await tile(180)).toBuffer();

await writeFile("src/app/favicon.ico", ico([
  { png: png16, width: 16, height: 16 },
  { png: png32, width: 32, height: 32 },
]));
await writeFile("src/app/icon.png", png32);
await writeFile("src/app/apple-icon.png", png180);

console.log("wrote src/app/favicon.ico, src/app/icon.png, src/app/apple-icon.png");
