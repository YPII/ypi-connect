var fs = require('fs')
var path = require('path')
const url = require('url')

var route = {
  routeHandler: routeHandler
}

var contentTypes = [
  { extension: '.html', type: 'text/html', responseHandler: textFileHandler },
  { extension: '.css', type: 'text/css', responseHandler: textFileHandler },
  { extension: '.js', type: 'text/javascript', responseHandler: textFileHandler },
  { extension: '.json', type: 'application/json', responseHandler: textFileHandler },
  { extension: '.png', type: 'image/png', responseHandler: binaryFileHandler },
  { extension: '.jpg', type: 'image/jpg', responseHandler: binaryFileHandler }
]

function routeHandler (req, res, callback) {
  var pathname = url.parse(req.url).pathname
  if (pathname.startsWith('/component') || pathname.startsWith('/image')) {
    var filePath = path.join(__dirname, pathname)
    var extension = path.extname(filePath)
    var contentType = contentTypes.find(o => o.extension === extension)
    contentType.responseHandler(filePath, contentType.type, res, function (err) {
      if (err) return callback(err)
      callback(null, true)
    })
  } else {
    callback(null, false)
  }
}

function textFileHandler (filePath, contentType, res, callback) {
  fs.readFile(filePath, 'utf8', function (err, text) {
    if (err) return callback(err)
    res.setHeader('Content-type', contentType)
    res.end(text)
    callback(null)
  })
}

function binaryFileHandler (filePath, contentType, res, callback) {
  fs.readFile(filePath, function (err, data) {
    if (err) return callback(err)
    res.setHeader('Content-type', contentType)
    res.end(data, 'binary')
    callback(null)
  })
}

module.exports = {
  route: route
}
