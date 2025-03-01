import type { BufferReader } from "../utils/BufferReader";
import type { BufferWriter } from "../utils/BufferWriter";

export interface DyeValues {
  key: number;
  count: number;
  dyeAmount: number;
  dyeGradient2: number;
  naturalColorSaturation: number;
  naturalColorRedness: number;
  dyeVariation: number;
  unknown: number;
  dyeGradient1: number;
}

export function readDyeValues(reader: BufferReader): DyeValues {
  const unk1 = reader.readUint32();
  reader.expectUint32(0);
  const count = reader.readUint64();

  if (count === 0) {
    return {
      key: unk1,
      count: 0,
      dyeAmount: 0,
      dyeGradient2: 0,
      naturalColorSaturation: 0,
      naturalColorRedness: 0,
      dyeVariation: 0,
      unknown: 0,
      dyeGradient1: 0,
    };
  }

  if (count !== 7) {
    throw new Error(`Unexpected count: ${count}`);
  }

  return {
    count,
    key: unk1,
    dyeAmount: reader.readKeyedFloat32(0x4af6c15a),
    dyeGradient2: reader.readKeyedFloat32(0xc3370bd9),
    naturalColorSaturation: reader.readKeyedFloat32(0xb9fa00a3),
    naturalColorRedness: reader.readKeyedFloat32(0x62fbf0af),
    dyeVariation: reader.readKeyedFloat32(0x06084076),
    unknown: reader.readKeyedFloat32(0xa59aa7c8),
    dyeGradient1: reader.readKeyedFloat32(0x027eb674),
  };
}

export function writeDyeValues(writer: BufferWriter, dyeValues: DyeValues) {
  writer.writeUint32(dyeValues.key);
  writer.writeUint32(0);
  writer.writeUint64(dyeValues.count);
  if (dyeValues.count === 0) {
    return;
  }

  writer.writeKeyedFloat32(0x4af6c15a, dyeValues.dyeAmount);
  writer.writeKeyedFloat32(0xc3370bd9, dyeValues.dyeGradient2);
  writer.writeKeyedFloat32(0xb9fa00a3, dyeValues.naturalColorSaturation);
  writer.writeKeyedFloat32(0x62fbf0af, dyeValues.naturalColorRedness);
  writer.writeKeyedFloat32(0x06084076, dyeValues.dyeVariation);
  writer.writeKeyedFloat32(0xa59aa7c8, dyeValues.unknown);
  writer.writeKeyedFloat32(0x027eb674, dyeValues.dyeGradient1);
}
