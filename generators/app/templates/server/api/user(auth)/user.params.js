/**
 * Module for initializing the user api request parameters for 'api/user' routes.
 * Export the {@link user:Parameters~registerUserParams}
 * function to register the api routes on the passed express router.
 * Parameters registered:
 * 'id', attached as 'user' to the request object
 * @module {function} user:parameters
 * @requires {@link user:model}
 */
'use strict';

var User = require('./user.model').model;
var ObjectID = require('mongoose').mongo.BSONPure.ObjectID;

// export the function to register all user request params
module.exports = registerUserParams;

/**
 * Attach request parameters to the given router.
 * @param router {express.Router} - The router to attach the parameters to
 */
function registerUserParams(router) {
	router.param('id', registerIdParam);
	// add params below
}

/**
 * Register the default id parameter for 'api/user' requests.
 * Add a 'user' property to the current request which is the
 * document returned by the User Model for the 'id' param
 * available in the processed route.
 * @param {http.IncomingMessage} req - The request message object
 * @param {http.ServerResponse} res - The outgoing response object
 * @param next {function} - The next handler function to call when done
 * @param id {String} - The id parsed from the current request
 * @see user:model~User
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

	// attach the User document as user to the request
	User.findById(id, function (err, user) {
		if (err) {
			return next(err);
		}

		if (!user) {
			res.notFound();
			return next('route');
		}

		req.user = user;
		return next();
	});
}

// add param functions below
