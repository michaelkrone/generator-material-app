'use strict';

describe('Service: <%= controllerName %>', function () {

	// load the service's module
	beforeEach(module('<%= moduleName %>'));

	// instantiate service
	var service;

	beforeEach(inject(function (_<%= controllerName %>_) {
		service = _<%= controllerName %>_;
	}));

	it('should be defined', function () {
		Should.exist(service);
	});

	it('should expose a working doSomething function', function () {
		Should.exist(service.doSomething);
		service.doSomething().should.equal('<%= name %>');
	});

});
