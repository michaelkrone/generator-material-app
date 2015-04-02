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
	 */

	// HomeController.$inject = [''];

	function HomeController() {
		var vm = this;
		vm.greeting = 'Milord, I dare to be the HomeController';
	}

})();
