var fs = require('fs')
var ipfsRoutes = require('./ipfs/ipfs-routes')
var mainPage = require('./main-page')
var templateEngine = require('./template-engine')

var routeCollection = []

var mainPageRoute = {
    path: '/',
    name: 'main-page',    
    handler: function (url, socket) {      
      var data = { title: 'Policy Chain' }
      var hbsPath = __dirname + '\\main-page.hbs'
      templateEngine.getHTML(hbsPath, data, function (err, html) {                  
        socket.emit('inject', { element: 'main', html: html })
      })
    }
}

var markdownRoute = {
  path: '/markdown/editor',
  name: 'markdown-editor-page',    
  handler: function (url, socket) {      
    fs.readFile(__dirname + '/markdown-page.html', 'utf8', function (err, sourceData) {      
      socket.emit('inject', { element: 'main', html: sourceData })
    })  
  }
}

routeCollection.push(mainPageRoute)
routeCollection.push(markdownRoute)

for(i=0; i<ipfsRoutes.routes.length; i++) {
    routeCollection.push(ipfsRoutes.routes[i])
}

module.exports = {
    routes: routeCollection,
    getRoute: function (path) {            
        for(var i=0; i<routeCollection.length; i++) {            
            if(routeCollection[i].path == path) {
                return routeCollection[i]
            }
        }
    }
}
