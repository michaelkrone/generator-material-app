(function () {
	'use strict';

	// register the controller as SettingsController
	angular
		.module('<%= scriptAppName %>.account')
		.controller('SettingsController', SettingsController);

	// add SettingsController dependencies to inject
	 SettingsController.$inject = ['User', 'Auth'];

	/**
	 * SettingsController constructor
	 *
	 * @param User
	 * @param Auth
	 * @constructor
	 */
	function SettingsController(User, Auth) {
		var vm = this;

		// view model bindings
		vm.errors = {};
		vm.user = {};
		vm.message = '';
		vm.changePassword = changePassword;
		vm.submitted = false;

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
		};
	}

})();
