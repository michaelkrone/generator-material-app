/**
 * Module for defining OK responses. Export all needed 200 range responses.
 * @module {Object} responses:ok
 */
'use strict';

module.exports = {

	/**
	 * Handles default responses
	 * @type {function}
	 * @see responses:ok~sendOk
	 */
	ok: sendOk,

	/**
	 * Handles default responses
	 * @type {function}
	 * @see responses:ok~sendOk
	 */
	200: sendOk,

	/**
	 * Handles created responses
	 * @type {function}
	 * @see responses:ok~created
	 */
	created: created,

	/**
	 * Handles created responses
	 * @type {function}
	 * @see responses:ok~created
	 */
	201: created,

	/**
	 * Handles content less responses
	 * @type {function}
	 * @see responses:ok~noContent
	 */
	noContent: noContent,

	/**
	 * Handles content less responses
	 * @type {function}
	 * @see responses:ok~noContent
	 */
	204: noContent
};

// 200

/**
 * Handles default responses
 * @param {mixed} data - The data that should be send to the client
 * @param {Object|String} options - Response configuration object or view template name
 * @return A Response with status 200 set
 */
function sendOk(data, options) {
	// jshint validthis: true
	return this.res.status(200).sendData(data, options);
}

/**
 * Handles created responses
 * @param {mixed} data - The data that should be send to the client
 * @param {Object|String} options - Response configuration object or view template name
 * @return A Response with status 201 set
 */
function created(data, options) {
	// jshint validthis: true
	return this.res.status(201).sendData(data, options);
}

/**
 * Handles content less responses
 * @param {mixed} data - The data that should be send to the client
 * @param {Object|String} options - Response configuration object or view template name
 * @return A Response with status 204 set
 */
function noContent(data, options) {
	// jshint validthis: true
	return this.res.status(204).sendData(data, options);
}
