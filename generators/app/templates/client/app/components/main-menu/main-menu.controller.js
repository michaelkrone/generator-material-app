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

	MainMenuController.$inject = ['mainMenu', '$mdSidenav', '_'<% if (features.auth) { %>, 'Auth'<% } %>];


	function MainMenuController(mainMenu, $mdSidenav, _ <% if (features.auth) { %>, Auth<% } %>) {
		var vm = this;

		// view model bindings
		vm.sidenavId = 'mainMenu';
		vm.items = _.sortBy(mainMenu.getMenu(), 'order');
		vm.close = close;<% if (features.auth) { %>
		vm.canAccess = canAccess;
		vm.logout = logout;<% } %>

		function close() {
			return $mdSidenav(vm.sidenavId).close();
		}<% if (features.auth) { %>

		/**
		 * Check if the current user can access the menu item
		 * @param {Object} menuItem
		 */
		function canAccess(menuItem) {
			if (menuItem.role) {
				return Auth.hasRole(menuItem.role);
			}

			return true;
		}

		/**
		 * Logout the current user
		 */
		function logout() {
			vm.close().then(Auth.logout);
		}<% } %>
	}

})();
