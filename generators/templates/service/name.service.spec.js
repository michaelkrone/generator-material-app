'use strict';

describe('Service: <%= classedName %>', function () {

	// load the service's module
	beforeEach(module('<%= scriptAppName %>'));

	// instantiate service
	var service;

	beforeEach(inject(function (_<%= classedName %>_) {
		service = _<%= classedName %>_;
	}));

	it('should be defined', function () {
		Should.exist(service);
	});

	it('should expose a working doSomething function', function () {
		Should.exist(service.doSomething);
		service.doSomething().should.equal('<%= name %>');
	});

});
