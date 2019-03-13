var urlParse = require('url-parse')
var mysql = require('mysql')
var mysqlConfig = require('../../mysql/mysql-config')

var path = require('path')
var fs = require('fs')

function routeHandler (req, res, callback) {
  var fileName = path.join(__dirname, 'test-volume.html')
  fs.readFile(fileName, 'utf8', function (err, html) {
    if (err) return callback(err)
    res.setHeader('Content-type', 'text/html')
    res.end(html)
    callback(null, true)
  })
}

function dataHandler (req, res, callback) {
  var parsedUrl = urlParse(req.url, true)
  var reportYear = parsedUrl.query.reportYear
  var cn = mysql.createConnection(mysqlConfig)
  var sql = 'call rpt_molecular_volume_summary(?)'
  cn.query(sql, [reportYear], function (error, results, fields) {
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

function chartHandler (req, res, callback) {
  var parsedUrl = urlParse(req.url, true)
  var testId = parsedUrl.query.testId
  var cn = mysql.createConnection(mysqlConfig)
  var sql = 'call rpt_test_volume_chart(?,?)'
  cn.query(sql, ['2016', testId], function (error, results, fields) {
    if (error) {
      console.log(error)
    } else {
      var chartData = buildChartData(results[0], fields)
      res.setHeader('Content-type', 'application/json')
      res.end(JSON.stringify(chartData))
      callback(null, true)
    }
    cn.end()
  })
}

function buildChartData (rows, fields) {
  var chartData = {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: []
    },
    options: {
      title: {
        display: true,
        text: rows[0][fields[0][1]['name']]
      }
    }
  }

  var colors = ['red', 'blue', 'green', 'yellow']
  for (var i = 0; i < rows.length; i++) {
    var dataSet = { data: [] }
    dataSet.label = rows[i]['Year']
    for (var j = 3; j < fields[0].length - 1; j++) {
      dataSet.data.push(rows[i][fields[0][j]['name']])
      dataSet.backgroundColor = colors[i]
      dataSet.fill = false
    }
    chartData.data.datasets.push(dataSet)
  }

  return chartData
}

module.exports = {
  register: function (routeMap) {
    routeMap['/quality-reports/molecular/test-volume'] = routeHandler
    routeMap['/quality-reports/molecular/test-volume/data'] = dataHandler
    routeMap['/quality-reports/molecular/test-volume/chart'] = chartHandler
  }
}
