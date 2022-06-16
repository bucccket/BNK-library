import { float, u32 } from '../../datatypes';
import { FileStream } from "../../FileStream";

export class Reverbarator {

    ID: u32 = 0;
    Time: float = 0;
    HFRatio: float = 0;
    DryLevel: float = 0;
    WetLevel: float = 0;
    Spread: float = 0;
    Density: float = 0;
    Quality: float = 0;
    Diffusion: float = 0;
    Scale: float = 0;

    stream: FileStream;

    constructor(stream: FileStream) {
        this.stream = stream;
    }

    read(version: number) {
        this.ID = this.stream.readUint32();
        this.Time = this.stream.readFloat();
        this.HFRatio = this.stream.readFloat();
        this.DryLevel = this.stream.readFloat();
        this.WetLevel = this.stream.readFloat();
        this.Spread = this.stream.readFloat();
        this.Density = this.stream.readFloat();
        this.Quality = this.stream.readFloat();
        this.Diffusion = this.stream.readFloat();
        this.Scale = this.stream.readFloat();
    }

}