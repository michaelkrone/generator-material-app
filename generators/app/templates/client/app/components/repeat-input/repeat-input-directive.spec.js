/* jshint -W030 */
'use strict';

describe('Directive: RepeatInput', function () {

	// load the directive's module
	beforeEach(module('<%= scriptAppName %>.repeatInput'));

	var element, scope, form;

	var template = ['<form name="form">',
		'<input type="password" ng-model="model.password" name="password">',
		'<input type="password" ng-model="model.verify" repeat-input="model.password" name="verify">',
		'</form>'].join('');

	beforeEach(inject(function ($rootScope, $compile) {
		scope = $rootScope.$new();
		element = angular.element(template);
		element = $compile(element)(scope);
		form = scope.form;
	}));

	it('should set the validation invalid the for a wrong repeat value', function () {
		form.password.$setViewValue('Passw0rd');
		form.verify.$setViewValue('PasswOrd');
		form.verify.$invalid.should.be.true;
		form.$invalid.should.be.true;
	});

	it('should set the validation valid the for a correct repeat value', function () {
		form.password.$setViewValue('Passw0rd');
		form.verify.$setViewValue('Passw0rd');
		form.password.$invalid.should.be.false;
		form.verify.$invalid.should.be.false;
		form.$valid.should.be.true;
	});
});
