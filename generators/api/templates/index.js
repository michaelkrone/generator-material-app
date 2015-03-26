/**
 * Module for handling <%= name %> requests.
 * Initializing the [<%= modelName %>Controller]{@link <%= name %>:controller~<%= modelName %>Controller}
 * and configuring the express router to handle the <%= name %> api
 * for /api/<%= name %>s routes. All Routes are registered after the
 * [request parameters]{@link <%= name %>:parameters} have been
 * added to the router instance.
 * Exports the configured express router for the <%= name %> api routes
 * @module {express.Router} <%= name %>
 * @requires {@link module:middleware}
 * @requires {@link <%= name %>:controller~<%= modelName %>Controller}
 */
'use strict';

var router = require('express').Router();<% if (features.auth) { %>
var contextService = require('request-context');<% } %>
var middleware = require('../../lib/middleware');
var <%= modelName %>Controller = require('./<%= name %>.controller');<% if (features.auth) { %>
var auth = require('../../lib/auth/auth.service');
<% } %>
// Export the configured express router for the <%= name %> api routes
module.exports = router;

/**
 * The api controller
 * @type {<%= name %>:controller~<%= modelName %>Controller}
 */
var controller = new <%= modelName %>Controller(router);

// register <%= name %> route parameters, uncomment if needed
// var register<%= modelName %>Parameters = require('./<%= name %>.params');
// register<%= modelName %>Parameters(router);<% if (secure) { %>

// add context for auth sensitive resources
var addRequestContext = contextService.middleware('request');

// add the authenticated user to the created acl context
var addUserContext = auth.addAuthContext('request:acl.user');

// check if the request is made by an authenticated user with at least the <%= role %> role
var isAuthenticated = auth.hasRole('<%= role %>');

// apply auth middleware to all routes
router.route('*').all(addRequestContext, isAuthenticated, addUserContext);<% } %>

// register <%= name %> routes
router.route('/')
	.get(controller.index)
	.post(controller.create);

router.route('/' + controller.paramString)
	.get(controller.show)
	.delete(controller.destroy)
	.put(controller.update)
	.patch(controller.update);
