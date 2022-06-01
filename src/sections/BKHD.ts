//BKHD 
//The BKHD section (Bank Header) contains the version number and the SoundBank id.

import { FileStream } from "../FileStream";
import { Section } from "./Section";

export class BKHD extends Section {
    version: number = 0;
    BnkID: number = 0;

    constructor(stream: FileStream){
        super(stream);
        const content:FileStream = new FileStream(this.data);
        this.version = content.readUint32();
        this.BnkID = content.readUint32();
    }
}