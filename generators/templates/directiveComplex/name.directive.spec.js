'use strict';

describe('Directive: <%= controllerName %>', function () {

	// load the directive's module and view
	beforeEach(module('<%= moduleName %>'));
	beforeEach(module('<%= htmlUrl %>'));

	var element, scope;

	beforeEach(inject(function ($rootScope, $compile) {
		scope = $rootScope.$new();
		element = angular.element('<<%= _.dasherize(name) %>></<%= _.dasherize(name) %>>');
		element = $compile(element)(scope);
		scope.$apply();
	}));

	it('should set the element text', function () {
		element.text().should.equal('this is the <%= _.camelize(name) %> directive');
	});
});
