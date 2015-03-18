/* jshint -W030 */
'use strict';

describe('Controller: UserItemsController', function () {

	// load the controller's module
	beforeEach(module('<%= scriptAppName %>.admin.user.list'));

	var controller;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller) {
		controller = $controller('UserItemsController', {
		});
	}));

	it('object should exist', function () {
		Should.exist(controller);
		controller.should.be.an.instanceof(Object);
	});

	it('should expose a isSelected function', function () {
		Should.exist(controller.isSelected);
		controller.isSelected.should.be.a.Function;
	});

	it('should expose a showInDetails function', function () {
		Should.exist(controller.showInDetails);
		controller.showInDetails.should.be.a.Function;
	});
});
