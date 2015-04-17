'use strict';

describe('Controller: HomeController', function () {

	// load the controller's module
	beforeEach(module('<%= scriptAppName %>.home'));

	var HomeController, scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		HomeController = $controller('HomeController', {
			$scope: scope
		});
	}));

	it('should exist', function () {
		HomeController.should.be.instanceof(Object);
	});

	it('should greet', function () {
		HomeController.greeting
			.should.be.instanceof(String)
			.and.should.match(/HomeController/);
	});

	it('should have features', function () {
		HomeController.features
			.should.be.instanceof(Array)
			.and.should.have.length(<% if(features.socketio) {%>8<% } else {%>7<% }%>);
	});
});
