const fs = require('node:fs');

fs.readFile('./word-search.txt', 'utf8', (err, wordsearch) => {
  if (err) {
    console.error(err);
    return;
  }
 
  console.log(getXmasCount(wordsearch))
  console.log(getMasCrossCount(wordsearch))

});

function getXmasCount(wordSearch) {
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

  function getMasCrossCount(wordSearch) {
    let masCrossCount = 0
    const rows = wordSearch.split("\r\n")
    const cells = []

    for(const [rowIndex, row] of rows.entries()) {
      const rowChars = [...row]

      rowChars.forEach((char, charIndex) => {
        cells.push(new Cell(charIndex, rowIndex, char))
      })
     
    }
    
  
    for(const cell of cells) {
      if(cell.value === "A") {
        if(checkIfMas(cell, cells)) {
          masCrossCount ++
        }
      }
    }


    return masCrossCount
  }

  class Cell {
  constructor(xPos, yPos, value) {
    this.xPos = xPos
    this.yPos = yPos
    this.value = value
  }
}

  function checkIfMas(cell, allCells) {
    const surroundingCorners = allCells.filter((thisCell) => {
      const validYPos = [cell.yPos + 1, cell.yPos - 1]
      const validXPos = [cell.xPos + 1, cell.xPos - 1]
  

      return validYPos.includes(thisCell.yPos) && validXPos.includes(thisCell.xPos)
    })

    
    
    const surroundingCornerValues = surroundingCorners.map((cell) => {return cell.value}).join("")
    const validPatterns = [
      "MMSS",
      "SSMM",
      "MSMS",
      "SMSM",
    ]
    return validPatterns.includes(surroundingCornerValues)
  }
  function countXmas(str) {
    let xmasTotal = 0
    xmasTotal += [...str.matchAll(/(?=XMAS|SAMX)/g)].length
    return xmasTotal
  }

