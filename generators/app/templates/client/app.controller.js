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
	 *<% if(features.auth) { %>
	 * @param {Auth} Auth - The authentication service used for logging out<% } %>
	 * @param {$location} $mdSidenav - The sidenav service used to communicate with the sidenav components
	 */

	AppController.$routeConfig =[
		{ path: '/', redirectTo: '/home' },
		{
			path: '/home',
			components: { content: 'home', toolbar: 'home.toolbar' },
			menu: { name: 'Home', order: 1, icon: 'action:ic_home_24px' }
		}
		// add more routes here
	];

	AppController.$inject = [<% if(features.auth) { %>'Auth', <% } %>'$router', '$mdSidenav', 'mainMenu'];

	function AppController(<% if(features.auth) { %>Auth,  <% } %>$router, $mdSidenav, mainMenu) {
		var vm = this;

		// the id component id of the main menu
		var sidenavId = 'mainMenu';

		// register this controller to add menu items to the main menu based on the $routeConfig property
		mainMenu.addController(this);<% if(features.auth) { %>

		/**
		 * @ngdoc function
		 * @name logout
		 * @methodOf <%= scriptAppName %>.controller:AppController
		 * @description
		 * Logout the current user
		 */
		vm.logout = Auth.logout;

		/**
		 * @ngdoc function
		 * @name isLoggedIn
		 * @methodOf <%= scriptAppName %>.controller:AppController
		 * @description
		 * See {@link components/auth.service:Auth#isLoggedIn isLoggedIn} of the Auth service
		 */
		vm.isLoggedIn = Auth.isLoggedIn;

		/**
		 * @ngdoc function
		 * @name currentUser
		 * @methodOf <%= scriptAppName %>.controller:AppController
		 * @description
		 * See {@link components/auth.service:Auth#getCurrentUser getCurrentUser} of the Auth service
		 */
		vm.currentUser = Auth.getCurrentUser();<% } %>

		/**
		 * @ngdoc function
		 * @name closeMainMenu
		 * @methodOf <%= scriptAppName %>.controller:AppController
		 * @description
		 * Close the main menu sidenav component
		 * @returns {Promise} The promise from mdSidenav
		 */
		vm.closeMainMenu = closeMainMenu;

		/**
		 * @ngdoc function
		 * @name openMainMenu
		 * @methodOf <%= scriptAppName %>.controller:AppController
		 * @description
		 * Open the main menu sidenav component
		 * @returns {Promise} The promise from mdSidenav
		 */
		vm.openMainMenu = openMainMenu;

		/**
		 * Close the main menu sidenav component
		 */
		function closeMainMenu() {
			return $mdSidenav(sidenavId).close();
		}

		/**
		 * Open the main menu sidenav component
		 */
		function openMainMenu() {
			return $mdSidenav(sidenavId).open();
		}
	}

})();
