import { FileStream } from "./FileStream";
import { BKHD, STMG, Section } from "./sections";

export class SoundbankFile {
    public sections: Section[];

    private stream: FileStream;

    constructor(data: Buffer) {
        this.stream = new FileStream(data);
        this.sections = [];
    }

    read() {
        while (this.stream.getBytesAvailable() >= 8) {
            const section: Section = new Section(this.stream);
            switch (section.name) {
                case "BKHD":
                    const bkhd = new BKHD(section);
                    bkhd.read();
                    this.sections.push(bkhd);
                    break;
                case "STMG":
                    const stmg = new STMG(section);
                    // stmg.read();
                    this.sections.push(stmg);
                    break;
            }
        }
        if (!this.stream.isEOF()) {
            console.log(
                "WARNING: Did not read file completely. Data may be corrupt or missing."
            );
        }

        console.log("Finished reading.");
    }
}
