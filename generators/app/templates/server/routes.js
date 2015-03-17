/**
 * Main application routes
 * All responses are routed through the middleware.extendResponse middleware.
 * POST, PUT, PATCH and DELETE requests are
 * routed through the middleware.removeReservedSchemaKeywords middleware.
 */

'use strict';

var path = require('path');
var middleware = require('./lib/middleware');

module.exports = function (app) {

	// extend response with custom methods
	app.use(middleware.extendResponse);

	// default CUD middleware
	app
		.put(middleware.removeReservedSchemaKeywords)
		.patch(middleware.removeReservedSchemaKeywords)
		.delete(middleware.removeReservedSchemaKeywords)
		.post(middleware.removeReservedSchemaKeywords);

		// Insert routes below
	<%if (features.auth) { %>
	app.use('/api/users', require('./api/user'));
	app.use('/auth', require('./lib/auth'));
	<%}%>

	// All undefined asset or api routes should return a 404
	app.route('/:url(api|auth|components|app|bower_components|assets)/*')
		.get(function invalidRoute(req, res) { return res.notFound();	});

	// All other routes should redirect to the index.html
	app.route('/*')
		.get(function getIndexFile(req, res) {
			res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
		});

	// register the default error handler
	app.use(middleware.defaultErrorHandler);
};
