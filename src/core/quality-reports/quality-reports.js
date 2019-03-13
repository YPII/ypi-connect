var fs = require('fs')
var url = require('url')
var path = require('path')

var hpvTAT = require('./molecular/hpv-tat')
var cytologyDailySignout = require('./cytology/daily-signout')
var surgicalCytologyCorrelation = require('./surgical/surgical-cytology-correlation')
var surgicalStatistics = require('./surgical/statistics')
var molecularTestVolume = require('./molecular/test-volume')
var flowTestVolume = require('./flow/test-volume')

var route = {
  routeHandler: routeHandler
}

const routeMap = {
  '/quality-reports': handleHomePageRoute,
  '/quality-reports/flow': handleHomePageRoute,
  '/quality-reports/molecular': handleHomePageRoute,
  '/quality-reports/surgical': handleHomePageRoute,
  '/quality-reports/cytology': handleHomePageRoute
}

hpvTAT.register(routeMap)
surgicalStatistics.register(routeMap)
cytologyDailySignout.register(routeMap)
surgicalCytologyCorrelation.register(routeMap)
molecularTestVolume.register(routeMap)
flowTestVolume.register(routeMap)

function routeHandler (req, res, callback) {
  var pathname = url.parse(req.url).pathname
  var route = routeMap[pathname]
  if (route) {
    route(req, res, callback)
  } else {
    callback(null, false)
  }
}

function handleHomePageRoute (req, res, callback) {
  var hsbPath = path.join(__dirname, 'quality-reports.html')
  fs.readFile(hsbPath, 'utf8', function (err, html) {
    if (err) return callback(err)
    res.setHeader('Content-type', 'text/html')
    res.end(html)
    callback(null, true)
  })
}

module.exports = {
  route: route
}
