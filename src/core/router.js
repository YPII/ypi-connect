var fs = require('fs')
var ipfsRoutes = require('./ipfs/ipfs-routes')
var qualityReportRoutes = require('./quality-reports/routes')

var homePage = require('./home-page')
var templateEngine = require('./template-engine')

var routeCollection = []

var homePageRoute = {
    path: '/',
    name: 'home-page',    
    handler: function (url, socket) {            
      var hbsPath = __dirname + '\\home-page.hbs'
      templateEngine.getHTML(hbsPath, homePage.data, function (err, html) {                  
        socket.emit('inject', { element: 'main', html: html })
      })
    }
}

var markdownRoute = {
  path: '/markdown/editor',
  name: 'markdown-editor-page',    
  handler: function (url, socket) {      
    fs.readFile(__dirname + '/polich-chain/markdown-page.html', 'utf8', function (err, sourceData) {      
      socket.emit('inject', { element: 'main', html: sourceData })
    })  
  }
}

routeCollection.push(homePageRoute)
routeCollection.push(markdownRoute)

for(i=0; i<ipfsRoutes.routes.length; i++) {
    routeCollection.push(ipfsRoutes.routes[i])
}

for(i=0; i<qualityReportRoutes.routes.length; i++) {
  routeCollection.push(qualityReportRoutes.routes[i])
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
