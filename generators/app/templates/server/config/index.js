/**
 * This module loads the application configuration depending on the
 * 'NODE_ENV' environment variable.
 * @module {Object} config
 * @property {String} env - The environment used in the application
 * @property {String} root - The application root path
 * @property {String} publicDir - The path to public sources
 * @property {String} ip - IP address used to bind the application server
 * @property {String} port - The port used to bind the application server
 * @property {Object} secrets - Holding the session secret used to sign the user session
 * @property {Array} userRoles - Array of available user role names
 * @property {Object} mongo - Configuration that is passed to mongoose to establish a connection
 */
'use strict';

var _ = require('lodash');
var path = require('path');

/**
 * Load environment configuration
 */

var common = {
	env: process.env.NODE_ENV,

	root: path.normalize(__dirname + '/../..'),

	publicDir: 'client',

	ip: '0.0.0.0',

	port: process.env.PORT || 9001,

	// Secret for session, you will want to change this and make it an environment variable
	secrets: {
		session: process.env.SESSION_SECRET || 'my-<%= appname %>-secret'
	},

	// List of user roles
	userRoles: ['user', 'admin', 'root'],

	// options passed to create mongo connections
	mongo: {
		options: {
			db: {
				safe: true
			},
			server: {
				socketOptions: {
					keepAlive: 1,
					connectTimeoutMS: 10000
				}
			},
			replset: {
				socketOptions: {
					keepAlive: 1,
					connectTimeoutMS: 10000
				}
			}
		}
	}
};

module.exports = _.merge(
	common,
	require('./env/' + process.env.NODE_ENV + '.js') || {});
