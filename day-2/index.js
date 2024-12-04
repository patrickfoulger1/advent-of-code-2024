const { log } = require('node:console');
const fs = require('node:fs');

fs.readFile('./reports.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const reports = organiseReports(data);
  console.log(getTotalSafeReports(reports))


});

function organiseReports(data) {
    const allReports = data.split("\r\n")
    return allReports
}

function getTotalSafeReports(reports) {
    let total = 0
    for(const report of reports) {
        if(isReportSafe(report)) {
            total++
        }
        else if(canUnsafeReportBeSafe(report)){
            total++
        }
            
    }

    return total
}

function canUnsafeReportBeSafe(report) {
    let levels = report.split(" ")
    levels = levels.map((level) => { return Number(level)})

    for(let i = 0; i < levels.length; i++) {
        //remove element
        let testArr = levels.slice()
        testArr.splice(i, 1) //remove test element from index
        testArr = testArr.join(" ")
        console.log(testArr)

       if(isReportSafe(testArr)) { //check if new array is safe
           return true //if it is it's actually safe
       }
   }
    return false //return false if it can't ever be safe
}

function isReportSafe(report) {

    let levels = report.split(" ")
    levels = levels.map((level) => { return Number(level)})
    //are all levels ascending or descending
    if(!isAscending(levels)) {
        if(!isDescending(levels)) {
            return false
        }
    }
        
    //is each gap in the array less than 4
    if(!isGapLessThan4(levels))
        return false
    
    return true
}

function isAscending(arr) {
    return arr.every(function (x, i) {
        return i === 0 || x > arr[i - 1];
    });
}

function isDescending(arr) {
    return arr.every(function (x, i) {
        return i === 0 || x < arr[i - 1];
    });
}

function isGapLessThan4(arr) {
    return arr.every(function (x, i) {
        return i === 0 || Math.abs(x - arr[i - 1]) < 4;
    });
}