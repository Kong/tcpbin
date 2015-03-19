var should = require('should');
var net = require('net')
var dgram = require('dgram');

describe('Tcpbin', function () {

  describe('TCP', function () {

    it('should echo', function (done) {
      var client = new net.Socket();
      client.connect(30000, '127.0.0.1', function() {
        client.write('TCP echo test');
      });
      client.on('data', function(data) {
        should(data.toString()).equal('TCP echo test');
        done();
      });
    });

    it('should get info', function (done) {
      var client = new net.Socket();
      client.connect(30001, '127.0.0.1', function() {
        client.write('TCP info test');
      });
      client.on('data', function(data) {
        should(data.toString()).equal('{"client-ip":"127.0.0.1","data":[84,67,80,32,105,110,102,111,32,116,101,115,116],"text-data":"TCP info test","size":13}');
        done();
      });
    });

  });

  describe('UDP', function () {

    it('should echo', function (done) {
      var client = dgram.createSocket('udp4');
      client.on('message', function(message, remote) {
        should(message.toString()).equal('UDP echo test');
        done();
      });
      var message = new Buffer('UDP echo test');
      client.send(message, 0, message.length, 40000, "127.0.0.1", function(err, bytes) {
        if (err) throw err;
      });
    });

    it('should get info', function (done) {
      var client = dgram.createSocket('udp4');
      client.on('message', function(message, remote) {
        should(message.toString()).equal('{"client-ip":"127.0.0.1","data":[85,68,80,32,105,110,102,111,32,116,101,115,116],"text-data":"UDP info test","size":13}');
        done();
      });
      var message = new Buffer('UDP info test');
      client.send(message, 0, message.length, 40001, "127.0.0.1", function(err, bytes) {
        if (err) throw err;
      });
    });

  });

});