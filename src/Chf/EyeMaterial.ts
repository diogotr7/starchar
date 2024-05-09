import { BufferReader } from "../Utils/BufferReader";
import { DyeColors, readDyeColors } from "./DyeColors";

export type EyeMaterial = {
  colors: DyeColors;
};

export function readEyeMaterial(reader: BufferReader): EyeMaterial {
  reader.expectUint32(0xa047885e);
  reader.expectEmptyGuid();
  reader.expectUint32(0xce9df055);
  reader.expectEmptyGuid();
  reader.expectUint32(1);
  reader.expectUint32(5);
  reader.expectUint32(0x9736c44b);
  reader.expectUint32(0);
  reader.expectUint32(0);
  reader.expectUint32(0);
  const colors = readDyeColors(reader);
  reader.expectUint32(5);

  return { colors };
}
