'use strict';

var _ = require('lodash');
var BaseController = require('./base.controller');

/**
 * The CrudController for basic CRUD functionality on Mongoose models
 * @type {CrudController}
 */
exports = module.exports = CrudController;

/**
 * Constructor function for CrudController.
 * @classdesc Controller for basic CRUD operations on mongoose models.
 * Uses the passed id name as the request parameter id to identify models.
 * @constructor
 * @extends BaseController
 * @param {Model} model - The mongoose model to operate on
 * @param {String} idName - The name of the id request parameter to use
 */
function CrudController(model, idName) {
	// call super constructor
	BaseController.call(this);
	// set the model instance to work on
	this.model = model;
	// set id name if defined, defaults to 'id'
	if (idName) {
		this.idName = String(idName);
	}
}

CrudController.prototype = {

	/**
	 * Set our own constructor property for instanceof checks
	 * @private
	 */
	constructor: CrudController,

	/**
	 * The model instance to perform operations with
	 * @type {MongooseModel}
	 */
	model: null,

	/**
	 * The id  parameter name
	 * @type {String}
	 * @default
	 */
	idName: 'id',

	/**
	 * Get a list of documents
	 * @param {http.IncomingMessage} req - The request message object
	 * @param {http.ServerResponse} res - The outgoing response object the result is set to
	 * @returns {http.ServerResponse} Array of all documents for the {@link CrudController#model} model
	 * or the empty Array if no documents have been found
	 */
	index: function (req, res) {
		this.model.find().lean().exec(function (err, documents) {
			if (err) {
				return res.handleError(err);
			}
			return res.ok(documents);
		});
	},

	/**
	 * Get a single document. The requested document id is read from the request parameters
	 * by using the {@link CrudController#idName} property.
	 * @param {http.IncomingMessage} req - The request message object the id is read from
	 * @param {http.ServerResponse} res - The outgoing response object
	 * @returns {http.ServerResponse} A single document or NOT FOUND if no document has been found
	 */
	show: function (req, res) {
		this.model.findById(req.params[this.idName], function (err, document) {
			if (err) {
				return res.handleError(err);
			}
			if (!document) {
				return res.notFound();
			}
			return res.ok(document);
		});
	},

	/**
	 * Creates a new document in the DB.
	 * @param {http.IncomingMessage} req - The request message object containing the json document data
	 * @param {http.ServerResponse} res - The outgoing response object
	 * @returns {http.ServerResponse} The response status 201 CREATED or an error response
	 */
	create: function (req, res) {
		this.model.create(req.body, function (err, document) {
			if (err) {
				return res.handleError(err);
			}
			return res.created(document);
		});
	},

	/**
	 * Updates an existing document in the DB. The requested document id is read from the
	 * request parameters by using the {@link CrudController#idName} property.
	 * @param {http.IncomingMessage} req - The request message object the id is read from
	 * @param {http.ServerResponse} res - The outgoing response object
	 * @returns {http.ServerResponse} The updated document or NOT FOUND if no document has been found
	 */
	update: function (req, res) {
		if (req.body._id) {
			delete req.body._id;
		}

		this.model.findById(req.params[this.idName], function (err, document) {
			if (err) {
				return res.handleError(err);
			}
			if (!document) {
				return res.notFound();
			}

			var updated = _.merge(document, req.body);
			updated.save(function (err) {
				if (err) {
					return res.handleError(err);
				}
				return res.ok(updated);
			});
		});
	},

	/**
	 * Deletes a document from the DB. The requested document id is read from the
	 * request parameters by using the {@link CrudController#idName} property.
	 * @param {http.IncomingMessage} req - The request message object the id is read from
	 * @param {http.ServerResponse} res - The outgoing response object
	 * @returns {http.ServerResponse} A NO CONTENT response or NOT FOUND if no document has
	 * been found for the given id
	 */
	destroy: function (req, res) {
		this.model.findById(req.params[this.idName], function (err, document) {
			if (err) {
				return res.handleError(err);
			}
			if (!document) {
				return res.notFound();
			}
			document.remove(function (err) {
				if (err) {
					return res.handleError(err);
				}
				return res.noContent();
			});
		});
	}
};

CrudController.prototype = _.create(BaseController.prototype, CrudController.prototype);
