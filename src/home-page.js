var fs = require('fs')
var handlebars = require('handlebars')
var path = require('path')

var route = { 
  routeHandler: routeHandler
}

var pageData = {
  title: "YPII"
}

var hbsPagePath = path.join(__dirname, 'home-page.hbs')

function routeHandler (req, res, callback) {
  if(req.url == '/') {
    fs.readFile(hbsPagePath, 'utf8', function (err, hbsTemplate) {
      var compiledTemplate = handlebars.compile(hbsTemplate)
      var html = compiledTemplate(pageData)
      res.setHeader('Content-type', 'text/html')
      res.end(html)   
      callback(null, true)
    })   
  } else {
    callback(null, false)
  }
}

module.exports = { 
  route: route
}