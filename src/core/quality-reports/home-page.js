var fs = require('fs')
var url = require('url')
var handlebars = require('handlebars')
var path = require('path')
var molecularTAT = require('./molecular-tat/route-handler')

var route = { 
  routeHandler: routeHandler
}

var homePageData = {
  title: "Quality Reports"
}

const routeMap = {
  '/quality-reports': handleHomePageRoute  
}

molecularTAT.addToRouteMap(routeMap)

function routeHandler (req, res, callback) {
  var pathname = url.parse(req.url).pathname 
  var route = routeMap[pathname]    
  if(route) {    
    route(req, res, callback)
  } else {
    callback(null, false)
  }
}

function handleHomePageRoute(req, res, callback) {
  var hsbPath = path.join(__dirname, 'home-page.hbs')
  fs.readFile(hsbPath, 'utf8', function (err, hbsTemplate) {
    var compiledTemplate = handlebars.compile(hbsTemplate)
    var html = compiledTemplate(homePageData)
    res.setHeader('Content-type', 'text/html')
    res.end(html)   
    callback(null, true)
  })   
}

module.exports = { 
  route: route
}