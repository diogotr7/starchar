import { crc32c } from "@aws-crypto/crc32c";
import { decompress } from "@cloudpss/zstd/wasm";
import { BufferReader } from "./BufferReader";
import { BufferWriter } from "./BufferWriter";
import { compress } from "@cloudpss/zstd";

const SIZE = 4096;
const MAGIC = 0x00004242;
const MYMAGIC = "diogotr7";

export function extractChf(bytes: Uint8Array): Uint8Array {
  if (bytes.length != SIZE) {
    throw new Error("bytes must be 4096 bytes long");
  }
  const reader = new BufferReader(bytes.buffer);
  const magic = reader.readUint32();
  const crc = reader.readUint32();
  const compressedSize = reader.readUint32();
  const decompressedSize = reader.readUint32();

  if (crc != crc32c(bytes.slice(16))) {
    throw new Error("crc does not match expected crc");
  }

  if (magic != MAGIC) {
    throw new Error("magic does not match expected magic");
  }

  const decompressed = decompress(bytes.slice(16, 16 + compressedSize));

  if (decompressed.length != decompressedSize) {
    throw new Error("decompressed size does not match expected size");
  }

  return decompressed;
}

export function createChf(bytes: Uint8Array): Uint8Array {
  const data = new Uint8Array(SIZE);
  const writer = new BufferWriter(data);

  const compressed = compress(bytes);
  const uncompressedSize = bytes.length;
  const compressedSize = compressed.length;
  writer.writeUint32(MAGIC);
  writer.writeUint32(0); //placeholder for crc
  writer.writeUint32(compressedSize);
  writer.writeUint32(uncompressedSize);
  writer.writeBytes(compressed);

  const magicBytes = new TextEncoder().encode(MYMAGIC);
  writer.writeBytesAt(SIZE - magicBytes.length, magicBytes);

  const crc = crc32c(data.slice(16));
  writer.writeUint32At(4, crc);

  return data;
}
