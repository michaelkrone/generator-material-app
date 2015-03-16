/**
 * @ngdoc controller
 * @name mainMenu.controller:MainMenuController
 * @description
 * The controller for the main menu
 *
 */

(function () {
	'use strict';

	// register the controller as MainMenuController
	angular
		.module('<%= scriptAppName %>.mainMenu')
		.controller('MainMenuController', MainMenuController);


	/**
	 * @ngdoc function
	 * @name mainMenu.provider:MainMenuController
	 * @description
	 * Provider of the {@link mainMenu.controller:MainMenuController MainMenuController}
	 * @param {Service} $rootScope The rootScope service to use
	 * @param {Service} mainMenu The mainMenu service to use
	 * @param {Service} $mdSidenav The mdSidenav service to use
	 * @param {Service} _ The lodash service to use
	 * @returns {Service} {@link mainMenu.controller:MainMenuController MainMenuController}
	 */

	MainMenuController.$inject = ['mainMenu', '$mdSidenav', 'Auth', '_'];


	function MainMenuController(mainMenu, $mdSidenav, Auth, _) {
		var vm = this;

		// view model bindings
		vm.sidenavId = 'mainMenu';
		vm.items = _.sortBy(mainMenu.getMenu(), 'order');
		vm.close = close;
		vm.logout = logout;

		function close() {
			return $mdSidenav(vm.sidenavId).close();
		}
		/**
		 * Logout the current user
		 */
		function logout() {
			vm.close().then(Auth.logout);
		}
	}

})();
