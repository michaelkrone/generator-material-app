'use strict';

describe('Service: Toast', function () {

	// load the service's module
	beforeEach(module('<%= componentModule %>.toast'));

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

	it('should expose a warn function', function () {
		Should.exist(service.warn);
	});
});
