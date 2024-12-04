const { log } = require('node:console');
const fs = require('node:fs');

fs.readFile('./input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  proccessData(data);
});


function proccessData(data) {
    const allNumbers = data.match(/\d{5}/g)
    const list1 = []
    const list2 = []
    for(let [index, number] of allNumbers.entries()) {
        number = Number(number)
        index % 2 === 0 ? list1.push(number) : list2.push(number)
    }

    list1.sort((a, b) => { return a - b}) //sorted ascending
    list2.sort((a, b) => { return a - b}) //sorted ascending

    let total = 0
    for(let i = 0; i < list1.length; i++) {
        const difference = Math.abs(list1[i] - list2[i])
        total += difference
    }
    
    console.log(total)
}