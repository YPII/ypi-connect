const http = require('http').createServer(httpServerHandler)
const url = require('url')
const fs = require('fs')
const path = require('path')
const async = require('async')

const port = 3000
console.log(`HTTP Server is listening on port ${port}`)
http.listen(parseInt(port))

var routeCollection = []

function httpServerHandler (req, res) {  
  async.eachSeries(routeCollection, function(route, callback) {  
    route.routeHandler(req, res, function (err, handled) {
      if(handled) {
        var broke = new Error('broke')
        callback(broke)
      } else {
        callback()
      }
    })
  }, function (err) {
    if(!err) {
      res.statusCode = 500
      res.end(`Path not found: ${req.url}.`)
    }
  })
}

module.exports = {
  routeCollection: routeCollection   
}