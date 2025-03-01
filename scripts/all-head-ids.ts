import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { readCharacter } from "../src/chf/Character";
import { createChf, extractChf } from "../src/chf/ChfFile";
import { getFaceDna, maxHeadIdForBodyType } from "../src/chf/Dna";
import { defaultF, defaultM, headsDir } from "./paths";

const zeroPad = (num: number, places: number) => String(num).padStart(places, "0");

const charF = readCharacter(extractChf(new Uint8Array(readFileSync(defaultF))));
const charM = readCharacter(extractChf(new Uint8Array(readFileSync(defaultM))));

const fHeadMax = maxHeadIdForBodyType(charF.bodyType);
const mHeadMax = maxHeadIdForBodyType(charM.bodyType);

for (let i = 0; i <= fHeadMax; i++) {
  const headId = zeroPad(i, 3);
  const headF = path.join(headsDir, `f_head${headId}.chf`);
  const dna = getFaceDna(i);

  const c = {
    ...charF,
    dna,
  };

  writeFileSync(headF, new Uint8Array(createChf(c)));
}

for (let i = 0; i <= mHeadMax; i++) {
  const headId = zeroPad(i, 3);
  const headM = path.join(headsDir, `m_head${headId}.chf`);
  const dna = getFaceDna(i);

  const c = {
    ...charM,
    dna,
  };

  writeFileSync(headM, new Uint8Array(createChf(c)));
}
