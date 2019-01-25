var _ = require('underscore')

var httpServer = require('./http-server')
var io = require('socket.io')(httpServer.http)

var router = require('./core/router')

var barcodeScan = require('./core/barcode/barcode-scan')
barcodeScan.init('COM4', io)

io.on('connection', function (socket) {      
  var route = router.getRoute('/')    
  route.handler('/', io)

  socket.on('request', function (message) {      
    var requestRoute = router.getRoute(message.url)    
    if(requestRoute != null) {
      requestRoute.handler(message.url, io)    
    } else {
      console.log('Route not found for url: ' + message.url)
    }    
  })  

})
