'use strict';

var _ = require('lodash');
var CrudController = require('./crud.controller');

/**
 * The CrudController for basic CRUD functionality on Mongoose models
 * @type {ParamController}
 */
exports = module.exports = ParamController;

/**
 * Constructor function for ParamController.
 * @classdesc Controller for basic CRUD operations on mongoose models.
 * Using a route parameter object (request property) if possible.
 * The parameter name is passed as the third argument.
 * @constructor
 * @inherits CrudController
 * @param {Model} model - The mongoose model to operate on
 * @param {String} idName - The name of the id request parameter to use
 * @param {String} paramName - The name of the request property to use
 */
function ParamController(model, idName, paramName) {
	// call super constructor
	CrudController.call(this, model, idName);

	// only set param if is set, will default to 'id'
	if (paramName) {
		this.paramName = String(paramName);
	}
}

ParamController.prototype = {

	/**
	 * Set our own constructor property for instanceof checks
	 * @private
	 */
	constructor: ParamController,

	/**
	 * The route parameter name
	 * @default
	 */
	paramName: 'id',

	/**
	 * Get a single document, returning the request
	 * property named {@link ParamController#paramName}.
	 * @param {IncomingMessage} req - The request message object
	 * @param {ServerResponse} res - The outgoing response object
	 * @returns {ServerResponse} A single document or NOT FOUND if no document has been found
	 */
	show: function (req, res) {
		if (req[this.paramName]) {
			return res.ok(req[this.paramName]);
		}
		return res.notFound();
	},

	/**
	 * Updates an existing document in the DB using the request
	 * property named {@link ParamController#paramName}.
	 * @param {IncomingMessage} req - The request message object
	 * @param {ServerResponse} res - The outgoing response object
	 * @returns {ServerResponse} The updated document or NOT FOUND if no document has been found
	 */
	update: function (req, res) {
		if (req.body._id) {
			delete req.body._id;
		}

		var updated = _.merge(req[this.paramName], req.body);
		updated.save(function (err) {
			if (err) {
				return res.handleError(err);
			}

			req[this.paramName] = updated;
			return res.ok(this.getResponseObject(updated));
		});
	},

	/**
	 * Deletes an document from the DB using the request
	 * property named {@link ParamController#paramName}.
	 * @param {IncomingMessage} req - The request message object
	 * @param {ServerResponse} res - The outgoing response object
	 * @returns {ServerResponse} The response status 201 CREATED or an error response
	 */
	destroy: function (req, res) {
		req[this.paramName].remove(function (err) {
			if (err) {
				return res.handleError(err);
			}

			delete req[this.paramName];
			return res.noContent();
		});
	}
};

// set properties explicit on ParamController.prototype to allow doc generation
ParamController.prototype = _.create(CrudController.prototype, ParamController.prototype);
