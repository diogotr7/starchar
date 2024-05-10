import type { BufferReader } from '../Utils/BufferReader'
import type { BufferWriter } from '../Utils/BufferWriter'

export interface DyeColors {
  color1?: string
  color2?: string
}

export function readDyeColors(reader: BufferReader): DyeColors {
  const count = reader.readUint64()

  switch (count) {
    case 0:
      return { color1: undefined, color2: undefined }
    case 1:
      return { color1: reader.readKeyedColor(0x442A34AC), color2: undefined }
    case 2:
      return {
        color1: reader.readKeyedColor(0x15E90814),
        color2: reader.readKeyedColor(0xA2C7C909),
      }
    default:
      throw new Error(`Unexpected count: ${count}`)
  }
}

export function writeDyeColors(writer: BufferWriter, dyeColors: DyeColors) {
  if (dyeColors.color1 && dyeColors.color2) {
    writer.writeUint64(2)
    writer.writeKeyedColor(0x15E90814, dyeColors.color1)
    writer.writeKeyedColor(0xA2C7C909, dyeColors.color2)
  }
  else if (dyeColors.color1) {
    writer.writeUint64(1)
    writer.writeKeyedColor(0x442A34AC, dyeColors.color1)
  }
  else {
    writer.writeUint64(0)
  }
}
