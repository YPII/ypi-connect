var app = require('express')()
const http = require('http').Server(app)
const socket = require('socket.io')(http)
const comPort = require(__dirname + '/server/com-port')

var scannerPort = 'COM4'
port = comPort.init(socket, scannerPort)

console.log('Listening on:' + scannerPort)
port.on('readable', function () {
  var scanData = port.read().toString()
  console.log('Data received from:' + scannerPort, scanData)  
  socket.emit('scan', scanData)
})
  
app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/index.html')
})

http.listen(3000, function(){
  console.log('HTTP listening on *:3000')
})

socket.on('connection', function(socket){
  console.log('a user connected')
})