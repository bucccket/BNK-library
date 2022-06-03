import { copyFileSync } from "fs";
import { FileStream } from "./FileStream";
import { BKHD, STMG } from "./sections";
import { Section } from "./sections";

export class SoundbankFile {
    public sections: Section[];

    private stream: FileStream;

    constructor(data: Buffer) {
        this.stream = new FileStream(data);
        this.sections = [];
    }

    read() {
        while (this.stream.getBytesAvailable() > 0) {
            let section:Section = new Section(this.stream);
            switch (section.name) {
                case "BKHD":
                    let bkhd = new BKHD(section);
                    bkhd.read();
                    this.sections.push(bkhd);
                    break;
                case "STMG":
                    let stmg = new STMG(section);
                    //stmg.read();
                    this.sections.push(stmg);
                    break;
            }   
        }
        if (this.stream.isEOF()) {
            console.log("End of file.");
        }
        else {
            console.log("WARNING: Did not read file completely. Data may be corrupt or missing.");
        }
    }
} 