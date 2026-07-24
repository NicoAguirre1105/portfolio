import sharp from "sharp";
import { writeFileSync } from "node:fs";

async function onWhite(svgPath, { canvasW, canvasH, paddingRatio }) {
  const innerW = Math.round(canvasW * (1 - paddingRatio));
  const innerH = Math.round(canvasH * (1 - paddingRatio));
  const logo = await sharp(svgPath, { density: 600 })
    .resize({ width: innerW, height: innerH, fit: "inside" })
    .png()
    .toBuffer();
  return sharp({
    create: {
      width: canvasW,
      height: canvasH,
      channels: 4,
      background: "#ffffff",
    },
  })
    .composite([{ input: logo, gravity: "center" }])
    .flatten({ background: "#ffffff" })
    .png()
    .toBuffer();
}

function buildIco(pngBuffers) {
  // ICO container: 6-byte header + 16-byte directory entry per image + raw PNG data.
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  const dirSize = 16 * count;
  let offset = 6 + dirSize;
  const dirEntries = [];
  for (const { size, buf } of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(buf.length, 8);
    entry.writeUInt32LE(offset, 12);
    dirEntries.push(entry);
    offset += buf.length;
  }
  return Buffer.concat([header, ...dirEntries, ...pngBuffers.map((p) => p.buf)]);
}

async function main() {
  const logo = "public/logos/logo.svg";
  const logoLarge = "public/logos/logo_large.svg";

  const icon512 = await onWhite(logo, { canvasW: 512, canvasH: 512, paddingRatio: 0.22 });
  writeFileSync("app/icon.png", icon512);

  const appleIcon = await onWhite(logo, { canvasW: 180, canvasH: 180, paddingRatio: 0.18 });
  writeFileSync("app/apple-icon.png", appleIcon);

  const icoSizes = [16, 32, 48];
  const icoBuffers = [];
  for (const size of icoSizes) {
    const buf = await onWhite(logo, { canvasW: size, canvasH: size, paddingRatio: 0.16 });
    icoBuffers.push({ size, buf });
  }
  writeFileSync("app/favicon.ico", buildIco(icoBuffers));

  const og = await onWhite(logoLarge, { canvasW: 1200, canvasH: 630, paddingRatio: 0.3 });
  writeFileSync("app/opengraph-image.png", og);
  writeFileSync("app/twitter-image.png", og);

  console.log("Done: icon.png, apple-icon.png, favicon.ico, opengraph-image.png, twitter-image.png");
}

main();
