//BKHD 
//The BKHD section (Bank Header) contains the version number and the SoundBank id.

import { FileStream } from "../FileStream";
import { Section } from "./Section";

export class BKHD extends Section {
    length: number = 0;
    version: number = 0;
    BnkID: number = 0;

    static read(data: FileStream): BKHD {
        const section: BKHD = new BKHD(data);
        return section;
    }
}