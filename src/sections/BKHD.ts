//BKHD
//The BKHD section (Bank Header) contains basic information about the BNK file.

import { u16, u32, u64 } from "../datatypes";
import { Section } from "./Section";

export class BKHD extends Section {
    version: u32 = 0;
    bankID: u32 = 0;
    bankGeneratorVersion: u32 = 0;
    dwLanguageID: u32 = 0;
    timestamp: u64 = 0;
    feedbackInBank: u32 = 0;
    deviceAllocated: u16 = 0;
    projectID: u32 = 0;

    constructor(section: Section) {
        super(section);
    }

    read(): void {
        this.version = this.content.readUint32();

        if (this.version <= 26) {
            this.content.readData(8); // unknown data 2xU32
            this.bankGeneratorVersion = this.content.readUint32();
        } else {
            this.bankGeneratorVersion = this.content.readUint32();
            this.bankID = this.content.readUint32();
        }

        if (this.version <= 122) {
            this.dwLanguageID = this.content.readUint32();
        }

        if (this.version <= 26) {
            this.timestamp = this.content.readUint64();
        }

        if (this.version <= 126) {
            // in later versions seems 16b=feedback + 16b=?, but this is how it's read/checked
            this.feedbackInBank = this.content.readUint32() & 1;
        } else {
            this.content.readUint16(); // unneeded flags??
            this.deviceAllocated = this.content.readUint16();
        }

        if (this.version <= 76) {
            this.projectID = 0;
        } else {
            this.projectID = this.content.readUint32();
        }

        console.log(this);
    }
}
