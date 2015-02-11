'use strict';

describe('Directive: <%= classedName %>', function () {

	// load the directive's module
	beforeEach(module('<%= scriptAppName %>'));

	var element, scope;

	beforeEach(inject(function ($rootScope, $compile) {
		scope = $rootScope.$new();
		element = angular.element('<<%= _.dasherize(name) %>></<%= _.dasherize(name) %>>');
		element = $compile(element)(scope);
	}));

	it('should set the element text', function () {
		element.text().should.equal('this is the <%= classedName %> directive');
	});
});
