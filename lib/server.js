var cluster = require('cluster');
var net = require('net');
var dgram = require('dgram');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {

  // TCP Echo
  net.createServer(function(socket) {
    socket.on('data', function(data) {
      socket.write(data);
    });
    socket.on('error', function() {});
  }).listen(30000);

  // TCP Info
  net.createServer(function(socket) {
    socket.on('data', function(data) {
      var response = {
        "client-ip": socket.remoteAddress,
        "data": data,
        "text-data": data.toString(),
        "size": data.length
      }
      socket.write(JSON.stringify(response));
    });
    socket.on('error', function() {});
  }).listen(30001);

  // UDP Echo
  var udp_echo_server = dgram.createSocket("udp4");
  udp_echo_server.on("message", function(msg, rinfo) {
    udp_echo_server.send(msg, 0, msg.length, rinfo.port, rinfo.address);
  });
  udp_echo_server.bind(40000);

  // UDP Info
  var udp_info_server = dgram.createSocket("udp4");
  udp_info_server.on("message", function(msg, rinfo) {
    var response = JSON.stringify({
      "client-ip": rinfo.address,
      "data": msg,
      "text-data": msg.toString(),
      "size": msg.length
    });

    var buffer = Buffer.from(response);
    udp_info_server.send(buffer, 0, buffer.length, rinfo.port, rinfo.address);
  });
  udp_info_server.bind(40001);
}
