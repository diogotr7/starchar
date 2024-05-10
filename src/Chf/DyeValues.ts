import type { BufferReader } from '../Utils/BufferReader'

export interface DyeValues {
  key: string
  dyeAmount: number
  dyeGradient2: number
  naturalColorSaturation: number
  naturalColorRedness: number
  dyeVariation: number
  unknown: number
  dyeGradient1: number
}

export function readDyeValues(reader: BufferReader): DyeValues | undefined {
  const unk1 = reader.readUint32()
  reader.expectUint32(0)
  const count = reader.readUint64()

  if (count === 0)
    return undefined

  if (count !== 7)
    throw new Error(`Unexpected count: ${count}`)

  return {
    key: unk1.toString(16).padStart(8, '0'),
    dyeAmount: reader.readKeyedFloat32(0x4AF6C15A),
    dyeGradient2: reader.readKeyedFloat32(0xC3370BD9),
    naturalColorSaturation: reader.readKeyedFloat32(0xB9FA00A3),
    naturalColorRedness: reader.readKeyedFloat32(0x62FBF0AF),
    dyeVariation: reader.readKeyedFloat32(0x06084076),
    unknown: reader.readKeyedFloat32(0xA59AA7C8),
    dyeGradient1: reader.readKeyedFloat32(0x027EB674),
  }
}
