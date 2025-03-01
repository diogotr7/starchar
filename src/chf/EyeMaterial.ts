import type { BufferReader } from "../utils/BufferReader";
import type { BufferWriter } from "../utils/BufferWriter";
import type { DyeColors } from "./DyeColors";
import { readDyeColors, writeDyeColors } from "./DyeColors";

export interface EyeMaterial {
  colors: DyeColors;
}

export function readEyeMaterial(reader: BufferReader): EyeMaterial {
  reader.expectUint32(0xa047885e);
  reader.expectEmptyGuid();
  const key = reader.readUint32();

  if (key !== 0xce9df055 && key !== 0xd5354502)
    throw new Error(`Unknown readEyeMaterial key: ${key}`);

  reader.expectEmptyGuid();
  reader.expectUint32(1);
  reader.expectUint32(5);
  const key2 = reader.readUint32();
  if (key2 !== 0x9736c44b && key2 !== 0x8c9e711c)
    throw new Error(`Unknown readEyeMaterial key2: ${key2}`);

  reader.expectUint32(0);
  reader.expectUint32(0);
  reader.expectUint32(0);
  const colors = readDyeColors(reader);
  reader.expectUint32(5);

  return { colors };
}

export function writeEyeMaterial(
  writer: BufferWriter,
  eyeMaterial: EyeMaterial
) {
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
