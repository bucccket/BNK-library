import { float, u16, u32 } from './../../datatypes';
import { FileStream } from "../../FileStream";

export class TextureSetting {

    ID: u32 = 0;

    // v119-122
    OnOffBand1: u16 = 0;
    OnOffBand2: u16 = 0;
    OnOffBand3: u16 = 0;
    FilterTypeBand1: u16 = 0;
    FilterTypeBand2: u16 = 0;
    FilterTypeBand3: u16 = 0;
    FrequencyBand1: float = 0;
    FrequencyBand2: float = 0;
    FrequencyBand3: float = 0;
    QFactorBand1: float = 0;
    QFactorBand2: float = 0;
    QFactorBand3: float = 0;
    GainBand1: float = 0;
    GainBand2: float = 0;
    GainBand3: float = 0;
    OutputGain: float = 0;

    // v123+
    AbsorptionOffset: float = 0;
    AbsorptionLow: float = 0;
    AbsorptionMidLow: float = 0;
    AbsorptionMidHigh: float = 0;
    AbsorptionHigh: float = 0;
    Scattering: float = 0;

    stream: FileStream;

    constructor(stream: FileStream) {
        this.stream = stream;
    }

    read(version: number) {
        if (version > 118) {
            if (version <= 122) {
                this.OnOffBand1 = this.stream.readUint16();
                this.OnOffBand2 = this.stream.readUint16();
                this.OnOffBand3 = this.stream.readUint16();
                this.FilterTypeBand1 = this.stream.readUint16();
                this.FilterTypeBand2 = this.stream.readUint16();
                this.FilterTypeBand3 = this.stream.readUint16();
                this.FrequencyBand1 = this.stream.readFloat();
                this.FrequencyBand2 = this.stream.readFloat();
                this.FrequencyBand3 = this.stream.readFloat();
                this.QFactorBand1 = this.stream.readFloat();
                this.QFactorBand2 = this.stream.readFloat();
                this.QFactorBand3 = this.stream.readFloat();
                this.GainBand1 = this.stream.readFloat();
                this.GainBand2 = this.stream.readFloat();
                this.GainBand3 = this.stream.readFloat();
                this.OutputGain = this.stream.readFloat();
            } else {
                this.AbsorptionOffset = this.stream.readFloat();
                this.AbsorptionLow = this.stream.readFloat();
                this.AbsorptionMidLow = this.stream.readFloat();
                this.AbsorptionMidHigh = this.stream.readFloat();
                this.AbsorptionHigh = this.stream.readFloat();
                this.Scattering = this.stream.readFloat();
            }
        }
    }

}