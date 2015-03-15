/*
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';
<% if (features.auth) { %>
var User = require('../api/user/user.model').model;<% } %>

/*
// Insert some data needed to bootstrap or init the application

if ('production' === env) {
	// Insert some data needed to init the production instance only, update a version info ...
}
*/

/*
 * Insert dummy data to test the application
 */<% if (features.auth) { %>
exports.users = [{
	provider: 'local',
	name: 'Test User',
	password: 'password',
	active: true
}, {
	provider: 'local',
	role: 'admin',
	name: 'Admin',
	password: 'password',
	active: true
}, {
	provider: 'local',
	role: 'root',
	name: 'Root',
	password: 'password',
	active: true
}];<% } %>

if ('development' === env) {
	console.log('Populating test and development data ...');
<% if (features.auth) { %>
	User.find({}).remove(function () {
		User.create(exports.users, function (err) {
			if (err) {
				console.error('Error while populating users: %s', err);
			} else {
				console.log('finished populating users');
			}
		});
	});<% } %>
}
