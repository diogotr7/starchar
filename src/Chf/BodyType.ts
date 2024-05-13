import type { BufferReader } from '../BufferReader'
import type { BufferWriter } from '../BufferWriter'

export type BodyType = 'male' | 'female'

const bodyTypeMap: Record<string, BodyType> = {
  '25f439d5-146b-4a61-a999-a486dfb68a49': 'male',
  'd0794a94-efb0-4cad-ad38-2558b4d3c253': 'female',
}

const reverseBodyTypeMap = Object.fromEntries(Object.entries(bodyTypeMap).map(([key, value]) => [value, key]))

export function readBodyType(reader: BufferReader): BodyType {
  const bodyType = reader.readGuid()
  reader.expectEmptyGuid()
  return bodyTypeMap[bodyType] ?? new Error(`Unknown body type: ${bodyType}`)
}

export function writeBodyType(writer: BufferWriter, bodyType: BodyType) {
  const guid = reverseBodyTypeMap[bodyType] ?? new Error(`Unknown body type: ${bodyType}`)
  writer.writeGuid(guid)
  writer.writeEmptyGuid()
}
