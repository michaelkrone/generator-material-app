/**
 * Extend responses with the following methods:
 * 200, 201, 204, 400, 401, 403, 404, 422, 500, 501, sendData, ok, created,
 * noContent, badRequest, unauthorized, forbidden, notFound, unprocessableEntity,
 * handleError, notImplemented,	serverError
 * @module {Object} responses
 * @requires {@link responses:ok}
 * @requires {@link responses:errors}
 */
'use strict';

var _ = require('lodash');
var ok = require('./ok');
var errors = require('./errors');

// export all available reponse methods
module.exports = _.assign({sendData: sendData},	ok,	errors);

/**
 * Default response output handler
 * @param {mixed} data - The data that should be send to the client
 * @param {Object|String} options - Response configuration object or view template name
 * @return A Response with the given status set, a rendered view if a view template has
 * been provided in the options paramter.
 */
function sendData(data, options) {
	// jshint validthis: true
	var req = this.req;
	var res = this.res;

	// headers already sent, nothing to do here
	if (res.headersSent) {
		return;
	}

	// If appropriate, serve data as JSON
	if (req.xhr || req.accepts('application/json')) {
		return res.json(data);
	}

	// if a template string is given as the options param
	// use it to render a view
	var viewFilePath = (typeof options === 'string') ? options : options.view;

	// try to render the given template, fall back to json
	// if an error occurs while rendering the view file
	if (viewFilePath && req.accepts('html')) {
		res.render(viewFilePath, data, function (err, result) {
			if (err) {
				return res.json(data);
			}
			return res.send(result);
		});
	}

	return res.json(data);
}
