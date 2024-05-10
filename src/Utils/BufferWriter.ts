export class BufferWriter {
  private view: DataView
  private offset: number

  constructor(arrayBuffer: ArrayBuffer) {
    this.view = new DataView(arrayBuffer)
    this.offset = 0
  }

  getOffset(): number {
    return this.offset
  }

  writeByte(value: number): void {
    this.view.setInt8(this.offset, value)
    this.offset += Int8Array.BYTES_PER_ELEMENT
  }

  writeUint16(value: number): void {
    this.view.setInt16(this.offset, value, true)
    this.offset += Int16Array.BYTES_PER_ELEMENT
  }

  writeUint32(value: number): void {
    this.view.setUint32(this.offset, value, true)
    this.offset += Int32Array.BYTES_PER_ELEMENT
  }

  writeFloat32(value: number): void {
    this.view.setFloat32(this.offset, value, true)
    this.offset += Float32Array.BYTES_PER_ELEMENT
  }

  writeUint64(val: number) {
    const low = val & 0xFFFFFFFF
    const high = val / 0x100000000
    this.writeUint32(low)
    this.writeUint32(high)
  }

  writeBytes(value: Uint8Array): void {
    value.forEach((byte) => {
      this.writeByte(byte)
    })
  }

  writeUint32At(offset: number, value: number): void {
    this.view.setUint32(offset, value, true)
  }

  writeBytesAt(offset: number, value: Uint8Array): void {
    value.forEach((byte, index) => {
      this.view.setUint8(offset + index, byte)
    })
  }

  writeColor(value: string): void {
    const parts = value.split('#')
    if (parts.length !== 2)
      throw new Error('Invalid color format')

    const color = parts[1]
    if (color.length !== 6)
      throw new Error('Invalid color format')

    const r = Number.parseInt(color.slice(0, 2), 16)
    const g = Number.parseInt(color.slice(2, 4), 16)
    const b = Number.parseInt(color.slice(4, 6), 16)

    this.writeByte(r)
    this.writeByte(g)
    this.writeByte(b)
    this.writeByte(0xFF)
  }

  writeGuid(value: string): void {
    const bytes = new Uint8Array(16)
    const parts = value.split('-')
    parts.forEach((part, index) => {
      const byte = Number.parseInt(part, 16)
      bytes[index] = byte
    })

    this.writeByte(bytes[7])
    this.writeByte(bytes[6])
    this.writeByte(bytes[5])
    this.writeByte(bytes[4])

    this.writeByte(bytes[3])
    this.writeByte(bytes[2])

    this.writeByte(bytes[1])
    this.writeByte(bytes[0])

    this.writeByte(bytes[15])
    this.writeByte(bytes[14])
    this.writeByte(bytes[13])
    this.writeByte(bytes[12])
    this.writeByte(bytes[11])
    this.writeByte(bytes[10])
    this.writeByte(bytes[9])
    this.writeByte(bytes[8])
  }

  writeEmptyGuid() {
    for (let i = 0; i < 16; i++)
      this.writeByte(0)
  }

  writeKeyedFloat32(key: number, float: number, count: number = 0): void {
    this.writeUint32(key)
    this.writeFloat32(float)
    this.writeUint32(count)
  }

  writeKeyedColor(key: number, value: string, count: number = 0) {
    this.writeUint32(key)
    this.writeColor(value)
    this.writeUint32(count)
  }

  writeKeyedUint32(key: number, value: number, count: number = 0) {
    this.writeUint32(key)
    this.writeUint32(value)
    this.writeUint32(count)
  }
}
