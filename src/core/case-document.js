var path = require('path')
var rootDirName = '\\\\cfileserver\\AccessionDocuments\\'

var caseNumberRange = [
  { start: 1, end: 999, path: '00001-00999' },
  { start: 1000, end: 1999, path: '01000-01999' },
  { start: 2000, end: 2999, path: '02000-02999' },
  { start: 3000, end: 3999, path: '03000-03999' },
  { start: 4000, end: 4999, path: '04000-04999' },
  { start: 5000, end: 5999, path: '05000-05999' },
  { start: 6000, end: 6999, path: '06000-06999' },
  { start: 7000, end: 7999, path: '07000-07999' },
  { start: 8000, end: 8999, path: '08000-08999' },
  { start: 9000, end: 9999, path: '09000-09999' },
  { start: 10000, end: 10999, path: '10000-10999' },
  { start: 11000, end: 11999, path: '11000-11999' },
  { start: 12000, end: 12999, path: '12000-12999' },
  { start: 13000, end: 13999, path: '13000-13999' },
  { start: 14000, end: 14999, path: '14000-14999' },
  { start: 15000, end: 15999, path: '15000-15999' },
  { start: 16000, end: 16999, path: '16000-16999' },
  { start: 17000, end: 17999, path: '17000-17999' },
  { start: 18000, end: 18999, path: '18000-18999' },
  { start: 19000, end: 19999, path: '19000-19999' },
  { start: 20000, end: 20999, path: '20000-20999' },
  { start: 21000, end: 21999, path: '21000-21999' },
  { start: 22000, end: 22999, path: '22000-22999' },
  { start: 23000, end: 23999, path: '23000-23999' },
  { start: 24000, end: 24999, path: '24000-24999' },
  { start: 25000, end: 25999, path: '25000-25999' },
  { start: 26000, end: 26999, path: '26000-26999' },
  { start: 27000, end: 27999, path: '27000-27999' },
  { start: 28000, end: 28999, path: '28000-28999' },
  { start: 29000, end: 29999, path: '29000-29999' },
  { start: 30000, end: 30999, path: '30000-30999' },
  { start: 31000, end: 31999, path: '31000-31999' },
  { start: 32000, end: 32999, path: '32000-32999' },
  { start: 33000, end: 33999, path: '33000-33999' },
  { start: 34000, end: 34999, path: '34000-34999' }
]

function getPathByReportNo (reportNo, ext) {
  var dotSplit = reportNo.split('.')
  var masterAccessionNo = dotSplit[0]
  var caseLetter = dotSplit[1]
  var dashSplit = masterAccessionNo.split('-')
  var year = '20' + dashSplit[0]
  var caseNumber = parseInt(dashSplit[1])
  var caseNumberRange = getCaseNumberRange(caseNumber)
  var dirName = path.join(rootDirName, year, caseNumberRange, masterAccessionNo)
  var baseName = reportNo
  var extension = ext

  var result = {
    masterAccessionNo: masterAccessionNo,
    caseLetter: caseLetter,
    reportNo: reportNo,
    year: year,
    caseNumber: caseNumber,
    caseNumberRange: caseNumberRange,
    dirName: dirName,
    baseName: baseName,
    path: path.join(dirName, baseName + extension)
  }
  return result
}

function getCaseNumberRange (caseNumber) {
  for (var i = 0; i < caseNumberRange.length; i++) {
    if (caseNumber >= caseNumberRange[i].start && caseNumber <= caseNumberRange[i].end) {
      return caseNumberRange[i].path
    }
  }
}

module.exports = {
  getPathByReportNo: getPathByReportNo
}
