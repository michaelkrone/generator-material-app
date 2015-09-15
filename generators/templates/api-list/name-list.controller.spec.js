'use strict';

describe('Controller: <%= controllerName %>', function () {

	// load the controller's module
	beforeEach(module('<%= moduleName %>'));

	var controller;
	var scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		controller = $controller('<%= controllerName %>', {
			// $scope: scope,
			<%= lowerCameledName %>: []
		});
	}));

	it('object should exist', function () {
		Should.exist(controller);
		controller.should.be.an.Object;
	});

	it('object should have a title property', function () {
		Should.exist(controller.title);
		controller.title.should.be.a.String;
	});

	it('object should have a <%= lowerCameledName %> property', function () {
		Should.exist(controller.<%= lowerCameledName %>);
		controller.<%= lowerCameledName %>.should.be.an.array;
	});

});
