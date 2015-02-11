'use strict';

describe('Factory: <%= cameledName %>', function () {

	// load the provider's module
	beforeEach(module('<%= scriptAppName %>'));

	// instantiate provider
	var provider;

	beforeEach(inject(function (_<%= classedName %>_) {
		provider = _<%= classedName %>_;
	}));

	it('should be defined', function () {
		Should.exist(provider);
	});

	it('should expose a working doSomething function', function () {
		Should.exist(provider.doSomething);
		provider.doSomething().should.equal('<%= name %>');
	});

});
