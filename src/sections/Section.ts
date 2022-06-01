import { FileStream } from "../FileStream";

export class Section {
    
    name: String;

    size: number;

    data: Buffer;

    constructor(stream: FileStream){
        this.name = stream.readSectionString();
        this.size = stream.readUint32();
        this.data = stream.readData(this.size);
    }

    static read(buffer: FileStream): Section {
        return new Section(buffer);
    }
}