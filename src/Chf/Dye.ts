import type { BufferReader } from '../Utils/BufferReader'
import type { BufferWriter } from '../Utils/BufferWriter'
import type { DyeColors } from './DyeColors'
import { readDyeColors, writeDyeColors } from './DyeColors'
import type { DyeValues } from './DyeValues'
import { readDyeValues, writeDyeValues } from './DyeValues'

export type DyeType =
  'hair' |
  'eyebrows' |
  'beard'

const map: Record<number, DyeType> = {
  0x6C836947: 'hair',
  0x078AC8BD: 'eyebrows',
  0x9B274D93: 'beard',
}

const reverseMap: Record<DyeType, number> = {
  hair: 0x6C836947,
  eyebrows: 0x078AC8BD,
  beard: 0x9B274D93,
}

export interface Dye {
  type: DyeType
  unknown: number
  dyeValues: DyeValues
  dyeColors: DyeColors
}

export function readDye(reader: BufferReader): Dye {
  const key = reader.readUint32()
  const type = map[key]
  if (type === undefined)
    throw new Error(`Unknown dye key: ${key}`)

  reader.expectEmptyGuid()
  const unknown = reader.readUint32()
  reader.expectEmptyGuid()

  reader.expectUint32(1)
  reader.expectUint32(5)
  const dyeValues = readDyeValues(reader)
  const dyeColors = readDyeColors(reader)
  reader.expectUint32(5)

  return {
    type,
    unknown,
    dyeValues,
    dyeColors,
  }
}

export function writeDye(writer: BufferWriter, dye: Dye) {
  writer.writeUint32(reverseMap[dye.type]!)
  writer.writeEmptyGuid()
  writer.writeUint32(dye.unknown)
  writer.writeEmptyGuid()
  writer.writeUint32(1)
  writer.writeUint32(5)
  writeDyeValues(writer, dye.dyeValues)
  writeDyeColors(writer, dye.dyeColors)
  writer.writeUint32(5)
}
