import { crc32c } from '@aws-crypto/crc32c'
import { compress, decompress } from '@cloudpss/zstd/wasm'
import { BufferReader } from '../Utils/BufferReader'
import { BufferWriter } from '../Utils/BufferWriter'
import { type Character, readCharacter, writeCharacter } from './Character'

const SIZE = 4096
const MAGIC = 0x00004242
const MYMAGIC = 'diogotr7'

export function extractChf(bytes: Uint8Array): Uint8Array {
  if (bytes.length !== SIZE)
    throw new Error('bytes must be 4096 bytes long')

  const reader = new BufferReader(bytes.buffer)
  const magic = reader.readUint32()
  const crc = reader.readUint32()
  const compressedSize = reader.readUint32()
  const decompressedSize = reader.readUint32()

  if (crc !== crc32c(bytes.slice(16)))
    throw new Error('crc does not match expected crc')

  if (magic !== MAGIC)
    throw new Error('magic does not match expected magic')

  const decompressed = decompress(bytes.slice(16, 16 + compressedSize))

  if (decompressed.length !== decompressedSize)
    throw new Error('decompressed size does not match expected size')

  return decompressed
}

function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++)
    binary += String.fromCharCode(bytes[i])

  return window.btoa(binary)
}

export function createChf(character: Character): ArrayBuffer {
  const tempBuffer = new ArrayBuffer(SIZE)
  const tempWriter = new BufferWriter(tempBuffer)
  writeCharacter(tempWriter, character)
  const uncompressed = tempBuffer.slice(0, tempWriter.getOffset())

  const compressed = compress(uncompressed, 0)
  const chf = new ArrayBuffer(SIZE)
  const chfWriter = new BufferWriter(chf)

  const uncompressedSize = uncompressed.byteLength
  const compressedSize = compressed.length
  chfWriter.writeUint32(MAGIC)
  chfWriter.writeUint32(0) // placeholder for crc
  chfWriter.writeUint32(compressedSize)
  chfWriter.writeUint32(uncompressedSize)
  chfWriter.writeBytes(compressed)

  const magicBytes = new TextEncoder().encode(MYMAGIC)
  chfWriter.writeBytesAt(SIZE - magicBytes.length, magicBytes)

  const crc = crc32c(new Uint8Array(chf.slice(16)))
  chfWriter.writeUint32At(4, crc)

  // test
  // const x = readCharacter(extractChf(new Uint8Array(chf)))

  return chf
}
