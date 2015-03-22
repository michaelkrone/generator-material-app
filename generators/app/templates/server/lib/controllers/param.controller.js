'use strict';

var _ = require('lodash');
var ObjectID = require('mongoose').mongo.BSONPure.ObjectID;

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
 * @param {Object} router - The express router to attach the param function to
 */
function ParamController(model, idName, paramName, router) {
	// call super constructor
	CrudController.call(this, model, idName);

	// only set param if is set, will default to 'id'
	if (paramName) {
		this.paramName = String(paramName);
	}

	// register id name route parameter
	this.paramString = ':' + this.paramName;
	router.param(this.paramName, this.registerRequestParameter);
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
			return res.ok(this.getResponseObject(req[this.paramName]));
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

		var self = this;
		var bodyData = _.omit(req.body, this.omit);
		var updated = _.merge(req[this.paramName], bodyData);

		updated.save(function (err) {
			if (err) {
				return res.handleError(err);
			}

			req[this.paramName] = updated;
			return res.ok(self.getResponseObject(updated));
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
	},

	/**
	 * Register the default id parameter for route requests.
	 * Add a property to the current request which is the
	 * document returned by the controller Model for the param configures
	 * paramter name available in the processed request.
	 * @param {http.IncomingMessage} req - The request message object
	 * @param {http.ServerResponse} res - The outgoing response object
	 * @param next {function} - The next handler function to call when done
	 * @param id {String} - The id parameter parsed from the current request
	 * @returns {function} This function sets a status of 400 for malformed MongoDB
	 * id's and a status of 404 if no document has been found for the passed
	 * parameter value. Calls the passed next function when done.
	 */
	registerRequestParameter: function (req, res, next, id) {
		// only process a valid object id
		if (!ObjectID.isValid(id)) {
			res.badRequest();
			return next();
		}

		// attach the document as this.paramName to the request
		this.model.findOne({'_id': id}, function (err, doc) {
			if (err) {
				return next(err);
			}

			if (!doc) {
				res.notFound();
				return next('route');
			}

			req[this.paramName] = doc;
			return next();
		});
	}
};

// set properties explicit on ParamController.prototype to allow doc generation
ParamController.prototype = _.create(CrudController.prototype, ParamController.prototype);
