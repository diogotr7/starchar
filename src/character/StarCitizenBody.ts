import { BufferReader } from "../buffer-reader";
import { StarCitizenHead, readHead } from "./StarCitizenHead";

export type StarCitizenBody = { head: StarCitizenHead };
export function readBody(reader: BufferReader): StarCitizenBody {
  reader.expectUint32(0xab6341ac);
  reader.expectGuid("dbaa8a7d-755f-4104-8b24-7b58fd1e76f6");
  reader.expectUint64(0x1);
  const head = readHead(reader);

  return { head };
}
