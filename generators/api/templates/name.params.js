/**
 * Module for initializing the <%= name%> api request parameters for <%= route %> routes.
 * Export the {@link <%= name %>:Parameters~register<%= modelName %>Params}
 * function to register the api routes on the passed express router.
 * Parameters registered:
 * 'id', attached as '<%= name %>' to the request object
 * @module {function} <%= name %>:parameters
 * @requires {@link <%= name %>:model}
 */
'use strict';

var <%= modelName %> = require('./<%= name %>.model').model;
var ObjectID = require('mongoose').mongo.BSONPure.ObjectID;

// export the function to register all <%= name %> request params
module.exports = register<%= modelName %>Params;

/**
 * Attach request parameters to the given router.
 * @param router {express.Router} - The router to attach the parameters to
 */
function register<%= modelName %>Params(router) {
	router.param('id', registerIdParam);
	// add params below
}

/**
 * Register the default id parameter for <%= route %> requests.
 * Add a '<%= name %>' property to the current request which is the
 * document returned by the <%= modelName %> Model for the 'id' param
 * available in the processed route.
 * @param {http.IncomingMessage} req - The request message object
 * @param {http.ServerResponse} res - The outgoing response object
 * @param next {function} - The next handler function to call when done
 * @param id {String} - The id parsed from the current request
 * @see <%= name %>:model~<%= modelName %>
 * @returns {function} This function sets a status of 400 for malformed MongoDB
 * id's and a status of 404 if no document has been found for the passed
 * id parameter. Calls the passed next function when done.
 */
function registerIdParam(req, res, next, id) {
	// only process a valid object id
	if (!ObjectID.isValid(id)) {
		res.badRequest();
		return next();
	}

	// attach the <%= modelName%> document as <%= name %> to the request
	<%= modelName %>.findById(id, function (err, <%= name %>) {
		if (err) {
			return next(err);
		}

		if (! <%= name %>) {
			res.notFound();
			return next('route');
		}

		req['<%= name %>'] = <%= name %>;
		return next();
	});
}

// add param functions below
