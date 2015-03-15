'use strict';
/* jshint unused:false */

var mongoose = require('mongoose');
var should = require('should');
var app = require('./app');
var request = require('supertest');

describe('App', function () {

	it('should expose a function to start the server', function (done) {
		app.startServer.should.be.a.Function;
		(app.startServer()).should.be.an.Object;
		request(app)
			.get('/')
			.expect(200)
			.expect('Content-Type', /html/)
			.end(done);
	});

	it('should initiate a mongodb connection via mongoose', function () {
		var connection = mongoose.connections[0];
		connection.should.be.instanceof(mongoose.Connection);
	});

	it('should return the index file for any not api route', function (done) {
		request(app)
			.get('/this/route/will/never/exist')
			.expect(200)
			.expect('Content-Type', /html/)
			.end(done);
	});

	it('should return with status 404 for an uncovered api route.', function (done) {
		request(app)
			.get('/api/this/route/will/never/exist')
			.expect(404)
			.end(done);
	});

	it('should expose a function to down the server', function () {
		app.serverShutdown.should.be.a.Function;
	});
});
