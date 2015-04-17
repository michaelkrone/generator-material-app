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
	 * @param {Service} mainMenu The mainMenu service to use
	 * @param {Service} $mdSidenav The mdSidenav service to use
	 * @param {Service} _ The lodash service to use
	 * @returns {Service} {@link mainMenu.controller:MainMenuController MainMenuController}
	 */

	MainMenuController.$inject = ['mainMenu', '$router', '$mdSidenav', '_'<% if (features.auth) { %>, 'Auth'<% } %>];


	function MainMenuController(mainMenu, $router, $mdSidenav, _ <% if (features.auth) { %>, Auth<% } %>) {
		var vm = this;

		// view model bindings
		vm.sidenavId = 'mainMenu';
		vm.items = _.sortBy(mainMenu.getMenu(), 'order');
		vm.navigateTo = navigateTo;
		vm.close = close;
		vm.isActive = isActive;<% if (features.auth) { %>
		vm.canAccess = canAccess;
		vm.logout = logout;<% } %>

		/**
		 * Close the sidenav component
		 */
		function close() {
			return $mdSidenav(vm.sidenavId).close();
		}

		/**
		 * Close the sidenav and navigate to the component
		 * linked by the given item.
		 */
		function navigateTo(item) {
			vm.close().then(function () {
				$router.navigate(item.path);
			});
		}

		/**
		 * Determine if the menu item is active for the current route
		 */
		function isActive(item) {
			return item.link === $router.lastNavigationAttempt;
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
