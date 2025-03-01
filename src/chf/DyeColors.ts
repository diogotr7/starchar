import type { BufferReader } from "../utils/BufferReader";
import type { BufferWriter } from "../utils/BufferWriter";

export interface DyeColors {
  color1?: string;
  color2?: string;
}

export function readDyeColors(reader: BufferReader): DyeColors {
  const count = reader.readUint64();

  switch (count) {
    case 0:
      return { color1: undefined, color2: undefined };
    case 1:
      return { color1: reader.readKeyedColor(0x442a34ac), color2: undefined };
    case 2:
      return {
        color1: reader.readKeyedColor(0x15e90814),
        color2: reader.readKeyedColor(0xa2c7c909),
      };
    default:
      throw new Error(`Unexpected count: ${count}`);
  }
}

export function writeDyeColors(writer: BufferWriter, dyeColors: DyeColors) {
  if (dyeColors.color1 && dyeColors.color2) {
    writer.writeUint64(2);
    writer.writeKeyedColor(0x15e90814, dyeColors.color1);
    writer.writeKeyedColor(0xa2c7c909, dyeColors.color2);
  } else if (dyeColors.color1) {
    writer.writeUint64(1);
    writer.writeKeyedColor(0x442a34ac, dyeColors.color1);
  } else {
    writer.writeUint64(0);
  }
}
