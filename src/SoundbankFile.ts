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
        const bkhd = new BKHD(this.stream);
        bkhd.read();
        this.sections.push(bkhd);
        while (this.stream.getBytesAvailable() >= 8) {
            const section: Section = new Section(this.stream);
            switch (section.name) {
                case "STMG":
                    const stmg = new STMG(section);
                    stmg.read(bkhd.version);
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
