(function () {
	'use strict';

	// register the controller as LoginController
	angular
		.module('<%= scriptAppName %>.account')
		.controller('LoginController', LoginController);

	// add LoginController dependencies to inject
	 LoginController.$inject = ['Auth', '$location'];

	/**
	 * LoginController constructor
	 */
	function LoginController(Auth, $location) {
		var vm = this;

		// view model bindings
		vm.user = {};
		vm.errors = {};
		vm.submitted = false;
		vm.login = login;

		function login(form) {
			vm.submitted = true;

			if (form.$valid) {
				Auth.login({
					email: vm.user.email,
					password: vm.user.password
				}).then(function () {
				// Logged in, redirect to home
					$location.path('/');
				}).catch(function (err) {
					vm.errors.other = err.message;
				});
			}
		}
	}

})();
