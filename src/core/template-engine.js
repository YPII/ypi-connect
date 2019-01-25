var handlebars = require('handlebars')
var fs = require('fs')

module.exports = {
    getHTML: function (sourcePath, data, callback) {                
        fs.readFile(sourcePath, 'utf8', function (err, sourceData) {
            var template = handlebars.compile(sourceData)
            var html = template(data)                 
            callback(null, html)                        
        })        
    }
}