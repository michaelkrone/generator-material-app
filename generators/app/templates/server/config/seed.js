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
 */

if ('development' === env) {
	console.log('Populating test and development data ...');
<% if (features.auth) { %>
	User.find({}).remove(function () {
		User.create({
			provider: 'local',
			name: 'Test User',
			email: 'test@test.com',
			password: 'test'
		}, {
			provider: 'local',
			role: 'admin',
			name: 'Admin',
			email: 'admin@admin.com',
			password: 'admin'
		}, function (err) {
			if (err) {
				console.error('Error while populating users: %s', err);
			} else {
				console.log('finished populating users');
			}
		});
	});<% } %>
}
