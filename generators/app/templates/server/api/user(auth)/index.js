/**
 * Module for handling user requests.
 * Initializing the [UserController]{@link user:controller~UserController}
 * and configuring the express router to handle the user api
 * for /api/users routes. Authentication middleware is added to
 * all requests except the '/' route - where everyone can POST to.
 * Export the configured express router for the user api routes
 * @module {express.Router} user
 * @requires {@link config}
 * @requires {@link middleware}
 * @requires {@link user:controller}
 * @requires {@link auth:service}
 */
'use strict';

var router = require('express').Router();
var middleware = require('../../lib/middleware');
var UserController = require('./user.controller');
var config = require('../../config');
var auth = require('../../lib/auth/auth.service');

/**
 * The user api parameters to attach
 * @type {user:parameters}
 */
var registerUserParameters = require('./user.params');

// Export the configured express router for the user api routes
module.exports = router;

/**
 * The api controller
 * @type {user:controller~UserController}
 */
var controller = new UserController();

// register user route parameters
registerUserParameters(router);

// register user routes
router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id', auth.isAuthenticated(), middleware.removeReservedSchemaKeywords, controller.update);
router.patch('/:id', auth.isAuthenticated(), middleware.removeReservedSchemaKeywords, controller.update);
router.put('/:id/password', auth.isAuthenticated(), middleware.removeReservedSchemaKeywords, controller.changePassword);
router.patch('/:id/password', auth.isAuthenticated(), middleware.removeReservedSchemaKeywords, controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', middleware.removeReservedSchemaKeywords, controller.create);

