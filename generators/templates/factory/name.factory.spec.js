'use strict';

describe('<%= moduleName %> Factory: <%= controllerName %>', function () {

	// load the resource's module
	beforeEach(module('<%= moduleName %>'));

	// instantiate service
	var resource;

	beforeEach(inject(function (_<%= controllerName %>_) {
		resource = _<%= controllerName %>_;
	}));

	it('should be defined', function () {
		Should.exist(resource);
	});

	it('should be a resource object', function () {
		resource.doSomething().should.equal('<%= name %>');
	});

});
