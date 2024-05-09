import { BufferReader } from "../buffer-reader";

export type StarCitizenEyes = NonNullable<unknown>;

export function readEyes(reader: BufferReader): StarCitizenEyes {
  reader.expectUint32(0xc5bb5550);
  reader.expectGuid("6b4ca363-e160-4871-b709-e47467b40310");
  reader.expectUint64(0);

  return {};
}
