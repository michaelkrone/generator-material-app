/**
 * @ngdoc controller
 * @name <%= scriptAppName %>.controller:AppController
 * @description
 * This is the application wide controller of the <%= scriptAppName %> application
 */

(function () {
	'use strict';

	// register the controller as AppController
	angular
		.module('<%= scriptAppName %>')
		.controller('AppController', AppController);

	/**
	 * @ngdoc function
	 * @name <%= scriptAppName %>.provider:AppController
	 * @description
	 * Provider of the {@link <%= scriptAppName %>.controller:AppController AppController}
	 *
	 * @param {Auth} Auth - The authentication service used for logging out
	 * @param {$location} $mdSidenav - The sidenav service used to communicate with the sidenav components
	 */

	AppController.$inject = ['Auth', '$mdSidenav'];

	function AppController(Auth, $mdSidenav) {
		var vm = this;

		/**
		 * @ngdoc property
		 * @name sidenavId
		 * @propertyOf gastroKey.controller:AppController
		 * @description
		 * the component id of the main sidenav (bound once)
		 * @returns {String} component id
		 */
		vm.sidenavId = 'mainMenu';

		/**
		 * @ngdoc function
		 * @name logout
		 * @methodOf gastroKey.controller:AppController
		 * @description
		 * Logout the current user
		 */
		vm.logout = logout;

		/**
		 * @ngdoc function
		 * @name isLoggedIn
		 * @methodOf gastroKey.controller:AppController
		 * @description
		 * See {@link components/auth.service:Auth#isLoggedIn isLoggedIn} of the Auth service
		 */
		vm.isLoggedIn = Auth.isLoggedIn;

		/**
		 * @ngdoc function
		 * @name closeMainMenu
		 * @methodOf gastroKey.controller:AppController
		 * @description
		 * Close the main menu sidenav component
		 * @returns {Promise} The promise from mdSidenav
		 */
		vm.closeMainMenu = closeMainMenu;

		/**
		 * @ngdoc function
		 * @name openMainMenu
		 * @methodOf gastroKey.controller:AppController
		 * @description
		 * Open the main menu sidenav component
		 * @returns {Promise} The promise from mdSidenav
		 */
		vm.openMainMenu = openMainMenu;

		/**
		 * @ngdoc function
		 * @name currentUser
		 * @methodOf gastroKey.controller:AppController
		 * @description
		 * See {@link components/auth.service:Auth#getCurrentUser getCurrentUser} of the Auth service
		 */
		vm.currentUser = Auth.getCurrentUser();

		/**
		 * Logout the current user
		 */
		function logout() {
			vm.closeMainMenu().then(Auth.logout);
		}

		/**
		 * Close the main menu sidenav component
		 */
		function closeMainMenu() {
			return $mdSidenav(vm.sidenavId).close();
		}

		/**
		 * Open the main menu sidenav component
		 */
		function openMainMenu() {
			return $mdSidenav(vm.sidenavId).open();
		}
	}
})();
