import { TextureSetting } from './textureSetting';
//STMG
//The STMG section section can only be found in the Init.bnk SoundBank. It contains the project settings as well as the Switch Groups, State Groups and Game Parameters.

import { u16, u32, float } from "../../datatypes";
import { Section } from "../Section";
import { rtpcRamp } from "./rtpcRamp";
import { StateGroup } from "./stategroup";
import { SwitchGroup } from "./switchgroup";
import { Reverbarator } from './reverberator';

export class STMG extends Section {
    volumeThreshold: float = 0;
    maxVoiceInstances: u16 = 0;
    maxNumDangerousVirtVoicesLimitInternal: u16 = 0;
    stateGroupCount: u32 = 0;
    stateGroups: StateGroup[] = [];
    switchGroupCount: u32 = 0;
    switchGroups: SwitchGroup[] = [];
    rtpcRampCount: u32 = 0;
    rtpcRamps: rtpcRamp[] = [];
    acousticTextureCount: u32 = 0;
    acousticTextures: TextureSetting[] = [];
    reverberatorCount: u32 = 0;
    reverberators: Reverbarator[] = [];

    constructor(sectionData: Section) {
        super(sectionData);
    }

    read(version: number): void {
        this.volumeThreshold = this.content.readFloat();
        if (version > 53) {
            this.maxVoiceInstances = this.content.readUint16();
        }
        if (version > 126) {
            this.maxNumDangerousVirtVoicesLimitInternal = this.content.readUint16();
        }

        this.stateGroupCount = this.content.readUint32();

        for (let i = 0; i < this.stateGroupCount; i++) {
            let sg: StateGroup = new StateGroup(this.content);
            sg.read(version);
            this.stateGroups.push(sg);
        }

        this.switchGroupCount = this.content.readUint32();
        for (let i = 0; i < this.switchGroupCount; i++) {
            let sg: SwitchGroup = new SwitchGroup(this.content);
            sg.read(version);
            this.switchGroups.push(sg);
        }

        if (version <= 38) {
            return;
        }

        this.rtpcRampCount = this.content.readUint32();
        for (let i = 0; i < this.rtpcRampCount; i++) {
            let rtcp: rtpcRamp = new rtpcRamp(this.content);
            rtcp.read(version);
            this.rtpcRamps.push(rtcp);
        }

        if (version > 118) {
            this.acousticTextureCount = this.content.readUint32();
            for (let i = 0; i < this.acousticTextureCount; i++) {
                let at: TextureSetting = new TextureSetting(this.content);
                at.read(version);
                this.acousticTextures.push(at);
            }
            if (version > 1122) {
                this.reverberatorCount = this.content.readUint32(); // 1 off!
                for (let i = 0; i < this.reverberatorCount; i++) {
                    let rev: Reverbarator = new Reverbarator(this.content);
                    rev.read(version);
                    this.reverberators.push(rev);
                }
            }
        }

        console.log(this);
    }
}
