import { FileStream } from "../FileStream";

export class Section {

    static read(buffer: FileStream): Section {
        return new Section();
    }
}