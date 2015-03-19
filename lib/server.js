var cluster = require('cluster');
var net = require('net');
var numCPUs = require('os').cpus().length;

function new_connection(socket) {
  console.log('Connection accepted for ' + socket.remoteAddress + ":" + socket.remotePort);
}

if (cluster.isMaster) {
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {

  // Echo
  net.createServer(function(socket) {
    new_connection(socket);
    socket.on('data', function(data) {
      socket.write(data);
    });
    socket.on('error', function() {});
  }).listen(4444);

  // Info
  net.createServer(function(socket) {
    new_connection(socket);
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
  }).listen(5555);
}