const fs = require('fs');

const utils = require('./utils.js');

fs.writeFileSync("Test.txt",'Writing in file using "writeFileSync" function.\n');

fs.appendFileSync('Test.txt','Append new text using "appendFileSync" function.');

console.log("start");

const ans =utils(7,5);

console.log(ans);

