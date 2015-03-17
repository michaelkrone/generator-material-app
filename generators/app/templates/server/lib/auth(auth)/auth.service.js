/**
 * Module for setting up the authentication service functions.
 * Utility and service methods for the authentication and authorization services.
 * @module {object} auth:service
 */
'use strict';

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var compose = require('composable-middleware');
var roles = require('./roles');
var config = require('../../config');
var contextService = require('request-context');

var validateJwt = expressJwt({secret: config.secrets.session});

module.exports = {

	/**
	 * Middleware for checking for valid authentication
	 * @see {auth:service~isAuthenticated}
	 */
	isAuthenticated: isAuthenticated,

	/**
	 * Middleware for checking for a minimum role
	 * @see {auth:service~hasRole}
	 */
	hasRole: hasRole,

	/**
	 * Middleware for add the current user object to the request context as the given name
	 * @see {auth:service~addAuthContex}
	 * @type {Function}

	 */
	addAuthContext: addAuthContext,

	/**
	 * Sign a token with a user id
	 * @see {auth:service~signToken}
	 */
	signToken: signToken,

	/**
	 * Set a signed token cookie
	 * @see {auth:service~setTokenCookie}
	 */
	setTokenCookie: setTokenCookie,

	/**
	 * Utility functions for handling user roles
	 * @type {Object}
	 */
	roles: roles

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

		.use(function (req, res, next) { // Attach userInfo to request
			// return if this request has already been authorized
			if (req.hasOwnProperty('userInfo')) {
				return next();
			}

			// load user model on demand
			var User = require('../../api/user/user.model').model;

			// read the user id from the token information provided in req.user
			User.findOne({_id: req.user._id, active: true}, function (err, user) {
				if (err) {
					return next(err);
				}

				if (!user) {
					res.unauthorized();
					return next();
				}

				// set the requests userInfo object as the authenticated user
				req.userInfo = user;
				next();
			});
		});
}

/**
 * Checks if the user role meets the minimum requirements of the route, sets
 * the response status to FORBIDDEN if the requirements do not match.
 * @param {String} roleRequired - Name of the required role
 * @return {ServerResponse}
 */
function hasRole(roleRequired) {
	if (!roleRequired) {
		throw new Error('Required role needs to be set');
	}

	return compose()
		.use(isAuthenticated())
		.use(function meetsRequirements(req, res, next) {
			if (roles.hasRole(req.userInfo.role, roleRequired)) {
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
function signToken(id, role) {
	return jwt.sign({_id: id, role: role}, config.secrets.session, {expiresInMinutes: 60 * 5});
}

/**
 * Set token cookie directly for oAuth sreturn trategies. Use the user object of the request to
 * identify a valid session. Set the signed cookie to the request and redirect to '/'.
 * @param {http.IncomingMessage} req - The request message object
 * @param {ServerResponse} res - The outgoing response object the cookie is set to
 * @return {ServerResponse}
 */
function setTokenCookie(req, res) {
	if (!req.userInfo) {
		return res.notFound({message: 'Something went wrong, please try again.'});
	}

	var token = signToken(req.userInfo._id, req.userInfo.role);
	res.cookie('token', JSON.stringify(token));
	res.redirect('/');
}

/**
 * Add the current user object to the request context as the given name
 *
 * @param {http.IncomingMessage} req - The request message object
 * @param {ServerResponse} res - The outgoing response object
 * @param {function} next - The next handler callback
 */
function addAuthContext(namespace) {
	if (!namespace) {
		throw new Error('No context namespace specified!');
	}

	return function addAuthContextMiddleWare(req, res, next) {
		contextService.setContext(namespace, req.userInfo);
		next();
	};
}
