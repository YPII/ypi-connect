var ipfs = require('./ipfs-commands')
var templateEngine = require('../template-engine')

var routes = []

var ipfsVersion = {
    path: '/ipfs/version',
    name: 'ipfs-version',  
    handler: function (url, socket) {      
      ipfs.version(function (err, jsonResult) {
        console.log(jsonResult)
        var resultObject = JSON.parse(jsonResult)
        var hbsPath = __dirname + '\\ipfs-version.hbs'      
        templateEngine.getHTML(hbsPath, resultObject, function (err, html) {              
          socket.emit('inject', { element: 'ipfsVersionResult', html: html })
        })
      })
    }
}

routes.push(ipfsVersion)

module.exports = {
    routes: routes
}