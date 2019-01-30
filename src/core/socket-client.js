var socket = io('http://localhost:3000')

socket.on('inject', function (data) {  
  inject(data)

  //var target = document.getElementById('body')
  //var newScript = document.createElement('script')
  //newScript.src = '/src/core/markdown-page.js'
  //target.appendChild(newScript)  
})

socket.on('result', function (data) {
  console.log(data)     
})

function sendRequest(url) {    
  socket.emit('request', { url: url })
}