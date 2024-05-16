import type { BufferReader } from '../BufferReader'
import type { BufferWriter } from '../BufferWriter'
import type { BodyType } from './BodyType'

export interface BodyMaterial {
  additionalParams: number
  torsoColor: string
  limbColor: string
}

const bodyMaterialMap: Record<string, BodyType> = {
  'fa5042a3-8568-48f5-bf36-02dc98191b2d': 'male',
  'f0153262-588d-4ae8-8c06-53bf98cf80a5': 'female',
  '00000000-0000-0000-0000-000000000000': 'male', // double check this
}

const reverseBodyMaterialMap = Object.fromEntries(Object.entries(bodyMaterialMap).map(([key, value]) => [value, key]))

export function readBodyMaterial(reader: BufferReader): BodyMaterial {
  reader.expectUint32(0x27424D58)
  const id = reader.readGuid()
  const isMale = bodyMaterialMap[id] === 'male'

  const additionalParams = reader.readUint32()
  reader.expectUint32(0)
  reader.expectUint32(0)
  reader.expectUint32(0)
  reader.expectUint32(0)
  reader.expectUint32(2)
  reader.expectUint32(5)
  reader.expectUint32(isMale ? 0x73C979A9 : 0x316B6E4C)
  reader.expectUint32(0)
  reader.expectUint32(0)
  reader.expectUint32(0)
  reader.expectUint32(1)
  reader.expectUint32(0)
  const torsoColor = reader.readKeyedColor(0xBD530797)
  reader.expectUint32(5)
  reader.expectUint32(isMale ? 0xA41FA12C : 0x8A5B66DB)
  reader.expectUint32(0)
  reader.expectUint32(0)
  reader.expectUint32(0)
  reader.expectUint32(1)
  reader.expectUint32(0)
  const limbColor = reader.readKeyedColor(0xBD530797)

  return {
    additionalParams,
    torsoColor,
    limbColor,
  }
}

export function writeBodyMaterial(writer: BufferWriter, bodyMaterial: BodyMaterial, bodyType: BodyType) {
  const isMale = bodyType === 'male'
  writer.writeUint32(0x27424D58)
  writer.writeGuid(reverseBodyMaterialMap[bodyType] ?? new Error(`Unknown body type: ${bodyType}`))
  writer.writeUint32(bodyMaterial.additionalParams)
  writer.writeUint32(0)
  writer.writeUint32(0)
  writer.writeUint32(0)
  writer.writeUint32(0)
  writer.writeUint32(2)
  writer.writeUint32(5)
  writer.writeUint32(isMale ? 0x73C979A9 : 0x316B6E4C)
  writer.writeUint32(0)
  writer.writeUint32(0)
  writer.writeUint32(0)
  writer.writeUint32(1)
  writer.writeUint32(0)
  writer.writeKeyedColor(0xBD530797, bodyMaterial.torsoColor)
  writer.writeUint32(5)
  writer.writeUint32(isMale ? 0xA41FA12C : 0x8A5B66DB)
  writer.writeUint32(0)
  writer.writeUint32(0)
  writer.writeUint32(0)
  writer.writeUint32(1)
  writer.writeUint32(0)
  writer.writeKeyedColor(0xBD530797, bodyMaterial.limbColor)
}
