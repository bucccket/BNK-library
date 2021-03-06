import { u32 } from "../datatypes";
import { FileStream } from "../FileStream";

export class Section {
    name: string = "";

    size: u32 = 0;

    content: FileStream;

    constructor(stream: FileStream | Section) {
        if (stream instanceof FileStream) {
            this.name = stream.readSectionString();
            this.size = stream.readUint32();
            console.log(`got ${this.name} with ${this.size} bytes`);
            this.content = new FileStream(stream.readData(this.size));
        } else {
            this.name = stream.name;
            this.size = stream.size;
            this.content = stream.content;
        }
    }

    read(version: number): void {

    }
}
