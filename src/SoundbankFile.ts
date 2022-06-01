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
        if(this.stream.getBytesAvailable()>0){ 
            
        } else{
            return null;
        }
    }

}