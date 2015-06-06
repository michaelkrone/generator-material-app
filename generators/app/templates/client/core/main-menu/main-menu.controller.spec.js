/* jshint -W030 */
'use strict';

describe('Controller: MainMenuController', function () {

	// load the controller's module
	beforeEach(module('<%= scriptAppName %>.mainMenu'));

	var controller;
	var menuEntry = {name: 'test', state: 'test.main'};
	var mainMenuMock = {
		getMenu: function () {
			return [menuEntry]
		}
	};
	var $mdSidenavMock = function () {
		return {
			open: function () {},
			close: function () {}
		}
	}

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		controller = $controller('MainMenuController', {
			mainMenu: mainMenuMock,
			$mdSidenav: $mdSidenavMock
		});
	}));

	it('object should exist', function () {
		Should.exist(controller);
		controller.should.be.an.Object;
	});

	it('should have an items property', function () {
		Should.exist(controller.items);
		controller.items.should.be.an.Array;
		controller.items.should.eql([menuEntry]);
	});

});
