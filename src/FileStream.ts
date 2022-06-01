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
            throw new Error(`Tried reading ${length} bytes with ${this.size} bytes available`);
        }
        this.offset += length;
        return this.buffer.slice(this.offset - length, this.offset); // already added length smh
    }

    readUint8(): number {
        this.offset++;
        return this.buffer.readUint8(this.offset - 1);
    }

    readUint16(): number {
        this.offset += 2;
        return this.buffer.readUint16LE(this.offset - 2);
    }

    readUint24(): number {
        this.offset += 3;
        return this.buffer.readIntLE(this.offset - 3, 3);
    }


    readUint32(): number {
        this.offset += 4;
        return this.buffer.readUint32LE(this.offset - 4);
    }

    readSectionString(): String {
        const length = 4;
        return this.readData(length).toString('utf8');
    }

    getBytesAvailable(): number {
        return this.size - this.offset;
    }

    skipBytes(skip: number): void {
        this.offset += skip;
    }
}