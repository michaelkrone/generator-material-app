/**
 * @ngdoc controller
 * @name <%= scriptAppName %>.home.controller:HomeController
 * @description
 * Controller for the main component
 */

(function () {
	'use strict';

	// register the controller as HomeController
	angular
		.module('<%= scriptAppName %>.home')
		.controller('HomeController', HomeController);

	/**
	 * @ngdoc function
	 * @name <%= scriptAppName %>.main.provider:HomeController
	 * @description
	 * Provider of the {@link <%= scriptAppName %>.home.controller:HomeController HomeController}
	 *
	 * @param {Service} $router The router service to use
	 */<% if(features.auth) { %>

	HomeController.$inject = ['Auth'];<% }%>

	function HomeController(<% if(features.auth) { %>Auth<% }%>) {
		var vm = this;

		/**
		 * @ngdoc property
		 * @name greeting
		 * @propertyOf <%= scriptAppName %>.home.controller:HomeController
		 * @description
		 * The polite greeting of this sublime controller
		 *
		 */
		vm.greeting = 'Milord, this is the HomeController.';<% if(features.auth) { %>

		/**
		 * @ngdoc property
		 * @name auth
		 * @propertyOf <%= scriptAppName %>.home.controller:HomeController
		 * @description
		 * The auth service of this controller
		 *
		 */
		vm.auth = Auth;<% }%>
	}<% if(features.auth) { %>

	HomeController.prototype.canActivate = function () {
		return this.auth.isLoggedIn();
	};<% }%>

})();
