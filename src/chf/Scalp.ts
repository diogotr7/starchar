import { BufferReader } from "../utils/BufferReader";
import { BufferWriter } from "../utils/BufferWriter";

export interface Scalp {
  guid: string;
}

export function readScalp(reader: BufferReader): Scalp {
  reader.expectUint32(0xddfa667b);
  const guid = reader.readGuid();
  reader.expectUint32(0);
  const childCount = reader.readUint32();

  switch (childCount) {
    case 0:
      return { guid };
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
      reader.expectUint32(0x5);
      return { guid };
    default:
      throw new Error("Unknown scalp child count: " + childCount);
  }
}

export function writeScalp(_writer: BufferWriter, _scalp: Scalp) {}
