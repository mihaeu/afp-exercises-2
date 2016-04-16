"use strict";

const net = require('net');

const fs = require('fs');
const Promise = require("bluebird");
const readFile = Promise.promisify(require("fs").readFile);

let server = net.createServer(function(socket) {
  socket.pipe(socket);

  socket.on('data', function(data) {
	  readFile(data.toString().trim(), 'utf8')
      .then(data => socket.write(data))
      .catch(error => socket.write(error.message));
  });
});

server.listen(1337, '127.0.0.1');
