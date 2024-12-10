const fs = require('node:fs');
let rules = ""
let updates = ""
const RulesTable = {

}

let workingUpdateTotal = 0
let fixedUpdateTotal = 0

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
      workingUpdateTotal += Number(nodes[Math.floor(nodes.length/ 2)])
    }
    else{
      let fixedUpdate = fixUpdate(nodes, [])
      fixedUpdateTotal += Number(fixedUpdate[Math.floor(nodes.length/ 2)])
    }
 }

 
 console.log("Score of updates fixed: " + fixedUpdateTotal)
 console.log("Score of correct updates " + workingUpdateTotal)

 
 function isNodeValid(node, nodeIndex, nodes){
  for( const futureNode of nodes.slice(nodeIndex + 1)) {
    if(!RulesTable[node].includes(String(futureNode)))
      
      return false
  }

  return true
 }

 function fixUpdate(nodes, fixedArr) {

  if(nodes.length === 0) {
    return fixedArr
  }

  for(const [index, node] of nodes.entries()) {
   const isNodeLeftmost = nodes.every((otherNode) =>{
      if(node === otherNode) {
        return true
      }else{
        return RulesTable[otherNode].includes(String(node))
      }
    })

    if(isNodeLeftmost) {
      fixedArr.push(node)
      nodes = nodes.filter((nodeToDelete) => {
        if (nodeToDelete === node) {
          return false
        }
        return true
      })
      return fixUpdate(nodes, fixedArr)
    }
  }
 }

   //22, 44, 33 , 45 , 76, 4 //valid
   