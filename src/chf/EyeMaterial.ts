import type { BufferReader } from "../BufferReader";
import type { BufferWriter } from "../BufferWriter";
import type { DyeColors } from "./DyeColors";
import { readDyeColors, writeDyeColors } from "./DyeColors";

export interface EyeMaterial {
  colors: DyeColors;
}

export function readEyeMaterial(reader: BufferReader): EyeMaterial {
  if (reader.peekUint32() !== 0xa047885e) {
    return { colors: { color1: "#000000", color2: undefined } };
  }

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

export function writeEyeMaterial(writer: BufferWriter, eyeMaterial: EyeMaterial) {
  writer.writeUint32(0xa047885e);
  writer.writeEmptyGuid();
  writer.writeUint32(0xce9df055);
  writer.writeEmptyGuid();
  writer.writeUint32(1);
  writer.writeUint32(5);
  writer.writeUint32(0x9736c44b);
  writer.writeUint32(0);
  writer.writeUint32(0);
  writer.writeUint32(0);
  writeDyeColors(writer, eyeMaterial.colors);
  writer.writeUint32(5);
}
