(function () {
	'use strict';

	/**
	 * Register the list controller as AdminMainController
	 */

	angular
		.module('<%= scriptAppName %>.admin.main')
		.controller('AdminMainController', AdminMainController);

	// add AdminMainController dependencies to inject
	AdminMainController.$inject = ['$state'];

	/**
	 * AdminMainController constructor
	 */
	function AdminMainController($state) {
		var vm = this;
		// switch to the list state
		vm.showList = showList;

		/**
		 * Activate the user.list state
		 */
		function showList() {
			$state.go('admin.user.list');
		}
	}

})();
