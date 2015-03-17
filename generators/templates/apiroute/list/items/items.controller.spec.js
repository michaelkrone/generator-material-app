'use strict';

describe('Controller: <%= classedName %>ItemsController', function () {

	// load the controller's module
	beforeEach(module('<%= scriptAppName %>.<%= _.slugify(name) %>.items'));

	var controller;
	var scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		controller = $controller('<%= classedName %>ItemsController', {
			// $scope: scope
		});
	}));

	it('object should exist', function () {
		Should.exist(controller);
		controller.should.be.an.instanceof(Object);
	});

});
