import { FileStream } from "./FileStream";
import { BKHD } from "./sections";
import { Section } from "./sections";

export class SoundbankFile {
    public sections: Section[];

    private stream:FileStream;

    constructor(data: Buffer) {
        this.stream = new FileStream(data);
        this.sections = [];
    }

    read(){
        const bkhd = new BKHD(this.stream);
        this.sections.push(bkhd);
        while(this.stream.getBytesAvailable()>0){
            this.sections.push(new Section(this.stream));
        }
        console.log("End of file.");
    }
} 