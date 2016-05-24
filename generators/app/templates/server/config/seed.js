/*
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var mongoose = require('mongoose');
<% if (features.auth) { %>
var User = require('../api/user/user.model').model;<% } %>

module.exports = function seed(env) {
  env = env || process.env.NODE_ENV || 'development';

  if ('production' === env) {
    seedProduction();
  } else {
    seedDevelopment();
  }
};

// Insert some data needed to bootstrap or init the application
function seedProduction() {
  // Insert some data needed to init the production instance only, update a version info ...
<% if (features.auth) { %>
  var rootUser = {
    provider: 'local',
    role: 'root',
    name: 'Root',
    password: 'rooter',
    active: true
  };

  User.find({role: 'root'}).exec(function (error, users) {
    if (users.length) return;

    console.log('Populating init root user ...');
    User.create(rootUser, function (err) {
      if (err) {
        console.error('Error while populating users: %s', err);
      } else {
        console.log('finished populating users');
      }
    });
  });<% } %>
}

/*
 * Insert dummy data to test the application
 */

function seedDevelopment() {
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
      } else {
        console.log('finished populating users');
      }
    });
  });<% } %>
}
