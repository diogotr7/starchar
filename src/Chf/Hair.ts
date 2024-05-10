import type { BufferReader } from '../Utils/BufferReader'
import type { HairModifier } from './HairModifier'
import { readHairModifier } from './HairModifier'

export interface Hair {
  hairType: HairType
  modifier?: HairModifier
}

export enum HairType {
  None,
  Bald01,
  Hair02,
  Hair03,
  Hair04,
  Hair05,
  Hair06,
  Hair07,
  Hair08,
  Hair09,
  Hair10,
  Hair11,
  Hair12,
  Hair13,
  Hair14,
  Hair15,
  Hair16,
  Hair17,
  Hair18,
  Hair19,
  Hair20,
  Hair21,
  Hair22,
  Hair23,
  Hair24,
}

export const hairTypes: Record<string, HairType> = {
  '71dd6cea-e225-4aaf-b9d7-562d2083ae3b': HairType.Bald01,
  '968d0d95-2224-47dc-a05a-da423a4a1c81': HairType.Hair02,
  'a8beac2a-3a3a-455b-9d2b-cfcadf290419': HairType.Hair03,
  'e35c9137-dc5b-457f-b86a-f4f47d4ea96a': HairType.Hair04,
  '78ba4b65-a6a6-4c08-b78a-4d4b0adc020d': HairType.Hair05,
  '041df6b0-2498-4799-a7a5-d2d40856c409': HairType.Hair06,
  '57eedc17-d982-485f-98bc-161df3822022': HairType.Hair07,
  '7222de26-f519-4d98-99f7-0aa602ae4c05': HairType.Hair08,
  'ebd09681-1909-4047-8989-774974da71b7': HairType.Hair09,
  '9b688d20-e494-4c80-b0b7-e2989ddd4cbc': HairType.Hair10,
  'ad65b2a4-6ee8-4f9f-ac86-0b1725e3e5a1': HairType.Hair11,
  '8b40a194-fc32-4668-bd77-dc7e54708725': HairType.Hair12,
  'f2343738-d0bc-4a99-bd11-98aa9cd5063d': HairType.Hair13,
  'b0ef56d6-fafb-4b52-8713-2c00577605a5': HairType.Hair14,
  'bc8dbe98-2990-46ee-ac08-268dddb15bd7': HairType.Hair15,
  'f6a28414-2326-41e1-a9f0-ad76600b4f5b': HairType.Hair16,
  '74a0634c-0ca6-4e8c-a0fc-21cfa6a0663b': HairType.Hair17,
  '854f7b6c-7054-4f51-867c-f5fe8247b884': HairType.Hair18,
  '73005464-e866-44f6-a192-c091bcb15fb3': HairType.Hair19,
  'c0ff663f-006f-4668-9a7a-2c125c55e291': HairType.Hair20,
  'ce9137d2-9c06-412a-ab90-5da4e988902b': HairType.Hair21,
  'd7cb9d99-2e76-43ab-b21e-7c0f9f1df419': HairType.Hair22,
  '63a60790-fc1c-47bb-b0df-d1452e8cde2b': HairType.Hair23,
  '03762539-c42e-4314-9710-97430c72da98': HairType.Hair24,
}

export function readHair(reader: BufferReader): Hair {
  reader.expectUint32(0x13601A95)
  const guid = reader.readGuid()
  const hairType = hairTypes[guid] ?? HairType.None

  const childCount = reader.readUint64()
  switch (childCount) {
    case 0:
      return { hairType }
    case 1:
      return { hairType, modifier: readHairModifier(reader) }
    default:
      throw new Error('Unknown hair count')
  }
}
