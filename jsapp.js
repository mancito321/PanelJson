var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyACM0',{
  baudrate : 115200,
  parser: SerialPort.parsers.readline('\n')
});
var express = require('express')
var app= express()
/*


port.on('open', function(){
  console.log("SerialPort open!")
});*/
var request = require('request');

port.on('data', function(data){
  var payload = JSON.parse(data)
  var foo = new Date();
  var HourSS=foo.getHours();
  var Minuten=foo.getMinutes();
  var Monthen=foo.getMonth();
  var Daythn=foo.getDate();
  var Secon=foo.getSeconds();
  payload['timestamp'] = [Monthen,Daythn,HourSS,Minuten,Secon];
  //console.log(payload)
  // var msgjson:{
  //   current:{
  //     network:payload['Corriente 1'],
  //     panel:payload['Corriente 2'],
  //     used:payload['Corriente 3'],
  //   },
  //   temperature:{"56"},
  //   radiation:{"not yet"},
  //   time:payload['timestamp']
  // }
  var meessg = JSON.parse('{ "current":"", "temperature":"", "radiation":"","time":""}')
  var crnnt=JSON.parse('{"network":"","panel":"","used":""}')
  crnnt.network=payload.Corriente1
  crnnt.panel=payload.Corriente2
  crnnt.used=payload.Corriente3
  meessg.current=crnnt
  meessg.temperature=payload.Temperature
  meessg.radiation="not ready yet"
  meessg.time=payload.timestamp
  console.log('object created')
  request.post({
      uri: 'http://192.168.43.214:8080/client/1234/4136794/',
      json: meessg,
    }, function(err, response, body) {
      console.log('Msg send');
      console.log('Time'+HourSS+":"+Minuten+":"+Secon);
      console.log(err);
  })
  // app.post('10.161.39.220:8080/cient/1234/4136794',function(req,res){
  //     res.send(payload)
  // });
  // request.post(
  //     '10.161.39.220:8080/cient/1234/4136794',
  //     { json:msgjson},
  //     function (error, response, body) {
  //         if (!error && response.statusCode == 200) {
  //             console.log(body)
  //         }
  //     }

});
