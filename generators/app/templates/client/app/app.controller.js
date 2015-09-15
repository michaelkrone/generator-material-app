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
	 * @param {Object} mainMenu - The mainMenu service used to communicate with the main menu component<% if (features.auth) { %>
	 * @param {Auth} Auth - The authentication service used for logging out<% } %>
	 */

	AppController.$inject = ['mainMenu'<% if (features.auth) { %>, 'Auth'<% } %>];

	function AppController(mainMenu<% if (features.auth) { %>, 'Auth'<% } %>) {
		var vm = this;

		/**
		 * @ngdoc property
		 * @name mainMenu
		 * @propertyOf <%= scriptAppName %>.controller:AppController
		 * @description
		 * Instance of the main menu service, provides methods for opening
		 * and closing the main app menu
		 * @returns {Object} The injected main menu service
		 */
		vm.mainMenu = mainMenu;<% if (features.auth) { %>

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
	}
})();
