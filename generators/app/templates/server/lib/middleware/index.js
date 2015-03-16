/**
 * Module defining connect middleware to use in the <%= scriptAppName %> application.
 * @module {Object} middleware
 * @requires {@link responses}
 */
'use strict';

var _ = require('lodash');
var customResponses = require('../responses');
var reserved = ['__v'].concat(Object.keys(require('mongoose').Schema.reserved));

/**
 * The default error handler
 * Binds the handleError method of reponse to the request and response objects.
 * Passes the error to following handlers. The handleErrpr function will send the best
 * response available.
 *
 * @type {Function}
 * @param {Error|String} err - The error that occured during the request-response-cycle
 * @param {http.IncomingMessage} req - The request message object
 * @param {http.ServerResponse} res - The outgoing response object
 * @param {function} [next] - The next handler callback
 */
exports.defaultErrorHandler = function defaultErrorHandler(err, req, res, next) {
	console.error('defaultErrorHandler', req.originalUrl, res.statusCode, err);
	_.bind(customResponses.handleError, {res: res, req: req}, err);
	// pass the error to following handlers (if next if passed)
	if (next) {
		return next(err);
	}
};

/**
 * Removes reserved properties from the request body.
 *
 * @param {http.IncomingMessage} req - The request message object
 * @param {http.ServerResponse} res - The outgoing response object
 * @param {function} next - The next handler callback
 */
exports.removeReservedSchemaKeywords = function removeReservedSchemaKeywords(req, res, next) {
	if (!_.isObject(req.body)) {
		return next();
	}
	req.body = _.omit(req.body, reserved);
	return next();
};

/**
 * Extends the response with custom methods.
 *
 * Attach custom responses to `res` object,
 * provide access to `req` and `res` in their `this` context.
 * @param {http.IncomingMessage} req - The request message object
 * @param {http.ServerResponse} res - The outgoing response object
 * @param {function} next - The next handler callback
 */
exports.extendResponse = function extendResponse(req, res, next) {
	_.forEach(customResponses, function eachResponse(fn, name) {
		res[name] = _.bind(fn, {
			req: req,
			res: res
		});
	});
	return next();
};
