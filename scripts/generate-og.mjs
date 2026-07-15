// Generates public/og-image.png (1200x630) from the brand palette + logo.
// Run: node scripts/generate-og.mjs
import sharp from "sharp";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const logoB64 = readFileSync(join(root, "src/assets/logo.png")).toString("base64");

const dots = [];
for (let x = 40; x < 1200; x += 44) {
  for (let y = 40; y < 630; y += 44) {
    dots.push(`<circle cx="${x}" cy="${y}" r="1.4" fill="rgba(159,225,203,0.10)"/>`);
  }
}

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#062e2e"/>
      <stop offset="50%" stop-color="#0d4a4a"/>
      <stop offset="100%" stop-color="#1a7a6e"/>
    </linearGradient>
    <linearGradient id="mint" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#9FE1CB"/>
      <stop offset="100%" stop-color="#5DCAA5"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1d9e75" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#1d9e75" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1050" cy="80" r="380" fill="url(#glow)"/>
  <circle cx="120" cy="580" r="300" fill="url(#glow)"/>
  ${dots.join("")}

  <image href="data:image/png;base64,${logoB64}" x="80" y="96" width="96" height="96"/>

  <text x="80" y="290" font-family="Helvetica, Arial, sans-serif" font-weight="bold" font-size="64" fill="#ffffff">Start Your Florida Company</text>
  <text x="80" y="370" font-family="Helvetica, Arial, sans-serif" font-weight="bold" font-size="64" fill="url(#mint)">in 3 Easy Steps</text>

  <text x="80" y="446" font-family="Helvetica, Arial, sans-serif" font-size="28" fill="rgba(255,255,255,0.75)">LLC · EIN · ITIN without mailing your passport</text>

  <rect x="80" y="496" rx="24" ry="24" width="340" height="48" fill="rgba(255,255,255,0.08)" stroke="rgba(93,202,165,0.45)"/>
  <circle cx="112" cy="520" r="7" fill="#5DCAA5"/>
  <text x="132" y="529" font-family="Helvetica, Arial, sans-serif" font-weight="bold" font-size="22" fill="#9FE1CB">gazzolasolutions.com</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(join(root, "public/og-image.png"));
console.log("✓ public/og-image.png generated");
