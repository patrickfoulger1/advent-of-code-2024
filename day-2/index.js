const { log } = require('node:console');
const fs = require('node:fs');

fs.readFile('./reports.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const reports = organiseReports(data);
  console.log(getTotalSafeReports(reports))
  console.log(isGapLessThan4([1,3,5,3,7,9]))


});

function organiseReports(data) {
    const allReports = data.split("\r\n")
    console.log(allReports[allReports.length - 1])
    return allReports
}

function getTotalSafeReports(reports) {
    let total = 0
    for(const report of reports) {
        if(isReportSafe(report))
            total++
    }

    return total
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