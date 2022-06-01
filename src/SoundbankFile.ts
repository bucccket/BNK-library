import { FileStream } from "./FileStream";
import { Section } from "./sections/Section";

export class SoundbankFile {
    public sections: Section[];

    private data: Buffer;
    private stream:FileStream;

    constructor(data: Buffer) {
        this.data = data;
        this.stream = new FileStream(this.data);
        this.sections = [];
    }

    read(){
        while(this.stream.getBytesAvailable()>0){
            const section = new Section(this.stream);
            console.log(`got section section: ${section.name}`);
            this.sections.push(section);
        }
    }
} 