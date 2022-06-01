import { readFileSync } from 'fs';

console.log(process.cwd());

const data:Buffer = readFileSync('soundbanks/Init.bnk');