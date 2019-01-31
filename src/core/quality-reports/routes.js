var templateEngine = require('../template-engine')
var homePage = require('./home-page')
var molecularTAT = require('./molecular-tat.js')

var routes = []

var qualityReportsRoute = {
    path: '/quality-reports/home-page',    
    handler: function (url, socket) {      
      var hbsPath = __dirname + '\\home-page.hbs'     
      console.log(hbsPath) 
      templateEngine.getHTML(hbsPath, homePage.data, function (err, html) {              
        socket.emit('inject', { element: 'main', html: html })
      })      
    }
}

var molecularTATRoute = {
  path: '/quality-reports/molecular-tat',    
  handler: function (url, socket) {      
    var hbsPath = __dirname + '\\molecular-tat.hbs'      
    templateEngine.getHTML(hbsPath, molecularTAT.data, function (err, html) {         
      socket.emit('inject', { element: 'main', html: html })    
      socket.emit('attachQuickView', null)    
    })           
  }
}

var molecularTATDataRoute = {
  path: '/quality-reports/molecular-tat-data',    
  handler: function (url, socket) {      
    var hbsPath = __dirname + '\\molecular-tat-data.hbs'  
    molecularTAT.getData(function (err, result) {      
      console.log(result)
      templateEngine.getHTML(hbsPath, result, function (err, html) {         
        socket.emit('inject', { element: 'reportData', html: html })
      })      
    })           
  }
}

routes.push(qualityReportsRoute)
routes.push(molecularTATRoute)
routes.push(molecularTATDataRoute)

module.exports = {
    routes: routes
}