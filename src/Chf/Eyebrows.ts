import { BufferReader } from "../Utils/BufferReader";

export type Eyebrows = {
  eyebrowsType: EyebrowType;
};

export function readEyebrows(reader: BufferReader): Eyebrows {
  reader.expectUint32(0x1787ee22);
  const guid = reader.readGuid();
  reader.expectUint64(0);
  const eyebrowsType = eyebrowTypeMap.get(guid) ?? EyebrowType.None;
  return { eyebrowsType };
}

export enum EyebrowType {
  None,
  Brows01,
  Brows02,
  Brows03,
  Brows04,
  Brows05,
  Brows06,
}

const eyebrowTypeMap = new Map<string, EyebrowType>([
  ["89ec0bbc-7daf-4b09-a98d-f8dd8df32305", EyebrowType.Brows01],
  ["c40183e4-659c-4e4e-8f96-70b33a3b9d67", EyebrowType.Brows02],
  ["6606176a-bfc4-4d24-a40a-b554fcfb8c7e", EyebrowType.Brows03],
  ["41a65deb-4a4c-425c-8825-e6d264ecdd4b", EyebrowType.Brows04],
  ["a074880a-6df2-4996-89e2-3e204a2790c2", EyebrowType.Brows05],
  ["03270dfe-71be-45ee-b51a-fb1dd7e67ba1", EyebrowType.Brows06],
]);
