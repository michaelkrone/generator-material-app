'use strict';

describe('Controller: <%= classedName %>EditController', function () {

	// load the controller's module
	beforeEach(module('<%= scriptAppName %>.<%= _.slugify(name) %>.edit'));

	var controller;
	var scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		controller = $controller('<%= classedName %>EditController', {
			// $scope: scope
		});
	}));

	it('object should exist', function () {
		Should.exist(controller);
		controller.should.be.an.instanceof(Object);
	});
});
