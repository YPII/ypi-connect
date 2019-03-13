function formatDateRange (startDate, endDate) {
  var dateRange = (startDate.getMonth() + 1).toString().padStart(2, '0') + '/' +
    startDate.getDate().toString().padStart(2, '0') + '/' +
    startDate.getFullYear().toString() + ' - ' +
    (endDate.getMonth() + 1).toString().padStart(2, '0') + '/' +
    endDate.getDate().toString().padStart(2, '0') + '/' +
    endDate.getFullYear().toString()
  return dateRange
}

function parseDateRangeString (dateRange) {
  var dateRangeSplit = dateRange.split(' - ')
  if (dateRangeSplit.length === 2) {
    var startDate = new Date(dateRangeSplit[0])
    var endDate = new Date(dateRangeSplit[1])
    return { startDate: getDateStringMySQL(startDate), endDate: getDateStringMySQL(endDate) }
  }
}

function getDateStringMySQL (date) {
  var dateString = date.getFullYear().toString() + '-' +
    (date.getMonth() + 1).toString().padStart(2, '0') + '-' +
    date.getDate().toString().padStart(2, '0')
  return dateString
}

function getDateString (date) {
  var dateString = (date.getMonth() + 1).toString().padStart(2, '0') + '/' +
  date.getDate().toString().padStart(2, '0') + '/' +
  date.getFullYear().toString()
  return dateString
}

function getDateRangeThisMonth () {
  var date = new Date()
  var startDate = new Date(date.getFullYear(), date.getMonth(), 1)
  var endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  return formatDateRange(startDate, endDate)
}

function getDateRangeLastMonth () {
  var date = new Date()
  var startDate = new Date(date.getFullYear(), date.getMonth() - 1, 1)
  var endDate = new Date(date.getFullYear(), date.getMonth() - 1 + 1, 0)
  return formatDateRange(startDate, endDate)
}

function getDateRangeThisYear () {
  var date = new Date()
  var startDate = new Date(date.getFullYear(), 0, 1)
  var endDate = new Date(date.getFullYear(), 11, 31)
  return formatDateRange(startDate, endDate)
}

function getDateRangeLastYear () {
  var date = new Date()
  var startDate = new Date(date.getFullYear() - 1, 0, 1)
  var endDate = new Date(date.getFullYear() - 1, 11, 31)
  return formatDateRange(startDate, endDate)
}
