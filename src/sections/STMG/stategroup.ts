import { float, u16, u8 } from './../../datatypes';
import { u32 } from "../../datatypes";
import { FileStream } from "../../FileStream";

export class StateGroup {
    stateGroupID: u32 = 0;
    defaultTrasitionTime: u32 = 0;
    customTransistionTimeCount: u32 = 0;
    customStateCount: u32 = 0;
    customStates: CustomState[] = [];
    customTransistionCount: u32 = 0;
    customTransistionTimes: CustomTransistionTime[] = [];

    stream: FileStream;

    constructor(stream: FileStream) {
        this.stream = stream;
    }

    read(version: number) {
        this.stateGroupID = this.stream.readUint32();
        this.defaultTrasitionTime = this.stream.readUint32();

        if (version <= 52) {
            this.customStateCount = this.stream.readUint32();
            for (let i = 0; i < this.customStateCount; i++) {
                let state: CustomState = new CustomState(this.stream);
                state.read(version);
                this.customStates.push(state);
            }
        }

        this.customTransistionCount = this.stream.readUint32();

        for (let i = 0; i < this.customTransistionCount; i++) {
            let transition: CustomTransistionTime = new CustomTransistionTime(this.stream);
            transition.read();
            this.customTransistionTimes.push(transition);
        }

    }
}

export class CustomState {

    stream: FileStream;

    stateType: u32 = 0; //? tid() -> u32
    hirctype: u32 | u8 = 0;
    sectionSize: u32 = 0;

    stateID: u32 = 0;

    Volume: float = 0;
    LFEVolume: float = 0;
    Pitch: float = 0;
    LPF: float = 0;

    volumeValueMeaning: u8 = 0;
    LFEValueMeaning: u8 = 0;
    pitchValueMeaning: u8 = 0;
    LPFValueMeaning: u8 = 0;

    cProps: u16 | u8 = 0;
    prop: Map<u8, float> | Map<u16, float> = new Map();


    constructor(stream: FileStream) {
        this.stream = stream;
    }

    read(version: number) {
        this.stateType = this.stream.readUint32();

        if (version <= 48) {
            this.hirctype = this.stream.readUint32() as u32;
        } else {
            this.hirctype = this.stream.readUint8() as u8;
        }
        this.sectionSize = this.stream.readUint32();

        this.stateID = this.stream.readUint32(); //? sid() -> u32

        if (version <= 56) {
            this.Volume = this.stream.readFloat();
            this.LFEVolume = this.stream.readFloat();
            this.Pitch = this.stream.readFloat();
            this.LPF = this.stream.readFloat();
            if (version <= 52) {
                this.volumeValueMeaning = this.stream.readUint8();
                this.LFEValueMeaning = this.stream.readUint8();
                this.pitchValueMeaning = this.stream.readUint8();
                this.LPFValueMeaning = this.stream.readUint8();
            }
        } else if (version <= 126) {
            this.cProps = this.stream.readUint8() as u8;
            for (let i = 0; i < this.cProps; i++) {
                this.prop.set(this.stream.readUint8() as u8, this.stream.readFloat());
            }
        } else {
            this.cProps = this.stream.readUint16() as u16;
            for (let i = 0; i < this.cProps; i++) {
                this.prop.set(this.stream.readUint16() as u16, this.stream.readFloat());
            }
        }
    }
}

export class CustomTransistionTime {
    fromStateID: u32 = 0;
    toStateID: u32 = 0;
    transitionTime: u32 = 0;

    stream: FileStream;

    constructor(stream: FileStream) {
        this.stream = stream;
    }

    read() {
        this.fromStateID = this.stream.readUint32();
        this.toStateID = this.stream.readUint32();
        this.transitionTime = this.stream.readUint32();
    }
}
