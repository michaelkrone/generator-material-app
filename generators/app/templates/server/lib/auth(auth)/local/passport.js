/**
 * Module for initializing the passport service.
 * Export the setup function used to setup the authentication model.
 * by using the password validation defined in the User model. By default
 * the user's email address is used to identify a user.
 * @module {Object} auth:local:passport
 */
'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/**
 * Use name and password authentication by default by using the
 * 'name' and 'password' fields of the authentication model.
 * @type {Object}
 */
var strategyConfig = {
	usernameField: 'name',
	passwordField: 'password' // virtual model field
};

/**
 * Export the setup function for the passport service and register the
 * [strategy configuration]{@link auth:local:passport~strategyConfig} and the
 * corresponding [authentication method]{@link auth:local:passport~getAuthentication} on
 * a new LocalStrategy.
 * @param {Model} AuthModel - The model used for authentication
 * @param {Object} [config] - The application configuration, may be passed to the service some day
 */
exports.setup = function (AuthModel, config) {
	passport.use( new LocalStrategy(strategyConfig, getAuthentication(AuthModel, config)) );
};

/**
 * Return a function that authenticates the user. The user is identified by email.
 * The hashed password is passed to the User model for authentication.
 * @param {Model} authModel - The mongoose model used to authenticate the user
 * @param {Object} [config] - The application configuration, may be passed to the service some day
 * @returns {function} - The authentication function to use with the given authModel
 */
function getAuthentication(authModel, config) {

	/**
	 * @name authenticate
	 * @function
	 * @memberOf getAuthentication
	 * Authenticate the user.
	 * @param {String} name - The name used to authenticate the user
	 * @param {String} password - The hashed password
	 * @param {function} done - The callback function called with an error or the valid user object
	 */
	function authenticate(name, password, done) {
		authModel.findOne({name: name, active: true}, function (err, user) {
			if (err) {
				return done(err);
			}

			if (!user) {
				return done(null, false, {message: 'Unknown user'});
			}

			if (!user.authenticate(password)) {
				return done(null, false, {message: 'Wrong password'});
			}

			return done(null, user);
		});
	}

	return authenticate;
}

