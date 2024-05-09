import { BufferReader } from "../Utils/BufferReader";
import { Head, readHead } from "./Head";

export type Body = { head: Head };
export function readBody(reader: BufferReader): Body {
  reader.expectUint32(0xab6341ac);
  reader.expectGuid("dbaa8a7d-755f-4104-8b24-7b58fd1e76f6");
  reader.expectUint64(0x1);
  const head = readHead(reader);

  return { head };
}
