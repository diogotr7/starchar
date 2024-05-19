import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { HsvColor } from "colord";
import { colord } from "colord";
import { readCharacter } from "../chf/Character";
import { createChf, extractChf } from "../chf/ChfFile";
import { defaultF, eyesDir } from "../paths";

const zeroPad = (num: number, places: number) => String(num).padStart(places, "0");

const buffer = readFileSync(defaultF);

const char = readCharacter(extractChf(new Uint8Array(buffer)));

for (let hue = 0; hue < 360; hue += 1) {
  const c: HsvColor = { h: hue, s: 100, v: 100 };
  const newChar = {
    ...char,
    eyeMaterial: { colors: { color1: colord(c).toHex() } },
  };
  const newChf = createChf(newChar);
  writeFileSync(path.join(eyesDir, `eye-${zeroPad(hue, 3)}-in.chf`), new Uint8Array(newChf));

  console.log(`eye-${zeroPad(hue, 3)}-in.chf`);
}

// top left:   #6d2000 = 018°, 100%, 43% =
// mid left:   #441500 = 019°, 100%, 27% =
// bot left:   #200b00 = 021°, 100%, 13% =

// mid q1:     #523000 = 035°, 100%, 32%

// top middle: #6b8249 = 084°, 044%, 51% =
// mid middle: #425431 = 091°, 042%, 33% =
// bot middle: #1b2818 = 109°, 040%, 16% =

// top right:  #99bae4 = 214°, 033%, 89% =
// mid right:  #637da5 = 216°, 040%, 65% =
// bot right:  #313b53 = 222°, 041%, 33% =
