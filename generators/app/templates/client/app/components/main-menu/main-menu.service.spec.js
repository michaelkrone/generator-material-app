/* jshint -W030 */
'use strict';

describe('Provider: mainMenuProvider', function () {

	// instantiate provider
	var provider;

	// dummy menu data for tests
	var menuEntry = {name: 'test', state: 'test.main'};
	var menuData;


	// load the provider's module and configure it with help of a dummy module
	beforeEach(function () {
		menuData = [menuEntry];
		module('<%= componentModule %>.mainMenu');
	});

	it('should be defined', inject(function (mainMenuProvider) {
			Should.exist(mainMenuProvider);
		})
	);

	it('should have a getMenu function which returns an Object', inject(function (mainMenu) {
		(mainMenu.getMenu()).should.be.an.Array;
	}));

	describe('setMenu method', function () {

		beforeEach(function () {
			provider.setMenu(menuData);
		});

		it('should set the correct menu Object', inject(function (mainMenu) {
			(mainMenu.getMenu()).should.be.an.Array.and.equal(menuData);
		}));
	});

	describe('addMenuItem method', function () {

		beforeEach(function () {
			provider.setMenu(menuData);
			provider.addMenuItem(menuEntry);
		});

		it('should set the correct menu Object', inject(function (mainMenu) {
			(mainMenu.getMenu()).should.be.an.Array.and.eql([menuEntry, menuEntry]);
		}));
	});
});
