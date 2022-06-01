import { readFileSync } from 'fs';
import { SoundbankFile } from './SoundbankFile';

console.log(`running in ${process.cwd()}`);

const data:Buffer = readFileSync('soundbanks/Init.bnk');
const bnk:SoundbankFile = new SoundbankFile(data);
bnk.read();