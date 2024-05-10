import type { BufferReader } from '../Utils/BufferReader'
import type { DyeColors } from './DyeColors'
import { readDyeColors } from './DyeColors'
import type { DyeValues } from './DyeValues'
import { readDyeValues } from './DyeValues'

export enum DyeType {
  Hair,
  Eyebrows,
  Beard,
}

const map: Record<number, DyeType> = {
  0x6C836947: DyeType.Hair,
  0x078AC8BD: DyeType.Eyebrows,
  0x9B274D93: DyeType.Beard,
}

export interface Dye {
  type: DyeType
  unknown: number
  dyeValues?: DyeValues
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
