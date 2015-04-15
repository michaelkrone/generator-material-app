#!/usr/bin/env node
'use strict';

var app = require('../server/app');

// start sockets for this instance and start server
app.startServer().listen(app.get('port'), app.get('ip'), function serverStarted() {
	console.log('<%= appname %> started server on ip %s on port %d, in %s mode',
		app.get('ip'), app.get('port'), app.get('env'));
});

// expose app
exports = module.exports = app;
