/**
 * @ngdoc controller
 * @name mainMenu.controller:MainMenuButtonController
 * @description
 * The controller for the main menu
 *
 */

(function () {
	'use strict';

	// register the controller as MainMenuButtonController
	angular
		.module('<%= scriptAppName %>.mainMenu')
		.controller('MainMenuButtonController', MainMenuButtonController);

	/**
	 * @ngdoc function
	 * @name mainMenu.provider:MainMenuButtonController
	 * @description
	 * Provider of the {@link mainMenu.controller:MainMenuButtonController MainMenuButtonController}
	 * @param {Service} mainMenu The mainMenu service to use
	 * @returns {Service} {@link mainMenu.controller:MainMenuButtonController MainMenuButtonController}
	 */

	MainMenuButtonController.$inject = ['mainMenu'];

	function MainMenuButtonController(mainMenu) {
		var vm = this;

		vm.open = mainMenu.open;
		vm.close = mainMenu.close;
	}

})();
