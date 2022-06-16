import { float } from './../../datatypes';
import { u32, u8 } from "../../datatypes";
import { FileStream } from "../../FileStream";

export class SwitchGroup {

    switchgroupID: u32 = 0;
    rtpcID: u32 = 0;
    rtpcType: u8 = 0;

    rtpcGraphPointCount: u32 = 0;
    rtpcGraphPoints:RTPCGraphPoint[] = [];

    stream: FileStream;

    constructor(stream: FileStream) {
        this.stream = stream;
    }

    read(version: number) {
        this.switchgroupID = this.stream.readUint32();
        this.rtpcID = this.stream.readUint32();
        if (version > 89) {
            this.rtpcType = this.stream.readUint8();
        }
        this.rtpcGraphPointCount = this.stream.readUint32();
        for (let i = 0; i < this.rtpcGraphPointCount; i++) {
            let rtpcGP: RTPCGraphPoint = new RTPCGraphPoint(this.stream);
            rtpcGP.read();
            this.rtpcGraphPoints.push(rtpcGP);
        }
    }
}

export class RTPCGraphPoint{

    from:float = 0;
    to:float = 0;
    interpolation:u32 = 0;

    stream: FileStream;

    constructor(stream: FileStream) {
        this.stream = stream;
    }

    read() {
        this.from = this.stream.readFloat();
        this.to = this.stream.readFloat();
        this.interpolation = this.stream.readUint32();
    }
}