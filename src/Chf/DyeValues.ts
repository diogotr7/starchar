import { BufferReader } from "../Utils/BufferReader";

export type DyeValues = {
  Key: string;
  DyeAmount: number;
  DyeGradient2: number;
  NaturalColorSaturation: number;
  NaturalColorRedness: number;
  DyeVariation: number;
  Unknown: number;
  DyeGradient1: number;
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
    Key: unk1.toString(16).padStart(8, "0"),
    DyeAmount: reader.readKeyedFloat32(0x4af6c15a),
    DyeGradient2: reader.readKeyedFloat32(0xc3370bd9),
    NaturalColorSaturation: reader.readKeyedFloat32(0xb9fa00a3),
    NaturalColorRedness: reader.readKeyedFloat32(0x62fbf0af),
    DyeVariation: reader.readKeyedFloat32(0x06084076),
    Unknown: reader.readKeyedFloat32(0xa59aa7c8),
    DyeGradient1: reader.readKeyedFloat32(0x027eb674),
  };
}
