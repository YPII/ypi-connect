var socket = io('http://localhost:3000')

socket.on('inject', function (data) {  
  inject(data)  
})

socket.on('attachQuickView', function (data) {
  console.log(document.readyState)
  var quickviews = bulmaQuickview.attach()
})

socket.on('result', function (data) {
  console.log(data)     
})

function sendRequest(url) {    
  socket.emit('request', { url: url })
}