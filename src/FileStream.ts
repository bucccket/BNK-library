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
        this.offset += length;
        return this.buffer.slice(this.offset - length, this.offset); // already added length smh
    }

    readUint8(): number {
        this.offset++;
        return this.buffer.readUint8(this.offset);
    }

    readUint16(): number  {
        this.offset += 2;
        return this.buffer.readUint16LE(this.offset);
    }

    readUint24(): number  {
        this.offset += 3;
        return this.buffer.readIntLE(this.offset, 3);
    }

    readUint32(): number  {
        this.offset += 4;
        return this.buffer.readUint32LE(this.offset);
    }

    readSectionString(): String {
        const length = 4;
        return this.readData(length).toString('utf8');
    }

    getBytesAvailable(): number {
        return this.size - this.offset;
    }
}