/**
 * This module loads and initializes the Socket.io configuration.
 * @module {function} config:socket
 */

'use strict';

var config = require('./index');

// export the socket configuration function
module.exports = initSocketIO;

/**
 * Function performed when the user disconnects
 * @param {socket.io} socket
 */
function onDisconnect(socket) {
}

/**
 * Function that is executed when the client connects
 * @param {socket.io} socket
 */
function onConnect(socket) {
	// When the client emits 'info', this listens and executes
	socket.on('info', function (data) {
		console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
	});

	// Insert sockets below<% if (features.socketio) { %>
	require('../api/user/user.socket').register(socket);<% } %>
}

/**
 * Configure the socketio service to use the session secret with JSON-Webtokens.
 * Add connection and disconnection handlers.
 * @param {socket.io} socketio - The socket instance to configure
 */
function initSocketIO(socketio) {
	// socket.io (v1.x.x) is powered by debug.
	// In order to see all the debug output, set DEBUG for including the desired scope.
	//
	// ex: DEBUG: "http*,socket.io:socket"

	// We can authenticate socket.io users and access their token through socket.handshake.decoded_token
	//
	// 1. You will need to send the token in `client/components/socket/socket.service.js`
	//
	// 2. Require authentication here:
	// socketio.use(require('socketio-jwt').authorize({
	//	secret: config.secrets.session,
	//	handshake: true
	// }));

	socketio.on('connection', function (socket) {
		if (socket.handshake.address !== null) {
			socket.address = socket.handshake.address.address + ':' + socket.handshake.address.port;
		} else {
			socket.address = process.env.DOMAIN;
		}

		socket.connectedAt = new Date();

		// Call onDisconnect.
		socket.on('disconnect', function () {
			onDisconnect(socket);
			console.info('[%s] DISCONNECTED', socket.address);
		});

		// Call onConnect.
		onConnect(socket);
		console.info('[%s] CONNECTED', socket.address);
	});
};
