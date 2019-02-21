var mysql = require('mysql')
var path = require('path')

var mysqlConfig = require(path.join(__dirname, 'mysql-config'))

module.exports.submit = (sql, callback) => {
  var connection = mysql.createConnection(mysqlConfig)
  connection.connect()

  var query = connection.query(sql)
  var rows = []
  var error = null

  query
    .on('error', function (err) {
      error = err
    })
    .on('fields', function (fields) {
      // the field packets for the rows to follow
    })
    .on('result', function (row) {
      rows.push(Object.assign({}, row))
    })
    .on('end', function () {
      if (error) return callback(error)
      callback(null, rows)
    })

  connection.end()
}
