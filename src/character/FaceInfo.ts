import { BufferReader } from "../BufferReader";

export type FaceInfo = {
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
};
export function readFaceInfo(reader: BufferReader): FaceInfo {
  reader.expectUint32(0x19);
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
  };
}
