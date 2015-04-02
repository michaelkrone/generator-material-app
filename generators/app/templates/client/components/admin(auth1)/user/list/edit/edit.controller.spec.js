/*jshint -W030 */
'use strict';

describe('Controller: UserEditController', function () {

	// load the controller's module
	beforeEach(module('<%= scriptAppName %>.admin.user.list'));

	var controller;
	var user;

	var stateSpy;
	var dialogSpy;
	var updateServiceSpy;
	var removeServiceSpy;

	// simple mock for the UserService
	var userServiceMock = {update: noop, remove: noop};

	// simple mock to gesture the return of a promise
	var promiseMock = {
		then: function (cb) {
			cb(user);
			return {catch: noop};
		}
	};

	function noop() {}

	// Setup some states to test the navigation functions
	beforeEach(inject(function ($state, $mdDialog) {
		user = {_id: '1337id', name: 'admin', role: 'admin'};
		stateSpy = sinon.stub($state, 'go');
		dialogSpy = sinon.stub($mdDialog, 'show').returns(promiseMock);
		updateServiceSpy = sinon.stub(userServiceMock, 'update').returns(promiseMock);
		removeServiceSpy = sinon.stub(userServiceMock, 'remove').returns(promiseMock);
	}));

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller) {
		controller = $controller('UserEditController', {
			user: user,
			UserService: userServiceMock
		});
	}));

	afterEach(function () {
		userServiceMock.update.restore();
		userServiceMock.remove.restore();
	});

	it('object should exist', function () {
		Should.exist(controller);
		controller.should.be.an.instanceof(Object);
	});

	it('should have a user property which is the current user', function () {
		Should.exist(controller.user);
		controller.user
			.should.be.an.Object
			.and.eql(user);
	});

	it('should have an array of user roles', function () {
		Should.exist(controller.userRoles);
		controller.userRoles.should.be.an.Array;
	});

	it('should have a display property which equals the users name', function () {
		Should.exist(controller.displayName);
		controller.displayName
			.should.be.a.String
			.and.eql(user.name);
	});

	it('should have a method to navigate to the parent state', function () {
		Should.exist(controller.showList);
		controller.showList.should.be.a.Function;
		controller.showList();
		stateSpy.calledOnce.should.be.ok;
		stateSpy.withArgs('^').called.should.be.ok;
	});

	it('should have a method to navigate to the detail state', function () {
		Should.exist(controller.showList);
		controller.goBack.should.be.a.Function;
		controller.goBack();
		stateSpy.calledOnce.should.be.ok;
		stateSpy.withArgs('^.detail').called.should.be.ok;
	});

	it('should have a method to show the password dialog', function () {
		Should.exist(controller.showChangePasswordDialog);
		controller.showChangePasswordDialog.should.be.a.Function;
		controller.showChangePasswordDialog();
		dialogSpy.calledOnce.should.be.ok;
	});

	it('should have a method to update the user', function () {
		Should.exist(controller.update);
		controller.update.should.be.a.Function;
	});

	it('should call the user service to update', function () {
		controller.update();
		updateServiceSpy.calledOnce.should.be.ok;
		updateServiceSpy.withArgs(user).called.should.be.ok;
	});

	it('should have a method to remove the user', function () {
		Should.exist(controller.remove);
		controller.remove.should.be.a.Function;
	});

	it('should show a confirm dialog when deleting the user', function () {
		controller.remove();
		dialogSpy.calledOnce.should.be.ok;
		removeServiceSpy.calledOnce.should.be.ok;
		removeServiceSpy.withArgs(user).called.should.be.ok;
	});

});
