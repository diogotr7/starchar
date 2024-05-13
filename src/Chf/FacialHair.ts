import type { BufferReader } from '../BufferReader'
import type { BufferWriter } from '../BufferWriter'
import type { HairModifier } from './HairModifier'
import { readHairModifier, writeHairModifier } from './HairModifier'

export type FacialHairType =
  'None' |
  'Beard01' |
  'Beard02' |
  'Beard03' |
  'Beard04' |
  'Beard05' |
  'Beard06' |
  'Beard07' |
  'Beard08' |
  'Beard09' |
  'Beard10' |
  'Beard11' |
  'Beard12' |
  'Beard13' |
  'Beard14' |
  'Beard15' |
  'Beard16' |
  'Beard17' |
  'Beard18' |
  'Beard19' |
  'Beard20' |
  'Beard21' |
  'Beard22' |
  'Beard23' |
  'Beard24' |
  'Beard25' |
  'Beard26' |
  'Beard27' |
  'Beard28' |
  'Beard29' |
  'Beard30'

const facialHairTypeMap: Record<string, FacialHairType> = {
  '3df7bdc3-ea80-47db-bbb7-8a6f28701c3e': 'Beard01',
  'e6c2c999-3731-4163-9f1a-e37df9b9a267': 'Beard02',
  'c9e19547-ba61-473f-b9b6-e5b8a14cb57e': 'Beard03',
  'a55229ce-89bb-405c-a225-e507e7de07ef': 'Beard04',
  '3545b83d-46c3-45d1-965a-3cfc15136ea3': 'Beard05',
  'ffb50f1a-cf01-4275-8216-71df949a2a9c': 'Beard06',
  'adc4a371-415f-4cbb-8873-569d4aec2b23': 'Beard07',
  '6c77f900-4da0-4378-891a-387d4c2572d2': 'Beard08',
  '15cc8f8d-2172-47d9-a94d-a7d504b9024d': 'Beard09',
  '184e3d83-9a08-4a6a-afd0-311836cc760e': 'Beard10',
  '59bb4f34-dd05-4f40-93f9-0161642598e0': 'Beard11',
  'b075b2cf-16a4-4152-954b-02f9fdaf3ea5': 'Beard12',
  'ee80bd3d-3b43-4ca3-b2de-e519efd4c9d7': 'Beard13',
  'f3248be1-955f-429b-ab7b-9634a531e253': 'Beard14',
  'e7eeecde-9633-481e-8b4c-f0e45a1a7e03': 'Beard15',
  '34d313db-db6f-45b0-82d9-25ae51fa7df0': 'Beard16',
  '2d459cc1-f95d-4baa-a118-cbc05bca9d97': 'Beard17',
  '2dec0896-245b-4ab1-b13d-44b0046c6774': 'Beard18',
  '547dcea1-2559-4f54-af6a-e7f025552e96': 'Beard19',
  '7b5556a2-c331-4192-b1f9-0941d778b7e3': 'Beard20',
  '8590e357-d3a7-4d39-88ff-d199ecb236c7': 'Beard21',
  'c5b7f31a-f0b5-4229-91c3-be2f859966fa': 'Beard22',
  '8ce83349-a151-4d98-ab07-d710bb8bc5fc': 'Beard23',
  '92b25f3c-740d-47ec-aae6-f2f20b2ecf68': 'Beard24',
  '88c8eee7-42cf-4baf-8286-c736a2c1bd93': 'Beard25',
  '4e1f14bc-3db8-483b-ab97-c948d8e984b8': 'Beard26',
  'bda4e041-2f54-4ec6-9bd8-6807e80ddfd6': 'Beard27',
  'e27a835b-965f-487b-bef7-ac8be077cc62': 'Beard28',
  '09b25ba2-4e5d-4135-8d27-5649227b7a74': 'Beard29',
  '31de0f7c-a059-4a5c-8917-d699a79af303': 'Beard30',
}

const reverseFacialHair = Object.fromEntries(Object.entries(facialHairTypeMap).map(([k, v]) => [v, k]))

export interface FacialHair {
  childCount: number
  childCount2?: number
  facialHairType: FacialHairType
  modifier?: HairModifier
}

export function readFacialHair(reader: BufferReader): FacialHair {
  reader.expectUint32(0x98EFBB1C)
  const guid = reader.readGuid()
  const facialHairType = facialHairTypeMap[guid] ?? 'None'
  const childCount = reader.readUint32()

  switch (childCount) {
    case 0: {
      const count2 = reader.readUint32()
      if (count2 !== 5 && count2 !== 6 && count2 !== 4)
        throw new Error(`Unknown facial hair count : ${count2}`)

      reader.expectUint32(5)
      return {
        childCount,
        childCount2: count2,
        facialHairType,
        modifier: undefined,
      }
    }
    case 1: {
      reader.expectUint32(0)
      return {
        childCount,
        facialHairType,
        modifier: readHairModifier(reader),
      }
    }
    default:
      throw new Error('Unknown facial hair count')
  }
}

export function writeFacialHair(writer: BufferWriter, facialHair: FacialHair) {
  writer.writeUint32(0x98EFBB1C)
  writer.writeGuid(reverseFacialHair[facialHair.facialHairType]!)
  writer.writeUint32(facialHair.childCount)
  switch (facialHair.childCount) {
    case 0:
      writer.writeUint32(facialHair.childCount2!)
      writer.writeUint32(5)
      break
    case 1:
      writer.writeUint32(0)
      writeHairModifier(writer, facialHair.modifier!)
      break
    default:
      throw new Error('Unknown facial hair count')
  }
}
