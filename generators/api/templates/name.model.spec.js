/* jshint unused:false */
'use strict';

var should = require('should');

var <%= name %> = require('./<%= name %>.model');
var <%= name %>Definition = <%= name %>.definition;
var <%= name %>Schema= <%= name %>.schema;
var <%= modelName %> = <%= name %>.model;

var <%= name %>Data = [
	{
		name: 'Dog',
		info: 'Hello, this is dog.',
		active: true
	}, {
		name: 'Bugs Bunny',
		info: 'Famous Bunny.',
		active: true
	}, {
		name: 'Nyan Cat',
		info: 'No comment.',
		active: false
	}
];

// Clear all <%= name %>s
function cleanup(done) {
	<%= modelName %>.remove().exec().then(function () { done();	});
}

describe('<%= modelName %> Model', function () {

	// Clear <%= name %>s before testing
	before(cleanup);

	// Clear <%= name %>s after testing
	after(cleanup);

// Check test conditions for <%= name %> tests
	it('should start with no <%= name %>s', function (done) {
		<%= modelName %>.find({}, function (err, <%= name %>s) {
			<%= name %>s.should.have.length(0);
			done(err);
		});
	});

	describe('basic crud operations', function () {

		var <%= name %>Model = new <%= modelName %>(<%= name %>Data[0]);

		// Clear <%= name %>s after running this suite
		after(cleanup);

		it('should insert a new <%= name %>', function (done) {
			<%= name %>Model.save(function (err, <%= name %>) {
				<%= name %>.should.have.properties(<%= name %>Model);
				done(err);
			});
		});

		it('should insert a list of <%= name %>s', function (done) {
			<%= modelName %>.create(<%= name %>Data, function (err, <%= name %>) {
				// slice err argument
				Array.prototype.slice.call(arguments, 1)
					.should.have.lengthOf(<%= name %>Data.length);
				done(err);
			});
		});


		it('should find a <%= name %> by _id property', function (done) {
			<%= modelName %>.findById(<%= name %>Model._id, function (err, <%= name %>) {
				<%= name %>.should.have.properties(<%= name %>Data[0]);
				done(err);
			});
		});

		it('should update a <%= name %>', function (done) {
			<%= name %>Model.name = 'foo';
			<%= name %>Model.save(function (err) { done(err);	});
		});

		it('should remove a <%= name %>', function (done) {
			<%= name %>Model.remove(function (err) { done(err); });
		});
	}); // crud
});
