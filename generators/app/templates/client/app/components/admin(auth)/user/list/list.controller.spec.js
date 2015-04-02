'use strict';

describe('Controller: UserListController', function () {

	// load the controller's module
	beforeEach(module('<%= scriptAppName %>.admin.user.list'));
	beforeEach(module('socketMock'));

	var controller;
	var users;
	var scope;
	var socket;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope, _socket_) {
		scope = $rootScope.$new();
		users = [{name: 'admin'}, {name: 'testuser'}];
		socket = _socket_;
		controller = $controller('UserListController', {
			users: users,
			$scope: scope,
			socket: socket
		});
	}));

	it('object should exist', function () {
		Should.exist(controller);
		controller.should.be.an.instanceof(Object);
	});

	it('users should exist', function () {
		Should.exist(controller.users);
		controller.users.should.be.eql(users);
	});
});
