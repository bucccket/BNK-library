import { u32 } from "../../datatypes";
import { FileStream } from "../../FileStream";

export class StateGroup{
    stateGroupID:u32;
    defaultTrasitionTime:u32;
    customTransistionTimeCount:u32;
    customTransistionTimes:CustomTransistionTime[];

    constructor(stream:FileStream){
        this.stateGroupID = stream.readUint32();
        this.defaultTrasitionTime = stream.readUint32();
        this.customTransistionTimeCount = stream.readUint32();
        console.log(`state Group #${this.stateGroupID} with ${this.customTransistionTimeCount} custom times`);
        this.customTransistionTimes = [];
        for(let i = 0; i < this.customTransistionTimeCount; i++){ 
            this.customTransistionTimes.push(new CustomTransistionTime(new FileStream(stream.readData(12))));
        }
    }
}

export class CustomTransistionTime{
    fromStateID:u32;
    toStateID:u32;
    transitionTime:u32;

    constructor(stream:FileStream){
        this.fromStateID = stream.readUint32();
        this.toStateID = stream.readUint32();
        this.transitionTime = stream.readUint32();
    }
}