var fs = require('fs')
var path = require('path')
const url = require('url')

var route = {
  routeHandler: routeHandler
}

const fileTypeMap = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword'
}

function routeHandler (req, res, callback) {
  var pathname = url.parse(req.url).pathname  
  if(pathname.startsWith('/component')) {    
    var componentFilePath = path.join(__dirname, pathname)          
    fs.readFile(componentFilePath, 'utf8', function(err, data) {
      var extension = path.extname(componentFilePath)      
      res.setHeader('Content-type', fileTypeMap[extension])
      res.end(data) 
      callback(null, true)
    })    
  } else {
    callback(null, false)
  }
}

module.exports = { 
  route: route
}