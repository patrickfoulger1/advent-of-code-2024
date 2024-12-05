const { log } = require('node:console');
const fs = require('node:fs');

fs.readFile('./corruptedCode.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
 
  console.log(getResult(data))

});

function getResult(corruptedCode) {
    const matchArrays = corruptedCode.matchAll(/mul\((\d+),(\d+)\)/g)
    let total = 0

    matchArrays.forEach(matchArr => {
        total += Number(matchArr[1]) * Number(matchArr[2])
    });

    return total
   
}