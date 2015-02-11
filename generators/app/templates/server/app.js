/**
 * Main application file
 */
'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/index');
var app = express();

// connect to mongodb
var connection = mongoose.connect(config.mongo.uri, config.mongo.options);

// @TODO add support for multiple databases
// if connection is disconnected or disconnecting
if (connection.state === 0 || connection.state === 3) {
	connection.open(function (err) {
		if (err) {
			console.error('Open connection: Database Error: %s', err);
			throw err; // throw error to stop application launch
		}
		console.log('Database Connection open.');
	});
}

mongoose.connection.on('error', function (err) {
	console.error('Database Error: %s', err);
});

mongoose.connection.on('open', function () {
	console.log('Database connection open');
	// Populate DB with sample data
	if (config.seedDB) {
		require('./config/seed');
	}
});
<% if (features.socketio) { %>
// create a http server and return it
// config the socketio to use this server and apply routes
app.startSocket = function () {
	var server = require('http').createServer(app);
	var socketio = require('socket.io')(server, {
		serveClient: (config.env === 'production' ? false : true),
		path: '/socket.io-client'
	});
	// Setup SocketIO
	require('./config/socketio')(socketio);
	return server;
};<%} %>

// Setup Express
require('./config/express')(app);
// Setup Routes
require('./routes')(app);

// Expose app
exports = module.exports = app;
