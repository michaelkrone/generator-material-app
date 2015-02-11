'use strict';

describe('Factory: <%= classedName %>', function () {

	// load the resource's module
	beforeEach(module('<%= scriptAppName %>'));

	// instantiate service
	var resource;

	beforeEach(inject(function (_<%= classedName %>_) {
		resource = _<%= classedName %>_;
	}));

	it('should be defined', function () {
		Should.exist(resource);
	});

	it('should be a resource object', function () {
		resource.doSomething().should.equal('<%= name %>');
	});

});
