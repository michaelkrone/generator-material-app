(function () {
	'use strict';

	// register the controller as AdminController
	angular
		.module('<%= scriptAppName %>.admin')
		.controller('AdminController', AdminController);

	// add AdminController dependencies to inject
	// AdminController.$inject = [''];

	/**
	 * AdminController constructor
	 */
	function AdminController() {
		// var vm = this;
	}

})();
