function H(n: number): string {
  return n.toString(16).padStart(2, '0')
}

export class BufferReader {
  view: DataView
  offset: number

  constructor(buffer: ArrayBuffer) {
    this.view = new DataView(buffer)
    this.offset = 0
  }

  peekUint32(): number {
    return this.view.getUint32(this.offset, true)
  }

  readByte(): number {
    const value = this.view.getUint8(this.offset)
    this.offset += Int8Array.BYTES_PER_ELEMENT
    return value
  }

  readUint16(): number {
    const value = this.view.getUint16(this.offset, true)
    this.offset += Int16Array.BYTES_PER_ELEMENT
    return value
  }

  readUint16Le(): number {
    const value = this.view.getUint16(this.offset, false)
    this.offset += Int16Array.BYTES_PER_ELEMENT
    return value
  }

  readUint32(): number {
    const value = this.view.getUint32(this.offset, true)
    this.offset += Int32Array.BYTES_PER_ELEMENT
    return value
  }

  readUint64(): number {
    const low = this.readUint32()
    const high = this.readUint32()
    return low + high * 2 ** 32
  }

  readFloat32(): number {
    const value = this.view.getFloat32(this.offset, true)
    this.offset += Float32Array.BYTES_PER_ELEMENT
    return value
  }

  readKeyedFloat32(key: number, count: number = 0): number {
    this.expectUint32(key)
    const data = this.readFloat32()
    this.expectUint32(count)
    return data
  }

  readKeyedColor(key: number, count: number = 0): string {
    this.expectUint32(key)
    const r = this.readByte()
    const g = this.readByte()
    const b = this.readByte()
    // ignore alpha
    this.readByte()
    this.expectUint32(count)
    return `#${H(r)}${H(g)}${H(b)}`
  }

  readKeyedUint32(key: number, count: number = 0): number {
    this.expectUint32(key)
    const value = this.readUint32()
    this.expectUint32(count)
    return value
  }

  readGuid(): string {
    // 16 bytes
    const a = this.readByte()
    const b = this.readByte()
    const c = this.readByte()
    const d = this.readByte()
    const e = this.readByte()
    const f = this.readByte()
    const g = this.readByte()
    const h = this.readByte()
    const i = this.readByte()
    const j = this.readByte()
    const k = this.readByte()
    const l = this.readByte()
    const m = this.readByte()
    const n = this.readByte()
    const o = this.readByte()
    const p = this.readByte()

    // I hate this
    return `${H(h)}${H(g)}${H(f)}${H(e)}-${H(d)}${H(c)}-${H(b)}${H(a)}-${H(p)}${H(o)}-${H(n)}${H(m)}${H(l)}${H(k)}${H(j)}${H(i)}`
  }

  readBytes(count: number): Uint8Array {
    const bytes = new Uint8Array(count)
    for (let i = 0; i < count; i++)
      bytes[i] = this.readByte()

    return bytes
  }

  expectByte(value: number) {
    const actual = this.readByte()
    if (actual !== value)
      throw new Error(`expected ${value}, got ${actual}`)
  }

  expectUint32(value: number): void {
    const actual = this.readUint32()
    if (actual !== value)
      throw new Error(`expected ${value}, got ${actual}`)
  }

  expectUint64(value: number): void {
    const actual = this.readUint64()
    if (actual !== value)
      throw new Error(`expected ${value}, got ${actual}`)
  }

  expectEmptyGuid(): void {
    for (let i = 0; i < 16; i++) {
      if (this.readByte() !== 0)
        throw new Error('expected empty guid')
    }
  }

  expectGuid(value: string): void {
    const actual = this.readGuid()
    if (actual !== value)
      throw new Error(`expected ${value}, got ${actual}`)
  }

  skip(count: number): void {
    this.offset += count
  }
}
