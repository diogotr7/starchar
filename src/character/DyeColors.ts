import { BufferReader } from "../BufferReader";
import { Color } from "./Color";

export type DyeColors = {
  color1: Color;
  color2: Color;
};

export function readDyeColors(reader: BufferReader): DyeColors {
  const count = reader.readUint64();

  switch (count) {
    case 0:
      return { color1: "#00000000", color2: "#00000000" };
    case 1:
      return { color1: reader.readKeyedColor(0x442a34ac), color2: "#00000000" };
    case 2:
      return {
        color1: reader.readKeyedColor(0x15e90814),
        color2: reader.readKeyedColor(0xa2c7c909),
      };
    default:
      throw new Error(`Unexpected count: ${count}`);
  }
}
