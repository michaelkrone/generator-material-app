/**
 * Module for defining error responses. Export all needed error responses.
 * @module {Object} responses:errors
 */
'use strict';

module.exports = {
	/**
	 * Handles malformed requests
	 * @type {function}
	 * @see responses:errors~badRequest
	 */
	badRequest: badRequest,

	/**
	 * Handles malformed requests
	 * @type {function}
	 * @see responses:errors~badRequest
	 */
	400: badRequest,

	/**
	 * Handles unauthorized requests
	 * @type {function}
	 * @see responses:errors~unauthorized
	 */
	unauthorized: unauthorized,

	/**
	 * Handles unauthorized requests
	 * @type {function}
	 * @see responses:errors~unauthorized
	 */
	401: unauthorized,

	/**
	 * Handles forbidden requests
	 * @type {function}
	 * @see responses:errors~forbidden
	 */
	forbidden: forbidden,

	/**
	 * Handles forbidden requests
	 * @type {function}
	 * @see responses:errors~forbidden
	 */
	403: forbidden,

	/**
	 * Handles not found requests
	 * @type {function}
	 * @see responses:errors~notFound
	 */
	notFound: notFound,

	/**
	 * Handles not found requests
	 * @type {function}
	 * @see responses:errors~notFound
	 */
	404: notFound,

	/**
	 * Handles unprocessable entities
	 * @type {function}
	 * @see responses:errors~unprocessableEntity
	 */
	unprocessableEntity: unprocessableEntity,

	/**
	 * Handles unprocessable entities
	 * @type {function}
	 * @see responses:errors~unprocessableEntity
	 */
	422: unprocessableEntity,


	/**
	 * Handles generic errors
	 * @type {function}
	 * @see responses:errors~handleError
	 */
	handleError: handleError,

	/**
	 * Handles generic errors
	 * @type {function}
	 * @see responses:errors~handleError
	 */
	500: handleError,


	/**
	 * Handles not implemented errors
	 * @type {function}
	 * @see responses:errors~notImplemented
	 */
	notImplemented: notImplemented,

	/**
	 * Handles not implemented errors
	 * @type {function}
	 * @see responses:errors~notImplemented
	 */
	501: notImplemented,

	/**
	 * Handles server errors
	 * @type {function}
	 * @see responses:errors~serverError
	 */
	serverError: serverError
};

// 400

/**
 * Handles malformed requests
 * @param {mixed} data - The data that should be send to the client
 * @param {Object|String} options - Response configuration object or view template name
 * @return A Response with status 400 set
 */
function badRequest(data, options) {
	// jshint validthis: true
	return this.res.status(400).sendData(data, options);
}

/**
 * Handles unauthorized requests
 * @param {mixed} data - The data that should be send to the client
 * @param {Object|String} options - Response configuration object or view template name
 * @return A Response with status 401 set
 */
function unauthorized(data, options) {
	// jshint validthis: true
	return this.res.status(401).sendData(data, options);
}

/**
 * Handles forbidden requests
 * @param {mixed} data - The data that should be send to the client
 * @param {Object|String} options - Response configuration object or view template name
 * @return A Response with status 403 set
 */
function forbidden(data, options) {
	// jshint validthis: true
	return this.res.status(403).sendData(data, options);
}

/**
 * Handles not found requests
 * Set status 'Not found'
 * @param {mixed} data - The data that should be send to the client
 * @param {Object|String} options - Response configuration object or view template name
 * @return The given Response with status code 404 set and the 404 template if it can be
 * redered correctly, otherwise the error object set as json body
 */
function notFound(data, options) {
	// jshint validthis: true
	return this.res.status(404).sendData(data, options || '404');
}

/**
 * Handles unprocessable requests
 *
 * @param {mixed} data - The data that should be send to the client
 * @param {Object|String} options - Response configuration object or view template name
 * @return A Response with status 422 set
 */
function unprocessableEntity(data, options) {
	// jshint validthis: true
	return this.res.status(422).sendData(data, options);
}

// 500

/**
 * 500 (Server Error) Response
 * @param {mixed} data - The data that should be send to the client
 * @param {Object|String} options - Response configuration object or view template name
 * @return A Response with status 500 set
 * @usage
 * return res.serverError();
 * return res.serverError(err);
 * return res.serverError(err, 'some/specific/error/view');
 */

function serverError(data, options) {
	// jshint validthis: true
	// Get access to request and response
	var req = this.req;
	var res = this.res;
	console.log('serverError', data, options);
	// Set status code
	res.status(500);

	// Log error to console
	if (data !== undefined) {
		console.error('Sending 500 ("Server Error") response: \n', data);
	} else {
		console.error('Sending empty 500 ("Server Error") response');
	}

	// Only include errors in response if application environment
	// is not set to 'production'
	if (process.env.NODE_ENV === 'production') {
		data = undefined;
	}

	// If appropriate, serve data as JSON
	if (req.xhr || req.accepts('application/json')) {
		return res.json(data);
	}

	// if a template string is given as the options param
	// use it to render a view
	var viewFilePath = (typeof options === 'string') ? options : options && options.view;

	// If a view was provided in options, serve it.
	// Otherwise try to guess an appropriate view, or if that doesn't
	// work, just send JSON.
	if (viewFilePath) {
		return res.view(viewFilePath, {data: data});
	} else {
		// If no second argument provided, try to serve the default view,
		// but fall back to sending JSON if any errors occur.
		return res.view('500', {data: data}, function (err, html) {
			if (err) {
				if (err.code === 'E_VIEW_FAILED') { // log a missing view
					console.log('res.serverError() :: Could not locate view for error page (sending JSON instead).  Details: ', err);
				} else { // serious error
					console.error('res.serverError() :: When attempting to render error page view, an error occured (sending JSON instead).  Details: ', err);
				}
				return res.json(data);
			}

			return res.send(html);
		});
	}
}

/**
 * Handle generic errors on requests.
 * Set status 'Internal Server Error'
 * @param {http.ServerResponse} res - The outgoing response object
 * @param {Error} [err] - The error that occurred during the request
 * @return The given Response with a error status code set (defaults to 500)
 * and the error object set as response body.
 */
function handleError(err, options) {
	// jshint validthis: true
	// Get access to response object
	var res = this.res;
	var statusCode;

	console.log('handleError', err, options);

	if (err.name && err.name === 'ValidationError') {
		return res.badRequest(err);
	}

	try {
		statusCode = err.status || 500;
		// set the status as a default
		res.status(statusCode);

		if (statusCode !== 500 && typeof res[statusCode] === 'function') {
			return res[statusCode](err);
		}
	} catch (e) {
		console.log('Exception while handling error: %s', e);
	}

	return res.serverError(err);
}

/**
 * Handles requests that are not implemented.
 * Set status 'Not implemented'
 *
 * @param {http.ServerResponse} res - The outgoing response object
 * @param {Error} [err] - The error that occurred during the request
 * @return The given Response with status code 501 set and the error
 * object set as json body
 */
function notImplemented(data, options) {
	// jshint validthis: true
	return this.res.status(501).sendData(data, options);
}
