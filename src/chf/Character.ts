import { BufferReader } from "../utils/BufferReader";
import type { BufferWriter } from "../utils/BufferWriter";
import type { Body } from "./Body";
import { readBody, writeBody } from "./Body";
import type { BodyMaterial } from "./BodyMaterial";
import { readBodyMaterial, writeBodyMaterial } from "./BodyMaterial";
import { type BodyType, readBodyType, writeBodyType } from "./BodyType";
import type { Dna } from "./Dna";
import { readDna, writeDna } from "./Dna";
import type { Dye } from "./Dye";
import { dyeKeys, readDye, writeDye } from "./Dye";
import type { EyeMaterial } from "./EyeMaterial";
import { readEyeMaterial, writeEyeMaterial } from "./EyeMaterial";
import type { FaceMaterial } from "./FaceMaterial";
import { readFaceMaterial, writeFaceMaterial } from "./FaceMaterial";
import type { HeadMaterial } from "./HeadMaterial";
import { readHeadMaterial, writeHeadMaterial } from "./HeadMaterial";

export interface Character {
  count: number;
  bodyType: BodyType;
  dna: Dna;
  body: Body;
  headMaterial: HeadMaterial;
  faceMaterial: FaceMaterial;
  dyes: Dye[];
  eyeMaterial: EyeMaterial;
  bodyMaterial: BodyMaterial;
}

export function readCharacter(bytes: Uint8Array): Character {
  const reader = new BufferReader(bytes.buffer);
  reader.expectUint32(2);
  reader.expectUint32(7);
  const bodyType = readBodyType(reader);
  const dna = readDna(reader);
  const count = reader.readUint64();

  let body = undefined;
  let headMaterial = undefined;
  let faceMaterial = undefined;
  let eyeMaterial = undefined;
  let bodyMaterial = undefined;
  const dyes: Dye[] = [];

  while (reader.offset < reader.view.byteLength) {
    const key = reader.peekUint32();

    if (key === 0xab6341ac) {
      body = readBody(reader);
    } else if (key === 0xa98beb34) {
      headMaterial = readHeadMaterial(reader);
    } else if (key === 0xa047885e) {
      eyeMaterial = readEyeMaterial(reader);
    } else if (key === 0x27424d58) {
      bodyMaterial = readBodyMaterial(reader);
    } else if (key === 0x72129e8e || key == 0xa5378a05) {
      faceMaterial = readFaceMaterial(reader, headMaterial!.materialType);
    } else if (dyeKeys.includes(key)) {
      dyes.push(readDye(reader));
    } else {
      throw new Error(`Unknown key: ${key.toString(16)}`);
    }
  }

  if (reader.offset !== reader.view.byteLength) {
    throw new Error("Character buffer not fully read");
  }

  if (!body) throw new Error("Missing body");
  if (!headMaterial) throw new Error("Missing head material");
  if (!faceMaterial) throw new Error("Missing face material");
  if (!eyeMaterial) throw new Error("Missing eye material");
  if (!bodyMaterial) throw new Error("Missing body material");

  return {
    count,
    bodyType,
    dna,
    body,
    headMaterial,
    faceMaterial,
    dyes,
    eyeMaterial,
    bodyMaterial,
  };
}

export function writeCharacter(writer: BufferWriter, character: Character) {
  writer.writeUint32(2);
  writer.writeUint32(7);
  writeBodyType(writer, character.bodyType);
  writeDna(writer, character.dna, character.bodyType);
  writer.writeUint64(character.count);
  writeBody(writer, character.body);
  writeHeadMaterial(writer, character.headMaterial);
  writeFaceMaterial(
    writer,
    character.faceMaterial,
    character.headMaterial.materialType
  );
  for (const dye of character.dyes) {
    writeDye(writer, dye);
  }
  writeEyeMaterial(writer, character.eyeMaterial);
  writeBodyMaterial(writer, character.bodyMaterial, character.bodyType);
}
