import { BufferReader } from '../Utils/BufferReader'
import type { Body } from './Body'
import { readBody } from './Body'
import type { BodyMaterial } from './BodyMaterial'
import { readBodyMaterial } from './BodyMaterial'
import type { Dye } from './Dye'
import { readDye } from './Dye'
import type { EyeMaterial } from './EyeMaterial'
import { readEyeMaterial } from './EyeMaterial'
import type { FaceMaterial } from './FaceMaterial'
import { readFaceMaterial } from './FaceMaterial'
import type { HeadMaterial } from './HeadMaterial'
import { readHeadMaterial } from './HeadMaterial'

export function toHexString(byteArray: Uint8Array) {
  return Array.from(byteArray, (byte) => {
    return (`0${(byte & 0xFF).toString(16)}`).slice(-2)
  }).join('')
}

type BodyType = 'male' | 'female'

export interface Character {
  bodyType: BodyType
  dna: string
  body: Body
  headMaterial: HeadMaterial
  faceMaterial: FaceMaterial
  dyes: Dye[]
  eyeMaterial: EyeMaterial
  bodyMaterial: BodyMaterial
}

export function readCharacter(bytes: Uint8Array): Character {
  const reader = new BufferReader(bytes.buffer)
  reader.expectUint32(2)
  reader.expectUint32(7)
  const bodyTypeGuid = reader.readGuid()
  reader.expectEmptyGuid()
  reader.expectUint64(0xD8)
  const dnaBytes = reader.readBytes(0xD8)
  reader.readUint64()
  const body = readBody(reader)
  const headMaterial = readHeadMaterial(reader)
  const faceMaterial = readFaceMaterial(reader, headMaterial.materialType)

  const dyes: Dye[] = []
  while (reader.peekUint32() !== 0xA047885E)
    dyes.push(readDye(reader))

  const eyeMaterial = readEyeMaterial(reader)
  const bodyMaterial = readBodyMaterial(reader)

  return {
    bodyType: readBodyType(bodyTypeGuid),
    dna: toHexString(dnaBytes),
    body,
    headMaterial,
    faceMaterial,
    dyes,
    eyeMaterial,
    bodyMaterial,
  }
}

function readBodyType(guid: string): BodyType {
  if (guid === '25f439d5-146b-4a61-a999-a486dfb68a49')
    return 'male'
  if (guid === 'd0794a94-efb0-4cad-ad38-2558b4d3c253')
    return 'female'
  throw new Error(`Unknown body type: ${guid}`)
}
