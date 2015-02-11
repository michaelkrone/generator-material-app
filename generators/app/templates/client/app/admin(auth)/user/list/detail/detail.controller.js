(function () {
	'use strict';

	/**
	 * Register the edit controller as UserDetailController
 	 */

	angular
		.module('<%= scriptAppName %>.admin.user.list.detail')
		.controller('UserDetailController', UserDetailController);

	// add UserDetailController dependencies to inject
	UserDetailController.$inject = ['$state', 'user'];

	/**
	 * UserDetailController constructor
	 */
	function UserDetailController($state, user) {
		var vm = this;

		// the current user object
		vm.user = user;
		// switch to the edit state
		vm.edit = edit;
		// switch to the parent state
		vm.goBack = goBack

		/**
		 * Open the edit state with the current user
		 *
		 */
		function edit() {
			$state.go('^.edit', {'id': vm.user._id});
		}

		/**
		 * Return to the parent state
		 *
		 */
		function goBack() {
			$state.go('^');
		}
	}
})();
