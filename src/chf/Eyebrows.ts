import type { BufferReader } from "../BufferReader";
import type { BufferWriter } from "../BufferWriter";

export type EyebrowType = "None" | "Brows01" | "Brows02" | "Brows03" | "Brows04" | "Brows05" | "Brows06";

const eyebrowTypeMap: Record<string, EyebrowType> = {
  "89ec0bbc-7daf-4b09-a98d-f8dd8df32305": "Brows01",
  "c40183e4-659c-4e4e-8f96-70b33a3b9d67": "Brows02",
  "6606176a-bfc4-4d24-a40a-b554fcfb8c7e": "Brows03",
  "41a65deb-4a4c-425c-8825-e6d264ecdd4b": "Brows04",
  "a074880a-6df2-4996-89e2-3e204a2790c2": "Brows05",
  "03270dfe-71be-45ee-b51a-fb1dd7e67ba1": "Brows06",
};

const reverseEyebrowTypeMap = Object.fromEntries(Object.entries(eyebrowTypeMap).map(([key, value]) => [value, key]));

export interface Eyebrows {
  eyebrowsType: EyebrowType;
}

export function readEyebrows(reader: BufferReader): Eyebrows {
  reader.expectUint32(0x1787ee22);
  const guid = reader.readGuid();
  reader.expectUint64(0);
  const eyebrowsType = eyebrowTypeMap[guid] ?? "None";
  return { eyebrowsType };
}

export function writeEyebrows(writer: BufferWriter, eyebrows: Eyebrows) {
  writer.writeUint32(0x1787ee22);
  writer.writeGuid(reverseEyebrowTypeMap[eyebrows.eyebrowsType] ?? new Error(`Unknown eyebrow type: ${eyebrows.eyebrowsType}`));
  writer.writeUint64(0);
}
