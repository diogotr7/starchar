import type { BufferReader } from '../Utils/BufferReader'
import type { BufferWriter } from '../Utils/BufferWriter'
import type { Head } from './Head'
import { readHead, writeHead } from './Head'

export interface Body { head: Head }
export function readBody(reader: BufferReader): Body {
  reader.expectUint32(0xAB6341AC)
  reader.expectGuid('dbaa8a7d-755f-4104-8b24-7b58fd1e76f6')
  reader.expectUint64(0x1)
  const head = readHead(reader)

  return { head }
}

export function writeBody(writer: BufferWriter, body: Body) {
  writer.writeUint32(0xAB6341AC)
  writer.writeGuid('dbaa8a7d-755f-4104-8b24-7b58fd1e76f6')
  writer.writeUint64(0x1)
  writeHead(writer, body.head)
}
