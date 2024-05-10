import type { BufferReader } from '../Utils/BufferReader'
import type { BufferWriter } from '../Utils/BufferWriter'
import type { BodyType } from './BodyType'

const dnaSize = 0xD8
const partCount = 12 * 4

enum DnaFacePart {
  EyebrowLeft = 0,
  EyebrowRight = 1,
  EyeLeft = 2,
  EyeRight = 3,
  Nose = 4,
  EarLeft = 5,
  EarRight = 6,
  CheekLeft = 7,
  CheekRight = 8,
  Mouth = 9,
  Jaw = 10,
  Crown = 11,
}

interface DnaBlend {
  headId: number
  percent: number
}

export interface Dna {
  childCount: number
  blends: Map<DnaFacePart, DnaBlend[]>
}

export function readDna(reader: BufferReader, bodyType: BodyType): Dna {
  const isMale = bodyType === 'male'

  reader.expectUint64(dnaSize)
  reader.expectUint32(0xFCD09394)
  reader.expectUint32(isMale ? 0xDD6C67F6 : 0x9EF4EB54)
  reader.expectUint32(isMale ? 0x65E740D3 : 0x65D75204)
  reader.expectUint32(0)
  reader.expectByte(0x0C)
  reader.expectByte(0x0)
  reader.expectByte(0x04)
  reader.expectByte(0x0)
  reader.expectByte(0x4)
  reader.expectByte(0x0)
  const childCount = reader.readByte()
  reader.expectByte(0x0)

  const map: Map<DnaFacePart, DnaBlend[]> = new Map()

  for (let i = 0; i < partCount; i++) {
    const part = i % 12
    const percentShort = reader.readUint16()
    const headId = reader.readByte()
    reader.expectByte(0)

    const percent = percentShort / 0xFFFF * 100
    const blend = { headId, percent }

    if (!map.has(part))
      map.set(part, [])

    map.get(part)!.push(blend)
  }

  return {
    childCount,
    blends: map,
  }
}

export function writeDna(writer: BufferWriter, dna: Dna, bodyType: BodyType) {
  const isMale = bodyType === 'male'
  writer.writeUint64(dnaSize)
  writer.writeUint32(0xFCD09394)
  writer.writeUint32(isMale ? 0xDD6C67F6 : 0x9EF4EB54)
  writer.writeUint32(isMale ? 0x65E740D3 : 0x65D75204)
  writer.writeUint32(0)
  writer.writeByte(0x0C)
  writer.writeByte(0x0)
  writer.writeByte(0x04)
  writer.writeByte(0x0)
  writer.writeByte(0x4)
  writer.writeByte(0x0)
  writer.writeByte(dna.childCount)
  writer.writeByte(0x0)

  for (let i = 0; i < partCount; i++) {
    const part = i % 12
    const blends = dna.blends.get(part) || []
    const blend = blends[i % blends.length]

    const percentShort = blend.percent / 100 * 0xFFFF
    writer.writeUint16(percentShort)
    writer.writeByte(blend.headId)
    writer.writeByte(0)
  }
}
