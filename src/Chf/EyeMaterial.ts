import type { BufferReader } from '../Utils/BufferReader'
import type { DyeColors } from './DyeColors'
import { readDyeColors } from './DyeColors'

export interface EyeMaterial {
  colors: DyeColors
}

export function readEyeMaterial(reader: BufferReader): EyeMaterial {
  reader.expectUint32(0xA047885E)
  reader.expectEmptyGuid()
  reader.expectUint32(0xCE9DF055)
  reader.expectEmptyGuid()
  reader.expectUint32(1)
  reader.expectUint32(5)
  reader.expectUint32(0x9736C44B)
  reader.expectUint32(0)
  reader.expectUint32(0)
  reader.expectUint32(0)
  const colors = readDyeColors(reader)
  reader.expectUint32(5)

  return { colors }
}
