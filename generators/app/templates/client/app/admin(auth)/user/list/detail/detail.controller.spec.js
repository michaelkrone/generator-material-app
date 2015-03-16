/*jshint -W030 */
'use strict';

describe('Controller: UserDetailController', function () {

	// load the controller's module
	beforeEach(module('<%= scriptAppName %>.admin.user.list'));

	var controller;
	var user;
	var stateSpy;

	// Setup some states to test the navigation functions
	beforeEach(inject(function ($state) {
		stateSpy = sinon.stub($state, 'go');
		user = {_id: '1337id', name: 'admin', role: 'admin'};
	}));

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller) {
		controller = $controller('UserDetailController', {
			user: user
		});
	}));

	it('should exist as an object', function () {
		Should.exist(controller);
		controller.should.be.an.Object;
	});

	it('should have a user property which is the current user', function () {
		Should.exist(controller.user);
		controller.user
			.should.be.an.Object
			.and.eql(user);
	});

	it('should have a property which determines if the current displayed user is the root user', function () {
		Should.exist(controller.isRoot);
		controller.isRoot
			.should.be.an.Boolean
			.and.be.false;
	});

	it('should have a human readable userRole property', function () {
		Should.exist(controller.userRole);
		controller.userRole
			.should.be.a.String
			.and.equal('Administrator');
	});

	it('should have a method to navigate to the parent state', function () {
		Should.exist(controller.goBack);
		controller.goBack.should.be.a.Function;
		controller.goBack();
		stateSpy.calledOnce.should.be.ok;
		stateSpy.withArgs('^').called.should.be.ok;
	});

	it('should have a method to navigate to the edit state which is passing the correct id parameter', function () {
		Should.exist(controller.edit);
		controller.edit.should.be.a.Function;
		controller.edit();
		stateSpy.calledOnce.should.be.ok;
		stateSpy.withArgs('^.edit', {'id': user._id}).called.should.be.ok;
	});
});
