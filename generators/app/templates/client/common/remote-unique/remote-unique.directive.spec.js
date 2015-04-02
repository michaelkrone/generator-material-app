/*jshint -W030 */
'use strict';

describe('Directive: RemoteUnique', function () {

	var element;
	var form;
	var scope;

	var model;
	var serviceSpy;
	var serviceResult;
	var template = [
		'<form name="form">',
		'<input ng-model="model.value" name="valueField" remote-unique="Service"></input>',
		'</form>'
	].join('');

	var serviceMock = {
		query: function(criteria, cb) {
			cb(serviceResult);
		}
	};

	// load the directive's module
	beforeEach(module('<%= scriptAppName %>.remoteUnique'));

	beforeEach(module(function ($provide) {
		$provide.value('Service', serviceMock);
	}));

	beforeEach(inject(function ($rootScope, $compile) {
		serviceSpy = sinon.stub(serviceMock, 'query').returns([1]);

		scope = $rootScope.$new();
		scope.model = {value: ''};

		element = angular.element(template);
		element = $compile(element)(scope);
		scope.$digest();

		form = scope.form;
	}));

	afterEach(function () {
		serviceMock.query.restore();
	});

	it('call the service defined in the attributes with an query object set', function () {
		form.valueField.$setViewValue('testval');
		serviceSpy.calledOnce.should.be.ok;
		serviceSpy.withArgs({valueField: 'testval'}).called.should.be.ok;
	});

});
