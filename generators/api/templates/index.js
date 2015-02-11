/**
 * Module for handling <%= name %> requests.
 * Initializing the [<%= modelName %>Controller]{@link <%= name %>:controller~<%= modelName %>Controller}
 * and configuring the express router to handle the <%= name %> api
 * for <%= route %> routes. All Routes are registered after the
 * [request parameters]{@link <%= name %>:parameters} have been
 * added to the router instance. POST, PUT and PATCH requests are
 * routed through the removeReservedSchemaKeywords middleware.
 * Export the configured express router for the <%= name %> api routes
 * @module {express.Router} <%= name %>
 * @requires {@link middleware}
 * @requires {@link <%= name %>:controller~<%= modelName %>Controller}
 */
'use strict';

var router = require('express').Router();
var middleware = require('../../lib/middleware');
var <%= modelName %>Controller = require('./<%= name %>.controller');

// Export the configured express router for the <%= name %> api routes
module.exports = router;

/**
 * The <%= name %> api parameters to attach
 * @type {<%= name %>:parameters}
 */
var register<%= modelName %>Parameters = require('./<%= name %>.params');

/**
 * The api controller
 * @type {<%= name %>:controller~<%= modelName %>Controller}
 */
var controller = new <%= modelName %>Controller();

// register <%= name %> route parameters
register<%= modelName %>Parameters(router);

// register <%= name %> routes
router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', middleware.removeReservedSchemaKeywords, controller.create);
router.put('/:id', middleware.removeReservedSchemaKeywords, controller.update);
router.patch('/:id', middleware.removeReservedSchemaKeywords, controller.update);
router.delete('/:id', controller.destroy);
