/**
 * This module loads and initializes the express configuration
 * depending on the 'NODE_ENV' environment variable.
 * @module {function} config:express
 * @requires {@link config}
 */
'use strict';

var express = require('express');
var path = require('path');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var favicon = require('serve-favicon');
var errorHandler = require('errorhandler');
var passport = require('passport');
var config =  require('./index');

// export the express configuration function
module.exports = initExpress;

/**
 * Configure the express application by adding middleware and setting application
 * variables.
 * @param {express.app} app - The express application instance to configure
 */
function initExpress(app) {
	var env = app.get('env');
	var publicDir = path.join(config.root, config.publicDir);

	app.set('ip', config.ip);
	app.set('port', config.port);

	app.set('views', config.root + '/server/views');
	app.engine('html', require('ejs').renderFile);
	app.set('view engine', 'html');

	app.use(compression());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(methodOverride());
	app.use(cookieParser());
	app.use(passport.initialize());
	app.use(favicon(path.join(publicDir, 'favicon.ico')));

	if ('production' === env) {
		app.use(express.static(publicDir));
		app.set('appPath', publicDir);
		app.use(morgan('tiny'));
	}

	if ('development' === env || 'test' === env) {
		app.use(express.static(path.join(config.root, '.tmp')));
		app.use(express.static(publicDir));
		app.set('appPath', publicDir);
		app.use(morgan('dev'));
		// Error handler - has to be last
		app.use(errorHandler());
	}
}
