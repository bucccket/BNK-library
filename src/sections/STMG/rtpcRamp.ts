import { u32, float, u8 } from "../../datatypes";
import { FileStream } from "../../FileStream";

export class rtpcRamp {
    RTPC_ID: u32 = 0;
    value: float = 0;

    rampType: u32 = 0;
    rampUp: float = 0;
    rampDown: float = 0;
    bindToBuildInParam: u8 = 0;


    stream: FileStream;

    constructor(stream: FileStream) {
        this.stream = stream;
    }

    read(version: number) {
        this.RTPC_ID = this.stream.readUint32();
        this.value = this.stream.readFloat();

        if (version > 89) {
            this.rampType = this.stream.readUint32();
            this.rampUp = this.stream.readFloat();
            this.rampDown = this.stream.readFloat();
            this.bindToBuildInParam = this.stream.readUint8();
        }
    }

}