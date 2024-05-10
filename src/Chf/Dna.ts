import { BufferReader } from '../Utils/BufferReader'
import type { BufferWriter } from '../Utils/BufferWriter'
import { fromHexStr, toHexStr } from '../Utils/hexString'
import type { BodyType } from './BodyType'

const dnaSize = 0xD8
const partCount = 12 * 4
const idxPartRecord: Record<number, DnaFacePart> = {
  0: 'eyebrowLeft',
  1: 'eyebrowRight',
  2: 'eyeLeft',
  3: 'eyeRight',
  4: 'nose',
  5: 'earLeft',
  6: 'earRight',
  7: 'cheekLeft',
  8: 'cheekRight',
  9: 'mouth',
  10: 'jaw',
  11: 'crown',
}

type DnaFacePart =
  'eyebrowLeft' |
  'eyebrowRight' |
  'eyeLeft' |
  'eyeRight' |
  'nose' |
  'earLeft' |
  'earRight' |
  'cheekLeft' |
  'cheekRight' |
  'mouth' |
  'jaw' |
  'crown'

interface DnaBlend {
  part: DnaFacePart
  headId: number
  percent: number
}

interface DnaBlends {
  [key: number]: DnaBlend[]
}

export interface Dna {
  dnaString: string
  childCount: number
  blends: DnaBlends
}

export function readDna(parentReader: BufferReader, bodyType: BodyType): Dna {
  const isMale = bodyType === 'male'
  parentReader.expectUint64(dnaSize)

  const bytes = parentReader.readBytes(dnaSize)
  const dnaString = toHexStr(bytes)
  const reader = new BufferReader(bytes.buffer)

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

  const map: Record<number, DnaBlend[]> = {}

  for (let i = 0; i < partCount; i++) {
    const part = i % 12
    const percentShort = reader.readUint16()
    const headId = reader.readByte()
    reader.expectByte(0)

    const percent = percentShort / 0xFFFF * 100
    const blend = { headId, percent, part: idxPartRecord[part] }

    if (!map[part])
      map[part] = []

    map[part].push(blend)
  }

  return {
    dnaString,
    childCount,
    blends: map,
  }
}

export function writeDna(writer: BufferWriter, dna: Dna, _bodyType: BodyType) {
  const bytes = fromHexStr(dna.dnaString)
  if (bytes.length !== dnaSize)
    throw new Error(`DNA string must be ${dnaSize} bytes long`)

  writer.writeUint64(dnaSize)
  writer.writeBytes(bytes)

  // TODO: this is probably broken. Replace the above with this when fixed
  // const isMale = bodyType === 'male'
  // writer.writeUint32(0xFCD09394)
  // writer.writeUint32(isMale ? 0xDD6C67F6 : 0x9EF4EB54)
  // writer.writeUint32(isMale ? 0x65E740D3 : 0x65D75204)
  // writer.writeUint32(0)
  // writer.writeByte(0x0C)
  // writer.writeByte(0x0)
  // writer.writeByte(0x04)
  // writer.writeByte(0x0)
  // writer.writeByte(0x4)
  // writer.writeByte(0x0)
  // writer.writeByte(dna.childCount)
  // writer.writeByte(0x0)

  // for (let i = 0; i < partCount; i++) {
  //   const part = i % 12
  //   const blends = dna.blends.get(part) || []
  //   const blend = blends[i % blends.length]

  //   const percentShort = blend.percent / 100 * 0xFFFF
  //   writer.writeUint16(percentShort)
  //   writer.writeByte(blend.headId)
  //   writer.writeByte(0)
  // }
}
