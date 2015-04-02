'use strict';

describe('Service: Toast', function () {

	// load the service's module
	beforeEach(module('<%= scriptAppName %>.toast'));

	// instantiate service
	var service;

	beforeEach(inject(function (_Toast_) {
		service = _Toast_;
	}));

	it('should be defined', function () {
		Should.exist(service);
	});

	it('should expose a show function', function () {
		Should.exist(service.show);
	});

	it('should expose a hide function', function () {
		Should.exist(service.hide);
	});
});
