import type { BufferReader } from '../BufferReader'
import type { BufferWriter } from '../BufferWriter'

export interface FaceColors {
  headColor: string
  eyeMakeupColor1: string
  eyeMakeupColor2: string
  eyeMakeupColor3: string
  cheekMakeupColor1: string
  cheekMakeupColor2: string
  cheekMakeupColor3: string
  lipMakeupColor1: string
  lipMakeupColor2: string
  lipMakeupColor3: string
  data10: number
  data11: number
  data12: number
  data13: number
  data14: number
  data15: number
  data16: number
  data17: number
  data18: number
  data19: number
  data20: number
  data21: number
}

export function readFaceColors(reader: BufferReader): FaceColors {
  reader.expectUint32(0x16)
  reader.expectUint32(0)

  return {
    headColor: reader.readKeyedColor(0xBD530797),
    eyeMakeupColor1: reader.readKeyedColor(0xB29B1D90),
    eyeMakeupColor2: reader.readKeyedColor(0xE3230E2F),
    eyeMakeupColor3: reader.readKeyedColor(0x2EC0E736),
    cheekMakeupColor1: reader.readKeyedColor(0x1A081A93),
    cheekMakeupColor2: reader.readKeyedColor(0x4BB0092C),
    cheekMakeupColor3: reader.readKeyedColor(0x8653E035),
    lipMakeupColor1: reader.readKeyedColor(0x7D86E792),
    lipMakeupColor2: reader.readKeyedColor(0x2C3EF42D),
    lipMakeupColor3: reader.readKeyedColor(0xE1DD1D34),
    data10: reader.readKeyedUint32(0x64A583EC),
    data11: reader.readKeyedUint32(0x77F57018),
    data12: reader.readKeyedUint32(0xE9F3E598),
    data13: reader.readKeyedUint32(0xFAA3166C),
    data14: reader.readKeyedUint32(0x3CB379F2),
    data15: reader.readKeyedUint32(0x2FE38A06),
    data16: reader.readKeyedUint32(0x32B762F1),
    data17: reader.readKeyedUint32(0x21E79105),
    data18: reader.readKeyedUint32(0xF7E50257),
    data19: reader.readKeyedUint32(0xE4B5F1A3),
    data20: reader.readKeyedUint32(0x7B8B1FD6),
    data21: reader.readKeyedUint32(0x68DBEC22),
  }
}

export function writeFaceColors(writer: BufferWriter, faceColors: FaceColors) {
  writer.writeUint32(0x16)
  writer.writeUint32(0)
  writer.writeKeyedColor(0xBD530797, faceColors.headColor)
  writer.writeKeyedColor(0xB29B1D90, faceColors.eyeMakeupColor1)
  writer.writeKeyedColor(0xE3230E2F, faceColors.eyeMakeupColor2)
  writer.writeKeyedColor(0x2EC0E736, faceColors.eyeMakeupColor3)
  writer.writeKeyedColor(0x1A081A93, faceColors.cheekMakeupColor1)
  writer.writeKeyedColor(0x4BB0092C, faceColors.cheekMakeupColor2)
  writer.writeKeyedColor(0x8653E035, faceColors.cheekMakeupColor3)
  writer.writeKeyedColor(0x7D86E792, faceColors.lipMakeupColor1)
  writer.writeKeyedColor(0x2C3EF42D, faceColors.lipMakeupColor2)
  writer.writeKeyedColor(0xE1DD1D34, faceColors.lipMakeupColor3)
  writer.writeKeyedUint32(0x64A583EC, faceColors.data10)
  writer.writeKeyedUint32(0x77F57018, faceColors.data11)
  writer.writeKeyedUint32(0xE9F3E598, faceColors.data12)
  writer.writeKeyedUint32(0xFAA3166C, faceColors.data13)
  writer.writeKeyedUint32(0x3CB379F2, faceColors.data14)
  writer.writeKeyedUint32(0x2FE38A06, faceColors.data15)
  writer.writeKeyedUint32(0x32B762F1, faceColors.data16)
  writer.writeKeyedUint32(0x21E79105, faceColors.data17)
  writer.writeKeyedUint32(0xF7E50257, faceColors.data18)
  writer.writeKeyedUint32(0xE4B5F1A3, faceColors.data19)
  writer.writeKeyedUint32(0x7B8B1FD6, faceColors.data20)
  writer.writeKeyedUint32(0x68DBEC22, faceColors.data21)
}
