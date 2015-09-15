'use strict';

describe('<%= moduleName %> Controller: FeaturesController', function () {

	// load the controller's module
	beforeEach(module('<%= moduleName %>'));

	var controller;
	var scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		controller = $controller('FeaturesController', {
			$scope: scope
		});
	}));

	it('should exist', function () {
		controller.should.be.instanceof(Object);
	});

	it('should have an awesome title property', function () {
		Should.exist(controller.title);
		controller.title.should.equal('<%= name %>');
	});

	it('should have a polite greeting', function () {
		Should.exist(controller.greeting);
		controller.greeting.should.be.a.String;
	});

	it('should have a list of features', function () {
		Should.exist(controller.features);
		controller.features.should.be.an.Array;
	});
});
