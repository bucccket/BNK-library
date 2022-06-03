//STMG
//The STMG section section can only be found in the Init.bnk SoundBank. It contains the project settings as well as the Switch Groups, State Groups and Game Parameters.

import { u16, u32, float } from "../../datatypes";
import { Section } from "../Section";
import { StateGroup } from "./stategroup";

export class STMG extends Section {
    volumeThreshold: float = 0;
    maxVoiceInstances: u16 = 0;
    stateGroupCount: u32 = 0;
    stateGroups: StateGroup[] = [];
    switchGroupCount: u32 = 0;

    constructor(sectionData: Section) {
        super(sectionData);
    }

    read(): void {
        this.volumeThreshold = this.content.readFloat();
        this.maxVoiceInstances = this.content.readUint16();
        this.stateGroupCount = this.content.readUint32();
        console.log(`STMG with ${this.stateGroupCount} custom state groups`);
        for (let i = 0; i < this.stateGroupCount; i++) {
            this.stateGroups.push(new StateGroup(this.content));
        }
    }
}
