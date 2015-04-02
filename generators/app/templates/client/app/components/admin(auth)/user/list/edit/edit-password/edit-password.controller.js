/**
 * @ngdoc controller
 * @name <%= scriptAppName %>.admin.user.list.edit.controller:EditPasswordController
 * @description
 * Controller for the edit password dialog
 */

(function () {
	'use strict';

	// register the controller as EditPasswordController
	angular
		.module('<%= scriptAppName %>.admin.user.list.edit')
		.controller('EditPasswordController', EditPasswordController);


	/**
	 * @ngdoc function
	 * @name <%= scriptAppName %>.admin.user.list.edit.provider:EditPasswordController
	 * @description
	 * Provider of the {@link <%= scriptAppName %>.admin.user.list.edit.controller:EditPasswordController EditPasswordController}
	 *
	 * @param {Service} $mdDialog The mdDialog service to use
	 * @param {Service} UserService The UserService to use
	 * @param {User|Object} user The user data to use
	 * @param {Service} Toast The Toast service to use
	 * @returns {Service} {@link <%= scriptAppName %>.admin.user.list.edit.controller:EditPasswordController EditPasswordController}
	 */

	EditPasswordController.$inject = ['$mdDialog', 'UserService', 'user', 'Toast'];

	function EditPasswordController($mdDialog, UserService, user, Toast) {
		var vm = this;

		vm.change = changePassword;
		vm.close = closeDialog;
		vm.cancel = cancelDialog;
		vm.user = angular.copy(user);

		/**
		 * @ngdoc function
		 * @name changePassword
		 * @methodOf <%= scriptAppName %>.admin.user.list.edit.controller:EditPasswordController
		 * @description
		 * The function to use when submitting the form of the dialog
		 * @param {Form} [form] The form of the edit password dialog to submit from
		 */
		function changePassword(form) {
			if (form && form.$invalid) {
				return;
			}

			UserService
				.setPassword(vm.user)
				.then(changePasswordSuccess)
				.catch(changePasswordCatch);

			function changePasswordSuccess(savedUser) {
				// reset the password to avoid display when the dialog opens again
				delete vm.user.password;
				vm.close();
				Toast.show({
					type: 'info',
					text: 'Updated password for user ' + savedUser.name
				});
			}

			function changePasswordCatch(err) {
				if (form) {
					form.setResponseErrors(err);
				}
			}
		}

		/**
		 * @ngdoc function
		 * @name closeDialog
		 * @methodOf <%= scriptAppName %>.admin.user.list.edit.controller:EditPasswordController
		 * @description
		 * Function to close the dialog with
		 */
		function closeDialog() {
			$mdDialog.hide();
		}

		/**
		 * @ngdoc function
		 * @name cancelDialog
		 * @methodOf <%= scriptAppName %>.admin.user.list.edit.controller:EditPasswordController
		 * @description
		 * Function to cancel the dialog with
		 */
		function cancelDialog() {
			$mdDialog.cancel();
		}
	}

})();
