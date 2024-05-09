import { BufferReader } from "../Utils/BufferReader";

export type FaceColors = {
  headColor: string;
  eyeMakeupColor1: string;
  eyeMakeupColor2: string;
  eyeMakeupColor3: string;
  cheekMakeupColor1: string;
  cheekMakeupColor2: string;
  cheekMakeupColor3: string;
  lipMakeupColor1: string;
  lipMakeupColor2: string;
  lipMakeupColor3: string;
  data10: number;
  data11: number;
  data12: number;
  data13: number;
  data14: number;
  data15: number;
  data16: number;
  data17: number;
  data18: number;
  data19: number;
  data20: number;
  data21: number;
};

export function readFaceColors(reader: BufferReader): FaceColors {
  reader.expectUint32(0x16);
  reader.expectUint32(0);

  return {
    headColor: reader.readKeyedColor(0xbd530797),
    eyeMakeupColor1: reader.readKeyedColor(0xb29b1d90),
    eyeMakeupColor2: reader.readKeyedColor(0xe3230e2f),
    eyeMakeupColor3: reader.readKeyedColor(0x2ec0e736),
    cheekMakeupColor1: reader.readKeyedColor(0x1a081a93),
    cheekMakeupColor2: reader.readKeyedColor(0x4bb0092c),
    cheekMakeupColor3: reader.readKeyedColor(0x8653e035),
    lipMakeupColor1: reader.readKeyedColor(0x7d86e792),
    lipMakeupColor2: reader.readKeyedColor(0x2c3ef42d),
    lipMakeupColor3: reader.readKeyedColor(0xe1dd1d34),
    data10: reader.readKeyedUint32(0x64a583ec),
    data11: reader.readKeyedUint32(0x77f57018),
    data12: reader.readKeyedUint32(0xe9f3e598),
    data13: reader.readKeyedUint32(0xfaa3166c),
    data14: reader.readKeyedUint32(0x3cb379f2),
    data15: reader.readKeyedUint32(0x2fe38a06),
    data16: reader.readKeyedUint32(0x32b762f1),
    data17: reader.readKeyedUint32(0x21e79105),
    data18: reader.readKeyedUint32(0xf7e50257),
    data19: reader.readKeyedUint32(0xe4b5f1a3),
    data20: reader.readKeyedUint32(0x7b8b1fd6),
    data21: reader.readKeyedUint32(0x68dbec22),
  };
}
