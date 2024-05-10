import type { BufferReader } from '../Utils/BufferReader'
import type { BufferWriter } from '../Utils/BufferWriter'
import type { FacialHair } from './FacialHair'
import { readFacialHair, writeFacialHair } from './FacialHair'
import type { Eyelashes } from './Eyelashes'
import { readEyelashes, writeEyelashes } from './Eyelashes'
import type { Eyebrows } from './Eyebrows'
import { readEyebrows, writeEyebrows } from './Eyebrows'
import type { Hair } from './Hair'
import { readHair, writeHair } from './Hair'
import type { Eyes } from './Eyes'
import { readEyes, writeEyes } from './Eyes'

export interface Head {
  eyes?: Eyes
  hair?: Hair
  eyebrows?: Eyebrows
  eyelashes?: Eyelashes
  facialHair?: FacialHair
}

export function readHead(reader: BufferReader): Head {
  reader.expectUint32(0x47010DB9)
  reader.expectGuid('1d5cfab3-bf80-4550-b4ab-39e896a7086e')
  const headParts = reader.readUint64()

  const head: Head = {}
  for (let i = 0; i < headParts; i++) {
    switch (reader.peekUint32()) {
      case 0xC5BB5550:
        head.eyes = readEyes(reader)
        break
      case 0x13601A95:
        head.hair = readHair(reader)
        break
      case 0x1787EE22:
        head.eyebrows = readEyebrows(reader)
        break
      case 0x190B04E2:
        head.eyelashes = readEyelashes(reader)
        break
      case 0x98EFBB1C:
        head.facialHair = readFacialHair(reader)
        break
      default:
        throw new Error('Unknown head part')
    }
  }

  return head
}

export function writeHead(writer: BufferWriter, head: Head) {
  writer.writeUint32(0x47010DB9)
  writer.writeGuid('1d5cfab3-bf80-4550-b4ab-39e896a7086e')
  writer.writeUint64(Object.keys(head).length)
  if (head.eyes)
    writeEyes(writer)

  if (head.hair)
    writeHair(writer, head.hair)

  if (head.eyebrows)
    writeEyebrows(writer, head.eyebrows)

  if (head.eyelashes)
    writeEyelashes(writer, head.eyelashes)

  if (head.facialHair)
    writeFacialHair(writer, head.facialHair)
}
