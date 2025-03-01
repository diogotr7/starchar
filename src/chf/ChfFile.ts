import {
  compress,
  crc32c,
  get_chf_contents,
} from "../../chf-rs/wasm/pkg/chf_rs_wasm";
import { BufferWriter } from "../utils/BufferWriter";
import { type Character, writeCharacter } from "./Character";

const SIZE = 4096;
const MAGIC = 0x4242;
const MYMAGIC = "diogotr7";

export function extractChf(bytes: Uint8Array): Uint8Array {
  return get_chf_contents(bytes);
}

export function createChf(character: Character): ArrayBuffer {
  const tempBuffer = new ArrayBuffer(SIZE);
  const tempWriter = new BufferWriter(tempBuffer);
  writeCharacter(tempWriter, character);
  const uncompressed = tempBuffer.slice(0, tempWriter.getOffset());

  const compressed = compress(new Uint8Array(uncompressed));
  const chf = new ArrayBuffer(SIZE);
  const chfWriter = new BufferWriter(chf);

  const uncompressedSize = uncompressed.byteLength;
  const compressedSize = compressed.length;
  chfWriter.writeUint32(MAGIC);
  chfWriter.writeUint32(0); // placeholder for crc
  chfWriter.writeUint32(compressedSize);
  chfWriter.writeUint32(uncompressedSize);
  chfWriter.writeBytes(compressed);

  const magicBytes = new TextEncoder().encode(MYMAGIC);
  chfWriter.writeBytesAt(SIZE - magicBytes.length, magicBytes);

  const crc = crc32c(new Uint8Array(chf.slice(16)));
  chfWriter.writeUint32At(4, crc);

  return chf;
}
