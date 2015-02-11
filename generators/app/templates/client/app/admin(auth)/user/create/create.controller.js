(function () {
	'use strict';

	/**
	 * Register the edit controller as UserCreateController
 	 */

	angular
		.module('<%= scriptAppName %>.admin.user.create')
		.controller('UserCreateController', UserCreateController);

	// add UserCreateController dependencies to inject
	UserCreateController.$inject = ['Auth', 'User', '$state', '$mdToast', '$mdDialog'];

	/**
	 * UserCreateController constructor
	 */
	function UserCreateController(Auth, User, $state, $mdToast, $mdDialog) {
		var vm = this;

		// defaults
		vm.message = {};
		vm.errors = {};
		vm.user = new User();

		// view model bindings
		vm.create = create;
		vm.showToast = showToast;
		vm.openEdit = openEdit;
		vm.hideDialog = hideDialog;
		vm.cancelDialog = cancelDialog;

		// view model implementations

		/**
		 * Create a new user by using the UserService create method
		 */
		function create(form) {
			// refuse to work with invalid data
			if (vm.user._id || (form && !form.$valid)) {
				return;
			}

			Auth.createUser(vm.user)
				.then(createUserSuccess)
				.catch(catchUserCreateErrors);

			function createUserSuccess(newUser) {
				vm.user = newUser;
				vm.message = {type: 'success', message: 'user created'};
				(form && form.$setPristine());
				vm.hideDialog();
				vm.showToast();
			}

			function catchUserCreateErrors(err) {
				err = err.data || err;
				vm.message = {type: 'danger', message: 'Error while saving user: ' + err.toString() };
				resetErrors(err, form);
				vm.showToast();
			}
		}

		/**
		 * Hide the dialog
		 */
		function hideDialog() {
			$mdDialog.hide();
		}

		/***
		 * Cancel the dialog
		 */
		function cancelDialog() {
			$mdDialog.cancel();
		}

		/**
		 * Open the detail state with the current user
		 */
		function openEdit() {
			$state.go('^.edit', {'id': vm.user._id});
		}

		/**
		 * Update validity of form fields that match the mongoose errors
		 */
		function resetErrors(err, form) {
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
