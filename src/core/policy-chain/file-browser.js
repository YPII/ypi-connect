var path = require('path')
var fs = require('fs')
var url = require('url')
var handlebars = require('handlebars')

var ipfsRouteHandler = require('../ipfs/route-handler')
// var reportWriter = require('../quality-reports/report-writer')

var route = {
  routeHandler: routeHandler
}

const routeMap = {
  '/policy-chain/file-browser': fileBrowserRouteHandler
}

var pageData = {
  title: 'File Browser'
}

ipfsRouteHandler.register(routeMap)

function routeHandler (req, res, callback) {
  var pathname = url.parse(req.url).pathname
  var route = routeMap[pathname]
  if (route) {
    route(req, res, callback)
  } else {
    callback(null, false)
  }
}

function fileBrowserRouteHandler (req, res, callback) {
  var hbsPagePath = path.join(__dirname, 'file-browser.hbs')
  fs.readFile(hbsPagePath, 'utf8', function (err, hbsTemplate) {
    if (err) return callback(err)
    var compiledTemplate = handlebars.compile(hbsTemplate)
    var html = compiledTemplate(pageData)
    res.setHeader('Content-type', 'text/html')
    res.end(html)
    callback(null, true)
  })
}

module.exports = {
  route: route
}