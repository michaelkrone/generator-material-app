/**
 * Main application file
 */
'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var socketio = require('socket.io');
var config = require('./config/index');
var socketConfig = require('./config/socketio');
var db = require('./config/mongoose');
var app = express();

// Expose app
exports = module.exports = app;

// expose the function to start the server instance
app.startServer = startServer;
app.serverShutdown = serverShutdown;

// Setup Express
require('./config/express')(app);

// Setup Routes
require('./routes')(app);

// register the shutdown handler to close the database connection on interrupt signals
process
	.on('SIGINT', serverShutdown)
	.on('SIGTERM', serverShutdown);

/**
 * Create an express http server and return it
 * Config the socketio service to use this server
 * @api private
 * @return
 */
function startServer() {
	var server = require('http').createServer(app);
	var socket = socketio(server, {
		serveClient: (config.env !== 'production'),
		path: '/socket.io-client'
	});
	// Setup SocketIO
	socketConfig(socket);
	return server;
}

/**
 * Shutdown handler
 * Closes the database connection on iterrupt and exits the process
 * @api private
 */
function serverShutdown() {
	db.connection.close(function connectionClose() {
		console.log('Database connection disconnected through app termination');
		process.exit(0);
	});
}
