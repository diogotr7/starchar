import { BufferReader } from "../Utils/BufferReader";
import { FaceColors, readFaceColors } from "./FaceColors";
import { FaceInfo, readFaceInfo } from "./FaceInfo";
import { HeadMaterialType } from "./HeadMaterial";
import { MakeupMaterial, readMakeupMaterial } from "./MakeupMaterial";

export type FaceMaterial = {
  makeup: MakeupMaterial[];
  faceColors: FaceColors;
  faceInfo: FaceInfo;
};

export function readFaceMaterial(
  reader: BufferReader,
  headMaterialType: HeadMaterialType
): FaceMaterial {
  //weird special case.
  reader.expectUint32(
    headMaterialType === HeadMaterialType.HeadMaterialF11
      ? 0xa5378a05
      : 0x72129e8e
  );

  const childCount = reader.readUint32();
  const makeup: MakeupMaterial[] = [];
  for (let i = 0; i < childCount; i++) {
    makeup.push(readMakeupMaterial(reader));
  }

  const faceInfo = readFaceInfo(reader);
  const faceColors = readFaceColors(reader);
  reader.expectUint32(5);

  return { makeup, faceColors, faceInfo };
}
