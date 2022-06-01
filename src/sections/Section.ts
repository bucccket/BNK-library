import { FileStream } from "../FileStream";

export class Section {
    
    name: String;

    size: number;

    data: Buffer;

    constructor(stream: FileStream){
        this.name = stream.readSectionString();
        this.size = stream.readUint32();
        console.log(`got ${this.name} with ${this.size} bytes`);
        this.data = stream.readData(this.size);
    }
}