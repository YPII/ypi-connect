var urlParse = require('url-parse')
var dateFormat = require('dateformat')
var mysql = require('mysql')
var mysqlConfig = require('../../mysql/mysql-config')

var path = require('path')
var fs = require('fs')
var handlebars = require('handlebars')

var pageData = { title: "Molecular TAT" }

var route = { 
  routeHandler: handleMolecularTATRoute
}

function handleMolecularTATRoute(req, res, callback) {
  var hbsPath = path.join(__dirname, 'page.hbs')
  fs.readFile(hbsPath, 'utf8', function (err, hbsTemplate) {
    var compiledTemplate = handlebars.compile(hbsTemplate)
    var html = compiledTemplate(pageData)
    res.setHeader('Content-type', 'text/html')
    res.end(html)   
    callback(null, true)
  })   
}

function handleMolecularTATRouteData(req, res, callback) {  
  var parsedUrl = urlParse(req.url, true)    
  var reportStartDate = dateFormat(parsedUrl.query.reportStartDate, "yyyy-mm-dd")
  var reportEndDate = dateFormat(parsedUrl.query.reportEndDate, "yyyy-mm-dd")  

  var cn = mysql.createConnection(mysqlConfig)
  var sql = 'CALL rpt_Molecular_TAT(?, ?)'
  cn.query(sql, [reportStartDate, reportEndDate], function (error, results, fields) {
    if(error) {
      console.log(error)
    } else {
      var hbsPath = path.join(__dirname, 'page-data.hbs')      
      fs.readFile(hbsPath, 'utf8', function (err, hbsTemplate) {
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
  addToRouteMap: function (routeMap) {
    routeMap['/quality-reports/molecular-tat'] =  handleMolecularTATRoute
    routeMap['/quality-reports/molecular-tat/data'] = handleMolecularTATRouteData
  }
}
