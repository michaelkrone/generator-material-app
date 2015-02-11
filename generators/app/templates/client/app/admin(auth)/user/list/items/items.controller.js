(function () {
	'use strict';

	/**
	 * Register the list controller as UserItemsController
	 */

	angular
		.module('<%= scriptAppName %>.admin.user.list.items')
		.controller('UserItemsController', UserItemsController);

	// add UserItemsController dependencies to inject
	UserItemsController.$inject = ['$state'];

	/**
	 * UserItemsController constructor
	 */
	function UserItemsController($state) {
		var vm = this;

		// the selected item id
		var curUserId = null;

		// check if this item is selected
		vm.isSelected = isSelected;
		// switch to the detail state
		vm.showInDetails = showInDetails;

		/**
		 * Check if the passed item is the current selected item
		 *
		 * @param {Object} user - The object to check for selection
		 */
		function isSelected(user) {
			return curUserId === user._id;
		}

		/**
		 * Open the detail state with the selected item
		 *
		 * @param {Object} user - The user to edit
		 */
		function showInDetails(user) {
			curUserId = user._id;
			$state.go('admin.user.list.detail', {'id': curUserId});
		}
	}

})();
