import type { BufferReader } from "../utils/BufferReader";
import type { BufferWriter } from "../utils/BufferWriter";

export interface FaceInfo {
  freckleAmount: number;
  freckleOpacity: number;
  sunSpotsAmount: number;
  sunSpotOpacity: number;
  eyeMetallic1: number;
  eyeMetallic2: number;
  eyeMetallic3: number;
  eyeSmoothness1: number;
  eyeSmoothness2: number;
  eyeSmoothness3: number;
  eyeOpacity: number;
  cheekMetallic1: number;
  cheekMetallic2: number;
  cheekMetallic3: number;
  cheekSmoothness1: number;
  cheekSmoothness2: number;
  cheekSmoothness3: number;
  cheekOpacity: number;
  lipMetallic1: number;
  lipMetallic2: number;
  lipMetallic3: number;
  lipSmoothness1: number;
  lipSmoothness2: number;
  lipSmoothness3: number;
  lipOpacity: number;
  tatooAge?: number;
  tatooHueRotation?: number;
}
export function readFaceInfo(reader: BufferReader): FaceInfo {
  const tag = reader.readUint32();
  if (tag !== 25 && tag !== 27)
    throw new Error(`Expected FaceInfo tag 0x19 but got ${tag}`);

  reader.expectUint32(0);
  return {
    freckleAmount: reader.readKeyedFloat32(0xe87727e2),
    freckleOpacity: reader.readKeyedFloat32(0x9361cb58),
    sunSpotsAmount: reader.readKeyedFloat32(0x554ad20f),
    sunSpotOpacity: reader.readKeyedFloat32(0xcfc41264),
    eyeMetallic1: reader.readKeyedFloat32(0xb95883b0),
    eyeMetallic2: reader.readKeyedFloat32(0x9cf750c3),
    eyeMetallic3: reader.readKeyedFloat32(0xa90644df),
    eyeSmoothness1: reader.readKeyedFloat32(0xc871a987),
    eyeSmoothness2: reader.readKeyedFloat32(0xedde7af4),
    eyeSmoothness3: reader.readKeyedFloat32(0xd82f6ee8),
    eyeOpacity: reader.readKeyedFloat32(0xcae526ba),
    cheekMetallic1: reader.readKeyedFloat32(0x0526ed02),
    cheekMetallic2: reader.readKeyedFloat32(0x20893e71),
    cheekMetallic3: reader.readKeyedFloat32(0x15782a6d),
    cheekSmoothness1: reader.readKeyedFloat32(0x9be3d5d7),
    cheekSmoothness2: reader.readKeyedFloat32(0xbe4c06a4),
    cheekSmoothness3: reader.readKeyedFloat32(0x8bbd12b8),
    cheekOpacity: reader.readKeyedFloat32(0x11a1a1d3),
    lipMetallic1: reader.readKeyedFloat32(0x92571ac3),
    lipMetallic2: reader.readKeyedFloat32(0xb7f8c9b0),
    lipMetallic3: reader.readKeyedFloat32(0x8209ddac),
    lipSmoothness1: reader.readKeyedFloat32(0xaa9201e7),
    lipSmoothness2: reader.readKeyedFloat32(0x8f3dd294),
    lipSmoothness3: reader.readKeyedFloat32(0xbaccc688),
    lipOpacity: reader.readKeyedFloat32(0x589ddcf4),
    tatooAge: tag === 27 ? reader.readKeyedFloat32(0x064c1127) : undefined,
    tatooHueRotation:
      tag === 27 ? reader.readKeyedFloat32(0xec67c07d) : undefined,
  };
}

export function writeFaceInfo(writer: BufferWriter, faceInfo: FaceInfo) {
  writer.writeUint32(0x19);
  writer.writeUint32(0);
  writer.writeKeyedFloat32(0xe87727e2, faceInfo.freckleAmount);
  writer.writeKeyedFloat32(0x9361cb58, faceInfo.freckleOpacity);
  writer.writeKeyedFloat32(0x554ad20f, faceInfo.sunSpotsAmount);
  writer.writeKeyedFloat32(0xcfc41264, faceInfo.sunSpotOpacity);
  writer.writeKeyedFloat32(0xb95883b0, faceInfo.eyeMetallic1);
  writer.writeKeyedFloat32(0x9cf750c3, faceInfo.eyeMetallic2);
  writer.writeKeyedFloat32(0xa90644df, faceInfo.eyeMetallic3);
  writer.writeKeyedFloat32(0xc871a987, faceInfo.eyeSmoothness1);
  writer.writeKeyedFloat32(0xedde7af4, faceInfo.eyeSmoothness2);
  writer.writeKeyedFloat32(0xd82f6ee8, faceInfo.eyeSmoothness3);
  writer.writeKeyedFloat32(0xcae526ba, faceInfo.eyeOpacity);
  writer.writeKeyedFloat32(0x0526ed02, faceInfo.cheekMetallic1);
  writer.writeKeyedFloat32(0x20893e71, faceInfo.cheekMetallic2);
  writer.writeKeyedFloat32(0x15782a6d, faceInfo.cheekMetallic3);
  writer.writeKeyedFloat32(0x9be3d5d7, faceInfo.cheekSmoothness1);
  writer.writeKeyedFloat32(0xbe4c06a4, faceInfo.cheekSmoothness2);
  writer.writeKeyedFloat32(0x8bbd12b8, faceInfo.cheekSmoothness3);
  writer.writeKeyedFloat32(0x11a1a1d3, faceInfo.cheekOpacity);
  writer.writeKeyedFloat32(0x92571ac3, faceInfo.lipMetallic1);
  writer.writeKeyedFloat32(0xb7f8c9b0, faceInfo.lipMetallic2);
  writer.writeKeyedFloat32(0x8209ddac, faceInfo.lipMetallic3);
  writer.writeKeyedFloat32(0xaa9201e7, faceInfo.lipSmoothness1);
  writer.writeKeyedFloat32(0x8f3dd294, faceInfo.lipSmoothness2);
  writer.writeKeyedFloat32(0xbaccc688, faceInfo.lipSmoothness3);
  writer.writeKeyedFloat32(0x589ddcf4, faceInfo.lipOpacity);
}
