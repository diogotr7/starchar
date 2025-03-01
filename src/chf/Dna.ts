import { BufferReader } from "../utils/BufferReader";
import { BufferWriter } from "../utils/BufferWriter";
import { fromHexStr, toHexStr } from "../utils/hexString";
import type { BodyType } from "./BodyType";

const dnaSize = 0xd8;
const partCount = 12 * 4;
const idxPartRecord: Record<number, DnaFacePart> = {
  0: "eyebrowLeft",
  1: "eyebrowRight",
  2: "eyeLeft",
  3: "eyeRight",
  4: "nose",
  5: "earLeft",
  6: "earRight",
  7: "cheekLeft",
  8: "cheekRight",
  9: "mouth",
  10: "jaw",
  11: "crown",
};

export type DnaFacePart =
  | "eyebrowLeft"
  | "eyebrowRight"
  | "eyeLeft"
  | "eyeRight"
  | "nose"
  | "earLeft"
  | "earRight"
  | "cheekLeft"
  | "cheekRight"
  | "mouth"
  | "jaw"
  | "crown";

export interface DnaBlend {
  headId: number;
  value: number;
}

export interface DnaBlends {
  eyebrowLeft: DnaBlend[];
  eyebrowRight: DnaBlend[];
  eyeLeft: DnaBlend[];
  eyeRight: DnaBlend[];
  nose: DnaBlend[];
  earLeft: DnaBlend[];
  earRight: DnaBlend[];
  cheekLeft: DnaBlend[];
  cheekRight: DnaBlend[];
  mouth: DnaBlend[];
  jaw: DnaBlend[];
  crown: DnaBlend[];
}

export interface Dna {
  highestHeadId: number;
  blends: DnaBlends;
}

export function readDna(parentReader: BufferReader): Dna {
  parentReader.expectUint64(dnaSize);

  const bytes = parentReader.readBytes(dnaSize);
  const dnaString = toHexStr(bytes);

  return dnaFromString(dnaString);
}

export function writeDna(writer: BufferWriter, dna: Dna, bodyType: BodyType) {
  const isMale = bodyType === "male";
  writer.writeUint64(dnaSize);

  writer.writeUint32(0xfcd09394);
  writer.writeUint32(isMale ? 0xdd6c67f6 : 0x9ef4eb54);
  writer.writeUint32(isMale ? 0x65e740d3 : 0x65d75204);
  writer.writeUint32(0);
  writer.writeByte(0x0c);
  writer.writeByte(0x0);
  writer.writeByte(0x04);
  writer.writeByte(0x0);
  writer.writeByte(0x4);
  writer.writeByte(0x0);
  writer.writeUint16(dna.highestHeadId);

  for (let i = 0; i < partCount; i++) {
    const blends = dna.blends[idxPartRecord[i % 12]];
    const blend = blends[Math.floor(i / 12)];

    writer.writeUint16(Math.floor(blend.value));
    writer.writeByte(blend.headId);
    writer.writeByte(0);
  }
}

export function dnaFromString(dnaString: string): Dna {
  if (dnaString.length !== dnaSize * 2) {
    throw new Error("Invalid dna string length");
  }

  const reader = new BufferReader(fromHexStr(dnaString).buffer);
  reader.expectUint32(0xfcd09394);
  reader.readUint32(); // skip keys. bad idea?
  reader.readUint32();
  reader.expectUint32(0);
  reader.expectByte(0x0c);
  reader.expectByte(0x0);
  reader.expectByte(0x04);
  reader.expectByte(0x0);
  reader.expectByte(0x4);
  reader.expectByte(0x0);
  const childCount = reader.readUint16();

  const blends: DnaBlends = {
    eyebrowLeft: [],
    eyebrowRight: [],
    eyeLeft: [],
    eyeRight: [],
    nose: [],
    earLeft: [],
    earRight: [],
    cheekLeft: [],
    cheekRight: [],
    mouth: [],
    jaw: [],
    crown: [],
  };

  for (let i = 0; i < partCount; i++) {
    const part = i % 12;
    const value = reader.readUint16();
    const headId = reader.readByte();
    reader.expectByte(0);

    // hacky but at least it won't break my shitty ui /shrug
    blends[idxPartRecord[part]].push({ headId, value: Math.max(value, 1) });
  }

  console.log("asdas", childCount);

  return {
    highestHeadId: childCount,
    blends,
  };
}

