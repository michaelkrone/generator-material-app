'use strict';

describe('Controller: MainController', function () {

	// load the controller's module
	beforeEach(module('<%= scriptAppName %>'));<% if(features.socketio) {%>
	beforeEach(module('socketMock'));<% } %>

	var MainController,
		scope,
		$httpBackend;

	// Initialize the controller and a mock scope
	beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
		$httpBackend = _$httpBackend_;
		$httpBackend.expectGET('/api/things')
			.respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

		scope = $rootScope.$new();
		MainController = $controller('MainController', {
			$scope: scope
		});
	}));

	it('should attach a list of things to the scope', function () {
		$httpBackend.flush();
		scope.awesomeThings.should.be.instanceof(Array).and.have.lengthOf(4);
	});
});
