import { BufferReader } from "../buffer-reader";
import { StarCitizenFacialHair, readFacialHair } from "./StarCitizenFacialHair";
import { StarCitizenEyelashes, readEyelashes } from "./StarCitizenEyelashes";
import { StarCitizenEyebrows, readEyebrows } from "./StarCitizenEyebrows";
import { StarCitizenHair, readHair } from "./StarCitizenHair";
import { StarCitizenEyes, readEyes } from "./StarCitizenEyes";

export type StarCitizenHead = {
  eyes?: StarCitizenEyes;
  hair?: StarCitizenHair;
  eyebrows?: StarCitizenEyebrows;
  eyelashes?: StarCitizenEyelashes;
  facialHair?: StarCitizenFacialHair;
};

export function readHead(reader: BufferReader): StarCitizenHead {
  reader.expectUint32(0x47010db9);
  reader.expectGuid("1d5cfab3-bf80-4550-b4ab-39e896a7086e");
  const headParts = reader.readUint64();

  const head: StarCitizenHead = {};
  for (let i = 0; i < headParts; i++) {
    switch (reader.peekUint32()) {
      case 0xc5bb5550:
        head.eyes = readEyes(reader);
        break;
      case 0x13601a95:
        head.hair = readHair(reader);
        break;
      case 0x1787ee22:
        head.eyebrows = readEyebrows(reader);
        break;
      case 0x190b04e2:
        head.eyelashes = readEyelashes(reader);
        break;
      case 0x98efbb1c:
        head.facialHair = readFacialHair(reader);
        break;
      default:
        throw new Error("Unknown head part");
    }
  }

  return head;
}
