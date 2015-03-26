/**
 * Module for handling user requests.
 * Initializing the [UserController]{@link user:controller~UserController}
 * and configuring the express router to handle the user api
 * for /api/users routes. Authentication middleware is added to
 * all requests except the '/' route - where everyone can POST to.
 * Export the configured express router for the user api routes
 * @module {express.Router}
 * @requires {request-context}
 * @requires {@link user:controller}
 * @requires {@link auth:service}
 */
'use strict';

var router = require('express').Router();
var contextService = require('request-context');
var UserController = require('./user.controller');
var auth = require('../../lib/auth/auth.service');

// Export the configured express router for the user api routes
module.exports = router;

/**
 * The api controller
 * @type {user:controller~UserController}
 */
var controller = new UserController(router);

// add context for auth sensitive resources
var addRequestContext = contextService.middleware('request');

// add the authenticated user to the created request context
var addUserContext = auth.addAuthContext('request:acl.user');

// check if the used is authenticated at all
var isAuthenticated = auth.isAuthenticated();

// check if the authenticated user has at least the 'admin' role
var isAdmin = auth.hasRole('admin');

// wrap in domain, check authentication and attach userInfo object, set user request context
router.route('*')
	.all(addRequestContext, isAuthenticated, addUserContext);

// register user routes
router.route('/')
	.get(isAdmin, controller.index)
	.post(isAdmin, controller.create);

// fetch authenticated user info
router.route('/me')
	.get(controller.me);

// user crud routes
router.route('/' + controller.paramString)
	.get(isAdmin, controller.show)
	.delete(isAdmin, controller.destroy)
	.put(isAdmin, controller.update)
	.patch(isAdmin, controller.update);

// set the password for a user
router.route('/' + controller.paramString +  '/password')
	.put(controller.changePassword)
	.patch(controller.changePassword);

// admin only - administrative tasks for a user resource (force set password)
router.route('/' + controller.paramString + '/admin')
	.put(isAdmin, controller.setPassword)
	.patch(isAdmin, controller.setPassword);
