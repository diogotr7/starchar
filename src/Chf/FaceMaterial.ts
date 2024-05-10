import type { BufferReader } from '../Utils/BufferReader'
import type { FaceColors } from './FaceColors'
import { readFaceColors } from './FaceColors'
import type { FaceInfo } from './FaceInfo'
import { readFaceInfo } from './FaceInfo'
import { HeadMaterialType } from './HeadMaterial'
import type { MakeupMaterial } from './MakeupMaterial'
import { readMakeupMaterial } from './MakeupMaterial'

export interface FaceMaterial {
  makeup: MakeupMaterial[]
  faceColors: FaceColors
  faceInfo: FaceInfo
}

export function readFaceMaterial(
  reader: BufferReader,
  headMaterialType: HeadMaterialType,
): FaceMaterial {
  // weird special case.
  reader.expectUint32(
    headMaterialType === HeadMaterialType.HeadMaterialF11
      ? 0xA5378A05
      : 0x72129E8E,
  )

  const childCount = reader.readUint32()
  const makeup: MakeupMaterial[] = []
  for (let i = 0; i < childCount; i++)
    makeup.push(readMakeupMaterial(reader))

  const faceInfo = readFaceInfo(reader)
  const faceColors = readFaceColors(reader)
  reader.expectUint32(5)

  return { makeup, faceColors, faceInfo }
}
