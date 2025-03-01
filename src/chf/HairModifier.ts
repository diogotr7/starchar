import type { BufferReader } from "../utils/BufferReader";
import type { BufferWriter } from "../utils/BufferWriter";

export interface HairModifier {
  childCount: number;
}

export function readHairModifier(reader: BufferReader): HairModifier {
  reader.expectUint32(0xe7809d46);
  reader.expectGuid("12ce4ce5-e49a-4dab-9d31-ad262faaddf2");
  reader.expectUint32(0x0);
  const childCount = reader.readUint32();

  switch (childCount) {
    case 0:
      break;
    case 4:
    case 5:
    case 6: {
      reader.expectUint32(5);
      break;
    }
    default:
      throw new Error(`Unknown hair part count ${childCount}`);
  }

  return { childCount };
}

export function writeHairModifier(
  writer: BufferWriter,
  hairModifier: HairModifier
) {
  writer.writeUint32(0xe7809d46);
  writer.writeGuid("12ce4ce5-e49a-4dab-9d31-ad262faaddf2");
  writer.writeUint32(0x0);
  writer.writeUint32(hairModifier.childCount);
  if (hairModifier.childCount === 6) {
    writer.writeUint32(5);
  }
}
