var urlParse = require('url-parse')
var mysql = require('mysql')
var dateFormat = require('dateformat')
var mysqlConfig = require('../../mysql/mysql-config')

var path = require('path')
var fs = require('fs')

function routeHandler (req, res, callback) {
  var fileName = path.join(__dirname, 'hpv-tat.html')
  fs.readFile(fileName, 'utf8', function (err, html) {
    if (err) {
      console.log(err)
      return callback(err)
    }
    res.setHeader('Content-type', 'text/html')
    res.end(html)
    callback(null, true)
  })
}

function detailHandler (req, res, callback) {
  var parsedUrl = urlParse(req.url, true)
  var reportStartDate = dateFormat(parsedUrl.query.reportStartDate, 'yyyy-mm-dd')
  var reportEndDate = dateFormat(parsedUrl.query.reportEndDate, 'yyyy-mm-dd')

  var cn = mysql.createConnection(mysqlConfig)
  var sql = 'call rpt_hpv_tat(?, ?)'
  cn.query(sql, [reportStartDate, reportEndDate], function (error, results, fields) {
    if (error) {
      console.log(error)
    } else {
      res.setHeader('Content-type', 'application/json')
      res.end(JSON.stringify(results[0]))
      callback(null, true)
    }
    cn.end()
  })
}

module.exports = {
  register: function (routeMap) {
    routeMap['/quality-reports/molecular/hpv-tat'] = routeHandler
    routeMap['/quality-reports/molecular/hpv-tat/detail'] = detailHandler
  }
}
