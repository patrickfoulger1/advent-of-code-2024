const { log } = require('node:console');
const fs = require('node:fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const lists = organiseLists(data);
  console.log(getListDistance(lists))
  console.log(getListSimilarity(lists))


});


function organiseLists(data) {
    const allNumbers = data.match(/\d{5}/g)
    const list1 = []
    const list2 = []
    for(let [index, number] of allNumbers.entries()) {
        number = Number(number)
        index % 2 === 0 ? list1.push(number) : list2.push(number)
    }

    list1.sort((a, b) => { return a - b}) //sorted ascending
    list2.sort((a, b) => { return a - b}) //sorted ascending

    return [list1, list2]
    
}

function getListDistance(lists) {
    let total = 0
    const list1 = lists[0]
    const list2 = lists[1]    
    for(let i = 0; i < list1.length; i++) {
        const difference = Math.abs(list1[i] - list2[i])
        total += difference
    }

    return total
}

function getListSimilarity(lists) {
    let similarity = 0
    const list1 = lists[0]
    const list2 = lists[1]
    for(let i = 0; i < list1.length; i++) {
        const numberToCheck = list1[i]
        const numberOfMatches = list2.filter((num) => numberToCheck === num).length
        similarity += (numberToCheck * numberOfMatches)
    }

    return similarity
}