const http = require('http').createServer(httpServerHandler)
const async = require('async')

var port = 3000
if (process.argv[2]) {
  port = process.argv[2]
}

console.log(`HTTP Server is listening on port ${port}`)
http.listen(parseInt(port))

var routeCollection = []

function httpServerHandler (req, res) {
  async.eachSeries(routeCollection, function (route, callback) {
    route.routeHandler(req, res, function (err, handled) {
      if (err) return callback(err)
      if (handled) {
        var broke = new Error('broke')
        callback(broke)
      } else {
        callback()
      }
    })
  }, function (err) {
    if (!err) {
      res.statusCode = 500
      res.end(`Path not found: ${req.url}.`)
    }
  })
}

module.exports = {
  routeCollection: routeCollection
}
