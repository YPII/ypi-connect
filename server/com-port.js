const SerialPort = require('serialport')

module.exports = {
    init: function (socket, comPort) {        
        const port = new SerialPort(comPort, function (err) {
            if (err) {
              return console.log('Error: ', err.message)
            }
          })       
        return port
    }    
}
