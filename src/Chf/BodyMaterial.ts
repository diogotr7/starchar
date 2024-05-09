import { BufferReader } from "../Utils/BufferReader";

export type BodyMaterial = {
  additionalParams: string;
  torsoColor: string;
  limbColor: string;
};

export function readBodyMaterial(reader: BufferReader): BodyMaterial {
  reader.expectUint32(0x27424d58);
  const id = reader.readGuid();
  const isMale = getIsMale(id);

  const additionalParams = reader.readUint32();
  reader.expectUint32(0);
  reader.expectUint32(0);
  reader.expectUint32(0);
  reader.expectUint32(0);
  reader.expectUint32(2);
  reader.expectUint32(5);
  reader.expectUint32(isMale ? 0x73c979a9 : 0x316b6e4c);
  reader.expectUint32(0);
  reader.expectUint32(0);
  reader.expectUint32(0);
  reader.expectUint32(1);
  reader.expectUint32(0);
  const torsoColor = reader.readKeyedColor(0xbd530797);
  reader.expectUint32(5);
  reader.expectUint32(isMale ? 0xa41fa12c : 0x8a5b66db);
  reader.expectUint32(0);
  reader.expectUint32(0);
  reader.expectUint32(0);
  reader.expectUint32(1);
  reader.expectUint32(0);
  const limbColor = reader.readKeyedColor(0xbd530797);

  return {
    additionalParams: additionalParams.toString(16).padStart(8, "0"),
    torsoColor,
    limbColor,
  };
}

function getIsMale(id: string): boolean {
  if (id === "fa5042a3-8568-48f5-bf36-02dc98191b2d") return true;
  if (id === "f0153262-588d-4ae8-8c06-53bf98cf80a5") return false;
  throw new Error(`Unexpected id: ${id}`);
}
