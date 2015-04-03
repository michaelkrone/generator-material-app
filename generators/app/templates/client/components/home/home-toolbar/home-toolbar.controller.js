/**
 * @ngdoc controller
 * @name <%= scriptAppName %>.home.controller:HomeToolbarController
 * @description
 * Controller for the main component
 */

(function () {
	'use strict';

	// register the controller as HomeToolbarController
	angular
		.module('<%= scriptAppName %>.home')
		.controller('HomeToolbarController', HomeToolbarController);

	/**
	 * @ngdoc function
	 * @name <%= scriptAppName %>.main.provider:HomeToolbarController
	 * @description
	 * Provider of the {@link <%= scriptAppName %>.home.controller:HomeToolbarController HomeToolbarController}
	 *
	 * @param {Service} $router The router service to use
	 */<% if(features.auth) { %>

		HomeToolbarController.$inject = ['Auth'];<% }%>

	function HomeToolbarController(<% if(features.auth) { %>Auth<% }%>) {
		var vm = this;

		/**
		 * @ngdoc property
		 * @name greeting
		 * @propertyOf <%= scriptAppName %>.home.controller:HomeToolbarController
		 * @description
		 * The polite greeting of this sublime controller
		 *
		 */
		vm.greeting = 'Milord, here be HomeToolbarControllers.';<% if(features.auth) { %>

			/**
			 * @ngdoc property
			 * @name auth
			 * @propertyOf <%= scriptAppName %>.home.controller:HomeToolbarController
			 * @description
			 * The auth service of this controller
			 *
			 */
			vm.auth = Auth;<% }%>
	}<% if(features.auth) { %>

		HomeToolbarController.prototype.canActivate = function () {
			return this.auth.isLoggedIn();
		};<% }%>

})();
