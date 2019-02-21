var request = require('request')

var ipfsBaseUrl = 'http://10.1.2.27:5001/api/v0'

module.exports = {
  version: function (callback) {
    request(`${ipfsBaseUrl}/version`, function (error, response, body) {
      callback(null, body)
    })
  },
  filesls: function (path, callback) {
    request(`${ipfsBaseUrl}/files/ls?arg=/${path}`, function (error, response, body) {
      callback(null, body)
    })
  },
  filesrm: function (path, callback) {
    request(`${ipfsBaseUrl}/files/rm?arg=${path}&recursive=true&force=true`, function (error, response, body) {
      callback(null, body)
    })
  },
  filesmkdir: function (directory, callback) {
    request(`${ipfsBaseUrl}/files/mkdir?arg=${directory}&parents=true`, function (error, response, body) {
      callback(null, body)
    })
  }
}
