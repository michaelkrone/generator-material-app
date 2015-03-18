/**
 * @ngdoc controller
 * @name <%= scriptAppName %>.admin.user.list.edit.controller:UserEditController
 * @description
 * Controller of the user edit page of the admin section
 */

(function () {
	'use strict';

	/**
	 * Register the edit controller as UserEditController
	 */

	angular
		.module('<%= scriptAppName %>.admin.user.list.edit')
		.controller('UserEditController', UserEditController);

	/**
	 * @ngdoc function
	 * @name <%= scriptAppName %>.admin.user.list.edit.provider:UserEditController
	 * @description
	 * Provider of the {@link <%= scriptAppName %>.admin.user.list.edit.controller:UserEditController UserEditController}
	 * @param {Service} $state The state service to use
	 * @param {Service} $stateParams The stateParams service to use
	 * @param {Service} Toast The Toast service to use
	 * @param {Service} $mdDialog The mdDialog service to use
	 * @param {Service} Auth The Auth service to use
	 * @param {Service} UserService The UserService to use
	 * @param {Resource} user The user data to use
	 */

	UserEditController.$inject = ['$state', '$stateParams', 'Toast', '$mdDialog', 'Auth', 'UserService', 'user'];

	function UserEditController($state, $stateParams, Toast, $mdDialog, Auth, UserService, user) {
		var vm = this;

		// defaults
		vm.user = angular.copy(user, vm.user);
		vm.userRoles = Auth.getSettableRoles();
		vm.displayName = user.name;

		// view model bindings
		vm.update = update;
		vm.remove = remove;
		vm.goBack = goBack;
		vm.showList = showList;
		vm.showChangePasswordDialog = showChangePasswordDialog;
		// check if the current displayed user has the root role
		vm.isRoot = Auth.hasRole('root', vm.user);
		vm.getNameForRole = Auth.getNameForRole;

		/**
		 * Open the detail state with the current user
		 *
		 */
		function goBack() {
			$state.go('^.detail', {id: vm.user._id});
		}

		/**
		 * Open the user list state
		 *
		 */
		function showList() {
			$state.go('^');
		}
		/**
		 * Updates a user by using the UserService save method
		 * @param {Form} [form]
		 */
		function update(form) {
			// refuse to work with invalid data
			if (!vm.user._id || form && !form.$valid) {
				return;
			}

			UserService.update(vm.user)
				.then(updateUserSuccess)
				.catch(updateUserCatch);

			function updateUserSuccess(updatedUser) {
				// update the display name after successful save
				vm.displayName = updatedUser.name;
				Toast.show({text: 'User ' + updatedUser.name + ' updated'});
				if (form) {
					form.$setPristine();
				}
			}

			function updateUserCatch(err) {
				Toast.show({
					type: 'warn',
					text: 'Error while updating user ' + vm.displayName,
					link: {state: $state.$current, params: $stateParams}
				});

				if (form && err) {
					form.setResponseErrors(err.data);
				}
			}
		}

		/**
		 * Show a dialog to ask the user if she wants to delete the current selected user.
		 * @param {AngularForm} form - The form to pass to the remove handler
		 * @param {$event} ev - The event to pass to the dialog service
		 */
		function remove(form, ev) {
			var confirm = $mdDialog.confirm()
				.title('Delete user ' + vm.displayName + '?')
				.content('Do you really want to delete user ' + vm.displayName + '?')
				.ariaLabel('Delete user')
				.ok('Delete user')
				.cancel('Cancel')
				.targetEvent(ev);

			$mdDialog.show(confirm)
				.then(performRemove);

			/**
			 * Removes a user by using the UserService remove method
			 * @api private
			 */
			function performRemove() {
				UserService.remove(vm.user)
					.then(deleteUserSuccess)
					.catch(deleteUserCatch);

				function deleteUserSuccess() {
					Toast.show({type: 'success', text: 'User ' + vm.displayName + ' deleted'});
					vm.showList();
				}

				function deleteUserCatch(err) {
					Toast.show({
						type: 'warn',
						text: 'Error while deleting user ' + vm.displayName,
						link: {state: $state.$current, params: $stateParams}
					});

					if (form && err) {
						form.setResponseErrors(err, vm.errors);
					}
				}
			}
		}

		/**
		 * Show the dialog for changing the user password
		 * @param event
		 */
		function showChangePasswordDialog(event) {
			$mdDialog.show({
				controller: 'EditPasswordController',
				controllerAs: 'password',
				templateUrl: 'app/admin/user/list/edit/edit-password/edit-password.html',
				targetEvent: event,
				locals: {user: vm.user},
				bindToController: true,
				clickOutsideToClose: false
			});
		}
	}
})();
