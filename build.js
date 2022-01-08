const fsE = require('fs-extra');
const childProcess = require('child_process');
// Remove current build
fsE.removeSync('./dist/');
// Copy front-end files
// fsE.copySync('./src/public', './dist/public');
// fsE.copySync('./src/views', './dist/views');
// Transpile the typescript files
childProcess.execSync('tsc --build tsconfig.json');