export function dnaFromStringOld(dnaString: string, bodyType: BodyType): Dna {
  if (dnaString.length !== 384) {
    throw new Error("Invalid dna string length");
  }

  const reader = new BufferReader(fromHexStr(dnaString).buffer);
  console.log(reader.view.buffer);

  const blends: DnaBlends = {
    eyebrowLeft: [],
    eyebrowRight: [],
    eyeLeft: [],
    eyeRight: [],
    nose: [],
    earLeft: [],
    earRight: [],
    cheekLeft: [],
    cheekRight: [],
    mouth: [],
    jaw: [],
    crown: [],
  };

  const maxHeadId = maxHeadIdForBodyType(bodyType);

  for (let i = 0; i < partCount; i++) {
    const part = i % 12;
    const headId = reader.readUint16Be();
    const value = reader.readUint16Be();

    if (headId > maxHeadId) {
      throw new Error("Invalid head id");
    }

    // hacky but at least it won't break my shitty ui /shrug
    blends[idxPartRecord[part]].push({ headId, value: Math.max(value, 1) });
  }

  let highestHeadId = 0;
  // find the highest head id where the part is not 0
  for (const [_, bodyPart] of Object.entries(blends)) {
    for (const blend of bodyPart) {
      if (blend.value > 0) {
        highestHeadId = Math.max(highestHeadId, blend.headId);
      }
    }
  }

  return {
    highestHeadId,
    blends,
  };
}

export function dnaToString(dna: Dna, bodyType: BodyType): string {
  const buffer = new ArrayBuffer(dnaSize + 8);
  const writer = new BufferWriter(buffer);

  writeDna(writer, dna, bodyType);

  // slice skips dnaSize
  return toHexStr(new Uint8Array(buffer).slice(8));
}

export function getRandDna(bodyType: BodyType): Dna {
  const dna: Dna = {
    highestHeadId: 0,
    blends: {
      eyebrowLeft: [],
      eyebrowRight: [],
      eyeLeft: [],
      eyeRight: [],
      nose: [],
      earLeft: [],
      earRight: [],
      cheekLeft: [],
      cheekRight: [],
      mouth: [],
      jaw: [],
      crown: [],
    },
  };

  for (let i = 0; i < partCount; i++) {
    const part = i % 12;
    const blends = dna.blends[idxPartRecord[part]];

    const max = 65534;
    const r1 = randombetween(1, max - 3);
    const r2 = randombetween(1, max - 2 - r1);
    const r3 = randombetween(1, max - 1 - r1 - r2);
    const r4 = max - r1 - r2 - r3;

    const values = [r1, r2, r3, r4];
    const headIds = Array.from(
      { length: maxHeadIdForBodyType(bodyType) },
      (_, i) => i
    );
    shuffle(headIds);

    for (let j = 0; j < 4; j++) {
      blends.push({ headId: headIds[j], value: values[j] });
    }
  }

  return dna;
}

export function getFaceDna(faceId: number): Dna {
  const dna: Dna = {
    highestHeadId: 0,
    blends: {
      eyebrowLeft: [],
      eyebrowRight: [],
      eyeLeft: [],
      eyeRight: [],
      nose: [],
      earLeft: [],
      earRight: [],
      cheekLeft: [],
      cheekRight: [],
      mouth: [],
      jaw: [],
      crown: [],
    },
  };

  for (let i = 0; i < partCount; i++) {
    const part = i % 12;
    const blends = dna.blends[idxPartRecord[part]];

    const values = [65534, 0, 0, 0];
    const headIds = [faceId, 0, 0, 0];

    for (let j = 0; j < 4; j++) {
      blends.push({ headId: headIds[j], value: values[j] });
    }
  }

  return dna;
}

function randombetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffle(array: number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export function maxHeadIdForBodyType(bodyType: BodyType) {
  return bodyType === "male" ? 34 : 43;
}
