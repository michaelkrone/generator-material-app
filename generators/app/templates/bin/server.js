#!/usr/bin/env node
'use strict';

var app = require('../server/app');
<%if (features.socketio) { %>
// start sockets for this instance and start server
app.startSocket().listen(app.get('port'), app.get('ip'), function startServer() {
	console.log('<%= appname %> started server on ip %s on port %d, in %s mode',
		app.get('ip'), app.get('port'), app.get('env'));
});
<% } else { %>
// start server
app.listen(app.get('port'), app.get('ip'), function startServer() {
	console.log('<%= appname %> started server on ip %s on port %d, in %s mode',
		app.get('ip'), app.get('port'), app.get('env'));
});
<% } %>

// expose app
exports = module.exports = app;
