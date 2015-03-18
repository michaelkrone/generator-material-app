/**
 * @ngdoc controller
 * @name <%= scriptAppName %>.main.controller:MainController
 * @description
 * Controls mainly nothing currently
 */

(function () {
	'use strict';

	// register the controller as MainController
	angular
		.module('<%= scriptAppName %>.main')
		.controller('MainController', MainController);

	/**
	 * @ngdoc function
	 * @name <%= scriptAppName %>.main.provider:MainController
	 * @description
	 * Provider of the {@link <%= scriptAppName %>.main.controller:MainController MainController}
	 *
	 * @param {Service} $scope The scope service to use
	 * @param {Service} $http The http service to use
	 */

	// MainController.$inject = [];

	function MainController() {
		var vm = this;
	}

})();
