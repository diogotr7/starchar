import type { BufferReader } from "../utils/BufferReader";
import type { BufferWriter } from "../utils/BufferWriter";
import type { Eyebrows } from "./Eyebrows";
import { readEyebrows, writeEyebrows } from "./Eyebrows";
import type { Eyelashes } from "./Eyelashes";
import { readEyelashes, writeEyelashes } from "./Eyelashes";
import type { Eyes } from "./Eyes";
import { readEyes, writeEyes } from "./Eyes";
import type { FacialHair } from "./FacialHair";
import { readFacialHair, writeFacialHair } from "./FacialHair";
import type { Hair } from "./Hair";
import { readHair, writeHair } from "./Hair";
import { readScalp, Scalp } from "./Scalp";

export interface Head {
  eyes?: Eyes;
  hair?: Hair;
  eyebrows?: Eyebrows;
  eyelashes?: Eyelashes;
  facialHair?: FacialHair;
  scalp?: Scalp;
}

export function readHead(reader: BufferReader): Head {
  reader.expectUint32(0x47010db9);
  reader.expectGuid("1d5cfab3-bf80-4550-b4ab-39e896a7086e");
  const headParts = reader.readUint64();

  const head: Head = {};
  for (let i = 0; i < headParts; i++) {
    switch (reader.peekUint32()) {
      case 0xc5bb5550: {
        head.eyes = readEyes(reader);
        break;
      }
      case 0x13601a95: {
        head.hair = readHair(reader);
        break;
      }
      case 0x1787ee22: {
        head.eyebrows = readEyebrows(reader);
        break;
      }
      case 0x190b04e2: {
        head.eyelashes = readEyelashes(reader);
        break;
      }
      case 0x98efbb1c: {
        head.facialHair = readFacialHair(reader);
        break;
      }
      case 0xddfa667b: {
        //universal_scalp_itemport
        head.scalp = readScalp(reader);
        break;
      }
      default:
        throw new Error(
          "Unknown head part: " + reader.peekUint32().toString(16)
        );
    }
  }

  return head;
}

export function writeHead(writer: BufferWriter, head: Head) {
  writer.writeUint32(0x47010db9);
  writer.writeGuid("1d5cfab3-bf80-4550-b4ab-39e896a7086e");
  writer.writeUint64(Object.keys(head).length);
  if (head.eyes) {
    writeEyes(writer);
  }

  if (head.hair) {
    writeHair(writer, head.hair);
  }

  if (head.eyebrows) {
    writeEyebrows(writer, head.eyebrows);
  }

  if (head.eyelashes) {
    writeEyelashes(writer, head.eyelashes);
  }

  if (head.facialHair) {
    writeFacialHair(writer, head.facialHair);
  }
}
