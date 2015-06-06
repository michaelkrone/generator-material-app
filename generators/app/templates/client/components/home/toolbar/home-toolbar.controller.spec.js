'use strict';

describe('Controller: HomeToolbarController', function () {

	// load the controller's module
	beforeEach(module('<%= scriptAppName %>.home'));

	var HomeToolbarController, scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		HomeToolbarController = $controller('HomeToolbarController', {
			$scope: scope
		});
	}));

	it('should exist', function () {
		HomeToolbarController.should.be.instanceof(Object);
	});<% if(features.auth) { %>

	it('should have an canActivate function', function () {
		HomeToolbarController.canActivate.should.be.a.Function;
	});<% }%>
});
