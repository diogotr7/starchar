export class BufferWriter {
  private view: DataView
  private offset: number

  constructor(arrayBuffer: ArrayBuffer) {
    this.view = new DataView(arrayBuffer)
    this.offset = 0
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
}
