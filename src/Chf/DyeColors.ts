import type { BufferReader } from '../Utils/BufferReader'

export interface DyeColors {
  color1: string
  color2: string
}

export function readDyeColors(reader: BufferReader): DyeColors {
  const count = reader.readUint64()

  switch (count) {
    case 0:
      return { color1: '#00000000', color2: '#00000000' }
    case 1:
      return { color1: reader.readKeyedColor(0x442A34AC), color2: '#00000000' }
    case 2:
      return {
        color1: reader.readKeyedColor(0x15E90814),
        color2: reader.readKeyedColor(0xA2C7C909),
      }
    default:
      throw new Error(`Unexpected count: ${count}`)
  }
}
