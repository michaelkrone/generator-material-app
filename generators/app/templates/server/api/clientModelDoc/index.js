/**
 * Module for handling clientModelDoc requests.
 * Initializing the [ClientModelDocController]{@link clientModelDoc:controller~ClientModelDocController}
 * and configuring the express router to handle the clientModelDoc api
 * for /api/clientModelDocs routes. All Routes are registered after the
 * [request parameters]{@link clientModelDoc:parameters} have been
 * added to the router instance.
 * Exports the configured express router for the clientModelDoc api routes
 * @module {express.Router} clientModelDoc
 * @requires {@link module:middleware}
 * @requires {@link clientModelDoc:controller~ClientModelDocController}
 */
'use strict';

var router = require('express').Router();
var contextService = require('request-context');
var middleware = require('../../lib/middleware');
var ClientModelDocController = require('./clientModelDoc.controller');
var auth = require('../../lib/auth/auth.service');

// Export the configured express router for the clientModelDoc api routes
module.exports = router;

/**
 * The api controller
 * @type {clientModelDoc:controller~ClientModelDocController}
 */
var controller = new ClientModelDocController(router);

// register clientModelDoc route parameters, uncomment if needed
// var registerClientModelDocParameters = require('./clientModelDoc.params');
// registerClientModelDocParameters(router);

// add context for auth sensitive resources
var addRequestContext = contextService.middleware('request');

// add the authenticated user to the created acl context
var addUserContext = auth.addAuthContext('request:acl.user');

// check if the request is made by an authenticated user with at least the admin role
var isAuthenticated = auth.hasRole('admin');

// apply auth middleware to all routes
router.route('*').all(addRequestContext, isAuthenticated, addUserContext);

// register clientModelDoc routes
router.route('/')
  .get(controller.index)
  .post(controller.create);

router.route('/' + controller.paramString)
  .get(controller.show)
  .delete(controller.destroy)
  .put(controller.update)
  .patch(controller.update);
