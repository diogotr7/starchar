import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { type HsvColor, colord } from "colord";
import { readCharacter } from "../chf/Character";
import { extractChf } from "../chf/ChfFile";
import { downloadedDir, scratchDir } from "../paths";

interface ColorInfo {
  hsvColor: HsvColor;
  rgbColor: string;
  colorname: string;
}

interface Item {
  filename: string;
  eyeColors: ColorInfo;
  limbColors: ColorInfo;
}

const testFiles = readdirSync(downloadedDir, { withFileTypes: true })
  .filter((f) => f.isFile())
  .map((f) => f.name);

const desmosRgb: string[] = [];
const desmosHsv: string[] = [];

const items: Item[] = [];

for (const file of testFiles) {
  const buffer = readFileSync(path.join(downloadedDir, file));
  const c = readCharacter(extractChf(new Uint8Array(buffer)));

  const body = colord(c.bodyMaterial.limbColor);
  const bodyHsv = body.toHsv();
  const bodyRgb = body.toRgb();

  const eye = colord(c.eyeMaterial.colors.color1!);
  const eyeRgb = eye.toRgb();
  const eyeHsv = eye.toHsv();

  items.push({
    filename: file,
    eyeColors: {
      hsvColor: eyeHsv,
      rgbColor: c.eyeMaterial.colors.color1!,
      colorname: "eye",
    },
    limbColors: {
      hsvColor: bodyHsv,
      rgbColor: c.bodyMaterial.limbColor,
      colorname: "limb",
    },
  });

  desmosRgb.push(`(${eyeRgb.r}, ${eyeRgb.g}, ${eyeRgb.b})`);
  desmosRgb.push(`(${bodyRgb.r}, ${bodyRgb.g}, ${bodyRgb.b})`);

  desmosHsv.push(`(${eyeHsv.h}, ${eyeHsv.s}, ${eyeHsv.v})`);
  desmosHsv.push(`(${bodyHsv.h}, ${bodyHsv.s}, ${bodyHsv.v})`);
}

writeFileSync(path.join(scratchDir, "items.js"), `const items = ${JSON.stringify(items, null, 2)}`);

writeFileSync(path.join(scratchDir, "desmosRgb.txt"), desmosRgb.join("\n"));
writeFileSync(path.join(scratchDir, "desmosHsv.txt"), desmosHsv.join("\n"));
