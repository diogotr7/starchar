import { BufferReader } from "../Utils/BufferReader";

export type Eyelashes = NonNullable<unknown>;
export function readEyelashes(reader: BufferReader): Eyelashes {
  reader.expectUint32(0x190b04e2);
  reader.expectGuid("6217c113-a448-443b-82aa-1bb108ba8e11");
  reader.expectUint32(0x0);
  const childCount = reader.readUint32();

  switch (childCount) {
    case 0:
      return {};
    case 3:
    case 4:
    case 5:
    case 6:
      reader.expectUint32(5);
      return {};
    default:
      throw new Error("Unknown eyelashes count");
  }
}
