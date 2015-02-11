(function () {
	'use strict';

	/**
	 * Register the edit controller as UserEditController
 	 */

	angular
		.module('<%= scriptAppName %>.admin.user.list.edit')
		.controller('UserEditController', UserEditController);

	// add UserEditController dependencies to inject
	UserEditController.$inject = ['UserService', '$state', '$mdToast', 'user'];

	/**
	 * UserEditController constructor
	 */
	function UserEditController(UserService, $state, $mdToast, user) {
		var vm = this;

		// defaults
		vm.message = {};
		vm.errors = {};
		vm.user = angular.copy(user, vm.user);
		vm.userRoles = ['user', 'admin', 'root'];

		// view model bindings
		vm.update = update;
		vm.remove = remove;
		vm.showToast = showToast;
		vm.goBack = goBack ;

		// view model implementations

		/**
		 * Open the detail state with the current user
		 *
		 */
		function goBack () {
			$state.go('^.detail', {id: vm.user._id});
		}

		/**
		 * Updates a user by using the UserService save method
		 * @param {AngularHTMLForm} [form]
		 */
		function update(form) {
			// refuse to work with invalid data
			if (form && !form.$valid) {
				return;
			}

			UserService.update(vm.user)
				.then(updateUserSuccess)
				.catch(catchUserUpdateErrors);

			function updateUserSuccess() {
				vm.message = {type: 'success', message: vm.user.name + ' updated'};
				(form && form.$setPristine());
				vm.showToast();
			}

			function catchUserUpdateErrors(err) {
				err = err.data;
				vm.message = {type: 'danger', message: 'Error while updating user: ' + err };
				resetErrors(err, form);
				vm.showToast();
			}
		}

		/**
		 * Removes a user by using the UserService remove method
		 * @param {AngularHTMLForm} [form]
		 */
		function remove(form) {
			UserService.remove(vm.user)
				.then(deleteUserSuccess)
				.catch(catchUserRemoveErrors);

			function deleteUserSuccess() {
				vm.message = {type: 'success', message: 'user removed'};
				vm.showToast();
			}

			function catchUserRemoveErrors(err) {
				err = err.data;
				resetErrors(err, form);
			}
		}

		function changePassword(form) {
			vm.submitted = true;
			if (form.$valid) {
				Auth
					.changePassword(vm.user.oldPassword, vm.user.newPassword)
					.then(function () {
						vm.message = 'Password successfully changed.';
					}).catch(handleError);
			}

			function handleError() {
				form.password.$setValidity('mongoose', false);
				vm.errors.other = 'Incorrect password';
				vm.message = '';
			}
		}

		/**
		 * Update validity of form fields that match the mongoose errors
		 */
		function resetErrors(err, form) {
			vm.errors = {};
			angular.forEach(err.errors, function (error, field) {
				(form && form[field]).$setValidity('mongoose', false);
				vm.errors[field] = error.type;
			});
		}

		/**
		 * Display a toast with the given content. If the content is falsy
		 * use vm.message.message instead.
		 *
		 * @param {String} [content] - The toasts content
		 * @param {$event} [$event] - unused, may be passed to the service
		 */
		function showToast(content, $event) {
			content = content || vm.message.message;
			$mdToast.show($mdToast.simple().content(content));
		}
	}
})();
