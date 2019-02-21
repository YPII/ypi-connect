var fs = require('fs')
var handlebars = require('handlebars')
var ipfs = require('./ipfs-commands')

function versionRouteHandler (req, res, callback) {      
  ipfs.version(function (err, jsonResult) {    
    var resultObject = JSON.parse(jsonResult)    
    var hbsPath = __dirname + '/ipfs-version.hbs'
    fs.readFile(hbsPath, 'utf8', function (err, hbsTemplate) {
      var compiledTemplate = handlebars.compile(hbsTemplate)
      var html = compiledTemplate(resultObject)      
      res.setHeader('Content-type', 'text/html')
      res.end(html)   
      callback(null, true)
    })    
  })    
}

function fileslsRouteHandler (req, res, callback) {      
  ipfs.filesls('/', function (err, jsonResult) {    
    var resultObject = JSON.parse(jsonResult)        
    var hbsPath = __dirname + '/ipfs-files-ls.hbs'
    fs.readFile(hbsPath, 'utf8', function (err, hbsTemplate) {
      var compiledTemplate = handlebars.compile(hbsTemplate)
      var html = compiledTemplate(resultObject.Entries)      
      res.setHeader('Content-type', 'text/html')
      res.end(html)   
      callback(null, true)
    })    
  })    
}

function filesrmRouteHandler (req, res, callback) {      
  ipfs.filesrm('/policy_chain', function (err, jsonResult) {    
    var resultObject = JSON.parse(jsonResult)            
    var hbsPath = __dirname + '/ipfs-files-rm.hbs'
    fs.readFile(hbsPath, 'utf8', function (err, hbsTemplate) {
      var compiledTemplate = handlebars.compile(hbsTemplate)
      var html = compiledTemplate(resultObject)            
      res.setHeader('Content-type', 'text/html')
      res.end(html)   
      callback(null, true)
    })    
  })    
}

function filesmkdirRouteHandler (req, res, callback) { 
  var directoryName = parsedUrl.query.directoryName  
  ipfs.filesmkdir(directoryName, function (err, jsonResult) {    
    var resultObject = JSON.parse(jsonResult)            
    var hbsPath = __dirname + '/ipfs-files-mkdir.hbs'
    fs.readFile(hbsPath, 'utf8', function (err, hbsTemplate) {
      var compiledTemplate = handlebars.compile(hbsTemplate)
      var html = compiledTemplate(resultObject)            
      res.setHeader('Content-type', 'text/html')
      res.end(html)   
      callback(null, true)
    })    
  })    
}

module.exports = { 
  register: function (routeMap) {
    routeMap['/ipfs/version'] =  versionRouteHandler,
    routeMap['/ipfs/files/ls'] =  fileslsRouteHandler,  
    routeMap['/ipfs/files/rm'] =  filesrmRouteHandler
  }
}