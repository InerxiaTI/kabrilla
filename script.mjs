import { execSync } from 'child_process';
import fs from 'fs';

const extension = process.platform === 'win32' ? '.exe' : '';

console.log("extension: "+extension);


const rustInfo = execSync('rustc -vV');
const targetTriple = /host: (\S+)/g.exec(rustInfo)[1];
if (!targetTriple) {
  console.error('Failed to determine platform target triple');
}
fs.renameSync(
  `src-tauri/bin/kabrilla-server${extension}`,
  `src-tauri/bin/kabrilla-server-${targetTriple}${extension}`
);