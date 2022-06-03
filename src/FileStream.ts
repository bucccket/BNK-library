import { float, u16, u24, u32, u64, u8 } from "./DataTypes";

export class FileStream {
    buffer: Buffer;

    offset: number = 0;

    size: number = 0;

    constructor(buffer?: Buffer) {
        if (!buffer) {
            buffer = Buffer.alloc(0);
        }
        this.size = buffer.byteLength;
        this.buffer = buffer;
    }

    readData(length: number): Buffer {
        if (length > this.getBytesAvailable()) {
            throw new Error(
                `Tried reading ${length} bytes with ${this.getBytesAvailable()} bytes available`
            );
        }
        this.offset += length;
        return this.buffer.slice(this.offset - length, this.offset); // already added length smh
    }

    readUint8(): u8 {
        this.offset++;
        return this.buffer.readUint8(this.offset - 1);
    }

    readUint16(): u16 {
        this.offset += 2;
        return this.buffer.readUint16LE(this.offset - 2);
    }

    readUint24(): u24 {
        this.offset += 3;
        return this.buffer.readIntLE(this.offset - 3, 3);
    }

    readUint32(): u32 {
        this.offset += 4;
        return this.buffer.readUint32LE(this.offset - 4);
    }

    readUint64(): u64 {
        this.offset += 8;
        let result: u64 =
            (this.buffer.readUint32LE(this.offset - 8) << 32) &
            this.buffer.readUint32LE(this.offset - 4);
        if (Number.isSafeInteger(result)) {
            return result;
        } else {
            throw new Error(
                "ERROR: Failed reading 64 bit integer. -> Unsafe Integer"
            );
        }
    }

    readSectionString(): String {
        const length = 4;
        return this.readData(length).toString("utf8");
    }

    readFloat(): float {
        this.offset += 4;
        return this.buffer.readFloatLE(this.offset - 4);
    }

    getBytesAvailable(): number {
        return this.size - this.offset;
    }

    skipBytes(skip: number): void {
        this.offset += skip;
    }

    isEOF(): boolean {
        if (this.getBytesAvailable() == 0) {
            return true;
        } else {
            return false;
        }
    }
}
