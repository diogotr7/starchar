import { BufferReader } from "../Utils/BufferReader";

export type FaceColors = {
  HeadColor: string;
  EyeMakeupColor1: string;
  EyeMakeupColor2: string;
  EyeMakeupColor3: string;
  CheekMakeupColor1: string;
  CheekMakeupColor2: string;
  CheekMakeupColor3: string;
  LipMakeupColor1: string;
  LipMakeupColor2: string;
  LipMakeupColor3: string;
  Data10: number;
  Data11: number;
  Data12: number;
  Data13: number;
  Data14: number;
  Data15: number;
  Data16: number;
  Data17: number;
  Data18: number;
  Data19: number;
  Data20: number;
  Data21: number;
};

export function readFaceColors(reader: BufferReader): FaceColors {
  reader.expectUint32(0x16);
  reader.expectUint32(0);

  return {
    HeadColor: reader.readKeyedColor(0xbd530797),
    EyeMakeupColor1: reader.readKeyedColor(0xb29b1d90),
    EyeMakeupColor2: reader.readKeyedColor(0xe3230e2f),
    EyeMakeupColor3: reader.readKeyedColor(0x2ec0e736),
    CheekMakeupColor1: reader.readKeyedColor(0x1a081a93),
    CheekMakeupColor2: reader.readKeyedColor(0x4bb0092c),
    CheekMakeupColor3: reader.readKeyedColor(0x8653e035),
    LipMakeupColor1: reader.readKeyedColor(0x7d86e792),
    LipMakeupColor2: reader.readKeyedColor(0x2c3ef42d),
    LipMakeupColor3: reader.readKeyedColor(0xe1dd1d34),
    Data10: reader.readKeyedUint32(0x64a583ec),
    Data11: reader.readKeyedUint32(0x77f57018),
    Data12: reader.readKeyedUint32(0xe9f3e598),
    Data13: reader.readKeyedUint32(0xfaa3166c),
    Data14: reader.readKeyedUint32(0x3cb379f2),
    Data15: reader.readKeyedUint32(0x2fe38a06),
    Data16: reader.readKeyedUint32(0x32b762f1),
    Data17: reader.readKeyedUint32(0x21e79105),
    Data18: reader.readKeyedUint32(0xf7e50257),
    Data19: reader.readKeyedUint32(0xe4b5f1a3),
    Data20: reader.readKeyedUint32(0x7b8b1fd6),
    Data21: reader.readKeyedUint32(0x68dbec22),
  };
}
