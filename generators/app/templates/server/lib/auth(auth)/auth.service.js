/**
 * Module for setting up the authentication service functions.
 * Utility and service methods for the authentication and authorization services.
 * @module {object} auth:service
 */
'use strict';

var mongoose = require('mongoose');
var config = require('../../config');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var User = require('../../api/user/user.model').model;
var validateJwt = expressJwt({secret: config.secrets.session});

module.exports = {

	/**
	 * Check for valid authentication
	 * @see {auth:service~isAuthenticated}
	 */
	isAuthenticated: isAuthenticated,

	/**
	 * Check for a minimum role
	 * @see {auth:service~hasRole}
	 */
	hasRole: hasRole,

	/**
	 * Sign a token with a user id
	 * @see {auth:service~signToken}
	 */
	signToken: signToken,

	/**
	 * Set a signed token cookie
	 * @see {auth:service~setTokenCookie}
	 */
	setTokenCookie: setTokenCookie
};


/**
 * Attaches the user object to the request if authenticated otherwise returns 403
 * @return {express.middleware}
 */
function isAuthenticated() {
	return compose()
		// Validate jwt
		.use(function (req, res, next) {
			// allow access_token to be passed through query parameter as well
			if (req.query && req.query.hasOwnProperty('access_token')) {
				req.headers.authorization = 'Bearer ' + req.query.access_token;
			}
			validateJwt(req, res, next);
		})
		// Attach user to request
		.use(function (req, res, next) {
			User.findById(req.user._id, function (err, user) {
				if (err) {
					return next(err);
				}

				if (!user) {
					return res.unauthorized();
				}

				req.user = user;
				next();
			});
		});
}

/**
 * Checks if the user role meets the minimum requirements of the route, sets
 * the response status to FORBIDDEN if the requirements do not match.
 * @param {String} roleRequired - Name of the required role
 * @return {http.ServerResponse}
 */
function hasRole(roleRequired) {
	if (!roleRequired) {
		throw new Error('Required role needs to be set');
	}

	return compose()
		.use(isAuthenticated())
		.use(function meetsRequirements(req, res, next) {
			if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
				next();
			} else {
				res.forbidden();
			}
		});
}

/**
 * Returns a jwt token signed by the app secret
 * @param {String} id - Id used to sign a token
 * @return {String}
 */
function signToken(id) {
	return jwt.sign({_id: id}, config.secrets.session, {expiresInMinutes: 60 * 5});
}

/**
 * Set token cookie directly for oAuth strategies. Use the user object of the request to
 * identify a valid session. Set the signed cookie to the request and redirect to '/'.
 * @param {http.IncomingMessage} req - The request message object
 * @param {http.ServerResponse} res - The outgoing response object the cookie is set to
 * @return {http.ServerResponse}
 */
function setTokenCookie(req, res) {
	if (!req.user) {
		return res.notFound({message: 'Something went wrong, please try again.'});
	}

	var token = signToken(req.user._id, req.user.role);
	res.cookie('token', JSON.stringify(token));
	res.redirect('/');
}
