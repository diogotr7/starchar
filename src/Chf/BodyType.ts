import type { BufferReader } from '../Utils/BufferReader'
import type { BufferWriter } from '../Utils/BufferWriter'

function convert(guid: string): BodyType {
  if (guid === '25f439d5-146b-4a61-a999-a486dfb68a49')
    return 'male'
  if (guid === 'd0794a94-efb0-4cad-ad38-2558b4d3c253')
    return 'female'
  throw new Error(`Unknown body type: ${guid}`)
}

export type BodyType = 'male' | 'female'
export function readBodyType(reader: BufferReader): BodyType {
  const bodyType = reader.readGuid()
  reader.expectEmptyGuid()
  return convert(bodyType)
}

export function writeBodyType(writer: BufferWriter, bodyType: BodyType) {
  const guid = bodyType === 'male' ? '25f439d5-146b-4a61-a999-a486dfb68a49' : 'd0794a94-efb0-4cad-ad38-2558b4d3c253'
  writer.writeGuid(guid)
  writer.writeEmptyGuid()
}
