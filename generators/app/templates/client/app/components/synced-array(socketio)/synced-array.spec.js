'use strict';

describe('<%= componentModule %>.apiservice Service: ApiService', function () {

	// load the service's module
	beforeEach(module('<%= componentModule %>.apiservice'));

	// instantiate service
	var service;

	beforeEach(inject(function (_ApiService_) {
		service = _ApiService_;
	}));

	it('should be defined', function () {
		Should.exist(service);
	});
});
