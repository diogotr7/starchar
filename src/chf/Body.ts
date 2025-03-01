import type { BufferReader } from "../utils/BufferReader";
import type { BufferWriter } from "../utils/BufferWriter";
import type { Head } from "./Head";
import { readHead, writeHead } from "./Head";

export interface Body {
  head: Head;
}
export function readBody(reader: BufferReader): Body {
  reader.expectUint32(0xab6341ac);
  reader.expectGuid("dbaa8a7d-755f-4104-8b24-7b58fd1e76f6");
  reader.expectUint64(1);
  const head = readHead(reader);

  return { head };
}

export function writeBody(writer: BufferWriter, body: Body) {
  writer.writeUint32(0xab6341ac);
  writer.writeGuid("dbaa8a7d-755f-4104-8b24-7b58fd1e76f6");
  writer.writeUint64(1);
  writeHead(writer, body.head);
}
