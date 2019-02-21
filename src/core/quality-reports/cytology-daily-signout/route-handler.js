var urlParse = require('url-parse')
var mysql = require('mysql')
var mysqlConfig = require('../../mysql/mysql-config')

var path = require('path')
var fs = require('fs')
var handlebars = require('handlebars')

var pageData = { title: 'Cytology Daily Signout' }

function routeHandler (req, res, callback) {
  var hbsPath = path.join(__dirname, 'page.hbs')
  fs.readFile(hbsPath, 'utf8', function (err, hbsTemplate) {
    if (err) return callback(err)
    var compiledTemplate = handlebars.compile(hbsTemplate)
    var html = compiledTemplate(pageData)
    res.setHeader('Content-type', 'text/html')
    res.end(html)
    callback(null, true)
  })
}

function dataHandler (req, res, callback) {
  var parsedUrl = urlParse(req.url, true)
  var reportStartDate = parsedUrl.query.reportStartDate
  var reportEndDate = parsedUrl.query.reportEndDate

  var cn = mysql.createConnection(mysqlConfig)
  var sql = 'call rpt_cytology_daily_signout(?, ?)'
  cn.query(sql, [reportStartDate, reportEndDate], function (error, results, fields) {
    if (error) {
      console.log(error)
    } else {
      var hbsPath = path.join(__dirname, 'page-data.hbs')
      fs.readFile(hbsPath, 'utf8', function (err, hbsTemplate) {
        if (err) return callback(err)
        var compiledTemplate = handlebars.compile(hbsTemplate)
        var html = compiledTemplate(results[0])
        res.setHeader('Content-type', 'text/html')
        res.end(html)
        callback(null, true)
      })
    }
    cn.end()
  })
}

module.exports = {
  register: function (routeMap) {
    routeMap['/quality-reports/cytology-daily-signout'] = routeHandler
    routeMap['/quality-reports/cytology-daily-signout/data'] = dataHandler
  }
}
