import { BufferReader } from '../BufferReader'
import type { BufferWriter } from '../BufferWriter'
import type { Body } from './Body'
import { readBody, writeBody } from './Body'
import type { BodyMaterial } from './BodyMaterial'
import { readBodyMaterial, writeBodyMaterial } from './BodyMaterial'
import { type BodyType, readBodyType, writeBodyType } from './BodyType'
import type { Dna } from './Dna'
import { readDna, writeDna } from './Dna'
import type { Dye } from './Dye'
import { dyeKeys, readDye, writeDye } from './Dye'
import type { EyeMaterial } from './EyeMaterial'
import { readEyeMaterial, writeEyeMaterial } from './EyeMaterial'
import type { FaceMaterial } from './FaceMaterial'
import { readFaceMaterial, writeFaceMaterial } from './FaceMaterial'
import type { HeadMaterial } from './HeadMaterial'
import { readHeadMaterial, writeHeadMaterial } from './HeadMaterial'

export interface Character {
  count: number
  bodyType: BodyType
  dna: Dna
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
  const bodyType = readBodyType(reader)
  const dna = readDna(reader)
  const count = reader.readUint64()
  const body = readBody(reader)
  const headMaterial = readHeadMaterial(reader)
  const faceMaterial = readFaceMaterial(reader, headMaterial.materialType)

  const dyes: Dye[] = []
  while (dyeKeys.includes(reader.peekUint32()))
    dyes.push(readDye(reader))

  const eyeMaterial = readEyeMaterial(reader)
  const bodyMaterial = readBodyMaterial(reader)

  if (reader.offset !== reader.view.byteLength)
    throw new Error('Character buffer not fully read')

  return {
    count,
    bodyType,
    dna,
    body,
    headMaterial,
    faceMaterial,
    dyes,
    eyeMaterial,
    bodyMaterial,
  }
}

export function writeCharacter(writer: BufferWriter, character: Character) {
  writer.writeUint32(2)
  writer.writeUint32(7)
  writeBodyType(writer, character.bodyType)
  writeDna(writer, character.dna, character.bodyType)
  writer.writeUint64(character.count)
  writeBody(writer, character.body)
  writeHeadMaterial(writer, character.headMaterial)
  writeFaceMaterial(writer, character.faceMaterial, character.headMaterial.materialType)
  for (const dye of character.dyes)
    writeDye(writer, dye)
  writeEyeMaterial(writer, character.eyeMaterial)
  writeBodyMaterial(writer, character.bodyMaterial, character.bodyType)
}
