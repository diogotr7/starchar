import { BufferReader } from "../Utils/BufferReader";

export type DyeValues = {
  key: string;
  dyeAmount: number;
  dyeGradient2: number;
  naturalColorSaturation: number;
  naturalColorRedness: number;
  dyeVariation: number;
  unknown: number;
  dyeGradient1: number;
};

export function readDyeValues(reader: BufferReader): DyeValues | undefined {
  const unk1 = reader.readUint32();
  reader.expectUint32(0);
  const count = reader.readUint64();

  if (count === 0) {
    return undefined;
  }
  if (count !== 7) throw new Error(`Unexpected count: ${count}`);

  return {
    key: unk1.toString(16).padStart(8, "0"),
    dyeAmount: reader.readKeyedFloat32(0x4af6c15a),
    dyeGradient2: reader.readKeyedFloat32(0xc3370bd9),
    naturalColorSaturation: reader.readKeyedFloat32(0xb9fa00a3),
    naturalColorRedness: reader.readKeyedFloat32(0x62fbf0af),
    dyeVariation: reader.readKeyedFloat32(0x06084076),
    unknown: reader.readKeyedFloat32(0xa59aa7c8),
    dyeGradient1: reader.readKeyedFloat32(0x027eb674),
  };
}
