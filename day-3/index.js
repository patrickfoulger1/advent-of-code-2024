const fs = require('node:fs');

fs.readFile('./corruptedCode.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
 
  console.log(getResult(data))

});

function getResult(corruptedCode) {

    const matchArrays = removeDontSections(corruptedCode).matchAll(/mul\((\d+),(\d+)\)/g)

    let total = 0

    matchArrays.forEach(matchArr => {
        total += Number(matchArr[1]) * Number(matchArr[2])
    });

    return total
   
}

function removeDontSections(corruptedCode) {
    
    return corruptedCode.replace(/don't\(\)[\s\S]*?do\(\)/g, "")
    

}