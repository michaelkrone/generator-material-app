/*
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var mongoose = require('mongoose');
<% if (features.auth) { %>
var User = require('../api/user/user.model').model;
var roles = require('../lib/auth/auth.service').roles;
<% } %>

module.exports = function seed(env, cb) {
	cb = cb || function () {};
  env = env || process.env.NODE_ENV || 'development';

  if ('production' === env) {
    seedProduction(cb);
  } else {
    seedDevelopment(cb);
  }
};

// Insert some data needed to bootstrap or init the application
function seedProduction(cb) {
  // Insert some data needed to init the production instance only, update a version info ...
<% if (features.auth) { %>
	// this user will be added if no user with the maximum role can be found
  var rootUser = {
    provider: 'local',
    role: roles.getMaxRole(),
    name: 'Root',
    password: 'rooter',
    active: true
  };

  User.getRoot(function (error, user) {
		if (error) {
			console.error('Error while testing for an existing %s user: %s', roles.getMaxRole(), error);
			return cb(error);
		}

    if (user) {
       console.log('Found an existing %s user', roles.getMaxRole());
			return cb();
		}

    console.log('Populating init root user ...');
    User.create(rootUser, function (err) {
      if (err) {
        console.error('Error while populating %s user: %s', roles.getMaxRole(), err);
				return cb(err);
      }

			console.log('finished populating %s user', roles.getMaxRole());
      cb();
    });
  });<% } %>
}

/*
 * Insert dummy data to test the application
 */

function seedDevelopment(cb) {
  console.log('Populating test and development data ...');
<% if (features.auth) { %>
  var users = [{
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
  }];

  User.find({}).remove(function () {
    User.create(users, function (err) {
      if (err) {
        console.error('Error while populating users: %s', err);
				return cb(err);
      }

			console.log('finished populating users');
      cb();
    });
  });<% } %>
}
