const fs = require('node:fs');
let rules = ""
let updates = ""

try {
  rules = fs.readFileSync('./rules.txt', 'utf8')
} catch (err) {
  console.error(err);
}

try {
    updates = fs.readFileSync('./updates.txt', 'utf8');
    
  } catch (err) {
    console.error(err);
  }
  
  console.log(rules, updates)
