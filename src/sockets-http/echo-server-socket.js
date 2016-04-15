"use strict";

const net = require('net');

let server = net.createServer(function(socket) {
  socket.pipe(socket);
});

server.on('data', function(data) {
  server.write(data);
});

server.listen(1337, '127.0.0.1');
