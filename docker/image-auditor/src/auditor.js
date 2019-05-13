// #####  Receiving UDP packets #####

const dgram = require("dgram");

var map = new Map();

const s = dgram.createSocket('udp4');
s.bind(2222, function(){
  console.log("Joining multicast group");
  s.addMembership("239.255.22.5");
});

s.on('message', function(msg, source){
  //console.log("Data has arrived: " + msg + "source port: " + source.port);
  var sound = JSON.parse(msg);
  map.set(sound.instrument_uuid, sound);
});



// ##### TCP part #####

const net = require('net');
const port = 2205;

const server = net.createServer();
server.listen(port, () => {
  console.log('TCP Server runnning on port ', + port + '.');
});


server.on('connection', function(sock) {
  console.log('Connected: ' + sock.remoteAddress + ':' + sock.remotePort);
  var t = Date.now();
  for(var sound of map){
    //if(t - sound.timestamp < 5000)
    sock.write (JSON.stringify(sound));

  sock.on('data', function(data){
    console.log('DATA ' + sock.remoteAddress + ': ' + data);
    }
  });

  sock.on('close', function(data){
    console.log('DATA ' + sock.remoteAddress + ' ' + sock.remotePort);
  });

});
