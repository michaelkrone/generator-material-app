/**
 * Module defining main application routes middleware to use in the <%= scriptAppName %> application.
 * All responses are extended with the custom response methods defined in {@link responses}.
 * All responses are routed through the middleware.extendResponse middleware.<% if (features.db) { %>
 * POST, PUT, PATCH and DELETE requests are routed through the middleware.removeReservedSchemaKeywords
 * middleware.<%}%>
 * @module {Function} routes
 * @requires path
 * @requires {@link middleware}
 */

'use strict';

var path = require('path');
var middleware = require('./lib/middleware');


module.exports = function (app) {
	var indexFile = path.resolve(app.get('appPath') + '/index.html');

	// extend response with custom methods
	app.use(middleware.extendResponse);<% if (features.db) { %>

	// default CUD middleware
	app
		.put(middleware.removeReservedSchemaKeywords)
		.patch(middleware.removeReservedSchemaKeywords)
		.delete(middleware.removeReservedSchemaKeywords)
		.post(middleware.removeReservedSchemaKeywords);<%}%>

	// Insert routes below
	<%if (features.auth) { %>
	app.use('/api/users', require('./api/user'));
	app.use('/auth', require('./lib/auth'));<%}%>

	// All undefined asset or api routes should return a 404
	app.route('/:url(api|auth|components|app|bower_components|assets)/*')
		.get(invalidRoute);

	// All other routes should redirect to the index.html
	app.route('/*').get(sendFile(indexFile));

	// register the default error handler
	app.use(middleware.defaultErrorHandler);
};

/**
 * Send the given file on the current response.
 * @params {String} fileName - The file to send
 * @returns {Function} A function that can be used as middleware to send a file
 */
function sendFile(fileName) {
		return function send(req, res) {
			res.sendFile(fileName)
		}
}

/**
 * Return a not found error (404) on the given response.
 * @params {Object} req - The request object
 * @params {Object} res - The response object the error will be send to.
 */
function invalidRoute(req, res) {
		return res.notFound();
}
