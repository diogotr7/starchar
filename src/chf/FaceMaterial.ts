import type { BufferReader } from "../utils/BufferReader";
import type { BufferWriter } from "../utils/BufferWriter";
import type { FaceColors } from "./FaceColors";
import { readFaceColors, writeFaceColors } from "./FaceColors";
import type { FaceInfo } from "./FaceInfo";
import { readFaceInfo, writeFaceInfo } from "./FaceInfo";
import type { HeadMaterialType } from "./HeadMaterial";
import type { MakeupMaterial } from "./MakeupMaterial";
import { readMakeupMaterial, writeMakeupMaterial } from "./MakeupMaterial";

export interface FaceMaterial {
  makeup: MakeupMaterial[];
  faceColors: FaceColors;
  faceInfo: FaceInfo;
}

export function readFaceMaterial(
  reader: BufferReader,
  headMaterialType: HeadMaterialType
): FaceMaterial {
  // weird special case.
  reader.expectUint32(
    headMaterialType === "HeadMaterialF11" ? 0xa5378a05 : 0x72129e8e
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

export function writeFaceMaterial(
  writer: BufferWriter,
  faceMaterial: FaceMaterial,
  headMaterialType: HeadMaterialType
) {
  writer.writeUint32(
    headMaterialType === "HeadMaterialF11" ? 0xa5378a05 : 0x72129e8e
  );
  writer.writeUint32(faceMaterial.makeup.length);
  for (const makeup of faceMaterial.makeup) {
    writeMakeupMaterial(writer, makeup);
  }
  writeFaceInfo(writer, faceMaterial.faceInfo);
  writeFaceColors(writer, faceMaterial.faceColors);
  writer.writeUint32(5);
}
