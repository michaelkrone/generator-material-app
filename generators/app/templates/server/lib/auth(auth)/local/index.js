/**
 * Module for registering local authentication middleware.
 * Configures the Passport service to use the local authentication
 * mechanism.
 * @module {express.Router} auth:local
 * @requires {@link auth:service}
 */
'use strict';

var _ = require('lodash');
var router = require('express').Router();
var passport = require('passport');
var auth = require('../auth.service.js');

// export the configured express router
module.exports = router;

// register auth routes
router.post('/', authenticate);

/**
 * Authenticate a request and sign a token.
 * @param {http.IncomingMessage} req - The request message object
 * @param {http.ServerResponse} res - The outgoing response object
 * @param {function} next - The next handler callback
 * @return {http.ServerResponse} The result of calling the
 * [callback function]{@link auth:local~authCallback}
 */
function authenticate(req, res, next) {
	var callback = _.bind(authCallback, {req: req, res: res});
	passport.authenticate('local', callback)(req, res, next)
}

/**
 * Authentication callback function. Called from passport.authenticate in
 * {@link auth:local~authenticate}. The request and response objects are available
 * as this.req and this.res.
 * @param {Error|String} err - The error that occurred while authenticating the user
 * @param {user:model~User} user - The user object to authenticate
 * @param {Error|Object} info - Additional information, treated as error
 * @return {http.ServerResponse} A response object with the signed token
 * as the 'token' property.
 */
function authCallback(err, user, info) {
	// jshint validthis: true
	var error = err || info;
	if (error) {
		return this.res.unauthorized(error);
	}

	if (!user) {
		return this.res.notFound('Error, please try again.');
	}

	var token = auth.signToken(user._id, user.role);
	this.res.ok({token: token});
}
