/* jshint unused:false */
'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');
var <%= name %>Model = require('./<%= name %>.model');

// Clear all <%= name %>s
function cleanup(done) {
	<%= name %>Model.model.remove().exec().then(function () { done();	});
}

describe('<%= route %>', function () {

	var <%= name %>;

	// reset <%= name %> before each test
	beforeEach(function () {
		<%= name %> = {
			name: 'Dog',
			info: 'Hello, this is dog.',
			active: true
		};
	});

	// Clear <%= name %>s before each test
	beforeEach(cleanup);

	// Clear <%= name %>s after each test
	afterEach(cleanup);

	describe('GET', function () {

		it('should respond with JSON array', function (done) {
			request(app)
				.get('<%= route %>')
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

		it('should respond with an error for a malformed <%= name %> id parameter', function (done) {
			request(app)
				.get('<%= route %>/malformedid')
				.set('Accept', 'application/json')
				.expect(400)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should respond with an not found error for a not existing <%= name %> id', function (done) {
			request(app)
				.get('<%= route %>/cccccccccccccccccccccccc')
				.set('Accept', 'application/json')
				.expect(404)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should return a <%= name %> for its id', function (done) {
			<%= name %>Model.model(<%= name %>).save(function (err, doc) {
				request(app)
					.get('<%= route %>/' + doc._id)
					.set('Accept', 'application/json')
					.expect(200)
					.expect('Content-Type', /json/)
					.end(function (err, res) {
						if (err) {
							return done(err);
						}
						res.body.should.be.an.Object.and.have.properties(<%= name %>);
						res.body._id.should.exist;
						done();
					});
			});
		});

	});

	describe('POST', function () {

		it('should create a new <%= name %> and respond with 201 and the created <%= name %>', function (done) {
			request(app)
				.post('<%= route %>')
				.set('Accept', 'application/json')
				.send(<%= name %>)
				.expect(201)
				.expect('Content-Type', /json/)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					res.body.should.be.an.Object.and.have.properties(<%= name %>);
					res.body._id.should.exist;
					done();
				});
		});

	});

	describe('PUT', function () {

		it('should return an error if attempting a put without an id', function (done) {
			request(app)
				.put('<%= route %>')
				.set('Accept', 'application/json')
				.send(<%= name %>)
				.expect(404)
				.end(done);
		});

		it('should respond with an not found error for a not existing <%= name %> id', function (done) {
			request(app)
				.put('<%= route %>/cccccccccccccccccccccccc')
				.set('Accept', 'application/json')
				.expect(404)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should update a <%= name %> and respond with the updated <%= name %>', function (done) {
			request(app)
				.post('<%= route %>')
				.set('Accept', 'application/json')
				.send(<%= name %>)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					<%= name %>.name = 'Cat';
					// check if id is stripped on update
					<%= name %>._id = 'malformed id string';
					request(app)
						.put('<%= route %>/' + res.body._id)
						.set('Accept', 'application/json')
						.send(<%= name %>)
						.expect(200)
						.expect('Content-Type', /json/)
						.end(function (err, res) {
							if (err) {
								return done(err);
							}
							res.body.should.be.an.Object.and.have.property('name', <%= name %>.name);
							done();
						});
				});
		});

	});

	describe('DELETE', function () {

		it('should return an error if attempting a delete without an id', function (done) {
			request(app)
				.delete('<%= route %>')
				.set('Accept', 'application/json')
				.expect(404)
				.end(done);
		});

		it('should respond with an not found error for a not existing <%= name %> id', function (done) {
			request(app)
				.delete('<%= route %>/cccccccccccccccccccccccc')
				.set('Accept', 'application/json')
				.expect(404)
				.expect('Content-Type', /json/)
				.end(done);
		});

		it('should delete a <%= name %> and respond with 204', function (done) {
			request(app)
				.post('<%= route %>')
				.set('Accept', 'application/json')
				.send(<%= name %>)
				.end(function (err, res) {
					if (err) {
						return done(err);
					}
					request(app)
						.delete('<%= route %>/' + res.body._id)
						.set('Accept', 'application/json')
						.expect(204)
						.end(done);
				});
		});
	});
});
