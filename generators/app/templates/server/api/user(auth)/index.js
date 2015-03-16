/**
 * Module for handling user requests.
 * Initializing the [UserController]{@link user:controller~UserController}
 * and configuring the express router to handle the user api
 * for /api/users routes. Authentication middleware is added to
 * all requests except the '/' route - where everyone can POST to.
 * Export the configured express router for the user api routes
 * @module {express.Router} user
 * @requires {@link module:middleware}
 * @requires {@link user:controller}
 * @requires {@link auth:service}
 */
'use strict';

var router = require('express').Router();
var middleware = require('../../lib/middleware');
var UserController = require('./user.controller');
var auth = require('../../lib/auth/auth.service');
var contextService = require('request-context');

// Export the configured express router for the user api routes
module.exports = router;

/**
 * The user api parameters to attach
 * @type {user:parameters}
 */
var registerUserParameters = require('./user.params');

/**
 * The api controller
 * @type {user:controller~UserController}
 */
var controller = new UserController();

// add context for auth sensitive resources
var addRequestContext = contextService.middleware('request');

// add the authenticated user to the created request context
var addUserContext = auth.addAuthContext('request:acl.user');

// check if the authenticated user has at least the 'admin' role
var isAdmin = auth.hasRole('admin');

// register user route parameters
registerUserParameters(router);

// wrap in domain, check authentication and attach userInfo object, set user request context
router.route('*')
	.all(addRequestContext, auth.isAuthenticated(), addUserContext);

// register user routes
router.route('/')
	.get(isAdmin, controller.index)
	.post(isAdmin, controller.create);

// fetch authenticated user info
router.route('/me')
	.get(controller.me);

router.route('/:id')
	.get(isAdmin, controller.show)
	.delete(isAdmin, controller.destroy)
	.put(isAdmin, controller.update)
	.patch(isAdmin, controller.update);

// set the password for a user
router.route('/:id/password')
	.put(controller.changePassword)
	.patch(controller.changePassword);

// admin only - administrative tasks for a user resource (force set password)
router.route('/:id/admin')
	.put(isAdmin, controller.setPassword)
	.patch(isAdmin, controller.setPassword);
