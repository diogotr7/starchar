import { BufferReader } from "../BufferReader";
import { Body, readBody } from "./Body";
import { readDye } from "./Dye";
import { FaceMaterial, readFaceMaterial } from "./FaceMaterial";
import { HeadMaterial, readHeadMaterial } from "./HeadMaterial";

export function toHexString(byteArray: Uint8Array) {
  return Array.from(byteArray, function (byte) {
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("");
}

type BodyType = "male" | "female";

export type Character = {
  bodyType: BodyType;
  dna: string;
  body: Body;
  headMaterial: HeadMaterial;
  faceMaterial: FaceMaterial;
};

export function readCharacter(bytes: Uint8Array): Character {
  const reader = new BufferReader(bytes.buffer);
  reader.expectUint32(2);
  reader.expectUint32(7);
  const bodyTypeGuid = reader.readGuid();
  reader.expectEmptyGuid();
  reader.expectUint64(0xd8);
  const dnaBytes = reader.readBytes(0xd8);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  reader.readUint64();
  const body = readBody(reader);
  const headMaterial = readHeadMaterial(reader);
  const faceMaterial = readFaceMaterial(reader, headMaterial.materialType);

  const dyes = [];
  while (reader.peekUint32() != 0xa047885e) {
    dyes.push(readDye(reader));
  }

  return {
    bodyType: readBodyType(bodyTypeGuid),
    dna: toHexString(dnaBytes),
    body,
    headMaterial,
    faceMaterial,
  };
}

function readBodyType(guid: string): BodyType {
  if (guid === "25f439d5-146b-4a61-a999-a486dfb68a49") return "male";
  if (guid === "d0794a94-efb0-4cad-ad38-2558b4d3c253") return "female";
  throw new Error(`Unknown body type: ${guid}`);
}
