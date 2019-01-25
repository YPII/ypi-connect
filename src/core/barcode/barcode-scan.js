const SerialPort = require('serialport')

module.exports = {
    init: function (comport, socket) {
        port = new SerialPort(comport, function (err) {
            if (err) {
              return console.log('Error: ', err.message)              
            }
            console.log('Listening for scans on: ' + comport)
        }) 
        
        port.on('readable', function () {
            console.log('Data:', port.read())

        })
    } 
}