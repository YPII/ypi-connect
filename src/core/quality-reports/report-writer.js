var ipfs = require('../ipfs/ipfs-commands')

module.exports = {
  /*
  doit: function filesmkdirRouteHandler (req, res, callback) {
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
  */
}
