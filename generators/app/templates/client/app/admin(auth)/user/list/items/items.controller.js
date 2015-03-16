/**
 * @ngdoc controller
 * @name <%= scriptAppName %>.admin.user.list.items.controller:UserItemsController
 * @description
 * Controller of the user list items page of the admin section
 */

(function () {
	'use strict';

	/**
	 * Register the list controller as UserItemsController
	 */

	angular
		.module('<%= scriptAppName %>.admin.user.list.items')
		.controller('UserItemsController', UserItemsController);


	/**
	 * @ngdoc function
	 * @name <%= scriptAppName %>.admin.user.list.items.provider:UserItemsController
	 * @description
	 * Provider of the {@link <%= scriptAppName %>.admin.user.list.items.controller:UserItemsController UserItemsController}
	 *
	 */

	UserItemsController.$inject = ['$state', 'Auth'];

	function UserItemsController($state, Auth) {
		var vm = this;

		// the selected item id
		var curUserId = null;

		// check if this item is selected
		vm.isSelected = isSelected;
		// switch to the detail state
		vm.showInDetails = showInDetails;
		// get the role object for every user
		vm.getRole = Auth.getRole;

		/**
		 * @ngdoc function
		 * @name isSelected
		 * @methodOf <%= scriptAppName %>.admin.user.list.items.controller:UserItemsController
		 * @description
		 * Check if the passed item is the current selected item
		 *
		 * @param {Object} user The object to check for selection
		 * @returns {Boolean} True if the current selected item is equals the passed item
		 */
		function isSelected(user) {
			return curUserId === user._id;
		}

		/**
		 * @ngdoc function
		 * @name showInDetails
		 * @methodOf <%= scriptAppName %>.admin.user.list.items.controller:UserItemsController
		 * @description
		 * Open the detail state with the selected item
		 *
		 * @param {User|Object} user The user to edit
		 */
		function showInDetails(user) {
			curUserId = user._id;
			$state.go('admin.user.list.detail', {'id': curUserId});
		}
	}

})();
