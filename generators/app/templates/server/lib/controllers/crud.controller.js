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
 * @inherits BaseController
 * @param {Model} model - The mongoose model to operate on
 * @param {String} [idName] - The name of the id request parameter to use
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
	 * @default 'id'
	 */
	idName: 'id',


	/**
	 * Flag indicating whether the index query should be performed lean
	 * @type {Boolean}
	 * @default true
	 */
	lean: true,

	/**
	 * Array of fields passed to the select statement of the index query.
	 * The array is joined with a whitespace before passed to the select
	 * method of the controller model.
	 * @type {Array}
	 * @default The empty Array
	 */
	select: [],

	/**
	 * Array of fields that should be omitted from the query.
	 * The property names are stripped from the query object.
	 * @type {Array}
	 * @default The empty Array
	 */
	omit: [],

	/**
	 * Name of the property (maybe a virtual) that should be returned
	 * (send as response) by the methods.
	 * @type {String}
	 * @default The empty String
	 */
	defaultReturn: '',

	/**
	 * Get a list of documents. If a request query is passed it is used as the
	 * query object for the find method.
	 * @param {IncomingMessage} req - The request message object
	 * @param {ServerResponse} res - The outgoing response object the result is set to
	 * @returns {ServerResponse} Array of all documents for the {@link CrudController#model} model
	 * or the empty Array if no documents have been found
	 */
	index: function (req, res) {
		var query = req.query;

		if (this.omit.lenght) {
			query = _.omit(query, this.omit);
		}

		query = this.model.find(query);

		if (this.lean) {
			query.lean();
		}

		if (this.select.length) {
			query.select(this.select.join(' '));
		}

		query.exec(function (err, documents) {
			if (err) {
				return res.handleError(err);
			}
			return res.ok(documents);
		});
	},

	/**
	 * Get a single document. The requested document id is read from the request parameters
	 * by using the {@link CrudController#idName} property.
	 * @param {IncomingMessage} req - The request message object the id is read from
	 * @param {ServerResponse} res - The outgoing response object
	 * @returns {ServerResponse} A single document or NOT FOUND if no document has been found
	 */
	show: function (req, res) {
		var self = this;

		this.model.findOne({'_id': req.params[this.idName]}, function (err, document) {
			if (err) {
				return res.handleError(err);
			}

			if (!document) {
				return res.notFound();
			}

			return res.ok(self.getResponseObject(document));
		});
	},

	/**
	 * Creates a new document in the DB.
	 * @param {IncomingMessage} req - The request message object containing the json document data
	 * @param {ServerResponse} res - The outgoing response object
	 * @returns {ServerResponse} The response status 201 CREATED or an error response
	 */
	create: function (req, res) {
		var self = this;

		this.model.create(req.body, function (err, document) {
			if (err) {
				return res.handleError(err);
			}

			return res.created(self.getResponseObject(document));
		});
	},

	/**
	 * Updates an existing document in the DB. The requested document id is read from the
	 * request parameters by using the {@link CrudController#idName} property.
	 * @param {IncomingMessage} req - The request message object the id is read from
	 * @param {ServerResponse} res - The outgoing response object
	 * @returns {ServerResponse} The updated document or NOT FOUND if no document has been found
	 */
	update: function (req, res) {
		if (req.body._id) {
			delete req.body._id;
		}

		var self = this;
		var bodyData = _.omit(req.body, this.omit);

		this.model.findOne({'_id': req.params[this.idName]}, function (err, document) {
			if (err) {
				return res.handleError(err);
			}

			if (!document) {
				return res.notFound();
			}

			var updated = _.merge(document, bodyData);
			updated.save(function (err) {
				if (err) {
					return res.handleError(err);
				}

				return res.ok(self.getResponseObject(document));
			});
		});
	},

	/**
	 * Deletes a document from the DB. The requested document id is read from the
	 * request parameters by using the {@link CrudController#idName} property.
	 * @param {IncomingMessage} req - The request message object the id is read from
	 * @param {ServerResponse} res - The outgoing response object
	 * @returns {ServerResponse} A NO CONTENT response or NOT FOUND if no document has
	 * been found for the given id
	 */
	destroy: function (req, res) {
		this.model.findOne({'_id': req.params[this.idName]}, function (err, document) {
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
	},

	getResponseObject: function (obj) {
		return this.defaultReturn && obj[this.defaultReturn] || obj;
	}
};

CrudController.prototype = _.create(BaseController.prototype, CrudController.prototype);
