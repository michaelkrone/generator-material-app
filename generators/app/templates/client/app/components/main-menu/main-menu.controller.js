/**
 * @ngdoc controller
 * @name <%= componentModule %>.mainMenu.controller:MainMenuController
 * @description
 * The controller for the main menu
 *
 */

(function () {
	'use strict';

	// register the controller as MainMenuController
	angular
		.module('<%= componentModule %>.mainMenu')
		.controller('MainMenuController', MainMenuController);

	/**
	 * @ngdoc function
	 * @name <%= componentModule %>.mainMenu.provider:MainMenuController
	 * @description
	 * Provider of the {@link mainMenu.controller:MainMenuController MainMenuController}
	 * @param {Service} $router The router service to use
	 * @param {Service} $mdSidenav The mdSidenav service to use
	 * @param {Service} mainMenu The mainMenu service to use<% if (features.auth) { %>
	 * @param {Service} Auth The auth service to use<% } %>
	 * @returns {Service} {@link mainMenu.controller:MainMenuController MainMenuController}
	 */

	MainMenuController.$inject = ['$state', 'mainMenu'<% if (features.auth) { %>, 'Auth'<% } %>];

	function MainMenuController($state, mainMenu<% if (features.auth) { %>, Auth<% } %>) {
		var vm = this;

		// view model bindings
		vm.items = mainMenu.getMenu();
		vm.open = mainMenu.open;
		vm.close = mainMenu.close;
		vm.toggle = mainMenu.toggle;
		vm.navigateTo = navigateTo;
		vm.isActive = isActive;<% if (features.auth) { %>
		vm.isLoggedIn = Auth.isLoggedIn;
		vm.canAccess = canAccess;
		vm.logout = logout;<% } %>

		/**
		 * Close the sidenav and navigate to the component
		 * linked by the given item.
		 */
		function navigateTo(item) {
			vm.close().then(function () { $state.go(item.state); });
		}

		/**
		 * Check if the passed item is active
 		 * @param {Object} item
		 * @returns {Boolean} True if the current states includes the menut item state
		 */
		function isActive(item) {
			return $state.includes(item.state);
		}<% if (features.auth) { %>

		/**
		 * Check if the current user can access the menu item
		 * @param {Object} menuItem
		 */
		function canAccess(menuItem) {
			if (menuItem.role) {
				return Auth.hasRole(menuItem.role);
			}

			if (menuItem.authenticated) {
				return Auth.isLoggedIn();
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
