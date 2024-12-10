const fs = require('node:fs');
let rules = ""
let updates = ""
const RulesTable = {

}

let total = 0

try {
  rules = fs.readFileSync('./rules.txt', 'utf8')
} catch (err) {
  
}

try {
    updates = fs.readFileSync('./updates.txt', 'utf8');
    
  } catch (err) {
    console.error(err);
  }
  





 
rules.matchAll(/([0-9][0-9])[|]([0-9][0-9])\r\n/g).forEach(matchArr => {
  const leftRule = matchArr[1]
  const rightRule = matchArr[2]

  if(RulesTable[leftRule] === undefined) {
    RulesTable[leftRule] = []
  }

  RulesTable[leftRule].push(rightRule)
 });

 

 
 for(const updateStr of updates.split("\r\n")) {
    const nodes = updateStr.split(",")
    const isUpdateValid = nodes.every((node, nodeIndex) => isNodeValid(node, Number(nodeIndex), nodes))
    //console.log(isUpdateValid)

    if(isUpdateValid){
      total += Number(nodes[Math.floor(nodes.length/ 2)])


    }
 }

 console.log(total)

 
 function isNodeValid(node, nodeIndex, nodes){
  for( const futureNode of nodes.slice(nodeIndex + 1)) {
    if(!RulesTable[node].includes(String(futureNode)))
      return false
  }

  return true
 }

   //22, 44, 33 , 45 , 76, 4 //valid
   