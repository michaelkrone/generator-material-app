'use strict';

var should = require('should');
var User = require('./user.model').model;

var user;

describe('User Model', function () {
	before(function (done) {
		// Clear users before testing
		User.remove().exec().then(function () {
			done();
		});
	});

	beforeEach(function (done) {
		user = new User({
			provider: 'local',
			name: 'username',
			active: true,
			role: 'user',
			password: 'sosecret!'
		});
		done();
	});

	afterEach(function (done) {
		User.remove().exec().then(function () {
			done();
		});
	});

	it('should begin with no users', function (done) {
		User.find({}, function (err, users) {
			users.should.have.length(0);
			done();
		});
	});

	it('should fail when saving a duplicate user', function (done) {
		user.save(function () {
			var userDup = new User(user);
			userDup.save(function (err) {
				should.exist(err);
				done();
			});
		});
	});

	it('should fail when saving without a name', function (done) {
		user.name = '';
		user.save(function (err) {
			should.exist(err);
			done();
		});
	});

	it('should fail when saving with a blank role', function (done) {
		user.role = '';
		user.save(function (err) {
			should.exist(err);
			done();
		});
	});

	it('should succeed when saving with a role', function (done) {
		user.role = 'admin';
		user.save(function (err, data) {
			should.exist(data);
			done();
		});
	});

	it('should succeed when saving without a role', function (done) {
		delete user.role;
		user.save(function (err, data) {
			should.exist(data);
			done();
		});
	});

	it('should authenticate user if password is valid', function () {
		user.authenticate('sosecret!').should.be.true;
	});

	it('should not authenticate user if password is invalid', function () {
		user.authenticate('blah').should.not.be.true;
	});

	it('should have a virtual password property', function () {
		user.password.should.exist;
	});

	it('should have a virtual token property', function () {
		user.token.should.exist;
	});

	it('should have a virtual profile property', function () {
		user.profile.should.exist;
	});

});
