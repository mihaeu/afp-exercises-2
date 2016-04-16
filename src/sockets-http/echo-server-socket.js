"use strict";

const net = require('net');

let server = net.createServer(function(socket) {
  	socket.pipe(socket);

	socket.on('data', function(data) {
		socket.write("message: " + data);
	});
});


server.listen(1337, '127.0.0.1');
