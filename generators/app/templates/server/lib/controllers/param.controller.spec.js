/* jshint unused:false */
'use strict';

var app = require('express')();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
var middleware = require('../../lib/middleware');

app.use(middleware.extendResponse);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());

/*
 define dummy model
 */
var mongoose = require('mongoose');

var dummyDefinition = { 'textField': String };
var dummySchema = new mongoose.Schema(dummyDefinition);
delete mongoose.connection.models.dummyModel;
var dummyModel = mongoose.model('dummyModel', dummySchema);
var router = require('express').Router();

/*
 define dummy controller
 */
var ParamController = require('./param.controller.js');

function DummyController(model, idName, paramName) {
	ParamController.call(this, model, idName, paramName, router);
}

DummyController.prototype = {
	constructor: DummyController
};

DummyController.prototype = _.create(ParamController.prototype, DummyController.prototype);


/*
 define dummy route
 */
var apiRoute = '/api/test/param';

var controller = new DummyController(dummyModel, 'id', 'dummyObject');

// C
router.post('/', controller.create);
// R
router.get('/', controller.index);
router.get('/:id', controller.show);
// U
router.put('/:id', controller.update);
// D
router.delete('/:id', controller.destroy);

app.use(apiRoute, router);


/*
 run tests
 */
var request = require('supertest');
var should = require('should');

var notExistingId = 'cccccccccccccccccccccccc';

// Clear all dummyEntries
function cleanup(done) {
	dummyModel.remove().exec().then(function () {
		done();
	});
}

describe('param controller', function () {

	var dummyEntry;

	// reset dummyEntry before each test
	beforeEach(function () {
		dummyEntry = {
			textField: 'Dog'
		};
	});

	// Clear dummyEntries before each test
	beforeEach(cleanup);

	// Clear dummyEntries after each test
	afterEach(cleanup);

	describe('GET', function () {

		it('should respond with JSON array', function (done) {
			request(app)
				.get(apiRoute)
				.set('Accept', 'application/json')
				.expect(200)
				.expect('Content-Type', /json/)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					res.body.should.be.instanceof(Array);
					done();
				});
		});

		it('should respond with a not found error for a not existing document id', function (done) {
			request(app)
				.get(apiRoute + '/' + notExistingId)
				.set('Accept', 'application/json')
				.expect(404)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should return a document for its id', function (done) {
			dummyModel.create(dummyEntry, function (err, doc) {
				request(app)
					.get(apiRoute + '/' + doc._id)
					.set('Accept', 'application/json')
					.expect(200)
					.expect('Content-Type', /json/)
					.end(function (err, res) {
						if (err) {
							return done(err);
						}
						res.body.should.be.an.Object.and.have.properties(dummyEntry);
						res.body._id.should.exist;
						done();
					});
			});
		});

	});

	describe('POST', function () {

		it('should create a new document and respond with 201 and the created document', function (done) {
			request(app)
				.post(apiRoute)
				.set('Accept', 'application/json')
				.send(dummyEntry)
				.expect(201)
				.expect('Content-Type', /json/)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					res.body.should.be.an.Object.and.have.properties(dummyEntry);
					res.body._id.should.exist;
					done();
				});
		});

	});

	describe('PUT', function () {

		it('should return an error if attempting a put without an id', function (done) {
			request(app)
				.put(apiRoute)
				.set('Accept', 'application/json')
				.send(dummyEntry)
				.expect(404)
				.end(done);
		});

		it('should respond with an not found error for a not existing document id', function (done) {
			request(app)
				.put(apiRoute + '/' + notExistingId)
				.set('Accept', 'application/json')
				.expect(404)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should update a document and respond with the updated document', function (done) {
			request(app)
				.post(apiRoute)
				.set('Accept', 'application/json')
				.send(dummyEntry)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					dummyEntry.textField = 'Cat';
					// check if id is stripped on update
					dummyEntry._id = 'malformed id string';
					request(app)
						.put(apiRoute + '/' + res.body._id)
						.set('Accept', 'application/json')
						.send(dummyEntry)
						.expect(200)
						.expect('Content-Type', /json/)
						.end(function (err, res) {
							if (err) {
								return done(err);
							}
							res.body.should.be.an.Object.and.have.property('textField', dummyEntry.textField);
							done();
						});
				});
		});

	});

	describe('DELETE', function () {

		it('should return an error if attempting a delete without an id', function (done) {
			request(app)
				.delete(apiRoute)
				.set('Accept', 'application/json')
				.expect(404)
				.end(done);
		});

		it('should respond with an not found error for a not existing document id', function (done) {
			request(app)
				.delete(apiRoute + '/' + notExistingId)
				.set('Accept', 'application/json')
				.expect(404)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should delete a document and respond with 204', function (done) {
			request(app)
				.post(apiRoute)
				.set('Accept', 'application/json')
				.send(dummyEntry)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					request(app)
						.delete(apiRoute + '/' + res.body._id)
						.set('Accept', 'application/json')
						.expect(204)
						.end(done);
				});
		});

	});
});
