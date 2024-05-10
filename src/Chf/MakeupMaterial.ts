import type { BufferReader } from '../Utils/BufferReader'

export enum MakeupType {
  None,
  Eyes01,
  Eyes02,
  Eyes03,
  Eyes04,
  Eyes05,
  Lips01,
  Lips02,
  Lips03,
  Lips04,
  Lips05,
}

const makeup: Record<string, MakeupType> = {
  'b643f3b3-21bc-4f44-95e5-0de140fd7954': MakeupType.Eyes01,
  '229a46c9-b9e5-4da2-875e-8f007642e52c': MakeupType.Eyes02,
  '34e882d0-ae6b-4747-acf1-0a86ef8a64bb': MakeupType.Eyes03,
  'a817c68e-8a9b-4887-b8be-1760a2a42b4d': MakeupType.Eyes04,
  '438aa947-2c7b-41ea-86a9-71046ca59037': MakeupType.Eyes05,
  '8f19d3cd-2bf4-45ec-8189-7780a82c6e48': MakeupType.Lips01,
  '63d0a0c7-924e-4274-af62-765d4ca4d2b4': MakeupType.Lips02,
  '521a1b21-8bb7-44ef-91b5-74d9a3f0cf1b': MakeupType.Lips03,
  '5f213adc-04e0-44c4-bd5a-fb6a07022c70': MakeupType.Lips04,
  'db723134-9142-43c1-84c0-ace36c176135': MakeupType.Lips05,
}

export interface MakeupMaterial {
  count: number
  makeupType: MakeupType
}

export function readMakeupMaterial(reader: BufferReader): MakeupMaterial {
  reader.expectUint32(0)
  const count = reader.readByte()
  const makeupTypeId = reader.readGuid()
  const makeupType = makeup[makeupTypeId] ?? MakeupType.None

  return { count, makeupType }
}
