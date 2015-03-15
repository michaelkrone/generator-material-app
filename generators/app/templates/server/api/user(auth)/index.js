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

// add the authenticated user to the created acl context
var addUserContext = auth.addAuthContext('request:acl.user');

// check if the authenticated user has at least the 'admin' role
var isAdmin = auth.hasRole('admin');

// register user route parameters
registerUserParameters(router);

// apply to all CUD routes
router.route('*')
	.put(addRequestContext)
	.post(addRequestContext)
	.patch(addRequestContext);

// register user routes
router.route('/')
	.get(isAdmin, controller.index)
	.post(isAdmin, addUserContext, controller.create);

// fetch authenticated user info
router.route('/me')
	.get(auth.isAuthenticated(), controller.me);

router.route('/:id')
	.get(isAdmin, controller.show)
	.delete(isAdmin, controller.destroy)
	.put(isAdmin, addUserContext, controller.update)
	.patch(isAdmin, addUserContext, controller.update);

// set the password for a user
router.route('/:id/password')
	.put(auth.isAuthenticated(), addUserContext, controller.changePassword)
	.patch(auth.isAuthenticated(), addUserContext, controller.changePassword);

// administrative tasks for a user resource (force set password)
router.route('/:id/admin')
	.put(isAdmin, addUserContext, controller.setPassword)
	.patch(isAdmin, addUserContext, controller.setPassword);
