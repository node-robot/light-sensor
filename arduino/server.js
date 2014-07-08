var chalk       = require('chalk');
var sp          = require('serialport');
var events      = require('events');
var cp          = require('child_process');

var SerialPort = sp.SerialPort;
var serialPort = new SerialPort('/dev/tty.usbmodem1451', { // tty.usbserial-FTH144MZ, tty.usbmodem1451
  baudrate: 9600,
  parser: sp.parsers.readline('\n')
}, false);

var ee = new events.EventEmitter();

serialPort.on('open', function(){
  console.log(chalk.blue('Serial Port : Open'));
});

serialPort.on('data', function(data) {
  ee.emit('light', data);

  if(data > 400)
    lightOff();
  else
    lightOn();

});

serialPort.on('close', function(){
  console.log(chalk.red('Serial Port : Closed'));
});

serialPort.open();

module.exports = ee;

// ***************************************************************************//

var status;

function lightOn(){
  if(status !== 1){
    cp.exec('say on');
    status = 1;
  }
}

function lightOff(){
  if(status !== 0){
    cp.exec('open https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=kp');
    status = 0;
  }
}
