var mysql = require('mysql')
var mysqlConfig = require('../mysql/mysql-config')

module.exports = {
  data: { title: "Molecular TAT Report" },
  getData: function (callback) {
    var cn = mysql.createConnection(mysqlConfig)
    var sql = 'CALL rpt_Molecular_TAT()'
    cn.query(sql, true, function (error, results, fields) {
      if(error) {
        console.log(error)
      } else {
        console.log(results[0][0])
        callback(null, results[0])      
      }      
      cn.end()
    })
  }
}