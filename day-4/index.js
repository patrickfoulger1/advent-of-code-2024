const fs = require('node:fs');

fs.readFile('./word-search.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
 
  console.log(getResult(data))

});

function getResult(wordSearch) {
    const rows = wordSearch.split("\r\n")
    const columns = []
    const diagonals = []
    const inverseDiagonals = []
    let xmasCount = 0
    for(const [rowIndex, row] of rows.entries()) {
        xmasCount += countXmas(row)
        const rowChars = [...row]
        rowChars.forEach((char, charIndex) => {
          if(columns[charIndex] === undefined) {
            columns[charIndex] = char
          }
          else
          {
            columns[charIndex] += char
          }

          if(diagonals[charIndex + rowIndex] === undefined) {
            diagonals[charIndex + rowIndex] = char
          }
          else
          {
            diagonals[charIndex + rowIndex] += char
          }

          if(inverseDiagonals[rowChars.length + charIndex - rowIndex] === undefined) {
            inverseDiagonals[rowChars.length + charIndex - rowIndex] = char
          }
          else
          {
            inverseDiagonals[rowChars.length + charIndex - rowIndex] += char
          }
        })  
      }  

  
     
        
      
    for(const column of columns) {
      xmasCount += countXmas(column)
    }

    

  
    for(const diagnonal of diagonals) {
      xmasCount += countXmas(diagnonal)
    }

    for(const diagonal of inverseDiagonals) {
      if (diagonal !== undefined) {
        xmasCount += countXmas(diagonal)
      }
    }
  

    return xmasCount
  }

  function countXmas(str) {
    let xmasTotal = 0
    xmasTotal += [...str.matchAll(/(?=XMAS|SAMX)/g)].length
    return xmasTotal
  }

