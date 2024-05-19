import type { BufferReader } from "../BufferReader";
import type { BufferWriter } from "../BufferWriter";

export interface Eyelashes {
  childCount: number;
}
export function readEyelashes(reader: BufferReader): Eyelashes {
  reader.expectUint32(0x190b04e2);
  reader.expectGuid("6217c113-a448-443b-82aa-1bb108ba8e11");
  reader.expectUint32(0x0);
  const childCount = reader.readUint32();

  switch (childCount) {
    case 0:
      return { childCount };
    case 2:
    case 3:
    case 4:
    case 5:
    case 6: {
      reader.expectUint32(5);
      return { childCount };
    }
    default:
      throw new Error(`Unknown eyelashes count ${childCount}`);
  }
}

export function writeEyelashes(writer: BufferWriter, eyelashes: Eyelashes) {
  writer.writeUint32(0x190b04e2);
  writer.writeGuid("6217c113-a448-443b-82aa-1bb108ba8e11");
  writer.writeUint32(0x0);
  writer.writeUint32(eyelashes.childCount);
  if (eyelashes.childCount === 0) {
    return;
  }

  if (eyelashes.childCount >= 3 && eyelashes.childCount <= 6) {
    writer.writeUint32(5);
  } else {
    throw new Error(`Unknown eyelashes count ${eyelashes.childCount}`);
  }
}
