var request = require('request')

module.exports = {
  version: function (callback) {
    request('http://10.1.2.27:5001/api/v0/version', function (error, response, body) {
      callback(null, body)
    })
  }
}
